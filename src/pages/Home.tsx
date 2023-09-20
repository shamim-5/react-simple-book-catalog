import { useEffect, useState } from "react";
import BestBooks from "../components/BestBooks";
import { IBooks } from "@/types/globalTypes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Button } from "antd";
import { increment } from "@/redux/features/books/booksSlice";

const Home = () => {
  const [books, setBooks] = useState<IBooks[]>([]);

  // TODO: redux-toolkit bookSlice check 
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("http://localhost:9000/books")
      .then((res) => res.json())
      .then(setBooks);
  }, []);

  const data: IBooks[] = books.map((book: IBooks, i) => ({
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
    <div className="">
      <h2 className="text-3xl uppercase font-mono text-slate-700/90">Top 10 recent books</h2>
      
      <Button type="default" onClick={()=> dispatch(increment())}>
        <span>Count in :: {count}</span>
      </Button>

      <div className="my-6">
        <BestBooks data={data} />
      </div>
    </div>
  );
};

export default Home;
