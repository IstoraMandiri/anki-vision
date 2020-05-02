export default class Counter {
  i: number;

  constructor () {
    this.i = 0
  }

  c () {
    this.i++
    return `${this.i}`
  }
}
