import { motion } from "framer-motion";

const HandwritingText = ({ text = "Handwriting Effect", className = "" }) => {
  return (
    <motion.p
      className={`font-['Caveat',cursive] text-5xl md:text-6xl lg:text-7xl leading-tight ${className}`}
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      whileInView={{ clipPath: "inset(0 0% 0 0)" }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 2.2, ease: "easeInOut" }}
      style={{ willChange: "clip-path" }}
    >
      {text}
    </motion.p>
  );
};

export default HandwritingText;
