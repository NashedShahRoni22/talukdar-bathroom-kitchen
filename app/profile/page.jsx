'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, Package, ReceiptText, ShieldCheck } from 'lucide-react';
import PrivateRoute from '@/components/route/PrivateRoute';
import { useApp } from '@/components/context/AppContext';

const fallbackOrders = [
  {
    id: 'ORD-10031',
    date: '2026-03-16',
    status: 'Processing',
    total: 4200,
    items: ['Freestanding Bathtub', 'Brass Towel Ring'],
  },
  {
    id: 'ORD-10012',
    date: '2026-02-22',
    status: 'Delivered',
    total: 1890,
    items: ['Premium Faucet', 'LED Bathroom Mirror'],
  },
];

function formatDate(date) {
  return new Intl.DateTimeFormat('en-AU', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(new Date(date));
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: 0,
  }).format(value);
}

export default function ProfilePage() {
  const { authEmail, logout } = useApp();
  const [orders] = useState(() => {
    if (typeof window === 'undefined') return fallbackOrders;

    try {
      const raw = localStorage.getItem('talukdar-orders');
      if (!raw) return fallbackOrders;

      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed) || parsed.length === 0) return fallbackOrders;

      return parsed.map((order, idx) => ({
        id: order.id || `ORD-${10000 + idx}`,
        date: order.date || new Date().toISOString(),
        status: order.status || 'Placed',
        total: Number(order?.summary?.total || order.total || 0),
        items: Array.isArray(order.items)
          ? order.items.map((item) => item.name).filter(Boolean)
          : [],
      }));
    } catch {
      return fallbackOrders;
    }
  });

  const totalSpent = useMemo(
    () => orders.reduce((sum, order) => sum + Number(order.total || 0), 0),
    [orders]
  );

  return (
    <PrivateRoute>
      <main className="min-h-screen pt-28 pb-14 bg-[#f8f5ef] dark:bg-[#060b20] transition-colors duration-300">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <p className="text-xs font-semibold tracking-[0.24em] uppercase text-brand-gold">My Account</p>
              <h1
                className="mt-2 text-3xl sm:text-4xl font-semibold text-brand-navy dark:text-[#f0ebe3]"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                Profile & Orders
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-[#9fa8cc]">
                Signed in as <span className="font-semibold">{authEmail || 'user@example.com'}</span>
              </p>
            </div>

            <button
              onClick={logout}
              className="self-start md:self-auto px-4 py-2 rounded-lg bg-brand-navy text-white text-sm font-semibold hover:bg-brand-gold transition-colors"
            >
              Logout
            </button>
          </motion.div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-[#e8dfd1] dark:border-[#1c2444] bg-white dark:bg-[#0e1430] p-5">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-brand-pale/60 dark:bg-brand-gold/25">
                <Package size={18} className="text-brand-navy dark:text-brand-pale" />
              </div>
              <p className="mt-3 text-sm text-gray-500 dark:text-[#9fa8cc]">Total Orders</p>
              <p className="text-2xl font-bold text-brand-navy dark:text-[#f0ebe3]">{orders.length}</p>
            </div>

            <div className="rounded-xl border border-[#e8dfd1] dark:border-[#1c2444] bg-white dark:bg-[#0e1430] p-5">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-brand-pale/60 dark:bg-brand-gold/25">
                <ReceiptText size={18} className="text-brand-navy dark:text-brand-pale" />
              </div>
              <p className="mt-3 text-sm text-gray-500 dark:text-[#9fa8cc]">Total Spent</p>
              <p className="text-2xl font-bold text-brand-navy dark:text-[#f0ebe3]">{formatCurrency(totalSpent)}</p>
            </div>

            <div className="rounded-xl border border-[#e8dfd1] dark:border-[#1c2444] bg-white dark:bg-[#0e1430] p-5">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-brand-pale/60 dark:bg-brand-gold/25">
                <ShieldCheck size={18} className="text-brand-navy dark:text-brand-pale" />
              </div>
              <p className="mt-3 text-sm text-gray-500 dark:text-[#9fa8cc]">Account Status</p>
              <p className="text-2xl font-bold text-brand-navy dark:text-[#f0ebe3]">Verified</p>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            {orders.map((order, index) => (
              <motion.article
                key={order.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="rounded-2xl border border-[#e8dfd1] dark:border-[#1c2444] bg-white dark:bg-[#0e1430] p-5 sm:p-6"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-brand-gold">Order ID</p>
                    <h2 className="text-lg font-bold text-brand-navy dark:text-[#f0ebe3] mt-1">{order.id}</h2>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-[#9fa8cc]">
                    <CalendarDays size={15} />
                    {formatDate(order.date)}
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-pale/70 text-brand-navy dark:bg-brand-gold/25 dark:text-brand-pale">
                    {order.status}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-[#9fa8cc]">
                    {order.items.length > 0 ? order.items.join(' • ') : 'Items unavailable'}
                  </span>
                </div>

                <p className="mt-4 text-xl font-bold text-brand-navy dark:text-[#f0ebe3]">
                  {formatCurrency(order.total)}
                </p>
              </motion.article>
            ))}
          </div>
        </section>
      </main>
    </PrivateRoute>
  );
}
