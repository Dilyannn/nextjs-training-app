import Link from 'next/link';

import { logout } from '@/actions/auth-actions.js';
import '../globals.css';

export const metadata = {
  title: 'Next Auth',
  description: 'Next.js Authentication',
};

export default function AuthRootLayout({ children }) {
  return (
    <>
      <header id="auth-header">
        <h1>Welcome back!</h1>
        <nav id="auth-nav" className="justify-center space-x-1.5 px-3">
          <Link href="/training">Training</Link>
          <Link href="/exercises">Exercises</Link>
          <Link href="/search">Search</Link>
        </nav>
        <form action={logout}>
          <button>Logout</button>
        </form>
      </header>
      {children}
    </>
  );
}
