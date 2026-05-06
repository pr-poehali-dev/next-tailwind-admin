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
      setPasswordError('Неверный пароль');
    }
  };

  const handleLogout = () => {
    setAuthed(false);
    sessionStorage.removeItem('sk_admin_authed');
  };

  const showSaved = () => {
    setSaveStatus('Сохранено!');
    setTimeout(() => setSaveStatus(''), 2500);
  };

  const handleSaveHome = (e: React.FormEvent) => {
    e.preventDefault();
    if (homeContent) { saveHomeContent(homeContent); showSaved(); }
  };

  const handleSaveRozysk = (e: React.FormEvent) => {
    e.preventDefault();
    if (rozyskContent) { saveRozyskContent(rozyskContent); showSaved(); }
  };

  const updateNews = (idx: number, field: string, value: string) => {
    if (!homeContent) return;
    const news = [...homeContent.news];
    news[idx] = { ...news[idx], [field]: value };
    setHomeContent({ ...homeContent, news });
  };

  const addNews = () => {
    if (!homeContent) return;
    const newItem = { id: Date.now(), title: 'Новая новость', date: new Date().toLocaleDateString('ru-RU'), text: '' };
    setHomeContent({ ...homeContent, news: [newItem, ...homeContent.news] });
  };

  const removeNews = (idx: number) => {
    if (!homeContent) return;
    setHomeContent({ ...homeContent, news: homeContent.news.filter((_, i) => i !== idx) });
  };

  const updateSuspect = (idx: number, field: string, value: string) => {
    if (!rozyskContent) return;
    const suspects = [...rozyskContent.suspects];
    suspects[idx] = { ...suspects[idx], [field]: value };
    setRozyskContent({ ...rozyskContent, suspects });
  };

  const addSuspect = () => {
    if (!rozyskContent) return;
    setRozyskContent({ ...rozyskContent, suspects: [...rozyskContent.suspects, { id: Date.now(), name: '', dob: '', description: '', crime: '' }] });
  };

  const removeSuspect = (idx: number) => {
    if (!rozyskContent) return;
    setRozyskContent({ ...rozyskContent, suspects: rozyskContent.suspects.filter((_, i) => i !== idx) });
  };

  const inputCls = "gov-input";
  const labelCls = "block text-xs font-semibold mb-1.5";

  if (!authed) {
    return (
      <div style={{ backgroundColor: 'var(--gov-bg)', minHeight: '100vh' }}>
        <Header />
        <div className="max-w-sm mx-auto px-4 py-20">
          <div className="gov-card p-8">
            <div className="text-center mb-7">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl"
                style={{ background: 'var(--gov-blue-pale)' }}>
                🔒
              </div>
              <h1 className="font-bold text-xl mb-1" style={{ color: 'var(--gov-blue)' }}>
                Панель управления
              </h1>
              <p className="text-sm" style={{ color: 'var(--gov-text-muted)' }}>Введите пароль для доступа</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className={labelCls} style={{ color: 'var(--gov-text)' }}>Пароль</label>
                <input
                  type="password" value={password} autoFocus
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputCls}
                  style={{ borderColor: passwordError ? 'var(--gov-red)' : undefined }}
                />
                {passwordError && (
                  <p className="text-xs mt-1.5 font-medium" style={{ color: 'var(--gov-red)' }}>{passwordError}</p>
                )}
              </div>
              <button type="submit" className="gov-btn-primary w-full py-2.5 rounded-lg font-semibold text-sm">
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

        {/* Шапка */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-bold text-xl" style={{ color: 'var(--gov-blue)' }}>
              Управление контентом
            </h1>
            <p className="text-xs mt-0.5" style={{ color: 'var(--gov-text-muted)' }}>
              Изменения сохраняются в браузере и сразу отображаются на сайте
            </p>
          </div>
          <div className="flex items-center gap-3">
            {saveStatus && (
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full"
                style={{ background: '#f0fdf4', color: '#16a34a', border: '1px solid #86efac' }}>
                ✓ {saveStatus}
              </span>
            )}
            <button onClick={handleLogout}
              className="text-xs px-3 py-2 rounded-lg border font-medium hover:bg-gray-50"
              style={{ borderColor: 'var(--gov-border)', color: 'var(--gov-text-muted)' }}>
              Выйти
            </button>
          </div>
        </div>

        {/* Табы */}
        <div className="flex gap-1 mb-0 border-b" style={{ borderColor: 'var(--gov-border)' }}>
          {(['home', 'rozysk'] as Tab[]).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 text-sm font-semibold transition-all ${activeTab === tab ? 'tab-active' : 'tab-inactive'}`}>
              {tab === 'home' ? '📋 Главная страница' : '⚠ Страница розыска'}
            </button>
          ))}
        </div>

        {/* Редактор Главной */}
        {activeTab === 'home' && homeContent && (
          <form onSubmit={handleSaveHome} className="space-y-5 pt-6">

            <div className="gov-card p-5">
              <h2 className="font-bold text-sm mb-4 flex items-center gap-2"
                style={{ color: 'var(--gov-blue)' }}>
                <span className="w-1 h-4 rounded-full inline-block" style={{ background: 'var(--gov-blue)' }} />
                Заголовки страницы
              </h2>
              <div className="space-y-3">
                <div>
                  <label className={labelCls} style={{ color: 'var(--gov-text)' }}>Основной заголовок</label>
                  <input type="text" value={homeContent.title} className={inputCls}
                    onChange={(e) => setHomeContent({ ...homeContent, title: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls} style={{ color: 'var(--gov-text)' }}>Подзаголовок</label>
                  <input type="text" value={homeContent.subtitle} className={inputCls}
                    onChange={(e) => setHomeContent({ ...homeContent, subtitle: e.target.value })} />
                </div>
              </div>
            </div>

            <div className="gov-card p-5">
              <h2 className="font-bold text-sm mb-4 flex items-center gap-2"
                style={{ color: 'var(--gov-blue)' }}>
                <span className="w-1 h-4 rounded-full inline-block" style={{ background: 'var(--gov-blue)' }} />
                Контактная информация
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {(['address', 'phone', 'email', 'schedule'] as const).map((field) => (
                  <div key={field}>
                    <label className={labelCls} style={{ color: 'var(--gov-text)' }}>
                      {field === 'address' ? 'Адрес' : field === 'phone' ? 'Телефон' : field === 'email' ? 'Email' : 'Режим работы'}
                    </label>
                    <input type="text" value={homeContent.contact[field]} className={inputCls}
                      onChange={(e) => setHomeContent({ ...homeContent, contact: { ...homeContent.contact, [field]: e.target.value } })} />
                  </div>
                ))}
              </div>
            </div>

            <div className="gov-card p-5">
              <h2 className="font-bold text-sm mb-4 flex items-center gap-2"
                style={{ color: 'var(--gov-blue)' }}>
                <span className="w-1 h-4 rounded-full inline-block" style={{ background: 'var(--gov-blue)' }} />
                Руководитель
              </h2>
              <div className="space-y-3">
                {(['name', 'rank', 'bio'] as const).map((field) => (
                  <div key={field}>
                    <label className={labelCls} style={{ color: 'var(--gov-text)' }}>
                      {field === 'name' ? 'ФИО' : field === 'rank' ? 'Звание / должность' : 'Биография'}
                    </label>
                    {field === 'bio' ? (
                      <textarea rows={2} value={homeContent.chief[field]} className={`${inputCls} resize-none`}
                        onChange={(e) => setHomeContent({ ...homeContent, chief: { ...homeContent.chief, [field]: e.target.value } })} />
                    ) : (
                      <input type="text" value={homeContent.chief[field]} className={inputCls}
                        onChange={(e) => setHomeContent({ ...homeContent, chief: { ...homeContent.chief, [field]: e.target.value } })} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="gov-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-sm flex items-center gap-2"
                  style={{ color: 'var(--gov-blue)' }}>
                  <span className="w-1 h-4 rounded-full inline-block" style={{ background: 'var(--gov-blue)' }} />
                  Новости ({homeContent.news.length})
                </h2>
                <button type="button" onClick={addNews} className="gov-btn-primary text-xs px-3 py-1.5 rounded-lg">
                  + Добавить
                </button>
              </div>
              <div className="space-y-4">
                {homeContent.news.map((item, idx) => (
                  <div key={item.id} className="p-4 rounded-xl" style={{ background: 'var(--gov-surface2)', border: '1px solid var(--gov-border)' }}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="badge-blue">#{idx + 1}</span>
                      <button type="button" onClick={() => removeNews(idx)}
                        className="text-xs font-medium hover:underline" style={{ color: 'var(--gov-red)' }}>
                        Удалить
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      <div className="col-span-2">
                        <label className={labelCls} style={{ color: 'var(--gov-text)' }}>Заголовок</label>
                        <input type="text" value={item.title} className={inputCls}
                          onChange={(e) => updateNews(idx, 'title', e.target.value)} />
                      </div>
                      <div>
                        <label className={labelCls} style={{ color: 'var(--gov-text)' }}>Дата</label>
                        <input type="text" value={item.date} className={inputCls}
                          onChange={(e) => updateNews(idx, 'date', e.target.value)} />
                      </div>
                    </div>
                    <label className={labelCls} style={{ color: 'var(--gov-text)' }}>Текст</label>
                    <textarea rows={2} value={item.text} className={`${inputCls} resize-none`}
                      onChange={(e) => updateNews(idx, 'text', e.target.value)} />
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" className="gov-btn-primary w-full py-3 rounded-xl font-semibold">
              Сохранить главную страницу
            </button>
          </form>
        )}

        {/* Редактор Розыска */}
        {activeTab === 'rozysk' && rozyskContent && (
          <form onSubmit={handleSaveRozysk} className="space-y-5 pt-6">

            <div className="gov-card p-5">
              <h2 className="font-bold text-sm mb-4 flex items-center gap-2"
                style={{ color: 'var(--gov-blue)' }}>
                <span className="w-1 h-4 rounded-full inline-block" style={{ background: 'var(--gov-red)' }} />
                Основные тексты
              </h2>
              <div className="space-y-3">
                <div>
                  <label className={labelCls} style={{ color: 'var(--gov-text)' }}>Заголовок</label>
                  <input type="text" value={rozyskContent.title} className={inputCls}
                    onChange={(e) => setRozyskContent({ ...rozyskContent, title: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls} style={{ color: 'var(--gov-text)' }}>Описание</label>
                  <textarea rows={3} value={rozyskContent.description} className={`${inputCls} resize-none`}
                    onChange={(e) => setRozyskContent({ ...rozyskContent, description: e.target.value })} />
                </div>
              </div>
            </div>

            <div className="gov-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-sm flex items-center gap-2"
                  style={{ color: 'var(--gov-blue)' }}>
                  <span className="w-1 h-4 rounded-full inline-block" style={{ background: 'var(--gov-red)' }} />
                  Разыскиваемые лица ({rozyskContent.suspects.length})
                </h2>
                <button type="button" onClick={addSuspect} className="gov-btn-red text-xs px-3 py-1.5 rounded-lg">
                  + Добавить
                </button>
              </div>
              <div className="space-y-4">
                {rozyskContent.suspects.map((suspect, idx) => (
                  <div key={suspect.id} className="p-4 rounded-xl"
                    style={{ background: '#fff8f8', border: '1px solid #fecaca' }}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="badge-red">Лицо №{idx + 1}</span>
                      <button type="button" onClick={() => removeSuspect(idx)}
                        className="text-xs font-medium hover:underline" style={{ color: 'var(--gov-red)' }}>
                        Удалить
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <div>
                        <label className={labelCls} style={{ color: 'var(--gov-text)' }}>ФИО</label>
                        <input type="text" value={suspect.name} className={inputCls}
                          onChange={(e) => updateSuspect(idx, 'name', e.target.value)} />
                      </div>
                      <div>
                        <label className={labelCls} style={{ color: 'var(--gov-text)' }}>Дата рождения</label>
                        <input type="text" value={suspect.dob} placeholder="ДД.ММ.ГГГГ" className={inputCls}
                          onChange={(e) => updateSuspect(idx, 'dob', e.target.value)} />
                      </div>
                    </div>
                    <div className="mb-2">
                      <label className={labelCls} style={{ color: 'var(--gov-text)' }}>Описание внешности</label>
                      <textarea rows={2} value={suspect.description} className={`${inputCls} resize-none`}
                        onChange={(e) => updateSuspect(idx, 'description', e.target.value)} />
                    </div>
                    <div>
                      <label className={labelCls} style={{ color: 'var(--gov-text)' }}>Статья / преступление</label>
                      <input type="text" value={suspect.crime} className={inputCls}
                        onChange={(e) => updateSuspect(idx, 'crime', e.target.value)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" className="gov-btn-red w-full py-3 rounded-xl font-semibold">
              Сохранить страницу розыска
            </button>
          </form>
        )}
      </main>
    </div>
  );
}
