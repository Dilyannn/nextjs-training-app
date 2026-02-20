import { redirect } from "next/navigation";

import {
  createExerciseAction,
  deleteExerciseAction,
  updateExerciseAction,
} from "@/actions/training-actions.js";
import { isAuthenticated } from "@/lib/auth.js";
import { getTrainings } from "@/lib/training.js";

export const metadata = {
  title: "Manage Exercises",
  description: "Create, update, and delete exercises.",
};

export default async function ExercisesPage({ searchParams }) {
  const result = await isAuthenticated();

  if (!result.session) {
    redirect("/");
  }

  const params = await searchParams;
  const editId = params.editId ? Number(params.editId) : null;
  const exercises = getTrainings();
  const selectedExercise = editId ? exercises.find((ex) => ex.id === editId) : null;

  return (
    <main>
      <h1>Manage Exercises</h1>

      <section id="exercise-create">
        <h2>Add Exercise</h2>
        <form action={createExerciseAction}>
          <p>
            <label htmlFor="create-title">Title</label>
            <input id="create-title" name="title" required minLength={2} />
          </p>
          <p>
            <label htmlFor="create-image">Image filename</label>
            <input
              id="create-image"
              name="image"
              placeholder="cycling.jpg"
              required
            />
          </p>
          <p>
            <label htmlFor="create-description">Description</label>
            <textarea
              id="create-description"
              name="description"
              required
              minLength={10}
              rows={3}
            />
          </p>
          <button type="submit">Create</button>
        </form>
      </section>

      <section id="exercise-list">
        <h2>Edit or Delete</h2>
        <form method="GET" className="exercise-selector-form">
          <div>
            <label htmlFor="exercise-selector">Select an exercise</label>
            <div className="search-controls">
              <select
                id="exercise-selector"
                name="editId"
                defaultValue={editId ?? ""}
              >
                <option value="">-- Choose one --</option>
                {exercises.map((ex) => (
                  <option key={ex.id} value={ex.id}>
                    {ex.title}
                  </option>
                ))}
              </select>
              <button type="submit">Manage</button>
            </div>
          </div>
        </form>

        {selectedExercise && (
          <ul id="exercise-admin-list">
            <li key={selectedExercise.id}>
              <form
                action={updateExerciseAction}
                className="exercise-edit-form"
              >
                <input type="hidden" name="id" value={selectedExercise.id} />
                <p>
                  <label htmlFor={`title-${selectedExercise.id}`}>Title</label>
                  <input
                    id={`title-${selectedExercise.id}`}
                    name="title"
                    defaultValue={selectedExercise.title}
                    required
                    minLength={2}
                  />
                </p>
                <p>
                  <label htmlFor={`image-${selectedExercise.id}`}>Image</label>
                  <input
                    id={`image-${selectedExercise.id}`}
                    name="image"
                    defaultValue={selectedExercise.image}
                    required
                  />
                </p>
                <p>
                  <label htmlFor={`desc-${selectedExercise.id}`}>
                    Description
                  </label>
                  <textarea
                    id={`desc-${selectedExercise.id}`}
                    name="description"
                    defaultValue={selectedExercise.description}
                    required
                    minLength={10}
                    rows={3}
                  />
                </p>
                <div className="exercise-actions">
                  <button type="submit">Update</button>
                </div>
              </form>
              <form
                action={deleteExerciseAction}
                className="exercise-delete-form"
              >
                <input type="hidden" name="id" value={selectedExercise.id} />
                <button type="submit">Delete</button>
              </form>
            </li>
          </ul>
        )}
      </section>
    </main>
  );
}
