interface Filter {
  id: string | number
  name: string
}

interface CollectionInfo {
  firstRevision: number
  lastRevision: number
  notes: number
  revisions: number
  notes: number
  decks: Filter[]
  tags: Filter[]
  noteTypes: Filter[]
}

interface OrmState {
  ready: boolean
  loading: boolean
}

interface OrmActions {
  handleFileSelect: (f: any) => Promise<void>
}

interface QueryBuilderInfo extends Partial<CollectionInfo> {
  ready: boolean
  loading: boolean
}

interface Query {
  filter?: {}
  select?: {}
  period?: string
}

interface QueryBuilderActions {
  handleFileSelect: (f: any) => Promise<void>
  updateQuery: ({ type: string, field: string, id: string, value: any }) => void
  runQuery: () => void
}

interface Result {
  ready: boolean;
  loading: boolean;
  data: any[];
}

interface QueryBuilderState {
  query: Query
  info: QueryBuilderInfo
  result: Result
  orm: OrmState
}
