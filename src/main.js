var saveButton = document.getElementById('save')
var encryptButton = document.getElementById('encrypt')
var decryptButton = document.getElementById('decrypt')
var textarea = document.getElementById('text')
var cipherLevelInput = document.getElementById('cipher-level')

textarea.value = WebQuine.state.text || ''
if (!WebQuine.state.cipherLevel) WebQuine.state.cipherLevel = 1
cipherLevelInput.value = WebQuine.state.cipherLevel

saveButton.addEventListener('click', function() {
  WebQuine.state.text = textarea.value
  WebQuine.save()
})

encryptButton.addEventListener('click', function() {
  textarea.value = fancyRot(WebQuine.state.cipherLevel, textarea.value)
})

cipherLevelInput.addEventListener('change', function() {
  WebQuine.state.cipherLevel = parseInt(cipherLevelInput.value)
})

decryptButton.addEventListener('click', function() {
  textarea.value = fancyRot(105 - WebQuine.state.cipherLevel, textarea.value)
})
