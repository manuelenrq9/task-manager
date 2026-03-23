import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// REQUISITO 1: Metadata para identificar la página
export const metadata: Metadata = {
  title: "Task Manager | Mi Prueba Técnica",
  description: "Gestor de tareas eficiente construido con Next.js y Prisma",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-gray-50 text-gray-900 min-h-screen flex flex-col`}>
        
        {/* HEADER CON NAVEGACIÓN (Requisito 1) */}
        <header className="bg-white border-b sticky top-0 z-10">
          <nav className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-blue-600 flex items-center gap-2">
              <span>📝</span> TaskManager
            </Link>
            
            <div className="flex gap-6 font-medium">
              <Link href="/" className="hover:text-blue-500 transition-colors">
                Home
              </Link>
              <Link 
                href="/new" 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              >
                + Nueva Tarea
              </Link>
            </div>
          </nav>
        </header>

        {/* CONTENIDO PRINCIPAL */}
        <main className="flex-grow max-w-5xl mx-auto w-full px-4 py-8">
          {children}
        </main>

        {/* FOOTER (Requisito 1) */}
        <footer className="bg-white border-t py-8 mt-auto">
          <div className="max-w-5xl mx-auto px-4 text-center text-gray-500 text-sm">
            <p>© 2026 Task Manager App - Prueba Técnica Desarrollador Software</p>
            <p className="mt-1">Construido con Next.js (App Router), Tailwind y Prisma</p>
          </div>
        </footer>

      </body>
    </html>
  );
}