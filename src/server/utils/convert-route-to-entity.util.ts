const mapping: Record<string, string> = {
  analysts: 'analyst',
  guests: 'guest',
  managers: 'manager',
  organizations: 'organization',
  'team-members': 'team_member',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
