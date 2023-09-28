import { useAddNewBookMutation } from "@/redux/features/books/booksApi";
import { IBooks } from "@/types/globalTypes";
import { Button, DatePicker, Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";
import { toast } from "react-toastify";

const AddNewBook: React.FC = () => {
  const [addNewBook, { isSuccess, isLoading, isError }] = useAddNewBookMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Book added successfully!");
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isError, isSuccess]);

  const onFinish = (values: IBooks) => {
    addNewBook(values);
  };

  return (
    <div>
      <h2 className="text-3xl uppercase font-mono text-slate-700/90 text-center mb-4">Add new book</h2>

      <Form
        onFinish={onFinish}
        className="mx-auto"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
      >
        <Form.Item label="Title" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Author" name="author" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Genre" name="genre" rules={[{ required: true }]}>
          <Select>
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
        </Form.Item>
        <Form.Item label="Image URL" name="image" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Publication Date" name="publication_date" rules={[{ required: true }]}>
          <DatePicker className="w-full" />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <TextArea rows={2} />
        </Form.Item>

        <Form.Item label=" " colon={false}>
          <Button
            disabled={isLoading}
            type="primary"
            ghost
            htmlType="submit"
            style={{ display: "inline-block", margin: "0 8px" }}
            className="bg-cyan-900/30 text-[#475466] w-full"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddNewBook;
