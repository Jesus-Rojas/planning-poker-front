export function isValidName(name: string) {
  const regex = /^(?![0-9]{5,20}$)(?!.*[_.*#/-])[A-Za-z0-9]{5,20}$/;
  const hasMaxThreeNumbers = (name.match(/\d/g) || []).length <= 3;
  return regex.test(name) && hasMaxThreeNumbers;
}
