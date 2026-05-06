import { useEffect, useState } from 'react';
import {
  getHomeContent, saveHomeContent, HomeContent,
  getRozyskContent, saveRozyskContent, RozyskContent
} from '@/data/content';
import Header from '@/components/Header';

const ADMIN_PASSWORD = 'admin123';

type Tab = 'home' | 'rozysk';

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [saveStatus, setSaveStatus] = useState('');

  const [homeContent, setHomeContent] = useState<HomeContent | null>(null);
  const [rozyskContent, setRozyskContent] = useState<RozyskContent | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem('sk_admin_authed');
    if (saved === 'true') setAuthed(true);
  }, []);

  useEffect(() => {
    if (authed) {
      setHomeContent(getHomeContent());
      setRozyskContent(getRozyskContent());
    }
  }, [authed]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      sessionStorage.setItem('sk_admin_authed', 'true');
      setPasswordError('');
    } else {
      setPasswordError('Неверный пароль. Попробуйте снова.');
    }
  };

  const handleLogout = () => {
    setAuthed(false);
    sessionStorage.removeItem('sk_admin_authed');
  };

  const showSaved = () => {
    setSaveStatus('✓ Сохранено успешно!');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const handleSaveHome = (e: React.FormEvent) => {
    e.preventDefault();
    if (homeContent) {
      saveHomeContent(homeContent);
      showSaved();
    }
  };

  const handleSaveRozysk = (e: React.FormEvent) => {
    e.preventDefault();
    if (rozyskContent) {
      saveRozyskContent(rozyskContent);
      showSaved();
    }
  };

  const updateNews = (idx: number, field: string, value: string) => {
    if (!homeContent) return;
    const news = [...homeContent.news];
    news[idx] = { ...news[idx], [field]: value };
    setHomeContent({ ...homeContent, news });
  };

  const addNews = () => {
    if (!homeContent) return;
    const newItem = {
      id: Date.now(),
      title: 'Новая новость',
      date: new Date().toLocaleDateString('ru-RU'),
      text: '',
    };
    setHomeContent({ ...homeContent, news: [newItem, ...homeContent.news] });
  };

  const removeNews = (idx: number) => {
    if (!homeContent) return;
    const news = homeContent.news.filter((_, i) => i !== idx);
    setHomeContent({ ...homeContent, news });
  };

  const updateSuspect = (idx: number, field: string, value: string) => {
    if (!rozyskContent) return;
    const suspects = [...rozyskContent.suspects];
    suspects[idx] = { ...suspects[idx], [field]: value };
    setRozyskContent({ ...rozyskContent, suspects });
  };

  const addSuspect = () => {
    if (!rozyskContent) return;
    const newSuspect = { id: Date.now(), name: '', dob: '', description: '', crime: '' };
    setRozyskContent({ ...rozyskContent, suspects: [...rozyskContent.suspects, newSuspect] });
  };

  const removeSuspect = (idx: number) => {
    if (!rozyskContent) return;
    const suspects = rozyskContent.suspects.filter((_, i) => i !== idx);
    setRozyskContent({ ...rozyskContent, suspects });
  };

  if (!authed) {
    return (
      <div style={{ backgroundColor: 'var(--gov-bg)', minHeight: '100vh' }}>
        <Header />
        <div className="max-w-md mx-auto px-4 py-16">
          <div className="gov-card rounded-sm p-8 shadow-sm">
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">🔒</div>
              <h1 className="text-xl font-bold" style={{ color: 'var(--gov-blue)', fontFamily: 'var(--font-serif)' }}>
                Панель администратора
              </h1>
              <p className="text-sm mt-1" style={{ color: 'var(--gov-text-muted)' }}>Введите пароль для доступа</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1" style={{ color: 'var(--gov-text)' }}>
                  Пароль
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoFocus
                  className="w-full px-3 py-2 border rounded-sm text-sm outline-none"
                  style={{ borderColor: passwordError ? 'var(--gov-red)' : 'var(--gov-border)', color: 'var(--gov-text)', backgroundColor: 'white' }}
                />
                {passwordError && (
                  <p className="text-xs mt-1" style={{ color: 'var(--gov-red)' }}>{passwordError}</p>
                )}
              </div>
              <button type="submit" className="gov-btn-primary w-full rounded-sm">
                Войти
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--gov-bg)', minHeight: '100vh' }}>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">

        {/* Шапка панели */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold" style={{ color: 'var(--gov-blue)', fontFamily: 'var(--font-serif)' }}>
              🛠 Панель управления контентом
            </h1>
            <p className="text-xs mt-0.5" style={{ color: 'var(--gov-text-muted)' }}>
              Изменения сохраняются локально и отображаются сразу на сайте
            </p>
          </div>
          <button onClick={handleLogout} className="text-xs px-3 py-1.5 border rounded-sm hover:bg-gray-100"
            style={{ borderColor: 'var(--gov-border)', color: 'var(--gov-text-muted)' }}>
            Выйти
          </button>
        </div>

        {/* Статус сохранения */}
        {saveStatus && (
          <div className="mb-4 px-4 py-3 rounded-sm text-sm font-bold"
            style={{ background: '#f0fff0', border: '1px solid #90c090', color: '#006400' }}>
            {saveStatus}
          </div>
        )}

        {/* Табы */}
        <div className="flex gap-1 mb-6">
          {(['home', 'rozysk'] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 text-sm font-bold rounded-t-sm transition-colors ${activeTab === tab ? 'tab-active' : 'tab-inactive'}`}
            >
              {tab === 'home' ? '📋 Главная страница' : '⚠ Страница розыска'}
            </button>
          ))}
        </div>

        {/* Редактор Главной */}
        {activeTab === 'home' && homeContent && (
          <form onSubmit={handleSaveHome} className="space-y-6">

            {/* Шапка */}
            <div className="gov-card rounded-sm p-5 shadow-sm">
              <h2 className="font-bold text-base mb-4" style={{ color: 'var(--gov-blue)', fontFamily: 'var(--font-serif)' }}>
                Заголовки страницы
              </h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold mb-1">Основной заголовок</label>
                  <input type="text" value={homeContent.title}
                    onChange={(e) => setHomeContent({ ...homeContent, title: e.target.value })}
                    className="w-full px-3 py-2 border rounded-sm text-sm"
                    style={{ borderColor: 'var(--gov-border)', color: 'var(--gov-text)', backgroundColor: 'white' }} />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Подзаголовок</label>
                  <input type="text" value={homeContent.subtitle}
                    onChange={(e) => setHomeContent({ ...homeContent, subtitle: e.target.value })}
                    className="w-full px-3 py-2 border rounded-sm text-sm"
                    style={{ borderColor: 'var(--gov-border)', color: 'var(--gov-text)', backgroundColor: 'white' }} />
                </div>
              </div>
            </div>

            {/* Контакты */}
            <div className="gov-card rounded-sm p-5 shadow-sm">
              <h2 className="font-bold text-base mb-4" style={{ color: 'var(--gov-blue)', fontFamily: 'var(--font-serif)' }}>
                Контактная информация
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {(['address', 'phone', 'email', 'schedule'] as const).map((field) => (
                  <div key={field}>
                    <label className="block text-xs font-bold mb-1 capitalize">
                      {field === 'address' ? 'Адрес' : field === 'phone' ? 'Телефон' : field === 'email' ? 'Email' : 'Режим работы'}
                    </label>
                    <input type="text" value={homeContent.contact[field]}
                      onChange={(e) => setHomeContent({ ...homeContent, contact: { ...homeContent.contact, [field]: e.target.value } })}
                      className="w-full px-3 py-2 border rounded-sm text-sm"
                      style={{ borderColor: 'var(--gov-border)', color: 'var(--gov-text)', backgroundColor: 'white' }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Руководство */}
            <div className="gov-card rounded-sm p-5 shadow-sm">
              <h2 className="font-bold text-base mb-4" style={{ color: 'var(--gov-blue)', fontFamily: 'var(--font-serif)' }}>
                Информация о руководителе
              </h2>
              <div className="space-y-3">
                {(['name', 'rank', 'bio'] as const).map((field) => (
                  <div key={field}>
                    <label className="block text-xs font-bold mb-1">
                      {field === 'name' ? 'ФИО' : field === 'rank' ? 'Звание / должность' : 'Биография'}
                    </label>
                    {field === 'bio' ? (
                      <textarea rows={3} value={homeContent.chief[field]}
                        onChange={(e) => setHomeContent({ ...homeContent, chief: { ...homeContent.chief, [field]: e.target.value } })}
                        className="w-full px-3 py-2 border rounded-sm text-sm resize-none"
                        style={{ borderColor: 'var(--gov-border)', color: 'var(--gov-text)', backgroundColor: 'white' }} />
                    ) : (
                      <input type="text" value={homeContent.chief[field]}
                        onChange={(e) => setHomeContent({ ...homeContent, chief: { ...homeContent.chief, [field]: e.target.value } })}
                        className="w-full px-3 py-2 border rounded-sm text-sm"
                        style={{ borderColor: 'var(--gov-border)', color: 'var(--gov-text)', backgroundColor: 'white' }} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Новости */}
            <div className="gov-card rounded-sm p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-base" style={{ color: 'var(--gov-blue)', fontFamily: 'var(--font-serif)' }}>
                  Новости ({homeContent.news.length})
                </h2>
                <button type="button" onClick={addNews} className="gov-btn-primary text-sm rounded-sm px-3 py-1.5">
                  + Добавить новость
                </button>
              </div>
              <div className="space-y-4">
                {homeContent.news.map((item, idx) => (
                  <div key={item.id} className="p-4 rounded-sm" style={{ background: '#f8f7f4', border: '1px solid var(--gov-border)' }}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold px-2 py-0.5 rounded"
                        style={{ backgroundColor: 'var(--gov-blue)', color: 'white' }}>
                        #{idx + 1}
                      </span>
                      <button type="button" onClick={() => removeNews(idx)}
                        className="text-xs px-2 py-1 rounded hover:bg-red-100"
                        style={{ color: 'var(--gov-red)' }}>
                        ✕ Удалить
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      <div className="col-span-2">
                        <label className="block text-xs font-bold mb-1">Заголовок</label>
                        <input type="text" value={item.title}
                          onChange={(e) => updateNews(idx, 'title', e.target.value)}
                          className="w-full px-3 py-2 border rounded-sm text-sm"
                          style={{ borderColor: 'var(--gov-border)', color: 'var(--gov-text)', backgroundColor: 'white' }} />
                      </div>
                      <div>
                        <label className="block text-xs font-bold mb-1">Дата</label>
                        <input type="text" value={item.date}
                          onChange={(e) => updateNews(idx, 'date', e.target.value)}
                          className="w-full px-3 py-2 border rounded-sm text-sm"
                          style={{ borderColor: 'var(--gov-border)', color: 'var(--gov-text)', backgroundColor: 'white' }} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1">Текст новости</label>
                      <textarea rows={2} value={item.text}
                        onChange={(e) => updateNews(idx, 'text', e.target.value)}
                        className="w-full px-3 py-2 border rounded-sm text-sm resize-none"
                        style={{ borderColor: 'var(--gov-border)', color: 'var(--gov-text)', backgroundColor: 'white' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" className="gov-btn-primary w-full py-3 text-base rounded-sm">
              💾 Сохранить изменения главной страницы
            </button>
          </form>
        )}

        {/* Редактор Розыска */}
        {activeTab === 'rozysk' && rozyskContent && (
          <form onSubmit={handleSaveRozysk} className="space-y-6">

            <div className="gov-card rounded-sm p-5 shadow-sm">
              <h2 className="font-bold text-base mb-4" style={{ color: 'var(--gov-blue)', fontFamily: 'var(--font-serif)' }}>
                Основные тексты
              </h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold mb-1">Заголовок страницы</label>
                  <input type="text" value={rozyskContent.title}
                    onChange={(e) => setRozyskContent({ ...rozyskContent, title: e.target.value })}
                    className="w-full px-3 py-2 border rounded-sm text-sm"
                    style={{ borderColor: 'var(--gov-border)', color: 'var(--gov-text)', backgroundColor: 'white' }} />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Описание / предупреждение</label>
                  <textarea rows={4} value={rozyskContent.description}
                    onChange={(e) => setRozyskContent({ ...rozyskContent, description: e.target.value })}
                    className="w-full px-3 py-2 border rounded-sm text-sm resize-none"
                    style={{ borderColor: 'var(--gov-border)', color: 'var(--gov-text)', backgroundColor: 'white' }} />
                </div>
              </div>
            </div>

            <div className="gov-card rounded-sm p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-base" style={{ color: 'var(--gov-blue)', fontFamily: 'var(--font-serif)' }}>
                  Разыскиваемые лица ({rozyskContent.suspects.length})
                </h2>
                <button type="button" onClick={addSuspect} className="gov-btn-red text-sm rounded-sm px-3 py-1.5">
                  + Добавить
                </button>
              </div>
              <div className="space-y-4">
                {rozyskContent.suspects.map((suspect, idx) => (
                  <div key={suspect.id} className="p-4 rounded-sm"
                    style={{ background: '#fff8f8', border: '1px solid #fdd' }}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold px-2 py-0.5 rounded"
                        style={{ backgroundColor: 'var(--gov-red)', color: 'white' }}>
                        Лицо №{idx + 1}
                      </span>
                      <button type="button" onClick={() => removeSuspect(idx)}
                        className="text-xs px-2 py-1 rounded hover:bg-red-100"
                        style={{ color: 'var(--gov-red)' }}>
                        ✕ Удалить
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <div>
                        <label className="block text-xs font-bold mb-1">ФИО</label>
                        <input type="text" value={suspect.name}
                          onChange={(e) => updateSuspect(idx, 'name', e.target.value)}
                          className="w-full px-3 py-2 border rounded-sm text-sm"
                          style={{ borderColor: '#fdd', color: 'var(--gov-text)', backgroundColor: 'white' }} />
                      </div>
                      <div>
                        <label className="block text-xs font-bold mb-1">Дата рождения</label>
                        <input type="text" value={suspect.dob}
                          onChange={(e) => updateSuspect(idx, 'dob', e.target.value)}
                          placeholder="ДД.ММ.ГГГГ"
                          className="w-full px-3 py-2 border rounded-sm text-sm"
                          style={{ borderColor: '#fdd', color: 'var(--gov-text)', backgroundColor: 'white' }} />
                      </div>
                    </div>
                    <div className="mb-2">
                      <label className="block text-xs font-bold mb-1">Внешность / описание</label>
                      <textarea rows={2} value={suspect.description}
                        onChange={(e) => updateSuspect(idx, 'description', e.target.value)}
                        className="w-full px-3 py-2 border rounded-sm text-sm resize-none"
                        style={{ borderColor: '#fdd', color: 'var(--gov-text)', backgroundColor: 'white' }} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1">Статья / преступление</label>
                      <input type="text" value={suspect.crime}
                        onChange={(e) => updateSuspect(idx, 'crime', e.target.value)}
                        className="w-full px-3 py-2 border rounded-sm text-sm"
                        style={{ borderColor: '#fdd', color: 'var(--gov-text)', backgroundColor: 'white' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" className="gov-btn-red w-full py-3 text-base rounded-sm">
              💾 Сохранить изменения страницы розыска
            </button>
          </form>
        )}
      </main>
    </div>
  );
}
