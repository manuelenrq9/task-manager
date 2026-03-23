import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function TaskDetailPage({ params }: Props) {
  // 1. Extraer el ID de los parámetros de la URL
  const { id } = await params;
  const taskId = parseInt(id);

  // 2. Buscar la tarea en la base de datos
  const task = await prisma.task.findUnique({
    where: { id: taskId },
  });

  // 3. Si la tarea no existe, mostrar página 404 de Next.js
  if (!task) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Link href="/" className="text-sm text-blue-600 hover:underline mb-6 inline-block">
        ← Volver al listado
      </Link>

      <article className="bg-white border rounded-2xl shadow-sm overflow-hidden">
        {/* Cabecera del detalle */}
        <div className="p-8 border-b bg-gray-50/50">
          <div className="flex justify-between items-center mb-4">
            <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
              task.status === 'completed' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-amber-100 text-amber-700'
            }`}>
              {task.status === 'completed' ? 'Completada' : 'Pendiente'}
            </span>
            <time className="text-xs text-gray-400">
              Creada el {new Date(task.createdAt).toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </time>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
            {task.title}
          </h1>
        </div>

        {/* Cuerpo del detalle */}
        <div className="p-8">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Descripción
          </h2>
          <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {task.description || (
              <span className="italic text-gray-400">Esta tarea no tiene una descripción detallada.</span>
            )}
          </div>
        </div>

        {/* Acciones (Opcional para puntos extra) */}
        <div className="px-8 py-6 bg-gray-50 border-t flex gap-4">
            {/* Aquí podrías añadir botones de Editar o Eliminar después */}
            <p className="text-xs text-gray-500">
                ID de registro: <code className="bg-gray-200 px-1 rounded">#{task.id}</code>
            </p>
        </div>
      </article>
    </div>
  );
}