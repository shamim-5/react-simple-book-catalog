import { IBooks } from "@/types/globalTypes";
import { booksApi, useGetBooksQuery } from "@/redux/features/books/booksApi";
import Error from "@/components/ui/Error";
import { Avatar, List } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hook";
import { useEffect } from "react";

const AllBooks = () => {
  const { searchTerm } = useAppSelector((state) => state.helper);

  const { data: books, isLoading, isError, error } = useGetBooksQuery(searchTerm);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (searchTerm) {
      dispatch(booksApi.endpoints.getBooks.initiate(searchTerm));
    }
  }, [searchTerm, dispatch]);

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
      console.log("An error occurred, but no error message is available.");
    }
  } else if (!isLoading && !isError && books?.length === 0) {
    content = <li className="m-2 text-center">No books found!</li>;
  } else if (!isLoading && !isError && books?.length > 0) {
    const data: IBooks[] = books.map((book: IBooks, i: number) => ({
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
          grid={{
            gutter: 16,
            sm: 1,
            lg: 4,
          }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item
              className="shadow border border-slate-300/40"
              key={item.title}
              extra={<img width={272} alt="logo" src={`${item.image}`} />}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<a href={`books/${item.id}`}>{item.title}</a>}
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
            </List.Item>
          )}
        />
      </div>
    );
  }

  return (
    <div className="">
      <h2 className="text-3xl uppercase font-mono text-slate-700/90">Available books</h2>

      <div className="my-6">{content}</div>
    </div>
  );
};

export default AllBooks;
