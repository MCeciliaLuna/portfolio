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
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4" style={{ fontFamily: "'Lora', serif" }}>
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
          Componente 1 — HandwritingText (as h1)
        </span>
        <HandwritingText
          as="h1"
          text="Creatividad sin límites"
          className="text-amber-300 text-5xl md:text-6xl lg:text-7xl"
          style={{ fontFamily: "'Caveat', cursive" }}
        />
        <p className="text-slate-500 text-sm max-w-sm mt-4">
          Efecto clipPath animado de izquierda a derecha. Prop <code className="text-slate-400">as</code> define el tag HTML.
        </p>
      </section>

      {/* Sección: HandwritingText con span */}
      <section className="min-h-screen bg-slate-800 flex flex-col items-center justify-center px-6 text-center gap-6">
        <span className="text-slate-500 font-mono text-xs uppercase tracking-[0.25em]">
          Variación — HandwritingText (as span, con delay)
        </span>
        <HandwritingText
          as="span"
          text="Diseñar es pensar"
          className="text-rose-400 text-6xl md:text-7xl lg:text-8xl block"
          delay={0.3}
          style={{ fontFamily: "'Caveat', cursive" }}
        />
        <p className="text-slate-500 text-sm max-w-sm mt-4">
          Funciona con cualquier tag, tamaño y delay personalizado.
        </p>
      </section>

      {/* Sección: TypewriterText demo */}
      <section className="min-h-screen bg-slate-900 flex flex-col items-center justify-center px-6 text-center gap-6">
        <span className="text-slate-500 font-mono text-xs uppercase tracking-[0.25em]">
          Componente 2 — TypewriterText (con cursor)
        </span>
        <TypewriterText
          as="p"
          text="console.log('Hello, World!');"
          className="text-emerald-400 text-2xl md:text-3xl font-mono"
          showCursor={true}
        />
        <p className="text-slate-500 text-sm max-w-sm mt-4">
          Stagger secuencial con <code className="text-slate-400">showCursor=true</code>.
        </p>
      </section>

      {/* Sección: TypewriterText con segments */}
      <section className="min-h-screen bg-slate-800 flex flex-col items-center justify-center px-6 text-center gap-6">
        <span className="text-slate-500 font-mono text-xs uppercase tracking-[0.25em]">
          Variación — TypewriterText (segments con estilos mixtos)
        </span>
        <TypewriterText
          as="h2"
          segments={[
            { text: "Frontend Developer " },
            { text: "&", className: "text-rose-400" },
            { text: " UX Designer" },
          ]}
          className="text-sky-400 text-3xl md:text-4xl lg:text-5xl"
          style={{ fontFamily: "'Lora', serif" }}
        />
        <p className="text-slate-500 text-sm max-w-sm mt-4">
          Prop <code className="text-slate-400">segments</code> permite estilos distintos por tramo, sin perder el efecto secuencial.
        </p>
      </section>

      {/* Sección: Ambos juntos */}
      <section className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-6 text-center gap-12">
        <span className="text-slate-500 font-mono text-xs uppercase tracking-[0.25em]">
          Ambos componentes juntos
        </span>
        <HandwritingText
          as="span"
          text="¡Hola! soy"
          className="text-violet-400 text-4xl md:text-5xl block"
          style={{ fontFamily: "'Caveat', cursive" }}
        />
        <TypewriterText
          as="h2"
          text="Cecilia Luna"
          className="text-white text-5xl md:text-7xl font-bold"
          delay={0.5}
          style={{ fontFamily: "'Lora', serif" }}
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
