export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="relative mx-auto h-16 w-16">
          <div className="h-16 w-16 rounded-2xl border border-slate-700/50 bg-slate-900/55" />
          <div className="absolute inset-0 h-16 w-16 animate-spin rounded-2xl border-2 border-primary border-t-transparent" />
        </div>
        <p className="mt-4 text-sm text-slate-400">Loading...</p>
      </div>
    </div>
  );
}
