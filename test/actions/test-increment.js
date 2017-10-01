describe('the increment action', function() {
  it('increases the count from 0 to 1', function() {
    var initial = {count: 0}

    var final = Actions.increment(initial)

    expect(final.count).toBe(1)
  })

  it('increases the count from 1 to 2', function() {
    var initial = {count: 1}

    var final = Actions.increment(initial)

    expect(final.count).toBe(2)
  })

  it('preserves other properties', function() {
    var initial = {count: 1, foo: 123}

    var final = Actions.increment(initial)

    expect(final.foo).toBe(123)
  })
})
