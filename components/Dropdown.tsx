import { Menu, Dropdown, Button } from 'antd'
import { DownOutlined } from '@ant-design/icons'

const DropdownSelect = ({ items: _items, selected, onChange }) => {
  const items = Object.keys(_items).map(id => ({ ..._items[id], id }))
  return (
    <>
      <Dropdown overlay={(
        <Menu>
          {items.map((i) => (
            <Menu.Item key={i.id} onClick={(e) => { onChange(e.key) }}>
              {i.name}
            </Menu.Item>
          ))}
        </Menu>
      )}>
        <Button>
          {_items[selected] && (_items[selected].name || selected)} <DownOutlined />
        </Button>
      </Dropdown>
    </>
  )
}

export default DropdownSelect
