import { useState, useEffect } from 'react';

export default function VersionSwitcher() {
  const [isHighContrast, setIsHighContrast] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('sk_high_contrast');
    if (saved === 'true') {
      setIsHighContrast(true);
      document.body.classList.add('high-contrast');
    }
  }, []);

  const toggle = () => {
    const next = !isHighContrast;
    setIsHighContrast(next);
    localStorage.setItem('sk_high_contrast', String(next));
    if (next) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  };

  return (
    <button
      onClick={toggle}
      className="version-switcher"
      title="Версия для слабовидящих"
      aria-label="Переключить версию для слабовидящих"
    >
      {isHighContrast ? '🔆 Обычная версия' : '👁 Для слабовидящих'}
    </button>
  );
}
