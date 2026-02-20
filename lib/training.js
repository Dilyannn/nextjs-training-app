import db from './db';

export function getTrainings() {
  const stmt = db.prepare('SELECT * FROM trainings');
  return stmt.all();
}

export function createTraining({ title, image, description }) {
  const stmt = db.prepare(
    'INSERT INTO trainings (title, image, description) VALUES (?, ?, ?)',
  );

  return stmt.run(title, image, description);
}

export function updateTraining({ id, title, image, description }) {
  const stmt = db.prepare(
    'UPDATE trainings SET title = ?, image = ?, description = ? WHERE id = ?',
  );

  return stmt.run(title, image, description, id);
}

export function deleteTraining(id) {
  const stmt = db.prepare('DELETE FROM trainings WHERE id = ?');
  return stmt.run(id);
}

export function searchTrainings(term) {
  const normalizedTerm = `%${term.trim().toLowerCase()}%`;

  const stmt = db.prepare(`
    SELECT *
    FROM trainings
    WHERE LOWER(title) LIKE ? OR LOWER(description) LIKE ?
    ORDER BY title ASC
  `);

  return stmt.all(normalizedTerm, normalizedTerm);
}
