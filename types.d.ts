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

interface QueryFilter {
  card?: { [k: string]: boolean }
  deck?: { [k: string]: boolean }
  noteType?: { [k: string]: boolean }
  note?: { [k: string]: boolean }
  tag?: { [k: string]: boolean }
  suspended?: boolean
  time?: {
    start?: boolean
    end?: boolean
  }
}

interface QueryConfig {
  [k: string]: {
    type: string
    params?: any
  }
}

interface QuerySelect {
  total?: boolean
  time?: boolean
  right?: boolean
  wrong?: boolean
  hard?: boolean
  ok?: boolean
  easy?: boolean
  learn?: boolean
  review?: boolean
  relearn?: boolean
  cram?: boolean
  decks?: { [k: string]: boolean }
  noteTypes?: { [k: string]: boolean }
  tags?: { [k: string]: boolean }
}

interface Query {
  filter?: QueryFilter
  select?: QuerySelect
  period?: string
  limit?: number
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
  query: Query
}

interface QueryBuilderState {
  query: Query
  info: QueryBuilderInfo
  result: Result
  orm: OrmState
}
