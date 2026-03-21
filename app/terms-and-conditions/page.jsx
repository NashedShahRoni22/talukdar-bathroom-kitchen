import Link from 'next/link';

export const metadata = {
  title: 'Terms & Conditions | Talukdar Bathroom & Kitchen',
};

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] px-4 pb-20 pt-28 text-slate-800 dark:bg-brand-navy dark:text-brand-pale">
      <div className="mx-auto w-full max-w-4xl rounded-2xl bg-white p-6 shadow-sm dark:bg-[#0d1333] sm:p-8">
        <h1 className="mb-2 text-3xl font-bold" style={{ fontFamily: 'var(--font-playfair)' }}>
          Terms & Conditions
        </h1>
        <p className="mb-6 text-sm text-slate-500 dark:text-[#9fa8cc]">
          Last updated: March 21, 2026
        </p>

        <section className="space-y-4 text-sm leading-7">
          <p>
            These Terms & Conditions govern your use of Talukdar Bathroom & Kitchen and purchases made through this website.
            By placing an order, you agree to these terms.
          </p>

          <h2 className="pt-2 text-lg font-semibold">Orders & Payments</h2>
          <p>
            All orders are subject to availability and acceptance. Prices are listed in AUD. Payment processing may be
            handled by secure third-party providers.
          </p>

          <h2 className="pt-2 text-lg font-semibold">Delivery in Australia</h2>
          <p>
            Delivery charges are calculated using the destination Australian postcode and order profile. Estimated delivery
            charges are shown during checkout before payment confirmation.
          </p>

          <h2 className="pt-2 text-lg font-semibold">GST</h2>
          <p>
            A Goods and Services Tax (GST) of 10% applies to eligible orders. GST is displayed in the checkout summary.
          </p>

          <h2 className="pt-2 text-lg font-semibold">Returns & Refunds</h2>
          <p>
            Return eligibility, refund methods, and timelines are determined by product condition, installation status,
            and applicable Australian consumer laws.
          </p>

          <h2 className="pt-2 text-lg font-semibold">Contact</h2>
          <p>
            For any terms-related questions, please contact us via the
            {' '}
            <Link href="/contact" className="font-semibold text-brand-gold underline">
              Contact page
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
