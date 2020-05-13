interface Filter {
  id: string | number;
  name: string;
}

interface CollectionInfo {
  firstRevision: number;
  lastRevision: number;
  notes: number;
  revisions: number;
  notes: number;
  decks: Filter[];
  tags: Filter[];
  noteTypes: Filter[];
}

interface OrmState {
  ready: boolean;
  loading: boolean;
}

interface OrmActions {
  handleFileSelect: (f: any) => Promise<void>;
  reset: () => Promise<void>;
}

interface QueryBuilderInfo extends Partial<CollectionInfo> {
  ready: boolean;
  loading: boolean;
}

interface QueryFilter {
  card?: { [k: string]: boolean };
  deck?: { [k: string]: boolean };
  noteType?: { [k: string]: boolean };
  note?: { [k: string]: boolean };
  tag?: { [k: string]: boolean };
  suspended?: boolean;
  time?: {
    start?: boolean;
    end?: boolean;
  };
}

interface QueryConfig {
  [k: string]: {
    type: string;
    params?: any;
    name: string;
  };
}

interface QuerySelect {
  total?: boolean;
  time?: boolean;
  right?: boolean;
  wrong?: boolean;
  hard?: boolean;
  ok?: boolean;
  easy?: boolean;
  learn?: boolean;
  review?: boolean;
  relearn?: boolean;
  cram?: boolean;
  decks?: boolean | { [k: string]: boolean };
  noteTypes?: boolean | { [k: string]: boolean };
  tags?: boolean | { [k: string]: boolean };
}

interface Query {
  filter?: QueryFilter;
  select?: QuerySelect;
  period?: string;
  limit?: number;
}

interface QueryBuilderActions extends OrmActions {
  updateQuery: ({
    type: string,
    field: string,
    id: string,
    value: any,
  }) => void;
  runQuery: (q: ?Query) => void;
  setGraph: (d: any) => void;
  usePreset: (d: any) => void;
}

interface Period {
  name: string;
  format: string;
  time?: number;
  margin?: number;
}

interface Result {
  ready: boolean;
  loading: boolean;
  error?: boolean;
  data: any[];
  query: Query;
  period: Period;
}

interface Graph {
  name?: string;
  type: string;
  // TODO settings
}

interface Preset {
  name: string;
  data: {
    query: Query;
    graph: Graph;
  };
}

interface Presets {
  selected: null | string;
  available: {
    [k: string]: Preset;
  };
}

interface Data {
  loading?: boolean;
  ready?: boolean;
  data?: any;
  error?: string;
}

interface QueryBuilderState {
  query: Query;
  info: QueryBuilderInfo;
  result: Result;
  orm: OrmState;
  presets: Presets;
  Comp: Component;
  data: any;
  graph: Graph;
}
