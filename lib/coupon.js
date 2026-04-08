export function getCouponDiscountAmount(total, coupon) {
  const safeTotal = Number(total);
  const baseTotal = Number.isFinite(safeTotal) ? safeTotal : 0;

  if (!coupon || baseTotal <= 0) {
    return 0;
  }

  const rawDiscount = Number(coupon.discount);
  if (!Number.isFinite(rawDiscount) || rawDiscount <= 0) {
    return 0;
  }

  const discountType = String(coupon.discount_type || "").toLowerCase();

  if (discountType === "percentage") {
    const amount = (baseTotal * rawDiscount) / 100;
    return Number(Math.min(baseTotal, amount).toFixed(2));
  }

  return Number(Math.min(baseTotal, rawDiscount).toFixed(2));
}

export function getCouponAdjustedTotal(total, coupon) {
  const safeTotal = Number(total);
  const baseTotal = Number.isFinite(safeTotal) ? safeTotal : 0;
  const discountAmount = getCouponDiscountAmount(baseTotal, coupon);

  return {
    totalBeforeDiscount: Number(baseTotal.toFixed(2)),
    discountAmount,
    totalAfterDiscount: Number(Math.max(0, baseTotal - discountAmount).toFixed(2)),
  };
}
