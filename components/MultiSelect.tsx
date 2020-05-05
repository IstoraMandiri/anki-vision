import { Select } from 'antd'

const { Option } = Select

const MultiSelect = ({ name, items, onChange }) => {
  return (
    <Select allowClear placeholder={name} filterOption={true} mode="tags" onChange={onChange} style={{ width: '100%' }}>
      {items.map(({ id, name }) => <Option value={`${id}`} key={id}>{name}</Option>)}
    </Select>
  )
}

export default MultiSelect
