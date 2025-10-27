import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, GraduationCap, Trophy, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">Speed Learn</h1>
            </div>
            <Link href="/modules">
              <Button variant="outline">Browse Modules</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Master Digital Signal Processing
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Interactive learning modules with quizzes, progress tracking, and comprehensive content.
            Transform your understanding through hands-on practice.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Link href="/modules">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <BookOpen className="h-5 w-5 mr-2" />
                Start Learning
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              View Course Outline
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">6 Interactive Modules</h3>
            <p className="text-sm text-gray-600">
              Comprehensive coverage of DSP topics from basics to advanced concepts
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-green-100 rounded-full">
                <Trophy className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Quiz Challenges</h3>
            <p className="text-sm text-gray-600">
              Test your knowledge with interactive questions and instant feedback
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Toggle Content</h3>
            <p className="text-sm text-gray-600">
              Focus on quizzes or study materials with flexible content display
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-orange-100 rounded-full">
                <GraduationCap className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Self-Paced</h3>
            <p className="text-sm text-gray-600">
              Learn at your own speed with intuitive navigation between modules
            </p>
          </Card>
        </div>

        {/* Course Overview */}
        <Card className="p-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <h2 className="text-3xl font-bold text-center mb-8">Course Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="font-semibold text-lg mb-2">Module 0-1</h3>
              <p className="text-blue-100">Introduction & Basic Concepts</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-lg mb-2">Module 2-3</h3>
              <p className="text-blue-100">Frequency Domain & Filtering</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-lg mb-2">Module 4-5</h3>
              <p className="text-blue-100">Advanced Topics & Applications</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link href="/modules">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                View All Modules
              </Button>
            </Link>
          </div>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500 text-sm">
            <p>Built with Next.js, Tailwind CSS, and shadcn/ui</p>
            <p className="mt-2">© 2024 Speed Learn. Interactive DSP Education Platform.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
