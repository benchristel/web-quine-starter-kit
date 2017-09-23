describe('the save action', function() {
  it('does not modify the state', function() {
    Actions._quineSave = jasmine.createSpy('_quineSave')

    const initial = Immutable.Map({foo: 1})

    const final = Actions.save(initial, Actions)

    expect(final).toBe(initial)
  })

  it('saves the state via Actions._quineSave', function() {
    Actions._quineSave = jasmine.createSpy('_quineSave')

    const initial = Immutable.Map({foo: 1})

    const final = Actions.save(initial, Actions)

    expect(Actions._quineSave).toHaveBeenCalledWith({foo: 1})
  })
})
