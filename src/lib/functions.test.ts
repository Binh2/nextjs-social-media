import { formatDate, formatDateShort } from './functions';

describe('formatDate()', () => {
  it('should not be empty', () => {
    const formattedDate = formatDate(new Date())
    expect(formattedDate).toBeTruthy()
  })
  // it('should be roughly the same with now', () => {
  //   expect(new Date(formattedDate)).toBe(new Date())
  // })
})

describe('formatDateShort()', () => {
  it('should not be empty', () => {
    expect(formatDateShort(new Date())).toBeTruthy()
  })
  it('should be yesterday', () => {
    expect(formatDateShort(new Date(Date.now() - 86400000))).toBe('1d')
  })
})