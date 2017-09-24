function InitialState() {
  return WebQuine.load() || {
    noun: 'llama',
    count: 0
  }
}
