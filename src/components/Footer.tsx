export default function Footer() {
  return (
    <footer className="gov-footer mt-16 px-4">
      <div className="max-w-5xl mx-auto pt-10 pb-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: 'var(--gov-gold)', letterSpacing: '0.1em' }}>
            Адрес
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
            353380, Краснодарский край,<br />
            г. Крымск, ул. Демьяна Бедного, д. 16
          </p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: 'var(--gov-gold)', letterSpacing: '0.1em' }}>
            Контакты
          </p>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Тел.: <span className="text-white font-semibold">+7 (86131) 2-15-08</span>
          </p>
          <p className="text-sm mt-1.5" style={{ color: 'rgba(255,255,255,0.7)' }}>
            sk.krimsk@sledkom.ru
          </p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: 'var(--gov-gold)', letterSpacing: '0.1em' }}>
            Режим работы
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Пн–Пт: <span className="text-white font-semibold">9:00–18:00</span><br />
            Перерыв: 13:00–14:00<br />
            Сб, Вс: выходной
          </p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto pb-5 pt-5 border-t text-center text-xs"
        style={{ borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.35)' }}>
        © 2026 Следственный комитет Российской Федерации. Следственный отдел по Крымскому району.
      </div>
    </footer>
  );
}
