const CounterView = (state, actions) =>
  h("div", {}, [
    h('h1', {}, text(state)),
    h('button', {onclick: actions.increment}, '+1'),
    h('button', {onclick: actions.decrement}, '-1'),
    h('input', {type: 'text', oninput: actions.changeNoun, value: state.get('noun')})
  ])
