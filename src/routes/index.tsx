import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Check,
  ChevronDown,
  CircuitBoard,
  Cpu,
  FileText,
  Gauge,
  GraduationCap,
  Layers,
  Minus,
  Quote,
  RefreshCcw,
  Search,
  ShieldCheck,
  Smartphone,
  Star,
  Truck,
  Wrench,
  Zap,
} from "lucide-react";

import bookCover from "@/assets/book-cover.png.asset.json";
import pageContator from "@/assets/page-contator.jpg.asset.json";
import pageDiagramas from "@/assets/page-diagramas.jpg.asset.json";
import authorPhoto from "@/assets/author-real.jpg.asset.json";

const CHECKOUT_URL = "#oferta";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Manual Definitivo Comandos Elétricos | Livro + E-book e Bônus" },
      {
        name: "description",
        content:
          "O manual definitivo para dominar comandos elétricos: livro físico de 312 páginas, e-book em PDF com entrega imediata e bônus. R$ 119,90, frete grátis e garantia de 7 dias.",
      },
      { property: "og:title", content: "Manual Definitivo Comandos Elétricos | Livro + E-book e Bônus" },
      {
        property: "og:description",
        content:
          "O manual definitivo para dominar comandos elétricos: livro físico de 312 páginas, e-book em PDF com entrega imediata e bônus. R$ 119,90, frete grátis e garantia de 7 dias.",
      },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/* ---------------------------------- data --------------------------------- */

const seals = [
  { icon: Zap, label: "E-book na hora" },
  { icon: Truck, label: "Frete grátis" },
  { icon: ShieldCheck, label: "Garantia 7 dias" },
];

const pains = [
  "Você olha um diagrama de comando e não sabe por onde a corrente começa.",
  "Na hora de dimensionar contator, relé ou condutor, sempre bate a dúvida.",
  "Precisa montar um painel e trava com medo de queimar o motor.",
  "A máquina para, o encarregado cobra e você não acha o defeito.",
  "Perde horas em vídeos soltos que nunca terminam o assunto.",
  "Já baixou dezenas de apostilas — nenhuma com sequência lógica.",
];

const kitAdvantages = [
  { icon: Zap, title: "Recebe agora", text: "O PDF cai no seu e-mail minutos após a compra." },
  { icon: Search, title: "Busca por palavra", text: "Digite “relé térmico” e vá direto ao ponto." },
  { icon: Smartphone, title: "Consulta na obra", text: "Celular no bolso, manual inteiro na mão." },
  { icon: BookOpen, title: "Livro na bancada", text: "312 páginas impressas para estudar sem tela." },
];

const benefits = [
  { icon: Gauge, label: "Dimensionamento" },
  { icon: RefreshCcw, label: "Motores" },
  { icon: CircuitBoard, label: "Diagramas" },
  { icon: Wrench, label: "Defeitos" },
  { icon: Layers, label: "Transformadores" },
  { icon: Cpu, label: "Contatores" },
  { icon: Zap, label: "Relés" },
  { icon: Gauge, label: "Inversores" },
  { icon: CircuitBoard, label: "Chaves de partida" },
  { icon: ShieldCheck, label: "NR-10" },
  { icon: Layers, label: "Simbologia" },
  { icon: Wrench, label: "Manutenção" },
];

const outcomes = [
  "Interpretar qualquer diagrama industrial sem pedir ajuda.",
  "Dimensionar contatores, relés, disjuntores, fusíveis e condutores.",
  "Regular o relé térmico exato para cada motor.",
  "Encontrar o defeito no painel em minutos, não em turnos.",
  "Polarizar motores monofásicos e trifásicos sem placa.",
  "Fazer fechamentos para diferentes tensões com segurança.",
  "Montar chaves estrela-triângulo, reversão e compensadora.",
  "Falar de igual para igual com engenharia e manutenção.",
];

const comparison = [
  ["Sequência lógica do básico ao avançado", false, true],
  ["Conteúdo revisado e com registro ISBN", false, true],
  ["Consulta rápida no meio do serviço", false, true],
  ["Diagramas reais de indústria explicados", false, true],
  ["Escrito por professor com 20 anos de sala", false, true],
  ["Funciona sem internet, na bancada", false, true],
];

const included = [
  { name: "Livro físico — 312 páginas, 2ª edição", value: "R$ 169,90" },
  { name: "E-book oficial em PDF (entrega imediata)", value: "R$ 97,00" },
  { name: "Bônus 1 — Aulas de análise de diagramas", value: "R$ 197,00" },
  { name: "Bônus 2 — Simuladores de circuitos", value: "R$ 147,00" },
  { name: "Bônus 3 — NR-10 comentada em PDF", value: "R$ 97,00" },
  { name: "Bônus 4 — Exercícios resolvidos para praticar", value: "R$ 67,00" },
];

const bonuses = [
  {
    icon: CircuitBoard,
    tag: "Bônus 01",
    title: "Aulas de Análise de Diagramas",
    value: "R$ 197,00",
    text: "Videoaulas onde o autor destrincha, contato por contato, as chaves de partida que estão no livro.",
  },
  {
    icon: Cpu,
    tag: "Bônus 02",
    title: "Simuladores de Circuitos",
    value: "R$ 147,00",
    text: "Programas para montar, testar e errar à vontade no computador antes de encostar no painel.",
  },
  {
    icon: ShieldCheck,
    tag: "Bônus 03",
    title: "NR-10 Comentada",
    value: "R$ 97,00",
    text: "A norma explicada artigo por artigo, em linguagem de campo, para você trabalhar protegido.",
  },
  {
    icon: FileText,
    tag: "Bônus 04",
    title: "Caderno de Exercícios",
    value: "R$ 67,00",
    text: "Lista prática para acompanhar as aulas e fixar dimensionamentos e leitura de diagramas.",
  },
];

const testimonials = [
  {
    name: "Rogério M.",
    role: "Eletricista de manutenção — MG",
    text: "Comprei na terça, li o PDF no mesmo dia e na quinta resolvi um defeito de reversão que estava parado há duas semanas na fábrica.",
  },
  {
    name: "Daniela S.",
    role: "Estudante de Eletrotécnica — SP",
    text: "As explicações de dimensionamento são melhores que a apostila do curso. Uso o livro na bancada e o PDF no celular.",
  },
  {
    name: "Cleber A.",
    role: "Mecânico industrial — PR",
    text: "Eu só mexia na parte mecânica. Hoje leio o diagrama, identifico o contator certo e faço o serviço completo.",
  },
  {
    name: "Vinícius T.",
    role: "Técnico em automação — RS",
    text: "Material de consulta de verdade. Abro nos capítulos de relés e chaves de partida quase toda semana.",
  },
];

const faqs = [
  {
    q: "O livro é físico mesmo ou só digital?",
    a: "Os dois. Você recebe o livro impresso de 312 páginas em casa, com frete grátis, e o e-book oficial em PDF liberado imediatamente após a confirmação do pagamento.",
  },
  {
    q: "Quanto tempo demora a entrega?",
    a: "O PDF chega em minutos por e-mail. O livro impresso costuma chegar em até 10 dias úteis, para todo o Brasil.",
  },
  {
    q: "Serve para quem está começando?",
    a: "Sim. A sequência vai do básico ao avançado com linguagem simples, sem fórmula solta e sem pular etapas. Também serve como consulta para quem já é da área.",
  },
  {
    q: "Preciso de conhecimento em matemática avançada?",
    a: "Não. Os dimensionamentos são resolvidos com contas diretas e tabelas prontas, do jeito que se usa no campo.",
  },
  {
    q: "Como funciona o pagamento?",
    a: "Cartão, boleto ou PIX. No PIX você paga com desconto e o acesso ao PDF é liberado assim que o pagamento é confirmado.",
  },
  {
    q: "E se eu não gostar?",
    a: "Você tem 7 dias de garantia. Basta um e-mail para o suporte e devolvemos 100% do valor, sem discussão.",
  },
];

/* -------------------------------- helpers -------------------------------- */

function CTA({
  children = "Quero o Manual Completo",
  size = "lg",
  className = "",
}: {
  children?: React.ReactNode;
  size?: "lg" | "sm";
  className?: string;
}) {
  return (
    <a
      href={CHECKOUT_URL}
      className={`btn-cta hover:btn-cta-hover ${
        size === "lg" ? "px-8 py-4 text-base sm:text-lg" : "px-5 py-3 text-sm"
      } ${className}`}
    >
      {children}
      <ArrowRight className="h-5 w-5 shrink-0" />
    </a>
  );
}

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
      {children}
    </span>
  );
}

/* --------------------------------- page ---------------------------------- */

function Index() {
  const [showBar, setShowBar] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const onScroll = () => setShowBar(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="bg-background text-foreground">
      {/* ------------------------------- HERO ------------------------------- */}
      <section className="bg-ink-gradient relative overflow-hidden text-ink-foreground">
        <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.05fr_1fr] lg:py-24">
          <div className="animate-rise">
            <SectionTag>
              <span className="text-accent">•</span> Livro físico + E-book + Bônus
            </SectionTag>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-[3.4rem]">
              O Manual Definitivo para{" "}
              <span className="text-accent">Dominar Comandos Elétricos</span> — sem depender de
              conteúdos soltos na internet.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-ink-foreground/75">
              312 páginas de manual técnico na sua bancada, o e-book oficial em PDF no seu celular
              hoje mesmo e os bônus completos. Diagramas, dimensionamentos, motores e diagnóstico
              de defeitos explicados em linguagem de campo.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <CTA>Quero o Manual por R$ 119,90</CTA>
              <span className="text-sm text-ink-foreground/70">
                PIX com desconto · Frete grátis · 7 dias de garantia
              </span>
            </div>

            <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {seals.map((s) => (
                <li
                  key={s.label}
                  className="flex min-w-0 items-center gap-2 rounded-xl border border-ink-foreground/15 bg-ink-foreground/5 px-3 py-2 text-xs font-semibold"
                >
                  <s.icon className="h-4 w-4 shrink-0 text-accent" />
                  <span className="truncate">{s.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-rise flex justify-center">
            <img
              src={bookCover.url}
              alt="Capa do livro Comandos Elétricos - O Seu Guia Prático e Definitivo, 2ª edição, de Sandro Zander Soares Nogueira"
              width={780}
              height={1050}
              className="w-full max-w-sm rounded-2xl shadow-[var(--shadow-lift)]"
            />
          </div>
        </div>
      </section>

      {/* ------------------------------ PROBLEMA ---------------------------- */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="max-w-2xl">
          <SectionTag>O grande problema</SectionTag>
          <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
            O problema nunca foi falta de informação. É falta de{" "}
            <span className="text-accent">ordem</span>.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Comando elétrico é lógica. Quando o conteúdo chega picado, em vídeos de 8 minutos e
            apostilas sem sequência, a lógica nunca fecha na cabeça — e a insegurança aparece
            justamente na frente do painel.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pains.map((p) => (
            <div key={p} className="surface-card p-6">
              <Minus className="h-5 w-5 text-destructive" />
              <p className="mt-3 text-[0.98rem] leading-relaxed text-foreground/85">{p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --------------------------- APRESENTAÇÃO --------------------------- */}
      <section className="bg-secondary/60 py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2">
          <img
            src={pageContator.url}
            alt="Página interna do livro sobre contatores, com construção e aplicação em painéis"
            width={716}
            height={950}
            loading="lazy"
            className="w-full rounded-3xl border border-border bg-card shadow-[var(--shadow-lift)]"
          />
          <div>
            <SectionTag>O manual</SectionTag>
            <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
              Você não compra um livro. Você monta a sua bancada de estudo.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Enquanto o livro impresso viaja até a sua casa,{" "}
              <strong className="text-foreground">
                o e-book oficial em PDF já está no seu celular
              </strong>
              . Você começa a estudar hoje e recebe o manual definitivo em poucos dias.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {kitAdvantages.map((a) => (
                <div key={a.title} className="surface-card p-5">
                  <a.icon className="h-6 w-6 text-accent" />
                  <h3 className="mt-3 text-base font-bold">{a.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{a.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <CTA size="sm">Começar a estudar hoje</CTA>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------- BENEFÍCIOS --------------------------- */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="max-w-2xl">
          <SectionTag>Conteúdo</SectionTag>
          <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
            Tudo que um comando elétrico exige — reunido em um só material.
          </h2>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {benefits.map((b) => (
            <div
              key={b.label}
              className="surface-card flex min-w-0 items-center gap-3 px-4 py-5 transition-transform hover:-translate-y-1"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/12 text-accent">
                <b.icon className="h-5 w-5" />
              </span>
              <span className="truncate text-sm font-semibold">{b.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ----------------------------- RESULTADOS --------------------------- */}
      <section className="bg-ink-gradient py-20 text-ink-foreground">
        <div className="mx-auto max-w-6xl px-5">
          <div className="max-w-2xl">
            <SectionTag>Depois do manual</SectionTag>
            <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
              O que você vai ser capaz de fazer na próxima segunda-feira.
            </h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {outcomes.map((o) => (
              <div
                key={o}
                className="flex items-start gap-3 rounded-2xl border border-ink-foreground/12 bg-ink-foreground/5 p-5"
              >
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <p className="text-[0.98rem] leading-relaxed">{o}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <CTA>Quero dominar comandos elétricos</CTA>
          </div>
        </div>
      </section>

      {/* ----------------------------- COMPARAÇÃO --------------------------- */}
      <section className="mx-auto max-w-5xl px-5 py-20">
        <div className="max-w-2xl">
          <SectionTag>Comparativo</SectionTag>
          <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
            Por que este material é diferente do que você já tentou.
          </h2>
        </div>

        <div className="surface-card mt-10 overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-border bg-secondary/70 px-5 py-4 text-xs font-bold uppercase tracking-wider sm:px-8">
            <span className="text-muted-foreground">Critério</span>
            <span className="w-20 text-center text-muted-foreground">Vídeos e apostilas</span>
            <span className="w-20 text-center text-accent">O Manual</span>
          </div>
          {comparison.map(([label, a, b]) => (
            <div
              key={String(label)}
              className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-border px-5 py-4 last:border-0 sm:px-8"
            >
              <span className="min-w-0 text-sm font-medium sm:text-base">{label}</span>
              <span className="grid w-20 place-items-center">
                {a ? (
                  <Check className="h-5 w-5 text-success" />
                ) : (
                  <Minus className="h-5 w-5 text-muted-foreground" />
                )}
              </span>
              <span className="grid w-20 place-items-center">
                {b ? (
                  <Check className="h-5 w-5 text-success" />
                ) : (
                  <Minus className="h-5 w-5 text-muted-foreground" />
                )}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------- CONHEÇA O LIVRO ------------------------ */}
      <section className="bg-secondary/60 py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2">
          <div>
            <SectionTag>Por dentro do livro</SectionTag>
            <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
              312 páginas escritas para serem entendidas — não decoradas.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Diagramas redesenhados, fotos reais de painéis, tabelas de dimensionamento e passo a
              passo de montagem. Cada capítulo termina com aplicação prática, do jeito que a
              indústria pede.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "2ª edição impressa, revisada e atualizada",
                "Formato 16x23 cm, ideal para bancada e mochila",
                "ISBN 978-65-00-94683-3 — obra registrada",
                "Linguagem simples, do básico ao avançado",
              ].map((i) => (
                <li key={i} className="flex items-start gap-3">
                  <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span className="text-[0.98rem]">{i}</span>
                </li>
              ))}
            </ul>
          </div>
          <img
            src={pageDiagramas.url}
            alt="Página do livro com diagrama de chave de partida sequencial de motores com proteção individual"
            width={716}
            height={950}
            loading="lazy"
            className="w-full rounded-3xl border border-border bg-card shadow-[var(--shadow-lift)]"
          />
        </div>
      </section>

      {/* ------------------------------- BÔNUS ------------------------------ */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="max-w-2xl">
          <SectionTag>Bônus inclusos</SectionTag>
          <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
            Quatro materiais que sozinhos já valem mais que o manual.
          </h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {bonuses.map((b) => (
            <article key={b.tag} className="surface-card p-7 transition-transform hover:-translate-y-1">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
                  {b.tag}
                </span>
                <span className="shrink-0 rounded-full bg-secondary px-3 py-1 text-xs font-bold text-muted-foreground line-through">
                  {b.value}
                </span>
              </div>
              <span className="mt-5 grid h-12 w-12 place-items-center rounded-2xl bg-ink text-ink-foreground">
                <b.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-xl font-bold">{b.title}</h3>
              <p className="mt-2 text-muted-foreground">{b.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ------------------------------- OFERTA ----------------------------- */}
      <section id="oferta" className="bg-ink-gradient py-20 text-ink-foreground">
        <div className="mx-auto grid max-w-5xl gap-10 px-5 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <SectionTag>O que você recebe</SectionTag>
            <h2 className="mt-5 text-3xl font-bold sm:text-4xl">Tudo que entra no seu manual hoje.</h2>
            <ul className="mt-8 space-y-3">
              {included.map((i) => (
                <li
                  key={i.name}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-ink-foreground/12 pb-3"
                >
                  <span className="flex min-w-0 items-start gap-3 text-[0.98rem]">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    {i.name}
                  </span>
                  <span className="shrink-0 text-sm font-semibold text-ink-foreground/60 line-through">
                    {i.value}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-ink-foreground/70">
              Valor total dos itens: <strong className="text-ink-foreground">R$ 774,90</strong>
            </p>
          </div>

          <div className="rounded-3xl bg-card p-8 text-card-foreground shadow-[var(--shadow-lift)]">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Hoje você leva tudo por
            </p>
            <p className="mt-2 text-sm text-muted-foreground line-through">De R$ 774,90</p>
            <p className="mt-1 font-display text-5xl font-extrabold">R$ 119,90</p>
            <p className="mt-2 text-[0.98rem] text-muted-foreground">
              à vista no cartão ou boleto — ou <strong className="text-foreground">no PIX com desconto</strong>,
              com liberação imediata do PDF.
            </p>
            <CTA className="mt-6 w-full">Comprar o Manual agora</CTA>
            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              {["Frete grátis para todo o Brasil", "E-book liberado em minutos", "Garantia incondicional de 7 dias", "Compra 100% segura"].map(
                (t) => (
                  <li key={t} className="flex items-center gap-2">
                    <Check className="h-4 w-4 shrink-0 text-success" />
                    {t}
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      </section>

      {/* -------------------------------- AUTOR ----------------------------- */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1fr]">
          <img
            src={authorPhoto.url}
            alt="Sandro Zander Soares Nogueira, autor do Manual Comandos Elétricos"
            width={470}
            height={569}
            loading="lazy"
            className="w-full rounded-3xl border border-border bg-card object-cover shadow-[var(--shadow-lift)]"
          />
          <div>
            <SectionTag>Quem escreveu</SectionTag>
            <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
              Vinte anos ensinando eletricidade industrial em sala de aula.
            </h2>
            <div className="mt-5 space-y-4 text-lg text-muted-foreground">
              <p>
                Professor de eletricidade industrial há duas décadas no SENAI-RJ e na FAETEC-RJ,
                em cursos de Instalações Elétricas, Manutenção Industrial, Comandos Elétricos,
                Automação e no Técnico em Eletrotécnica.
              </p>
              <p>
                Fundador da Academia do Eletricista e criador do Método Comandos Elétricos Expert,
                por onde já passaram centenas de profissionais que hoje montam, regulam e corrigem
                painéis com autonomia.
              </p>
              <p className="border-l-2 border-accent pl-5 text-foreground">
                “Escrevi este material do jeito que eu explico no laboratório: mostrando o
                caminho da corrente, o motivo de cada dispositivo e o que fazer quando a máquina
                não parte.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------- DEPOIMENTOS -------------------------- */}
      <section className="bg-secondary/60 py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="max-w-2xl">
            <SectionTag>Quem já usa</SectionTag>
            <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
              Eletricistas, técnicos e estudantes que pararam de adivinhar.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {testimonials.map((t) => (
              <figure key={t.name} className="surface-card p-7">
                <Quote className="h-6 w-6 text-accent" />
                <blockquote className="mt-4 text-[1.02rem] leading-relaxed">{t.text}</blockquote>
                <figcaption className="mt-6 flex min-w-0 items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink font-display text-sm font-bold text-ink-foreground">
                    {t.name.charAt(0)}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-bold">{t.name}</span>
                    <span className="block truncate text-xs text-muted-foreground">{t.role}</span>
                  </span>
                  <span className="ml-auto flex shrink-0 gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------ GARANTIA ---------------------------- */}
      <section className="mx-auto max-w-4xl px-5 py-20">
        <div className="surface-card relative overflow-hidden p-10 text-center">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-accent/12 text-accent">
            <ShieldCheck className="h-8 w-8" />
          </span>
          <h2 className="mt-6 text-3xl font-bold sm:text-4xl">Seu risco é exatamente zero.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Receba o manual, leia o e-book, folheie o livro. Se em até 7 dias você achar que o
            material não é o que esperava, envia um único e-mail para o suporte e devolvemos 100%
            do valor. Sem formulário, sem enrolação.
          </p>
          <div className="mt-8 flex justify-center">
            <CTA size="sm">Testar sem risco por 7 dias</CTA>
          </div>
        </div>
      </section>

      {/* --------------------------------- FAQ ------------------------------ */}
      <section className="mx-auto max-w-3xl px-5 pb-20">
        <div className="text-center">
          <SectionTag>Dúvidas</SectionTag>
          <h2 className="mt-5 text-3xl font-bold sm:text-4xl">Perguntas frequentes</h2>
        </div>
        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => (
            <div key={f.q} className="surface-card overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 py-5 text-left"
                aria-expanded={openFaq === i}
              >
                <span className="text-[1.02rem] font-semibold">{f.q}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${
                    openFaq === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openFaq === i && (
                <p className="px-6 pb-6 text-muted-foreground">{f.a}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------ CTA FINAL --------------------------- */}
      <section className="bg-ink-gradient py-20 text-ink-foreground">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <h2 className="text-3xl font-bold sm:text-[2.6rem] sm:leading-tight">
            Da próxima vez que o painel parar, você vai saber exatamente o que fazer.
          </h2>
          <p className="mt-5 text-lg text-ink-foreground/75">
            Livro físico de 312 páginas + e-book em PDF imediato + 4 bônus. Frete grátis, PIX com
            desconto e 7 dias de garantia.
          </p>
          <p className="mt-8 font-display text-5xl font-extrabold">R$ 119,90</p>
          <div className="mt-8 flex justify-center">
            <CTA>Garantir meu Manual Comandos Elétricos</CTA>
          </div>
          <p className="mt-6 text-sm text-ink-foreground/60">
            Vendido e entregue pela Academia do Eletricista · ISBN 978-65-00-94683-3
          </p>
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © 2026 Academia do Eletricista — Manual Comandos Elétricos.
      </footer>

      {/* ------------------------------ STICKY CTA -------------------------- */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 backdrop-blur transition-transform duration-300 ${
          showBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="mx-auto grid max-w-5xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-bold">Manual Comandos Elétricos — Livro + PDF + Bônus</p>
            <p className="truncate text-xs text-muted-foreground">
              R$ 119,90 · Frete grátis · Garantia de 7 dias
            </p>
          </div>
          <CTA size="sm">Comprar</CTA>
        </div>
      </div>
    </main>
  );
}
