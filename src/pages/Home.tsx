import BestBooks from "./BestBooks";

const Home = () => {
  return (
    <div className="">
      <h2 className="text-3xl uppercase font-mono text-slate-700/90">Top 10 recent books</h2>
      <div className="my-6">
         <BestBooks />
      </div>
    </div>
  );
};

export default Home;
