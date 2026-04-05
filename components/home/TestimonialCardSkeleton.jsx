export default function TestimonialCardSkeleton() {
  return (
    <div
      className="
        relative rounded-2xl overflow-hidden animate-pulse
        bg-[#f7f5f0] dark:bg-[#0a0f2e]
        border border-[#e8e0d0] dark:border-[#1c2444]
        p-6 sm:p-8 md:p-10
      "
    >
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#785d32]/50 to-transparent" />

      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start sm:items-center">
        <div className="flex sm:flex-col items-center gap-4 sm:gap-3 sm:w-32 shrink-0">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-200 dark:bg-[#1c2444]" />
          <div className="sm:text-center w-28 sm:w-full">
            <div className="h-4 w-24 mx-auto sm:mx-auto rounded bg-gray-200 dark:bg-[#1c2444]" />
            <div className="h-3 w-16 mx-auto sm:mx-auto rounded bg-gray-200 dark:bg-[#1c2444] mt-2" />
            <div className="h-3 w-20 mx-auto sm:mx-auto rounded bg-gray-200 dark:bg-[#1c2444] mt-2" />
            <div className="h-3 w-14 mx-auto sm:mx-auto rounded bg-gray-200 dark:bg-[#1c2444] mt-3" />
          </div>
        </div>

        <div className="hidden sm:block w-px self-stretch bg-[#785d32]/15" />

        <div className="flex-1 min-w-0 space-y-3">
          <div className="h-4 w-full rounded bg-gray-200 dark:bg-[#1c2444]" />
          <div className="h-4 w-11/12 rounded bg-gray-200 dark:bg-[#1c2444]" />
          <div className="h-4 w-10/12 rounded bg-gray-200 dark:bg-[#1c2444]" />
          <div className="h-[2px] w-16 rounded-full mt-6 bg-[#785d32]/50" />
        </div>
      </div>
    </div>
  );
}
