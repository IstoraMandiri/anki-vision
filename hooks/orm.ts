import { createConnection, getRepository } from 'typeorm'
import { useState, useRef, useEffect } from 'react'
import { getSavedFile, loadFile } from '../utils/file'
import { Revlog, Cards, Col, Notes } from '../schema'
import { colToCollectionInfo } from '../utils/transforms'
import { getRevisions } from '../utils/queries'
import Cache from '../utils/cache'

export default function useOrm (): [OrmState, OrmActions] {
  const [state, setState] = useState({ ready: false })

  const connection = useRef(null)

  async function connect (buffer) {
    connection.current = await createConnection({
      type: 'sqljs',
      database: buffer,
      entities: [Revlog, Cards, Col, Notes],
      logging: true,
      cache: { provider: () => new Cache() }
    })
    setState({ ready: true })
  }

  // load file if it  exists locally
  useEffect(() => {
    (async () => {
      const buffer = await getSavedFile()
      if (buffer) {
        connect(buffer)
      }
    })()
    return () => {
      connection.current.close()
    }
  }, [])

  async function handleFileSelect (e): Promise<void> {
    connect(await loadFile(e))
  }

  async function getCollectionInfo (): Promise<CollectionInfo> {
    const col = getRepository(Col)
    return colToCollectionInfo(await col.findOne())
  }

  async function makeQuery (query): Promise<any> {
    getRevisions(connection.current)
  }

  const actions = {
    handleFileSelect,
    getCollectionInfo,
    makeQuery
  }

  return [state, actions]
}
