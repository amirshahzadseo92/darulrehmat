'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Kuch Ghalat Ho Gaya (Error)</h2>
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-emerald-800 text-white rounded-lg text-sm font-medium hover:bg-emerald-900 transition-colors"
          >
            Dobara Koshish Karein
          </button>
        </div>
      </body>
    </html>
  );
}
