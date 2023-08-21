interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Administrator'],
  customerRoles: ['Guest'],
  tenantRoles: ['Administrator', 'Team Member', 'Manager', 'Analyst'],
  tenantName: 'Organization',
  applicationName: 'PNG tracking system ',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
};
