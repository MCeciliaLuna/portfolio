import { motion } from "framer-motion";

const motionTags = {
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  span: motion.span,
  div: motion.div,
};

/**
 * TypewriterText — Fade in simple para textos Lora.
 * Activa al entrar en viewport con whileInView.
 */
const TypewriterText = ({
  text,
  segments,
  as = "p",
  className = "",
  delay = 0,
  showCursor = false,
}) => {
  const MotionTag = motionTags[as] || motion.p;

  // Contenido: string plano o segmentos con estilos
  const content = segments
    ? segments.map((seg, i) =>
        seg.className ? (
          <span key={i} className={seg.className}>{seg.text}</span>
        ) : (
          <span key={i}>{seg.text}</span>
        )
      )
    : text;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
    >
      {content}
      {showCursor && (
        <motion.span
          style={{ marginLeft: "2px", fontWeight: 300 }}
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        >
          |
        </motion.span>
      )}
    </MotionTag>
  );
};

export default TypewriterText;
