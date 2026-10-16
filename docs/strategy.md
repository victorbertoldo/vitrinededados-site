# Vitridata website — strategy, structure and design system

## 1. Positioning

**Vitridata is a specialist data architecture boutique.** It designs how a company's data should be modeled and organized, then builds it, so every team, report and AI tool reads the same truth.

- **Tagline:** From data chaos to clarity. / Do caos dos dados à clareza.
- **Brand line kept from Vitrine de Dados:** Transform your `</data>` into insights. / Transforme seus `</dados>` em insights.
- **Lead with architecture and modeling** (dimensional modeling, Data Vault, enterprise data warehousing, lakehouse). AI is present but secondary: "AI can't fix chaos, it needs structure."
- **Voice:** candid, plain, second person, inspired by pliable.co ("Let's be honest…", "We believe…"). Short headlines, one or two sentences under each, no hype.
- **Proof:** senior, architect-led delivery; founder facts; anonymized results from past engagements. No logos, testimonials or invented figures.
- **Audience:** CTOs, heads of data and engineering, data platform leaders in the US and Brazil; US companies hiring an independent data architect.

### Brand continuity

Vitrine de Dados is the original Brazilian brand; Vitridata is the international name. The logo's cube mark, purple-to-coral gradient, black backgrounds, the vertical bar motif and the monospace `</dados>` accent all come from the existing brand. The wordmark "vitrine de dados" sits under "Vitridata" in the header so returning Brazilian visitors recognize the company.

## 2. Sitemap

```
/ (English home, canonical /en/)
├── /en/                 /pt-br/
├── /en/services/        /pt-br/servicos/            #architecture #modeling #engineering #cloud #advisory #ai
├── /en/how-we-work/     /pt-br/como-trabalhamos/
├── /en/expertise/       /pt-br/tecnologias/
├── /en/about/           /pt-br/sobre/
├── /en/contact/         /pt-br/contato/
└── /en/privacy/         /pt-br/privacidade/
```

**Home sections:** hero with architecture diagram → facts → "Sounds familiar?" problems → honest approach with before/after model → modeling techniques (dimensional, Data Vault, lakehouse) → six services → three paths comparison → selected results → five-step process → FAQ → final call to action.

## 3. Design system

| Token | Value | Use |
|---|---|---|
| `--ink` | `#0b0a10` | Dark sections, header, footer |
| `--paper` / `--paper-2` | `#ffffff` / `#f6f4fb` | Light sections |
| `--purple-bright` | `#871cff` | Brand purple, primary buttons |
| `--purple` | `#7a22f0` | Purple text on white (WCAG AA) |
| `--purple-soft` | `#c7a6ff` | Purple text on dark |
| `--coral` | `#f0654a` | Gradient end, accents (not body text on white) |
| `--grad` | purple → magenta → coral | Logo, highlights, bar motif |

- **Type:** Sora (headings, wordmark), Inter (text), JetBrains Mono (eyebrows, code-like labels). Self-hosted.
- **Motifs:** isometric cube mark; vertical gradient bars; diagrams drawn in SVG code (no stock photos).
- **Motion:** gentle reveal on scroll and animated data flow, both disabled with `prefers-reduced-motion`.
- **Accessibility:** skip link, visible focus rings, semantic headings, labeled form fields with live error messages, keyboard-operable menu (Esc closes).

## 4. Business details to confirm before launch

These items come from the company's presentation deck or the current site. They are on the website and should be confirmed:

1. **Email `contato@vitrinededados.com`** (from the deck) is active and monitored. It is the contact form fallback and appears in the footer and privacy policy.
2. **Founder facts:** 14+ years, data architect, graduate professor, instructor (Qlik, Dremio, dbt), 60+ trainings, speaker.
3. **Results:** 70% (AWS → Databricks), 45% cost reduction (AWS), 80% load optimization, 100% lineage (metadata layer), 30-day MDM, 90-day integrated DW.
4. **Technologies** listed on Expertise and Services. From the deck and architecture drawing: Databricks, Snowflake, Dremio, dbt, Qlik, AWS, Airbyte, Meltano, Airflow, Mage, PostgreSQL, Metabase, Grafana, Prometheus, OpenMetadata, Great Expectations, Elementary. From the brief only (please confirm hands-on experience): Apache Iceberg, Apache Kafka, Apache Spark, Azure, Google Cloud.
5. **Address and hours:** Hub Cerrado, Rua do Parque 135, Goiânia; Mon–Fri 9:00–17:00 (from the current site).

Not on the site until confirmed:

- Founder's name, photo and LinkedIn profile.
- Company LinkedIn page.
- Client names or logos (the deck shows some; publishing them needs permission).
- The international partnership mentioned in the deck (US projects via partner firms).
- Brazilian legal name and CNPJ; US entity (Vitridata LLC) details once registered.
- A form delivery service (see README).
