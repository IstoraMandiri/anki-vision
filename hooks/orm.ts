import { createConnection } from 'typeorm'
import { useState, useRef, useEffect } from 'react'
import { getSavedFile, loadFile } from '../utils/file'
import { Revlog, Cards, Col, Notes } from '../schema'

interface OrmState {
  ready?: boolean,
  log?: any
}
interface OrmActions {
  handleFileSelect: (any) => Promise<void>
}

export default function useOrm (): [OrmState, OrmActions] {
  const [state, setState] = useState({} as OrmState)

  const connection = useRef(null)

  async function connect (buffer) {
    connection.current = await createConnection({
      type: 'sqljs',
      database: buffer,
      entities: [Revlog, Cards, Col, Notes],
      logging: true
    })
    const log = await connection.current.manager.findOne(Col)
    setState({ log, ready: true })
  }

  // check if the file exists locally first and load it
  useEffect(() => {
    (async () => {
      const buffer = await getSavedFile()
      if (buffer) {
        connect(buffer)
      }
    })()
  }, [])

  async function handleFileSelect (e) {
    connect(await loadFile(e))
  }

  const actions = {
    handleFileSelect
  }

  return [state, actions]
}
