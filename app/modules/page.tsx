import { readFile } from 'fs/promises';
import { join } from 'path';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock } from 'lucide-react';
import Link from 'next/link';

interface ModuleInfo {
  id: string;
  title: string;
  description: string;
  duration?: string;
}

async function getModuleInfo(id: string): Promise<ModuleInfo | null> {
  try {
    const filePath = join(process.cwd(), 'data', `${id}.md`);
    const fileContents = await readFile(filePath, 'utf8');

    // Extract title
    const titleMatch = fileContents.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1] : `Модул ${id}`;

    // Extract first paragraph as description
    const descriptionMatch = fileContents.match(/(?:^#\s+.+$\s*\n\s*\n)?(.+?)(?:\n\n|\n#)/m);
    const description = descriptionMatch
      ? descriptionMatch[1].replace(/\*\*/g, '').replace(/\*\*/g, '').substring(0, 150) + '...'
      : 'Няма описание.';

    // Extract some metadata from content
    const contentLength = fileContents.length;

    return {
      id,
      title,
      description,
      duration: contentLength > 5000 ? '45 мин' : contentLength > 2000 ? '30 мин' : '15 мин'
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
                Обучителни модули
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              Цифрова обработка на сигнали
            </h2>
            <p className="text-xl text-blue-100">
              Интерактивни тестове и упражнения
            </p>
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <Card key={module.id} className="p-6 hover:shadow-lg transition-shadow bg-card border-border">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {module.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {module.description}
                </p>
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{module.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <BookOpen className="h-4 w-4" />
                  <span>Модул {module.id}</span>
                </div>
              </div>

              <Link href={`/modules/${module.id}`}>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Започни
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}