describe('the changeNoun action', function() {
  it('sets the current noun to the value of the event target element', function() {
    var initial = {noun: 'old'}
    var event = {target: {value: 'new'}}

    var final = Actions.changeNoun(initial, null, event)

    expect(final.noun).toBe('new')
  })

  it('preserves other properties', function() {
    var initial = {noun: 'old', foo: 123}
    var event = {target: {value: 'new'}}

    var final = Actions.changeNoun(initial, null, event)

    expect(final.foo).toBe(123)
  })
})
