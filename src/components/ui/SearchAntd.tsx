import { SetStateAction, useState } from "react";
import { booksApi } from "@/redux/features/books/booksApi";
import { setSearchTerm } from "@/redux/features/helper/helperSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hook";
import { DatePicker, Select, Space } from "antd";
import Search from "antd/es/input/Search";

const SearchAntd: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const { field, searchTerm } = useAppSelector((state) => state.helper) || {};

  const dispatch = useAppDispatch();

  const onSearch = async (e: { target: { value: string | undefined } }) => {
    const currentSearchTerm = e.target.value;

    await dispatch(setSearchTerm({ field: "title", searchTerm: currentSearchTerm }));
    dispatch(booksApi.endpoints.getBooks.initiate({ field, searchTerm }));
  };

  const handleGenreChange = async (value: SetStateAction<null>) => {
    // console.log("Selected value:", value);
    setSelectedValue(value);

    await dispatch(setSearchTerm({ field: "genre", searchTerm: value }));
    dispatch(booksApi.endpoints.getBooks.initiate({ field, searchTerm }));
  };
  const handleDateChange = async (_date: unknown, dateString: unknown) => {
    // console.log("Formatted Date String:", dateString);

    await dispatch(setSearchTerm({ field: "publication_date", searchTerm: dateString }));
    dispatch(booksApi.endpoints.getBooks.initiate({ field, searchTerm }));
  };

  // console.log("[SearchAntd Component] render :", field, searchTerm);
  return (
    <div className="flex items-center justify-center">
      <div className="mb-8 mr-1">
        <Select placeholder="Genre" onChange={handleGenreChange} value={selectedValue} className="min-w-[100px]">
          <Select.Option value="Classic">Classic</Select.Option>
          <Select.Option value="Fantasy">Fantasy</Select.Option>
          <Select.Option value="Dystopian">Dystopian</Select.Option>
          <Select.Option value="Romance">Romance</Select.Option>
          <Select.Option value="Adventure">Adventure</Select.Option>
          <Select.Option value="Coming-of-age">Coming-of-age</Select.Option>
          <Select.Option value="Historical Fiction">Historical Fiction</Select.Option>
          <Select.Option value="Horror">Horror</Select.Option>
          <Select.Option value="Philosophical">Philosophical</Select.Option>
          <Select.Option value="Post-apocalyptic">Post-apocalyptic</Select.Option>
          <Select.Option value="Epic Poetry">Epic Poetry</Select.Option>
          <Select.Option value="Gothic">Gothic</Select.Option>
        </Select>
      </div>
      <div className="mb-8 mr-1 max-w-[110px]">
        <DatePicker onChange={handleDateChange} picker="year" className="" />
      </div>
      <div>
        <Space direction="vertical" className="max-w-[200px]">
          <Search placeholder="Search by title" allowClear onChange={onSearch} />
        </Space>
      </div>
    </div>
  );
};

export default SearchAntd;
