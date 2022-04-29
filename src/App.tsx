import { useState } from "react";
import { css } from "@linaria/core";
import clsx from "clsx";

const useSwipe = ({
  onDragging,
  onSwipeLeft,
  onSwipeRight,
}: {
  onDragging?: (dx: number) => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}) => {
  const [x0, setX0] = useState(0);
  const [locked, setLocked] = useState(false);

  const unify = (
    event: (React.MouseEvent & { changedTouches?: never }) | React.TouchEvent
  ) => {
    return event.changedTouches ? event.changedTouches[0] : event;
  };

  const lock = (event: React.MouseEvent | React.TouchEvent) => {
    setX0(unify(event).clientX);
    setLocked(true);
  };

  const drag = (event: React.MouseEvent | React.TouchEvent) => {
    if (locked) {
      const dx = unify(event).clientX - x0;
      onDragging?.(dx);
    }
  };

  const move = (event: React.MouseEvent | React.TouchEvent) => {
    if (locked) {
      const dx = unify(event).clientX - x0;
      const sign = Math.sign(dx);

      if (Math.abs(dx) > 10) {
        if (sign > 0) {
          onSwipeRight?.();
        } else {
          onSwipeLeft?.();
        }
      }
      setX0(0);
      setLocked(false);
    }
  };

  return {
    onMouseDown: lock,
    onTouchStart: lock,
    onMouseMove: drag,
    onTouchMove: drag,
    onMouseUp: move,
    onTouchEnd: move,
  };
};

const Card = ({
  index,
  src,
  href,
  onSwap,
}: {
  index: number;
  src: string;
  href: string;
  onSwap: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<"right" | "left">();
  const [locked, setLocked] = useState(false);
  const handlers = useSwipe({
    onSwipeLeft: () => {
      setLocked(true);
      setSwipeDirection("left");
      setOpen(false);
    },
    onSwipeRight: () => {
      setLocked(true);
      setSwipeDirection("right");
      setOpen(false);
    },
  });
  return (
    <div
      {...handlers}
      className={clsx(
        css`
          position: absolute;
          width: 100%;
          transition: left 0.2s;
        `,
        swipeDirection === "right"
          ? css`
              left: 90% !important;
            `
          : swipeDirection === "left"
          ? css`
              left: -90% !important;
            `
          : null
      )}
      onTransitionEnd={(event) => {
        if (locked === false) return;
        if (event.propertyName === "left") {
          setSwipeDirection(undefined);
          onSwap();
        }
        setLocked(false);
      }}
      style={{
        top: index,
        left: index,
        zIndex: index,
      }}
    >
      <div
        onClick={() => {
          setOpen(true);
        }}
        className={clsx(
          css`
            width: 90%;
            aspect-ratio: 300/528;
            position: relative;
            box-sizing: border-box;
            border: 8px solid #242424;
            border-radius: 8px;
            transition: transform 0.4s ease-in-out;
            transform-style: preserve-3d;
            perspective: 1000px;
            transform: rotateY(0deg);
            box-shadow: 0px 0px 1px 0px #fff;
            img {
              -webkit-user-drag: none;
              user-select: none;
              display: flex;
              width: 100%;
              height: 100%;
              opacity: 1;
            }
          `,
          open
            ? css`
                transform: rotateY(180deg);
              `
            : null
        )}
      >
        <div
          className={css`
            position: relative;
            height: 100%;
          `}
        >
          <img src={src} />
          <a
            className={css`
              position: absolute;
              bottom: 0px;
              width: 100%;
              height: 80px;
            `}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          />
        </div>
        <div
          className={css`
            position: absolute;
            top: 0px;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            background: repeating-radial-gradient(
                circle,
                transparent,
                transparent 6.3px,
                #ffe78b 6.3px,
                #ffe78b 8.1px
              ),
              repeating-radial-gradient(
                circle,
                transparent,
                transparent 6.3px,
                #ffe78b 6.3px,
                #ffe78b 8.1px
              ),
              #484848;
            background-size: 36px 36px;
            background-position: 0 0, 18px 18px, 36px 18px;
            background-color: #484848;
          `}
        />
      </div>
    </div>
  );
};

const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const cards_ = [
  {
    number: 0,
    src: "https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg",
    href: "https://ja.wikipedia.org/wiki/%E6%84%9A%E8%80%85",
  },
  {
    number: 1,
    src: "https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg",
    href: "https://ja.wikipedia.org/wiki/%E9%AD%94%E8%A1%93%E5%B8%AB_(%E3%82%BF%E3%83%AD%E3%83%83%E3%83%88)",
  },
  {
    number: 2,
    src: "https://upload.wikimedia.org/wikipedia/commons/8/88/RWS_Tarot_02_High_Priestess.jpg",
    href: "https://ja.wikipedia.org/wiki/%E5%A5%B3%E6%95%99%E7%9A%87",
  },
  {
    number: 3,
    src: "https://upload.wikimedia.org/wikipedia/commons/d/d2/RWS_Tarot_03_Empress.jpg",
    href: "https://ja.wikipedia.org/wiki/%E5%A5%B3%E5%B8%9D_(%E3%82%BF%E3%83%AD%E3%83%83%E3%83%88)",
  },
  {
    number: 4,
    src: "https://upload.wikimedia.org/wikipedia/commons/c/c3/RWS_Tarot_04_Emperor.jpg",
    href: "https://ja.wikipedia.org/wiki/%E7%9A%87%E5%B8%9D_(%E3%82%BF%E3%83%AD%E3%83%83%E3%83%88)",
  },
  {
    number: 5,
    src: "https://upload.wikimedia.org/wikipedia/commons/8/8d/RWS_Tarot_05_Hierophant.jpg",
    href: "https://ja.wikipedia.org/wiki/%E6%95%99%E7%9A%87_(%E3%82%BF%E3%83%AD%E3%83%83%E3%83%88)",
  },
  {
    number: 6,
    src: "https://upload.wikimedia.org/wikipedia/commons/3/3a/TheLovers.jpg",
    href: "https://ja.wikipedia.org/wiki/%E6%81%8B%E4%BA%BA_(%E3%82%BF%E3%83%AD%E3%83%83%E3%83%88)",
  },
  {
    number: 7,
    src: "https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg",
    href: "https://ja.wikipedia.org/wiki/%E6%88%A6%E8%BB%8A_(%E3%82%BF%E3%83%AD%E3%83%83%E3%83%88)",
  },
  {
    number: 8,
    src: "https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg",
    href: "https://ja.wikipedia.org/wiki/%E5%8A%9B_(%E3%82%BF%E3%83%AD%E3%83%83%E3%83%88)",
  },
  {
    number: 9,
    src: "https://upload.wikimedia.org/wikipedia/commons/4/4d/RWS_Tarot_09_Hermit.jpg",
    href: "https://ja.wikipedia.org/wiki/%E9%9A%A0%E8%80%85_(%E3%82%BF%E3%83%AD%E3%83%83%E3%83%88)",
  },
  {
    number: 10,
    src: "https://upload.wikimedia.org/wikipedia/commons/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg",
    href: "https://ja.wikipedia.org/wiki/%E9%81%8B%E5%91%BD%E3%81%AE%E8%BC%AA",
  },
  {
    number: 11,
    src: "https://upload.wikimedia.org/wikipedia/commons/e/e0/RWS_Tarot_11_Justice.jpg",
    href: "https://ja.wikipedia.org/wiki/%E6%AD%A3%E7%BE%A9_(%E3%82%BF%E3%83%AD%E3%83%83%E3%83%88)",
  },
  {
    number: 12,
    src: "https://upload.wikimedia.org/wikipedia/commons/2/2b/RWS_Tarot_12_Hanged_Man.jpg",
    href: "https://ja.wikipedia.org/wiki/%E5%90%8A%E3%81%95%E3%82%8C%E3%81%9F%E7%94%B7",
  },
  {
    number: 13,
    src: "https://upload.wikimedia.org/wikipedia/commons/d/d7/RWS_Tarot_13_Death.jpg",
    href: "https://ja.wikipedia.org/wiki/%E6%AD%BB%E7%A5%9E_(%E3%82%BF%E3%83%AD%E3%83%83%E3%83%88)",
  },
  {
    number: 14,
    src: "https://upload.wikimedia.org/wikipedia/commons/f/f8/RWS_Tarot_14_Temperance.jpg",
    href: "https://ja.wikipedia.org/wiki/%E7%AF%80%E5%88%B6_(%E3%82%BF%E3%83%AD%E3%83%83%E3%83%88)",
  },
  {
    number: 15,
    src: "https://upload.wikimedia.org/wikipedia/commons/5/55/RWS_Tarot_15_Devil.jpg",
    href: "https://ja.wikipedia.org/wiki/%E6%82%AA%E9%AD%94_(%E3%82%BF%E3%83%AD%E3%83%83%E3%83%88)",
  },
  {
    number: 16,
    src: "https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg",
    href: "https://ja.wikipedia.org/wiki/%E5%A1%94_(%E3%82%BF%E3%83%AD%E3%83%83%E3%83%88)",
  },
  {
    number: 17,
    src: "https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_17_Star.jpg",
    href: "https://ja.wikipedia.org/wiki/%E6%98%9F_(%E3%82%BF%E3%83%AD%E3%83%83%E3%83%88)",
  },
  {
    number: 18,
    src: "https://upload.wikimedia.org/wikipedia/commons/7/7f/RWS_Tarot_18_Moon.jpg",
    href: "https://ja.wikipedia.org/wiki/%E6%9C%88_(%E3%82%BF%E3%83%AD%E3%83%83%E3%83%88)",
  },
  {
    number: 19,
    src: "https://upload.wikimedia.org/wikipedia/commons/1/17/RWS_Tarot_19_Sun.jpg",
    href: "https://ja.wikipedia.org/wiki/%E5%A4%AA%E9%99%BD_(%E3%82%BF%E3%83%AD%E3%83%83%E3%83%88)",
  },
  {
    number: 20,
    src: "https://upload.wikimedia.org/wikipedia/commons/d/dd/RWS_Tarot_20_Judgement.jpg",
    href: "https://ja.wikipedia.org/wiki/%E5%AF%A9%E5%88%A4_(%E3%82%BF%E3%83%AD%E3%83%83%E3%83%88)",
  },
  {
    number: 21,
    src: "https://upload.wikimedia.org/wikipedia/commons/f/ff/RWS_Tarot_21_World.jpg",
    href: "https://ja.wikipedia.org/wiki/%E4%B8%96%E7%95%8C_(%E3%82%BF%E3%83%AD%E3%83%83%E3%83%88)",
  },
];

function App() {
  const [cards, setCards] = useState(shuffle(cards_));

  const handleSwap = () => {
    setCards((prev) => {
      const copy = prev.slice();
      const index = Math.floor(Math.random() * (prev.length - 1));
      const tmp = copy[index];
      copy[prev.length - 1] = tmp;
      copy[index] = prev[prev.length - 1];
      return copy;
    });
  };

  return (
    <div>
      <div
        className={css`
          position: relative;
          width: 100%;
          max-width: 300px;
          margin: auto;
          height: 100vh;
        `}
      >
        {cards.map(({ number, src, href }, index) => {
          return (
            <Card
              index={index}
              src={src}
              href={href}
              key={number}
              onSwap={handleSwap}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
