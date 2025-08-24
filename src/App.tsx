import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container">
        <div className="mx-auto max-w-2xl bg-white rounded-3xl shadow p-8">
          <h1 className="text-3xl font-bold tracking-tight">
            React + TypeScript + Vite
          </h1>
          <p className="text-gray-600 mt-2">Styled with Tailwind CSS v3</p>

          <div className="mt-8 flex items-center gap-3">
            <button
              className="btn-primary"
              onClick={() => setCount((c) => c + 1)}
            >
              Count: {count}
            </button>
            <a
              className="btn bg-gray-100 hover:bg-gray-200"
              href="https://tailwindcss.com/docs"
              target="_blank"
              rel="noreferrer"
            >
              Tailwind Docs
            </a>
            <a
              className="btn bg-gray-100 hover:bg-gray-200"
              href="https://vitejs.dev/guide/"
              target="_blank"
              rel="noreferrer"
            >
              Vite Guide
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
