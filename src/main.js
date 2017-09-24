createApp({
  root: document.getElementById('root'),

  state: Immutable.Map(InitialState()),

  actions: Actions,

  view: (state, actions) => h("div", {}, [
      CounterView(state, actions),
      h('button', {onclick: actions.save}, 'Save')
    ])
})
