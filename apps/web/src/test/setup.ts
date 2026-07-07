/**
 * Vitest setup: register jest-dom matchers (with vitest typings) and make
 * sure the DOM is cleaned between tests (auto-cleanup only runs when
 * vitest globals are enabled, which they are not here).
 */
import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

afterEach(() => {
  cleanup()
})
