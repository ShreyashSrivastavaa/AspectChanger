# AspectCut — 90-Day Post-Launch SEO & Growth Plan

> A structured three-month operational plan to transition from initial indexation to ranking dominance across video aspect ratio long-tail queries and securing consistent AI answer engine citations.

---

## Weeks 1–2: Indexation Velocity & Technical Health
- **Goals:** 100% crawl coverage, zero indexation errors, establish baseline impressions in Google Search Console.
- **Key Tasks:**
  1. **Monitor GSC Coverage:** Check "Pages" report daily. Confirm all 117 URLs move from "Discovered - currently not indexed" to "Valid / Indexed".
  2. **Verify Server Logs for AI Crawlers:** Check Cloudflare / Vercel access logs for hits from `OAI-SearchBot`, `PerplexityBot`, and `Claude-SearchBot` on `/llms.txt` and `/data/platform-specs`.
  3. **Run Initial GEO Prompt Baseline:** Run the 60 prompts from `docs/geo/prompt-set.md` across SearchGPT, Perplexity, and Google AI Overviews; record baseline citation presence in `docs/geo/tracking-template.csv`.
  4. **Initial Directory Submissions:** Submit AspectCut to Product Hunt, AlternativeTo, and GitHub public repository using copy from `docs/seo/brand-profiles.md`.

---

## Weeks 3–6: Wave 2 Content & Organic Link-Earning
- **Goals:** Build initial domain authority, acquire high-quality editorial backlinks, launch Wave 2 comparisons.
- **Key Tasks:**
  1. **Calculator Embed Outreach:** Reach out to 25 video production blogs, YouTube creator schools, and camera gear review sites offering the free embeddable calculator (`/calculator/aspect-ratio`) with organic attribution.
  2. **Open Data Distribution:** Submit the CC BY 4.0 Social Video Specifications Dataset (`/data/platform-specs`) to open data portals, Kaggle, and Reddit r/videography.
  3. **Value-First Community Answers:** Post 10 helpful answers addressing complex aspect ratio framing problems on Reddit and Quora using `docs/seo/community-answers.md`.
  4. **Publish Wave 2 Competitor Benchmarks:** Verify current features of Kapwing, Clideo, and VEED, and refresh `/compare/*` pages with fresh screenshots and dates.

---

## Weeks 7–12: GSC Optimization, CTR Tuning & Content Expansion
- **Goals:** Maximize click-through rates on ranking queries, expand pages with impressions on positions 8–20.
- **Key Tasks:**
  1. **CTR Optimization for High-Impression Queries:**
     - Identify queries with high impressions but CTR < 3% in GSC.
     - Rewrite meta titles to include clear intent hooks: "(Free, No Upload)", "(No Watermark)", "Direct In-Browser".
  2. **Content Expansion for Striking-Distance Pages (Positions 8–20):**
     - Identify pages ranking on page 2.
     - Add 150–200 words of expanded nuance, new platform safe zone diagrams, or an additional step-by-step FAQ.
  3. **Quarterly Platform Spec Re-Verification:**
     - Run `npm run monitor:specs` to flag any specs nearing 90 days since last verification.
     - Check official TikTok, YouTube, and Meta engineering docs for any new format announcements.
  4. **Monthly Automated Health Check:**
     - Run `npm run check:keywords`, `npm run check:quality`, `npm run check:schemas`, and `npm run check:links` to verify unbroken link integrity and zero cannibalization.

