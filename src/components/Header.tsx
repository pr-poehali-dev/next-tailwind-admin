import { Link, useLocation } from 'react-router-dom';
import VersionSwitcher from './VersionSwitcher';

const navLinks = [
  { path: '/', label: 'Главная' },
  { path: '/rozysk', label: '⚠ Внимание, розыск!' },
];

export default function Header() {
  const location = useLocation();

  return (
    <header>
      <div className="gov-header py-4 px-4">
        <div className="max-w-5xl mx-auto flex items-center gap-5">
          <div className="gerb-placeholder text-3xl select-none">⚖</div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-white/60 uppercase tracking-widest mb-0.5" style={{ fontFamily: 'var(--font-narrow)' }}>
              Российская Федерация
            </p>
            <h1 className="text-white font-bold leading-tight" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(0.95rem, 2.5vw, 1.25rem)' }}>
              Следственный комитет Российской Федерации
            </h1>
            <p className="text-sm mt-0.5" style={{ color: 'var(--gov-gold)', fontFamily: 'var(--font-narrow)' }}>
              Следственный отдел по Крымскому району
            </p>
          </div>
          <div className="flex-shrink-0">
            <VersionSwitcher />
          </div>
        </div>
      </div>

      <nav className="gov-nav">
        <div className="max-w-5xl mx-auto flex items-center px-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-3 text-sm font-bold transition-colors duration-150 border-b-2 ${
                location.pathname === link.path
                  ? 'text-white border-[var(--gov-gold)] bg-white/10'
                  : 'text-white/75 border-transparent hover:text-white hover:border-white/40'
              }`}
              style={{ fontFamily: 'var(--font-narrow)', letterSpacing: '0.03em' }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
