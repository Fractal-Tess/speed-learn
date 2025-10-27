import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BookOpen, GraduationCap } from 'lucide-react';
import DarkVeil from '@/components/DarkVeil';

export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1620712943543-56fc9e5f1ca1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80')",
        }}
      />

      {/* Dark Veil Overlay */}
      <DarkVeil></DarkVeil>

      {/* Navigation */}
      <header className="absolute top-0 left-0 right-0 z-30 border-b border-white/10 bg-black/30 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <GraduationCap className="h-8 w-8 text-white" />
              <h1 className="text-xl font-bold text-white">Speed Learn</h1>
            </div>
            <Link href="/modules">
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
              >
                Виж модули
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Centered Content */}
      <main className="relative z-20 flex items-center justify-center min-h-screen px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-8">
            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">
                Интерактивно обучение
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-blue-300 mb-2 drop-shadow-lg">
                Цифрова обработка на сигнали
              </h2>
            </div>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
              Учете с интерактивни тестове, проследяване на напредъка и незабавна обратна връзка.
              Модерна платформа за дигитално образование.
            </p>

            {/* Call to Action */}
            <div className="pt-4">
              <Link href="/modules">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg backdrop-blur-sm border border-blue-400/30 shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <BookOpen className="h-6 w-6 mr-3" />
                  Започни сега
                </Button>
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl">
            <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300">
              <div className="flex flex-col items-center space-y-4">
                <div className="p-3 bg-blue-500/20 rounded-full backdrop-blur-sm">
                  <BookOpen className="h-8 w-8 text-blue-300" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">5 модула</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Интерактивни тестове по всички основни теми за цифрови сигнали
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300">
              <div className="flex flex-col items-center space-y-4">
                <div className="p-3 bg-green-500/20 rounded-full backdrop-blur-sm">
                  <GraduationCap className="h-8 w-8 text-green-300" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Прогрес</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Визуални индикатори за правилни и грешни отговори
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300">
              <div className="flex flex-col items-center space-y-4">
                <div className="p-3 bg-purple-500/20 rounded-full backdrop-blur-sm">
                  <BookOpen className="h-8 w-8 text-purple-300" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Обратна връзка</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Незабавна проверка на отговорите с подробна обратна връзка
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      {/* Bottom Navigation Hint */}
      <div className="absolute bottom-8 left-0 right-0 z-20 text-center">
        <p className="text-gray-400 text-sm">
          Натиснете "Виж модули" или превъртете надолу за повече опции
        </p>
      </div>
    </div>
  );
}
