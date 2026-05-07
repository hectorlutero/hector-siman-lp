# EnterpriseMap — Floor plan animado scroll-driven

**Data:** 2026-05-07
**Status:** Design aprovado · aguarda plano de implementação
**Substitui:** `landing-page/src/components/EnterpriseMap.tsx` atual

---

## 1. Objetivo

Reescrever o componente `EnterpriseMap` como uma planta arquitetônica animada que demonstra o impacto da IA em 3 camadas (operacional, tático, estratégico) por setor da empresa. A construção é progressiva e disparada pelo scroll do usuário.

A seção precisa comunicar três coisas:
1. Toda empresa tem **três camadas** de impacto da IA — não é taxonomia "setor X é estratégico"
2. Cada setor passa por uma **transformação** (vermelho → verde) com 3 ganhos concretos
3. O conjunto representa um **portfólio de impacto** com ROI mensurável

## 2. Arquitetura

### 2.1 Substituição do componente

O `landing-page/src/components/EnterpriseMap.tsx` atual (single-file ~300 linhas) é deletado. No lugar entra a pasta `landing-page/src/components/EnterpriseMap/` com responsabilidades isoladas:

```
src/components/EnterpriseMap/
├── index.tsx                 # orquestrador: useScroll + layout switch desktop/mobile
├── data.ts                   # array de setores + 3 camadas cada (i18n inline)
├── geometry.desktop.ts       # polígonos retilíneos + anchors desktop (L-shape F1, U-shape F2)
├── geometry.mobile.ts        # polígonos + anchors mobile (L vertical)
├── FloorPlanDesktop.tsx      # SVG desktop com salas, corredor, portas
├── FloorPlanMobile.tsx       # SVG mobile com layout vertical
├── components/
│   ├── Room.tsx              # polígono + label + ícone + state machine de cor
│   ├── ContainerBalloon.tsx  # balão container + 3 sub-balões + PCB trace
│   ├── SubBalloon.tsx        # 1 sub-balão (bronze/silver/gold)
│   ├── DoorArc.tsx           # primitivo arc + slab com swing pra dentro
│   ├── Trace.tsx             # PCB trace com vias e solder pads
│   ├── ChipsCluster.tsx      # 3 chips colapsados ao lado de sala concluída
│   └── AggregateCard.tsx     # card consolidado final
└── hooks/
    ├── useSectorPhase.ts     # mapeia scrollYProgress → fase ativa por sala
    └── useReducedMotionFallback.ts # detecta + retorna estado final estático
```

`landing-page/src/app/page.tsx` segue importando `from "@/components/EnterpriseMap"` (folder com `index.tsx`) — sem mudança no consumer.

### 2.2 Tecnologia

- **SVG inline** gerado por React
- **`framer-motion`** já no projeto: `useScroll` + `useTransform` para mapeamento progresso → fase
- **CSS animations** nas primitivas SVG (fade/slide internos) seguindo padrão triple-nested groups
- **i18n** mantém o `LanguageContext` existente com `t(pt, en)`
- **"use client"** já presente no componente original — mantido

### 2.3 Conformidade Next.js

Per [`landing-page/AGENTS.md`](../../../AGENTS.md): essa versão do Next.js tem breaking changes. Antes de tocar APIs do Next durante implementação, ler `node_modules/next/dist/docs/`. Especialmente relevante: comportamento de `"use client"`, hidratação de elementos SVG, e tree-shaking de framer-motion.

## 3. Modelo de cores

### 3.1 Camadas (bronze/silver/gold)
Tokens em `landing-page/src/app/globals.css` (já adicionados):

```css
--color-bronze: #cd7f32;        /* OPERACIONAL */
--color-bronze-light: #e89758;
--color-silver: #c0c8d0;        /* TÁTICO */
--color-silver-light: #e2e8f0;
--color-gold: #d4af37;          /* ESTRATÉGICO */
--color-gold-light: #f5cc4d;
```

**Regra absoluta** (memória do projeto): cada setor tem as 3 camadas. Não classificar setor → camada.

### 3.2 Estados das salas
- **Vermelho** (`#ef4444`, `--color-danger` do projeto): sem automação. Estado inicial.
- **Verde** (`#22c55e`, `--color-success`): após primeira camada aplicada. Sala fica verde permanentemente após sequência iniciar.

### 3.3 Resultado monetário/tempo
**Sempre verde** (`--color-success`), independente da camada do balão. Posicionado bottom-right de cada sub-balão, fonte ~20px font-weight bold.

### 3.4 Strokes neutros
Paredes externas, janelas, portas e bordas técnicas: **slate-300** (`#cbd5e1`). Não usar azul.

### 3.5 Conflito com Methodology
`Methodology.tsx` (acima desta seção na page) usa laranja (`--color-warning`) na fase 2. Pra evitar ambiguidade visual com o vermelho inicial das salas:
- Vermelho da sala em repouso usa hatching diagonal sutil (pattern SVG)
- Saturação ~60% via `filter`
- Diferencia claramente do laranja vivo do Methodology

## 4. Layout (planta arquitetônica)

### 4.1 Princípios
- **Polígonos rectilíneos** apenas (todos os ângulos 90°)
- **Outline orgânico** — L-shape (fase 1) ou U-shape (fase 2). Não retângulo simples.
- **Mosaico encaixado** — salas + corredor tilam todo o interior, sem gaps
- **Corredor visível** com label "CIRCULAÇÃO", fundo cinza translúcido, borda tracejada
- **Portas em arco** com swing **pra dentro da sala** (regra arquitetônica firme — ver memória `feedback_door_swing_direction.md`)
- **Janelas** em parede externa: linha dupla paralela
- **Cota arquitetônica** embaixo: linha + texto "22.5m"
- **Grid de pontos** sutil no fundo: pattern slate-300 opacity 0.10

### 4.2 Setores e ordem narrativa

**Fase 1 (4 setores iniciais)** — universais, ROI fácil de comunicar:
1. Marketing
2. Vendas
3. Atendimento
4. Finanças

Ordem segue jornada: lead → conversão → retenção → caixa.

**Fase 2 (8 setores completos, expansão futura)**: adiciona Diretoria, Operações, RH, TI.

### 4.3 Geometria desktop (fase 1) — L-shape

Outline (vértices clockwise):
```
(15,15) → (200,15) → (200,60) → (240,60) → (240,175) → (15,175) → (15,15)
```

Salas (todas rectilíneas):
- **Marketing**: x[15,110] y[15,80], 95×65
- **Vendas**: x[120,200] y[15,80], 80×65
- **Atendimento**: x[15,110] y[93,175], 95×82
- **Finanças**: x[120,240] y[93,175], 120×82 (maior — inclui extensão direita)
- **Recepção** (área de apoio neutra): x[200,240] y[60,83], 40×23

Corredor T-shape:
- Horizontal: x[15,240] y[83,93]
- Vertical (entrada): x[105,115] y[15,83]

Entrada principal: parede norte na vertical do corredor (arco verde, swing pra dentro).

### 4.4 Geometria desktop (fase 2) — U-shape

Outline com átrio central no topo:
```
(15,15) → (75,15) → (75,70) → (245,70) → (245,15) → (305,15) → (305,200) → (15,200) → (15,15)
```

Layout interno:
- 2 alas top (Marketing esquerda · Diretoria direita)
- Átrio/recepção central topo
- 4 salas linha intermediária (Vendas · Atendimento · RH · Finanças)
- 2 salas amplas embaixo (Operações · TI)
- Corredor H-shape

### 4.5 Geometria mobile (todas as fases) — L vertical

Outline portrait com notch:
```
(10,10) → (100,10) → (100,50) → (145,50) → (145,305) → (10,305) → (10,10)
```

Recepção pequena no topo. Salas empilhadas verticalmente full-width abaixo. Corredores horizontais finos entre salas. Janelas em paredes laterais.

**Mobile usa SVG dedicado**, não viewBox espremida do desktop. Componente roteia `<FloorPlanDesktop />` ou `<FloorPlanMobile />` por breakpoint.

## 5. Modelo de dados

### 5.1 Tipos

```ts
import type { LucideIcon } from "lucide-react";

export type LayerKey = "operacional" | "tatico" | "estrategico";

export interface Layer {
  key: LayerKey;
  titlePt: string;          // ex: "Atribuição multi-touch IA"
  titleEn: string;
  descPt: string;           // ≤2 linhas curtas
  descEn: string;
  resultPt: string;         // ex: "-25% CAC" | "+R$ 13.500/mês" | "-3h/dia"
  resultEn: string;
}

export interface RoomGeometry {
  desktopPolygon: Array<[number, number]>;
  mobilePolygon: Array<[number, number]>;
  desktopCenter: [number, number];     // ponto pra labels
  mobileCenter: [number, number];
  desktopContainerPos: [number, number];   // canto sup-esq do container balloon
  mobileContainerPos: [number, number];
  desktopTracePath: string;            // SVG path d-attribute do PCB trace
  mobileTracePath: string;
  desktopChipsPos: [number, number];   // posição dos 3 chips finais
  mobileChipsPos: [number, number];
  desktopDoor: { wall: "n"|"s"|"e"|"w"; offset: number };  // posição da porta na parede
  mobileDoor: { wall: "n"|"s"|"e"|"w"; offset: number };
}

export interface Sector {
  id: "marketing" | "vendas" | "atendimento" | "financas"
     | "diretoria" | "operacoes" | "rh" | "ti";
  namePt: string;
  nameEn: string;
  icon: LucideIcon;
  order: number;            // ordem na sequência scroll (1..N)
  geometry: RoomGeometry;
  layers: { op: Layer; tat: Layer; est: Layer };
}
```

### 5.2 Mapping camada → estilo

```ts
export const LAYER_STYLE: Record<LayerKey, {
  stroke: string; fill: string; headerBg: string; label: string; iconUnicode: string;
}> = {
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

### 5.3 Conteúdo dos 4 setores iniciais (placeholder — usuário valida/ajusta)

| Setor | Operacional | Tático | Estratégico |
|---|---|---|---|
| **Marketing** | Geração e agendamento auto. de SEO **-3h/dia** | Atribuição multi-touch IA cruzando canais **-25% CAC** | Cenários macro & posicionamento **+12% mkt share** |
| **Vendas** | Qualificação leads e resposta 24/7 **+R$ 18k/mês** | Forecasting de pipeline e priorização **+30% conversão** | Identificação de TAM e expansão **+R$ 2M/ano** |
| **Atendimento** | Triagem inicial e respostas auto. **-70% tempo** | Detecção proativa de risco **-15% churn** | Insights de produto via feedback **+R$ 800k/ano** |
| **Finanças** | Conciliação bancária e AP/AR **+R$ 13,5k/mês** | Forecast de fluxo de caixa live **-30% capital giro** | Cenários M&A e alocação **+R$ 2M/ano** |

## 6. Coreografia da animação

### 6.1 Princípio: scroll-driven, não autoplay

`useScroll({ target: containerRef, offset: ["start start", "end end"] })` retorna `scrollYProgress` 0→1. Cada sala tem seu sub-progresso calculado por `useTransform`. Sequência reverte ao scroll backwards.

### 6.2 Estrutura da seção

```tsx
<section ref={containerRef} className="relative min-h-[250vh]">
  <div className="sticky top-0 h-screen flex items-center justify-center">
    {isMobile ? <FloorPlanMobile /> : <FloorPlanDesktop />}
  </div>
  <AggregateCard />
</section>
```

- Wrapper externo define a área de scroll (`min-h-[250vh]`)
- Sticky inner segura o SVG fixo na viewport enquanto o usuário rola
- `AggregateCard` aparece após a planta no scroll progress 0.95+

### 6.3 Mapeamento global progresso → fase

```ts
const phases = useTransform(scrollYProgress,
  [0, 0.05, 0.30, 0.55, 0.80, 0.95, 1],
  [-1, 0, 1, 2, 3, 4, 4]);
// -1 = idle, 0..3 = sala N ativa (índice 0-based), 4 = agregado revelado
```

### 6.4 Sub-progresso por sala

Cada sala recebe `roomProgress: MotionValue<number>` 0→1 derivado do progresso global. Dentro desse 0→1, a sala roda sua sequência:

| Fase local | Range (0–1) | Estado |
|---|---|---|
| 0 | 0–0.05 | idle vermelha |
| 1 | 0.05–0.15 | red→green transition + glow flash + label muda cor |
| 2 | 0.15–0.25 | container balloon fade-in + PCB trace draw + vias |
| 3 | 0.25–0.45 | sub-balão **bronze** (op) slide-in + fade |
| 4 | 0.45–0.65 | sub-balão **silver** (tát) slide-in + fade |
| 5 | 0.65–0.88 | sub-balão **gold** (estr) slide-in + fade · hold |
| 6 | 0.88–1.00 | container colapsa · 3 chips aparecem ao lado da sala |

Após a sala completar, chips persistem até o final da seção (estado de "concluída").

### 6.5 Container balloon

Estrutura visual:
- Outer rect 300×320 (desktop), borda slate-300, fundo `rgba(15,23,42,0.95)`, `rx=14`
- Header strip top: fundo verde sutil 10%, label uppercase letter-spacing 2 ("IMPACTO IA · MARKETING"), círculo verde sólido no canto direito
- Divisor sutil abaixo do header
- 3 sub-balões empilhados verticalmente dentro, 268×78 cada, gap 10px

### 6.6 PCB trace (conector)

- Path com bends em 90° saindo da parede da sala em direção ao container
- `stroke="var(--color-success)"`, `stroke-width=2`, `stroke-linecap="round"`, `stroke-linejoin="miter"`
- Vias: `<circle r=3.5>` com fundo escuro (`#0a0e1a`) e borda verde em cada bend
- Solder pads: `<rect width=8 height=6>` verde sólido nos endpoints (parede da sala + borda do container)
- Animação de "draw": `stroke-dasharray` + `stroke-dashoffset` interpolados
- Linhas de traces de salas distintas **podem se cruzar** (tolerância visual confirmada pelo usuário)

### 6.7 Padrão obrigatório: triple-nested groups

Para cada sub-balão e chip animado:

```tsx
<g transform={`translate(${pos.x}, ${pos.y})`}>     {/* outer: posição SVG, não animada */}
  <motion.g style={{ opacity }}>                    {/* middle: opacity */}
    <motion.g style={{ x: slideX }}>                {/* inner: transform */}
      {/* conteúdo */}
    </motion.g>
  </motion.g>
</g>
```

CSS `transform` em SVG sobrescreve o atributo `transform="..."`. Sem essa separação, balões teleportam pra `(0,0)` ao animar. Documentado em `feedback_svg_animation_patterns.md`.

### 6.8 Door geometry (swing pra dentro)

Componente `DoorArc.tsx`:

```tsx
<DoorArc wall="s" hingeX={180} hingeY={590} doorWidth={30} />
// Renderiza:
// 1. Slab line: from (hingeX, hingeY) to (hingeX+doorWidth, hingeY)  -- na parede sul, slab horizontal
// 2. Wall opening: line cobrindo o vão na parede com cor de fundo
// 3. Arc: do topo do vão fechado até a ponta do slab aberto, sweep flag calculado pra bulgar pra dentro
```

A direção do sweep é função da parede:
- **n** (parede norte): swing pra baixo (sweep flag depende do hinge)
- **s** (sul): swing pra cima
- **e** (leste): swing pra esquerda
- **w** (oeste): swing pra direita

Validação visual: o arco deve sempre bulgar pro lado da sala servida. Documentado em `feedback_door_swing_direction.md`.

## 7. Card agregado final

Aparece em scroll progress 0.95+:

- Glass card largo abaixo da planta
- 3 colunas:
  1. Número grande verde — soma agregada "+R$ XXX.XXX/mês" (mensalizado)
  2. Breakdown visual em 3 barras horizontais (bronze/silver/gold) com proporção do impacto por camada
  3. CTA "Quero esse mapa pra minha empresa" → scroll pra `FinalCTA`
- Animação: `opacity 0→1` + `y 20→0`

## 8. Responsividade

### 8.1 Breakpoints
- Desktop: `lg+` (≥1024px) — `<FloorPlanDesktop />`
- Tablet + mobile: `<lg` — `<FloorPlanMobile />`

Sem layout intermediário pra tablet — não compensa.

### 8.2 Mobile específico
- SVG dedicado vertical (L-shape portrait), salas empilhadas
- Cada sala ocupa ~50vh de scroll
- Container balloon ~280px largura, abaixo ou acima da sala atual
- Linha conectora vertical ao invés de horizontal
- Sticky height = `90vh` (deixa pequeno topo visível pra contexto)

### 8.3 Performance
- Apenas `transform` e `opacity` animados (GPU-accelerated)
- `will-change: transform, opacity` apenas em elementos animados ativos
- Balões fora do viewport: `pointer-events: none`, `visibility: hidden` quando opacity = 0

## 9. Acessibilidade

- `<section aria-label="Mapa de impacto da automação por setor">`
- Cada sala = `<g role="img" aria-label="Marketing — sem automação">` (label dinâmico por estado)
- Região oculta `aria-live="polite"` anuncia transições de fase pra screen readers
- Botão "Pular animação" no canto da seção (scroll direto pro estado final)
- `prefers-reduced-motion: reduce` → componente renderiza estado final estático (todas verdes + chips + agregado), sem qualquer animação

## 10. Edge cases

- **Scroll rápido (skip)**: `useTransform` com `clamp: true` garante que pulando direto pro final mostra estado completo
- **Scroll backwards**: sequência reverte completamente, balões saem na ordem inversa. Estado é função pura de `scrollYProgress` — sem state mutável
- **Resize cruzando 1024px**: componente desmonta/remonta. Reseta animação. Aceitável.
- **SSR**: `"use client"` no `index.tsx`. Hooks de motion só rodam após hidratação.
- **Reduced motion**: detecta + estado final direto

## 11. Resumo de mudanças

| Arquivo | Ação |
|---|---|
| `src/app/globals.css` | ✓ feito (6 tokens bronze/silver/gold) |
| `src/components/EnterpriseMap.tsx` | **deletar** |
| `src/components/EnterpriseMap/` | **criar** com estrutura de seção 2.1 |
| `src/app/page.tsx` | sem alteração (import resolve via `index.tsx`) |
| Memory files | ✓ atualizadas (3 arquivos novos) |

## 12. Referências cruzadas (memórias)

- `project_three_layers_model.md` — modelo de 3 camadas bronze/silver/gold por setor
- `project_methodology_palette.md` — palette do Methodology (não confundir)
- `feedback_door_swing_direction.md` — portas swing pra dentro
- `feedback_svg_animation_patterns.md` — triple-nested groups, container balloon, PCB trace, coreografia 8s

## 13. Não faz parte deste design

- Conteúdo final dos textos dos balões (placeholder na §5.3 — usuário valida/refina)
- Implementação da fase 2 (8 setores) — geometria documentada, mas implementação inicial é só fase 1
- Animações exatas (durations, easing curves específicas) — define-se no plano de implementação
- Card agregado: cálculo do número total mensalizado (depende de validação de conteúdo)
