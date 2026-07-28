import { Card, CardContent } from '@/components/ui/card';
import type { AstrologyApiChartImage } from '@/lib/astrologyapi/types';

/**
 * Rendered North Indian chart diagram from `POST /horo_chart_image/:chartId` — the visual equivalent of
 * RoxyAPI's `RoxyVedicKundli`. The endpoint returns a complete, self-contained SVG string (server-rendered
 * by AstrologyAPI, never client input), so it's safe to inject directly rather than re-drawing the chart
 * geometry ourselves.
 */
export function AstrologyApiChartImage({ data }: { data: AstrologyApiChartImage }) {
  return (
    <Card>
      <CardContent className="flex justify-center pt-6">
        <div
          className="w-full max-w-sm [&_svg]:h-auto [&_svg]:w-full dark:[&_svg]:invert"
          dangerouslySetInnerHTML={{ __html: data.svg }}
        />
      </CardContent>
    </Card>
  );
}
