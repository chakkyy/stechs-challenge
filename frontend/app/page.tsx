import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-8">
      <h1 className="text-4xl font-bold">Stechs Challenge</h1>
      
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Setup Complete!</CardTitle>
          <CardDescription>TailwindCSS and shadcn/ui are configured</CardDescription>
        </CardHeader>
        <CardContent>
          <Button>Test Button</Button>
        </CardContent>
      </Card>
    </main>
  );
}
