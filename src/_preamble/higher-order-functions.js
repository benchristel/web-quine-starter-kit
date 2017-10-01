let head = xs => xs[0]

let tail = xs => xs.slice(1)

let empty = xs => !xs.length

let shallowCopy = obj => Object.assign({}, obj)

let revise = (draft, key, value) => {
  let copy = shallowCopy(draft)
  copy[key] = value
  return copy
}

let apply = (subject, path, transform, ...args) =>
  empty(path)?
    transform(subject, ...args)
  : revise(
      subject,
      head(path),
      apply(subject[head(path)], tail(path), transform, ...args))

let atPath = (path, transform) => (subject, ...args) =>
  apply(
    subject,
    path.split('/').filter(s => s !== ''),
    transform,
    ...args)

let composeUpdaters = (...updaters) =>
  updaters.reduce(
    (f, g) => (x, ...args) => g(f(x, ...args), ...args),
    x => x)

let map = fn => array => array.map(fn)
