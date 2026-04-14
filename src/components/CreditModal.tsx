import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, X, Sparkles } from 'lucide-react';
import TopUpModal from './TopUpModal';

interface CreditModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CreditModal({ open, onClose }: CreditModalProps) {
  const [topUpOpen, setTopUpOpen] = useState(false);

  const handleTopUp = () => {
    onClose();
    setTimeout(() => setTopUpOpen(true), 200);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            key="credit-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{ background: 'rgba(20, 18, 31, 0.55)', backdropFilter: 'blur(6px)' }}
            onClick={onClose}
          >
            <motion.div
              key="credit-modal"
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ type: 'spring', stiffness: 340, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm rounded-3xl overflow-hidden"
              style={{
                background: '#fff',
                boxShadow: '0 24px 64px rgba(60, 40, 120, 0.18)',
              }}
            >
              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100 z-10"
                style={{ color: '#9A96B0' }}
              >
                <X size={14} />
              </button>

              {/* Header */}
              <div
                className="px-8 pt-10 pb-8 flex flex-col items-center text-center"
                style={{
                  background: 'linear-gradient(160deg, rgba(124,58,237,0.06) 0%, rgba(249,115,22,0.04) 100%)',
                  borderBottom: '1px solid #E2DFEF',
                }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
                  style={{
                    background: 'linear-gradient(135deg, #7C3AED, #F97316)',
                    boxShadow: '0 8px 24px rgba(124,58,237,0.30)',
                  }}
                >
                  <Zap size={28} className="text-white" fill="white" />
                </div>
                <h2 className="text-xl mb-2" style={{ fontWeight: 800, color: '#14121F' }}>
                  Your Credits are Empty
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: '#9A96B0' }}>
                  Kamu telah menggunakan semua credits bulan ini.
                  <br />
                  Credits gratis reset otomatis setiap{' '}
                  <strong style={{ color: '#7C3AED' }}>tanggal 1 tiap bulan</strong>.
                </p>
              </div>

              {/* Body */}
              <div className="px-8 py-6 flex flex-col gap-4">
                <div
                  className="p-4 rounded-2xl flex items-start gap-3"
                  style={{ background: '#F8F7FF', border: '1px solid #E2DFEF' }}
                >
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(124,58,237,0.10)', border: '1px solid rgba(124,58,237,0.20)' }}
                  >
                    <Sparkles size={14} style={{ color: '#7C3AED' }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-0.5" style={{ color: '#14121F' }}>
                      3 Free Credits / Bulan
                    </p>
                    <p className="text-xs leading-relaxed" style={{ color: '#9A96B0' }}>
                      Setiap pembuatan website = 1 credit. Edit via AI selalu gratis.
                    </p>
                  </div>
                </div>

                {/* Top Up CTA */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleTopUp}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-sm font-bold text-white"
                  style={{
                    background: 'linear-gradient(135deg, #7C3AED, #F97316)',
                    boxShadow: '0 6px 20px rgba(124,58,237,0.28)',
                  }}
                >
                  <Zap size={15} fill="white" />
                  Top Up Credits Sekarang
                </motion.button>

                <button
                  onClick={onClose}
                  className="text-xs text-center transition-opacity hover:opacity-70"
                  style={{ color: '#9A96B0' }}
                >
                  Tunggu reset gratis bulan depan
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TopUp Modal — opens after CreditModal closes */}
      <TopUpModal open={topUpOpen} onClose={() => setTopUpOpen(false)} />
    </>
  );
}
