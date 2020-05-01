import 'reflect-metadata'

import useOrm from '../hooks/orm'
import Json from '../components/Json'

export default function Home () {
  const [state, { handleFileSelect }] = useOrm()
  return (
    <div className="container">
      <input type="file" onChange={handleFileSelect} />
      <Json>{state}</Json>
    </div>
  )
}
