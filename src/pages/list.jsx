import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Header } from "../layout/header.jsx";

export const List = () => {
  const { id } = useParams();
  const currentList = useSelector((state) =>
    state.basket.items.find((list) => list.id === id),
  );

  return (
    <div>
      <Header />

      <h2>{currentList.name}</h2>
      <ul>
        {currentList.items.map((item) => (
          <li key={item.imdbID}>
            <Link to={`/movie/${item.imdbID}`}>{item.Title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
