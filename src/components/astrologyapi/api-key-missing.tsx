import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function AstrologyApiKeyMissing() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Card className="max-w-lg w-full">
        <CardHeader className="text-center">
          <Badge variant="destructive" className="mx-auto mb-3 w-fit">Setup required</Badge>
          <CardTitle className="text-2xl">AstrologyAPI key not configured</CardTitle>
          <CardDescription className="mt-2">
            This page needs an AstrologyAPI access token to fetch data.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <ol className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium">1</span>
              <span>Get your access token at <a href="https://astrologyapi.com" target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline underline-offset-4">astrologyapi.com</a></span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium">2</span>
              <span>Add <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">ASTROLOGYAPI_KEY=your-token-here</code> to <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">.env.local</code></span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium">3</span>
              <span>Restart the dev server</span>
            </li>
          </ol>

          <Button variant="outline" asChild className="w-full">
            <a href="https://astrologyapi.com" target="_blank" rel="noopener noreferrer">
              Get access token
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
