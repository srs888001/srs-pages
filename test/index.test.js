const srsPages = require('..')

// TODO: Implement module test
test('srs-pages', () => {
  expect(srsPages('w')).toBe('w@zce.me')
  expect(srsPages('w', { host: 'wedn.net' })).toBe('w@wedn.net')
  expect(() => srsPages(100)).toThrow('Expected a string, got number')
})
