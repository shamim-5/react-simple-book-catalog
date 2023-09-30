import React from "react";
import { IBooks, IErrorResponse } from "@/types/globalTypes";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { Avatar, List, Space } from "antd";
import { useParams } from "react-router-dom";
import Error from "@/components/ui/Error";
import { useGetBooksQuery } from "@/redux/features/books/booksApi";
import { useAppSelector } from "@/redux/hooks/hook";

const BookDetails = () => {
  const { field, searchTerm } = useAppSelector((state) => state.helper) || {};
  const { data: books, isLoading, isError, error } = useGetBooksQuery({ field, searchTerm });

  const params = useParams();
  const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <p className="m-2 text-center">Loading...</p>;
  } else if (!isLoading && isError) {
    if ("message" in error) {
      content = (
        <div className="m-2 text-center">
          <Error message={error?.message} />
        </div>
      );
    } else {
      const errorResponse = error as IErrorResponse;
      console.log(errorResponse?.error);
    }
  } else if (!isLoading && !isError && books?.length === 0) {
    content = <li className="m-2 text-center">No books found!</li>;
  } else if (!isLoading && !isError && books?.length > 0) {
    const isExist = books?.filter((book: IBooks) => book?.id === parseInt(params?.id as string));

    const data: IBooks[] = isExist?.map((book: IBooks, i: number) => ({
      id: parseInt(`${book.id}`),
      avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
      title: `${book.title}`,
      author: `${book.author}`,
      genre: `${book.genre}`,
      publication_date: `${book.publication_date.split("T")[0]}`,
      description: `${book.description}`,
      image: `${book.image}`,
    }));

    content = (
      <div>
        <List
          className=""
          itemLayout="vertical"
          size="large"
          dataSource={data}
          renderItem={(item) => (
            <List.Item
              className="flex flex-col-reverse lg:flex-row"
              key={item.title}
              actions={[
                <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
              ]}
              extra={<img width={272} alt="logo" src={`${item.image}`} />}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<a href={``}>{item.title}</a>}
                description={
                  <div>
                    <h3>
                      Author: <span>{item.author}</span>
                    </h3>
                    <p>
                      Genre: <span>{item.genre}</span>
                    </p>
                    <p>
                      Publication Date: <span>{item.publication_date}</span>
                    </p>
                  </div>
                }
              />

              {item.description}
            </List.Item>
          )}
        />
      </div>
    );
  }
  return (
    <div>
      <h2 className="text-3xl uppercase font-mono text-slate-700/90">Book Details</h2>

      <div className="my-6">{content}</div>
    </div>
  );
};

export default BookDetails;
