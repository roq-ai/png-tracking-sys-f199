import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createManager } from 'apiSdk/managers';
import { managerValidationSchema } from 'validationSchema/managers';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { ManagerInterface } from 'interfaces/manager';

function ManagerCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ManagerInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createManager(values);
      resetForm();
      router.push('/managers');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ManagerInterface>({
    initialValues: {
      joined_date: new Date(new Date().toDateString()),
      status: '',
      team_managed: '',
      task_overseen: '',
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: managerValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Managers',
              link: '/managers',
            },
            {
              label: 'Create Manager',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Manager
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl id="joined_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Joined Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.joined_date ? new Date(formik.values?.joined_date) : null}
              onChange={(value: Date) => formik.setFieldValue('joined_date', value)}
            />
          </FormControl>

          <TextInput
            error={formik.errors.status}
            label={'Status'}
            props={{
              name: 'status',
              placeholder: 'Status',
              value: formik.values?.status,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.team_managed}
            label={'Team Managed'}
            props={{
              name: 'team_managed',
              placeholder: 'Team Managed',
              value: formik.values?.team_managed,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.task_overseen}
            label={'Task Overseen'}
            props={{
              name: 'task_overseen',
              placeholder: 'Task Overseen',
              value: formik.values?.task_overseen,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/managers')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'manager',
    operation: AccessOperationEnum.CREATE,
  }),
)(ManagerCreatePage);
