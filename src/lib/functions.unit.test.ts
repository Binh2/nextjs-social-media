import { formatDate, formatDateShort } from './functions';
import { describe, expect, test } from "vitest";

describe('formatDate()', () => {
  test('should not be empty', () => {
    const formattedDate = formatDate(new Date())
    expect(formattedDate).toBeTruthy()
  })
  // test('should be roughly the same with now', () => {
  //   expect(new Date(formattedDate)).toBe(new Date())
  // })
})

describe('formatDateShort()', () => {
  test('should not be empty', () => {
    expect(formatDateShort(new Date())).toBeTruthy()
  })
  test('should be yesterday', () => {
    expect(formatDateShort(new Date(Date.now() - 86400000))).toBe('1d')
  })
})