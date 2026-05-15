import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Termos de Serviço — Rwque",
  description: "Termos de serviço da rwque. Pagamentos, reembolsos, prazos, alterações, hospedagem e responsabilidade.",
};

const SECTIONS = [
  {
    title: "Introdução",
    content:
      "Ao contratar os serviços da rwque, o cliente declara ter lido e concordado com os termos descritos nesta página. Estes termos se aplicam a todos os projetos, serviços recorrentes e manutenções prestadas.",
  },
  {
    title: "Pagamentos",
    content:
      "Projetos pontuais exigem pagamento parcial antecipado (geralmente 50%) antes do início do desenvolvimento, com o saldo restante devido na entrega. Serviços recorrentes, como hospedagem, manutenção ou suporte, são cobrados mensalmente de forma antecipada. O não pagamento no prazo pode resultar na suspensão dos serviços.",
  },
  {
    title: "Reembolso",
    content:
      "Devido à natureza digital e personalizada dos serviços prestados, não oferecemos reembolso após o início do desenvolvimento do projeto. O valor antecipado cobre o planejamento, estruturação e horas de trabalho iniciais, que não são reversíveis.",
  },
  {
    title: "Prazo de Entrega",
    content:
      "Os prazos são definidos no momento da contratação e podem variar conforme a complexidade do projeto. Atrasos causados pelo cliente, como demora no envio de materiais, conteúdos ou aprovações, podem impactar diretamente a data de entrega sem que isso configure descumprimento por parte do rwque.",
  },
  {
    title: "Alterações",
    content:
      "Pequenas correções e ajustes estéticos pontuais estão inclusos no escopo do projeto. Mudanças estruturais, adição de novas funcionalidades ou alterações que fujam do escopo originalmente acordado poderão gerar cobrança adicional, a ser informada previamente ao cliente.",
  },
  {
    title: "Hospedagem e Manutenção",
    content:
      "Serviços de hospedagem, manutenção e suporte contínuo permanecem ativos enquanto a mensalidade estiver em dia. Em caso de inadimplência, os serviços poderão ser suspensos após notificação. A rwque não se responsabiliza por perdas decorrentes da suspensão por falta de pagamento.",
  },
  {
    title: "Responsabilidade",
    content:
      "A rwque não se responsabiliza por falhas em serviços de terceiros (provedores de hospedagem, APIs externas, plataformas de pagamento), indisponibilidade temporária de infraestrutura, perda de vendas, dados ou qualquer prejuízo indireto relacionado ao uso do sistema ou site entregue.",
  },
];

export default function Termos() {
  return (
    <main
      style={{
        background: "var(--bg)",
        color: "var(--text)",
        minHeight: "100dvh",
        fontFamily: "var(--font-jakarta, 'Plus Jakarta Sans', system-ui, sans-serif)",
      }}
    >
      {/* Nav */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 32px",
          height: 52,
          background: "var(--bg)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-syne)",
            fontWeight: 800,
            fontSize: 15,
            letterSpacing: "-0.03em",
            color: "var(--text)",
          }}
        >
          rwque
        </Link>
        <Link
          href="/"
          style={{
            fontSize: 12,
            color: "var(--text-3)",
            display: "flex",
            alignItems: "center",
            gap: 6,
            transition: "color 0.15s",
          }}
        >
          ← Voltar ao início
        </Link>
      </header>

      {/* Content */}
      <div
        style={{
          maxWidth: 680,
          margin: "0 auto",
          padding: "72px 32px 120px",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: 64 }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10.5,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--text-3)",
              display: "block",
              marginBottom: 20,
            }}
          >
            Última atualização: maio de 2026
          </span>
          <h1
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(32px, 6vw, 52px)",
              fontWeight: 800,
              letterSpacing: "-0.05em",
              lineHeight: 1,
              color: "var(--text)",
              marginBottom: 16,
            }}
          >
            Termos de Serviço
          </h1>
          <p style={{ fontSize: 15, color: "var(--text-2)", lineHeight: 1.75 }}>
            Ao contratar os serviços da rwque, o cliente declara ter lido e
            concordado com os termos abaixo.
          </p>
        </div>

        {/* Sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {SECTIONS.map((s, i) => (
            <div
              key={s.title}
              style={{
                borderTop: "1px solid var(--border)",
                paddingTop: 32,
                paddingBottom: 32,
                borderBottom: i === SECTIONS.length - 1 ? "1px solid var(--border)" : "none",
              }}
            >
              <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10.5,
                    color: "var(--text-3)",
                    letterSpacing: "0.08em",
                    paddingTop: 4,
                    flexShrink: 0,
                    minWidth: 24,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2
                    style={{
                      fontFamily: "var(--font-syne)",
                      fontSize: "clamp(16px, 2vw, 20px)",
                      fontWeight: 800,
                      letterSpacing: "-0.03em",
                      color: "var(--text)",
                      marginBottom: 12,
                    }}
                  >
                    {s.title}
                  </h2>
                  <p style={{ fontSize: 14.5, color: "var(--text-2)", lineHeight: 1.8 }}>
                    {s.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact note */}
        <p
          style={{
            marginTop: 48,
            fontSize: 13,
            color: "var(--text-3)",
            lineHeight: 1.75,
          }}
        >
          Dúvidas sobre estes termos?{" "}
          <a
            href="mailto:contato@rwque.com"
            style={{ color: "var(--text-2)", borderBottom: "1px solid var(--border)" }}
          >
            contato@rwque.com
          </a>
        </p>
      </div>
    </main>
  );
}
