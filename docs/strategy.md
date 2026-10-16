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

## 4. Business details

Confirmed by Victor Bertoldo (2026-10-16):

- Technologies: cloud-agnostic (AWS, Azure, Google Cloud); delivered on Snowflake, Databricks, BigQuery, Redshift, Dremio, Iceberg, Kafka, Spark and open-source stacks (Airflow + dbt + Dremio + open data catalog; in-house PostgreSQL tuned with columnar storage). Preference: Snowflake. Tooling specialty: dbt.
- Certifications (shown on Home, About, Expertise, without credential IDs): SnowPro Advanced: Architect (2026), SnowPro Core (2025), Databricks Certified Data Engineer Associate (2025), dbt Analytics Engineering Certification (2024), AWS Certified Cloud Practitioner (2023), EXIN ISFS ISO/IEC 27001 (2017).
- Founder name, photo and LinkedIn: not shown, by decision.

Still to do or confirm before launch:

1. **Create `contato@vitrinededados.com`** at GoDaddy (mailbox, alias or forward). It is the contact form destination and appears in the footer and privacy policy. Until it exists, messages sent to it bounce.
2. Founder facts (14+ years, graduate professor, 60+ trainings) and results (70%, 45%, 80%, 100%, 30 days, 90 days) come from the company deck.
3. Address and hours (Hub Cerrado, Goiânia; Mon–Fri 9:00–17:00) come from the current site.
4. Optional later: a form delivery service (see README), company LinkedIn, client logos with permission, Brazilian legal name/CNPJ, US entity details once registered.
