const DEFAULT_ORIGIN_POSTCODE = 2000;
const GST_RATE = 0.10;

function toInt(value) {
  const parsed = Number.parseInt(String(value).trim(), 10);
  return Number.isNaN(parsed) ? null : parsed;
}

export function parseAuPostcode(value) {
  const parsed = toInt(value);
  if (parsed === null) return null;
  if (parsed < 200 || parsed > 9999) return null;
  return parsed;
}

function isMetroPostcode(postcode) {
  return (
    (postcode >= 2000 && postcode <= 2234) ||
    (postcode >= 2600 && postcode <= 2618) ||
    (postcode >= 3000 && postcode <= 3207) ||
    (postcode >= 4000 && postcode <= 4179) ||
    (postcode >= 5000 && postcode <= 5199) ||
    (postcode >= 6000 && postcode <= 6214) ||
    (postcode >= 7000 && postcode <= 7054) ||
    (postcode >= 800 && postcode <= 832)
  );
}

function isRemotePostcode(postcode) {
  return (
    (postcode >= 870 && postcode <= 999) ||
    (postcode >= 2336 && postcode <= 2490) ||
    (postcode >= 3221 && postcode <= 3999) ||
    (postcode >= 4180 && postcode <= 4999) ||
    (postcode >= 5220 && postcode <= 5999) ||
    (postcode >= 6215 && postcode <= 6999) ||
    (postcode >= 7055 && postcode <= 7999)
  );
}

export function getAustraliaDeliveryCharge({
  destinationPostcode,
  originPostcode = DEFAULT_ORIGIN_POSTCODE,
  orderSubtotal = 0,
}) {
  const to = parseAuPostcode(destinationPostcode);
  const from = parseAuPostcode(originPostcode) ?? DEFAULT_ORIGIN_POSTCODE;

  if (!to) {
    return {
      charge: 0,
      valid: false,
      zone: 'unknown',
      reason: 'invalid_postcode',
    };
  }

  const distanceBand = Math.abs(to - from);
  let charge = 0;

  if (distanceBand <= 99) charge = 12;
  else if (distanceBand <= 399) charge = 18;
  else if (distanceBand <= 899) charge = 26;
  else if (distanceBand <= 1599) charge = 38;
  else charge = 52;

  const remote = isRemotePostcode(to);
  const metro = isMetroPostcode(to);

  if (remote) charge += 18;
  else if (!metro) charge += 8;

  if (orderSubtotal >= 3000) charge += 10;

  return {
    charge,
    valid: true,
    zone: remote ? 'remote' : metro ? 'metro' : 'regional',
    reason: 'ok',
  };
}

export function getOrderTotalsForAustralia({ subtotal, destinationPostcode }) {
  const safeSubtotal = Number.isFinite(subtotal) ? subtotal : 0;
  const delivery = getAustraliaDeliveryCharge({
    destinationPostcode,
    orderSubtotal: safeSubtotal,
  });

  const shippingCharge = delivery.charge;
  const taxableAmount = safeSubtotal + shippingCharge;
  const tax = Number((taxableAmount * GST_RATE).toFixed(2));
  const total = Number((taxableAmount + tax).toFixed(2));

  return {
    gstRate: GST_RATE,
    shippingCharge,
    tax,
    total,
    shippingMeta: delivery,
  };
}
