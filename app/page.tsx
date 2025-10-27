import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, GraduationCap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">Speed Learn</h1>
            </div>
            <Link href="/modules">
              <Button variant="outline">Виж модули</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Интерактивно обучение по цифрова обработка на сигнали
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Учете с интерактивни тестове, проследяване на напредъка и незабавна обратна връзка.
          </p>
          <Link href="/modules">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <BookOpen className="h-5 w-5 mr-2" />
              Започни сега
            </Button>
          </Link>
        </div>

        {/* Simple Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 text-center">
            <div className="flex justify-center mb-4">
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">6 модула</h3>
            <p className="text-sm text-gray-600">
              Интерактивни тестове по всички основни теми
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="flex justify-center mb-4">
              <GraduationCap className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Проследяване на напредъка</h3>
            <p className="text-sm text-gray-600">
              Визуални индикатори за правилни и грешни отговори
            </p>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500 text-sm">
            <p>Платформа за интерактивно обучение</p>
          </div>
        </div>
      </footer>
    </div>
  );
}