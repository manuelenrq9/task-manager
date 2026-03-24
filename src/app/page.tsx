import { prisma } from "@/lib/prisma";
import Link from "next/link";

// Forzamos que la página se actualice en cada visita (Dynamic Rendering)
export const revalidate = 0;

export default async function HomePage() {
  // 1. Obtener las tareas directamente de la DB usando Prisma (Server-side)
  const tasks = await prisma.task.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-500">Mis Tareas</h1>
          <p className="text-gray-500">Gestiona tus pendientes del día</p>
        </div>
        <span className="text-sm font-medium text-gray-400">
          {tasks.length} {tasks.length === 1 ? 'tarea' : 'tareas'} en total
        </span>
      </div>

      {/* 2. Listado de Tareas */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <Link 
            key={task.id} 
            href={`/task/${task.id}`}
            className="group p-5 bg-white border rounded-xl shadow-sm hover:shadow-md hover:border-blue-300 transition-all block"
          >
            <div className="flex justify-between items-start mb-2">
              <h2 className="font-semibold text-lg text-gray-800 group-hover:text-blue-600 truncate">
                {task.title}
              </h2>
              <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md ${
                task.status === 'completed' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-amber-100 text-amber-700'
              }`}>
                {task.status === 'completed' ? 'Hecho' : 'Pendiente'}
              </span>
            </div>
            
            <p className="text-gray-600 text-sm line-clamp-2 mb-4">
              {task.description || "Sin descripción adicional..."}
            </p>
            
            <div className="text-[11px] text-gray-400 border-t pt-3 mt-auto">
              Creado el: {new Date(task.createdAt).toLocaleDateString('es-ES')}
            </div>
          </Link>
        ))}
      </div>

      {/* 3. Empty State (Si no hay tareas) */}
      {tasks.length === 0 && (
        <div className="text-center py-20 bg-gray-50 border-2 border-dashed rounded-2xl">
          <p className="text-gray-400 text-lg">No tienes tareas registradas todavía.</p>
          <Link 
            href="/new" 
            className="text-blue-600 font-semibold hover:underline mt-2 inline-block"
          >
            ¡Crea tu primera tarea ahora!
          </Link>
        </div>
      )}
    </div>
  );
}