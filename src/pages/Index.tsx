import { useEffect, useState } from 'react';
import { getHomeContent, HomeContent } from '@/data/content';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Index() {
  const [content, setContent] = useState<HomeContent | null>(null);

  useEffect(() => {
    setContent(getHomeContent());
  }, []);

  if (!content) return null;

  return (
    <div style={{ backgroundColor: 'var(--gov-bg)', minHeight: '100vh' }}>
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-8 animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Новости */}
          <div className="lg:col-span-2">
            <div className="gov-card rounded-sm p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-5 pb-2 border-b border-gray-200"
                style={{ color: 'var(--gov-blue)', fontFamily: 'var(--font-serif)' }}>
                Новости и события
              </h2>
              <div>
                {content.news.map((item, idx) => (
                  <div
                    key={item.id}
                    className="news-item"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <span className="text-xs font-bold px-2 py-0.5 rounded inline-block"
                      style={{ backgroundColor: 'var(--gov-blue)', color: 'white', fontFamily: 'var(--font-narrow)' }}>
                      {item.date}
                    </span>
                    <h3 className="font-bold mt-2 mb-1 text-base"
                      style={{ color: 'var(--gov-blue)', fontFamily: 'var(--font-serif)' }}>
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--gov-text-muted)' }}>
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Правая колонка */}
          <div className="flex flex-col gap-5">

            {/* Руководство */}
            <div className="gov-card rounded-sm p-5 shadow-sm">
              <h2 className="text-base font-bold mb-4 pb-2 border-b border-gray-200"
                style={{ color: 'var(--gov-blue)', fontFamily: 'var(--font-serif)' }}>
                Руководство
              </h2>
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full mb-3 flex items-center justify-center text-4xl shadow-md"
                  style={{ background: 'linear-gradient(135deg, #d0cdc5, #b8b5ac)' }}>
                  👤
                </div>
                <p className="font-bold text-sm leading-tight" style={{ fontFamily: 'var(--font-serif)', color: 'var(--gov-blue)' }}>
                  {content.chief.name}
                </p>
                <p className="text-xs mt-1 font-bold" style={{ color: 'var(--gov-red)', fontFamily: 'var(--font-narrow)' }}>
                  {content.chief.rank}
                </p>
                <p className="text-xs mt-2 leading-relaxed" style={{ color: 'var(--gov-text-muted)' }}>
                  {content.chief.bio}
                </p>
              </div>
            </div>

            {/* Контакты */}
            <div className="gov-card rounded-sm p-5 shadow-sm">
              <h2 className="text-base font-bold mb-4 pb-2 border-b border-gray-200"
                style={{ color: 'var(--gov-blue)', fontFamily: 'var(--font-serif)' }}>
                Контактная информация
              </h2>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide mb-0.5" style={{ color: 'var(--gov-text-muted)' }}>Адрес</p>
                  <p style={{ color: 'var(--gov-text)' }}>{content.contact.address}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide mb-0.5" style={{ color: 'var(--gov-text-muted)' }}>Телефон</p>
                  <a href={`tel:${content.contact.phone.replace(/\D/g, '')}`}
                    className="font-bold hover:underline"
                    style={{ color: 'var(--gov-blue)' }}>
                    {content.contact.phone}
                  </a>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide mb-0.5" style={{ color: 'var(--gov-text-muted)' }}>Email</p>
                  <a href={`mailto:${content.contact.email}`}
                    className="hover:underline break-all"
                    style={{ color: 'var(--gov-blue)' }}>
                    {content.contact.email}
                  </a>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide mb-0.5" style={{ color: 'var(--gov-text-muted)' }}>Режим работы</p>
                  <p style={{ color: 'var(--gov-text)' }}>{content.contact.schedule}</p>
                </div>
              </div>
            </div>

            {/* Горячая линия */}
            <div className="gov-card-red rounded-sm p-5 shadow-sm">
              <h2 className="text-base font-bold mb-2" style={{ color: 'var(--gov-red)', fontFamily: 'var(--font-serif)' }}>
                Телефон доверия
              </h2>
              <p className="text-2xl font-bold" style={{ color: 'var(--gov-blue)', fontFamily: 'var(--font-serif)' }}>
                8-800-100-12-60
              </p>
              <p className="text-xs mt-1" style={{ color: 'var(--gov-text-muted)' }}>Бесплатно по России, круглосуточно</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
