import { readFile } from 'fs/promises';
import { join } from 'path';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, Users, FileText } from 'lucide-react';
import Link from 'next/link';

interface ModuleInfo {
  id: string;
  title: string;
  description: string;
  duration?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

async function getModuleInfo(id: string): Promise<ModuleInfo | null> {
  try {
    const filePath = join(process.cwd(), 'data', `${id}.md`);
    const fileContents = await readFile(filePath, 'utf8');

    // Extract title
    const titleMatch = fileContents.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1] : `Module ${id}`;

    // Extract first paragraph as description
    const descriptionMatch = fileContents.match(/(?:^#\s+.+$\s*\n\s*\n)?(.+?)(?:\n\n|\n#)/m);
    const description = descriptionMatch
      ? descriptionMatch[1].replace(/\*\*/g, '').replace(/\*\*/g, '').substring(0, 150) + '...'
      : 'No description available.';

    // Extract some metadata from content
    const hasQuestions = fileContents.includes('---');
    const contentLength = fileContents.length;

    return {
      id,
      title,
      description,
      duration: contentLength > 5000 ? '45 min' : contentLength > 2000 ? '30 min' : '15 min',
      difficulty: contentLength > 8000 ? 'advanced' : contentLength > 4000 ? 'intermediate' : 'beginner'
    };
  } catch (error) {
    return null;
  }
}

async function getAllModules(): Promise<ModuleInfo[]> {
  const moduleIds = ['0', '1', '2', '3', '4', '5'];
  const modules = await Promise.all(
    moduleIds.map(id => getModuleInfo(id))
  );

  return modules.filter((module): module is ModuleInfo => module !== null);
}

function getDifficultyColor(difficulty?: string) {
  switch (difficulty) {
    case 'beginner':
      return 'bg-green-100 text-green-800';
    case 'intermediate':
      return 'bg-yellow-100 text-yellow-800';
    case 'advanced':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

function getDifficultyIcon(difficulty?: string) {
  switch (difficulty) {
    case 'beginner':
      return '📚';
    case 'intermediate':
      return '📖';
    case 'advanced':
      return '📝';
    default:
      return '📚';
  }
}

export default async function ModulesPage() {
  const modules = await getAllModules();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-blue-600 hover:text-blue-800">
                ← Back to Home
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">
                Learning Modules
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              Digital Signal Processing Course
            </h2>
            <p className="text-xl text-blue-100 mb-6">
              Master the fundamentals of digital signal processing through interactive modules
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>{modules.length} Modules</span>
              </div>
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Interactive Content</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Self-Paced Learning</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <Card key={module.id} className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{getDifficultyIcon(module.difficulty)}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                      {module.title}
                    </h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(module.difficulty)}`}>
                      {module.difficulty || 'beginner'}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {module.description}
              </p>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{module.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FileText className="h-4 w-4" />
                  <span>Module {module.id}</span>
                </div>
              </div>

              <Link href={`/modules/${module.id}`}>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Start Learning
                </Button>
              </Link>
            </Card>
          ))}
        </div>

        {/* Learning Path */}
        <div className="mt-16 bg-white rounded-lg shadow-sm border p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Recommended Learning Path
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-3xl font-bold text-green-600 mb-2">Start Here</div>
              <div className="text-sm text-gray-700">Begin with Module 0 for course overview</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-3xl font-bold text-blue-600 mb-2">Progress</div>
              <div className="text-sm text-gray-700">Complete modules in numerical order</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="text-3xl font-bold text-purple-600 mb-2">Practice</div>
              <div className="text-sm text-gray-700">Take quizzes after each module</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500 text-sm">
            <p>Interactive learning platform for Digital Signal Processing</p>
            <p className="mt-2">Built with Next.js, Tailwind CSS, and shadcn/ui</p>
          </div>
        </div>
      </footer>
    </div>
  );
}