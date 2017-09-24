Actions.save = state => (
  WebQuine.save(state.toJS()),
  state
)
