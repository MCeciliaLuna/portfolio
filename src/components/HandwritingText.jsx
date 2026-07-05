import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const motionTags = {
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  span: motion.span,
  div: motion.div,
};

/**
 * HandwritingText — Stagger de caracteres para textos Caveat.
 * Mismo mecanismo probado que TypewriterText.
 */
const HandwritingText = ({
  text = "",
  as = "p",
  className = "",
  delay = 0,
  staggerSpeed = 0.05,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const MotionTag = motionTags[as] || motion.p;

  const chars = text.split("");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerSpeed,
        delayChildren: delay,
      },
    },
  };

  const charVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.12, ease: "easeOut" },
    },
  };

  return (
    <MotionTag
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {chars.map((char, i) => (
        <motion.span key={i} variants={charVariants} style={{ display: "inline-block" }}>
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </MotionTag>
  );
};

export default HandwritingText;
