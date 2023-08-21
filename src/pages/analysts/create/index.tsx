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

import { createAnalyst } from 'apiSdk/analysts';
import { analystValidationSchema } from 'validationSchema/analysts';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { AnalystInterface } from 'interfaces/analyst';

function AnalystCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: AnalystInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createAnalyst(values);
      resetForm();
      router.push('/analysts');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<AnalystInterface>({
    initialValues: {
      joined_date: new Date(new Date().toDateString()),
      status: '',
      analysis_performed: '',
      report_generated: '',
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: analystValidationSchema,
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
              label: 'Analysts',
              link: '/analysts',
            },
            {
              label: 'Create Analyst',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Analyst
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
            error={formik.errors.analysis_performed}
            label={'Analysis Performed'}
            props={{
              name: 'analysis_performed',
              placeholder: 'Analysis Performed',
              value: formik.values?.analysis_performed,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.report_generated}
            label={'Report Generated'}
            props={{
              name: 'report_generated',
              placeholder: 'Report Generated',
              value: formik.values?.report_generated,
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
              onClick={() => router.push('/analysts')}
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
    entity: 'analyst',
    operation: AccessOperationEnum.CREATE,
  }),
)(AnalystCreatePage);
