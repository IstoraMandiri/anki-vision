import { Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";

import { periods } from "../utils/periods";

const PeriodSelect = ({ period, onChange }) => {
  const items = Object.keys(periods).map((id) => ({ ...periods[id], id }));
  return (
    <>
      <Dropdown
        overlay={
          <Menu>
            {items.map((i) => (
              <Menu.Item
                key={i.id}
                onClick={(e): void => {
                  onChange(e.key);
                }}
              >
                {i.name}
              </Menu.Item>
            ))}
          </Menu>
        }
      >
        <Button>
          {periods[period] && periods[period].name} <DownOutlined />
        </Button>
      </Dropdown>
    </>
  );
};

export default PeriodSelect;
