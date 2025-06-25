import '@testing-library/jest-dom';
// Extend Vitest's expect method with methods from react-testing-library
// The import path has changed in newer versions
import * as matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import { afterEach, expect } from 'vitest';

expect.extend(matchers);

// Runs a cleanup after each test case to prevent test state leakage
afterEach(() => {
  cleanup();
});
