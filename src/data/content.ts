export interface NewsItem {
  id: number;
  title: string;
  date: string;
  text: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  schedule: string;
}

export interface ChiefInfo {
  name: string;
  rank: string;
  bio: string;
}

export interface HomeContent {
  title: string;
  subtitle: string;
  news: NewsItem[];
  contact: ContactInfo;
  chief: ChiefInfo;
}

export interface RozyskContent {
  title: string;
  description: string;
  formTitle: string;
  suspects: RozyskPerson[];
}

export interface RozyskPerson {
  id: number;
  name: string;
  dob: string;
  description: string;
  crime: string;
}

const HOME_KEY = 'sk_home_content';
const ROZYSK_KEY = 'sk_rozysk_content';

export const defaultHomeContent: HomeContent = {
  title: 'Следственный комитет Российской Федерации',
  subtitle: 'Следственный отдел по Крымскому району',
  news: [
    {
      id: 1,
      title: 'Возбуждено уголовное дело по факту мошенничества',
      date: '05.05.2026',
      text: 'Следственным отделом по Крымскому району возбуждено уголовное дело по признакам преступления, предусмотренного ч. 2 ст. 159 УК РФ. Следствие продолжается.',
    },
    {
      id: 2,
      title: 'Итоги работы за апрель 2026 года',
      date: '01.05.2026',
      text: 'В апреле 2026 года следственным отделом рассмотрено 47 сообщений о преступлениях, возбуждено 12 уголовных дел. Раскрываемость составила 78%.',
    },
    {
      id: 3,
      title: 'Профилактическое мероприятие в школах района',
      date: '22.04.2026',
      text: 'Сотрудники следственного отдела провели профилактические беседы в образовательных учреждениях Крымского района по теме правомерного поведения.',
    },
  ],
  contact: {
    address: '353380, Краснодарский край, г. Крымск, ул. Демьяна Бедного, д. 16',
    phone: '+7 (86131) 2-15-08',
    email: 'sk.krimsk@sledkom.ru',
    schedule: 'Пн–Пт: 9:00–18:00, перерыв 13:00–14:00',
  },
  chief: {
    name: 'Иванов Александр Петрович',
    rank: 'Подполковник юстиции',
    bio: 'Руководитель следственного отдела по Крымскому району. Стаж работы в органах — 15 лет.',
  },
};

export const defaultRozyskContent: RozyskContent = {
  title: 'Внимание, розыск!',
  description:
    'На данной странице размещены сведения о лицах, объявленных в розыск следственным отделом по Крымскому району. Если вам известно местонахождение указанных лиц, просим незамедлительно сообщить по телефону +7 (86131) 2-15-08 или обратиться в ближайшее подразделение полиции.',
  formTitle: 'Сообщить о местонахождении',
  suspects: [
    {
      id: 1,
      name: 'Петров Дмитрий Николаевич',
      dob: '12.03.1985',
      description: 'Рост 178 см, телосложение среднее, волосы тёмно-русые, глаза серые.',
      crime: 'Подозревается в совершении преступления по ст. 158 УК РФ (кража)',
    },
    {
      id: 2,
      name: 'Сидорова Елена Васильевна',
      dob: '04.07.1991',
      description: 'Рост 165 см, телосложение худощавое, волосы светлые, глаза голубые.',
      crime: 'Подозревается в совершении преступления по ст. 159 УК РФ (мошенничество)',
    },
  ],
};

export function getHomeContent(): HomeContent {
  try {
    const stored = localStorage.getItem(HOME_KEY);
    if (stored) return JSON.parse(stored) as HomeContent;
  } catch (e) { console.error(e); }
  return defaultHomeContent;
}

export function saveHomeContent(data: HomeContent): void {
  localStorage.setItem(HOME_KEY, JSON.stringify(data));
}

export function getRozyskContent(): RozyskContent {
  try {
    const stored = localStorage.getItem(ROZYSK_KEY);
    if (stored) return JSON.parse(stored) as RozyskContent;
  } catch (e) { console.error(e); }
  return defaultRozyskContent;
}

export function saveRozyskContent(data: RozyskContent): void {
  localStorage.setItem(ROZYSK_KEY, JSON.stringify(data));
}