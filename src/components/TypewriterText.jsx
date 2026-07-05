import { motion } from "framer-motion";

const containerVariants = (delay) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: delay,
    },
  },
});

const charVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.05, ease: "easeOut" },
  },
};

/**
 * TypewriterText — efecto de tipeo carácter por carácter
 *
 * Props:
 *  - text: string simple (alternativa a segments)
 *  - segments: array de { text, className? } para textos con estilos mixtos
 *  - as: tag HTML a renderizar ("p", "h1", "h2", "span")
 *  - className: clase CSS del contenedor
 *  - showCursor: mostrar cursor parpadeante (default false)
 *  - delay: delay antes de iniciar la animación
 */
const TypewriterText = ({
  text,
  segments,
  className = "",
  as: Tag = "p",
  showCursor = false,
  delay = 0,
}) => {
  const MotionTag = motion.create(Tag);

  // Construir el array de caracteres con sus clases opcionales
  const chars = [];
  if (segments) {
    segments.forEach((seg) => {
      seg.text.split("").forEach((char) => {
        chars.push({ char, className: seg.className || "" });
      });
    });
  } else if (text) {
    text.split("").forEach((char) => {
      chars.push({ char, className: "" });
    });
  }

  return (
    <MotionTag
      className={className}
      style={{ display: "inline-flex", flexWrap: "wrap", alignItems: "center" }}
      variants={containerVariants(delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      {chars.map((item, i) => (
        <motion.span
          key={i}
          variants={charVariants}
          className={item.className}
          style={{ display: "inline-block" }}
        >
          {item.char === " " ? "\u00A0" : item.char}
        </motion.span>
      ))}
      {showCursor && (
        <motion.span
          className="ml-0.5 font-light"
          style={{ display: "inline-block" }}
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
      )}
    </MotionTag>
  );
};

export default TypewriterText;
