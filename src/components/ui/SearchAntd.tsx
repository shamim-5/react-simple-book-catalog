import { Space } from "antd";
import Search from "antd/es/input/Search";
import { SetStateAction, useState } from "react";

const SearchAntd: React.FC = () => {
  const [search, setSearch] = useState("");

  const onSearch = (e: { target: { value: SetStateAction<string> } }) => {
    setSearch(e.target.value);
  };

  console.log(search);
  return (
    <Space direction="vertical">
      <Search placeholder="input search text" allowClear onChange={onSearch} style={{ width: 304 }} />
    </Space>
  );
};

export default SearchAntd;
