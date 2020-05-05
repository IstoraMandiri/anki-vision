import { createConnection } from 'typeorm'
import { useState, useRef, useEffect } from 'react'
import { getSavedFile, loadFile } from '../utils/file'
import { Revlog, Cards, Col, Notes } from '../schema'
import Cache from '../utils/cache'

export default function useOrm (): [OrmState, OrmActions] {
  const [state, setState] = useState({ ready: false, loading: true })

  const connection = useRef(null)

  async function connect (buffer) {
    setState({ ready: false, loading: true })
    connection.current = await createConnection({
      type: 'sqljs',
      database: buffer,
      entities: [Revlog, Cards, Col, Notes],
      logging: true,
      cache: { provider: () => new Cache() }
    })
    setState({ ready: true, loading: false })
  }

  // load file if it  exists locally
  useEffect(() => {
    (async () => {
      const buffer = await getSavedFile()
      if (buffer) {
        connect(buffer)
      } else {
        setState({ ready: false, loading: false })
      }
    })()
    return () => {
      connection.current.close()
    }
  }, [])

  async function handleFileSelect (e): Promise<void> {
    connect(await loadFile(e))
  }

  const actions = {
    handleFileSelect
  }

  return [state, actions]
}
