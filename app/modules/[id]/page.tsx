import { notFound } from 'next/navigation';
import { readFile } from 'fs/promises';
import { join } from 'path';
import ModuleLayout from '@/components/module/ModuleLayout';

interface ModulePageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getModuleData(id: string) {
  try {
    const filePath = join(process.cwd(), 'data', `${id}.md`);
    const fileContents = await readFile(filePath, 'utf8');

    return {
      id,
      content: fileContents,
      title: extractTitle(fileContents, id)
    };
  } catch (error) {
    return null;
  }
}

function extractTitle(content: string, id: string): string {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1] : `Module ${id}`;
}

export default async function ModulePage({ params }: ModulePageProps) {
  const { id } = await params;
  const moduleData = await getModuleData(id);

  if (!moduleData) {
    notFound();
  }

  return <ModuleLayout module={moduleData} />;
}

export async function generateStaticParams() {
  const modules = ['0', '1', '2', '3', '4', '5'];

  return modules.map((id) => ({
    id,
  }));
}