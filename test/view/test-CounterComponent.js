describe('CounterComponent', function() {
  it('renders a sentence describing the current count and some controls to change it', function() {
    const state = Immutable.Map({noun: 'foo', count: 0})

    expect(CounterComponent(state, Actions)).toEqual(
      h("div", {}, [
        h('h1', {}, 'There are no foos here.'),
        h('button', {onclick: Actions.increment}, '+1'),
        h('button', {onclick: Actions.decrement}, '-1'),
        h('input', {type: 'text', oninput: Actions.changeNoun, value: 'foo'})
      ]))
  })
})
