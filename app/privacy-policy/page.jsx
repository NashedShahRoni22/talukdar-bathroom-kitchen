import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | Talukdar Bathroom & Kitchen',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] px-4 pb-20 pt-28 text-slate-800 dark:bg-brand-navy dark:text-brand-pale">
      <div className="mx-auto w-full max-w-4xl rounded-2xl bg-white p-6 shadow-sm dark:bg-[#0d1333] sm:p-8">
        <h1 className="mb-2 text-3xl font-bold" style={{ fontFamily: 'var(--font-playfair)' }}>
          Privacy Policy
        </h1>
        <p className="mb-6 text-sm text-slate-500 dark:text-[#9fa8cc]">
          Last updated: March 21, 2026
        </p>

        <section className="space-y-4 text-sm leading-7">
          <p>
            This Privacy Policy explains how Talukdar Bathroom & Kitchen collects, uses, and protects your personal
            information when you browse or purchase through our website.
          </p>

          <h2 className="pt-2 text-lg font-semibold">Information We Collect</h2>
          <p>
            We may collect contact details, billing and shipping information, order history, and technical data needed
            to run and secure the service.
          </p>

          <h2 className="pt-2 text-lg font-semibold">How We Use Information</h2>
          <p>
            Information is used to process orders, calculate delivery, comply with legal obligations in Australia,
            and improve customer support.
          </p>

          <h2 className="pt-2 text-lg font-semibold">Data Security</h2>
          <p>
            We apply reasonable technical and organizational safeguards to protect personal information.
          </p>

          <h2 className="pt-2 text-lg font-semibold">Your Rights</h2>
          <p>
            You may request access or correction of your information, subject to legal and operational requirements.
          </p>

          <h2 className="pt-2 text-lg font-semibold">Contact</h2>
          <p>
            For privacy requests, please contact us via the
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
