import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold text-center mb-8">
        Welcome to Next.js
      </h1>
      <Link 
        href="/lm-app/13000"
        className="text-blue-600 hover:text-blue-800 underline text-xl"
      >
        Go to Hello World page →
      </Link>
    </main>
  );
}
