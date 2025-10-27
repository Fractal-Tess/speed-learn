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
      <header className="border-b border-white/20 bg-black/20 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <GraduationCap className="h-8 w-8 text-white" />
              <h1 className="text-xl font-bold text-white">Speed Learn</h1>
            </div>
            <Link href="/modules">
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                Виж модули
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
    </div>
  );
}
