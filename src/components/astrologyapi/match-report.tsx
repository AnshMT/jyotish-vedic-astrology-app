import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { t } from '@/lib/astrologyapi/i18n';
import type { Lang } from '@/lib/lang';
import type {
  AstrologyApiMatchAshtakoot,
  AstrologyApiMatchManglik,
  AstrologyApiMatchMakingReport,
} from '@/lib/astrologyapi/types';

const KOOTS = [
  ['varna', 'match.koot.varna'],
  ['vashya', 'match.koot.vashya'],
  ['tara', 'match.koot.tara'],
  ['yoni', 'match.koot.yoni'],
  ['maitri', 'match.koot.maitri'],
  ['gan', 'match.koot.gan'],
  ['bhakut', 'match.koot.bhakut'],
  ['nadi', 'match.koot.nadi'],
] as const;

interface MatchData {
  makingReport: AstrologyApiMatchMakingReport;
  ashtakoot: AstrologyApiMatchAshtakoot;
  manglik: AstrologyApiMatchManglik;
  lang: Lang;
}

/** Ashtakoot Gun Milan compatibility report, combining `match_making_report`, `match_ashtakoot_points`, and `match_manglik_report`. */
export function AstrologyApiMatchReport({ makingReport, ashtakoot, manglik, lang }: MatchData) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="text-center">
          <CardDescription>{t(lang, 'match.ashtakootScore')}</CardDescription>
          <CardTitle className="text-4xl tabular-nums">
            {ashtakoot.total.received_points} / {ashtakoot.total.total_points}
          </CardTitle>
          <Badge variant={ashtakoot.total.received_points >= ashtakoot.total.minimum_required ? 'secondary' : 'destructive'} className="mx-auto mt-2 w-fit">
            {ashtakoot.total.received_points >= ashtakoot.total.minimum_required
              ? t(lang, 'match.goodMatch')
              : t(lang, 'match.belowMinimum')}
          </Badge>
        </CardHeader>
        <CardContent>
          <p className="text-center text-sm text-muted-foreground">{ashtakoot.conclusion.report}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t(lang, 'match.kootaBreakdown')}</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full min-w-[480px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="pb-2 font-medium">{t(lang, 'match.koota')}</th>
                <th className="pb-2 font-medium">{t(lang, 'match.groom')}</th>
                <th className="pb-2 font-medium">{t(lang, 'match.bride')}</th>
                <th className="pb-2 font-medium">{t(lang, 'match.points')}</th>
              </tr>
            </thead>
            <tbody>
              {KOOTS.map(([key, labelKey]) => {
                const k = ashtakoot[key];
                return (
                  <tr key={key} className="border-b border-border/50 last:border-0">
                    <td className="py-2 font-medium text-foreground">{t(lang, labelKey)}</td>
                    <td className="py-2 text-muted-foreground">{k.male_koot_attribute}</td>
                    <td className="py-2 text-muted-foreground">{k.female_koot_attribute}</td>
                    <td className="py-2 tabular-nums text-muted-foreground">
                      {k.received_points} / {k.total_points}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">{t(lang, 'match.manglikGroom')}</CardTitle>
              <Badge variant={manglik.male.is_present ? 'destructive' : 'secondary'}>
                {manglik.male.manglik_status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{manglik.male.manglik_report}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">{t(lang, 'match.manglikBride')}</CardTitle>
              <Badge variant={manglik.female.is_present ? 'destructive' : 'secondary'}>
                {manglik.female.manglik_status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{manglik.female.manglik_report}</p>
          </CardContent>
        </Card>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>{t(lang, 'match.overallConclusion')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>{makingReport.conclusion.match_report}</p>
          <div className="flex flex-wrap gap-2 pt-2">
            <Badge variant={makingReport.rajju_dosha.status ? 'destructive' : 'secondary'}>
              {t(lang, 'match.rajjuDosha', { status: makingReport.rajju_dosha.status ? t(lang, 'match.present') : t(lang, 'match.absent') })}
            </Badge>
            <Badge variant={makingReport.vedha_dosha.status ? 'destructive' : 'secondary'}>
              {t(lang, 'match.vedhaDosha', { status: makingReport.vedha_dosha.status ? t(lang, 'match.present') : t(lang, 'match.absent') })}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
