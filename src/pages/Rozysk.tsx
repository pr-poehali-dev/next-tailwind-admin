import { useEffect, useState } from 'react';
import { getRozyskContent, RozyskContent } from '@/data/content';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Rozysk() {
  const [content, setContent] = useState<RozyskContent | null>(null);
  const [formData, setFormData] = useState({ fio: '', phone: '', info: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setContent(getRozyskContent());
  }, []);

  if (!content) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ fio: '', phone: '', info: '' });
  };

  return (
    <div style={{ backgroundColor: 'var(--gov-bg)', minHeight: '100vh' }}>
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-8 animate-fade-in">

        {/* Hero-баннер */}
        <div className="rounded-2xl p-6 mb-7 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #7f1d1d 0%, var(--gov-red) 100%)' }}>
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.15) 20px, rgba(255,255,255,0.15) 21px)' }} />
          <div className="relative flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: 'rgba(255,255,255,0.15)' }}>
              ⚠
            </div>
            <div>
              <h1 className="text-xl font-bold text-white mb-1.5">{content.title}</h1>
              <p className="text-sm leading-relaxed max-w-3xl" style={{ color: 'rgba(255,255,255,0.8)' }}>
                {content.description}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Карточки разыскиваемых */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-1 h-5 rounded-full inline-block" style={{ background: 'var(--gov-red)' }} />
              <h2 className="font-bold text-lg" style={{ color: 'var(--gov-text)' }}>
                Лица, объявленные в розыск
              </h2>
            </div>

            {content.suspects.map((suspect, idx) => (
              <div key={suspect.id} className="gov-card p-5">
                <div className="flex gap-4">
                  {/* Фото-заглушка */}
                  <div className="w-20 h-24 rounded-lg flex items-center justify-center text-4xl flex-shrink-0"
                    style={{ background: 'var(--gov-blue-pale)', border: '2px dashed #bfd2e8' }}>
                    👤
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 flex-wrap mb-2">
                      <span className="badge-red">№{idx + 1} · Розыск</span>
                    </div>
                    <h3 className="font-bold text-base mb-1" style={{ color: 'var(--gov-text)' }}>
                      {suspect.name}
                    </h3>
                    <p className="text-xs mb-2" style={{ color: 'var(--gov-text-muted)' }}>
                      Дата рождения: <span className="font-semibold text-gray-700">{suspect.dob}</span>
                    </p>
                    <p className="text-sm mb-3 leading-relaxed" style={{ color: 'var(--gov-text-muted)' }}>
                      {suspect.description}
                    </p>
                    <div className="p-2.5 rounded-lg text-xs font-semibold"
                      style={{ background: '#fef2f2', color: 'var(--gov-red)', border: '1px solid #fecaca' }}>
                      {suspect.crime}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Форма + экстренный */}
          <div className="flex flex-col gap-4">

            {/* Форма */}
            <div className="gov-card-red p-5">
              <h2 className="font-bold text-base mb-0.5" style={{ color: 'var(--gov-red)' }}>
                {content.formTitle}
              </h2>
              <p className="text-xs mb-4" style={{ color: 'var(--gov-text-muted)' }}>
                Анонимность гарантируется
              </p>

              {submitted ? (
                <div className="p-5 rounded-xl text-center"
                  style={{ background: '#f0fdf4', border: '1px solid #86efac' }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3"
                    style={{ background: '#22c55e', color: 'white', fontSize: '1.2rem' }}>
                    ✓
                  </div>
                  <p className="font-bold text-sm text-green-800">Сообщение принято</p>
                  <p className="text-xs text-green-700 mt-1">Следователь свяжется с вами</p>
                  <button onClick={() => setSubmitted(false)}
                    className="mt-3 text-xs underline" style={{ color: 'var(--gov-blue)' }}>
                    Отправить ещё
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--gov-text)' }}>
                      Ваше ФИО *
                    </label>
                    <input
                      type="text" required value={formData.fio}
                      onChange={(e) => setFormData({ ...formData, fio: e.target.value })}
                      placeholder="Фамилия Имя Отчество"
                      className="gov-input"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--gov-text)' }}>
                      Телефон *
                    </label>
                    <input
                      type="tel" required value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+7 (___) ___-__-__"
                      className="gov-input"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--gov-text)' }}>
                      Сведения *
                    </label>
                    <textarea
                      required rows={4} value={formData.info}
                      onChange={(e) => setFormData({ ...formData, info: e.target.value })}
                      placeholder="Укажите известную вам информацию..."
                      className="gov-input resize-none"
                    />
                  </div>
                  <button type="submit"
                    className="gov-btn-red w-full py-2.5 rounded-lg font-semibold text-sm">
                    Отправить сообщение
                  </button>
                </form>
              )}
            </div>

            {/* Экстренный */}
            <div className="gov-card p-4 text-center">
              <p className="text-xs font-bold uppercase tracking-wide mb-1"
                style={{ color: 'var(--gov-text-muted)', letterSpacing: '0.08em' }}>
                Экстренный вызов
              </p>
              <p className="text-4xl font-black" style={{ color: 'var(--gov-red)', letterSpacing: '-0.02em' }}>
                112
              </p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--gov-text-light)' }}>
                Единый номер экстренных служб
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
