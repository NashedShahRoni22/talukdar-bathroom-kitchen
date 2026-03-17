'use client';

export default function ContactForm() {
  return (
    <div className="bg-[#f7f5f2] dark:bg-[#162235] rounded-2xl p-6 sm:p-8 md:p-10 border border-[#e8dcc9] dark:border-[#26344f] shadow-sm">
      <h2
        className="text-3xl md:text-4xl font-bold text-[#050a30] dark:text-[#f0ebe3]"
        style={{ fontFamily: 'var(--font-playfair)' }}
      >
        Send Us a Message
      </h2>
      <p className="mt-3 text-gray-600 dark:text-[#9fa8cc]">
        Fill out the form and we will contact you within 24 hours.
      </p>

      <form className="mt-8 space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-semibold text-[#050a30] dark:text-[#f0ebe3] mb-2">
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              className="w-full rounded-lg border border-[#d7cab7] dark:border-[#2d3d5b] bg-white dark:bg-[#0f1219] px-4 py-3 text-[#050a30] dark:text-[#f0ebe3] outline-none focus:ring-2 focus:ring-[#785d32]/50"
              placeholder="John"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-semibold text-[#050a30] dark:text-[#f0ebe3] mb-2">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              className="w-full rounded-lg border border-[#d7cab7] dark:border-[#2d3d5b] bg-white dark:bg-[#0f1219] px-4 py-3 text-[#050a30] dark:text-[#f0ebe3] outline-none focus:ring-2 focus:ring-[#785d32]/50"
              placeholder="Doe"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-[#050a30] dark:text-[#f0ebe3] mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-lg border border-[#d7cab7] dark:border-[#2d3d5b] bg-white dark:bg-[#0f1219] px-4 py-3 text-[#050a30] dark:text-[#f0ebe3] outline-none focus:ring-2 focus:ring-[#785d32]/50"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-[#050a30] dark:text-[#f0ebe3] mb-2">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="w-full rounded-lg border border-[#d7cab7] dark:border-[#2d3d5b] bg-white dark:bg-[#0f1219] px-4 py-3 text-[#050a30] dark:text-[#f0ebe3] outline-none focus:ring-2 focus:ring-[#785d32]/50"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        <div>
          <label htmlFor="projectType" className="block text-sm font-semibold text-[#050a30] dark:text-[#f0ebe3] mb-2">
            Project Type
          </label>
          <select
            id="projectType"
            name="projectType"
            className="w-full rounded-lg border border-[#d7cab7] dark:border-[#2d3d5b] bg-white dark:bg-[#0f1219] px-4 py-3 text-[#050a30] dark:text-[#f0ebe3] outline-none focus:ring-2 focus:ring-[#785d32]/50"
            defaultValue=""
          >
            <option value="" disabled>
              Select your project
            </option>
            <option value="bathroom">Bathroom Renovation</option>
            <option value="kitchen">Kitchen Renovation</option>
            <option value="both">Bathroom + Kitchen</option>
            <option value="showroom">Showroom Visit</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-[#050a30] dark:text-[#f0ebe3] mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="w-full rounded-lg border border-[#d7cab7] dark:border-[#2d3d5b] bg-white dark:bg-[#0f1219] px-4 py-3 text-[#050a30] dark:text-[#f0ebe3] outline-none focus:ring-2 focus:ring-[#785d32]/50"
            placeholder="Tell us about your space, style, and budget goals."
          />
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-3 rounded-lg font-semibold text-white bg-[#785d32] hover:bg-[#6a5028] transition-colors duration-300"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
}
