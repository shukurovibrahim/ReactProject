import { Header } from "../layout/header.jsx";
import { useSelector } from "react-redux";

export const Basket = () => {
  const basket = useSelector((state) => state.basket.items);

  return (
    <div>
      <Header />

      <div className="basket">
        {basket.map((item) => (
          <div key={item.id}>
            <div>{item.name}</div>
            Items:
            {item.items.map((item) => (
              <div>
                <div>{item.Title}</div>
              </div>
            ))}
            <br />
          </div>
        ))}
      </div>
    </div>
  );
};
