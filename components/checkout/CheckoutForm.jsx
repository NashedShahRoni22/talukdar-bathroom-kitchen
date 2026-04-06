'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useApp } from '@/components/context/AppContext';
import { getOrderTotalsForAustralia, parseAuPostcode } from '@/lib/auShipping';

// ─── Set your API endpoint here (or via NEXT_PUBLIC_ORDERS_API_URL env var) ───
const ORDERS_API_URL = process.env.NEXT_PUBLIC_ORDERS_API_URL ?? 'https://your-api.com/orders';
// ─────────────────────────────────────────────────────────────────────────────

const EMPTY_ADDRESS = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  country: 'Australia',
};

function InputField({ label, name, value, onChange, error, type = 'text', span2 = false }) {
  return (
    <div className={span2 ? 'col-span-2' : 'col-span-1'}>
      <label className="block text-sm font-medium text-gray-600 dark:text-[#9fa8cc] mb-1.5">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={label}
        className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none transition-colors bg-white dark:bg-[#111840] dark:text-[#f0ebe3] dark:placeholder-[#6b7498] ${
          error
            ? 'border-red-400 focus:border-red-400'
            : 'border-gray-200 dark:border-[#2a3460] focus:border-brand-navy dark:focus:border-[#c4a97e]'
        }`}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

function Checkbox({ checked, onChange, children }) {
  return (
    <label className="flex items-start gap-3 cursor-pointer select-none">
      <button
        type="button"
        onClick={onChange}
        className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
          checked ? 'border-brand-gold bg-brand-gold' : 'border-gray-300 dark:border-[#2a3460] bg-white dark:bg-[#111840] hover:border-brand-gold'
        }`}
        aria-checked={checked}
        role="checkbox"
      >
        {checked && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
      <span className="text-sm text-gray-600 dark:text-[#9fa8cc] leading-relaxed">{children}</span>
    </label>
  );
}

function AddressForm({ title, prefix, data, onChange, errors }) {
  const field = (name, label, opts = {}) => (
    <InputField
      key={name}
      label={label}
      name={name}
      value={data[name]}
      onChange={onChange}
      error={errors?.[`${prefix}_${name}`]}
      {...opts}
    />
  );

  return (
    <div>
      <h3
        className="text-base font-bold uppercase tracking-widest mb-5 pb-3 border-b border-gray-100 dark:border-[#1c2444] text-brand-navy dark:text-[#f0ebe3]"
      >
        {title}
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {field('firstName', 'First Name')}
        {field('lastName', 'Last Name')}
        {field('email', 'Email Address', { type: 'email', span2: true })}
        {field('phone', 'Phone Number', { type: 'tel', span2: true })}
        {field('address', 'Street Address', { span2: true })}
        {field('city', 'City')}
        {field('state', 'State / Province')}
        {field('zip', 'Postcode')}
      </div>
    </div>
  );
}

export default function CheckoutForm({ onShippingMetaChange }) {
  const router = useRouter();
  const { cartDBGuest, totalDBGuest } = useApp();

  const normalizedCartItems = cartDBGuest.map((item) => ({
    id: item.cart_id,
    name: item.name,
    category: item.slug,
    image: item.thumbnail_image,
    quantity: Number(item.quantity),
    price: Number(item.price),
  }));

  const cartSubtotal = Number(totalDBGuest);

  const [shipping, setShipping] = useState(EMPTY_ADDRESS);
  const [billing, setBilling] = useState(EMPTY_ADDRESS);
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    onShippingMetaChange?.({
      zip: shipping.zip,
      country: 'Australia',
    });
  }, [shipping.zip, onShippingMetaChange]);

  function makeHandler(setter) {
    return (e) => {
      const { name, value } = e.target;
      setter((prev) => ({ ...prev, [name]: value }));
    };
  }

  function validate() {
    const errs = {};
    const required = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zip'];

    required.forEach((f) => {
      if (!shipping[f]?.trim()) errs[`shipping_${f}`] = 'This field is required';
    });

    if (!parseAuPostcode(shipping.zip)) {
      errs.shipping_zip = 'Enter a valid Australian postcode (e.g. 2000)';
    }

    if (!sameAsShipping) {
      required.forEach((f) => {
        if (!billing[f]?.trim()) errs[`billing_${f}`] = 'This field is required';
      });

      if (!parseAuPostcode(billing.zip)) {
        errs.billing_zip = 'Enter a valid Australian postcode (e.g. 3000)';
      }
    }

    if (normalizedCartItems.length === 0) errs.cart = 'Your cart is empty';
    if (!agreedTerms) errs.terms = 'You must accept the Terms & Conditions';
    if (!agreedPrivacy) errs.privacy = 'You must accept the Privacy Policy';

    return errs;
  }

  function buildPayload() {
    const totals = getOrderTotalsForAustralia({
      subtotal: cartSubtotal,
      destinationPostcode: shipping.zip,
    });

    return {
      shipping: { ...shipping, country: 'Australia' },
      billing: sameAsShipping ? { ...shipping, country: 'Australia' } : { ...billing, country: 'Australia' },
      items: normalizedCartItems.map(({ id, name, category, price, image, quantity }) => ({
        id,
        name,
        category,
        price,
        image,
        quantity,
        lineTotal: parseFloat((price * quantity).toFixed(2)),
      })),
      summary: {
        subtotal: parseFloat(cartSubtotal.toFixed(2)),
        shippingCharge: totals.shippingCharge,
        taxRate: totals.gstRate,
        tax: totals.tax,
        total: totals.total,
        shippingZone: totals.shippingMeta.zone,
        deliveryPricingModel: 'AU_POSTCODE_DISTANCE_BAND',
      },
      };
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      document.querySelector('[data-error]')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      const payload = buildPayload();

      const res = await fetch(ORDERS_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.message ?? `Server error: ${res.status}`);
      }

      const data = await res.json();

      // Redirect to payment URL returned by the API
      if (data?.paymentUrl) {
        router.push(data.paymentUrl);
      } else {
        toast.success('Order placed! Redirecting to payment…');
      }
    } catch (err) {
      toast.error(err.message ?? 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-10">
      {/* Shipping */}
      <AddressForm
        title="Shipping Information"
        prefix="shipping"
        data={shipping}
        onChange={makeHandler(setShipping)}
        errors={errors}
      />

      {/* Billing same toggle */}
      <Checkbox checked={sameAsShipping} onChange={() => setSameAsShipping((v) => !v)}>
          <span className="font-medium text-gray-700 dark:text-[#f0ebe3]">Billing address same as shipping</span>
      </Checkbox>

      {/* Billing (conditional) */}
      <AnimatePresence>
        {!sameAsShipping && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <AddressForm
              title="Billing Information"
              prefix="billing"
              data={billing}
              onChange={makeHandler(setBilling)}
              errors={errors}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Divider */}
      <div className="border-t border-gray-100 dark:border-[#1c2444]" />

      {/* Terms & Privacy */}
      <div className="space-y-4">
        <h3
          className="text-base font-bold uppercase tracking-widest text-brand-navy dark:text-[#f0ebe3]"
        >
          Agreements
        </h3>

        <div data-error={errors.terms ? true : undefined}>
          <Checkbox checked={agreedTerms} onChange={() => setAgreedTerms((v) => !v)}>
            I have read and agree to the{' '}
            <Link
              href="/terms-and-conditions"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold hover:opacity-75 transition-opacity text-brand-gold"
            >
              Terms & Conditions
            </Link>
          </Checkbox>
          {errors.terms && (
            <p className="text-xs text-red-500 mt-1 ml-8">{errors.terms}</p>
          )}
        </div>

        <div data-error={errors.privacy ? true : undefined}>
          <Checkbox checked={agreedPrivacy} onChange={() => setAgreedPrivacy((v) => !v)}>
            I have read and agree to the{' '}
            <Link
              href="/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold hover:opacity-75 transition-opacity text-brand-gold"
            >
              Privacy Policy
            </Link>
          </Checkbox>
          {errors.privacy && (
            <p className="text-xs text-red-500 mt-1 ml-8">{errors.privacy}</p>
          )}
        </div>
      </div>

      {/* Cart empty error */}
      {errors.cart && (
        <p className="text-sm text-red-500 text-center">{errors.cart}</p>
      )}

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={isLoading || !agreedTerms || !agreedPrivacy}
        whileHover={isLoading ? {} : { scale: 1.02 }}
        whileTap={isLoading ? {} : { scale: 0.97 }}
        className="w-full py-4 rounded-xl text-white font-semibold text-base flex items-center justify-center gap-2.5 shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        style={{ backgroundColor: '#050a30' }}
      >
        {isLoading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Processing…
          </>
        ) : (
          <>
            <Lock size={16} />
            Proceed to Payment
          </>
        )}
      </motion.button>

      {(!agreedTerms || !agreedPrivacy) && (
        <p className="text-xs text-center text-gray-500 dark:text-[#9fa8cc]">
          Please accept Terms & Conditions and Privacy Policy to proceed with payment.
        </p>
      )}
    </form>
  );
}
