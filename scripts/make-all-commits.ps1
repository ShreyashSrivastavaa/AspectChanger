# scripts/make-all-commits.ps1
# Creates 50+ granular, atomic git commits for AspectCut.

$commits = @(
  @{
    files = @(".gitignore", "AGENTS.md", "eslint.config.mjs", "next.config.ts", "package.json", "package-lock.json", "postcss.config.mjs", "tsconfig.json")
    msg = "build(config): initialize Next.js 16 configuration and project manifest"
  },
  @{
    files = @("scripts/copy-ffmpeg.js", "public/ffmpeg")
    msg = "feat(engine): add FFmpeg core WebAssembly assets and copy script"
  },
  @{
    files = @("src/lib/ffmpeg.ts")
    msg = "feat(engine): implement client-side WebAssembly video processing pipeline"
  },
  @{
    files = @("src/lib/audio-decision.ts", "scripts/test-audio.js", "test-assets")
    msg = "feat(engine): add audio stream copy decision engine and unit tests"
  },
  @{
    files = @("src/lib/config.ts")
    msg = "feat(seo): establish canonical brand configuration and entity statement"
  },
  @{
    files = @("src/lib/seo/geometry-engine.ts", "scripts/test-geometry.js")
    msg = "feat(seo): implement pure geometry calculation engine and macroblock math"
  },
  @{
    files = @("src/lib/seo/keyword-map.ts", "docs/seo/keyword-map.md", "scripts/check-cannibalization.js")
    msg = "feat(seo): build keyword clustering map and anti-cannibalization validator"
  },
  @{
    files = @("src/lib/seo/verified-specs.ts")
    msg = "feat(seo): compile verified social media platform specifications"
  },
  @{
    files = @("src/lib/seo/schema-generators.ts", "scripts/check-schemas.js")
    msg = "feat(seo): build strongly typed Schema.org JSON-LD generators"
  },
  @{
    files = @("src/lib/seo/ratio-pairs-data.ts")
    msg = "feat(seo): implement programmatic ratio pairs content dataset"
  },
  @{
    files = @("src/lib/seo/devices-data.ts")
    msg = "feat(seo): implement programmatic source devices content dataset"
  },
  @{
    files = @("src/lib/seo/formats-data.ts")
    msg = "feat(seo): implement programmatic container formats content dataset"
  },
  @{
    files = @("src/lib/seo/problems-data.ts")
    msg = "feat(seo): implement programmatic video problems content dataset"
  },
  @{
    files = @("src/lib/seo/comparisons-data.ts")
    msg = "feat(seo): implement programmatic competitor comparisons content dataset"
  },
  @{
    files = @("src/lib/seo/resolutions-data.ts")
    msg = "feat(seo): implement programmatic standard resolutions content dataset"
  },
  @{
    files = @("src/lib/seo/glossary-data.ts")
    msg = "feat(seo): implement programmatic video engineering glossary dataset"
  },
  @{
    files = @("src/lib/seo/guides-data.ts")
    msg = "feat(seo): implement programmatic in-depth pillar guides dataset"
  },
  @{
    files = @("scripts/check-quality-gates.js")
    msg = "test(seo): add automated SEO quality gates audit suite"
  },
  @{
    files = @("src/app/globals.css", "public/noise.svg", "public/icon.png", "public/logo.png")
    msg = "feat(ui): build luxury frosted glass styling system and typography tokens"
  },
  @{
    files = @("src/components/AspectRatioCalculatorWidget.tsx")
    msg = "feat(ui): create interactive draggable focal point aspect ratio calculator widget"
  },
  @{
    files = @("src/components/VideoProcessor.tsx")
    msg = "feat(ui): build client-side video processor interface and WebAssembly controller"
  },
  @{
    files = @("src/components/Shell.tsx", "src/components/Header.tsx")
    msg = "feat(ui): build application header and drawer navigation shell"
  },
  @{
    files = @("src/components/Footer.tsx")
    msg = "feat(ui): implement responsive global footer with complete category navigation"
  },
  @{
    files = @("src/lib/aspect-data.ts", "src/lib/platform-guides-data.ts")
    msg = "feat(data): add legacy aspect presets and platform guide mapping data"
  },
  @{
    files = @("src/app/layout.tsx")
    msg = "feat(seo): configure root layout with global metadata and Schema.org organization"
  },
  @{
    files = @("src/app/page.tsx")
    msg = "feat(pages): build focused single-screen homepage with answer-first SEO block"
  },
  @{
    files = @("src/app/not-found.tsx")
    msg = "feat(pages): add 404 not found boundary page"
  },
  @{
    files = @("src/app/methodology/page.tsx")
    msg = "feat(pages): build engineering methodology and testing standards page"
  },
  @{
    files = @("src/app/privacy/page.tsx")
    msg = "feat(pages): build client-side privacy architecture guarantee page"
  },
  @{
    files = @("src/app/terms/page.tsx")
    msg = "feat(pages): build legal terms of service and acceptable use policy page"
  },
  @{
    files = @("src/app/contact/page.tsx")
    msg = "feat(pages): build engineering support and contact page"
  },
  @{
    files = @("src/app/changelog/page.tsx")
    msg = "feat(pages): build public release changelog page"
  },
  @{
    files = @("src/app/faq/page.tsx")
    msg = "feat(pages): build 22-question People-Also-Ask knowledge base"
  },
  @{
    files = @("src/app/about/page.tsx")
    msg = "feat(pages): build technical architecture and about page"
  },
  @{
    files = @("src/app/tools/page.tsx")
    msg = "feat(pages): build ratio conversion tools hub"
  },
  @{
    files = @("src/app/tools/[pair]/page.tsx")
    msg = "feat(pages): implement 15 static ratio pair conversion routes"
  },
  @{
    files = @("src/app/for/page.tsx")
    msg = "feat(pages): build verified platform presets hub"
  },
  @{
    files = @("src/app/for/[platform]/page.tsx")
    msg = "feat(pages): implement 11 static platform preset specification routes"
  },
  @{
    files = @("src/app/from/page.tsx")
    msg = "feat(pages): build source devices conversion hub"
  },
  @{
    files = @("src/app/from/[device]/page.tsx")
    msg = "feat(pages): implement 6 static source device converter routes"
  },
  @{
    files = @("src/app/convert/page.tsx")
    msg = "feat(pages): build video formats transcoding hub"
  },
  @{
    files = @("src/app/convert/[slug]/page.tsx")
    msg = "feat(pages): implement 4 static container format routes"
  },
  @{
    files = @("src/app/fix/page.tsx")
    msg = "feat(pages): build video problem solutions hub"
  },
  @{
    files = @("src/app/fix/[slug]/page.tsx")
    msg = "feat(pages): implement 6 static video troubleshooting routes"
  },
  @{
    files = @("src/app/compare/page.tsx")
    msg = "feat(pages): build competitor comparisons hub"
  },
  @{
    files = @("src/app/compare/[slug]/page.tsx")
    msg = "feat(pages): implement 5 static competitor alternative routes"
  },
  @{
    files = @("src/app/resolution/page.tsx")
    msg = "feat(pages): build standard resolution directory hub"
  },
  @{
    files = @("src/app/resolution/[dimension]/page.tsx")
    msg = "feat(pages): implement 5 static resolution specification routes"
  },
  @{
    files = @("src/app/calculator/page.tsx")
    msg = "feat(pages): build aspect ratio calculator hub"
  },
  @{
    files = @("src/app/calculator/aspect-ratio/page.tsx")
    msg = "feat(pages): implement embeddable online aspect ratio calculator"
  },
  @{
    files = @("src/app/calculator/resolution/[ratio]/page.tsx")
    msg = "feat(pages): implement 6 static calculator ratio resolution tables"
  },
  @{
    files = @("src/app/glossary/page.tsx")
    msg = "feat(pages): build video engineering glossary hub"
  },
  @{
    files = @("src/app/glossary/[term]/page.tsx")
    msg = "feat(pages): implement 20 static glossary definition routes"
  },
  @{
    files = @("src/app/guides/page.tsx")
    msg = "feat(pages): build pillar guides directory hub"
  },
  @{
    files = @("src/app/guides/[slug]/page.tsx")
    msg = "feat(pages): implement 8 comprehensive pillar guide routes"
  },
  @{
    files = @("src/app/benchmarks/page.tsx")
    msg = "feat(geo): build empirical WebAssembly benchmarks page"
  },
  @{
    files = @("src/app/data/platform-specs/page.tsx")
    msg = "feat(geo): build open platform specifications dataset page"
  },
  @{
    files = @("src/app/api/data/platform-specs/route.ts")
    msg = "feat(api): implement platform specifications CSV and JSON API endpoints"
  },
  @{
    files = @("src/app/api/waitlist/route.ts")
    msg = "feat(api): add waitlist subscription endpoint"
  },
  @{
    files = @("src/app/press/page.tsx")
    msg = "feat(pages): build press kit and official brand resources page"
  },
  @{
    files = @("public/llms.txt", "public/llms-full.txt")
    msg = "feat(geo): generate machine-readable surfaces for AI answer engines"
  },
  @{
    files = @("src/lib/analytics/ai-referrers.ts")
    msg = "feat(geo): add AI search engine referrer classification helper"
  },
  @{
    files = @("src/app/api/og/route.tsx")
    msg = "feat(seo): generate dynamic luxury frosted glass OpenGraph card engine"
  },
  @{
    files = @("src/app/robots.ts", "src/app/sitemap.ts")
    msg = "feat(seo): configure AI crawler policy in robots.txt and dynamic sitemap indexation"
  },
  @{
    files = @("src/lib/seo/related-links.ts")
    msg = "feat(linking): implement semantic related links engine"
  },
  @{
    files = @("src/app/all-pages/page.tsx")
    msg = "feat(linking): build HTML sitemap directory"
  },
  @{
    files = @("scripts/check-internal-links.js")
    msg = "test(linking): add internal linking and orphan page detection script"
  },
  @{
    files = @("scripts/monitor-specs.js")
    msg = "feat(ops): add quarterly platform specifications monitor script"
  },
  @{
    files = @("docs/seo/brand-profiles.md")
    msg = "docs(geo): add off-site brand profiles and directory listings"
  },
  @{
    files = @("docs/seo/community-answers.md")
    msg = "docs(geo): add ethical community forum answers for Reddit and Quora"
  },
  @{
    files = @("docs/geo/prompt-set.md", "docs/geo/tracking-template.csv")
    msg = "docs(geo): create 60-prompt GEO evaluation suite and tracking template"
  },
  @{
    files = @("docs/seo/launch-checklist.md", "docs/seo/90-day-plan.md")
    msg = "docs(ops): create production launch checklist and 90-day growth plan"
  },
  @{
    files = @("README.md", "lighthouse-frosted.json", "lighthouse-home-desktop.json", "lighthouse-report.json")
    msg = "docs: update comprehensive project documentation and audit benchmarks"
  }
)

$commitIndex = 0
foreach ($c in $commits) {
  $commitIndex++
  Write-Host "[$commitIndex/$($commits.Count)] Committing: $($c.msg)..."
  foreach ($f in $c.files) {
    if (Test-Path $f) {
      git add $f
    }
  }
  
  # Check if anything is staged
  $staged = git diff --name-only --cached
  if ($staged) {
    git commit -m $c.msg --quiet
  } else {
    Write-Host "   (No changes staged for this commit, skipping)"
  }
}

# Add any remaining files if untracked
$remaining = git status --porcelain
if ($remaining) {
  Write-Host "Staging remaining files..."
  git add -A
  git commit -m "chore: finalize remaining project files and scripts" --quiet
}

Write-Host "`nAll commits completed!"

