import React from "react";
import { IBooks, IErrorResponse, IReviews } from "@/types/globalTypes";
import { MessageOutlined, StarOutlined } from "@ant-design/icons";
import { Avatar, Button, Form, InputNumber, List, Space } from "antd";
import { useParams } from "react-router-dom";
import Error from "@/components/ui/Error";
import { useEditBookMutation, useGetBooksByIdQuery, useGetBooksQuery } from "@/redux/features/books/booksApi";
import { useAppSelector } from "@/redux/hooks/hook";
import Comments from "@/components/Comments";
import ModalAntd from "@/components/ui/ModalAntd";
import TextArea from "antd/es/input/TextArea";
import { v4 as uuidv4 } from "uuid";

const BookDetails = () => {
  const params = useParams();
  const { field, searchTerm } = useAppSelector((state) => state.helper) || {};
  const { data: books, isLoading, isError, error } = useGetBooksQuery({ field, searchTerm });
  const [editBook, { isSuccess: isEditBookSuccess, isLoading: isEditBookLoading, isError: isEditBookError }] =
    useEditBookMutation();
  const { data: bookData, isLoading: isDataLoading } = useGetBooksByIdQuery(params.id);
  const auth = useAppSelector((state) => state.auth);

  const IconText = ({ icon, text }: { icon: React.FC; text: string | number }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  const calculateAverageRatingAndCount = (reviews: IReviews[]): { averageRating: number; numberOfReviews: number } => {
    const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = Math.ceil(totalRatings / reviews.length);
    const numberOfReviews = reviews.length;

    return {
      averageRating,
      numberOfReviews,
    };
  };

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
      reviews: calculateAverageRatingAndCount((book?.reviews as IReviews[]) || []),
    }));

    // add new review to reviews array
    const onFinish = (values: IReviews) => {
      const newReview = {
        id: uuidv4(),
        user: auth?.user,
        rating: values.rating,
        comment: values?.comment || "",
      };

      const updatedReviews = [...bookData.reviews, newReview];
      const updatedData = {
        ...bookData,
        reviews: updatedReviews,
      };

      editBook({ id: params.id, data: updatedData });

      console.log(values, params.id);
      console.log(isEditBookError, isEditBookLoading, isEditBookSuccess);
    };

    content = (
      <div>
        <List
          className=""
          itemLayout="vertical"
          size="large"
          dataSource={data}
          renderItem={(item) => (
            <>
              <List.Item
                className="flex flex-col-reverse lg:flex-row"
                key={item.title}
                actions={[
                  <IconText
                    icon={StarOutlined}
                    text={(item?.reviews as { averageRating: number; numberOfReviews: number })?.averageRating}
                    key="list-vertical-star-o"
                  />,
                  <IconText
                    icon={MessageOutlined}
                    text={(item?.reviews as { averageRating: number; numberOfReviews: number })?.numberOfReviews}
                    key="list-vertical-message"
                  />,

                  <Button href={`/edit-book/${params.id}`} type="primary" ghost>
                    Edit Book
                  </Button>,
                  <ModalAntd />,
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
                      <p>
                        Avarage Ratings:{" "}
                        <span>
                          {(item?.reviews as { averageRating: number; numberOfReviews: number })?.averageRating}
                        </span>
                      </p>
                      <p>
                        Total Reviews:{" "}
                        <span>
                          {(item?.reviews as { averageRating: number; numberOfReviews: number })?.numberOfReviews}
                        </span>
                      </p>
                    </div>
                  }
                />

                {item.description}
              </List.Item>
              {isDataLoading ? (
                <div>Loading...</div>
              ) : (
                <>
                  <Form
                    onFinish={onFinish}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 18 }}
                    className="border shadow-sm p-4 mb-4"
                  >
                    <Form.Item label="Rating" name="rating" rules={[{ required: true }]}>
                      <InputNumber min={1} max={5} step={0.5} />
                    </Form.Item>
                    <Form.Item label="Leave a comment" name="comment">
                      <TextArea rows={2} />
                    </Form.Item>
                    <Form.Item label=" " colon={false}>
                      <Button
                        disabled={isLoading}
                        type="primary"
                        ghost
                        htmlType="submit"
                        style={{ display: "inline-block" }}
                        className="bg-cyan-900/30 text-[#475466]"
                      >
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                </>
              )}
              <Space className="text-lg font-mono">Recent Comments :</Space>
              <Comments />
            </>
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
