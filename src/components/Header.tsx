import { Link, useLocation } from 'react-router-dom';
import VersionSwitcher from './VersionSwitcher';

const navLinks = [
  { path: '/', label: 'Главная' },
  { path: '/rozysk', label: 'Внимание, розыск!' },
];

export default function Header() {
  const location = useLocation();

  return (
    <header>
      <div className="gov-header py-5 px-4">
        <div className="max-w-5xl mx-auto flex items-center gap-5 relative z-10">
          <div className="gerb-placeholder">⚖</div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium tracking-widest uppercase mb-1"
              style={{ color: 'var(--gov-gold)', letterSpacing: '0.12em' }}>
              Российская Федерация
            </p>
            <h1 className="font-bold leading-snug text-white"
              style={{ fontFamily: 'var(--font-main)', fontSize: 'clamp(0.95rem, 2.2vw, 1.2rem)' }}>
              Следственный комитет Российской Федерации
            </h1>
            <p className="text-sm font-medium mt-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Следственный отдел по Крымскому району
            </p>
          </div>
          <div className="flex-shrink-0 hidden sm:block">
            <VersionSwitcher />
          </div>
        </div>
      </div>

      <nav className="gov-nav sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex items-center px-4 gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-3 text-sm font-semibold transition-all duration-150 relative ${
                location.pathname === link.path
                  ? 'text-white'
                  : 'text-white/50 hover:text-white/80'
              }`}
            >
              {link.path === '/rozysk' && (
                <span className="mr-1.5 text-xs"
                  style={{ color: location.pathname === '/rozysk' ? '#f87171' : 'rgba(255,255,255,0.35)' }}>
                  ⚠
                </span>
              )}
              {link.label}
              {location.pathname === link.path && (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
                  style={{ background: 'var(--gov-gold)' }} />
              )}
            </Link>
          ))}
          <div className="ml-auto py-2 sm:hidden">
            <VersionSwitcher />
          </div>
        </div>
      </nav>
    </header>
  );
}
