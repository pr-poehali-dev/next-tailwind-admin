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

        {/* Заголовок-баннер */}
        <div className="rounded-sm p-5 mb-6 shadow-sm flex items-start gap-4"
          style={{ background: 'var(--gov-red)', color: 'white' }}>
          <span className="text-4xl mt-1 flex-shrink-0">⚠</span>
          <div>
            <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-serif)' }}>
              {content.title}
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-white/90 max-w-3xl">
              {content.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Карточки разыскиваемых */}
          <div className="lg:col-span-2">
            <div className="gov-card rounded-sm p-6 shadow-sm">
              <h2 className="text-lg font-bold mb-5 pb-2 border-b border-gray-200"
                style={{ color: 'var(--gov-blue)', fontFamily: 'var(--font-serif)' }}>
                Лица, объявленные в розыск
              </h2>

              <div className="space-y-5">
                {content.suspects.map((suspect, idx) => (
                  <div key={suspect.id} className="flex gap-4 p-4 border border-dashed rounded-sm"
                    style={{ borderColor: 'var(--gov-border)' }}>
                    <div className="w-16 h-20 flex-shrink-0 flex items-center justify-center text-3xl rounded"
                      style={{ background: '#e8e6e0', border: '1px solid var(--gov-border)' }}>
                      👤
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2 mb-1">
                        <span className="text-xs font-bold px-2 py-0.5 rounded flex-shrink-0"
                          style={{ backgroundColor: 'var(--gov-red)', color: 'white', fontFamily: 'var(--font-narrow)' }}>
                          №{idx + 1}
                        </span>
                        <h3 className="font-bold text-base" style={{ color: 'var(--gov-blue)', fontFamily: 'var(--font-serif)' }}>
                          {suspect.name}
                        </h3>
                      </div>
                      <p className="text-sm mb-1" style={{ color: 'var(--gov-text-muted)' }}>
                        <strong>Дата рождения:</strong> {suspect.dob}
                      </p>
                      <p className="text-sm mb-1" style={{ color: 'var(--gov-text)' }}>
                        {suspect.description}
                      </p>
                      <p className="text-sm font-bold mt-2 p-2 rounded-sm"
                        style={{ color: 'var(--gov-red)', backgroundColor: '#fff5f5', border: '1px solid #fdd' }}>
                        {suspect.crime}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Форма */}
          <div>
            <div className="gov-card-red rounded-sm p-5 shadow-sm">
              <h2 className="text-base font-bold mb-1" style={{ color: 'var(--gov-red)', fontFamily: 'var(--font-serif)' }}>
                {content.formTitle}
              </h2>
              <p className="text-xs mb-4" style={{ color: 'var(--gov-text-muted)' }}>
                Ваши данные будут переданы следователю
              </p>

              {submitted ? (
                <div className="p-4 rounded-sm text-center"
                  style={{ background: '#f0fff0', border: '1px solid #90c090', color: '#006400' }}>
                  <p className="text-2xl mb-2">✓</p>
                  <p className="font-bold text-sm">Сообщение принято</p>
                  <p className="text-xs mt-1">Следователь свяжется с вами в ближайшее время</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-3 text-xs underline"
                    style={{ color: 'var(--gov-blue)' }}>
                    Отправить ещё
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold mb-1" style={{ color: 'var(--gov-text)' }}>
                      Ваше ФИО *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fio}
                      onChange={(e) => setFormData({ ...formData, fio: e.target.value })}
                      placeholder="Фамилия Имя Отчество"
                      className="w-full px-3 py-2 text-sm border rounded-sm outline-none focus:ring-1"
                      style={{
                        borderColor: 'var(--gov-border)',
                        color: 'var(--gov-text)',
                        backgroundColor: 'white',
                        focusRingColor: 'var(--gov-blue)',
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1" style={{ color: 'var(--gov-text)' }}>
                      Телефон *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+7 (___) ___-__-__"
                      className="w-full px-3 py-2 text-sm border rounded-sm outline-none focus:ring-1"
                      style={{ borderColor: 'var(--gov-border)', color: 'var(--gov-text)', backgroundColor: 'white' }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1" style={{ color: 'var(--gov-text)' }}>
                      Сведения о местонахождении *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.info}
                      onChange={(e) => setFormData({ ...formData, info: e.target.value })}
                      placeholder="Укажите известную вам информацию..."
                      className="w-full px-3 py-2 text-sm border rounded-sm outline-none focus:ring-1 resize-none"
                      style={{ borderColor: 'var(--gov-border)', color: 'var(--gov-text)', backgroundColor: 'white' }}
                    />
                  </div>
                  <button type="submit" className="gov-btn-red w-full rounded-sm">
                    Отправить сообщение
                  </button>
                  <p className="text-xs text-center" style={{ color: 'var(--gov-text-muted)' }}>
                    Анонимность гарантируется
                  </p>
                </form>
              )}
            </div>

            <div className="gov-card rounded-sm p-4 shadow-sm mt-4">
              <p className="text-sm font-bold mb-1" style={{ color: 'var(--gov-blue)', fontFamily: 'var(--font-serif)' }}>
                Экстренный звонок
              </p>
              <p className="text-xl font-bold" style={{ color: 'var(--gov-red)' }}>112</p>
              <p className="text-xs" style={{ color: 'var(--gov-text-muted)' }}>Единый номер экстренных служб</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
