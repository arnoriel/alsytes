import { supabase } from './supabase';

export interface UserCredits {
  id: string;
  user_id: string;
  credits: number;
  reset_at: string;
  created_at: string;
  updated_at: string;
}

/**
 * Fetch current user's credits.
 * Also handles auto-reset if reset_at has passed (server-side via DB function).
 */
export async function getUserCredits(): Promise<UserCredits | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('user_credits')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (error) {
    // PGRST116 = no row found — create credits for this user
    if (error.code === 'PGRST116') {
      return await initializeCredits();
    }
    console.error('getUserCredits error:', error);
    return null;
  }

  return data;
}

/**
 * Initialize credits for a new user (3 free credits).
 * Safe to call multiple times — uses ON CONFLICT DO NOTHING.
 */
export async function initializeCredits(): Promise<UserCredits | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const nextMonth = new Date();
  nextMonth.setDate(1);
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  nextMonth.setHours(0, 0, 0, 0);

  const { data, error } = await supabase
    .from('user_credits')
    .upsert(
      {
        user_id: user.id,
        credits: 3,
        reset_at: nextMonth.toISOString(),
      },
      { onConflict: 'user_id', ignoreDuplicates: true }
    )
    .select()
    .single();

  if (error) {
    console.error('initializeCredits error:', error);
    // Try fetching existing if upsert fails due to race condition
    const { data: existing } = await supabase
      .from('user_credits')
      .select('*')
      .eq('user_id', user.id)
      .single();
    return existing ?? null;
  }

  return data;
}

/**
 * Deduct 1 credit from the current user.
 * Returns updated credits count, or null on failure.
 */
export async function deductCredit(): Promise<number | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  // Fetch current credits first
  const current = await getUserCredits();
  if (!current || current.credits <= 0) return null;

  const { data, error } = await supabase
    .from('user_credits')
    .update({
      credits: current.credits - 1,
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', user.id)
    .eq('credits', current.credits) // optimistic lock — prevent race condition
    .select('credits')
    .single();

  if (error) {
    console.error('deductCredit error:', error);
    return null;
  }

  return data?.credits ?? null;
}

/**
 * Check if user has available credits.
 */
export async function hasCredits(): Promise<boolean> {
  const credits = await getUserCredits();
  return (credits?.credits ?? 0) > 0;
}
