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
      { title: "Manual Definitivo Comandos Elétricos | Domine com Segurança" },
      {
        name: "description",
        content:
          "O manual definitivo para dominar comandos elétricos. Livro físico, e-book e bônus exclusivos por apenas R$ 119,90. Frete grátis e 7 dias de garantia.",
      },
      { property: "og:title", content: "Manual Definitivo Comandos Elétricos | Domine com Segurança" },
      {
        property: "og:description",
        content:
          "O manual definitivo para dominar comandos elétricos. Livro físico, e-book e bônus exclusivos por apenas R$ 119,90. Frete grátis e 7 dias de garantia.",
      },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/* ---------------------------------- data --------------------------------- */

const seals = [
  { icon: ShieldCheck, label: "Compra segura" },
  { icon: ShieldCheck, label: "Pagamento seguro" },
  { icon: ShieldCheck, label: "Garantia 7 dias" },
  { icon: Truck, label: "Frete grátis" },
];

const pains = [
  "Você olha um diagrama de comando e não sabe por onde a corrente começa.",
  "Na hora de dimensionar contator, relé ou condutor, sempre bate a dúvida.",
  "Precisa montar um painel e trava com medo de queimar o motor.",
  "A máquina para, o encarregado cobra e você não acha o defeito.",
  "Perde horas em vídeos soltos que nunca terminam o assunto.",
  "Já baixou dezenas de apostilas — nenhuma com sequência lógica.",
];

const manualAdvantages = [
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
  { name: "Livro físico", value: "R$ 169,90" },
  { name: "E-book oficial", value: "R$ 97,00" },
  { name: "NR-10 Comentada", value: "R$ 37,00" },
  { name: "Videoaulas exclusivas", value: "R$ 47,00" },
  { name: "Simuladores de circuitos", value: "R$ 47,00" },
];

const bonuses = [
  {
    icon: ShieldCheck,
    tag: "Bônus 01",
    title: "NR-10 Comentada",
    value: "R$ 37,00",
    text: "A norma explicada em linguagem de campo para você trabalhar protegido.",
  },
  {
    icon: CircuitBoard,
    tag: "Bônus 02",
    title: "Videoaulas de Diagramas",
    value: "R$ 47,00",
    text: "Videoaulas onde destrinchamos contato por contato as chaves de partida.",
  },
  {
    icon: Cpu,
    tag: "Bônus 03",
    title: "Simuladores de Circuitos",
    value: "R$ 47,00",
    text: "Programas para testar circuitos no computador antes de ir para o painel.",
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
  const [count, setCount] = useState(0);
  const [hasStartedCount, setHasStartedCount] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowBar(window.scrollY > 700);

      // Simple viewport detection for counter
      const counterEl = document.getElementById("vendas-counter");
      if (counterEl && !hasStartedCount) {
        const rect = counterEl.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          setHasStartedCount(true);
        }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasStartedCount]);

  useEffect(() => {
    if (hasStartedCount) {
      const target = 16233;
      const duration = 2000;
      const stepTime = 20;
      const steps = duration / stepTime;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, stepTime);
      return () => clearInterval(timer);
    }
  }, [hasStartedCount]);

  return (
    <main className="bg-background text-foreground">
      {/* ------------------------------- HERO ------------------------------- */}
      <section className="bg-ink-gradient relative overflow-hidden text-ink-foreground">
        <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.1fr_1fr] lg:py-24">
          <div className="animate-rise">
            <SectionTag>
              <span className="text-accent">•</span> Livro físico + E-book + Bônus
            </SectionTag>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-[3.4rem]">
              O Manual Definitivo para{" "}
              <span className="text-accent">Dominar Comandos Elétricos</span> - sem depender de
              conteúdos soltos na internet.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-ink-foreground/75">
              Aprenda a interpretar diagramas, dimensionar componentes e diagnosticar defeitos com
              segurança. Guia completo para eletricistas, técnicos e estudantes.
            </p>

            <div className="mt-8">
              <div className="mb-4">
                <span className="text-lg text-ink-foreground/60 line-through">De R$ 397,90</span>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-extrabold text-accent">R$ 119,90</span>
                  <span className="text-sm font-medium text-ink-foreground/70">12x de R$ 11,99</span>
                </div>
                <p className="mt-1 text-sm font-semibold text-success">Você economiza R$ 278,00</p>
              </div>
              
              <div className="flex flex-col gap-3">
                <CTA className="w-full sm:w-fit">QUERO MEU LIVRO + BÔNUS</CTA>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-ink-foreground/70">
                  <span>12x de R$ 11,99</span>
                  <span className="h-1 w-1 rounded-full bg-ink-foreground/30" />
                  <span className="text-accent">PIX R$ 107,91</span>
                  <span className="h-1 w-1 rounded-full bg-ink-foreground/30" />
                  <span>Frete grátis</span>
                </div>
              </div>
            </div>

            <ul className="mt-10 flex flex-wrap gap-3">
              {seals.map((s) => (
                <li
                  key={s.label}
                  className="flex items-center gap-2 rounded-xl border border-ink-foreground/15 bg-ink-foreground/5 px-3 py-2 text-xs font-semibold"
                >
                  <s.icon className="h-4 w-4 shrink-0 text-accent" />
                  <span>{s.label}</span>
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
              {manualAdvantages.map((a) => (
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
            <CTA>QUERO DOMINAR COMANDOS ELÉTRICOS</CTA>
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
              Valor total dos itens: <strong className="text-ink-foreground">R$ 397,90</strong>
            </p>
          </div>

          <div className="rounded-3xl bg-card p-8 text-card-foreground shadow-[var(--shadow-lift)]">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Hoje você leva tudo por
            </p>
            <p className="mt-2 text-sm text-muted-foreground line-through">De R$ 397,90</p>
            <div className="mt-1 flex flex-col">
              <span className="font-display text-5xl font-extrabold text-foreground">R$ 119,90</span>
              <span className="mt-1 text-sm font-semibold text-success">Você economiza R$ 278,00</span>
            </div>
            
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-border bg-secondary/30 p-4">
                <p className="text-sm font-bold text-foreground">CONDIÇÕES ESPECIAIS:</p>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between border-b border-border pb-2 text-sm">
                    <span>Cartão ou Boleto</span>
                    <span className="font-bold">12x de R$ 11,99</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 text-sm">
                    <span className="flex items-center gap-1">PIX <span className="rounded bg-accent/10 px-1.5 py-0.5 text-[10px] text-accent font-bold">10% OFF</span></span>
                    <span className="text-lg font-extrabold text-accent">R$ 107,91</span>
                  </div>
                </div>
              </div>

              <CTA className="w-full">QUERO MEU LIVRO + BÔNUS</CTA>
              <p className="text-center text-xs font-medium text-muted-foreground">
                12x de R$ 11,99 • PIX R$ 107,91 • Frete grátis
              </p>
            </div>

            <ul className="mt-8 grid grid-cols-2 gap-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-success" />
                Compra segura
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-success" />
                Pagamento seguro
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-success" />
                Garantia 7 dias
              </li>
              <li className="flex items-center gap-2">
                <Truck className="h-3.5 w-3.5 text-success" />
                Frete grátis
              </li>
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
            Livro físico + e-book em PDF + 3 bônus. Frete grátis, PIX com desconto e 7 dias de garantia.
          </p>
          <div className="mt-8 flex flex-col items-center">
            <span className="text-lg text-ink-foreground/60 line-through">De R$ 397,90</span>
            <span className="mt-1 font-display text-6xl font-extrabold text-accent">R$ 119,90</span>
            <span className="mt-2 text-sm font-semibold text-success">Você economiza R$ 278,00</span>
          </div>
          <div className="mt-8 flex flex-col items-center">
            <CTA>QUERO MEU LIVRO + BÔNUS</CTA>
            <p className="mt-4 text-sm font-medium text-ink-foreground/70">
              12x de R$ 11,99 • PIX R$ 107,91 • Frete grátis
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-card py-12 text-center text-sm text-muted-foreground">
        <div className="mx-auto max-w-4xl px-5 leading-relaxed">
          <p>Copyright © 2026</p>
          <p>Academia do Eletricista</p>
          <p>Instituto Brasileiro de Qualificação Profissional Ltda - ME</p>
          <p>CNPJ: 10.984.548/0001-77</p>
        </div>
      </footer>

      {/* ------------------------------ STICKY CTA -------------------------- */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 backdrop-blur transition-transform duration-300 ${
          showBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="mx-auto grid max-w-5xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-accent">R$ 119,90 ou R$ 107,91 no PIX</p>
            <p className="truncate text-xs text-muted-foreground">
              Manual Definitivo — Livro + E-book + Bônus
            </p>
          </div>
          <CTA size="sm">QUERO MEU LIVRO</CTA>
        </div>
      </div>
    </main>
  );
}
