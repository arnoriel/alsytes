import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, Check, ArrowLeft, MessageCircle, Copy, CheckCheck, ChevronRight } from 'lucide-react';

// Helper: copy account number button
function CopyAccountButton() {
  const [copiedAcc, setCopiedAcc] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText('507629556847');
    setCopiedAcc(true);
    setTimeout(() => setCopiedAcc(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
      style={{ background: 'rgba(255,255,255,0.18)', color: '#fff', backdropFilter: 'blur(4px)' }}
      title="Salin nomor rekening"
    >
      {copiedAcc ? <><CheckCheck size={12} /> Tersalin!</> : <><Copy size={12} /> Salin</>}
    </button>
  );
}

// ── Config — ganti dengan nomor WA admin yang sebenarnya ──────────
const ADMIN_WA_NUMBER = '6288272264011'; // format: 62 + nomor tanpa 0 depan

export interface CreditPackage {
  id: string;
  name: string;
  credits: number;
  price: number;
  pricePerCredit: number;
  badge?: string;
  badgeColor?: string;
  target: string;
  highlight: boolean;
}

export const CREDIT_PACKAGES: CreditPackage[] = [
  {
    id: 'starter',
    name: 'Starter',
    credits: 1,
    price: 25000,
    pricePerCredit: 25000,
    target: 'Baru mau coba-coba',
    highlight: false,
  },
  {
    id: 'growth',
    name: 'Growth',
    credits: 5,
    price: 100000,
    pricePerCredit: 20000,
    badge: 'Most Popular',
    badgeColor: '#7C3AED',
    target: 'UMKM & individu aktif',
    highlight: true,
  },
  {
    id: 'agency',
    name: 'Agency',
    credits: 15,
    price: 240000,
    pricePerCredit: 16000,
    badge: 'Best Value',
    badgeColor: '#10B981',
    target: 'Freelancer & Agency',
    highlight: false,
  },
];

function formatRupiah(n: number) {
  return 'Rp' + n.toLocaleString('id-ID');
}

type Step = 'select' | 'payment';

interface TopUpModalProps {
  open: boolean;
  onClose: () => void;
  /** Jika sudah ada pilihan paket dari luar (misalnya dari landing page) */
  preselectedPackage?: CreditPackage | null;
}

export default function TopUpModal({ open, onClose, preselectedPackage }: TopUpModalProps) {
  const [step, setStep] = useState<Step>(preselectedPackage ? 'payment' : 'select');
  const [selected, setSelected] = useState<CreditPackage | null>(preselectedPackage ?? null);
  const [copied, setCopied] = useState(false);

  const handleSelectPackage = (pkg: CreditPackage) => {
    setSelected(pkg);
    setStep('payment');
  };

  const handleBack = () => {
    setStep('select');
    setSelected(null);
  };

  const handleClose = () => {
    onClose();
    // Reset after animation
    setTimeout(() => {
      setStep(preselectedPackage ? 'payment' : 'select');
      setSelected(preselectedPackage ?? null);
      setCopied(false);
    }, 300);
  };

  const handleWhatsApp = () => {
    if (!selected) return;
    const msg = encodeURIComponent(
      `Halo Admin Alsytes! Saya sudah transfer untuk paket *${selected.name}* (${selected.credits} Credits) sebesar *${formatRupiah(selected.price)}*.\n\nMohon konfirmasi penambahan credits ke akun saya. Terima kasih!`
    );
    window.open(`https://wa.me/${ADMIN_WA_NUMBER}?text=${msg}`, '_blank');
  };

  const handleCopyPrice = async () => {
    if (!selected) return;
    await navigator.clipboard.writeText(selected.price.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="topup-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] flex items-center justify-center px-4"
          style={{ background: 'rgba(20, 18, 31, 0.60)', backdropFilter: 'blur(8px)' }}
          onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
        >
          <motion.div
            key="topup-modal"
            initial={{ opacity: 0, scale: 0.93, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 20 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            className="relative w-full rounded-3xl overflow-hidden"
            style={{
              background: '#fff',
              boxShadow: '0 28px 72px rgba(60, 40, 120, 0.22)',
              maxWidth: step === 'select' ? 560 : 420,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center z-10 transition-colors hover:bg-gray-100"
              style={{ color: '#9A96B0' }}
            >
              <X size={15} />
            </button>

            {/* ── STEP: SELECT PACKAGE ─────────────────────────── */}
            <AnimatePresence mode="wait">
              {step === 'select' && (
                <motion.div
                  key="select"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.22 }}
                >
                  {/* Header */}
                  <div
                    className="px-7 pt-8 pb-6 text-center"
                    style={{
                      background: 'linear-gradient(160deg, rgba(124,58,237,0.06) 0%, rgba(249,115,22,0.04) 100%)',
                      borderBottom: '1px solid #E2DFEF',
                    }}
                  >
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                      style={{
                        background: 'linear-gradient(135deg, #7C3AED, #F97316)',
                        boxShadow: '0 8px 24px rgba(124,58,237,0.28)',
                      }}
                    >
                      <Zap size={24} className="text-white" fill="white" />
                    </div>
                    <h2 className="text-xl mb-1" style={{ fontWeight: 800, color: '#14121F' }}>
                      Top Up Credits
                    </h2>
                    <p className="text-sm" style={{ color: '#9A96B0' }}>
                      Pilih paket yang sesuai kebutuhanmu
                    </p>
                  </div>

                  {/* Packages */}
                  <div className="p-6 flex flex-col gap-3">
                    {CREDIT_PACKAGES.map((pkg) => (
                      <motion.button
                        key={pkg.id}
                        whileHover={{ scale: 1.015, y: -1 }}
                        whileTap={{ scale: 0.985 }}
                        onClick={() => handleSelectPackage(pkg)}
                        className="relative w-full p-4 rounded-2xl border text-left transition-all flex items-center gap-4"
                        style={{
                          background: pkg.highlight
                            ? 'linear-gradient(135deg, rgba(124,58,237,0.06), rgba(249,115,22,0.04))'
                            : '#FAFAFA',
                          border: pkg.highlight ? '1.5px solid rgba(124,58,237,0.30)' : '1.5px solid #E2DFEF',
                          boxShadow: pkg.highlight ? '0 4px 20px rgba(124,58,237,0.10)' : 'none',
                        }}
                      >
                        {/* Badge */}
                        {pkg.badge && (
                          <div
                            className="absolute -top-2.5 left-4 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white"
                            style={{ background: pkg.badgeColor }}
                          >
                            {pkg.badge}
                          </div>
                        )}

                        {/* Icon */}
                        <div
                          className="w-12 h-12 rounded-xl flex flex-col items-center justify-center flex-shrink-0"
                          style={{
                            background: pkg.highlight
                              ? 'linear-gradient(135deg, #7C3AED, #F97316)'
                              : 'rgba(124,58,237,0.08)',
                            border: pkg.highlight ? 'none' : '1px solid rgba(124,58,237,0.15)',
                          }}
                        >
                          <span
                            className="text-lg font-black leading-none"
                            style={{ color: pkg.highlight ? '#fff' : '#7C3AED' }}
                          >
                            {pkg.credits}
                          </span>
                          <span
                            className="text-[8px] font-semibold uppercase tracking-wide"
                            style={{ color: pkg.highlight ? 'rgba(255,255,255,0.8)' : '#9A96B0' }}
                          >
                            cr
                          </span>
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-2 flex-wrap">
                            <span className="text-base font-bold" style={{ color: '#14121F' }}>
                              {pkg.name}
                            </span>
                            <span className="text-xs font-medium" style={{ color: '#9A96B0' }}>
                              {pkg.credits} Credit{pkg.credits > 1 ? 's' : ''}
                            </span>
                          </div>
                          <p className="text-xs mt-0.5" style={{ color: '#9A96B0' }}>{pkg.target}</p>
                          <p className="text-[10px] mt-1" style={{ color: '#B0ACCC' }}>
                            {formatRupiah(pkg.pricePerCredit)} / credit
                          </p>
                        </div>

                        {/* Price */}
                        <div className="text-right flex-shrink-0 flex items-center gap-2">
                          <div>
                            <p className="text-base font-bold" style={{ color: pkg.highlight ? '#7C3AED' : '#14121F' }}>
                              {formatRupiah(pkg.price)}
                            </p>
                          </div>
                          <ChevronRight size={16} style={{ color: '#C4BFDB' }} />
                        </div>
                      </motion.button>
                    ))}

                    <p className="text-center text-xs mt-1" style={{ color: '#9A96B0' }}>
                      Credits gratis 3/bulan tetap berlaku. Top up tidak menggantikan free credits.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* ── STEP: PAYMENT / QR ──────────────────────────── */}
              {step === 'payment' && selected && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.22 }}
                >
                  {/* Header */}
                  <div
                    className="px-6 pt-6 pb-5 flex items-center gap-3"
                    style={{ borderBottom: '1px solid #E2DFEF' }}
                  >
                    {!preselectedPackage && (
                      <button
                        onClick={handleBack}
                        className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors hover:bg-gray-100"
                        style={{ color: '#9A96B0' }}
                      >
                        <ArrowLeft size={16} />
                      </button>
                    )}
                    <div className="flex-1">
                      <h2 className="text-base font-bold" style={{ color: '#14121F' }}>
                        Pembayaran — Paket {selected.name}
                      </h2>
                      <p className="text-xs" style={{ color: '#9A96B0' }}>
                        {selected.credits} Credit{selected.credits > 1 ? 's' : ''} · {formatRupiah(selected.price)}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 py-5 flex flex-col gap-5">
                    {/* Bank Account Info */}
                    <div className="flex flex-col gap-3">
                      {/* Bank card */}
                      <div
                        className="w-full rounded-2xl p-5"
                        style={{
                          background: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)',
                          boxShadow: '0 8px 24px rgba(124,58,237,0.30)',
                        }}
                      >
                        <p className="text-xs font-semibold mb-3" style={{ color: 'rgba(255,255,255,0.65)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                          Transfer ke rekening
                        </p>
                        <p className="text-sm font-bold mb-1" style={{ color: 'rgba(255,255,255,0.85)' }}>
                          Bank Jago Syari'ah
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <p className="text-2xl font-black tracking-widest" style={{ color: '#fff', letterSpacing: '0.12em' }}>
                            507629556847
                          </p>
                          <CopyAccountButton />
                        </div>
                      </div>

                      {/* Transfer amount */}
                      <div
                        className="w-full px-4 py-3 rounded-2xl text-center"
                        style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.18)' }}
                      >
                        <p className="text-sm font-semibold" style={{ color: '#14121F' }}>
                          Transfer tepat sejumlah
                        </p>
                        <div className="flex items-center justify-center gap-2 mt-1">
                          <p className="text-xl font-black" style={{ color: '#7C3AED' }}>
                            {formatRupiah(selected.price)}
                          </p>
                          <button
                            onClick={handleCopyPrice}
                            className="w-6 h-6 rounded-lg flex items-center justify-center transition-colors"
                            style={{ background: 'rgba(124,58,237,0.12)', color: '#7C3AED' }}
                            title="Salin nominal"
                          >
                            {copied ? <CheckCheck size={11} /> : <Copy size={11} />}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Steps */}
                    <div className="flex flex-col gap-2.5">
                      {[
                        { n: '1', text: 'Transfer ke no. rekening di atas tepat sesuai nominal' },
                        { n: '2', text: 'Setelah transfer, kirim screenshot bukti pembayaran via WhatsApp' },
                        { n: '3', text: 'Tunggu konfirmasi admin — credits akan ditambahkan segera' },
                      ].map((s) => (
                        <div key={s.n} className="flex items-start gap-3">
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 mt-0.5"
                            style={{ background: 'linear-gradient(135deg, #7C3AED, #F97316)' }}
                          >
                            {s.n}
                          </div>
                          <p className="text-sm leading-relaxed" style={{ color: '#4A4660' }}>{s.text}</p>
                        </div>
                      ))}
                    </div>

                    {/* WhatsApp CTA */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleWhatsApp}
                      className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl text-sm font-bold text-white"
                      style={{
                        background: 'linear-gradient(135deg, #25D366, #128C7E)',
                        boxShadow: '0 6px 20px rgba(37,211,102,0.30)',
                      }}
                    >
                      <MessageCircle size={17} fill="white" />
                      Transfer Payment Proof via WhatsApp
                    </motion.button>

                    {/* Info */}
                    <div
                      className="flex items-start gap-2.5 px-4 py-3 rounded-xl"
                      style={{ background: '#F8F7FF', border: '1px solid #E2DFEF' }}
                    >
                      <Check size={13} className="flex-shrink-0 mt-0.5" style={{ color: '#10B981' }} />
                      <p className="text-xs leading-relaxed" style={{ color: '#9A96B0' }}>
                        Credits akan langsung aktif setelah admin mengkonfirmasi pembayaranmu.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}