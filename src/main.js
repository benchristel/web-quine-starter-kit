app({
  root: document.getElementById('root'),

  state: Immutable.Map(InitialState()),

  actions: Actions,

  view: (state, actions) => h("div", {}, [
      CounterComponent(state, actions),
      h('button', {onclick: actions.save}, 'Save')
    ]),

  events: {
    load: function() {
      // This clears out the (possibly stale) view when
      // loading the app from a save file, ensuring that the
      // view the user sees is always computed from the
      // latest state.
      document.getElementById('root').innerHTML = ''
    }
  }
})
