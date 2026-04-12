import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/', { replace: true });
      } else {
        navigate('/login', { replace: true });
      }
    });
  }, [navigate]);

  return (
    <div
      className="flex items-center justify-center h-screen"
      style={{ background: '#F8F7FF', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
    >
      <div className="flex flex-col items-center gap-5">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #7C3AED, #F97316)' }}
        >
          <Sparkles size={22} className="text-white" />
        </div>
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-8 h-8 border-2 rounded-full animate-spin"
            style={{ borderColor: 'rgba(124,58,237,0.25)', borderTopColor: '#7C3AED' }}
          />
          <p className="text-sm font-medium" style={{ color: '#9A96B0' }}>Verifying your account…</p>
        </div>
      </div>
    </div>
  );
}
