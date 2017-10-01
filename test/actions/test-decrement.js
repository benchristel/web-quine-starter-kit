describe('the decrement action', function() {
  it('decreases the count from 1 to 0', function() {
    var initial = {count: 1}

    var final = Actions.decrement(initial)

    expect(final.count).toBe(0)
  })

  it('decreases the count from 2 to 1', function() {
    var initial = {count: 2}

    var final = Actions.decrement(initial)

    expect(final.count).toBe(1)
  })

  it('preserves other properties', function() {
    var initial = {count: 1, foo: 123}

    var final = Actions.decrement(initial)

    expect(final.foo).toBe(123)
  })
})
