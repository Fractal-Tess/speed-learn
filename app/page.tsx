import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, GraduationCap } from "lucide-react";
import DarkVeil from "@/components/ui/dark-veil";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1620712943543-56fc9e5f1ca1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80')"
        }}
      />

      {/* Dark Veil Overlay */}
      <DarkVeil className="min-h-screen" opacity="bg-black/60">
      {/* Navigation */}
        <header className="border-b border-white/20 bg-black/20 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-3">
                <GraduationCap className="h-8 w-8 text-white" />
                <h1 className="text-xl font-bold text-white">Speed Learn</h1>
              </div>
              <Link href="/modules">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  Виж модули
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Интерактивно обучение по цифрова обработка на сигнали
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Учете с интерактивни тестове, проследяване на напредъка и незабавна обратна връзка.
            </p>
            <Link href="/modules">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                <BookOpen className="h-5 w-5 mr-2" />
                Започни сега
              </Button>
            </Link>
          </div>

          {/* Simple Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 text-center bg-white/10 backdrop-blur-sm border-white/20">
              <div className="flex justify-center mb-4">
                <BookOpen className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">6 модула</h3>
              <p className="text-sm text-gray-300">
                Интерактивни тестове по всички основни теми
              </p>
            </Card>

            <Card className="p-6 text-center bg-white/10 backdrop-blur-sm border-white/20">
              <div className="flex justify-center mb-4">
                <GraduationCap className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">Проследяване на напредъка</h3>
              <p className="text-sm text-gray-300">
                Визуални индикатори за правилни и грешни отговори
              </p>
            </Card>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/20 bg-black/20 backdrop-blur-sm mt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-gray-400 text-sm">
              <p>Платформа за интерактивно обучение</p>
            </div>
          </div>
        </footer>
      </DarkVeil>
    </div>
  );
}