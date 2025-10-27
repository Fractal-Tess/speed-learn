import { readFile } from 'fs/promises';
import { join } from 'path';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface ModuleInfo {
  id: string;
  title: string;
}

async function getModuleInfo(id: string): Promise<ModuleInfo | null> {
  try {
    const filePath = join(process.cwd(), 'data', `${id}.md`);
    const fileContents = await readFile(filePath, 'utf8');

    // Extract title
    const titleMatch = fileContents.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1] : `Модул ${id}`;

    return {
      id,
      title
    };
  } catch (error) {
    return null;
  }
}

async function getAllModules(): Promise<ModuleInfo[]> {
  const moduleIds = ['1', '2', '3', '4', '5']; // Skip 0
  const modules = await Promise.all(
    moduleIds.map(id => getModuleInfo(id))
  );

  return modules.filter((module): module is ModuleInfo => module !== null);
}

export default async function ModulesPage() {
  const modules = await getAllModules();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-primary hover:text-primary/80 transition-colors">
                ← Начало
              </Link>
              <h1 className="text-2xl font-bold text-foreground">
                Модули
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Modules List */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-2">
          {modules.map((module) => (
            <div
              key={module.id}
              className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-sm bg-primary text-primary-foreground font-semibold text-sm">
                  {module.id}
                </div>
                <h3 className="text-lg font-medium text-foreground">
                  {module.title}
                </h3>
              </div>

              <Link href={`/modules/${module.id}`}>
                <Button variant="ghost" size="sm">
                  →
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}