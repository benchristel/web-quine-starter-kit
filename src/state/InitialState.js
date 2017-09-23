function InitialState() {
  return Immutable.Map(InitialStateJS())
}

function InitialStateJS() {
  const brandNewState = {
    noun: 'wug',
    count: 0
  }

  const loadedState = WebQuine.load()
  if (Object.keys(loadedState).length === 0) {
    return brandNewState
  }
  return loadedState
}
