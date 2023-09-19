import { useEffect, useState } from "react";
import { IBooks } from "@/types/globalTypes";
import BestBooks from "@/components/BestBooks";
import { useParams } from "react-router-dom";

const BookDetails = () => {
  const [books, setBooks] = useState<IBooks[]>([]);

  useEffect(() => {
    fetch("http://localhost:9000/books")
      .then((res) => res.json())
      .then(setBooks);
  }, []);

  const params = useParams();
  const isExist = books?.filter((book) => book?.id === parseInt(params?.id as string));

  const data: IBooks[] = isExist?.map((book: IBooks, i) => ({
    id: parseInt(`${book.id}`),
    avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
    title: `${book.title}`,
    author: `${book.author}`,
    genre: `${book.genre}`,
    publication_date: `${book.publication_date}`,
    description: `${book.description}`,
    image: `${book.image}`,
  }));
  return (
    <div>
      <h2 className="text-3xl uppercase font-mono text-slate-700/90">Book Details</h2>

      <div>
        <BestBooks data={data} />
      </div>
    </div>
  );
};

export default BookDetails;
