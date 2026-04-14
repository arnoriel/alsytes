import { Zap } from 'lucide-react';

interface CreditBadgeProps {
  credits: number | null;
  onClick?: () => void;
}

export default function CreditBadge({ credits, onClick }: CreditBadgeProps) {
  if (credits === null) return null;

  const isEmpty = credits === 0;
  const isLow = credits === 1;

  const bg = isEmpty
    ? 'rgba(239,68,68,0.08)'
    : isLow
    ? 'rgba(249,115,22,0.08)'
    : 'rgba(124,58,237,0.08)';

  const border = isEmpty
    ? 'rgba(239,68,68,0.22)'
    : isLow
    ? 'rgba(249,115,22,0.22)'
    : 'rgba(124,58,237,0.22)';

  const color = isEmpty ? '#EF4444' : isLow ? '#F97316' : '#7C3AED';

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all hover:opacity-80"
      style={{
        background: bg,
        border: `1px solid ${border}`,
        color,
        cursor: onClick ? 'pointer' : 'default',
      }}
      title={isEmpty ? 'Out of credits — click to top up' : `${credits} credit${credits !== 1 ? 's' : ''} remaining`}
    >
      <Zap size={11} fill={isEmpty ? '#EF4444' : 'none'} />
      {isEmpty ? 'No Credits' : `${credits} Credit${credits !== 1 ? 's' : ''}`}
    </button>
  );
}
