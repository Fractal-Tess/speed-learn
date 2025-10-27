'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Questionnaire from './Questionnaire';

interface ModuleProps {
  module: {
    id: string;
    content: string;
    title: string;
  };
}

export default function ModuleLayout({ module }: ModuleProps) {
  const moduleId = parseInt(module.id);
  const hasPrevious = moduleId > 0;
  const hasNext = moduleId < 5; // Assuming modules 0-5

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/modules" className="text-primary hover:text-primary/80 transition-colors">
                ← Към модулите
              </Link>
              <h1 className="text-xl font-semibold text-foreground">
                {module.title}
              </h1>
            </div>

            <div className="flex items-center space-x-2">
              {hasPrevious && (
                <Link href={`/modules/${moduleId - 1}`}>
                  <Button variant="outline" size="sm">
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Предишен
                  </Button>
                </Link>
              )}

              {hasNext && (
                <Link href={`/modules/${moduleId + 1}`}>
                  <Button variant="outline" size="sm">
                    <ChevronRight className="h-4 w-4 ml-1" />
                    Следващ
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Questionnaire content={module.content} />
      </main>
    </div>
  );
}