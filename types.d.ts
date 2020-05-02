interface Filter {
  id: string | number
  name: string
}

interface CollectionInfo {
  decks?: Filter[]
  tags?: Filter[]
  noteTypes?: Filter[]
}

interface OrmState {
  ready: boolean
}

interface OrmActions {
  handleFileSelect: (f: any) => Promise<void>
  getCollectionInfo: () => Promise<CollectionInfo>
  makeQuery: (q: Query) => Promise<any>
}

interface QueryBuilderOptions extends CollectionInfo {
  ready: boolean
}

interface Query {
  filter: {}
  sort: {}
}

interface QueryBuilderActions {
  handleFileSelect: (f: any) => Promise<void>
  updateQuery: ({ type: string, field: string, id: string, value: any }) => void
  runQuery: () => Promise<void>
}

interface QueryBuilderState {
  query: Query
  options: QueryBuilderOptions
  result: any
}
