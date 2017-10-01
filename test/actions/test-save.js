describe('the save action', function() {
  beforeEach(function() {
    spyOn(WebQuine, 'save')
  })

  it('does not modify the state', function() {
    const initial = {foo: 1}

    const final = Actions.save(initial, Actions)

    expect(final).toBe(initial)
  })

  it('saves the state via WebQuine.save', function() {
    const initial = {foo: 1}

    const final = Actions.save(initial, Actions)

    expect(WebQuine.save).toHaveBeenCalledWith({foo: 1})
  })
})
