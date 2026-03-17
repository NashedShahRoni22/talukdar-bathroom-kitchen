import ContactForm from '@/components/contact/ContactForm';

export const metadata = {
  title: 'Contact Talukdar - Luxury Bathroom & Kitchen Consultation',
  description:
    'Contact Talukdar for premium bathroom and kitchen design consultation. Visit our showroom, send us your project details, or call our luxury design team today.',
  keywords:
    'contact talukdar, bathroom consultation, kitchen consultation, luxury showroom, interior design contact',
  openGraph: {
    title: 'Contact Talukdar - Luxury Bathroom & Kitchen Consultation',
    description:
      'Get in touch with Talukdar for premium bathroom and kitchen solutions. Book a consultation with our expert team.',
    url: 'https://talukdar.com/contact',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <main className="bg-white dark:bg-[#0f1219] transition-colors duration-300 py-20">
      <section className="bg-[#f7f5f2] dark:bg-[#111b2d] py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold tracking-widest uppercase text-[#785d32]">Contact Us</p>
          <h1
            className="text-4xl md:text-6xl font-bold mt-3 text-[#050a30] dark:text-[#f0ebe3]"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Let&apos;s Build Your Dream Space
          </h1>
          <p className="max-w-2xl mx-auto mt-5 text-gray-600 dark:text-[#9fa8cc] text-lg">
            Share your project details and our luxury design consultants will get back to you with
            expert recommendations for your bathroom and kitchen transformation.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white dark:bg-[#0f1219]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-14">
          <ContactForm />

          <div className="space-y-6">
            <div className="rounded-2xl overflow-hidden border border-[#e8dcc9] dark:border-[#26344f] shadow-sm h-[360px] sm:h-[420px]">
              <iframe
                title="Talukdar showroom location"
                width="100%"
                height="100%"
                frameBorder="0"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.1234567890!2d-74.0060!3d40.7128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjEiTiA3NMKwMDAnMjEuNiJX!5e0!3m2!1sen!2sus!4v1234567890"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>

            <div className="bg-[#f7f5f2] dark:bg-[#162235] rounded-2xl p-6 sm:p-8 border border-[#e8dcc9] dark:border-[#26344f] shadow-sm">
              <h3 className="text-2xl font-bold text-[#050a30] dark:text-[#f0ebe3]" style={{ fontFamily: 'var(--font-playfair)' }}>
                Showroom Information
              </h3>
              <div className="mt-5 space-y-4 text-gray-700 dark:text-[#c1cbe0]">
                <p>
                  <span className="font-semibold text-[#050a30] dark:text-[#f0ebe3]">Address:</span>{' '}
                  123 Design Street, New York, NY 10001
                </p>
                <p>
                  <span className="font-semibold text-[#050a30] dark:text-[#f0ebe3]">Phone:</span>{' '}
                  +1 (555) 123-4567
                </p>
                <p>
                  <span className="font-semibold text-[#050a30] dark:text-[#f0ebe3]">Email:</span>{' '}
                  info@talukdar.com
                </p>
                <p>
                  <span className="font-semibold text-[#050a30] dark:text-[#f0ebe3]">Hours:</span>{' '}
                  Monday - Friday: 10 AM - 6 PM, Saturday: 11 AM - 5 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
