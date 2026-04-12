import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2, AlertCircle, Eye, Sparkles, Bot,
  ChevronDown, ChevronUp, Clock
} from 'lucide-react';
import type { GenerationStatus, Website } from '../types';
import type { SummaryStatus } from '../pages/Home';

interface GenerationPanelProps {
  status: GenerationStatus;
  streamedCode: string;
  currentWebsite: Website | null;
  onPreview: (id: string) => void;
  errorMessage?: string;
  summaryMessage: string;
  summaryStatus: SummaryStatus;
  userName?: string;
}

function renderMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>');
}

// Simulated AI process log messages shown during generation
const PROCESS_MESSAGES = [
  { delay: 0,    text: '🧠 Analyzing your prompt and determining website type…' },
  { delay: 2500, text: '🎨 Designing layout, color palette, and typography…' },
  { delay: 5000, text: '✍️ Writing HTML structure and semantic markup…' },
  { delay: 8000, text: '💅 Applying styles, animations, and responsive design…' },
  { delay: 12000, text: '⚙️ Adding JavaScript interactions and functionality…' },
  { delay: 16000, text: '🖼️ Integrating images, icons, and visual assets…' },
  { delay: 20000, text: '🔧 Optimizing code structure and cross-browser compatibility…' },
  { delay: 25000, text: '✅ Finalizing and validating the complete HTML document…' },
];

export default function GenerationPanel({
  status,
  streamedCode,
  currentWebsite,
  onPreview,
  errorMessage,
  summaryMessage,
  summaryStatus,
  userName = 'there',
}: GenerationPanelProps) {
  const summaryRef = useRef<HTMLDivElement>(null);
  const [processLog, setProcessLog] = useState<string[]>([]);
  const [showLog, setShowLog] = useState(true);
  const logRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Start process log when generation begins
  useEffect(() => {
    if (status === 'thinking' || status === 'streaming') {
      setProcessLog([]);
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];

      PROCESS_MESSAGES.forEach(({ delay, text }) => {
        const t = setTimeout(() => {
          setProcessLog((prev) => {
            if (prev.includes(text)) return prev;
            return [...prev, text];
          });
        }, delay);
        timersRef.current.push(t);
      });
    }
    if (status === 'done' || status === 'error') {
      timersRef.current.forEach(clearTimeout);
    }
    return () => timersRef.current.forEach(clearTimeout);
  }, [status]);

  // Auto scroll log
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [processLog]);

  useEffect(() => {
    if (summaryRef.current && summaryStatus === 'generating') {
      summaryRef.current.scrollTop = summaryRef.current.scrollHeight;
    }
  }, [summaryMessage, summaryStatus]);

  if (status === 'idle') return null;

  const isGenerating = status === 'thinking' || status === 'streaming';
  const isDone = status === 'done';
  const isError = status === 'error';

  // Char count for display
  const charCount = streamedCode ? streamedCode.length : 0;

  return (
    <div className="flex flex-col gap-4">
      {/* ── Main status card ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl overflow-hidden"
        style={{ background: '#fff', border: '1px solid #E2DFEF', boxShadow: '0 4px 20px rgba(60,40,120,0.08)' }}
      >
        {isGenerating && (
          <>
            {/* Header */}
            <div
              className="px-6 py-5 border-b"
              style={{ borderColor: '#E2DFEF', background: 'linear-gradient(135deg, rgba(124,58,237,0.04), rgba(249,115,22,0.03))' }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Animated logo */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center animate-pulse"
                    style={{ background: 'linear-gradient(135deg, #7C3AED, #F97316)' }}
                  >
                    <Sparkles size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-base font-700" style={{ fontWeight: 700, color: '#14121F' }}>
                      Your Website is Being Created
                    </p>
                    <p className="text-sm" style={{ color: '#9A96B0' }}>
                      You can leave and come here later when it's finished, don't close this window on your browser ☺️
                    </p>
                  </div>
                </div>
                {charCount > 0 && (
                  <span className="text-xs font-mono" style={{ color: '#9A96B0' }}>
                    {charCount.toLocaleString()} chars
                  </span>
                )}
              </div>

              {/* Progress bar */}
              <div className="mt-4 h-1.5 rounded-full overflow-hidden" style={{ background: '#F3F2FA' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #7C3AED, #F97316, #EF4444)' }}
                  animate={{ width: status === 'streaming' ? '75%' : '35%' }}
                  transition={{ duration: 1.5, ease: 'easeInOut' }}
                />
              </div>
            </div>

            {/* Process log */}
            <div className="px-6 py-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Clock size={13} style={{ color: '#9A96B0' }} />
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#9A96B0' }}>
                    Process Log
                  </span>
                </div>
                <button
                  onClick={() => setShowLog((s) => !s)}
                  className="flex items-center gap-1 text-xs transition-colors"
                  style={{ color: '#9A96B0' }}
                >
                  {showLog ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                  {showLog ? 'Hide' : 'Show'}
                </button>
              </div>

              <AnimatePresence>
                {showLog && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div
                      ref={logRef}
                      className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1"
                    >
                      {processLog.map((msg, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex items-start gap-2.5 text-sm py-1.5 px-3 rounded-xl"
                          style={{ background: '#F8F7FF', border: '1px solid #E2DFEF' }}
                        >
                          <span>{msg}</span>
                        </motion.div>
                      ))}
                      {processLog.length === 0 && (
                        <div
                          className="flex items-center gap-2 text-sm py-1.5 px-3 rounded-xl"
                          style={{ background: '#F8F7FF', border: '1px solid #E2DFEF', color: '#9A96B0' }}
                        >
                          <div
                            className="w-3 h-3 border-2 rounded-full animate-spin flex-shrink-0"
                            style={{ borderColor: 'rgba(124,58,237,0.2)', borderTopColor: '#7C3AED' }}
                          />
                          Initializing AI generation…
                        </div>
                      )}
                      {/* Typing indicator */}
                      {status === 'streaming' && (
                        <div
                          className="flex items-center gap-2 text-sm py-1.5 px-3 rounded-xl"
                          style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.18)' }}
                        >
                          <div className="flex gap-1">
                            {[0,1,2].map((i) => (
                              <motion.div
                                key={i}
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ background: '#7C3AED' }}
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.2 }}
                              />
                            ))}
                          </div>
                          <span style={{ color: '#7C3AED', fontWeight: 600 }}>Writing code…</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </>
        )}

        {/* Done state */}
        {isDone && currentWebsite && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-6 py-6"
          >
            {/* Success header */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)' }}
              >
                <CheckCircle2 size={22} style={{ color: '#10B981' }} />
              </div>
              <div>
                <p className="text-base font-700" style={{ fontWeight: 700, color: '#14121F' }}>
                  {userName !== 'there' ? `${userName}, your` : 'Your'} Website is Ready!
                </p>
                <p className="text-sm" style={{ color: '#9A96B0' }}>Come take a look 🎉</p>
              </div>
            </div>

            {/* Website info */}
            <div
              className="p-4 rounded-xl mb-5"
              style={{ background: '#F8F7FF', border: '1px solid #E2DFEF' }}
            >
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#14121F' }}>{currentWebsite.name}</p>
                  <p className="text-xs mt-0.5 font-mono" style={{ color: '#9A96B0' }}>
                    {charCount.toLocaleString()} chars · {streamedCode.split('\n').length.toLocaleString()} lines
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => onPreview(currentWebsite.id)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg, #7C3AED, #F97316)', boxShadow: '0 4px 16px rgba(124,58,237,0.30)' }}
                >
                  <Eye size={14} />
                  Open Preview
                </motion.button>
              </div>
            </div>

            {/* Process log (collapsed summary) */}
            <div>
              <button
                onClick={() => setShowLog((s) => !s)}
                className="flex items-center gap-2 text-xs font-semibold mb-2 transition-colors"
                style={{ color: '#9A96B0' }}
              >
                {showLog ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                {showLog ? 'Hide' : 'Show'} build log
              </button>
              {showLog && (
                <div className="flex flex-col gap-1.5 max-h-40 overflow-y-auto">
                  {processLog.map((msg, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs py-1.5 px-3 rounded-lg"
                      style={{ background: '#F8F7FF', border: '1px solid #E2DFEF', color: '#4A4660' }}
                    >
                      <CheckCircle2 size={11} style={{ color: '#10B981', flexShrink: 0 }} />
                      {msg.replace(/^[^\s]+\s/, '')} {/* strip emoji */}
                      {msg}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Error state */}
        {isError && (
          <div className="flex items-start gap-3 p-6">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(239,68,68,0.10)', border: '1px solid rgba(239,68,68,0.20)' }}
            >
              <AlertCircle size={18} style={{ color: '#EF4444' }} />
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: '#EF4444' }}>Generation Failed</p>
              <p className="text-xs mt-1" style={{ color: '#9A96B0' }}>{errorMessage}</p>
            </div>
          </div>
        )}
      </motion.div>

      {/* ── AI Summary Chat Bubble ── */}
      <AnimatePresence>
        {(summaryStatus === 'generating' || summaryStatus === 'done') && summaryMessage && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="flex items-start gap-3"
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: 'rgba(124,58,237,0.10)', border: '1px solid rgba(124,58,237,0.20)' }}
            >
              <Bot size={15} style={{ color: '#7C3AED' }} />
            </div>

            <div
              className="flex-1 rounded-2xl rounded-tl-sm px-5 py-4"
              style={{ background: '#fff', border: '1px solid #E2DFEF', boxShadow: '0 2px 12px rgba(60,40,120,0.07)' }}
            >
              <div className="flex items-center gap-1.5 mb-3">
                <Sparkles size={11} style={{ color: '#7C3AED' }} />
                <span className="text-xs font-700 uppercase tracking-wider" style={{ fontWeight: 700, color: '#7C3AED' }}>
                  Alsytes
                </span>
                {summaryStatus === 'generating' && (
                  <div className="flex gap-1 ml-1">
                    {[0,1,2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: '#7C3AED', opacity: 0.4 }}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div
                ref={summaryRef}
                className="text-sm leading-relaxed overflow-y-auto"
                style={{ maxHeight: 300, color: '#4A4660' }}
                dangerouslySetInnerHTML={{ __html: renderMarkdown(summaryMessage) }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Summary skeleton */}
      <AnimatePresence>
        {summaryStatus === 'generating' && !summaryMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-start gap-3"
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: 'rgba(124,58,237,0.10)', border: '1px solid rgba(124,58,237,0.20)' }}
            >
              <Bot size={15} style={{ color: '#7C3AED' }} />
            </div>
            <div
              className="flex-1 rounded-2xl rounded-tl-sm px-5 py-4"
              style={{ background: '#fff', border: '1px solid #E2DFEF' }}
            >
              <div className="flex items-center gap-1.5 mb-3">
                <Sparkles size={11} style={{ color: '#7C3AED' }} />
                <span className="text-xs font-700 uppercase tracking-wider" style={{ fontWeight: 700, color: '#7C3AED' }}>
                  Alsytes
                </span>
              </div>
              <div className="flex flex-col gap-2">
                {[68, 88, 52, 78].map((w, i) => (
                  <div key={i} className="shimmer h-2.5 rounded-full" style={{ width: `${w}%`, animationDelay: `${i * 0.12}s` }} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
