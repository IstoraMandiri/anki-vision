import { useState, useEffect, useMemo, useCallback } from "react";
import tick from "../utils/tick";
import useOrm from "./orm";
import { getCollectionInfo, getRevisions } from "../utils/queries";

const defaultQuery: Query = {
  period: "month",
  select: { time: true },
  filter: {},
};

export default function useQuery(): [QueryBuilderState, QueryBuilderActions] {
  const [orm, { handleFileSelect, reset }] = useOrm();
  const [info, setInfo] = useState({ loading: true, ready: false });
  const [query, setQuery] = useState(defaultQuery);
  const [result, setResult] = useState({ loading: false, ready: false } as Result);

  useEffect(() => {
    if (orm.ready) {
      (async () => {
        setInfo({ ...(await initialize()), ready: true, loading: false });
      })();
    }
  }, [orm.ready]);

  function updateQuery(update) {
    const { select, filter, period } = update;
    setQuery({
      period: period || query.period,
      select: select || query.select,
      filter: { ...query.filter, ...filter },
    });
  }

  async function initialize(): Promise<CollectionInfo> {
    return getCollectionInfo();
  }

  async function runQuery(q) {
    setResult({ ...result, loading: true, ready: false });
    if (q) {
      setQuery(q);
    }
    const original = q || query;
    // deep copy
    const transformed = JSON.parse(JSON.stringify(original));
    // if decks, noteTypes or tags are filtered, add them to selection...
    ["decks", "noteTypes", "tags"].forEach((k) => {
      if (original.select[k] && Object.values(original.filter[k] || {}).find((i) => i)) {
        transformed.select[k] = original.filter[k];
      }
    });
    await tick(500); // force it to re-render before blocking thread
    const data = await getRevisions({ query: transformed, info });
    const error = data.length === 0;
    setResult({ loading: false, ready: true, error, data, query: transformed });
  }

  const actions = {
    handleFileSelect,
    updateQuery,
    runQuery,
    reset,
  };

  return [{ query, orm, info, result }, actions];
}
