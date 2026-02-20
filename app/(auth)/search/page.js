import { redirect } from "next/navigation";

import { isAuthenticated } from "@/lib/auth.js";
import { searchTrainings } from "@/lib/training.js";

export const metadata = {
  title: "Search Exercises",
  description: "Search exercises by title or description.",
};

export default async function SearchExercisesPage({ searchParams }) {
  const result = await isAuthenticated();

  if (!result.session) {
    redirect("/");
  }

  const params = await searchParams;
  const query = (params.query ?? "").toString();
  const exercises = query.trim() ? searchTrainings(query) : [];

  return (
    <main>
      <h1>Search Exercises</h1>
      <form id="exercise-search-form">
        <label htmlFor="query">Search by title or description</label>
        <div className="search-controls">
          <input
            id="query"
            name="query"
            defaultValue={query}
            placeholder="e.g. endurance"
          />
          <button type="submit">Search</button>
        </div>
      </form>

      <ul id="training-sessions">
        {exercises.map((exercise) => (
          <li key={exercise.id}>
            <img src={`/trainings/${exercise.image}`} alt={exercise.title} />
            <div>
              <h2>{exercise.title}</h2>
              <p>{exercise.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
