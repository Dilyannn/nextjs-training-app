<!-- markdownlint-disable  -->
<div align="center">
  <h1>🏋️‍♂️ Next.js Training App</h1>
  <p>A modern web application built with Next.js 14+ demonstrating secure authentication and session management.</p>

  <!-- Shields -->
  <p>
    <img src="https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
    <img src="https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite" />
    <img src="https://img.shields.io/badge/Lucia_Auth-5C2D91?style=for-the-badge&logo=lucia&logoColor=white" alt="Lucia Auth" />
  </p>
</div>

---

## 📖 About The Project

This project is a training application designed to explore and implement robust authentication flows and data management in a modern Next.js environment. It features a complete user registration and login system, alongside a management dashboard for training exercises.

Users can create an account, log in securely, and access protected routes where they can view, search, and manage training sessions through a full CRUD (Create, Read, Update, Delete) interface.

## ✨ Key Features

- **🔐 Secure Authentication:** Full signup and login flows with password hashing (using Node's native `crypto` module).
- **🍪 Session Management:** Persistent user sessions managed via cookies using [Lucia Auth](https://lucia-auth.com/).
- **⚡ Server Actions:** Leveraging Next.js Server Actions for seamless, JavaScript-free form submissions and secure server-side logic.
- **🛠️ Exercise Management (CRUD):** Complete system to create, read, update, and delete training exercises.
- **🔍 Advanced Search:** Functional search feature to find exercises by title or description using optimized SQL queries.
- **♻️ On-Demand Revalidation:** Using `revalidatePath` to ensure data consistency across different views after mutations.
- **🗄️ Local Database:** Integrated `better-sqlite3` for lightweight, fast, and reliable local data storage.
- **🛡️ Protected Routes:** Middleware/Server-side checks to ensure only authenticated users can access specific pages.

## 🧠 What I Learned

Building this project provided hands-on experience with several advanced Next.js and web development concepts:

- **Next.js App Router:** Navigating the new App Router paradigm, including Server Components vs. Client Components and route groups `(auth)`.
- **Server Actions (`"use server"`):** How to securely handle form data and database mutations directly from the server without building separate API routes.
- **Lucia Auth v3:** Implementing a modern, session-based authentication library from scratch, including setting up the SQLite adapter.
- **Data Revalidation:** Mastering `revalidatePath` to manually purge cached data and ensure the UI reflects the latest database state.
- **SQL Operations:** Writing and executing prepared statements for CRUD operations and keyword-based search in SQLite.
- **Password Security:** Understanding the importance of salting and hashing passwords using `scryptSync` and `timingSafeEqual` to prevent timing attacks.
- **State Management in Forms:** Using React's `useActionState` to handle form submission states, loading indicators, and error messages gracefully.

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

- Node.js (v18.17 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Dilyannn/nextjs-training-app.git
   cd nextjs-training-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open the app**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser. The SQLite database (`training.db`) will be created automatically on the first run.

## 📁 Project Structure

- `/app` - Next.js App Router pages and layouts.
- `/actions` - Server Actions for handling form submissions (e.g., `auth-actions.js`).
- `/components` - Reusable React components (e.g., `auth-form.js`).
- `/lib` - Core logic, database configuration, authentication setup, and utility functions.
- `/public` - Static assets like images.

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).