import BestBooks from "../components/BestBooks";
import { IBooks } from "@/types/globalTypes";
import { useGetBooksQuery } from "@/redux/features/books/booksApi";
import Error from "@/components/ui/Error";

const Home = () => {
  const { data: books, isLoading, isError, error } = useGetBooksQuery(undefined);

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
      publication_date: `${book.publication_date}`,
      description: `${book.description}`,
      image: `${book.image}`,
    }));

    content = <BestBooks data={data} />;
  }

  return (
    <div className="">
      <h2 className="text-3xl uppercase font-mono text-slate-700/90">Top 10 recent books</h2>

      <div className="my-6">
        {content}
      </div>
    </div>
  );
};

export default Home;
