# AspectCut — SEO & Production Launch Checklist

> Complete this checklist sequentially upon production deployment to ensure instant indexation, structured data validation, and AI crawler accessibility.

---

## 1. Post-Deployment Verification
- [ ] **1.1 Verify Security & Multi-Threading Headers:**
  - Run: `curl -I https://aspectcut.com`
  - Verify that `Cross-Origin-Opener-Policy: same-origin` is present.
  - Verify that `Cross-Origin-Embedder-Policy: require-corp` is present.
  - Verify that `X-Content-Type-Options: nosniff` is present.
- [ ] **1.2 Verify HTTPS & Canonical Redirects:**
  - Ensure `http://aspectcut.com` 301 redirects to `https://aspectcut.com`.
  - Ensure `https://www.aspectcut.com` 301 redirects to `https://aspectcut.com`.
- [ ] **1.3 Verify In-Browser Video Conversion on Production Domain:**
  - Drop a test 1080p MP4 file.
  - Test 16:9 → 9:16 Crop export.
  - Test 16:9 → 9:16 Blurred Mirror Background export.
  - Confirm video downloads successfully with audio intact and no console errors.

---

## 2. Search Console & Webmaster Tools Setup
- [ ] **2.1 Google Search Console (GSC):**
  - Add domain property `aspectcut.com` via DNS TXT record.
  - Submit sitemap URL: `https://aspectcut.com/sitemap.xml`.
  - Confirm all 117 URLs are detected in the sitemap.
- [ ] **2.2 Bing Webmaster Tools:**
  - Import verified property from Google Search Console or verify via DNS.
  - Submit sitemap: `https://aspectcut.com/sitemap.xml`.
  - Configure automated IndexNow API key for instantaneous crawl triggers.
- [ ] **2.3 IndexNow Submission:**
  - Generate an IndexNow key and submit key transactional URLs:
    - `https://aspectcut.com/`
    - `https://aspectcut.com/tools/16-9-to-9-16`
    - `https://aspectcut.com/tools/9-16-to-16-9`
    - `https://aspectcut.com/for/youtube-shorts`
    - `https://aspectcut.com/for/tiktok`
    - `https://aspectcut.com/for/instagram-reels`
    - `https://aspectcut.com/calculator/aspect-ratio`
    - `https://aspectcut.com/data/platform-specs`

---

## 3. Structured Data & Rich Snippet Validation
- [ ] **3.1 Google Rich Results Test:**
  - Test `https://aspectcut.com/` → Confirm valid `SoftwareApplication`, `Organization`, and `FAQPage`.
  - Test `https://aspectcut.com/tools/16-9-to-9-16` → Confirm valid `SoftwareApplication`, `HowTo`, `FAQPage`, and `BreadcrumbList`.
  - Test `https://aspectcut.com/guides/what-is-aspect-ratio` → Confirm valid `Article`, `FAQPage`, and `BreadcrumbList`.
  - Test `https://aspectcut.com/glossary/letterbox` → Confirm valid `DefinedTerm` and `BreadcrumbList`.
- [ ] **3.2 Schema.org Validator:**
  - Run `https://validator.schema.org/` on top templates to ensure zero syntax warnings.

---

## 4. OpenGraph & Social Media Previews
- [ ] **4.1 OpenGraph Visual Quality Check:**
  - Request `https://aspectcut.com/api/og?title=16:9+to+9:16+Vertical+Converter&ratio=16:9+→+9:16`
  - Verify warm bronze frosted glass styling renders crisply at 1200×630.
- [ ] **4.2 Social Debuggers:**
  - Run Twitter Card Validator / test tweet.
  - Run LinkedIn Post Inspector.
  - Run Facebook Sharing Debugger.

---

## 5. AI Crawler & GEO Discovery Verification
- [ ] **5.1 Inspect `robots.txt`:**
  - Fetch `https://aspectcut.com/robots.txt`.
  - Confirm live retrieval bots are allowed: `OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`, `Claude-SearchBot`, `Googlebot`, `Bingbot`.
- [ ] **5.2 Inspect `llms.txt` & `llms-full.txt`:**
  - Fetch `https://aspectcut.com/llms.txt` and confirm canonical entity summary and markdown directory.
  - Fetch `https://aspectcut.com/llms-full.txt` and confirm full mathematical definitions and platform specifications.
- [ ] **5.3 Verify Server Response Speed for Bots:**
  - Ensure curl requests with `User-Agent: OAI-SearchBot` return full static HTML within < 200ms without JavaScript requirement.

