"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { isAuthenticated } from "@/lib/auth.js";
import {
  createTraining,
  deleteTraining,
  updateTraining,
} from "@/lib/training.js";

async function requireAuth() {
  const result = await isAuthenticated();
  return result.session !== null;
}

function validateTrainingInput({ title, image, description }) {
  return (
    !!title &&
    title.trim().length >= 2 &&
    !!image &&
    !!image.trim().length &&
    !!description &&
    description.trim().length >= 10
  );
}

export async function createExerciseAction(formData) {
  if (!(await requireAuth())) {
    redirect("/");
  }

  const title = formData.get("title")?.toString() ?? "";
  const image = formData.get("image")?.toString() ?? "";
  const description = formData.get("description")?.toString() ?? "";

  if (!validateTrainingInput({ title, image, description })) {
    return;
  }

  createTraining({
    title: title.trim(),
    image: image.trim().replace(/^\//, ""),
    description: description.trim(),
  });

  revalidatePath("/training");
  revalidatePath("/exercises");
  revalidatePath("/search");
}

export async function updateExerciseAction(formData) {
  if (!(await requireAuth())) {
    redirect("/");
  }

  const id = Number(formData.get("id"));
  const title = formData.get("title")?.toString() ?? "";
  const image = formData.get("image")?.toString() ?? "";
  const description = formData.get("description")?.toString() ?? "";

  if (!Number.isInteger(id) || id <= 0) {
    return;
  }

  if (!validateTrainingInput({ title, image, description })) {
    return;
  }

  const result = updateTraining({
    id,
    title: title.trim(),
    image: image.trim().replace(/^\//, ""),
    description: description.trim(),
  });

  if (result.changes === 0) {
    return;
  }

  revalidatePath("/training");
  revalidatePath("/exercises");
  revalidatePath("/search");
}

export async function deleteExerciseAction(formData) {
  if (!(await requireAuth())) {
    redirect("/");
  }

  const id = Number(formData.get("id"));

  if (!Number.isInteger(id) || id <= 0) {
    return;
  }

  deleteTraining(id);

  revalidatePath("/training");
  revalidatePath("/exercises");
  revalidatePath("/search");
}
