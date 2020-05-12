import { createConnection } from "typeorm";
import { useState, useRef, useEffect } from "react";

import { getSavedFile, loadFile, clear } from "../utils/file";

import Cache from "../utils/cache";
import Revlog from "../schema/revlog";
import Cards from "../schema/cards";
import Col from "../schema/col";
import Notes from "../schema/notes";
import tick from "../utils/tick";

export default function useOrm(): [OrmState, OrmActions] {
  const [state, setState] = useState({ ready: false, loading: true });

  const connection = useRef(null);

  async function connect(buffer) {
    setState({ ready: false, loading: true });
    connection.current = await createConnection({
      type: "sqljs",
      database: buffer,
      entities: [Revlog, Cards, Col, Notes],
      logging: true,
      cache: { provider: () => new Cache() },
    });
    setState({ ready: true, loading: false });
  }

  // load file if it  exists locally
  useEffect(() => {
    (async () => {
      const buffer = await getSavedFile();
      if (buffer) {
        connect(buffer);
      } else {
        setState({ ready: false, loading: false });
      }
    })();
    return () => {
      connection.current.close();
    };
  }, []);

  async function handleFileSelect(e): Promise<void> {
    connect(await loadFile(e));
  }

  async function reset() {
    await clear();
    await connection.current.close();
    setState({ ready: false, loading: false });
  }

  const actions = {
    handleFileSelect,
    reset,
  };

  return [state, actions];
}
