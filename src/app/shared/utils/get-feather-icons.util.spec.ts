import { getFeatherIcons } from "./get-feather-icons.util";

it('Tests for getFeatherIcons', () => {
  const featherIconName = 'Activity';
  const featherIcons = getFeatherIcons([featherIconName]);
  expect(featherIcons.Activity).toBeDefined();
});
