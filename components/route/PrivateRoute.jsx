'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useApp } from '@/components/context/AppContext';

export default function PrivateRoute({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { authReady, authToken } = useApp();
  const hasStorageToken =
    typeof window !== 'undefined' && Boolean(localStorage.getItem('talukdar-auth-token'));

  useEffect(() => {
    if (!authReady) return;

    try {
      if (!authToken && !hasStorageToken) {
        const redirect = encodeURIComponent(pathname || '/profile');
        router.replace(`/login?redirect=${redirect}`);
      }
    } catch {
      router.replace('/login');
    }
  }, [authReady, authToken, hasStorageToken, pathname, router]);

  if (!authReady) {
    return (
      <div className="min-h-screen pt-28 flex items-center justify-center bg-white dark:bg-[#060b20]">
        <div className="inline-flex items-center gap-3 rounded-xl border border-gray-200 dark:border-[#1c2444] px-4 py-3 text-brand-navy dark:text-brand-pale">
          <Loader2 className="animate-spin" size={18} />
          Checking your session...
        </div>
      </div>
    );
  }

  if (!authToken && !hasStorageToken) return null;

  return children;
}
