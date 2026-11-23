import { LinkedinOutlined } from "@ant-design/icons";
import TypewriterText from "./TypewriterText";
import { usePublishedReferences } from "../utils/usePublishedReferences";
import "./References.css";

// Mismas etiquetas que usa el formulario del Portal de Referencias (RoleSelector)
const roleLabels = {
  employer: "Empleador",
  peer: "Compañero",
  student: "Estudiante a cargo",
};

// El texto lo escriben terceros: sólo se enlaza si es un perfil https de LinkedIn
const getSafeLinkedinUrl = (value) => {
  if (typeof value !== "string" || !value.trim()) return null;
  try {
    const url = new URL(value.trim());
    const host = url.hostname.toLowerCase();
    const isLinkedin = host === "linkedin.com" || host.endsWith(".linkedin.com");
    return url.protocol === "https:" && isLinkedin ? url.href : null;
  } catch {
    return null;
  }
};

const References = () => {
  const { status, references } = usePublishedReferences();

  if (status !== "ready" || references.length === 0) return null;

  return (
    <section id="referencias" className="references-section" aria-labelledby="references-title">
      <div className="references-header" data-reveal style={{ transform: "translateY(24px)" }}>
        <p className="references-subtitle">lo que dicen de mí</p>
        <TypewriterText as="h2" text="Referencias" className="references-title" />
      </div>

      <div className="references-grid">
        {references.map((ref, index) => {
          const fullName = [ref.firstName, ref.lastName].filter(Boolean).join(" ");
          const roleLabel = roleLabels[ref.role];
          const linkedinUrl = getSafeLinkedinUrl(ref.linkedin);

          return (
            <figure
              key={ref.id ?? index}
              className={`references-card${ref.isFeatured ? " references-card--featured" : ""}`}
              data-reveal="up"
              data-delay={Math.min(index, 5) * 100}
              style={{ transform: "translateY(24px)" }}
            >
              <span className="references-quote-mark" aria-hidden="true">“</span>
              <blockquote className="references-text">{ref.recommendation}</blockquote>
              <figcaption className="references-author">
                <span className="references-author-info">
                  <span className="references-author-name">{fullName}</span>
                  {roleLabel && <span className="references-author-role">{roleLabel}</span>}
                </span>
                {linkedinUrl && (
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="references-linkedin"
                    aria-label={`Perfil de LinkedIn de ${fullName}`}
                  >
                    <LinkedinOutlined />
                  </a>
                )}
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
};

export default References;
