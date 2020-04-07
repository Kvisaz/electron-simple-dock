export const serverHandlers= {}

serverHandlers._history = []

serverHandlers['make-factorial'] = async ({ num }) => {
  serverHandlers._history.push(num)

  function fact(n) {
    if (n === 1) {
      return 1
    }
    return n * fact(n - 1)
  }

  console.log('making factorial')
  return fact(num)
}

serverHandlers['ring-ring'] = async () => {
  console.log('picking up the phone')
  return 'hello!'
}
