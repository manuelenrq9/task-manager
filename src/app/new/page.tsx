"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewTaskPage() {
  const router = useRouter();
  
  // Estados para el formulario y errores
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // 1. Validación de Cliente (Regex: solo alfanuméricos, _ y -)
    const regex = /^[a-zA-Z0-9_-]+$/;
    if (!regex.test(title)) {
      setError("El título solo permite letras, números, guiones (-) y guiones bajos (_).");
      setLoading(false);
      return;
    }

    try {
      // 2. Envío al API que creamos antes
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error al crear la tarea");
      }

      // 3. Éxito: Redirigir a la Home y refrescar
      router.push("/");
      router.refresh(); // Crucial para ver la nueva tarea en la lista
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Link href="/" className="text-sm text-blue-600 hover:underline mb-4 inline-block">
        ← Volver al listado
      </Link>
      
      <h1 className="text-2xl font-bold mb-6 text-gray-500">Crear Nueva Tarea</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border shadow-sm space-y-5">
        
        {/* MENSAJE DE ERROR VISUAL */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700 text-sm">
            <p className="font-bold">Atención:</p>
            <p>{error}</p>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Título de la tarea *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-800"
            placeholder="Ej: tarea-01_urgente"
            required
            disabled={loading}
          />
          <p className="mt-1 text-xs text-gray-400">
            Mínimo 3 caracteres. Solo letras, números, - y _.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descripción (Opcional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-800 min-h-[120px]"
            placeholder="Detalles adicionales sobre la tarea..."
            disabled={loading}
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all ${
              loading 
                ? "bg-blue-300 cursor-not-allowed" 
                : "bg-blue-600 hover:bg-blue-700 active:transform active:scale-[0.98]"
            }`}
          >
            {loading ? "Guardando..." : "Guardar Tarea"}
          </button>
        </div>
      </form>
    </div>
  );
}