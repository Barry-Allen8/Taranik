export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <div className="relative mx-auto h-16 w-16">
          <div className="h-16 w-16 border border-primary/25" />
          <div className="absolute inset-0 h-16 w-16 border-2 border-primary border-t-transparent animate-spin" />
        </div>
        <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#6a6a6a]">Loading...</p>
      </div>
    </div>
  );
}
