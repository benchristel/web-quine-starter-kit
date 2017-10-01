function verb(count) {
  return count === 1 ? 'is' : 'are'
}

function suffix(noun, count) {
  if (count === 1) return ''
  var lastChar = noun.charAt(noun.length - 1)

  if (lastChar === 's' || lastChar === 'z' || lastChar === 'x') {
    return 'es'
  }
  return 's'
}

function humanizeCount(n) {
  return n === 0 ? 'no' : '' + n
}

function getNoun(state) {
  var raw = state.noun
  return raw === '' ? 'nothing' : raw
}

function text(state) {
  let count = state.count
  let noun  = getNoun(state)

  return 'There '
    + verb(count) + ' '
    + humanizeCount(count) + ' '
    + noun + suffix(noun, count) + ' here.'
}
