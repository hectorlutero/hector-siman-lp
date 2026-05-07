# EnterpriseMap Floor Plan Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Substituir o componente `EnterpriseMap.tsx` atual por uma planta arquitetônica animada scroll-driven que demonstra o impacto da IA em 3 camadas (operacional/tático/estratégico) por setor, começando com 4 setores (Marketing, Vendas, Atendimento, Finanças).

**Architecture:** Componente em pasta com responsabilidades isoladas: orquestrador (`index.tsx`), dados (`data.ts`), geometrias separadas desktop/mobile, primitivas SVG reutilizáveis, hooks de scroll. SVG inline com `framer-motion` (`useScroll` + `useTransform`) para animação scroll-driven. Padrão obrigatório triple-nested groups (outer SVG transform → middle motion opacity → inner motion transform) pra evitar conflito CSS×SVG.

**Tech Stack:** Next.js 16.2.4, React 19.2, TypeScript strict, framer-motion 12.38, Tailwind 4 (inline @theme em globals.css), lucide-react. Sem framework de testes — verificação primária via `npm run dev` no browser + `npm run build` + `tsc --noEmit` como gates automáticos. Para componente visual/animado, esse approach é mais valioso que unit tests.

**Reference spec:** [`landing-page/docs/superpowers/specs/2026-05-07-enterprise-map-floor-plan-design.md`](../specs/2026-05-07-enterprise-map-floor-plan-design.md)

**Reference memories (já criadas):** `project_three_layers_model`, `project_methodology_palette`, `feedback_door_swing_direction`, `feedback_svg_animation_patterns`.

**Important:** Per [`landing-page/AGENTS.md`](../../AGENTS.md), esse Next.js tem breaking changes vs versões anteriores. Antes de tocar APIs do Next, ler `node_modules/next/dist/docs/`. Pra esse componente isso é menos crítico (é um componente client-side puro com `"use client"`) mas vale checar se houver dúvida sobre comportamento de hidratação SVG.

---

## File Structure

Arquivos criados/modificados:

```
landing-page/src/components/EnterpriseMap/
├── index.tsx                     [CREATE] orquestrador, useScroll, layout switch
├── data.ts                       [CREATE] tipos + array de 4 setores com 3 camadas
├── geometry.desktop.ts           [CREATE] outer wall L-shape, room rects, container/trace/chips/door pos
├── geometry.mobile.ts            [CREATE] outer wall L vertical, room rects, posições mobile
├── FloorPlanDesktop.tsx          [CREATE] SVG desktop, monta primitivas
├── FloorPlanMobile.tsx           [CREATE] SVG mobile (vertical)
├── AggregateCard.tsx             [CREATE] card consolidado final
├── components/
│   ├── Room.tsx                  [CREATE] polígono + label + ícone + estado vermelho→verde
│   ├── ContainerBalloon.tsx      [CREATE] container outer + header
│   ├── SubBalloon.tsx            [CREATE] um sub-balão (bronze/silver/gold)
│   ├── DoorArc.tsx               [CREATE] arc + slab com swing pra dentro
│   ├── Trace.tsx                 [CREATE] PCB trace + vias + solder pads
│   └── ChipsCluster.tsx          [CREATE] 3 chips finais ao lado da sala
└── hooks/
    └── useSectorPhase.ts         [CREATE] mapeia scrollYProgress → progresso por sala

landing-page/src/components/EnterpriseMap.tsx   [DELETE]
landing-page/src/app/page.tsx                   [no change — import resolve via index.tsx]
```

---

## Task 1: Scaffold pasta + index placeholder

Cria a pasta nova com um placeholder funcional que ainda exibe algo razoável, sem deletar o componente antigo. Permite validar que o roteamento de import funciona antes de migrar.

**Files:**
- Create: `landing-page/src/components/EnterpriseMap/index.tsx`

- [ ] **Step 1: Criar `EnterpriseMap/index.tsx` placeholder**

```tsx
// landing-page/src/components/EnterpriseMap/index.tsx
"use client";

export default function EnterpriseMap() {
  return (
    <section
      aria-label="Mapa de impacto da automação por setor"
      className="py-24 px-6 bg-background border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-muted text-sm">EnterpriseMap (em construção)</p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verificar imports**

Run: `cd landing-page && npx tsc --noEmit`
Expected: sem erros relacionados a `EnterpriseMap`. (Pode ter erros não relacionados ao componente — anotar e ignorar nessa task.)

- [ ] **Step 3: Validar dev server roda sem quebrar**

Run: `cd landing-page && npm run dev` em segundo plano. Abrir browser em `http://localhost:3000` e confirmar que a página carrega normalmente. O componente novo (placeholder) ainda não está em uso — `page.tsx` ainda importa o antigo `EnterpriseMap.tsx`. Confirmar que tanto o antigo quanto o novo coexistem sem conflito de import (Next prioriza `index.tsx` sobre `EnterpriseMap.tsx` mesmo no mesmo nível? Verificar).

Se houver conflito: a coexistência não é possível. Nesse caso pular pra Task 2 que renomeia o antigo.

- [ ] **Step 4: Commit**

```bash
cd landing-page && git add src/components/EnterpriseMap/index.tsx
git commit -m "feat(enterprise-map): scaffold new EnterpriseMap folder structure"
```

(Se o repo não tem git inicializado, pular commit. Avisar usuário ao final.)

---

## Task 2: Renomear arquivo antigo + apontar import

Pra evitar ambiguidade entre `EnterpriseMap.tsx` e `EnterpriseMap/index.tsx`, renomear o antigo. Cria espaço pra construção do novo sem quebrar a página.

**Files:**
- Rename: `landing-page/src/components/EnterpriseMap.tsx` → `landing-page/src/components/EnterpriseMap.legacy.tsx`
- Modify: `landing-page/src/app/page.tsx:7`

- [ ] **Step 1: Renomear o arquivo antigo**

Run: `cd landing-page && mv src/components/EnterpriseMap.tsx src/components/EnterpriseMap.legacy.tsx`

- [ ] **Step 2: Manter `page.tsx` apontando pro nome `EnterpriseMap` (que agora resolve via folder)**

O import existente em `page.tsx:7` é:
```tsx
import EnterpriseMap from "@/components/EnterpriseMap";
```

Esse import resolve via `EnterpriseMap/index.tsx` (folder com index). Não precisa alterar.

- [ ] **Step 3: Confirmar que a página renderiza o placeholder**

Run: `cd landing-page && npm run dev` (se já não estiver rodando)
Abrir `http://localhost:3000` no browser. Rolar até a seção e verificar que aparece o placeholder "EnterpriseMap (em construção)". Antes existia a planta antiga.

- [ ] **Step 4: Build check**

Run: `cd landing-page && npm run build`
Expected: build conclui sem erros. (Pode emitir warnings sobre `EnterpriseMap.legacy.tsx` não ser importado — ignorar, vai ser deletado na Task 13.)

- [ ] **Step 5: Commit**

```bash
cd landing-page && git add -A
git commit -m "refactor(enterprise-map): rename old component to .legacy, route to new folder"
```

---

## Task 3: Tipos e mapping de camada

Define os tipos TypeScript do modelo de dados e o mapping de estilo por camada.

**Files:**
- Create: `landing-page/src/components/EnterpriseMap/data.ts` (com tipos + LAYER_STYLE; conteúdo real dos setores vem na Task 4)

- [ ] **Step 1: Criar `data.ts` com tipos e LAYER_STYLE**

```ts
// landing-page/src/components/EnterpriseMap/data.ts
import type { LucideIcon } from "lucide-react";

export type LayerKey = "operacional" | "tatico" | "estrategico";

export type SectorId =
  | "marketing"
  | "vendas"
  | "atendimento"
  | "financas"
  // Fase 2 (não implementados nesta iteração mas tipados pra evolução):
  | "diretoria"
  | "operacoes"
  | "rh"
  | "ti";

export interface Layer {
  key: LayerKey;
  titlePt: string;
  titleEn: string;
  descPt: string;
  descEn: string;
  resultPt: string;
  resultEn: string;
}

export interface RoomGeometry {
  desktopRect: { x: number; y: number; w: number; h: number };
  mobileRect: { x: number; y: number; w: number; h: number };
  desktopCenter: [number, number];
  mobileCenter: [number, number];
  desktopContainerPos: [number, number];
  mobileContainerPos: [number, number];
  desktopTracePath: string;
  mobileTracePath: string;
  desktopTraceVias: Array<[number, number]>;
  mobileTraceVias: Array<[number, number]>;
  desktopChipsPos: [number, number];
  mobileChipsPos: [number, number];
  desktopDoor: { wall: "n" | "s" | "e" | "w"; offset: number };
  mobileDoor: { wall: "n" | "s" | "e" | "w"; offset: number };
}

export interface Sector {
  id: SectorId;
  namePt: string;
  nameEn: string;
  icon: LucideIcon;
  order: number;
  geometry: RoomGeometry;
  layers: { op: Layer; tat: Layer; est: Layer };
}

export const LAYER_STYLE: Record<
  LayerKey,
  {
    stroke: string;
    fill: string;
    headerBg: string;
    label: string;
    iconUnicode: string;
  }
> = {
  operacional: {
    stroke: "var(--color-bronze)",
    fill: "rgba(205,127,50,0.06)",
    headerBg: "rgba(205,127,50,0.18)",
    label: "OPERACIONAL",
    iconUnicode: "⚙",
  },
  tatico: {
    stroke: "var(--color-silver)",
    fill: "rgba(192,200,208,0.06)",
    headerBg: "rgba(192,200,208,0.18)",
    label: "TÁTICO",
    iconUnicode: "◆",
  },
  estrategico: {
    stroke: "var(--color-gold)",
    fill: "rgba(212,175,55,0.06)",
    headerBg: "rgba(212,175,55,0.18)",
    label: "ESTRATÉGICO",
    iconUnicode: "★",
  },
};
```

- [ ] **Step 2: Typecheck**

Run: `cd landing-page && npx tsc --noEmit`
Expected: sem erros novos no `data.ts`.

- [ ] **Step 3: Commit**

```bash
cd landing-page && git add src/components/EnterpriseMap/data.ts
git commit -m "feat(enterprise-map): add types and LAYER_STYLE mapping"
```

---

## Task 4: Conteúdo dos 4 setores iniciais (placeholder do spec §5.3)

Adiciona os 4 setores no array `sectors` com o conteúdo placeholder do spec (usuário pode refinar depois). Geometria fica vazia por enquanto e é preenchida nas Tasks 5–6.

**Files:**
- Modify: `landing-page/src/components/EnterpriseMap/data.ts`

- [ ] **Step 1: Adicionar import de ícones lucide e array `sectors`**

Append ao final de `data.ts`:

```ts
import { Megaphone, Zap, Headset, TrendingUp } from "lucide-react";
import { DESKTOP_GEOMETRY } from "./geometry.desktop";
import { MOBILE_GEOMETRY } from "./geometry.mobile";

export const sectors: Sector[] = [
  {
    id: "marketing",
    namePt: "Marketing",
    nameEn: "Marketing",
    icon: Megaphone,
    order: 1,
    geometry: {
      desktopRect: DESKTOP_GEOMETRY.marketing.rect,
      mobileRect: MOBILE_GEOMETRY.marketing.rect,
      desktopCenter: DESKTOP_GEOMETRY.marketing.center,
      mobileCenter: MOBILE_GEOMETRY.marketing.center,
      desktopContainerPos: DESKTOP_GEOMETRY.marketing.containerPos,
      mobileContainerPos: MOBILE_GEOMETRY.marketing.containerPos,
      desktopTracePath: DESKTOP_GEOMETRY.marketing.tracePath,
      mobileTracePath: MOBILE_GEOMETRY.marketing.tracePath,
      desktopTraceVias: DESKTOP_GEOMETRY.marketing.traceVias,
      mobileTraceVias: MOBILE_GEOMETRY.marketing.traceVias,
      desktopChipsPos: DESKTOP_GEOMETRY.marketing.chipsPos,
      mobileChipsPos: MOBILE_GEOMETRY.marketing.chipsPos,
      desktopDoor: DESKTOP_GEOMETRY.marketing.door,
      mobileDoor: MOBILE_GEOMETRY.marketing.door,
    },
    layers: {
      op: {
        key: "operacional",
        titlePt: "SEO automático",
        titleEn: "Automated SEO",
        descPt: "Geração e agendamento auto. de conteúdo SEO",
        descEn: "AI-driven SEO content generation and scheduling",
        resultPt: "-3h/dia",
        resultEn: "-3h/day",
      },
      tat: {
        key: "tatico",
        titlePt: "Atribuição IA",
        titleEn: "AI Attribution",
        descPt: "Atribuição multi-touch IA cruzando canais",
        descEn: "Multi-touch AI attribution across channels",
        resultPt: "-25% CAC",
        resultEn: "-25% CAC",
      },
      est: {
        key: "estrategico",
        titlePt: "Posicionamento estratégico",
        titleEn: "Strategic positioning",
        descPt: "Cenários macro & posicionamento de mercado",
        descEn: "Macro scenarios & market positioning",
        resultPt: "+12% mkt share",
        resultEn: "+12% mkt share",
      },
    },
  },
  {
    id: "vendas",
    namePt: "Vendas",
    nameEn: "Sales",
    icon: Zap,
    order: 2,
    geometry: {
      desktopRect: DESKTOP_GEOMETRY.vendas.rect,
      mobileRect: MOBILE_GEOMETRY.vendas.rect,
      desktopCenter: DESKTOP_GEOMETRY.vendas.center,
      mobileCenter: MOBILE_GEOMETRY.vendas.center,
      desktopContainerPos: DESKTOP_GEOMETRY.vendas.containerPos,
      mobileContainerPos: MOBILE_GEOMETRY.vendas.containerPos,
      desktopTracePath: DESKTOP_GEOMETRY.vendas.tracePath,
      mobileTracePath: MOBILE_GEOMETRY.vendas.tracePath,
      desktopTraceVias: DESKTOP_GEOMETRY.vendas.traceVias,
      mobileTraceVias: MOBILE_GEOMETRY.vendas.traceVias,
      desktopChipsPos: DESKTOP_GEOMETRY.vendas.chipsPos,
      mobileChipsPos: MOBILE_GEOMETRY.vendas.chipsPos,
      desktopDoor: DESKTOP_GEOMETRY.vendas.door,
      mobileDoor: MOBILE_GEOMETRY.vendas.door,
    },
    layers: {
      op: {
        key: "operacional",
        titlePt: "Qualificação 24/7",
        titleEn: "24/7 Lead qualification",
        descPt: "Qualificação de leads e resposta 24/7",
        descEn: "AI lead qualification and 24/7 response",
        resultPt: "+R$ 18k/mês",
        resultEn: "+$3.5k/mo",
      },
      tat: {
        key: "tatico",
        titlePt: "Forecasting de pipeline",
        titleEn: "Pipeline forecasting",
        descPt: "Forecasting de pipeline e priorização",
        descEn: "Pipeline forecasting and AI prioritization",
        resultPt: "+30% conversão",
        resultEn: "+30% conversion",
      },
      est: {
        key: "estrategico",
        titlePt: "Expansão de TAM",
        titleEn: "TAM expansion",
        descPt: "Identificação de TAM e expansão de mercado",
        descEn: "TAM identification and market expansion",
        resultPt: "+R$ 2M/ano",
        resultEn: "+$400k/yr",
      },
    },
  },
  {
    id: "atendimento",
    namePt: "Atendimento",
    nameEn: "Customer Support",
    icon: Headset,
    order: 3,
    geometry: {
      desktopRect: DESKTOP_GEOMETRY.atendimento.rect,
      mobileRect: MOBILE_GEOMETRY.atendimento.rect,
      desktopCenter: DESKTOP_GEOMETRY.atendimento.center,
      mobileCenter: MOBILE_GEOMETRY.atendimento.center,
      desktopContainerPos: DESKTOP_GEOMETRY.atendimento.containerPos,
      mobileContainerPos: MOBILE_GEOMETRY.atendimento.containerPos,
      desktopTracePath: DESKTOP_GEOMETRY.atendimento.tracePath,
      mobileTracePath: MOBILE_GEOMETRY.atendimento.tracePath,
      desktopTraceVias: DESKTOP_GEOMETRY.atendimento.traceVias,
      mobileTraceVias: MOBILE_GEOMETRY.atendimento.traceVias,
      desktopChipsPos: DESKTOP_GEOMETRY.atendimento.chipsPos,
      mobileChipsPos: MOBILE_GEOMETRY.atendimento.chipsPos,
      desktopDoor: DESKTOP_GEOMETRY.atendimento.door,
      mobileDoor: MOBILE_GEOMETRY.atendimento.door,
    },
    layers: {
      op: {
        key: "operacional",
        titlePt: "Triagem automática",
        titleEn: "Auto triage",
        descPt: "Triagem inicial e respostas automáticas",
        descEn: "Initial triage and automated responses",
        resultPt: "-70% tempo",
        resultEn: "-70% time",
      },
      tat: {
        key: "tatico",
        titlePt: "Detecção de churn",
        titleEn: "Churn detection",
        descPt: "Detecção proativa de risco de cancelamento",
        descEn: "Proactive cancellation risk detection",
        resultPt: "-15% churn",
        resultEn: "-15% churn",
      },
      est: {
        key: "estrategico",
        titlePt: "Insights de produto",
        titleEn: "Product insights",
        descPt: "Insights de produto a partir de feedback",
        descEn: "Product insights from feedback patterns",
        resultPt: "+R$ 800k/ano",
        resultEn: "+$160k/yr",
      },
    },
  },
  {
    id: "financas",
    namePt: "Finanças",
    nameEn: "Finance",
    icon: TrendingUp,
    order: 4,
    geometry: {
      desktopRect: DESKTOP_GEOMETRY.financas.rect,
      mobileRect: MOBILE_GEOMETRY.financas.rect,
      desktopCenter: DESKTOP_GEOMETRY.financas.center,
      mobileCenter: MOBILE_GEOMETRY.financas.center,
      desktopContainerPos: DESKTOP_GEOMETRY.financas.containerPos,
      mobileContainerPos: MOBILE_GEOMETRY.financas.containerPos,
      desktopTracePath: DESKTOP_GEOMETRY.financas.tracePath,
      mobileTracePath: MOBILE_GEOMETRY.financas.tracePath,
      desktopTraceVias: DESKTOP_GEOMETRY.financas.traceVias,
      mobileTraceVias: MOBILE_GEOMETRY.financas.traceVias,
      desktopChipsPos: DESKTOP_GEOMETRY.financas.chipsPos,
      mobileChipsPos: MOBILE_GEOMETRY.financas.chipsPos,
      desktopDoor: DESKTOP_GEOMETRY.financas.door,
      mobileDoor: MOBILE_GEOMETRY.financas.door,
    },
    layers: {
      op: {
        key: "operacional",
        titlePt: "Conciliação automática",
        titleEn: "Auto reconciliation",
        descPt: "Conciliação bancária e AP/AR automatizados",
        descEn: "Bank reconciliation and AP/AR automation",
        resultPt: "+R$ 13,5k/mês",
        resultEn: "+$2.5k/mo",
      },
      tat: {
        key: "tatico",
        titlePt: "Cash flow live",
        titleEn: "Live cash flow",
        descPt: "Forecast de fluxo de caixa em tempo real",
        descEn: "Real-time cash flow forecasting",
        resultPt: "-30% capital giro",
        resultEn: "-30% working capital",
      },
      est: {
        key: "estrategico",
        titlePt: "Cenários M&A",
        titleEn: "M&A scenarios",
        descPt: "Cenários de M&A e alocação estratégica",
        descEn: "M&A scenarios and strategic allocation",
        resultPt: "+R$ 2M/ano",
        resultEn: "+$400k/yr",
      },
    },
  },
];
```

- [ ] **Step 2: Typecheck (vai falhar até Task 5+6 criarem `geometry.desktop.ts` e `geometry.mobile.ts`)**

Run: `cd landing-page && npx tsc --noEmit`
Expected: erro `Cannot find module './geometry.desktop'` e `'./geometry.mobile'`. **Não fazer commit ainda** — pular pra Task 5.

---

## Task 5: Geometria desktop (L-shape)

Define todas as posições/dimensões do floor plan desktop. Coordenadas seguem o spec §4.3.

**Files:**
- Create: `landing-page/src/components/EnterpriseMap/geometry.desktop.ts`

- [ ] **Step 1: Criar `geometry.desktop.ts`**

```ts
// landing-page/src/components/EnterpriseMap/geometry.desktop.ts
// Coordenadas em viewBox 260×200. Outline L-shape per spec §4.3.

export const DESKTOP_VIEWBOX = { width: 260, height: 200 };

// Outer wall path (clockwise from top-left)
export const DESKTOP_OUTER_WALL_PATH =
  "M 15 15 L 200 15 L 200 60 L 240 60 L 240 175 L 15 175 Z";

// Corridor T-shape rectangles
export const DESKTOP_CORRIDOR = {
  horizontal: { x: 15, y: 83, w: 225, h: 10 },
  verticalEntry: { x: 105, y: 15, w: 10, h: 68 },
};

// Reception (área de apoio neutra)
export const DESKTOP_RECEPTION = { x: 200, y: 60, w: 40, h: 23 };

// Building entrance (parede norte do corredor vertical, swing pra dentro)
export const DESKTOP_ENTRANCE = { x: 106, y: 15, width: 8 };

type RoomEntry = {
  rect: { x: number; y: number; w: number; h: number };
  center: [number, number];
  containerPos: [number, number];     // canto superior esquerdo do container (300x320)
  tracePath: string;                  // SVG d-attribute
  traceVias: Array<[number, number]>; // pontos onde via é desenhada
  chipsPos: [number, number];         // canto superior esquerdo dos chips (3 chips empilhados)
  door: { wall: "n" | "s" | "e" | "w"; offset: number };
};

// Coordenadas escolhidas pra evitar sobreposição entre containers vizinhos.
// Containers ficam fora da viewBox (à esquerda do plan), num "canvas estendido"
// gerenciado em FloorPlanDesktop.tsx (seção 6 abaixo).
//
// Convenção: viewBox aqui é 260×200, mas o SVG renderizado tem viewBox estendido
// (-340 0 600 480) pra acomodar containers à esquerda.

export const DESKTOP_GEOMETRY: Record<
  "marketing" | "vendas" | "atendimento" | "financas",
  RoomEntry
> = {
  marketing: {
    rect: { x: 15, y: 15, w: 95, h: 65 },
    center: [62, 47],
    containerPos: [-330, -10],
    tracePath: "M 15 47 L -10 47 L -10 90 L -30 90 L -30 30 L -50 30",
    traceVias: [
      [-10, 47],
      [-10, 90],
      [-30, 90],
      [-30, 30],
    ],
    chipsPos: [85, 18],
    door: { wall: "s", offset: 30 }, // porta na parede sul, 30px do canto SW
  },
  vendas: {
    rect: { x: 120, y: 15, w: 80, h: 65 },
    center: [160, 47],
    containerPos: [-330, 80],
    tracePath: "M 120 47 L 60 47 L 60 130 L 0 130 L 0 120 L -50 120",
    traceVias: [
      [60, 47],
      [60, 130],
      [0, 130],
      [0, 120],
    ],
    chipsPos: [180, 18],
    door: { wall: "w", offset: 35 }, // porta na parede oeste, 35px do canto NW
  },
  atendimento: {
    rect: { x: 15, y: 93, w: 95, h: 82 },
    center: [62, 134],
    containerPos: [-330, 180],
    tracePath: "M 15 134 L -10 134 L -10 220 L -30 220 L -30 220 L -50 220",
    traceVias: [
      [-10, 134],
      [-10, 220],
      [-30, 220],
    ],
    chipsPos: [85, 100],
    door: { wall: "n", offset: 45 }, // porta na parede norte (corredor abaixo)
  },
  financas: {
    rect: { x: 120, y: 93, w: 120, h: 82 },
    center: [180, 134],
    containerPos: [260, 180],
    tracePath: "M 240 134 L 280 134 L 280 200 L 260 200 L 260 320 L 280 320",
    traceVias: [
      [280, 134],
      [280, 200],
      [260, 200],
      [260, 320],
    ],
    chipsPos: [220, 100],
    door: { wall: "n", offset: 30 },
  },
};
```

**Note:** trace paths e container positions usam coordenadas fora da viewBox 260×200 — o SVG real vai usar viewBox estendida (definida na Task 8). As posições aqui são tentativas razoáveis; a Task 11 inclui um passo de validação visual onde se pode ajustar.

- [ ] **Step 2: Typecheck**

Run: `cd landing-page && npx tsc --noEmit`
Expected: erros do `data.ts` (ainda falta `geometry.mobile.ts`) mas não erros novos do `geometry.desktop.ts`.

- [ ] **Step 3: Commit**

```bash
cd landing-page && git add src/components/EnterpriseMap/geometry.desktop.ts
git commit -m "feat(enterprise-map): add desktop L-shape geometry"
```

---

## Task 6: Geometria mobile (L vertical)

Análoga ao desktop mas em retrato.

**Files:**
- Create: `landing-page/src/components/EnterpriseMap/geometry.mobile.ts`

- [ ] **Step 1: Criar `geometry.mobile.ts`**

```ts
// landing-page/src/components/EnterpriseMap/geometry.mobile.ts
// viewBox 160×640 (estendido pra caber container abaixo de cada sala)

export const MOBILE_VIEWBOX = { width: 160, height: 640 };

// Outer wall L-vertical (notch top-right)
export const MOBILE_OUTER_WALL_PATH =
  "M 10 10 L 100 10 L 100 50 L 145 50 L 145 305 L 10 305 Z";

export const MOBILE_RECEPTION = { x: 10, y: 10, w: 90, h: 40 };
export const MOBILE_ENTRANCE = { x: 55, y: 10, width: 10 };

type RoomEntry = {
  rect: { x: number; y: number; w: number; h: number };
  center: [number, number];
  containerPos: [number, number];
  tracePath: string;
  traceVias: Array<[number, number]>;
  chipsPos: [number, number];
  door: { wall: "n" | "s" | "e" | "w"; offset: number };
};

// Cada sala tem container POSICIONADO à direita (fora da viewBox 160 width).
// SVG real usa viewBox estendido: viewBox(-180 0 360 1100)
// Mobile: layout vertical, scroll vertical. Cada sala ~140px alta, com
// containers à direita ou abaixo.

export const MOBILE_GEOMETRY: Record<
  "marketing" | "vendas" | "atendimento" | "financas",
  RoomEntry
> = {
  marketing: {
    rect: { x: 10, y: 60, w: 135, h: 58 },
    center: [77, 89],
    containerPos: [180, 60],
    tracePath: "M 145 89 L 165 89 L 165 89 L 180 89",
    traceVias: [[165, 89]],
    chipsPos: [120, 65],
    door: { wall: "e", offset: 30 },
  },
  vendas: {
    rect: { x: 10, y: 125, w: 135, h: 58 },
    center: [77, 154],
    containerPos: [180, 130],
    tracePath: "M 145 154 L 165 154 L 165 154 L 180 154",
    traceVias: [[165, 154]],
    chipsPos: [120, 130],
    door: { wall: "e", offset: 30 },
  },
  atendimento: {
    rect: { x: 10, y: 190, w: 135, h: 58 },
    center: [77, 219],
    containerPos: [180, 195],
    tracePath: "M 145 219 L 165 219 L 165 219 L 180 219",
    traceVias: [[165, 219]],
    chipsPos: [120, 195],
    door: { wall: "e", offset: 30 },
  },
  financas: {
    rect: { x: 10, y: 255, w: 135, h: 50 },
    center: [77, 280],
    containerPos: [180, 260],
    tracePath: "M 145 280 L 165 280 L 165 280 L 180 280",
    traceVias: [[165, 280]],
    chipsPos: [120, 258],
    door: { wall: "e", offset: 25 },
  },
};
```

- [ ] **Step 2: Typecheck**

Run: `cd landing-page && npx tsc --noEmit`
Expected: sem erros novos. `data.ts` agora compila.

- [ ] **Step 3: Commit**

```bash
cd landing-page && git add src/components/EnterpriseMap/geometry.mobile.ts src/components/EnterpriseMap/data.ts
git commit -m "feat(enterprise-map): add mobile geometry and sectors data"
```

---

## Task 7: Componente `Room`

Renderiza um polígono retangular pro setor com label, ícone e estado de cor (vermelho ou verde) baseado em prop `phase`.

**Files:**
- Create: `landing-page/src/components/EnterpriseMap/components/Room.tsx`

- [ ] **Step 1: Criar `Room.tsx`**

```tsx
// landing-page/src/components/EnterpriseMap/components/Room.tsx
"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface RoomProps {
  rect: { x: number; y: number; w: number; h: number };
  center: [number, number];
  namePt: string;
  nameEn: string;
  icon: LucideIcon;
  // sectorProgress: 0..1 within this sector's scroll window
  sectorProgress: MotionValue<number>;
  t: (pt: string, en: string) => string;
}

export function Room({ rect, center, namePt, nameEn, icon: Icon, sectorProgress, t }: RoomProps) {
  // Color transition: red until 0.05, green from 0.10
  const fillOpacity = useTransform(sectorProgress, [0, 0.05, 0.10], [0.10, 0.10, 0.14]);
  const fillColor = useTransform(sectorProgress, [0, 0.05, 0.10],
    ["rgba(239,68,68,0.10)", "rgba(239,68,68,0.10)", "rgba(34,197,94,0.14)"]);
  const strokeColor = useTransform(sectorProgress, [0, 0.05, 0.10],
    ["#ef4444", "#ef4444", "#22c55e"]);
  const labelColor = useTransform(sectorProgress, [0, 0.05, 0.10],
    ["#ef4444", "#ef4444", "#22c55e"]);
  const statusOpacity = useTransform(sectorProgress, [0, 0.05, 0.10], [1, 1, 0]);
  // Glow flash at transition
  const glow = useTransform(sectorProgress, [0.05, 0.10, 0.20],
    ["drop-shadow(0 0 0 transparent)", "drop-shadow(0 0 8px rgba(34,197,94,0.7))", "drop-shadow(0 0 0 transparent)"]);

  return (
    <g>
      <motion.rect
        x={rect.x}
        y={rect.y}
        width={rect.w}
        height={rect.h}
        style={{
          fill: fillColor,
          stroke: strokeColor,
          filter: glow,
        }}
        strokeWidth={2}
      />
      {/* Sector icon top-left of room */}
      <g transform={`translate(${rect.x + 6}, ${rect.y + 6})`} opacity={0.5}>
        <Icon size={12} stroke="#cbd5e1" strokeWidth={1.5} />
      </g>
      {/* Room label centered */}
      <motion.text
        x={center[0]}
        y={center[1]}
        textAnchor="middle"
        fontSize={9}
        fontWeight="bold"
        fontFamily="system-ui, sans-serif"
        style={{ fill: labelColor }}
      >
        {t(namePt, nameEn)}
      </motion.text>
      <motion.text
        x={center[0]}
        y={center[1] + 9}
        textAnchor="middle"
        fontSize={4.5}
        fontFamily="system-ui, sans-serif"
        fill="#ef4444"
        opacity={0.75}
        style={{ opacity: statusOpacity }}
      >
        sem automação
      </motion.text>
    </g>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `cd landing-page && npx tsc --noEmit`
Expected: sem erros novos.

- [ ] **Step 3: Commit**

```bash
cd landing-page && git add src/components/EnterpriseMap/components/Room.tsx
git commit -m "feat(enterprise-map): add Room component with red→green state transition"
```

---

## Task 8: Componente `DoorArc`

Primitivo SVG que renderiza uma porta com swing pra dentro da sala. Calcula sweep flag e geometria do arco baseado na parede.

**Files:**
- Create: `landing-page/src/components/EnterpriseMap/components/DoorArc.tsx`

- [ ] **Step 1: Criar `DoorArc.tsx`**

```tsx
// landing-page/src/components/EnterpriseMap/components/DoorArc.tsx
"use client";

interface DoorArcProps {
  // Posição do hinge (canto da abertura na parede)
  hingeX: number;
  hingeY: number;
  // Em qual parede da sala a porta está
  wall: "n" | "s" | "e" | "w";
  // Tamanho do vão
  doorWidth?: number;
  bgColor?: string; // cor de fundo da viewBox (pra "cortar" a parede no vão)
}

/**
 * Renderiza porta arquitetônica com swing pra dentro da sala.
 *
 * Convenção: o hinge fica na posição (hingeX, hingeY). O slab e o arco
 * são desenhados de modo que o swing aconteça SEMPRE pra dentro da sala servida.
 *
 * Direções de swing por parede (todas swing INTO room):
 * - n (parede norte, sala embaixo): slab vai pra baixo (sul), arco bulga pra baixo-direita
 * - s (parede sul, sala em cima): slab vai pra cima (norte), arco bulga pra cima-direita
 * - e (parede leste, sala à esquerda): slab vai pra esquerda, arco bulga pra esquerda-cima
 * - w (parede oeste, sala à direita): slab vai pra direita, arco bulga pra direita-cima
 */
export function DoorArc({ hingeX, hingeY, wall, doorWidth = 12, bgColor = "#0a0a1a" }: DoorArcProps) {
  let slabX2 = hingeX;
  let slabY2 = hingeY;
  let openX = hingeX;
  let openY = hingeY;
  let sweepFlag: 0 | 1 = 0;
  let openingX1 = hingeX;
  let openingY1 = hingeY;
  let openingX2 = hingeX;
  let openingY2 = hingeY;

  switch (wall) {
    case "n": // sala abaixo, swing into room = slab points DOWN, arc bulges into room
      slabX2 = hingeX + doorWidth;
      slabY2 = hingeY;
      openX = hingeX;
      openY = hingeY + doorWidth;
      // Opening on wall: from (hingeX, hingeY) to (hingeX+doorWidth, hingeY)
      openingX1 = hingeX;
      openingY1 = hingeY;
      openingX2 = hingeX + doorWidth;
      openingY2 = hingeY;
      sweepFlag = 0; // ccw on screen
      break;
    case "s":
      slabX2 = hingeX + doorWidth;
      slabY2 = hingeY;
      openX = hingeX;
      openY = hingeY - doorWidth;
      openingX1 = hingeX;
      openingY1 = hingeY;
      openingX2 = hingeX + doorWidth;
      openingY2 = hingeY;
      sweepFlag = 1;
      break;
    case "e": // sala à esquerda, swing INTO room = slab points LEFT
      slabX2 = hingeX;
      slabY2 = hingeY + doorWidth;
      openX = hingeX - doorWidth;
      openY = hingeY;
      openingX1 = hingeX;
      openingY1 = hingeY;
      openingX2 = hingeX;
      openingY2 = hingeY + doorWidth;
      sweepFlag = 0;
      break;
    case "w":
      slabX2 = hingeX;
      slabY2 = hingeY + doorWidth;
      openX = hingeX + doorWidth;
      openY = hingeY;
      openingX1 = hingeX;
      openingY1 = hingeY;
      openingX2 = hingeX;
      openingY2 = hingeY + doorWidth;
      sweepFlag = 1;
      break;
  }

  return (
    <g>
      {/* Wall opening (background-colored thick line over the wall) */}
      <line
        x1={openingX1}
        y1={openingY1}
        x2={openingX2}
        y2={openingY2}
        stroke={bgColor}
        strokeWidth={3.5}
      />
      {/* Slab in open position */}
      <line
        x1={hingeX}
        y1={hingeY}
        x2={openX}
        y2={openY}
        stroke="#cbd5e1"
        strokeWidth={1.4}
      />
      {/* Arc showing swing path */}
      <path
        d={`M ${slabX2} ${slabY2} A ${doorWidth} ${doorWidth} 0 0 ${sweepFlag} ${openX} ${openY}`}
        fill="none"
        stroke="#cbd5e1"
        strokeWidth={1}
      />
    </g>
  );
}

/**
 * Helper: calcula posição do hinge baseada em rect da sala + wall + offset.
 */
export function computeHinge(
  rect: { x: number; y: number; w: number; h: number },
  wall: "n" | "s" | "e" | "w",
  offset: number,
  doorWidth: number = 12,
): { hingeX: number; hingeY: number } {
  switch (wall) {
    case "n":
      return { hingeX: rect.x + offset, hingeY: rect.y };
    case "s":
      return { hingeX: rect.x + offset, hingeY: rect.y + rect.h };
    case "e":
      return { hingeX: rect.x + rect.w, hingeY: rect.y + offset };
    case "w":
      return { hingeX: rect.x, hingeY: rect.y + offset };
  }
}
```

- [ ] **Step 2: Typecheck**

Run: `cd landing-page && npx tsc --noEmit`
Expected: sem erros novos.

- [ ] **Step 3: Commit**

```bash
cd landing-page && git add src/components/EnterpriseMap/components/DoorArc.tsx
git commit -m "feat(enterprise-map): add DoorArc primitive with into-room swing"
```

---

## Task 9: Componentes `SubBalloon`, `ContainerBalloon`, `Trace`, `ChipsCluster`

4 primitivas relacionadas. Implementadas juntas pra commit coeso.

**Files:**
- Create: `landing-page/src/components/EnterpriseMap/components/SubBalloon.tsx`
- Create: `landing-page/src/components/EnterpriseMap/components/ContainerBalloon.tsx`
- Create: `landing-page/src/components/EnterpriseMap/components/Trace.tsx`
- Create: `landing-page/src/components/EnterpriseMap/components/ChipsCluster.tsx`

- [ ] **Step 1: Criar `SubBalloon.tsx`**

```tsx
// landing-page/src/components/EnterpriseMap/components/SubBalloon.tsx
"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { LAYER_STYLE, type Layer } from "../data";

interface SubBalloonProps {
  layer: Layer;
  // Posição absoluta SVG (não animada)
  x: number;
  y: number;
  width: number;
  height: number;
  // sectorProgress 0..1
  sectorProgress: MotionValue<number>;
  // Phase ranges within sector — quando esse balão deve aparecer
  startProgress: number;
  endProgress: number;
  t: (pt: string, en: string) => string;
}

/**
 * Triple-nested groups: outer (SVG transform pra posição) → middle (motion opacity) →
 * inner (motion translateX). CSS transform em SVG sobrescreve atributo, então
 * separação evita conflito (memory feedback_svg_animation_patterns.md).
 */
export function SubBalloon({
  layer,
  x,
  y,
  width,
  height,
  sectorProgress,
  startProgress,
  endProgress,
  t,
}: SubBalloonProps) {
  const style = LAYER_STYLE[layer.key];

  // Fade in from startProgress to startProgress+0.04, fade out endProgress→1
  const opacity = useTransform(
    sectorProgress,
    [startProgress, startProgress + 0.04, endProgress, 1],
    [0, 1, 1, 1],
  );
  const slideX = useTransform(
    sectorProgress,
    [startProgress, startProgress + 0.04],
    [-12, 0],
  );

  return (
    <g transform={`translate(${x}, ${y})`}>
      <motion.g style={{ opacity }}>
        <motion.g style={{ x: slideX }}>
          <rect width={width} height={height} rx={8} fill={style.fill} stroke={style.stroke} strokeWidth={1.2} />
          <rect width={width} height={20} rx={8} fill={style.headerBg} />
          <rect y={14} width={width} height={6} fill={style.headerBg} />
          <text x={12} y={14} fill={style.stroke} fontSize={10} fontWeight="bold" fontFamily="system-ui">
            {style.iconUnicode} {style.label}
          </text>
          <text x={12} y={38} fill="#e2e8f0" fontSize={10} fontFamily="system-ui">
            {t(layer.descPt, layer.descEn)}
          </text>
          <text
            x={width - 12}
            y={height - 8}
            fill="#22c55e"
            fontSize={16}
            fontWeight="bold"
            fontFamily="system-ui"
            textAnchor="end"
          >
            {t(layer.resultPt, layer.resultEn)}
          </text>
        </motion.g>
      </motion.g>
    </g>
  );
}
```

- [ ] **Step 2: Criar `ContainerBalloon.tsx`**

```tsx
// landing-page/src/components/EnterpriseMap/components/ContainerBalloon.tsx
"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { SubBalloon } from "./SubBalloon";
import type { Sector } from "../data";

interface ContainerBalloonProps {
  sector: Sector;
  // Posição do canto superior esquerdo do container
  x: number;
  y: number;
  // sectorProgress 0..1
  sectorProgress: MotionValue<number>;
  t: (pt: string, en: string) => string;
}

const CONTAINER_W = 300;
const CONTAINER_H = 320;
const HEADER_H = 34;
const SUB_W = 268;
const SUB_H = 78;
const SUB_GAP = 10;

export function ContainerBalloon({ sector, x, y, sectorProgress, t }: ContainerBalloonProps) {
  // Container fades in 0.15-0.18, stays through 0.88, fades out 0.88-0.95
  const containerOpacity = useTransform(
    sectorProgress,
    [0.15, 0.18, 0.88, 0.95],
    [0, 1, 1, 0],
  );

  const subStartY = HEADER_H + 16;
  const sub1Y = y + subStartY;
  const sub2Y = sub1Y + SUB_H + SUB_GAP;
  const sub3Y = sub2Y + SUB_H + SUB_GAP;
  const subX = x + (CONTAINER_W - SUB_W) / 2;

  return (
    <g>
      {/* Container wrapper */}
      <motion.g style={{ opacity: containerOpacity }}>
        <rect
          x={x}
          y={y}
          width={CONTAINER_W}
          height={CONTAINER_H}
          rx={14}
          fill="rgba(15,23,42,0.95)"
          stroke="#cbd5e1"
          strokeWidth={1.5}
        />
        <rect x={x} y={y} width={CONTAINER_W} height={HEADER_H} rx={14} fill="rgba(34,197,94,0.10)" />
        <rect x={x} y={y + 20} width={CONTAINER_W} height={14} fill="rgba(34,197,94,0.10)" />
        <text
          x={x + 16}
          y={y + 22}
          fill="#22c55e"
          fontSize={10}
          fontWeight="bold"
          fontFamily="system-ui"
          letterSpacing={2}
        >
          IMPACTO IA · {t(sector.namePt, sector.nameEn).toUpperCase()}
        </text>
        <circle cx={x + CONTAINER_W - 18} cy={y + 18} r={3.5} fill="#22c55e" />
        <line
          x1={x + 20}
          y1={y + HEADER_H + 6}
          x2={x + CONTAINER_W - 20}
          y2={y + HEADER_H + 6}
          stroke="#cbd5e1"
          strokeWidth={0.4}
          opacity={0.3}
        />
      </motion.g>

      {/* Sub-balloons */}
      <SubBalloon
        layer={sector.layers.op}
        x={subX}
        y={sub1Y}
        width={SUB_W}
        height={SUB_H}
        sectorProgress={sectorProgress}
        startProgress={0.25}
        endProgress={0.88}
        t={t}
      />
      <SubBalloon
        layer={sector.layers.tat}
        x={subX}
        y={sub2Y}
        width={SUB_W}
        height={SUB_H}
        sectorProgress={sectorProgress}
        startProgress={0.45}
        endProgress={0.88}
        t={t}
      />
      <SubBalloon
        layer={sector.layers.est}
        x={subX}
        y={sub3Y}
        width={SUB_W}
        height={SUB_H}
        sectorProgress={sectorProgress}
        startProgress={0.65}
        endProgress={0.88}
        t={t}
      />
    </g>
  );
}
```

- [ ] **Step 3: Criar `Trace.tsx`**

```tsx
// landing-page/src/components/EnterpriseMap/components/Trace.tsx
"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface TraceProps {
  d: string; // SVG path d-attribute
  vias: Array<[number, number]>;
  startPoint: [number, number]; // pad da sala
  endPoint: [number, number];   // pad do container
  sectorProgress: MotionValue<number>;
}

export function Trace({ d, vias, startPoint, endPoint, sectorProgress }: TraceProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(320);

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, [d]);

  const dashOffset = useTransform(sectorProgress, [0.15, 0.22], [pathLength, 0]);
  const opacity = useTransform(sectorProgress, [0.15, 0.20, 0.88, 0.95], [0, 0.85, 0.85, 0]);
  const viaOpacity = useTransform(sectorProgress, [0.20, 0.24, 0.88, 0.95], [0, 1, 1, 0]);

  return (
    <g>
      <motion.path
        ref={pathRef}
        d={d}
        fill="none"
        stroke="#22c55e"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="miter"
        style={{ strokeDasharray: pathLength, strokeDashoffset: dashOffset, opacity }}
      />
      {vias.map(([cx, cy], i) => (
        <motion.circle
          key={`via-${i}`}
          cx={cx}
          cy={cy}
          r={3.5}
          fill="#0a0a1a"
          stroke="#22c55e"
          strokeWidth={1.5}
          style={{ opacity: viaOpacity }}
        />
      ))}
      {/* Solder pads at endpoints */}
      <motion.rect
        x={startPoint[0] - 4}
        y={startPoint[1] - 3}
        width={8}
        height={6}
        rx={1}
        fill="#22c55e"
        style={{ opacity: viaOpacity }}
      />
      <motion.rect
        x={endPoint[0] - 4}
        y={endPoint[1] - 3}
        width={8}
        height={6}
        rx={1}
        fill="#22c55e"
        style={{ opacity: viaOpacity }}
      />
    </g>
  );
}
```

- [ ] **Step 4: Criar `ChipsCluster.tsx`**

```tsx
// landing-page/src/components/EnterpriseMap/components/ChipsCluster.tsx
"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface ChipsClusterProps {
  x: number;
  y: number;
  sectorProgress: MotionValue<number>;
}

/**
 * 3 chips empilhados verticalmente representando bronze/silver/gold após colapso do container.
 * Cada chip ~9px raio, gap vertical 22px.
 */
export function ChipsCluster({ x, y, sectorProgress }: ChipsClusterProps) {
  // Chips aparecem em 0.92 e ficam até o final
  const opacity = useTransform(sectorProgress, [0.88, 0.92], [0, 1]);
  const scale = useTransform(sectorProgress, [0.88, 0.92], [0, 1]);

  const chips = [
    { color: "#cd7f32", icon: "⚙" },
    { color: "#c0c8d0", icon: "◆" },
    { color: "#d4af37", icon: "★" },
  ];

  return (
    <motion.g style={{ opacity }}>
      {chips.map((chip, i) => (
        <motion.g
          key={i}
          transform={`translate(${x}, ${y + i * 22})`}
          style={{ scale, transformOrigin: `${x}px ${y + i * 22}px` }}
        >
          <circle r={9} fill={chip.color} />
          <text
            y={3.5}
            fontSize={10}
            textAnchor="middle"
            fill="#0a0a1a"
            fontWeight="bold"
            fontFamily="system-ui"
          >
            {chip.icon}
          </text>
        </motion.g>
      ))}
    </motion.g>
  );
}
```

- [ ] **Step 5: Typecheck**

Run: `cd landing-page && npx tsc --noEmit`
Expected: sem erros novos.

- [ ] **Step 6: Commit**

```bash
cd landing-page && git add src/components/EnterpriseMap/components/
git commit -m "feat(enterprise-map): add Balloon/Trace/Chips primitives"
```

---

## Task 10: Hook `useSectorPhase`

Pega `scrollYProgress` global da seção e devolve um `MotionValue<number>` (0..1) por sala, mapeando o range no scroll global pra range local da sala.

**Files:**
- Create: `landing-page/src/components/EnterpriseMap/hooks/useSectorPhase.ts`

- [ ] **Step 1: Criar `useSectorPhase.ts`**

```ts
// landing-page/src/components/EnterpriseMap/hooks/useSectorPhase.ts
"use client";

import { MotionValue, useTransform } from "framer-motion";

/**
 * Mapeia scrollYProgress global (0..1) para sectorProgress (0..1) de uma sala específica.
 *
 * O scroll global é dividido em N+1 segmentos:
 * - 0..startWindow: idle
 * - startWindow..(startWindow + sectorWindow): sala 1 ativa
 * - ... etc
 *
 * Para 4 salas: cada sala ocupa 22.5% do scroll, com 5% inicial idle e 5% final pra agregado.
 */
export function useSectorPhase(
  scrollYProgress: MotionValue<number>,
  sectorIndex: number,
  totalSectors: number,
): MotionValue<number> {
  const startIdle = 0.05;
  const aggregateWindow = 0.05;
  const sectorWindow = (1 - startIdle - aggregateWindow) / totalSectors;
  const sectorStart = startIdle + sectorIndex * sectorWindow;
  const sectorEnd = sectorStart + sectorWindow;

  return useTransform(
    scrollYProgress,
    [0, sectorStart, sectorEnd, 1],
    [0, 0, 1, 1],
    { clamp: true },
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `cd landing-page && npx tsc --noEmit`
Expected: sem erros novos.

- [ ] **Step 3: Commit**

```bash
cd landing-page && git add src/components/EnterpriseMap/hooks/useSectorPhase.ts
git commit -m "feat(enterprise-map): add useSectorPhase hook"
```

---

## Task 11: `FloorPlanDesktop`

Monta a planta desktop completa com todas as primitivas + animação.

**Files:**
- Create: `landing-page/src/components/EnterpriseMap/FloorPlanDesktop.tsx`

- [ ] **Step 1: Criar `FloorPlanDesktop.tsx`**

```tsx
// landing-page/src/components/EnterpriseMap/FloorPlanDesktop.tsx
"use client";

import { MotionValue } from "framer-motion";
import { sectors } from "./data";
import {
  DESKTOP_OUTER_WALL_PATH,
  DESKTOP_CORRIDOR,
  DESKTOP_RECEPTION,
  DESKTOP_ENTRANCE,
} from "./geometry.desktop";
import { Room } from "./components/Room";
import { ContainerBalloon } from "./components/ContainerBalloon";
import { Trace } from "./components/Trace";
import { ChipsCluster } from "./components/ChipsCluster";
import { DoorArc, computeHinge } from "./components/DoorArc";
import { useSectorPhase } from "./hooks/useSectorPhase";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  scrollYProgress: MotionValue<number>;
}

// Extended viewBox to fit containers outside the floor plan outline
const VIEWBOX = "-340 -40 920 380";

export function FloorPlanDesktop({ scrollYProgress }: Props) {
  const { t } = useLanguage();

  return (
    <svg viewBox={VIEWBOX} className="w-full h-auto" aria-hidden="true">
      <defs>
        <pattern id="ent-dotgrid-d" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.4" fill="#cbd5e1" opacity={0.10} />
        </pattern>
      </defs>

      {/* Background grid (only inside floor plan outline) */}
      <path d={DESKTOP_OUTER_WALL_PATH} fill="url(#ent-dotgrid-d)" />

      {/* Reception */}
      <rect
        x={DESKTOP_RECEPTION.x}
        y={DESKTOP_RECEPTION.y}
        width={DESKTOP_RECEPTION.w}
        height={DESKTOP_RECEPTION.h}
        fill="rgba(148,163,184,0.06)"
        stroke="#94a3b8"
        strokeWidth={1}
        strokeDasharray="2 2"
      />
      <text
        x={DESKTOP_RECEPTION.x + DESKTOP_RECEPTION.w / 2}
        y={DESKTOP_RECEPTION.y + DESKTOP_RECEPTION.h / 2 + 2}
        textAnchor="middle"
        fontSize={5}
        fill="#94a3b8"
        opacity={0.7}
        fontFamily="system-ui"
      >
        RECEPÇÃO
      </text>

      {/* Corridor T-shape */}
      <rect
        x={DESKTOP_CORRIDOR.horizontal.x}
        y={DESKTOP_CORRIDOR.horizontal.y}
        width={DESKTOP_CORRIDOR.horizontal.w}
        height={DESKTOP_CORRIDOR.horizontal.h}
        fill="rgba(148,163,184,0.10)"
        stroke="#94a3b8"
        strokeWidth={0.5}
        strokeDasharray="2 2"
      />
      <rect
        x={DESKTOP_CORRIDOR.verticalEntry.x}
        y={DESKTOP_CORRIDOR.verticalEntry.y}
        width={DESKTOP_CORRIDOR.verticalEntry.w}
        height={DESKTOP_CORRIDOR.verticalEntry.h}
        fill="rgba(148,163,184,0.10)"
        stroke="#94a3b8"
        strokeWidth={0.5}
        strokeDasharray="2 2"
      />

      {/* Outer wall (above corridor/reception so wall is on top) */}
      <path d={DESKTOP_OUTER_WALL_PATH} fill="none" stroke="#cbd5e1" strokeWidth={2.5} />

      {/* Building entrance (top of vertical corridor) — green arc */}
      <line
        x1={DESKTOP_ENTRANCE.x}
        y1={15}
        x2={DESKTOP_ENTRANCE.x + DESKTOP_ENTRANCE.width}
        y2={15}
        stroke="#0a0a1a"
        strokeWidth={3}
      />
      <path
        d={`M ${DESKTOP_ENTRANCE.x + DESKTOP_ENTRANCE.width} 15 A 8 8 0 0 1 ${DESKTOP_ENTRANCE.x} 23`}
        fill="none"
        stroke="#22c55e"
        strokeWidth={1.2}
      />

      {/* Per-sector rendering */}
      {sectors.slice(0, 4).map((sector, i) => {
        const sectorProgress = useSectorPhase(scrollYProgress, i, 4);
        const door = computeHinge(sector.geometry.desktopRect, sector.geometry.desktopDoor.wall, sector.geometry.desktopDoor.offset);
        const tracePath = sector.geometry.desktopTracePath;
        // Start point = first M coords from path
        const matchStart = tracePath.match(/^M\s+([-\d.]+)\s+([-\d.]+)/);
        const startPoint: [number, number] = matchStart
          ? [parseFloat(matchStart[1]), parseFloat(matchStart[2])]
          : [0, 0];
        // End point = last L coords from path
        const matchEnd = [...tracePath.matchAll(/L\s+([-\d.]+)\s+([-\d.]+)/g)].pop();
        const endPoint: [number, number] = matchEnd
          ? [parseFloat(matchEnd[1]), parseFloat(matchEnd[2])]
          : startPoint;

        return (
          <g key={sector.id}>
            <Room
              rect={sector.geometry.desktopRect}
              center={sector.geometry.desktopCenter}
              namePt={sector.namePt}
              nameEn={sector.nameEn}
              icon={sector.icon}
              sectorProgress={sectorProgress}
              t={t}
            />
            <DoorArc
              hingeX={door.hingeX}
              hingeY={door.hingeY}
              wall={sector.geometry.desktopDoor.wall}
              doorWidth={12}
              bgColor="#0a0a1a"
            />
            <Trace
              d={tracePath}
              vias={sector.geometry.desktopTraceVias}
              startPoint={startPoint}
              endPoint={endPoint}
              sectorProgress={sectorProgress}
            />
            <ContainerBalloon
              sector={sector}
              x={sector.geometry.desktopContainerPos[0]}
              y={sector.geometry.desktopContainerPos[1]}
              sectorProgress={sectorProgress}
              t={t}
            />
            <ChipsCluster
              x={sector.geometry.desktopChipsPos[0]}
              y={sector.geometry.desktopChipsPos[1]}
              sectorProgress={sectorProgress}
            />
          </g>
        );
      })}
    </svg>
  );
}
```

**Note:** o `useSectorPhase` é chamado dentro de `.map()` — isso viola a regra "hooks no top level". Pra resolver, refatorar pra um sub-componente `<SectorRender>` que receba `sectorIndex` por prop.

- [ ] **Step 2: Refatorar pra `<SectorRender>` (corrige hook rule)**

Substituir o `.map()` por um sub-componente. Ao final do arquivo, adicionar:

```tsx
function SectorRender({
  sector,
  sectorIndex,
  scrollYProgress,
  t,
}: {
  sector: typeof sectors[number];
  sectorIndex: number;
  scrollYProgress: MotionValue<number>;
  t: (pt: string, en: string) => string;
}) {
  const sectorProgress = useSectorPhase(scrollYProgress, sectorIndex, 4);
  const door = computeHinge(
    sector.geometry.desktopRect,
    sector.geometry.desktopDoor.wall,
    sector.geometry.desktopDoor.offset,
  );
  const tracePath = sector.geometry.desktopTracePath;
  const matchStart = tracePath.match(/^M\s+([-\d.]+)\s+([-\d.]+)/);
  const startPoint: [number, number] = matchStart
    ? [parseFloat(matchStart[1]), parseFloat(matchStart[2])]
    : [0, 0];
  const matchEnd = [...tracePath.matchAll(/L\s+([-\d.]+)\s+([-\d.]+)/g)].pop();
  const endPoint: [number, number] = matchEnd
    ? [parseFloat(matchEnd[1]), parseFloat(matchEnd[2])]
    : startPoint;

  return (
    <g>
      <Room
        rect={sector.geometry.desktopRect}
        center={sector.geometry.desktopCenter}
        namePt={sector.namePt}
        nameEn={sector.nameEn}
        icon={sector.icon}
        sectorProgress={sectorProgress}
        t={t}
      />
      <DoorArc
        hingeX={door.hingeX}
        hingeY={door.hingeY}
        wall={sector.geometry.desktopDoor.wall}
        doorWidth={12}
        bgColor="#0a0a1a"
      />
      <Trace
        d={tracePath}
        vias={sector.geometry.desktopTraceVias}
        startPoint={startPoint}
        endPoint={endPoint}
        sectorProgress={sectorProgress}
      />
      <ContainerBalloon
        sector={sector}
        x={sector.geometry.desktopContainerPos[0]}
        y={sector.geometry.desktopContainerPos[1]}
        sectorProgress={sectorProgress}
        t={t}
      />
      <ChipsCluster
        x={sector.geometry.desktopChipsPos[0]}
        y={sector.geometry.desktopChipsPos[1]}
        sectorProgress={sectorProgress}
      />
    </g>
  );
}
```

E substituir o bloco `{sectors.slice(0, 4).map((sector, i) => { ... })}` por:

```tsx
{sectors.slice(0, 4).map((sector, i) => (
  <SectorRender
    key={sector.id}
    sector={sector}
    sectorIndex={i}
    scrollYProgress={scrollYProgress}
    t={t}
  />
))}
```

Remover o bloco original com o `useSectorPhase` dentro do map.

- [ ] **Step 3: Typecheck**

Run: `cd landing-page && npx tsc --noEmit`
Expected: sem erros.

- [ ] **Step 4: Commit**

```bash
cd landing-page && git add src/components/EnterpriseMap/FloorPlanDesktop.tsx
git commit -m "feat(enterprise-map): add FloorPlanDesktop with scroll-driven animation"
```

---

## Task 12: `FloorPlanMobile`

Análogo ao desktop mas com geometria mobile e viewBox vertical.

**Files:**
- Create: `landing-page/src/components/EnterpriseMap/FloorPlanMobile.tsx`

- [ ] **Step 1: Criar `FloorPlanMobile.tsx`**

```tsx
// landing-page/src/components/EnterpriseMap/FloorPlanMobile.tsx
"use client";

import { MotionValue } from "framer-motion";
import { sectors } from "./data";
import { MOBILE_OUTER_WALL_PATH, MOBILE_RECEPTION, MOBILE_ENTRANCE } from "./geometry.mobile";
import { Room } from "./components/Room";
import { ContainerBalloon } from "./components/ContainerBalloon";
import { Trace } from "./components/Trace";
import { ChipsCluster } from "./components/ChipsCluster";
import { DoorArc, computeHinge } from "./components/DoorArc";
import { useSectorPhase } from "./hooks/useSectorPhase";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  scrollYProgress: MotionValue<number>;
}

const VIEWBOX_MOBILE = "-30 0 540 320";

export function FloorPlanMobile({ scrollYProgress }: Props) {
  const { t } = useLanguage();

  return (
    <svg viewBox={VIEWBOX_MOBILE} className="w-full h-auto" aria-hidden="true">
      <defs>
        <pattern id="ent-dotgrid-m" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.3" fill="#cbd5e1" opacity={0.10} />
        </pattern>
      </defs>

      <path d={MOBILE_OUTER_WALL_PATH} fill="url(#ent-dotgrid-m)" />

      {/* Reception */}
      <rect
        x={MOBILE_RECEPTION.x}
        y={MOBILE_RECEPTION.y}
        width={MOBILE_RECEPTION.w}
        height={MOBILE_RECEPTION.h}
        fill="rgba(148,163,184,0.06)"
        stroke="#94a3b8"
        strokeWidth={0.8}
        strokeDasharray="2 2"
      />
      <text
        x={MOBILE_RECEPTION.x + MOBILE_RECEPTION.w / 2}
        y={MOBILE_RECEPTION.y + MOBILE_RECEPTION.h / 2 + 2}
        textAnchor="middle"
        fontSize={6}
        fill="#94a3b8"
        opacity={0.7}
        fontFamily="system-ui"
      >
        RECEPÇÃO
      </text>

      <path d={MOBILE_OUTER_WALL_PATH} fill="none" stroke="#cbd5e1" strokeWidth={2} />

      {/* Entrance */}
      <line x1={MOBILE_ENTRANCE.x} y1={10} x2={MOBILE_ENTRANCE.x + MOBILE_ENTRANCE.width} y2={10} stroke="#0a0a1a" strokeWidth={2.5} />
      <path
        d={`M ${MOBILE_ENTRANCE.x + MOBILE_ENTRANCE.width} 10 A 8 8 0 0 1 ${MOBILE_ENTRANCE.x} 18`}
        fill="none"
        stroke="#22c55e"
        strokeWidth={1}
      />

      {sectors.slice(0, 4).map((sector, i) => (
        <SectorRender
          key={sector.id}
          sector={sector}
          sectorIndex={i}
          scrollYProgress={scrollYProgress}
          t={t}
        />
      ))}
    </svg>
  );
}

function SectorRender({
  sector,
  sectorIndex,
  scrollYProgress,
  t,
}: {
  sector: typeof sectors[number];
  sectorIndex: number;
  scrollYProgress: MotionValue<number>;
  t: (pt: string, en: string) => string;
}) {
  const sectorProgress = useSectorPhase(scrollYProgress, sectorIndex, 4);
  const door = computeHinge(
    sector.geometry.mobileRect,
    sector.geometry.mobileDoor.wall,
    sector.geometry.mobileDoor.offset,
  );
  const tracePath = sector.geometry.mobileTracePath;
  const matchStart = tracePath.match(/^M\s+([-\d.]+)\s+([-\d.]+)/);
  const startPoint: [number, number] = matchStart
    ? [parseFloat(matchStart[1]), parseFloat(matchStart[2])]
    : [0, 0];
  const matchEnd = [...tracePath.matchAll(/L\s+([-\d.]+)\s+([-\d.]+)/g)].pop();
  const endPoint: [number, number] = matchEnd
    ? [parseFloat(matchEnd[1]), parseFloat(matchEnd[2])]
    : startPoint;

  return (
    <g>
      <Room
        rect={sector.geometry.mobileRect}
        center={sector.geometry.mobileCenter}
        namePt={sector.namePt}
        nameEn={sector.nameEn}
        icon={sector.icon}
        sectorProgress={sectorProgress}
        t={t}
      />
      <DoorArc
        hingeX={door.hingeX}
        hingeY={door.hingeY}
        wall={sector.geometry.mobileDoor.wall}
        doorWidth={10}
        bgColor="#0a0a1a"
      />
      <Trace
        d={tracePath}
        vias={sector.geometry.mobileTraceVias}
        startPoint={startPoint}
        endPoint={endPoint}
        sectorProgress={sectorProgress}
      />
      <ContainerBalloon
        sector={sector}
        x={sector.geometry.mobileContainerPos[0]}
        y={sector.geometry.mobileContainerPos[1]}
        sectorProgress={sectorProgress}
        t={t}
      />
      <ChipsCluster
        x={sector.geometry.mobileChipsPos[0]}
        y={sector.geometry.mobileChipsPos[1]}
        sectorProgress={sectorProgress}
      />
    </g>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `cd landing-page && npx tsc --noEmit`
Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
cd landing-page && git add src/components/EnterpriseMap/FloorPlanMobile.tsx
git commit -m "feat(enterprise-map): add FloorPlanMobile vertical layout"
```

---

## Task 13: `AggregateCard`

Card consolidado final que aparece após o scroll passar das 4 salas.

**Files:**
- Create: `landing-page/src/components/EnterpriseMap/AggregateCard.tsx`

- [ ] **Step 1: Criar `AggregateCard.tsx`**

```tsx
// landing-page/src/components/EnterpriseMap/AggregateCard.tsx
"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  scrollYProgress: MotionValue<number>;
}

export function AggregateCard({ scrollYProgress }: Props) {
  const { t } = useLanguage();
  const opacity = useTransform(scrollYProgress, [0.92, 0.98], [0, 1]);
  const y = useTransform(scrollYProgress, [0.92, 0.98], [20, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="mt-12 max-w-6xl mx-auto flex flex-col md:flex-row items-stretch gap-6 glass rounded-[2.5rem] p-8 md:p-10 border-success/30"
    >
      <div className="flex-1 flex flex-col justify-center gap-2">
        <span className="text-xs font-black uppercase tracking-[0.4em] text-success/80">
          {t("Impacto Total Estimado", "Total Estimated Impact")}
        </span>
        <div className="text-4xl md:text-6xl font-black text-success tracking-tighter">
          +R$ 287.500
          <span className="text-lg md:text-2xl opacity-60 font-medium">/mês</span>
        </div>
        <span className="text-xs text-muted/80">
          {t("4 setores · 12 automações · ROI em 6 meses", "4 sectors · 12 automations · 6mo ROI")}
        </span>
      </div>

      <div className="hidden md:block w-px bg-white/10 self-stretch" />

      <div className="flex-1 flex flex-col gap-3 justify-center">
        <span className="text-xs uppercase tracking-widest text-muted">{t("Distribuição por camada", "Layer breakdown")}</span>
        <div className="space-y-2">
          <LayerBar label={t("Operacional", "Operational")} pct={40} color="var(--color-bronze)" />
          <LayerBar label={t("Tático", "Tactical")} pct={35} color="var(--color-silver)" />
          <LayerBar label={t("Estratégico", "Strategic")} pct={25} color="var(--color-gold)" />
        </div>
      </div>

      <div className="hidden md:block w-px bg-white/10 self-stretch" />

      <div className="flex flex-col items-center justify-center gap-3">
        <a
          href="#cta"
          className="px-6 py-3 rounded-full bg-success text-background font-bold text-sm hover:scale-105 transition-transform inline-flex items-center gap-2"
        >
          <TrendingUp size={16} />
          {t("Quero esse mapa", "Get this map")}
        </a>
      </div>
    </motion.div>
  );
}

function LayerBar({ label, pct, color }: { label: string; pct: number; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-muted w-20 shrink-0">{label}</span>
      <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
        <div className="h-full" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <span className="text-xs font-bold w-10 text-right" style={{ color }}>{pct}%</span>
    </div>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `cd landing-page && npx tsc --noEmit`
Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
cd landing-page && git add src/components/EnterpriseMap/AggregateCard.tsx
git commit -m "feat(enterprise-map): add AggregateCard with layer breakdown"
```

---

## Task 14: Orquestrador `index.tsx` final

Substitui o placeholder pelo orquestrador real: `useScroll`, sticky wrapper, switch desktop/mobile, header da seção, AggregateCard.

**Files:**
- Modify: `landing-page/src/components/EnterpriseMap/index.tsx`

- [ ] **Step 1: Substituir o conteúdo de `index.tsx`**

```tsx
// landing-page/src/components/EnterpriseMap/index.tsx
"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { FloorPlanDesktop } from "./FloorPlanDesktop";
import { FloorPlanMobile } from "./FloorPlanMobile";
import { AggregateCard } from "./AggregateCard";

export default function EnterpriseMap() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      aria-label="Mapa de impacto da automação por setor"
      id="enterprise-map"
      className="relative bg-background border-t border-white/5"
      style={{ minHeight: "250vh" }}
    >
      {/* Sticky inner that holds the SVG fixed in viewport */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-start py-12 px-4 overflow-hidden">
        <div className="text-center mb-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20"
          >
            <span className="text-xs font-bold uppercase text-accent tracking-widest">
              {t("Oportunidades de Impacto", "Impact Opportunities")}
            </span>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-black mb-3 tracking-tight">
            {t("Onde o Dinheiro Está na Mesa", "Where the Money is on the Table")}
          </h2>
          <p className="text-muted max-w-2xl mx-auto text-base font-medium opacity-80">
            {t(
              "Role pra ver onde a IA gera ROI real em cada setor — em 3 camadas.",
              "Scroll to see where AI generates real ROI per sector — across 3 layers.",
            )}
          </p>
        </div>

        <div className="w-full max-w-6xl flex-1 flex items-center justify-center">
          <div className="hidden lg:block w-full">
            <FloorPlanDesktop scrollYProgress={scrollYProgress} />
          </div>
          <div className="lg:hidden w-full">
            <FloorPlanMobile scrollYProgress={scrollYProgress} />
          </div>
        </div>
      </div>

      {/* Aggregate card (renders after sticky scroll completes) */}
      <div className="relative -mt-32 max-w-7xl mx-auto px-4 pb-24">
        <AggregateCard scrollYProgress={scrollYProgress} />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `cd landing-page && npx tsc --noEmit`
Expected: sem erros.

- [ ] **Step 3: Build**

Run: `cd landing-page && npm run build`
Expected: build completa sem erros.

- [ ] **Step 4: Lint**

Run: `cd landing-page && npm run lint`
Expected: sem erros novos. Warnings são aceitáveis.

- [ ] **Step 5: Commit**

```bash
cd landing-page && git add src/components/EnterpriseMap/index.tsx
git commit -m "feat(enterprise-map): wire up orchestrator with useScroll and layout switch"
```

---

## Task 15: Cleanup do componente legado

Remove o arquivo `EnterpriseMap.legacy.tsx` agora que o novo está em produção.

**Files:**
- Delete: `landing-page/src/components/EnterpriseMap.legacy.tsx`

- [ ] **Step 1: Confirmar visualmente que o novo componente funciona**

Run: `cd landing-page && npm run dev`
Abrir `http://localhost:3000`. Rolar até a seção "Onde o Dinheiro Está na Mesa". Confirmar:
- Ao iniciar a seção (sticky começa): 4 salas vermelhas visíveis
- Conforme rola: cada sala vira verde uma de cada vez, container balloon aparece, trace draws, 3 sub-balões cascadeiam, container colapsa em chips
- Ao final: 4 salas verdes, 12 chips visíveis (3 por sala), AggregateCard aparece
- Scroll backwards: animação reverte limpa
- Em mobile (resize a janela <1024px): layout vertical aparece

Anotar **defeitos visuais** (overlaps, posições erradas) — esses são endereçados na Task 16 (validação ajuste fino).

- [ ] **Step 2: Deletar o legado**

Run: `cd landing-page && rm src/components/EnterpriseMap.legacy.tsx`

- [ ] **Step 3: Build + lint**

Run: `cd landing-page && npm run build && npm run lint`
Expected: ambos sem erros.

- [ ] **Step 4: Commit**

```bash
cd landing-page && git add -A
git commit -m "chore(enterprise-map): remove legacy component"
```

---

## Task 16: Validação visual + ajustes finais de geometria

Sessão dedicada a validar visualmente a planta no browser e ajustar coordenadas em `geometry.desktop.ts` / `geometry.mobile.ts` baseado no que aparece em tela. As coordenadas iniciais são "best-guess" — esperar 1-3 ciclos de ajuste.

**Files:**
- Modify: `landing-page/src/components/EnterpriseMap/geometry.desktop.ts` (provavelmente)
- Modify: `landing-page/src/components/EnterpriseMap/geometry.mobile.ts` (provavelmente)

- [ ] **Step 1: Servir o dev server e abrir DevTools**

Run: `cd landing-page && npm run dev` (em segundo plano se ainda não rodando).
Abrir `http://localhost:3000` no Chrome. Abrir DevTools (F12). Ativar device toolbar (Ctrl+Shift+M) pra alternar entre desktop e mobile.

- [ ] **Step 2: Checklist visual desktop (≥1024px)**

Verificar e anotar problemas:
- [ ] Outline L-shape visível e proporcional
- [ ] 4 salas (Marketing, Vendas, Atendimento, Finanças) bem distribuídas
- [ ] Recepção (canto inferior direito da L) visível em cinza
- [ ] Corredor T-shape com label "CIRCULAÇÃO"
- [ ] Entrada principal (arco verde) no topo
- [ ] Cada sala tem porta com swing pra dentro (arco bulga pra dentro)
- [ ] Cada sala tem ícone lucide pequeno no canto
- [ ] Containers balão posicionados sem sobrepor uns aos outros
- [ ] Containers ficam fora da viewBox da planta (próprio canvas estendido)
- [ ] Traces PCB conectam corretamente sala→container
- [ ] Vias visíveis nas dobras
- [ ] Solder pads nas pontas
- [ ] Ao rolar, sequência de fases acontece como esperado

- [ ] **Step 3: Checklist visual mobile (<1024px)**

- [ ] Layout vertical, planta L portrait
- [ ] Recepção no topo (com label)
- [ ] 4 salas empilhadas verticalmente
- [ ] Cada sala tem porta lateral (parede leste) com swing pra dentro
- [ ] Containers balão à direita de cada sala
- [ ] Trace conecta corretamente
- [ ] Em mobile real (testar em Chrome DevTools usando "iPhone 14"), rolagem mantém sticky e dispara animação

- [ ] **Step 4: Ajustar coordenadas conforme defeitos encontrados**

Para cada defeito, editar a entrada relevante em `geometry.desktop.ts` ou `geometry.mobile.ts`. Re-checar no browser (hot reload). Repetir até ficar visualmente correto.

Padrões comuns de ajuste:
- Container sobrepõe a próxima sala → mover `containerPos[1]` (Y) pra baixo ou pra cima
- Trace cruza paredes em ângulo errado → reescrever `tracePath` com mais bends
- Chips ficam dentro da sala → mover `chipsPos` mais pra fora
- Porta arc do lado errado → checar `wall` e `offset`

- [ ] **Step 5: Commit final**

Após validação visual aprovada:

```bash
cd landing-page && git add -A
git commit -m "fix(enterprise-map): tune geometry coordinates after visual review"
```

---

## Task 17: Reduced motion + acessibilidade

Acrescenta fallback pra `prefers-reduced-motion` e melhora aria-labels dinâmicos.

**Files:**
- Modify: `landing-page/src/components/EnterpriseMap/index.tsx`
- Modify: `landing-page/src/components/EnterpriseMap/components/Room.tsx`

- [ ] **Step 1: Adicionar detecção de reduced motion no `index.tsx`**

No início do componente `EnterpriseMap` (após hooks existentes), adicionar:

```tsx
import { useReducedMotion } from "framer-motion";
// ...
const prefersReducedMotion = useReducedMotion();
```

Renderizar conteúdo simplificado se `prefersReducedMotion === true`. Substituir o JSX retornado por:

```tsx
if (prefersReducedMotion) {
  return (
    <section
      aria-label="Mapa de impacto da automação por setor"
      id="enterprise-map"
      className="relative bg-background border-t border-white/5 py-24 px-4"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header igual ao original */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black mb-3 tracking-tight">
            {t("Onde o Dinheiro Está na Mesa", "Where the Money is on the Table")}
          </h2>
          <p className="text-muted max-w-2xl mx-auto text-base font-medium opacity-80">
            {t(
              "ROI estimado em 4 setores, 3 camadas cada.",
              "Estimated ROI across 4 sectors, 3 layers each.",
            )}
          </p>
        </div>
        {/* Lista textual estática, sem animação */}
        <div className="grid md:grid-cols-2 gap-6">
          {sectors.slice(0, 4).map((sector) => (
            <div key={sector.id} className="glass rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold mb-4">{t(sector.namePt, sector.nameEn)}</h3>
              <ul className="space-y-3 text-sm">
                {(["op", "tat", "est"] as const).map((k) => {
                  const layer = sector.layers[k];
                  return (
                    <li key={k} className="flex items-baseline gap-3">
                      <span className="text-xs uppercase tracking-widest opacity-60 w-24 shrink-0">
                        {LAYER_STYLE[layer.key].label}
                      </span>
                      <span className="flex-1 text-muted">{t(layer.descPt, layer.descEn)}</span>
                      <span className="text-success font-bold">{t(layer.resultPt, layer.resultEn)}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <AggregateCard scrollYProgress={scrollYProgress} />
      </div>
    </section>
  );
}
```

E adicionar imports:

```tsx
import { sectors, LAYER_STYLE } from "./data";
```

- [ ] **Step 2: Adicionar `aria-label` dinâmico em `Room.tsx`**

Após a definição dos `useTransform`, criar uma string descritiva. Não dá pra animar `aria-label` com motion, então usamos um label estático "automatizada" que é correto após sequência iniciar:

No JSX do `Room.tsx`, envolver o `<g>` raiz com `role="img"` e `aria-label`:

```tsx
return (
  <g role="img" aria-label={`${t(namePt, nameEn)} — ${t("setor com 3 camadas de automação IA", "sector with 3 layers of AI automation")}`}>
    {/* ... */}
  </g>
);
```

- [ ] **Step 3: Testar reduced motion**

No DevTools do Chrome: `Rendering` tab → `Emulate CSS media feature prefers-reduced-motion: reduce`.
Verificar que a página exibe a versão estática (cards listados) sem animação.

- [ ] **Step 4: Build + lint**

Run: `cd landing-page && npm run build && npm run lint`
Expected: sem erros.

- [ ] **Step 5: Commit**

```bash
cd landing-page && git add -A
git commit -m "feat(enterprise-map): add reduced-motion fallback and aria-labels"
```

---

## Task 18: Conferência final

Última passada de QA antes de declarar pronto.

- [ ] **Step 1: Build production**

Run: `cd landing-page && npm run build`
Expected: build sem erros, sem warnings novos.

- [ ] **Step 2: Lint zero erros**

Run: `cd landing-page && npm run lint`
Expected: sem erros novos.

- [ ] **Step 3: Manual smoke test em desktop**

Abrir `http://localhost:3000` em Chrome desktop:
- Rolar até a seção
- Confirmar: 4 salas vermelhas → uma a uma vira verde com container/balões/chips
- Final: 4 salas verdes + 12 chips + AggregateCard
- Scroll backwards reverte limpo

- [ ] **Step 4: Manual smoke test em mobile**

DevTools → device toolbar → "iPhone 14":
- Rolar até a seção
- Confirmar layout vertical funciona
- Animação dispara
- Não há overflow horizontal
- AggregateCard renderiza após a planta

- [ ] **Step 5: Reduced motion test**

DevTools → Rendering → `prefers-reduced-motion: reduce`:
- Página mostra versão estática com cards listados
- Sem animação visível

- [ ] **Step 6: Final commit (se houver mudanças residuais)**

```bash
cd landing-page && git status
```

Se houver mudanças não commitadas, criar commit final:

```bash
cd landing-page && git add -A && git commit -m "chore(enterprise-map): final tuning"
```

---

## Self-review

**Spec coverage:** ✓ Todos os pontos do spec estão cobertos
- §2 Arquitetura → Tasks 1, 2, 14, 15
- §3 Cores → Task 3 (tokens já em globals.css), Tasks 7, 9 (uso)
- §4 Layout → Tasks 5, 6, 11, 12 (geometrias e renderização)
- §5 Modelo de dados → Tasks 3, 4
- §6 Coreografia → Tasks 7-12 (animações por componente)
- §7 AggregateCard → Task 13
- §8 Responsividade → Tasks 11, 12, 14
- §9 Acessibilidade → Task 17
- §10 Edge cases → Tasks 14 (sticky), 17 (reduced motion)
- §11 Resumo de mudanças → Tasks 1, 2, 14, 15

**Placeholder scan:** Nenhum "TBD" / "implementar depois". Conteúdo do spec §5.3 é placeholder explícito por design (usuário vai refinar copy depois) — Task 4 inclui o conteúdo completo.

**Type consistency:** `Sector`, `Layer`, `RoomGeometry`, `LayerKey` definidos em Task 3, usados consistentemente nas Tasks 4-14. `LAYER_STYLE` referenciado em Tasks 9, 17. `useSectorPhase` (Task 10) usado em Tasks 11, 12.

**Outras observações:**
- Tasks 5, 6, 11, 12 contêm coordenadas que são "best-guess" iniciais. Task 16 é dedicada a ajuste fino visual — esperar 1-3 ciclos.
- Sem framework de testes — verificação primária é visual + typecheck/build/lint. Documentado no header.
