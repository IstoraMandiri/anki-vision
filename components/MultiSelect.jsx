import { Select } from 'antd'

const { Option } = Select

const MultiSelect = ({ items, onChange }) => {
  return (
    <Select mode="tags" placeholder="Select" onChange={onChange} style={{ width: '100%' }}>
      {items.map(({ id, name }) => <Option defaultValue={{ key: id }} key={id}>{name}</Option>)}
    </Select>
  )
}

export default MultiSelect
