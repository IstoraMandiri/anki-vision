import { useState, useEffect } from "react";
import tick from "../utils/tick";
import useOrm from "./orm";
import { getCollectionInfo, getRevisions } from "../utils/queries";
import defaultPresets from "../utils/presets";
import graphs from "../utils/graphs";
import { periods } from "../utils/periods";

const defaultQuery: Query = {
  period: "month",
  select: { time: true },
  filter: {},
};

export default function useQuery(): [QueryBuilderState, QueryBuilderActions] {
  const [orm, { handleFileSelect, reset }] = useOrm();
  const [info, setInfo] = useState({ loading: true, ready: false });
  const [query, setQuery] = useState(defaultQuery);
  const [result, setResult] = useState({
    loading: false,
    ready: false,
  } as Result);
  const [presets, setPresets] = useState({
    selected: null,
    available: defaultPresets,
  } as Presets);
  const [_graph, _setGraph] = useState({ type: "line" });

  useEffect(() => {
    if (orm.ready) {
      (async (): Promise<void> => {
        setInfo({
          ...(await getCollectionInfo()),
          ready: true,
          loading: false,
        });
      })();
    }
  }, [orm.ready]);

  function setGraph(data): void {
    setPresets({ ...presets, selected: null });
    _setGraph(data);
  }

  function updateQuery(update): void {
    const { select, filter, period } = update;
    setPresets({ ...presets, selected: null });
    setQuery({
      period: period || query.period,
      select: select || query.select,
      filter: { ...query.filter, ...filter },
    });
  }

  async function runQuery(q): Promise<void> {
    setResult({ ...result, loading: true, ready: false });
    if (q) {
      setQuery(q);
    }
    const original = q || query;
    // deep copy
    const transformed = JSON.parse(JSON.stringify(original));
    // if decks, noteTypes or tags are filtered, add them to selection...
    ["decks", "noteTypes", "tags"].forEach((k) => {
      if (
        original.select[k] &&
        Object.values(original.filter[k] || {}).find((i) => i)
      ) {
        transformed.select[k] = original.filter[k];
      }
    });
    await tick(1000); // force it to re-render before blocking thread
    const data = await getRevisions({ query: transformed, info });
    const error = data.length === 0;
    setResult({
      loading: false,
      ready: true,
      error,
      data,
      query: transformed,
      period: periods[original.period],
    });
  }

  async function usePreset(selected): Promise<void> {
    if (presets.available[selected]) {
      const { graph, query } = presets.available[selected].data;
      setGraph(graph);
      runQuery(query);
    }
    setPresets({ ...presets, selected });
  }

  const { transform, Comp, ...graphInfo } = graphs[_graph.type];
  const data = result.ready && !result.error && transform(result, info);
  const graph = { ..._graph, ...graphInfo };

  const state = {
    query,
    orm,
    info,
    result,
    presets,
    graph,
    graphs,
    data,
    Comp,
  };

  const actions = {
    handleFileSelect,
    updateQuery,
    runQuery,
    usePreset,
    reset,
    setGraph,
  };

  return [state, actions];
}
