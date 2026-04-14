import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { getUserCredits, initializeCredits, deductCredit, type UserCredits } from '../lib/credits';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  credits: number | null;
  creditsLoading: boolean;
  refreshCredits: () => Promise<void>;
  consumeCredit: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  credits: null,
  creditsLoading: true,
  refreshCredits: async () => {},
  consumeCredit: async () => false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [credits, setCredits] = useState<number | null>(null);
  const [creditsLoading, setCreditsLoading] = useState(true);

  const refreshCredits = useCallback(async () => {
    setCreditsLoading(true);
    const data: UserCredits | null = await getUserCredits();
    setCredits(data?.credits ?? null);
    setCreditsLoading(false);
  }, []);

  const consumeCredit = useCallback(async (): Promise<boolean> => {
    if (credits === null || credits <= 0) return false;
    const newCount = await deductCredit();
    if (newCount === null) return false;
    setCredits(newCount);
    return true;
  }, [credits]);

  useEffect(() => {
    if (user) {
      initializeCredits().then((data) => {
        setCredits(data?.credits ?? null);
        setCreditsLoading(false);
      });
    } else {
      setCredits(null);
      setCreditsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, session, loading, credits, creditsLoading, refreshCredits, consumeCredit }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
