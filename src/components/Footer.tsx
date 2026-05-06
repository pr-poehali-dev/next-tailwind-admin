export default function Footer() {
  return (
    <footer className="gov-footer mt-12 py-8 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
        <div>
          <p className="font-bold mb-2 text-white" style={{ fontFamily: 'var(--font-serif)' }}>
            Адрес
          </p>
          <p className="text-white/80 leading-relaxed">
            353380, Краснодарский край,<br />
            г. Крымск, ул. Демьяна Бедного, д. 16
          </p>
        </div>
        <div>
          <p className="font-bold mb-2 text-white" style={{ fontFamily: 'var(--font-serif)' }}>
            Контакты
          </p>
          <p className="text-white/80">Тел.: <span className="text-white">+7 (86131) 2-15-08</span></p>
          <p className="text-white/80 mt-1">Email: <span className="text-white">sk.krimsk@sledkom.ru</span></p>
        </div>
        <div>
          <p className="font-bold mb-2 text-white" style={{ fontFamily: 'var(--font-serif)' }}>
            Режим работы
          </p>
          <p className="text-white/80 leading-relaxed">
            Пн–Пт: 9:00–18:00<br />
            Перерыв: 13:00–14:00<br />
            Сб, Вс: выходной
          </p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto mt-6 pt-4 border-t border-white/20 text-center text-xs text-white/50">
        © 2026 Следственный комитет Российской Федерации. Следственный отдел по Крымскому району.
      </div>
    </footer>
  );
}
