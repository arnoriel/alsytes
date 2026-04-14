import { useEffect, useRef, useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { storage } from './lib/storage';
import type { Website } from './types';

interface SubdomainAppProps {
  pageName: string;
}

/**
 * SubdomainApp — dipanggil ketika user akses [sitename].alsytes.dev
 * Langsung render website tanpa routing wrapper, tanpa banner.
 */
export default function SubdomainApp({ pageName }: SubdomainAppProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [website, setWebsite] = useState<Website | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!pageName) { setNotFound(true); return; }
    storage.getByPageName(pageName).then((site) => {
      if (!site) setNotFound(true);
      else setWebsite(site);
    });
  }, [pageName]);

  useEffect(() => {
    if (!website?.source_code || !iframeRef.current) return;
    iframeRef.current.srcdoc = website.source_code;

    const titleMatch = website.source_code.match(/<title[^>]*>([^<]*)<\/title>/i);
    if (titleMatch?.[1]) {
      document.title = titleMatch[1].trim();
    } else {
      document.title = website.name ?? pageName ?? 'Page';
    }
  }, [website?.source_code, website?.name, pageName]);

  if (notFound) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-center px-6">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mb-4">
          <AlertTriangle size={28} className="text-red-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Page Not Found</h2>
        <p className="text-zinc-400 mb-6 max-w-sm text-sm">
          No site named{' '}
          <code className="text-violet-400 font-mono">{pageName}</code>{' '}
          was found. Make sure it has been deployed on{' '}
          <a href="https://alsytes.dev" className="text-violet-400 underline">alsytes.dev</a>.
        </p>
      </div>
    );
  }

  if (!website) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
          <p className="text-xs text-zinc-400">Loading site…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen overflow-hidden bg-black">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-950 z-10">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
            <p className="text-xs text-zinc-400">Loading site…</p>
          </div>
        </div>
      )}
      <iframe
        ref={iframeRef}
        onLoad={() => setIsLoading(false)}
        className="w-full h-full border-0 block"
        title={website.name}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
      />
    </div>
  );
}