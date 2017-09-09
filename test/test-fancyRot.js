describe('fancyRot1', function() {
  it('shifts consonants by one', function() {
    expect(fancyRot1('b')).toBe('c')
    expect(fancyRot1('c')).toBe('d')
  })

  it('preserves case', function() {
    expect(fancyRot1('B')).toBe('C')
    expect(fancyRot1('C')).toBe('D')
  })

  it('shifts consonants to the next consonant', function() {
    expect(fancyRot1('d')).toBe('f')
    expect(fancyRot1('h')).toBe('j')
    expect(fancyRot1('n')).toBe('p')
    expect(fancyRot1('t')).toBe('v')

    expect(fancyRot1('D')).toBe('F')
    expect(fancyRot1('H')).toBe('J')
    expect(fancyRot1('N')).toBe('P')
    expect(fancyRot1('T')).toBe('V')
  })

  it('loops around', function() {
    expect(fancyRot1('z')).toBe('b')
    expect(fancyRot1('Z')).toBe('B')
  })

  it('shifts vowels to the next vowel', function() {
    expect(fancyRot1('a')).toBe('e')
    expect(fancyRot1('e')).toBe('i')
    expect(fancyRot1('i')).toBe('o')
    expect(fancyRot1('o')).toBe('u')
    expect(fancyRot1('u')).toBe('a')

    expect(fancyRot1('A')).toBe('E')
    expect(fancyRot1('E')).toBe('I')
    expect(fancyRot1('I')).toBe('O')
    expect(fancyRot1('O')).toBe('U')
    expect(fancyRot1('U')).toBe('A')
  })

  it('shifts strings of more than one character', function() {
    expect(fancyRot1('hello')).toBe('jimmu')
  })

  it('leaves spaces, numbers, and punctuation alone', function() {
    expect(fancyRot1('Wow, 42 helicopters!')).toBe('Xux, 42 jimoduqvist!')
  })
})

describe('fancyRot', function() {
  it('performs the fancyRot1 shift the given number of times', function() {
    expect(fancyRot(2, 'Wow, 42 helicopters!')).toBe('Yay, 42 konufarwotv!')
  })
})
