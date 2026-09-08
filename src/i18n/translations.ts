export type Language = 'en' | 'ru' | 'az';

export interface Translations {
  common: {
    loading: string;
    error: string;
    success: string;
    cancel: string;
    submit: string;
    search: string;
    logout: string;
    profile: string;
    notifications: string;
  };
  auth: {
    register: string;
    login: string;
    joinFloor: string;
    createAccount: string;
    createAccountDesc: string;
    username: string;
    email: string;
    password: string;
    passwordHint: string;
    role: string;
    buyerOption: string;
    sellerOption: string;
    alreadyRegistered: string;
    newToAuctionhouse: string;
    welcomeBack: string;
    loginDesc: string;
  };
  home: {
    tagline: string;
    headline1: string;
    headline2: string;
    lede: string;
    searchPlaceholder: string;
    searchButton: string;
    featuredAuctions: string;
    categories: string;
    browseAll: string;
  };
  auctions: {
    browse: string;
    filters: string;
    searchBy: string;
    filterByCategory: string;
    filterByStatus: string;
    activeOnly: string;
    endingSoon: string;
    loadMore: string;
    noResults: string;
    currentBid: string;
    endingIn: string;
    viewAuction: string;
  };
  auction: {
    details: string;
    listedBy: string;
    currentHighestBid: string;
    startingPrice: string;
    totalBids: string;
    status: string;
    seller: string;
    winner: string;
    description: string;
    bidHistory: string;
    placeBid: string;
    yourBid: string;
    minBid: string;
  };
  theme: {
    light: string;
    dark: string;
  };
  languages: {
    en: string;
    ru: string;
    az: string;
  };
}

export const en: Translations = {
  common: {
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    cancel: 'Cancel',
    submit: 'Submit',
    search: 'Search',
    logout: 'Logout',
    profile: 'Profile',
    notifications: 'Notifications',
  },
  auth: {
    register: 'Create account',
    login: 'Log in',
    joinFloor: 'Join the floor',
    createAccount: 'Create your account',
    createAccountDesc: 'Register as a buyer to start bidding, or as a seller to list your own lots.',
    username: 'Username',
    email: 'Email',
    password: 'Password',
    passwordHint: 'At least 6 characters.',
    role: 'I want to…',
    buyerOption: 'Buy — bid on auctions',
    sellerOption: 'Sell — list my own auctions',
    alreadyRegistered: 'Already registered?',
    newToAuctionhouse: 'New to Auctionhouse?',
    welcomeBack: 'Welcome back',
    loginDesc: 'Access your account to place bids, track auctions, and manage your listings.',
  },
  home: {
    tagline: 'Premium auction marketplace',
    headline1: 'Bid with confidence.',
    headline2: 'Win with pride.',
    lede: 'Experience transparent real-time bidding on authenticated items. From rare collectibles to fine art, every auction is secure, fair, and expertly curated.',
    searchPlaceholder: 'Search for cameras, watches, art, rare collectibles…',
    searchButton: 'Search lots',
    featuredAuctions: 'Featured auctions',
    categories: 'Browse by category',
    browseAll: 'Browse all',
  },
  auctions: {
    browse: 'Browse auctions',
    filters: 'Filters',
    searchBy: 'Search by keyword',
    filterByCategory: 'Category',
    filterByStatus: 'Status',
    activeOnly: 'Active only',
    endingSoon: 'Ending soon',
    loadMore: 'Load more',
    noResults: 'No auctions found.',
    currentBid: 'Current bid',
    endingIn: 'Ending in',
    viewAuction: 'View auction',
  },
  auction: {
    details: 'Lot details',
    listedBy: 'Listed by',
    currentHighestBid: 'Current highest bid',
    startingPrice: 'Starting price',
    totalBids: 'Total bids',
    status: 'Status',
    seller: 'Seller',
    winner: 'Winner',
    description: 'Description',
    bidHistory: 'Bid history',
    placeBid: 'Place bid',
    yourBid: 'Your bid',
    minBid: 'Minimum bid',
  },
  theme: {
    light: 'Light',
    dark: 'Dark',
  },
  languages: {
    en: 'English',
    ru: 'Русский',
    az: 'Azərbaycanca',
  },
};

export const ru: Translations = {
  common: {
    loading: 'Загрузка...',
    error: 'Ошибка',
    success: 'Успешно',
    cancel: 'Отмена',
    submit: 'Отправить',
    search: 'Поиск',
    logout: 'Выход',
    profile: 'Профиль',
    notifications: 'Уведомления',
  },
  auth: {
    register: 'Создать аккаунт',
    login: 'Вход',
    joinFloor: 'Присоединитесь к торгам',
    createAccount: 'Создайте ваш аккаунт',
    createAccountDesc: 'Зарегистрируйтесь как покупатель для участия в аукционах или как продавец для размещения своих лотов.',
    username: 'Имя пользователя',
    email: 'Электронная почта',
    password: 'Пароль',
    passwordHint: 'Минимум 6 символов.',
    role: 'Я хочу…',
    buyerOption: 'Покупать — участвовать в аукционах',
    sellerOption: 'Продавать — размещать свои аукционы',
    alreadyRegistered: 'Уже зарегистрированы?',
    newToAuctionhouse: 'Новичок на Auctionhouse?',
    welcomeBack: 'Добро пожаловать',
    loginDesc: 'Получите доступ к вашему аккаунту, чтобы делать ставки, отслеживать аукционы и управлять объявлениями.',
  },
  home: {
    tagline: 'Премиум аукционный маркетплейс',
    headline1: 'Торгуйте с уверенностью.',
    headline2: 'Побеждайте с гордостью.',
    lede: 'Откройте для себя прозрачные торги в реальном времени на аутентичные предметы. От редких коллекционных вещей до изящного искусства – каждый аукцион безопасен, справедлив и компетентно отобран.',
    searchPlaceholder: 'Поиск камер, часов, искусства, редких коллекционных предметов…',
    searchButton: 'Искать лоты',
    featuredAuctions: 'Избранные аукционы',
    categories: 'Просмотр по категориям',
    browseAll: 'Просмотреть все',
  },
  auctions: {
    browse: 'Просмотр аукционов',
    filters: 'Фильтры',
    searchBy: 'Поиск по ключевому слову',
    filterByCategory: 'Категория',
    filterByStatus: 'Статус',
    activeOnly: 'Только активные',
    endingSoon: 'Заканчиваются скоро',
    loadMore: 'Загрузить еще',
    noResults: 'Аукционы не найдены.',
    currentBid: 'Текущая ставка',
    endingIn: 'Заканчивается через',
    viewAuction: 'Просмотреть аукцион',
  },
  auction: {
    details: 'Детали лота',
    listedBy: 'Выставлено',
    currentHighestBid: 'Текущая наивысшая ставка',
    startingPrice: 'Начальная цена',
    totalBids: 'Всего ставок',
    status: 'Статус',
    seller: 'Продавец',
    winner: 'Победитель',
    description: 'Описание',
    bidHistory: 'История ставок',
    placeBid: 'Сделать ставку',
    yourBid: 'Ваша ставка',
    minBid: 'Минимальная ставка',
  },
  theme: {
    light: 'Светлая',
    dark: 'Тёмная',
  },
  languages: {
    en: 'English',
    ru: 'Русский',
    az: 'Azərbaycanca',
  },
};

export const az: Translations = {
  common: {
    loading: 'Yüklənir...',
    error: 'Xəta',
    success: 'Uğurlu',
    cancel: 'Ləğv et',
    submit: 'Göndər',
    search: 'Axtarış',
    logout: 'Çıxış',
    profile: 'Profil',
    notifications: 'Bildirişlər',
  },
  auth: {
    register: 'Hesab yarat',
    login: 'Daxil ol',
    joinFloor: 'Satış zalına qoşul',
    createAccount: 'Hesabınızı yaradın',
    createAccountDesc: 'Müzayidə ilə iştirak etmək üçün alıcı kimi qeydiyyatdan keçin və ya öz müzayidələrinizi göstərmək üçün satıcı kimi.',
    username: 'İstifadəçi adı',
    email: 'E-poçt',
    password: 'Parol',
    passwordHint: 'Ən azı 6 simvol.',
    role: 'Mən istəyirəm…',
    buyerOption: 'Satın al — müzayidələrdə iştirak et',
    sellerOption: 'Sat — öz müzayidələrimi sırala',
    alreadyRegistered: 'Artıq qeydiyyatdan keçmisiniz?',
    newToAuctionhouse: 'Auctionhouse-da yenisiniz?',
    welcomeBack: 'Xoş gəlmisiniz',
    loginDesc: 'Müzayidələrdə iştirak etmək, auksionları izləmək və elanlarınızı idarə etmək üçün hesabınıza daxil olun.',
  },
  home: {
    tagline: 'Premium müzayidə bazarı',
    headline1: 'İtimadi ilə torgu edin.',
    headline2: 'Fəxrlə qazanın.',
    lede: 'Etibarlı əşyalarda real vaxt torgu ilə tanış olun. Nadir kolleksiyalı əşyalardan gözəl sənətə qədər, hər bir müzayidə təhlükəsiz, ədalətli və peşəkar tərəfindən seçilmiş.',
    searchPlaceholder: 'Kameralar, saatlar, sənət, nadir kolleksiya əşyaları axtarış…',
    searchButton: 'Lotları axtarış edin',
    featuredAuctions: 'Seçilmiş müzayidələr',
    categories: 'Kategoriyaya görə göz at',
    browseAll: 'Hamısını bax',
  },
  auctions: {
    browse: 'Müzayidələri göz at',
    filters: 'Filtrləri',
    searchBy: 'Açar söz ilə axtarış',
    filterByCategory: 'Kategoriya',
    filterByStatus: 'Status',
    activeOnly: 'Yalnız aktiv',
    endingSoon: 'Çox sürətli bitəcək',
    loadMore: 'Daha çox yüklə',
    noResults: 'Müzayidə tapılmadı.',
    currentBid: 'Cari təklif',
    endingIn: 'Bitməsi qalıb',
    viewAuction: 'Müzayidəni göz at',
  },
  auction: {
    details: 'Lot detalları',
    listedBy: 'Sıralandı',
    currentHighestBid: 'Cari ən yüksək təklif',
    startingPrice: 'Başlanğıc qiyməti',
    totalBids: 'Ümumi təkliflər',
    status: 'Status',
    seller: 'Satıcı',
    winner: 'Qalibi',
    description: 'Təsvir',
    bidHistory: 'Təklif tarixi',
    placeBid: 'Təklif ver',
    yourBid: 'Sizin təklifiniz',
    minBid: 'Minimum təklif',
  },
  theme: {
    light: 'Işıqlı',
    dark: 'Tünd',
  },
  languages: {
    en: 'English',
    ru: 'Русский',
    az: 'Azərbaycanca',
  },
};

export const translations: Record<Language, Translations> = {
  en,
  ru,
  az,
};

export function getTranslation(lang: Language): Translations {
  return translations[lang] || en;
}
