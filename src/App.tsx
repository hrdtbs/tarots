import { motion, useAnimation } from "framer-motion";
import { css } from "@linaria/core";
import { useState } from "react";
import { shuffle } from "./helpers/shuffle";
import clsx from "clsx";

const cardStyles = {
  container: css`
    width: 300px;
    aspect-ratio: 300/528;
    position: relative;
    box-sizing: border-box;
    border: 8px solid #242424;
    border-radius: 8px;
    box-shadow: 0px 0px 1px 0px #fff;
  `,
  backface: css`
    width: 100%;
    height: 100%;
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
  `,
};
const cards = shuffle(
  [
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
  ].map((card) => {
    return {
      ...card,
      reversed: Math.random() < 0.5,
    };
  })
);

const Card = ({ index }: { index: number }) => {
  const [tapped, setTapped] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const controls = useAnimation();
  const data = cards[index];
  return deleted ? (
    tapped ? (
      <motion.div
        animate={{
          zIndex: 99,
          x: 0,
          opacity: 0.9,
          rotateZ: data.reversed ? 180 : 0,
        }}
        className={clsx(
          cardStyles.container,
          css`
            border-width: 2px;
            border-radius: 2px;
            width: 50px;
          `
        )}
      >
        <img
          className={css`
            -webkit-user-drag: none;
            user-select: none;
            display: flex;
            width: 100%;
            height: 100%;
          `}
          src={data.src}
        />
      </motion.div>
    ) : null
  ) : (
    <motion.div
      drag="x"
      dragElastic={1}
      onDragEnd={async (event, info) => {
        const offsetX = info.offset.x;
        const velocityX = info.velocity.x;
        console.log(offsetX, velocityX);
        if (offsetX > 100 || velocityX > 500) {
          await controls.start({
            x: "100%",
            transition: { duration: 0.4 },
          });
          setDeleted(true);
        } else {
          controls.start({
            x: 0,
            y: 0,
            transition: { duration: 0.2 },
          });
        }
      }}
      animate={controls}
    >
      <motion.div
        animate={{
          rotateZ: [
            0,
            5 * index,
            10 * index,
            20 * index,
            30 * index,
            40 * index,
            0,
            20,
            0,
          ],
          x: [
            index,
            index,
            index,
            index,
            index,
            index,
            index,
            (index % 3) * 100 + index - 150,
            index,
          ],
          y: [
            index,
            index,
            index,
            index,
            index,
            index,
            index,
            index + 100,
            index,
          ],
          originX: "right",
          originY: "bottom",
        }}
        transition={{
          duration: 4,
        }}
        style={{ position: "absolute", top: 20, left: 20 }}
      >
        <motion.div
          onTap={() => {
            setTapped((prev) => !prev);
          }}
          animate={{
            rotateY: tapped ? 180 : 0,
            rotateZ: data.reversed ? 180 : 0,
          }}
          className={cardStyles.container}
          style={{
            transformStyle: "preserve-3d",
            perspective: 1000,
          }}
        >
          <div
            className={css`
              position: relative;
              height: 100%;
            `}
          >
            <img
              className={css`
                -webkit-user-drag: none;
                user-select: none;
                display: flex;
                width: 100%;
                height: 100%;
              `}
              src={data.src}
            />
            <a
              className={css`
                position: absolute;
                bottom: 0px;
                width: 100%;
                height: 80px;
              `}
              href={data.href}
              target="_blank"
              rel="noopener noreferrer"
            />
          </div>
          <div
            className={clsx(
              cardStyles.backface,
              css`
                position: absolute;
                backface-visibility: hidden;
                top: 0px;
              `
            )}
          ></div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

function App() {
  return (
    <div
      className={css`
        position: relative;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
      `}
    >
      <motion.div>
        {cards.map(({ number }, index) => {
          return <Card index={index} key={number} />;
        })}
      </motion.div>
    </div>
  );
}

export default App;
