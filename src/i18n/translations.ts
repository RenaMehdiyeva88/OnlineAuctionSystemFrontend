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
    loginVisualText: string;
    registerVisualText: string;
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
  pages: {
    notFoundLot: string;
    notFoundTitle: string;
    notFoundText: string;
    notFoundBack: string;
    profileEyebrow: string;
    profileUsername: string;
    profileEmail: string;
    profileAccountType: string;
    profileUserId: string;
    profileGoToDashboard: string;
    profileLogout: string;
    profileLoading: string;
    profileRefreshError: string;
    notificationsEyebrow: string;
    notificationsTitle: string;
    notificationsSubtitle: string;
    notificationsEmptyTitle: string;
    notificationsEmptyDesc: string;
    notificationsMarkRead: string;
    notificationsViewLot: string;
    notificationsLoadMore: string;
    notificationsLoading: string;
    createAuctionEyebrow: string;
    createAuctionTitle: string;
    createAuctionSubtitle: string;
    createAuctionTitleField: string;
    createAuctionTitlePlaceholder: string;
    createAuctionDescription: string;
    createAuctionDescPlaceholder: string;
    createAuctionCategory: string;
    createAuctionCategoryPlaceholder: string;
    createAuctionStartingPrice: string;
    createAuctionEndTime: string;
    createAuctionImage: string;
    createAuctionImageHint: string;
    createAuctionPublish: string;
    createAuctionValidationTitle: string;
    createAuctionValidationDescription: string;
    createAuctionValidationPrice: string;
    createAuctionValidationEndTime: string;
    createAuctionValidationCategory: string;
    sellerDashboardEyebrow: string;
    sellerDashboardTitle: string;
    sellerDashboardNewAuction: string;
    sellerDashboardActiveTab: string;
    sellerDashboardCompletedTab: string;
    sellerDashboardNoActive: string;
    sellerDashboardNoCompleted: string;
    sellerDashboardNoActiveDesc: string;
    sellerDashboardNoCompletedDesc: string;
    sellerDashboardListFirst: string;
    sellerDashboardColLot: string;
    sellerDashboardColStatus: string;
    sellerDashboardColCurrentBid: string;
    sellerDashboardColBids: string;
    sellerDashboardColCloses: string;
    sellerDashboardColWinner: string;
    sellerDashboardNoBids: string;
    sellerDashboardView: string;
    sellerDashboardLoading: string;
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
    loginVisualText: 'Secure access to your auction account. Real-time bidding. Transparent deals.',
    registerVisualText: 'Join our thriving auction community. Bid, sell, and win with confidence.',
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
  pages: {
    notFoundLot: 'LOT 404',
    notFoundTitle: "This lot isn't on the floor.",
    notFoundText: "The auction or page you're looking for doesn't exist or has been removed.",
    notFoundBack: 'Back to the auction floor',
    profileEyebrow: 'Your account',
    profileUsername: 'Username',
    profileEmail: 'Email',
    profileAccountType: 'Account type',
    profileUserId: 'User ID',
    profileGoToDashboard: 'Go to seller dashboard',
    profileLogout: 'Log out',
    profileLoading: 'Loading your profile…',
    profileRefreshError: "Couldn't refresh your profile from the server: ",
    notificationsEyebrow: 'Stay Updated',
    notificationsTitle: 'Your Notifications',
    notificationsSubtitle: 'Track your auction activity, bids, and seller updates.',
    notificationsEmptyTitle: 'No notifications yet',
    notificationsEmptyDesc: "You'll see activity updates here when you bid, win, or get outbid.",
    notificationsMarkRead: 'Mark as read',
    notificationsViewLot: 'View Lot',
    notificationsLoadMore: 'Load more',
    notificationsLoading: 'Loading notifications…',
    createAuctionEyebrow: 'New listing',
    createAuctionTitle: 'List a new lot',
    createAuctionSubtitle: 'Give bidders what they need to trust the listing — clear photos, an honest description, and a fair starting price.',
    createAuctionTitleField: 'Title',
    createAuctionTitlePlaceholder: 'e.g. 1970s Leica M4 35mm Camera',
    createAuctionDescription: 'Description',
    createAuctionDescPlaceholder: 'Condition, provenance, included accessories…',
    createAuctionCategory: 'Category',
    createAuctionCategoryPlaceholder: 'Select a category',
    createAuctionStartingPrice: 'Starting price ($)',
    createAuctionEndTime: 'Closing date & time',
    createAuctionImage: 'Image URL',
    createAuctionImageHint: 'Link to a photo of the item. Optional, but listings with photos get more bids.',
    createAuctionPublish: 'Publish lot',
    createAuctionValidationTitle: 'Title',
    createAuctionValidationDescription: 'Description',
    createAuctionValidationPrice: 'Starting price',
    createAuctionValidationEndTime: 'Closing date & time',
    createAuctionValidationCategory: 'Choose a category for your lot.',
    sellerDashboardEyebrow: 'Your listings',
    sellerDashboardTitle: 'Seller dashboard',
    sellerDashboardNewAuction: '+ New auction',
    sellerDashboardActiveTab: 'Active',
    sellerDashboardCompletedTab: 'Completed',
    sellerDashboardNoActive: 'No active listings',
    sellerDashboardNoCompleted: 'No completed auctions yet',
    sellerDashboardNoActiveDesc: 'Create your first lot to start receiving bids.',
    sellerDashboardNoCompletedDesc: "Once your active lots close, they'll show up here with the final winner.",
    sellerDashboardListFirst: 'List your first lot',
    sellerDashboardColLot: 'Lot',
    sellerDashboardColStatus: 'Status',
    sellerDashboardColCurrentBid: 'Current bid',
    sellerDashboardColBids: 'Bids',
    sellerDashboardColCloses: 'Closes',
    sellerDashboardColWinner: 'Winner',
    sellerDashboardNoBids: 'No bids placed',
    sellerDashboardView: 'View',
    sellerDashboardLoading: 'Loading your dashboard…',
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
    loginVisualText: 'Безопасный доступ к вашему аккаунту. Ставки в реальном времени. Прозрачные сделки.',
    registerVisualText: 'Присоединяйтесь к нашему активному аукционному сообществу. Делайте ставки, продавайте и побеждайте с уверенностью.',
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
  pages: {
    notFoundLot: 'ЛОТ 404',
    notFoundTitle: 'Этого лота нет в зале.',
    notFoundText: 'Аукцион или страница, которую вы ищете, не существует или была удалена.',
    notFoundBack: 'Вернуться в аукционный зал',
    profileEyebrow: 'Ваш аккаунт',
    profileUsername: 'Имя пользователя',
    profileEmail: 'Электронная почта',
    profileAccountType: 'Тип аккаунта',
    profileUserId: 'ID пользователя',
    profileGoToDashboard: 'Перейти в панель продавца',
    profileLogout: 'Выйти',
    profileLoading: 'Загружаем ваш профиль…',
    profileRefreshError: 'Не удалось обновить профиль с сервера: ',
    notificationsEyebrow: 'Будьте в курсе',
    notificationsTitle: 'Ваши уведомления',
    notificationsSubtitle: 'Отслеживайте активность на аукционах, ставки и обновления от продавцов.',
    notificationsEmptyTitle: 'Пока нет уведомлений',
    notificationsEmptyDesc: 'Здесь будут появляться обновления, когда вы делаете ставку, выигрываете или вас перебивают.',
    notificationsMarkRead: 'Отметить как прочитанное',
    notificationsViewLot: 'Посмотреть лот',
    notificationsLoadMore: 'Загрузить еще',
    notificationsLoading: 'Загрузка уведомлений…',
    createAuctionEyebrow: 'Новое объявление',
    createAuctionTitle: 'Разместить новый лот',
    createAuctionSubtitle: 'Дайте покупателям то, что убедит их доверять объявлению — чёткие фото, честное описание и справедливую начальную цену.',
    createAuctionTitleField: 'Название',
    createAuctionTitlePlaceholder: 'например: Плёночная камера Leica M4, 1970-е',
    createAuctionDescription: 'Описание',
    createAuctionDescPlaceholder: 'Состояние, происхождение, комплектация…',
    createAuctionCategory: 'Категория',
    createAuctionCategoryPlaceholder: 'Выберите категорию',
    createAuctionStartingPrice: 'Начальная цена ($)',
    createAuctionEndTime: 'Дата и время окончания',
    createAuctionImage: 'Ссылка на изображение',
    createAuctionImageHint: 'Ссылка на фото предмета. Необязательно, но объявления с фото получают больше ставок.',
    createAuctionPublish: 'Опубликовать лот',
    createAuctionValidationTitle: 'Название',
    createAuctionValidationDescription: 'Описание',
    createAuctionValidationPrice: 'Начальная цена',
    createAuctionValidationEndTime: 'Дата и время окончания',
    createAuctionValidationCategory: 'Выберите категорию для вашего лота.',
    sellerDashboardEyebrow: 'Ваши объявления',
    sellerDashboardTitle: 'Панель продавца',
    sellerDashboardNewAuction: '+ Новый аукцион',
    sellerDashboardActiveTab: 'Активные',
    sellerDashboardCompletedTab: 'Завершённые',
    sellerDashboardNoActive: 'Нет активных объявлений',
    sellerDashboardNoCompleted: 'Пока нет завершённых аукционов',
    sellerDashboardNoActiveDesc: 'Создайте свой первый лот, чтобы начать получать ставки.',
    sellerDashboardNoCompletedDesc: 'Когда ваши активные лоты закроются, они появятся здесь вместе с победителем.',
    sellerDashboardListFirst: 'Разместить первый лот',
    sellerDashboardColLot: 'Лот',
    sellerDashboardColStatus: 'Статус',
    sellerDashboardColCurrentBid: 'Текущая ставка',
    sellerDashboardColBids: 'Ставки',
    sellerDashboardColCloses: 'Окончание',
    sellerDashboardColWinner: 'Победитель',
    sellerDashboardNoBids: 'Ставок не было',
    sellerDashboardView: 'Открыть',
    sellerDashboardLoading: 'Загружаем вашу панель…',
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
    loginVisualText: 'Hesabınıza təhlükəsiz giriş. Real vaxtda təkliflər. Şəffaf sövdələşmələr.',
    registerVisualText: 'Fəal auksion icmamıza qoşulun. Təklif verin, satın və inamla qazanın.',
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
  pages: {
    notFoundLot: 'LOT 404',
    notFoundTitle: 'Bu lot zalda deyil.',
    notFoundText: 'Axtardığınız auksion və ya səhifə mövcud deyil və ya silinib.',
    notFoundBack: 'Auksion zalına qayıt',
    profileEyebrow: 'Hesabınız',
    profileUsername: 'İstifadəçi adı',
    profileEmail: 'E-poçt',
    profileAccountType: 'Hesab növü',
    profileUserId: 'İstifadəçi ID',
    profileGoToDashboard: 'Satıcı panelinə keç',
    profileLogout: 'Çıxış',
    profileLoading: 'Profiliniz yüklənir…',
    profileRefreshError: 'Profil serverdən yenilənə bilmədi: ',
    notificationsEyebrow: 'Xəbərdar olun',
    notificationsTitle: 'Bildirişləriniz',
    notificationsSubtitle: 'Auksion fəaliyyətinizi, təkliflərinizi və satıcı yeniləmələrini izləyin.',
    notificationsEmptyTitle: 'Hələ bildiriş yoxdur',
    notificationsEmptyDesc: 'Təklif verdikdə, qazandıqda və ya sizi ötdükdə burada yeniləmələri görəcəksiniz.',
    notificationsMarkRead: 'Oxunmuş kimi qeyd et',
    notificationsViewLot: 'Lotu göstər',
    notificationsLoadMore: 'Daha çox yüklə',
    notificationsLoading: 'Bildirişlər yüklənir…',
    createAuctionEyebrow: 'Yeni elan',
    createAuctionTitle: 'Yeni lot yerləşdir',
    createAuctionSubtitle: 'Alıcılara etibar etmək üçün lazım olanı verin — aydın fotolar, dürüst təsvir və ədalətli başlanğıc qiyməti.',
    createAuctionTitleField: 'Başlıq',
    createAuctionTitlePlaceholder: 'məs. 1970-ci illər Leica M4 35mm Kamera',
    createAuctionDescription: 'Təsvir',
    createAuctionDescPlaceholder: 'Vəziyyət, mənşəyi, daxil olan aksesuarlar…',
    createAuctionCategory: 'Kategoriya',
    createAuctionCategoryPlaceholder: 'Kategoriya seçin',
    createAuctionStartingPrice: 'Başlanğıc qiyməti ($)',
    createAuctionEndTime: 'Bitmə tarixi və vaxtı',
    createAuctionImage: 'Şəkil linki',
    createAuctionImageHint: 'Əşyanın fotosuna keçid. İstəyə bağlıdır, lakin fotolu elanlar daha çox təklif alır.',
    createAuctionPublish: 'Lotu dərc et',
    createAuctionValidationTitle: 'Başlıq',
    createAuctionValidationDescription: 'Təsvir',
    createAuctionValidationPrice: 'Başlanğıc qiyməti',
    createAuctionValidationEndTime: 'Bitmə tarixi və vaxtı',
    createAuctionValidationCategory: 'Lotunuz üçün kategoriya seçin.',
    sellerDashboardEyebrow: 'Elanlarınız',
    sellerDashboardTitle: 'Satıcı paneli',
    sellerDashboardNewAuction: '+ Yeni auksion',
    sellerDashboardActiveTab: 'Aktiv',
    sellerDashboardCompletedTab: 'Tamamlanmış',
    sellerDashboardNoActive: 'Aktiv elan yoxdur',
    sellerDashboardNoCompleted: 'Hələ tamamlanmış auksion yoxdur',
    sellerDashboardNoActiveDesc: 'Təkliflər almağa başlamaq üçün ilk lotunuzu yaradın.',
    sellerDashboardNoCompletedDesc: 'Aktiv lotlarınız bağlandıqda, qalibi ilə birlikdə burada görünəcək.',
    sellerDashboardListFirst: 'İlk lotunuzu yerləşdirin',
    sellerDashboardColLot: 'Lot',
    sellerDashboardColStatus: 'Status',
    sellerDashboardColCurrentBid: 'Cari təklif',
    sellerDashboardColBids: 'Təkliflər',
    sellerDashboardColCloses: 'Bitmə',
    sellerDashboardColWinner: 'Qalib',
    sellerDashboardNoBids: 'Təklif verilməyib',
    sellerDashboardView: 'Bax',
    sellerDashboardLoading: 'Panel yüklənir…',
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