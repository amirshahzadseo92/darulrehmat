import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-center">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">404 - Safha Nahi Mila</h2>
      <p className="text-slate-600 mb-4 text-sm">Yeh safha dastiyab nahi hai ya hata diya gaya hai.</p>
      <Link 
        href="/" 
        className="px-4 py-2 bg-emerald-800 text-white rounded-lg text-sm font-medium hover:bg-emerald-900 transition-colors"
      >
        Wapas Main Page Per Jayein
      </Link>
    </div>
  );
}
