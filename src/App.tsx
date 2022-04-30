import { css } from "@linaria/core";
import { shuffle } from "./helpers/shuffle";
import { cardList } from "./assets/cardList";
import { AnimateCard } from "./components/Card";

const cards = shuffle(
  cardList.map((card) => {
    return {
      ...card,
      reversed: Math.random() < 0.5,
    };
  })
);

function App() {
  return (
    <div
      className={css`
        width: 100vw;
        height: 100vh;
        overflow: hidden;
      `}
    >
      <div
        className={css`
          width: 300px;
          margin: auto;
          margin-top: 40px;
          position: relative;
        `}
      >
        {cards.map(({ number, ...props }, index) => {
          return <AnimateCard index={index} key={number} {...props} />;
        })}
      </div>
    </div>
  );
}

export default App;
