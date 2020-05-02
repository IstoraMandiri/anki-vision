import { QueryResultCache } from 'typeorm/cache/QueryResultCache'

export default class CustomQueryResultCache implements QueryResultCache {
  cache: any

  constructor () {
    this.cache = {} as any
  }

  async connect () {}

  async disconnect () {}

  async getFromCache ({ query }) {
    const result = this.cache[query]
    return result ? { identifier: '', query, duration: Infinity, result } : undefined
  }

  async storeInCache (props) {
    this.cache[props.query] = props.result
  }

  async synchronize () { }

  isExpired () { return false }

  async clear () { this.cache = {} }

  async remove (props) { delete this.cache[props.query] }
}
