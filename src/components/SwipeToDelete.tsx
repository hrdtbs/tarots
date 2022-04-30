import { motion, PanInfo, useAnimation } from "framer-motion";
import { useCallback } from "react";

interface SwipeToDeleteProps {
  onDelete: () => void;
  children: React.ReactNode;
}

export const SwipeToDelete = ({ onDelete, children }: SwipeToDeleteProps) => {
  const controls = useAnimation();
  const handleDragEnd = useCallback(async (_: unknown, info: PanInfo) => {
    const offsetX = info.offset.x;
    const velocityX = info.velocity.x;
    if (offsetX > 100 || velocityX > 500) {
      await controls.start({
        x: "100%",
        transition: { duration: 0.4 },
      });
      onDelete();
    } else {
      controls.start({
        x: 0,
        y: 0,
        transition: { duration: 0.2 },
      });
    }
  }, []);
  return (
    <motion.div
      drag="x"
      dragElastic={1}
      onDragEnd={handleDragEnd}
      animate={controls}
    >
      {children}
    </motion.div>
  );
};
