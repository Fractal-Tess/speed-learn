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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/modules" className="text-blue-600 hover:text-blue-800">
                ← Back to Modules
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">
                {module.title}
              </h1>
            </div>

            <div className="flex items-center space-x-2">
              {hasPrevious && (
                <Link href={`/modules/${moduleId - 1}`}>
                  <Button variant="outline" size="sm">
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                </Link>
              )}

              {hasNext && (
                <Link href={`/modules/${moduleId + 1}`}>
                  <Button variant="outline" size="sm">
                    <ChevronRight className="h-4 w-4 ml-1" />
                    Next
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