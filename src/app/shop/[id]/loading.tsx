/* ─── SKELETON LOADING STATE ─── */
export default function ProductDetailLoading() {
  return (
    <main className="bg-white min-h-screen">
      {/* Header placeholder */}
      <div className="h-16" />

      {/* Breadcrumb skeleton */}
      <div style={{ padding: "24px 64px 0 64px" }}>
        <div className="flex items-center gap-2">
          <div className="h-3 w-12 bg-zinc-200 rounded animate-pulse" />
          <span className="text-zinc-200">/</span>
          <div className="h-3 w-16 bg-zinc-200 rounded animate-pulse" />
        </div>
      </div>

      {/* Product detail skeleton */}
      <div
        className="flex gap-6"
        style={{ padding: "24px 64px 80px 64px" }}
      >
        {/* LEFT — Two image placeholders */}
        <div className="flex gap-4 flex-1">
          <div className="flex-1 aspect-3/4 bg-[#F4F4F5] rounded animate-pulse" />
          <div className="flex-1 aspect-3/4 bg-[#F4F4F5] rounded animate-pulse" />
        </div>

        {/* RIGHT — Info panel skeleton */}
        <div className="shrink-0" style={{ width: "380px", paddingLeft: "24px" }}>
          {/* Title */}
          <div className="h-7 w-48 bg-zinc-200 rounded animate-pulse" />
          {/* Price */}
          <div className="h-4 w-20 bg-zinc-200 rounded animate-pulse mt-3" />

          {/* Size selector */}
          <div className="mt-8">
            <div className="h-3 w-10 bg-zinc-200 rounded animate-pulse" />
            <div className="flex gap-2 mt-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="w-11 h-11 bg-zinc-100 border border-zinc-200 rounded animate-pulse"
                />
              ))}
            </div>
          </div>

          {/* CTA button */}
          <div className="mt-7 h-12 bg-zinc-100 rounded animate-pulse" />

          {/* Accordion placeholders */}
          <div className="mt-8 space-y-4">
            <div className="h-12 border-b border-zinc-200" />
            <div className="h-12 border-b border-zinc-200" />
          </div>
        </div>
      </div>
    </main>
  );
}
