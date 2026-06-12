import crypto from "crypto";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function EchoCacheablePage({ params }: PageProps) {
  const { slug } = await params;
  const requestedPath = `/echo/cacheable/${slug ? slug.join("/") : ""}`;
  
  const now = new Date();
  const rawTimestamp = Math.floor(now.getTime() / 1000);
  
  const pad = (num: number) => String(num).padStart(2, "0");
  const year = now.getUTCFullYear();
  const month = pad(now.getUTCMonth() + 1);
  const day = pad(now.getUTCDate());
  const hours = pad(now.getUTCHours());
  const minutes = pad(now.getUTCMinutes());
  const seconds = pad(now.getUTCSeconds());
  const formattedUTC = `${year}-${month}-${day} ${hours}:${minutes}:${seconds} UTC`;

  const uuid = crypto.randomUUID();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 text-zinc-50 p-6 font-sans selection:bg-emerald-500/30 relative">
      {/* Background gradients for rich aesthetics */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[40%] -left-[20%] w-[80%] h-[80%] rounded-full bg-emerald-900/10 blur-[120px]" />
        <div className="absolute -bottom-[40%] -right-[20%] w-[80%] h-[80%] rounded-full bg-blue-900/10 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        {/* Navigation / Back link */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors mb-8 group"
        >
          <span className="inline-block transition-transform group-hover:-translate-x-1">←</span> Back to Home
        </Link>

        {/* Header */}
        <div className="mb-8">
          <span className="px-3 py-1 text-xs font-semibold font-mono tracking-wider text-emerald-400 bg-emerald-950/50 border border-emerald-800/30 rounded-full inline-flex items-center gap-1.5 mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            CACHEABLE RESPONSE
          </span>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            Echo Cacheable Endpoint
          </h1>
          <p className="text-zinc-400 mt-2">
            This page is configured with HTTP Cache-Control headers. Subsequent requests within the cache window will serve this exact cached response.
          </p>
        </div>

        {/* Main Glassmorphic Card */}
        <div className="rounded-2xl border border-zinc-800/50 bg-zinc-900/40 p-6 backdrop-blur-xl shadow-2xl space-y-6">
          
          {/* Requested Path */}
          <div className="space-y-1.5">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Requested Path</span>
            <div className="flex items-center justify-between rounded-xl bg-zinc-950/80 px-4 py-3 border border-zinc-800/60">
              <code className="font-mono text-emerald-400 break-all">{requestedPath}</code>
              <span className="text-xs text-zinc-500 font-mono select-none">GET</span>
            </div>
          </div>

          {/* Timestamp Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Raw Epoch Timestamp</span>
              <div className="rounded-xl bg-zinc-950/80 px-4 py-3 border border-zinc-800/60 font-mono text-zinc-200 text-lg font-bold">
                {rawTimestamp} <span className="text-xs text-zinc-500 font-normal">seconds</span>
              </div>
            </div>
            <div className="space-y-1.5">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Formatted UTC Time</span>
              <div className="rounded-xl bg-zinc-950/80 px-4 py-3 border border-zinc-800/60 font-mono text-zinc-200 text-lg font-bold">
                {formattedUTC}
              </div>
            </div>
          </div>

          {/* Random UUID */}
          <div className="space-y-1.5">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Generated UUID v4</span>
            <div className="rounded-xl bg-zinc-950/80 px-4 py-3 border border-zinc-800/60 font-mono text-blue-400 break-all text-lg font-bold">
              {uuid}
            </div>
          </div>

          {/* Caching Proof Explanation */}
          <div className="border-t border-zinc-800/80 pt-6 space-y-3">
            <h3 className="text-sm font-semibold text-zinc-300">How to verify the cache:</h3>
            <ul className="text-xs text-zinc-400 space-y-2 list-disc pl-4 leading-relaxed">
              <li>
                Observe the <span className="text-blue-400 font-semibold">UUID</span> and <span className="text-emerald-400 font-semibold">Timestamps</span> above.
              </li>
              <li>
                Refresh the page. If the cache is active, the values will <span className="text-zinc-200 font-semibold">remain identical</span> because the browser/CDN served a cached copy.
              </li>
              <li>
                Wait 60 seconds (the cache lifetime) and refresh again. You will see a <span className="text-zinc-200 font-semibold">new UUID and timestamp</span> generated.
              </li>
            </ul>
          </div>
        </div>

        {/* HTTP Headers Box */}
        <div className="mt-6 rounded-xl border border-zinc-800/30 bg-zinc-950/40 p-4 font-mono text-xs text-zinc-500 space-y-1">
          <div className="text-zinc-400 font-bold mb-1">Response Headers:</div>
          <div><span className="text-zinc-400">Cache-Control:</span> public, max-age=60, stale-while-revalidate=59</div>
          <div><span className="text-zinc-400">Content-Type:</span> text/html; charset=utf-8</div>
          <div><span className="text-zinc-400">X-Powered-By:</span> Next.js</div>
        </div>

      </div>
    </main>
  );
}
