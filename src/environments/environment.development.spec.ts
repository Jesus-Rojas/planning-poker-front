import { environment } from "./environment.development";

describe('Tests for environment', () => {
  it('should have API_URL defined', () => {
    expect(environment.API_URL).toBeDefined();
  });
});
