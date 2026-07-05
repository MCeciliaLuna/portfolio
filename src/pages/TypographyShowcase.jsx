import HandwritingText from "../components/HandwritingText";
import TypewriterText from "../components/TypewriterText";

const TypographyShowcase = () => {
  return (
    <div className="w-full">
      {/* Sección de bienvenida — empuja al usuario a hacer scroll */}
      <section className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-6 text-center">
        <p className="text-slate-500 font-mono text-sm uppercase tracking-[0.3em] mb-6">
          Typography Animation Showcase
        </p>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 font-['Lora',serif]">
          Scroll Down
        </h1>
        <p className="text-slate-400 text-lg max-w-md">
          Las animaciones se activan cuando los elementos entran en el viewport.
        </p>
        <div className="mt-16 animate-bounce text-slate-600 text-3xl">↓</div>
      </section>

      {/* Sección: HandwritingText demo */}
      <section className="min-h-screen bg-slate-900 flex flex-col items-center justify-center px-6 text-center gap-6">
        <span className="text-slate-500 font-mono text-xs uppercase tracking-[0.25em]">
          Componente 1 — HandwritingText
        </span>
        <HandwritingText
          text="Creatividad sin límites"
          className="text-amber-300"
        />
        <p className="text-slate-500 text-sm max-w-sm mt-4">
          Efecto de revelado con <code className="text-slate-400">clipPath</code> animado de izquierda a derecha. Fuente cursiva Caveat.
        </p>
      </section>

      {/* Sección: Segundo HandwritingText con otro texto */}
      <section className="min-h-screen bg-slate-800 flex flex-col items-center justify-center px-6 text-center gap-6">
        <span className="text-slate-500 font-mono text-xs uppercase tracking-[0.25em]">
          Variación — HandwritingText
        </span>
        <HandwritingText
          text="Diseñar es pensar"
          className="text-rose-400 text-6xl md:text-7xl lg:text-8xl"
        />
        <p className="text-slate-500 text-sm max-w-sm mt-4">
          La misma animación funciona con cualquier tamaño y color.
        </p>
      </section>

      {/* Sección: TypewriterText demo */}
      <section className="min-h-screen bg-slate-900 flex flex-col items-center justify-center px-6 text-center gap-6">
        <span className="text-slate-500 font-mono text-xs uppercase tracking-[0.25em]">
          Componente 2 — TypewriterText
        </span>
        <TypewriterText
          text="console.log('Hello, World!');"
          className="text-emerald-400"
        />
        <p className="text-slate-500 text-sm max-w-sm mt-4">
          Cada carácter aparece secuencialmente con <code className="text-slate-400">staggerChildren</code>. Cursor parpadeante incluido.
        </p>
      </section>

      {/* Sección: Segundo TypewriterText con frase más larga */}
      <section className="min-h-screen bg-slate-800 flex flex-col items-center justify-center px-6 text-center gap-6">
        <span className="text-slate-500 font-mono text-xs uppercase tracking-[0.25em]">
          Variación — TypewriterText
        </span>
        <TypewriterText
          text="El código es poesía en movimiento."
          className="text-sky-400 text-3xl md:text-4xl lg:text-5xl"
        />
        <p className="text-slate-500 text-sm max-w-sm mt-4">
          Funciona con cualquier string y se adapta a diferentes tamaños tipográficos.
        </p>
      </section>

      {/* Sección: Ambos juntos */}
      <section className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-6 text-center gap-12">
        <span className="text-slate-500 font-mono text-xs uppercase tracking-[0.25em]">
          Ambos componentes juntos
        </span>
        <HandwritingText
          text="Frontend Developer"
          className="text-violet-400"
        />
        <TypewriterText
          text="npm run dev → localhost:5173"
          className="text-lime-400 text-xl md:text-2xl"
        />
      </section>

      {/* Footer */}
      <section className="py-20 bg-slate-950 flex items-center justify-center border-t border-slate-800">
        <p className="text-slate-600 font-mono text-xs">
          — fin del showcase —
        </p>
      </section>
    </div>
  );
};

export default TypographyShowcase;
