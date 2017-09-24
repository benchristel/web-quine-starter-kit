const createApp = (appSpec, ...args) => {
  if (appSpec.root) {
    // before starting the app, clear out any stale views
    // left over from when the DOM was saved.
    appSpec.root.innerHTML = ''
  }
  return hyperapp.app(appSpec, ...args)
}
