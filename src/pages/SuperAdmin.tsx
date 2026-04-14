import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, CreditCard, Search, Plus, Minus, RefreshCw,
  CheckCircle, XCircle, TrendingUp, Calendar, DollarSign,
  Edit3, Save, X, AlertCircle, BarChart2,
  Trash2, PlusCircle
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// ── Service role client — bypasses RLS ────────────────────────────
// Tambahkan VITE_SUPABASE_SERVICE_KEY di .env kamu
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const serviceKey = import.meta.env.VITE_SUPABASE_SERVICE_KEY as string;

if (!serviceKey) {
  console.warn('[SuperAdmin] VITE_SUPABASE_SERVICE_KEY belum diset!');
}

const adminClient = createClient(supabaseUrl, serviceKey || '', {
  auth: { persistSession: false, autoRefreshToken: false },
});

// ── Types ──────────────────────────────────────────────────────────
interface UserCredit {
  id: string;
  user_id: string;
  credits: number;
  reset_at: string;
  created_at: string;
  updated_at: string;
  email?: string;
  display_name?: string;
  avatar_url?: string;
}

interface RevenueEntry {
  id: string;
  month: string; // "YYYY-MM"
  amount: number;
  note: string;
  createdAt: string;
}

type Toast = { id: string; message: string; type: 'success' | 'error' };

// ── LocalStorage helpers ───────────────────────────────────────────
const REVENUE_KEY = 'superadmin_revenue_entries';

function loadRevenue(): RevenueEntry[] {
  try {
    return JSON.parse(localStorage.getItem(REVENUE_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveRevenue(entries: RevenueEntry[]) {
  localStorage.setItem(REVENUE_KEY, JSON.stringify(entries));
}

// ── Utility ────────────────────────────────────────────────────────
function fmtDate(iso: string) {
  return new Date(iso).toLocaleString('id-ID', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function monthLabel(ym: string) {
  const [y, m] = ym.split('-');
  return new Date(+y, +m - 1, 1).toLocaleString('id-ID', { month: 'long', year: 'numeric' });
}

function currentMonth() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

// ══════════════════════════════════════════════════════════════════
export default function SuperAdmin() {
  // ── Users & credits state ──────────────────────────────────────
  const [users, setUsers] = useState<UserCredit[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<string | null>(null); // user_id
  const [editValue, setEditValue] = useState('');
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [saving, setSaving] = useState<string | null>(null);

  // ── Revenue state ──────────────────────────────────────────────
  const [revenueEntries, setRevenueEntries] = useState<RevenueEntry[]>(loadRevenue);
  const [activeTab, setActiveTab] = useState<'credits' | 'revenue'>('credits');
  const [newRevMonth, setNewRevMonth] = useState(currentMonth());
  const [newRevAmount, setNewRevAmount] = useState('');
  const [newRevNote, setNewRevNote] = useState('');
  const [addingRev, setAddingRev] = useState(false);

  // ── Toast helpers ──────────────────────────────────────────────
  const toast = useCallback((message: string, type: 'success' | 'error') => {
    const id = Math.random().toString(36).slice(2);
    setToasts(t => [...t, { id, message, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000);
  }, []);

  // ── Fetch all users with credits ───────────────────────────────
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch credits data
      const { data: credits, error } = await adminClient
        .from('user_credits')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;

      // Fetch auth users list via Admin API (requires service_role key)
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
      const serviceKey = import.meta.env.VITE_SUPABASE_SERVICE_KEY as string;

      let authUsersMap: Record<string, { email: string; display_name: string; avatar_url: string }> = {};
      try {
        const res = await fetch(`${supabaseUrl}/auth/v1/admin/users?per_page=1000`, {
          headers: {
            'apikey': serviceKey,
            'Authorization': `Bearer ${serviceKey}`,
          },
        });
        if (res.ok) {
          const json = await res.json();
          const authUsers = json.users || [];
          for (const u of authUsers) {
            authUsersMap[u.id] = {
              email: u.email || '',
              display_name: u.user_metadata?.full_name || u.user_metadata?.name || '',
              avatar_url: u.user_metadata?.avatar_url || '',
            };
          }
        }
      } catch (authErr) {
        console.warn('Tidak bisa fetch auth users:', authErr);
      }

      const enriched: UserCredit[] = (credits || []).map((c: UserCredit) => ({
        ...c,
        email: authUsersMap[c.user_id]?.email,
        display_name: authUsersMap[c.user_id]?.display_name,
        avatar_url: authUsersMap[c.user_id]?.avatar_url,
      }));

      setUsers(enriched);
    } catch (e) {
      toast('Gagal memuat data users: ' + (e as Error).message, 'error');
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  // ── Credit operations ──────────────────────────────────────────
  async function adjustCredits(user: UserCredit, delta: number) {
    const newVal = Math.max(0, user.credits + delta);
    await applyCredits(user.user_id, newVal);
  }

  async function applyPreset(user: UserCredit, val: number) {
    await applyCredits(user.user_id, user.credits + val);
  }

  async function applyCredits(userId: string, newCredits: number) {
    setSaving(userId);
    try {
      const { error } = await adminClient
        .from('user_credits')
        .update({ credits: newCredits, updated_at: new Date().toISOString() })
        .eq('user_id', userId);
      if (error) throw error;
      setUsers(u => u.map(x => x.user_id === userId ? { ...x, credits: newCredits } : x));
      toast(`Credits diupdate ke ${newCredits}`, 'success');
    } catch (e) {
      toast('Gagal update: ' + (e as Error).message, 'error');
    } finally {
      setSaving(null);
      setEditing(null);
    }
  }

  async function saveEdit(user: UserCredit) {
    const val = parseInt(editValue);
    if (isNaN(val) || val < 0) { toast('Nilai tidak valid', 'error'); return; }
    await applyCredits(user.user_id, val);
  }

  // ── Revenue helpers ────────────────────────────────────────────
  function addRevEntry() {
    const amt = parseFloat(newRevAmount);
    if (!newRevMonth || isNaN(amt)) { toast('Isi bulan & jumlah dulu', 'error'); return; }
    const entry: RevenueEntry = {
      id: Math.random().toString(36).slice(2),
      month: newRevMonth,
      amount: amt,
      note: newRevNote.trim(),
      createdAt: new Date().toISOString(),
    };
    const updated = [...revenueEntries, entry].sort((a, b) => b.month.localeCompare(a.month));
    setRevenueEntries(updated);
    saveRevenue(updated);
    setNewRevAmount('');
    setNewRevNote('');
    setAddingRev(false);
    toast('Catatan pendapatan ditambahkan', 'success');
  }

  function deleteRevEntry(id: string) {
    const updated = revenueEntries.filter(e => e.id !== id);
    setRevenueEntries(updated);
    saveRevenue(updated);
    toast('Catatan dihapus', 'success');
  }

  // Group revenue by month
  const revenueByMonth: Record<string, { total: number; entries: RevenueEntry[] }> = {};
  for (const e of revenueEntries) {
    if (!revenueByMonth[e.month]) revenueByMonth[e.month] = { total: 0, entries: [] };
    revenueByMonth[e.month].total += e.amount;
    revenueByMonth[e.month].entries.push(e);
  }
  const sortedMonths = Object.keys(revenueByMonth).sort((a, b) => b.localeCompare(a));
  const totalRevenue = revenueEntries.reduce((s, e) => s + e.amount, 0);

  // Filtered users
  const filtered = users.filter(u =>
    u.user_id.toLowerCase().includes(search.toLowerCase()) ||
    (u.email || '').toLowerCase().includes(search.toLowerCase()) ||
    (u.display_name || '').toLowerCase().includes(search.toLowerCase())
  );

  // ── Render ─────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-mono">
      {/* Toasts */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map(t => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 60 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium shadow-lg border ${
                t.type === 'success'
                  ? 'bg-emerald-950 border-emerald-700 text-emerald-300'
                  : 'bg-red-950 border-red-700 text-red-300'
              }`}
            >
              {t.type === 'success' ? <CheckCircle size={14} /> : <XCircle size={14} />}
              {t.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Header */}
      <div className="border-b border-white/10 bg-[#0d0d15]">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-violet-600 rounded flex items-center justify-center">
              <span className="text-xs font-bold">SA</span>
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-widest text-white uppercase">
                Superadmin Panel
              </h1>
              <p className="text-[10px] text-white/30 tracking-wider">/management/superadmin</p>
            </div>
          </div>
          <button
            onClick={fetchUsers}
            className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/80 transition-colors"
          >
            <RefreshCw size={12} />
            Refresh
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-5xl mx-auto px-6 pt-6">
        <div className="flex gap-1 bg-white/5 p-1 rounded-lg w-fit mb-6">
          {([
            { key: 'credits', label: 'User Credits', icon: CreditCard },
            { key: 'revenue', label: 'Pendapatan Bulanan', icon: TrendingUp },
          ] as const).map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs font-medium transition-all ${
                activeTab === tab.key
                  ? 'bg-violet-600 text-white'
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              <tab.icon size={13} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── CREDITS TAB ────────────────────────────────────────────── */}
        {activeTab === 'credits' && (
          <div>
            {/* Stats bar */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { label: 'Total Users', value: users.length, icon: Users, color: 'text-blue-400' },
                { label: 'Total Credits', value: users.reduce((s, u) => s + u.credits, 0), icon: CreditCard, color: 'text-violet-400' },
                { label: 'Avg Credits', value: users.length ? (users.reduce((s, u) => s + u.credits, 0) / users.length).toFixed(1) : 0, icon: BarChart2, color: 'text-emerald-400' },
              ].map(stat => (
                <div key={stat.label} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <stat.icon size={13} className={stat.color} />
                    <span className="text-[10px] text-white/40 uppercase tracking-wider">{stat.label}</span>
                  </div>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Search */}
            <div className="relative mb-4">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Cari nama, email, atau user ID..."
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>

            {/* Users list */}
            {loading ? (
              <div className="flex items-center justify-center py-20 text-white/30 text-sm">
                <RefreshCw size={16} className="animate-spin mr-2" />
                Memuat data...
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20 text-white/20 text-sm">
                <AlertCircle size={24} className="mx-auto mb-2" />
                Tidak ada user ditemukan
              </div>
            ) : (
              <div className="space-y-2 pb-10">
                {filtered.map(user => (
                  <motion.div
                    key={user.user_id}
                    layout
                    className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-white/20 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      {/* User info */}
                      <div className="min-w-0 flex-1 flex items-center gap-3">
                        {/* Avatar */}
                        <div className="flex-shrink-0">
                          {user.avatar_url ? (
                            <img src={user.avatar_url} alt="" className="w-8 h-8 rounded-full object-cover border border-white/10" />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-violet-900/60 border border-violet-700/40 flex items-center justify-center text-xs font-bold text-violet-300">
                              {(user.display_name || user.email || '?')[0].toUpperCase()}
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          {user.display_name && (
                            <p className="text-xs font-semibold text-white/90 truncate">{user.display_name}</p>
                          )}
                          {user.email ? (
                            <p className="text-[11px] text-white/50 truncate">{user.email}</p>
                          ) : (
                            <p className="text-[11px] text-white/20 font-mono truncate">{user.user_id}</p>
                          )}
                          <p className="text-[10px] text-white/20 mt-0.5">
                            Updated {fmtDate(user.updated_at)} · Reset {fmtDate(user.reset_at)}
                          </p>
                        </div>
                      </div>

                      {/* Credits display & edit */}
                      <div className="flex items-center gap-3 flex-shrink-0">
                        {editing === user.user_id ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              min={0}
                              value={editValue}
                              onChange={e => setEditValue(e.target.value)}
                              onKeyDown={e => { if (e.key === 'Enter') saveEdit(user); if (e.key === 'Escape') setEditing(null); }}
                              autoFocus
                              className="w-20 bg-black border border-violet-500 rounded px-2 py-1 text-sm text-white text-center focus:outline-none"
                            />
                            <button onClick={() => saveEdit(user)} className="text-emerald-400 hover:text-emerald-300 transition-colors">
                              <Save size={14} />
                            </button>
                            <button onClick={() => setEditing(null)} className="text-white/30 hover:text-white/60 transition-colors">
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <>
                            <div className="text-right">
                              <span className="text-2xl font-bold text-violet-400">{user.credits}</span>
                              <span className="text-xs text-white/30 ml-1">credits</span>
                            </div>
                            <button
                              onClick={() => { setEditing(user.user_id); setEditValue(String(user.credits)); }}
                              className="text-white/30 hover:text-white/70 transition-colors"
                            >
                              <Edit3 size={13} />
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    {editing !== user.user_id && (
                      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/5">
                        {/* Presets */}
                        <span className="text-[10px] text-white/20 mr-1">Tambah:</span>
                        {[1, 5, 15].map(preset => (
                          <button
                            key={preset}
                            disabled={saving === user.user_id}
                            onClick={() => applyPreset(user, preset)}
                            className="px-2.5 py-1 bg-violet-900/50 hover:bg-violet-700/60 border border-violet-700/50 rounded text-xs text-violet-300 font-medium transition-colors disabled:opacity-40"
                          >
                            +{preset}
                          </button>
                        ))}

                        <div className="flex-1" />

                        {/* Adjust buttons */}
                        <button
                          disabled={saving === user.user_id || user.credits <= 0}
                          onClick={() => adjustCredits(user, -1)}
                          className="w-7 h-7 flex items-center justify-center rounded bg-red-900/40 hover:bg-red-800/60 border border-red-700/40 text-red-400 transition-colors disabled:opacity-30"
                        >
                          <Minus size={11} />
                        </button>
                        <button
                          disabled={saving === user.user_id}
                          onClick={() => adjustCredits(user, +1)}
                          className="w-7 h-7 flex items-center justify-center rounded bg-emerald-900/40 hover:bg-emerald-800/60 border border-emerald-700/40 text-emerald-400 transition-colors disabled:opacity-30"
                        >
                          <Plus size={11} />
                        </button>

                        {saving === user.user_id && (
                          <RefreshCw size={12} className="animate-spin text-white/30" />
                        )}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── REVENUE TAB ────────────────────────────────────────────── */}
        {activeTab === 'revenue' && (
          <div className="pb-10">
            {/* Summary */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign size={13} className="text-emerald-400" />
                  <span className="text-[10px] text-white/40 uppercase tracking-wider">Total Pendapatan</span>
                </div>
                <p className="text-2xl font-bold text-emerald-400">
                  Rp {totalRevenue.toLocaleString('id-ID')}
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar size={13} className="text-blue-400" />
                  <span className="text-[10px] text-white/40 uppercase tracking-wider">Bulan Ini</span>
                </div>
                <p className="text-2xl font-bold text-blue-400">
                  Rp {(revenueByMonth[currentMonth()]?.total ?? 0).toLocaleString('id-ID')}
                </p>
              </div>
            </div>

            {/* Add entry */}
            <div className="mb-6">
              {!addingRev ? (
                <button
                  onClick={() => setAddingRev(true)}
                  className="flex items-center gap-2 text-xs text-violet-400 hover:text-violet-300 border border-dashed border-violet-700/50 hover:border-violet-500 rounded-lg px-4 py-2.5 w-full justify-center transition-colors"
                >
                  <PlusCircle size={13} />
                  Tambah Catatan Pendapatan
                </button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 border border-violet-700/40 rounded-xl p-4 space-y-3"
                >
                  <p className="text-xs font-medium text-violet-300 mb-3">Catatan Baru</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] text-white/30 uppercase tracking-wider block mb-1">Bulan</label>
                      <input
                        type="month"
                        value={newRevMonth}
                        onChange={e => setNewRevMonth(e.target.value)}
                        className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-white/30 uppercase tracking-wider block mb-1">Jumlah (Rp)</label>
                      <input
                        type="number"
                        value={newRevAmount}
                        onChange={e => setNewRevAmount(e.target.value)}
                        placeholder="0"
                        className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-white/20 focus:outline-none focus:border-violet-500 transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] text-white/30 uppercase tracking-wider block mb-1">Catatan (opsional)</label>
                    <input
                      type="text"
                      value={newRevNote}
                      onChange={e => setNewRevNote(e.target.value)}
                      placeholder="e.g. Top up dari user X, subscription..."
                      className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-white/20 focus:outline-none focus:border-violet-500 transition-colors"
                    />
                  </div>
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={addRevEntry}
                      className="flex items-center gap-1.5 px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-lg text-xs font-medium text-white transition-colors"
                    >
                      <Save size={12} />
                      Simpan
                    </button>
                    <button
                      onClick={() => setAddingRev(false)}
                      className="px-4 py-2 text-xs text-white/40 hover:text-white/70 transition-colors"
                    >
                      Batal
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Revenue list grouped by month */}
            {sortedMonths.length === 0 ? (
              <div className="text-center py-20 text-white/20 text-sm">
                <TrendingUp size={24} className="mx-auto mb-2" />
                Belum ada catatan pendapatan
              </div>
            ) : (
              <div className="space-y-4">
                {sortedMonths.map(month => (
                  <div key={month} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <Calendar size={13} className="text-blue-400" />
                        <span className="text-sm font-medium text-white">{monthLabel(month)}</span>
                      </div>
                      <span className="text-sm font-bold text-emerald-400">
                        Rp {revenueByMonth[month].total.toLocaleString('id-ID')}
                      </span>
                    </div>
                    <div className="divide-y divide-white/5">
                      {revenueByMonth[month].entries
                        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
                        .map(entry => (
                          <div key={entry.id} className="flex items-center justify-between px-4 py-2.5 group">
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-white/80 font-medium">
                                Rp {entry.amount.toLocaleString('id-ID')}
                              </p>
                              {entry.note && (
                                <p className="text-[10px] text-white/30 truncate">{entry.note}</p>
                              )}
                              <p className="text-[10px] text-white/20">{fmtDate(entry.createdAt)}</p>
                            </div>
                            <button
                              onClick={() => deleteRevEntry(entry.id)}
                              className="opacity-0 group-hover:opacity-100 text-red-500/60 hover:text-red-400 transition-all ml-3"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}