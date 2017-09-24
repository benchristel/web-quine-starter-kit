function InitialState() {
  return WebQuine.load() || {
    noun: 'wug',
    count: 0
  }
}
