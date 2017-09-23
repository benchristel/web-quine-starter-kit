describe('the decrement action', function() {
  it('decreases the count from 1 to 0', function() {
    var initial = Immutable.Map({count: 1})

    var final = Actions.decrement(initial)

    expect(final.get('count')).toBe(0)
  })

  it('decreases the count from 2 to 1', function() {
    var initial = Immutable.Map({count: 2})

    var final = Actions.decrement(initial)

    expect(final.get('count')).toBe(1)
  })

  it('preserves other properties', function() {
    var initial = Immutable.Map({count: 1, foo: 123})

    var final = Actions.decrement(initial)

    expect(final.get('foo')).toBe(123)
  })
})
