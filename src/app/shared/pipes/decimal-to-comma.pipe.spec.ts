import { DecimalToCommaPipe } from './decimal-to-comma.pipe';

describe('DecimalToCommaPipe', () => {
  let pipe: DecimalToCommaPipe;

  beforeEach(() => {
    pipe = new DecimalToCommaPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform number with decimal point to string with comma', () => {
    expect(pipe.transform(1234.56)).toBe('1234,56');
    expect(pipe.transform(0.123)).toBe('0,123');
  });

  it('should transform string with decimal point to string with comma', () => {
    expect(pipe.transform('1234.56')).toBe('1234,56');
    expect(pipe.transform('0.123')).toBe('0,123');
  });

  it('should return the value unchanged if it is not a string or number', () => {
    const obj = { key: 'value' };
    expect(pipe.transform(obj)).toBe(obj);
    expect(pipe.transform(null)).toBe(null);
    expect(pipe.transform(undefined)).toBe(undefined);
  });

  it('should return the value unchanged if string has no decimal point', () => {
    expect(pipe.transform('123456')).toBe('123456');
    expect(pipe.transform('test')).toBe('test');
  });

  it('should return the value unchanged if number is an integer', () => {
    expect(pipe.transform(123456)).toBe('123456');
  });
});
