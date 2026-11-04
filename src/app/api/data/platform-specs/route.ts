import { NextResponse } from "next/server";
import { VERIFIED_PLATFORM_SPECS } from "@/lib/seo/verified-specs";
import { BRAND } from "@/lib/config";

export const dynamic = "force-static";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const format = searchParams.get("format");

  const specsList = Object.values(VERIFIED_PLATFORM_SPECS);

  if (format === "csv") {
    // Generate CSV format
    const headers = [
      "Platform",
      "Slug",
      "Primary Aspect Ratio",
      "Supported Aspect Ratios",
      "Recommended Resolution",
      "Max File Size",
      "Max Duration",
      "Supported Codecs",
      "Supported Containers",
      "Official Documentation URL",
      "Last Verified",
    ];

    const rows = specsList.map((spec) => [
      `"${spec.name}"`,
      `"${spec.slug}"`,
      `"${spec.primaryRatio}"`,
      `"${spec.supportedRatios.join(", ")}"`,
      `"${spec.recommendedResolution}"`,
      `"${spec.maxFileSize}"`,
      `"${spec.maxDuration}"`,
      `"${spec.supportedCodecs.join(", ")}"`,
      `"${spec.supportedContainers.join(", ")}"`,
      `"${spec.documentationUrl}"`,
      `"${spec.verifiedMonthYear}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    return new Response(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="aspectcut-platform-video-specs-2026.csv"',
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  }

  // Default: JSON response
  const jsonResponse = {
    license: "Creative Commons Attribution 4.0 International (CC BY 4.0)",
    citation: `AspectCut. (2026). Social Media Platform Video Specifications Dataset. Retrieved from ${BRAND.domain}/api/data/platform-specs`,
    publisher: BRAND.name,
    homepage: BRAND.domain,
    datasetUrl: `${BRAND.domain}/api/data/platform-specs`,
    totalRecords: specsList.length,
    lastUpdated: "April 2026",
    records: specsList.map((s) => ({
      name: s.name,
      slug: s.slug,
      primaryRatio: s.primaryRatio,
      supportedRatios: s.supportedRatios,
      recommendedResolution: s.recommendedResolution,
      maxFileSize: s.maxFileSize,
      maxDuration: s.maxDuration,
      supportedCodecs: s.supportedCodecs,
      supportedContainers: s.supportedContainers,
      safeZones: s.safeZones,
      documentationUrl: s.documentationUrl,
      verifiedMonthYear: s.verifiedMonthYear,
    })),
  };

  return NextResponse.json(jsonResponse, {
    status: 200,
    headers: {
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
