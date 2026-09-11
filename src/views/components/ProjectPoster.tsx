import type { Project } from "../../data/content";

const KW_RE =
  /\b(const|let|function|return|if|else|for|while|def|class|import|from|await|async|new|try|except|print)\b/g;
const KW = new Set([
  "const", "let", "function", "return", "if", "else", "for", "while",
  "def", "class", "import", "from", "await", "async", "new", "try",
  "except", "print",
]);

/** Uma linha de código com palavras-chave em lime e strings em serif. */
function CodeLine({ line }: { line: string }) {
  const parts = line.split(/("[^"]*"|'[^']*')/g).filter(Boolean);
  return (
    <code className="poster-code-line">
      {parts.map((p, i) =>
        p.startsWith('"') || p.startsWith("'") ? (
          <span key={i} className="serif poster-code-str">
            {p}
          </span>
        ) : (
          <span key={i}>{highlight(p)}</span>
        )
      )}
    </code>
  );
}

function highlight(text: string) {
  const pieces = text.split(KW_RE).filter(Boolean);
  return pieces.map((p, i) =>
    KW.has(p) ? (
      <span key={i} className="poster-code-kw">
        {p}
      </span>
    ) : (
      <span key={i}>{p}</span>
    )
  );
}

/**
 * Pôster editorial do projeto: imagem do README quando existe,
 * senão trecho de código real sobre a cor sólida — sempre com o
 * nome gigante e a linha serif.
 */
export function ProjectPoster({
  project,
  className,
  minimal = false,
}: {
  project: Project;
  className?: string;
  minimal?: boolean;
}) {
  return (
    <div
      className={`poster p-${project.variant} ${minimal ? "minimal" : ""} ${project.image ? "has-img" : ""} ${className ?? ""}`}
      aria-hidden="true"
    >
      {project.image && (
        <img className="poster-img" src={project.image} alt="" loading="eager" draggable={false} />
      )}
      {project.code && (
        <pre className="poster-code">
          {project.code.map((line, i) => (
            <CodeLine key={i} line={line} />
          ))}
        </pre>
      )}
      <div className="poster-inner">
        <span className="poster-title">{project.title}</span>
        <span className="serif poster-line">{project.posterLine}</span>
      </div>
    </div>
  );
}
