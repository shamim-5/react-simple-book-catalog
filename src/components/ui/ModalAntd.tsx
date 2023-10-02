import React from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal, Space } from "antd";
import { useAppDispatch } from "@/redux/hooks/hook";
import { booksApi } from "@/redux/features/books/booksApi";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const { confirm } = Modal;

const ModalAntd: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure delete this book?",
      icon: <ExclamationCircleFilled />,
      content: "Click yes to permanently delete this book",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        dispatch(booksApi.endpoints.deleteBook.initiate(id));
        toast.success("Book deleted successfully");
      },
      onCancel() {
        toast.info("Terminate delete operation");
      },
    });
  };

  return (
    <Space wrap>
      <Button onClick={showDeleteConfirm} type="default" danger>
        Delete Book
      </Button>
    </Space>
  );
};

export default ModalAntd;
