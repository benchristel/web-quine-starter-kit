function fancyRot(n, s)  {
  var ciphertext = s
  for (; n > 0; n--) ciphertext = fancyRot1(ciphertext)
  return ciphertext
}

function fancyRot1(s) {
  return s.split('').map(transformChar).join('')

  function transformChar(c) {
    if (!/[a-zA-Z]/.test(c)) return c

    switch (c) {
      case 'd': return 'f'
      case 'h': return 'j'
      case 'n': return 'p'
      case 't': return 'v'
      case 'z': return 'b'

      case 'D': return 'F'
      case 'H': return 'J'
      case 'N': return 'P'
      case 'T': return 'V'
      case 'Z': return 'B'

      case 'a': return 'e'
      case 'e': return 'i'
      case 'i': return 'o'
      case 'o': return 'u'
      case 'u': return 'a'

      case 'A': return 'E'
      case 'E': return 'I'
      case 'I': return 'O'
      case 'O': return 'U'
      case 'U': return 'A'
    }

    return String.fromCharCode(c.charCodeAt(0) + 1)
  }
}
