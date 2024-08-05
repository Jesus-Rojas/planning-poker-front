import { FeatherIconName } from '@shared/types';
import { allIcons } from 'angular-feather/icons';

export function getFeatherIcons(iconNames: FeatherIconName[]) {
  return iconNames.reduce<Record<FeatherIconName, string>>(
    (acc, iconName) => ({ ...acc, [iconName]: allIcons[iconName] }),
    {} as Record<FeatherIconName, string>
  );
}
