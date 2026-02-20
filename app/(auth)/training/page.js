import { redirect } from 'next/navigation';
import Link from 'next/link';

import { isAuthenticated } from '@/lib/auth.js';
import { getTrainings } from '@/lib/training';

export default async function TrainingPage() {
  const result = await isAuthenticated();

  if (!result.session) {
    return redirect("/");
  }

  const trainingSessions = getTrainings();

  return (
    <main>
      <h1>Find your favorite activity</h1>
      <p id="training-actions">
        <Link href="/exercises">Manage exercises</Link>
        {' | '}
        <Link href="/search">Search exercises</Link>
      </p>
      <ul id="training-sessions">
        {trainingSessions.map((training) => (
          <li key={training.id}>
            <img src={`/trainings/${training.image}`} alt={training.title} />
            <div>
              <h2>{training.title}</h2>
              <p>{training.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
