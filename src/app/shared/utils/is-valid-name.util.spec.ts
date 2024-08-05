import { isValidName } from "./is-valid-name.util";

describe('Tests for isValidName', () => {
  it('should return true for valid names', () => {
    expect(isValidName('JohnDoe')).toBe(true);
    expect(isValidName('John123')).toBe(true);
    expect(isValidName('A1b2C')).toBe(true);
  });

  it('should return false for names with special characters', () => {
    expect(isValidName('John*Doe')).toBe(false);
    expect(isValidName('John_Doe')).toBe(false);
    expect(isValidName('John#Doe')).toBe(false);
    expect(isValidName('John/Doe')).toBe(false);
    expect(isValidName('John-Doe')).toBe(false);
  });

  it('should return false for names with more than three numbers', () => {
    expect(isValidName('John1234')).toBe(false);
    expect(isValidName('12345')).toBe(false);
  });

  it('should return false for names shorter than 5 characters or longer than 20 characters', () => {
    expect(isValidName('John')).toBe(false);
    expect(isValidName('J')).toBe(false);
    expect(isValidName('J' + 'o'.repeat(19) + 'n')).toBe(false);
  });

  it('should return false for names that are only numbers', () => {
    expect(isValidName('12345')).toBe(false);
    expect(isValidName('67890')).toBe(false);
  });

  it('should return false for names with exactly four numbers', () => {
    expect(isValidName('John1234')).toBe(false);
    expect(isValidName('1a2b3c4d')).toBe(false);
  });

  it('should return true for names with exactly three numbers', () => {
    expect(isValidName('John123')).toBe(true);
    expect(isValidName('A1b2C3')).toBe(true);
  });
});
