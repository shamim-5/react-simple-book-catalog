import { booksApi } from "@/redux/features/books/booksApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hook";
import { Space } from "antd";
import Search from "antd/es/input/Search";

const SearchAntd: React.FC = () => {
  const { searchTerm } = useAppSelector((state) => state.helper);

  const dispatch = useAppDispatch();

  const onSearch = (e: { target: { value: string | undefined } }) => {
    const currentSearchTerm = e.target.value;
    dispatch(booksApi.endpoints.getBooks.initiate(currentSearchTerm));
  };

  console.log("[SearchAntd Component] render :", searchTerm);
  return (
    <Space direction="vertical">
      <Search placeholder="input search text" allowClear onChange={onSearch} style={{ width: 304 }} />
    </Space>
  );
};

export default SearchAntd;
