import { useEditBookMutation, useGetBooksByIdQuery } from "@/redux/features/books/booksApi";
import { IBooks } from "@/types/globalTypes";
import { Button, DatePicker, Form, Input, Select, Switch } from "antd";
import TextArea from "antd/es/input/TextArea";
import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditBook: React.FC = () => {
  const { id } = useParams();
  const [isEditMode, setIsEditMode] = useState(true);
  const [form] = Form.useForm();
  const [editBook, { isSuccess, isLoading, isError }] = useEditBookMutation();
  const { data: bookData, isLoading: isDataLoading } = useGetBooksByIdQuery(id);

  useEffect(() => {
    if (bookData && form) {
      const formattedBookData = {
        ...bookData,
        publication_date: moment(bookData.publication_date, "YYYY-MM-DD"),
      };
      form.setFieldsValue(formattedBookData);
    }
  }, [bookData, form]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Book updated successfully!");
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isError, isSuccess]);

  const handleEditModeToggle = () => {
    setIsEditMode(!isEditMode);
  };

  const onFinish = (values: IBooks) => {
    editBook({ id: id, data: values });
  };

  return (
    <div>
      <div className="flex justify-center items-center">
        <h2 className="text-3xl uppercase font-mono text-slate-700/90 text-center mb-4 mr-4">Edit book</h2>
        <Switch
          className="bg-slate-700/90"
          checkedChildren="Disable Editing"
          unCheckedChildren="Enable Editing"
          onClick={handleEditModeToggle}
          defaultChecked
        ></Switch>
      </div>

      {isDataLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Form
            form={form}
            onFinish={onFinish}
            className="mx-auto"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 18 }}
            layout="horizontal"
            style={{ maxWidth: 600 }}
            disabled={!isEditMode}
          >
            <Form.Item label="Title" name="title">
              <Input />
            </Form.Item>
            <Form.Item label="Author" name="author">
              <Input />
            </Form.Item>

            <Form.Item label="Genre" name="genre">
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
            <Form.Item label="Image URL" name="image">
              <Input />
            </Form.Item>

            <Form.Item label="Publication Date" name="publication_date">
              <DatePicker format="YYYY-MM-DD" className="w-full" />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <TextArea rows={2} />
            </Form.Item>

            <Form.Item label=" " colon={false}>
              <Button
                disabled={isLoading || !isEditMode}
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
        </>
      )}
    </div>
  );
};

export default EditBook;
