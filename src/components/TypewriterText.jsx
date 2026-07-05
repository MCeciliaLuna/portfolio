import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const charVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.05, ease: "easeOut" },
  },
};

const TypewriterText = ({ text = "Typewriter Effect", className = "" }) => {
  const chars = text.split("");

  return (
    <motion.p
      className={`font-sans text-2xl md:text-3xl lg:text-4xl inline-flex flex-wrap items-center ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      {chars.map((char, i) => (
        <motion.span key={i} variants={charVariants}>
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
      {/* Cursor parpadeante */}
      <motion.span
        className="ml-0.5 font-light"
        animate={{ opacity: [1, 0, 1] }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: "linear",
          times: [0, 0.5, 1],
        }}
      >
        |
      </motion.span>
    </motion.p>
  );
};

export default TypewriterText;
