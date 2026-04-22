"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  CheckCircle2,
  CreditCard,
  MapPin,
  Package,
  Truck,
  UserRound,
} from "lucide-react";

function parseOrderDate(value) {
  if (!value) return null;

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }

  if (typeof value === "string") {
    const customMatch = value.trim().match(
      /^(\d{2})\.(\d{2})\.(\d{4})\s+(\d{2})\.(\d{2})\s*(am|pm)$/i,
    );

    if (customMatch) {
      const [, day, month, year, hourStr, minuteStr, meridiem] = customMatch;
      let hour = Number(hourStr);
      const minute = Number(minuteStr);
      const isPm = meridiem.toLowerCase() === "pm";

      if (hour === 12) {
        hour = isPm ? 12 : 0;
      } else if (isPm) {
        hour += 12;
      }

      const parsed = new Date(Number(year), Number(month) - 1, Number(day), hour, minute);
      return Number.isNaN(parsed.getTime()) ? null : parsed;
    }
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function formatDate(date) {
  if (!date) return "—";

  const parsedDate = parseOrderDate(date);
  if (!parsedDate) return String(date);

  return new Intl.DateTimeFormat("en-AU", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(parsedDate);
}

function formatCurrency(value) {
  const numericValue = Number(value);

  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 2,
  }).format(Number.isFinite(numericValue) ? numericValue : 0);
}

function normalizeAddress(address = {}) {
  if (!address) return null;

  const lines = [
    [address.first_name, address.last_name].filter(Boolean).join(" ").trim(),
    address.email,
    address.phone,
    address.street,
    [address.city, address.state, address.post_code].filter(Boolean).join(", "),
    address.additional_info,
  ].filter(Boolean);

  return lines.length > 0 ? lines : null;
}

function getOrderStatusTone(status) {
  const value = String(status || "").toLowerCase();

  if (value.includes("pending")) return "pending";
  if (value.includes("processing")) return "processing";
  if (value.includes("completed") || value.includes("delivered") || value.includes("paid")) {
    return "success";
  }
  if (value.includes("cancel")) return "cancelled";
  return "default";
}

function StatusBadge({ status }) {
  const tone = getOrderStatusTone(status);

  const classes = {
    pending: "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300",
    processing: "bg-brand-gold/10 text-brand-navy dark:bg-brand-gold/20 dark:text-[#f0ebe3]",
    success: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300",
    cancelled: "bg-red-100 text-red-800 dark:bg-red-500/15 dark:text-red-300",
    default: "bg-brand-pale/70 text-brand-navy dark:bg-brand-gold/25 dark:text-brand-pale",
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${classes[tone]}`}>
      <CheckCircle2 size={13} />
      {status || "Unknown"}
    </span>
  );
}

export default function OrderCard({ order, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="rounded border border-[#e8dfd1] dark:border-[#1c2444] bg-white dark:bg-[#0e1430] p-5 sm:p-6"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-brand-gold">
            Order ID
          </p>
          <h2 className="text-lg font-bold text-brand-navy dark:text-[#f0ebe3] mt-1">
            {order.order_id}
          </h2>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-[#9fa8cc]">
          <CalendarDays size={15} />
          {formatDate(order.ordered_at)}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <StatusBadge status={order.status} />
        <span className="inline-flex items-center gap-1.5 text-sm text-gray-600 dark:text-[#9fa8cc]">
          <CreditCard size={14} />
          Payable {formatCurrency(order.amount_payable)}
        </span>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded border border-[#eee4d4] bg-[#faf8f5] p-4 dark:border-[#1c2444] dark:bg-[#09102a]">
          <div className="flex items-center gap-2 text-sm font-semibold text-brand-navy dark:text-[#f0ebe3]">
            <Package size={15} />
            Order Items
          </div>
          <div className="mt-4 space-y-3">
            {order.order_details.map((item, itemIndex) => (
              <div
                key={`${order.order_id}-${item.product_name}-${itemIndex}`}
                className="rounded bg-white p-4 dark:bg-[#0e1430]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-brand-navy dark:text-[#f0ebe3]">
                      {item.product_name}
                    </h3>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-[#9fa8cc]">
                      {item.product_variant ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-pale/60 px-2.5 py-1 text-brand-navy dark:bg-brand-gold/20 dark:text-[#f0ebe3]">
                          <UserRound size={12} />
                          {item.product_variant}
                        </span>
                      ) : null}
                      <span>Qty: {item.quantity}</span>
                      {item.is_combo ? <span>Combo</span> : null}
                    </div>
                  </div>
                  <p className="font-semibold text-brand-navy dark:text-[#f0ebe3]">
                    {formatCurrency(item.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded border border-[#eee4d4] bg-[#faf8f5] p-4 dark:border-[#1c2444] dark:bg-[#09102a]">
            <div className="flex items-center gap-2 text-sm font-semibold text-brand-navy dark:text-[#f0ebe3]">
              <MapPin size={15} />
              Shipping Address
            </div>
            <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-[#9fa8cc]">
              {normalizeAddress(order.shipping_address)?.map((line) => (
                <p key={line}>{line}</p>
              )) || <p>—</p>}
            </div>
          </div>

          <div className="rounded border border-[#eee4d4] bg-[#faf8f5] p-4 dark:border-[#1c2444] dark:bg-[#09102a]">
            <div className="flex items-center gap-2 text-sm font-semibold text-brand-navy dark:text-[#f0ebe3]">
              <Truck size={15} />
              Charges & Summary
            </div>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between gap-4 text-gray-600 dark:text-[#9fa8cc]">
                <span>Shipping cost</span>
                <span className="font-semibold text-brand-navy dark:text-[#f0ebe3]">
                  {formatCurrency(order.shipping_cost)}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 text-gray-600 dark:text-[#9fa8cc]">
                <span>Coupon discount</span>
                <span className="font-semibold text-brand-navy dark:text-[#f0ebe3]">
                  {order.coupon_discount ? formatCurrency(order.coupon_discount) : "—"}
                </span>
              </div>
              <div className="border-t border-[#e8dfd1] pt-3 flex items-center justify-between gap-4 text-base font-bold text-brand-navy dark:border-[#1c2444] dark:text-[#f0ebe3]">
                <span>Amount payable</span>
                <span>{formatCurrency(order.amount_payable)}</span>
              </div>
            </div>
          </div>

          {order.billing_address ? (
            <div className="rounded-2xl border border-[#eee4d4] bg-[#faf8f5] p-4 dark:border-[#1c2444] dark:bg-[#09102a]">
              <div className="flex items-center gap-2 text-sm font-semibold text-brand-navy dark:text-[#f0ebe3]">
                <CheckCircle2 size={15} />
                Billing Address
              </div>
              <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-[#9fa8cc]">
                {normalizeAddress(order.billing_address)?.map((line) => (
                  <p key={line}>{line}</p>
                )) || <p>—</p>}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
