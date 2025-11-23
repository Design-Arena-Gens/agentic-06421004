'use client';

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Package, ShoppingCart, Truck, BarChart3, Car } from 'lucide-react';
import { getTranslation, Language } from '@/lib/i18n';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('en');
  const pathname = usePathname();
  const router = useRouter();

  const t = (key: string) => getTranslation(key as any, lang);

  const toggleLanguage = (newLang: Language) => {
    setLang(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  const menuItems = [
    { path: '/', icon: LayoutDashboard, label: t('dashboard') },
    { path: '/inventory', icon: Package, label: t('inventory') },
    { path: '/sales', icon: ShoppingCart, label: t('sales') },
    { path: '/suppliers', icon: Truck, label: t('suppliers') },
    { path: '/reports', icon: BarChart3, label: t('reports') },
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Top Bar */}
      <div className="bg-indigo-600 text-white shadow-lg">
        <div className="px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Car className="w-8 h-8" />
            <h1 className="text-2xl font-bold">{t('appTitle')}</h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => toggleLanguage('en')}
              className={`px-4 py-2 rounded transition-colors ${
                lang === 'en' ? 'bg-indigo-700' : 'bg-indigo-500 hover:bg-indigo-600'
              }`}
            >
              English
            </button>
            <button
              onClick={() => toggleLanguage('ar')}
              className={`px-4 py-2 rounded transition-colors ${
                lang === 'ar' ? 'bg-indigo-700' : 'bg-indigo-500 hover:bg-indigo-600'
              }`}
            >
              العربية
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg min-h-[calc(100vh-72px)]">
          <nav className="p-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => router.push(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                    isActive
                      ? 'bg-indigo-100 text-indigo-700 font-semibold'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
