import { motion } from "framer-motion";

const HandwritingText = ({ text = "", className = "", as: Tag = "p", delay = 0 }) => {
  const MotionTag = motion.create(Tag);

  return (
    <MotionTag
      className={className}
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      whileInView={{ clipPath: "inset(0 0% 0 0)" }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 2.2, ease: "easeInOut", delay }}
      style={{ willChange: "clip-path" }}
    >
      {text}
    </MotionTag>
  );
};

export default HandwritingText;
