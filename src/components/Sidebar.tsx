import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe, Trash2, Eye, PanelLeftClose, PanelLeft, X, Layers,
} from 'lucide-react';
import type { Website } from '../types';
import { storage } from '../lib/storage';
import UserMenu from './UserMenu';

interface SidebarProps {
  websites: Website[];
  activeId?: string;
  onSelect: (id: string) => void;
  onPreview: (id: string) => void;
  onDelete: (id: string) => void;
  onRefresh?: () => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export default function Sidebar({
  websites, activeId, onSelect, onPreview, onDelete,
  mobileOpen = false, onMobileClose,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleDelete = async (id: string) => {
    if (confirmDelete === id) {
      await storage.delete(id);
      onDelete(id);
      setConfirmDelete(null);
    } else {
      setConfirmDelete(id);
      setTimeout(() => setConfirmDelete(null), 2500);
    }
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="flex flex-col h-full" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      {/* Header */}
      <div
        className="flex items-center justify-between px-3 py-4 border-b"
        style={{ borderColor: '#E2DFEF' }}
      >
        <AnimatePresence>
          {(!collapsed || isMobile) && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              className="flex items-center gap-2.5"
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(124,58,237,0.10)', border: '1px solid rgba(124,58,237,0.20)' }}
              >
                <Layers size={13} style={{ color: '#7C3AED' }} />
              </div>
              <div>
                <span className="text-sm font-semibold block leading-none" style={{ color: '#14121F' }}>My Projects</span>
                <span className="text-xs block mt-0.5" style={{ color: '#9A96B0' }}>{websites.length} websites</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {isMobile ? (
          <button
            onClick={onMobileClose}
            className="p-1.5 rounded-lg ml-auto transition-colors"
            style={{ color: '#9A96B0' }}
          >
            <X size={16} />
          </button>
        ) : (
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="p-1.5 rounded-lg transition-colors"
            style={{ color: '#9A96B0' }}
          >
            {collapsed ? <PanelLeft size={15} /> : <PanelLeftClose size={15} />}
          </button>
        )}
      </div>

      {/* Website list */}
      <div className="flex-1 overflow-y-auto px-2 py-2 flex flex-col gap-1">
        {websites.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 px-4 text-center">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-2"
              style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.15)' }}
            >
              <Globe size={16} style={{ color: '#7C3AED' }} />
            </div>
            {(!collapsed || isMobile) && (
              <p className="text-xs" style={{ color: '#9A96B0', lineHeight: 1.6 }}>
                Your websites will appear here
              </p>
            )}
          </div>
        ) : (
          websites.map((site) => (
            <div
              key={site.id}
              className="group relative rounded-xl transition-all"
              style={{
                background: activeId === site.id ? 'rgba(124,58,237,0.08)' : 'transparent',
                border: activeId === site.id ? '1px solid rgba(124,58,237,0.20)' : '1px solid transparent',
              }}
              onMouseEnter={() => setHoverId(site.id)}
              onMouseLeave={() => setHoverId(null)}
            >
              <button
                onClick={() => onSelect(site.id)}
                className="w-full flex items-center gap-2.5 px-2.5 py-2.5 rounded-xl text-left"
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={
                    activeId === site.id
                      ? { background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.25)' }
                      : { background: '#F3F2FA', border: '1px solid #E2DFEF' }
                  }
                >
                  <Globe size={12} style={{ color: activeId === site.id ? '#7C3AED' : '#9A96B0' }} />
                </div>

                <AnimatePresence>
                  {(!collapsed || isMobile) && (
                    <motion.div
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="flex-1 min-w-0 overflow-hidden"
                    >
                      <p
                        className="text-xs font-semibold truncate"
                        style={{ color: activeId === site.id ? '#7C3AED' : '#14121F' }}
                      >
                        {site.name}
                      </p>
                      <p className="text-[10px] mt-0.5" style={{ color: '#9A96B0' }}>
                        {formatDate(site.created_at)}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>

              {/* Action buttons */}
              <AnimatePresence>
                {(hoverId === site.id || activeId === site.id) && (!collapsed || isMobile) && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1"
                  >
                    <button
                      onClick={(e) => { e.stopPropagation(); onPreview(site.id); }}
                      className="p-1.5 rounded-lg transition-colors"
                      style={{ background: '#fff', border: '1px solid #E2DFEF', color: '#9A96B0' }}
                      title="Preview"
                    >
                      <Eye size={11} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDelete(site.id); }}
                      className="p-1.5 rounded-lg transition-colors"
                      style={
                        confirmDelete === site.id
                          ? { background: '#FEF2F2', border: '1px solid rgba(239,68,68,0.25)', color: '#EF4444' }
                          : { background: '#fff', border: '1px solid #E2DFEF', color: '#9A96B0' }
                      }
                      title={confirmDelete === site.id ? 'Confirm delete' : 'Delete'}
                    >
                      <Trash2 size={11} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))
        )}
      </div>

      {/* User menu */}
      <div className="border-t p-2" style={{ borderColor: '#E2DFEF' }}>
        <UserMenu collapsed={collapsed && !isMobile} />
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 56 : 220 }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        className="hidden md:flex flex-col flex-shrink-0 h-full border-r overflow-hidden"
        style={{ background: '#fff', borderColor: '#E2DFEF' }}
      >
        <SidebarContent />
      </motion.aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 z-40"
              style={{ background: 'rgba(20,18,31,0.40)' }}
              onClick={onMobileClose}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="md:hidden fixed top-0 left-0 bottom-0 w-64 z-50 border-r"
              style={{ background: '#fff', borderColor: '#E2DFEF' }}
            >
              <SidebarContent isMobile />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
