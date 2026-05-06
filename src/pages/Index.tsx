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
          <div className="lg:col-span-2 flex flex-col gap-3">
            <div className="flex items-center gap-3 mb-1">
              <span className="w-1 h-5 rounded-full inline-block" style={{ background: 'var(--gov-blue)' }} />
              <h2 className="font-bold text-lg" style={{ color: 'var(--gov-blue)' }}>
                Новости и события
              </h2>
            </div>

            {content.news.map((item) => (
              <article key={item.id} className="news-item">
                <div className="mb-2">
                  <span className="badge-blue">{item.date}</span>
                </div>
                <h3 className="font-semibold text-base mb-1.5 leading-snug"
                  style={{ color: 'var(--gov-text)' }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--gov-text-muted)' }}>
                  {item.text}
                </p>
              </article>
            ))}
          </div>

          {/* Правая колонка */}
          <div className="flex flex-col gap-4">

            {/* Телефон доверия */}
            <div className="gov-card-gold p-5 text-white">
              <p className="text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: 'var(--gov-gold-light)', letterSpacing: '0.1em' }}>
                Телефон доверия
              </p>
              <p className="text-2xl font-bold">8-800-100-12-60</p>
              <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Бесплатно · Круглосуточно
              </p>
            </div>

            {/* Руководство */}
            <div className="gov-card p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1 h-4 rounded-full inline-block" style={{ background: 'var(--gov-blue)' }} />
                <h2 className="font-bold text-xs uppercase tracking-wide"
                  style={{ color: 'var(--gov-text-muted)', letterSpacing: '0.06em' }}>
                  Руководство
                </h2>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: 'var(--gov-blue-pale)' }}>
                  👤
                </div>
                <div>
                  <p className="font-bold text-sm leading-snug" style={{ color: 'var(--gov-text)' }}>
                    {content.chief.name}
                  </p>
                  <p className="text-xs font-semibold mt-0.5" style={{ color: 'var(--gov-red)' }}>
                    {content.chief.rank}
                  </p>
                  <p className="text-xs mt-2 leading-relaxed" style={{ color: 'var(--gov-text-muted)' }}>
                    {content.chief.bio}
                  </p>
                </div>
              </div>
            </div>

            {/* Контакты */}
            <div className="gov-card p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1 h-4 rounded-full inline-block" style={{ background: 'var(--gov-blue)' }} />
                <h2 className="font-bold text-xs uppercase tracking-wide"
                  style={{ color: 'var(--gov-text-muted)', letterSpacing: '0.06em' }}>
                  Контакты
                </h2>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-xs font-semibold mb-0.5" style={{ color: 'var(--gov-text-light)' }}>Адрес</p>
                  <p style={{ color: 'var(--gov-text)' }}>{content.contact.address}</p>
                </div>
                <div className="h-px" style={{ background: 'var(--gov-border)' }} />
                <div>
                  <p className="text-xs font-semibold mb-0.5" style={{ color: 'var(--gov-text-light)' }}>Телефон</p>
                  <a href={`tel:${content.contact.phone.replace(/\D/g, '')}`}
                    className="font-bold hover:underline" style={{ color: 'var(--gov-blue)' }}>
                    {content.contact.phone}
                  </a>
                </div>
                <div className="h-px" style={{ background: 'var(--gov-border)' }} />
                <div>
                  <p className="text-xs font-semibold mb-0.5" style={{ color: 'var(--gov-text-light)' }}>Email</p>
                  <a href={`mailto:${content.contact.email}`}
                    className="hover:underline break-all" style={{ color: 'var(--gov-blue)' }}>
                    {content.contact.email}
                  </a>
                </div>
                <div className="h-px" style={{ background: 'var(--gov-border)' }} />
                <div>
                  <p className="text-xs font-semibold mb-0.5" style={{ color: 'var(--gov-text-light)' }}>Режим работы</p>
                  <p style={{ color: 'var(--gov-text)' }}>{content.contact.schedule}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
