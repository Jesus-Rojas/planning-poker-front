import { allIcons } from 'angular-feather/icons';

export function getFeatherIcons(iconNames: (keyof typeof allIcons)[]) {
  return iconNames.reduce((acc, iconName) => ({ ...acc, [iconName]: allIcons[iconName] }), { });
}
