import { css } from "@linaria/core";
import clsx from "clsx";
import { HTMLMotionProps, motion } from "framer-motion";
import { useState } from "react";
import { CardData } from "../model/card";
import { SwipeToDelete } from "./SwipeToDelete";

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
    position: absolute;
    backface-visibility: hidden;
    top: 0px;
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
  image: css`
    -webkit-user-drag: none;
    user-select: none;
    display: flex;
    width: 100%;
    height: 100%;
  `,
};

export interface CardProps {
  src: string;
  href: string;
  reversed?: boolean;
  tappable: boolean;
  onTapped?: (flag: true) => void;
}

export const Card = ({
  src,
  href,
  reversed,
  tappable,
  onTapped,
}: CardProps) => {
  const [tapped, setTapped] = useState(false);
  return (
    <motion.div
      onTap={
        tappable
          ? () => {
              setTapped(true);
              onTapped?.(true);
            }
          : undefined
      }
      animate={
        tappable
          ? {
              rotateY: tapped ? 180 : 0,
            }
          : {}
      }
      className={cardStyles.container}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
        rotateZ: reversed ? 180 : 0,
      }}
    >
      <div
        className={css`
          position: relative;
          height: 100%;
          transform: rotateY(180deg);
        `}
      >
        <img className={cardStyles.image} src={src} />
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
      <div className={cardStyles.backface}></div>
    </motion.div>
  );
};

interface CardThumbnailProps extends HTMLMotionProps<"div"> {
  reversed?: boolean;
  src: string;
}

export const CardThumbnail = ({
  reversed,
  src,
  ...props
}: CardThumbnailProps) => {
  return (
    <motion.div
      style={{ opacity: 0.9, rotateZ: reversed ? 180 : 0 }}
      className={clsx(
        cardStyles.container,
        css`
          border-width: 2px;
          border-radius: 2px;
          width: 50px;
        `
      )}
      {...props}
    >
      <img className={cardStyles.image} src={src} />
    </motion.div>
  );
};

interface AnimateCardProps extends Omit<CardData, "number"> {
  index: number;
}

export const AnimateCard = ({
  index,
  src,
  href,
  reversed,
}: AnimateCardProps) => {
  const [tapped, setTapped] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [tappable, setTappable] = useState(false);

  if (deleted && tapped) {
    return (
      <CardThumbnail
        animate={{ zIndex: 100, x: -20 }}
        src={src}
        reversed={reversed}
      />
    );
  }
  if (deleted) {
    return null;
  }
  return (
    <SwipeToDelete
      onDelete={() => {
        setDeleted(true);
      }}
    >
      <motion.div
        onAnimationComplete={() => {
          setTappable(true);
        }}
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
        style={{
          position: "absolute",
        }}
      >
        <Card
          src={src}
          href={href}
          reversed={reversed}
          tappable={tappable}
          onTapped={setTapped}
        />
      </motion.div>
    </SwipeToDelete>
  );
};
