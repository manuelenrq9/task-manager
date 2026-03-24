import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

//GET: Listar todas las tareas
export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: {
        createdAt: "desc", // Mostrar las más nuevas primero
      },
    });
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener las tareas" },
      { status: 500 }
    );
  }
}

//POST: Crear una nueva tarea 
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description } = body;

    // 1. Validación: No permitir valores vacíos
    if (!title || title.trim().length === 0) {
      return NextResponse.json(
        { error: "El título es obligatorio" },
        { status: 400 }
      );
    }

    // 2. Validación: Mínimo de caracteres
    if (title.trim().length < 3) {
      return NextResponse.json(
        { error: "El título debe tener al menos 3 caracteres" },
        { status: 400 }
      );
    }

    // 3. Validación: Solo alfanuméricos
    const regex = /^[a-zA-Z0-9_-]+$/;
    if (!regex.test(title)) {
      return NextResponse.json(
        { error: "El título solo puede contener letras, números, guiones (-) y guiones bajos (_)" },
        { status: 400 }
      );
    }

    // 4. Creación en la base de datos con Prisma
    const newTask = await prisma.task.create({
      data: {
        title: title.trim(),
        description: description?.trim() || null,
        status: "pending", // Valor por default (Requisito 2)
      },
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error("Error en POST /api/tasks:", error);
    return NextResponse.json(
      { error: "Error al crear la tarea" },
      { status: 500 }
    );
  }
}