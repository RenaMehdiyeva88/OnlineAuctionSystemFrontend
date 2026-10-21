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
    notificationsToday: string;
    notificationsYesterday: string;
    notificationsFilterAll: string;
    notificationsFilterUnread: string;
    notificationsMarkAllRead: string;
    notificationsEmptyUnreadTitle: string;
    notificationsEmptyUnreadDesc: string;
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
    createAuctionAiSuggest: string;
    createAuctionAiSuggesting: string;
    createAuctionAiHint: string;
    createAuctionAiError: string;
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
  aiChat: {
    launcherLabel: string;
    title: string;
    subtitle: string;
    placeholder: string;
    send: string;
    greeting: string;
    thinking: string;
    unavailable: string;
    close: string;
  };
  orders: {
    youWonCheckoutPrompt: string;
    youWonCheckoutExists: string;
    checkoutButton: string;
    checkoutStarted: string;
    viewMyOrder: string;
    myOrdersEyebrow: string;
    myOrdersTitle: string;
    mySalesEyebrow: string;
    mySalesTitle: string;
    colLot: string;
    colAmount: string;
    colStatus: string;
    colDate: string;
    emptyOrdersTitle: string;
    emptyOrdersDesc: string;
    emptySalesTitle: string;
    emptySalesDesc: string;
    markAsPaid: string;
    markAsPaidConfirm: string;
    markAsPaidDone: string;
    confirmPayment: string;
    confirmPaymentConfirm: string;
    confirmPaymentDone: string;
    statusPendingPayment: string;
    statusAwaitingSellerConfirmation: string;
    statusPaid: string;
    statusCancelled: string;
    paidOn: string;
    loadMore: string;
    loading: string;
  };
  ui: {
    roleBuyer: string;
    roleSeller: string;
    navSellerDashboard: string;
    navNewAuction: string;
    navLogin: string;
    navSignup: string;
    navLogout: string;
    footerTagline: string;
    footerHowItWorks: string;
    footerSell: string;
    footerStartSelling: string;
    footerSellerFees: string;
    footerAuthentication: string;
    footerSupport: string;
    footerContact: string;
    footerHelpCenter: string;
    footerTerms: string;
    footerRights: string;
    footerPrivacy: string;
    footerCookies: string;
    biddingClosed: string;
    unitDays: string;
    unitHours: string;
    unitMinutes: string;
    unitSeconds: string;
    statusLive: string;
    statusEnded: string;
    statusCancelled: string;
    lotLoadFailed: string;
    gridEmptyTitle: string;
    gridEmptyDesc: string;
    filterSearchPlaceholder: string;
    filterSearchAria: string;
    filterCategoryAria: string;
    filterAllCategories: string;
    filterMinPlaceholder: string;
    filterMaxPlaceholder: string;
    filterMinAria: string;
    filterMaxAria: string;
    filterApply: string;
    filterReset: string;
    galleryEmpty: string;
    galleryPrev: string;
    galleryNext: string;
    galleryHint: string;
    galleryImageAlt: string;
    galleryViewImage: string;
    galleryThumbnail: string;
    bidLoginNotice: string;
    bidSellerNotice: string;
    bidClosedNotice: string;
    bidAria: string;
    bidMustExceed: string;
    bidsEmptyTitle: string;
    bidsEmptyDesc: string;
    bidHighest: string;
    bidsLoadMore: string;
    winnerFor: string;
    auctionNotFound: string;
    toastOutbid: string;
    toastWonAmount: string;
    toastWonAuction: string;
    toastAuctionClosed: string;
    toastNewBid: string;
    toastBidPlaced: string;
    toastBidConflict: string;
    errorBannerTitle: string;
    toastRegionAria: string;
    dismiss: string;
    selectLanguage: string;
    actions: string;
    uploading: string;
    aiGenerating: string;
    sessionChecking: string;
    showPassword: string;
    hidePassword: string;
    homeExploreEyebrow: string;
    homePopularCollections: string;
    homeClosingSoon: string;
    homeFeaturedLots: string;
    homeFeaturedSubtitle: string;
    homeViewAll: string;
    homeLoadingFeatured: string;
    homeFeaturedError: string;
    homeBrowseInstead: string;
    homeNoLiveTitle: string;
    homeNoLiveDesc: string;
    homeStatActive: string;
    homeStatVolume: string;
    homeStatSatisfaction: string;
    homeStatSupport: string;
    homeSellEyebrow: string;
    homeSellTitle: string;
    homeSellText: string;
    homeSellButton: string;
    homeHeroAlt: string;
    auctionsShowingOne: string;
    auctionsShowingMany: string;
    auctionsNoneFor: string;
    auctionsNoneTitle: string;
    auctionsNoneAvailable: string;
    auctionsNoneDescKeyword: string;
    auctionsNoneDescGeneric: string;
    loginResetSuccess: string;
    loginForgot: string;
    loginCodeTitle: string;
    loginCodeText: string;
    loginCodeLabel: string;
    loginCodeSubmit: string;
    loginCodeResend: string;
    loginCodeResent: string;
    loginCodeBack: string;
    loginCodeInvalidFormat: string;
    forgotEyebrow: string;
    forgotText: string;
    forgotSent: string;
    forgotSend: string;
    forgotRemembered: string;
    resetTitle: string;
    resetText: string;
    resetInvalidLink: string;
    resetMismatch: string;
    resetBack: string;
    profileChangePassword: string;
    profilePasswordUpdated: string;
    profileCurrentPassword: string;
    profileNewPassword: string;
    profileConfirmNewPassword: string;
    profileUpdatePassword: string;
    profilePasswordsMismatch: string;
    profilePasswordSame: string;
    valEmailRequired: string;
    valEmailInvalid: string;
    valPasswordRequired: string;
    valPasswordMin: string;
    valUsernameRequired: string;
    valUsernameMin: string;
    valRequired: string;
    valNumber: string;
    valGreaterThanZero: string;
    valInvalidDate: string;
    valMustBeFuture: string;
    valDefaultPrice: string;
    valDefaultDate: string;
    valBidRequired: string;
    valBidNumber: string;
    valRangeNumeric: string;
    valRangeOrder: string;
    valImageType: string;
    valImageInvalid: string;
    err401: string;
    err403: string;
    err404: string;
    err409: string;
    err429: string;
    err5xx: string;
    errOffline: string;
    errNetwork: string;
    errDefault: string;
    errUnexpected: string;
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
    notificationsToday: 'Today',
    notificationsYesterday: 'Yesterday',
    notificationsFilterAll: 'All',
    notificationsFilterUnread: 'Unread',
    notificationsMarkAllRead: 'Mark all as read',
    notificationsEmptyUnreadTitle: "You're all caught up",
    notificationsEmptyUnreadDesc: 'No unread notifications right now.',
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
    createAuctionAiSuggest: '✦ Suggest with AI',
    createAuctionAiSuggesting: 'Thinking…',
    createAuctionAiHint: 'Type a description and let AI suggest a title, category and starting price — or leave the form empty and AI will propose a whole listing idea. You can edit everything before publishing.',
    createAuctionAiError: 'Could not generate suggestions right now. Please fill the fields in yourself.',
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
  aiChat: {
    launcherLabel: 'Ask AI',
    title: 'AI Assistant',
    subtitle: 'Ask about lots, bidding rules, or how the platform works',
    placeholder: 'Type your question…',
    send: 'Send',
    greeting: "Hi! I can help you find lots, explain bidding rules, or answer questions about the platform. What would you like to know?",
    thinking: 'Thinking…',
    unavailable: 'The AI assistant is unavailable right now. Please try again later.',
    close: 'Close',
  },
  orders: {
    youWonCheckoutPrompt: "Congratulations — you won this lot! Check out to start the payment process.",
    youWonCheckoutExists: "You've already checked out this lot — see My Orders for the next step.",
    checkoutButton: 'Checkout',
    checkoutStarted: 'Checkout started — see My Orders to continue.',
    viewMyOrder: 'View my order',
    myOrdersEyebrow: 'Your purchases',
    myOrdersTitle: 'My orders',
    mySalesEyebrow: 'Your sales',
    mySalesTitle: 'My sales',
    colLot: 'Lot',
    colAmount: 'Amount',
    colStatus: 'Status',
    colDate: 'Date',
    emptyOrdersTitle: 'No orders yet',
    emptyOrdersDesc: 'Win an auction and check out — it will show up here.',
    emptySalesTitle: 'No sales yet',
    emptySalesDesc: "When a buyer checks out on one of your lots, it'll show up here.",
    markAsPaid: "I've sent the payment",
    markAsPaidConfirm: "Confirm you've sent the payment to the seller. The seller will be notified to confirm receipt.",
    markAsPaidDone: 'Marked as paid — waiting for the seller to confirm.',
    confirmPayment: 'Confirm payment received',
    confirmPaymentConfirm: "Confirm you've actually received the payment from the buyer. This closes the order.",
    confirmPaymentDone: 'Payment confirmed — order complete.',
    statusPendingPayment: 'Awaiting payment',
    statusAwaitingSellerConfirmation: 'Payment sent — awaiting confirmation',
    statusPaid: 'Paid',
    statusCancelled: 'Cancelled',
    paidOn: 'Paid on',
    loadMore: 'Load more',
    loading: 'Loading orders…',
  },
  ui: {
    roleBuyer: "Buyer",
    roleSeller: "Seller",
    navSellerDashboard: "Seller Dashboard",
    navNewAuction: "+ New Auction",
    navLogin: "Log in",
    navSignup: "Sign up",
    navLogout: "Log out",
    footerTagline: "Fair bidding. Transparent pricing. Secure transactions.",
    footerHowItWorks: "How it works",
    footerSell: "Sell",
    footerStartSelling: "Start selling",
    footerSellerFees: "Seller fees",
    footerAuthentication: "Authentication",
    footerSupport: "Support",
    footerContact: "Contact us",
    footerHelpCenter: "Help center",
    footerTerms: "Terms of service",
    footerRights: "All rights reserved.",
    footerPrivacy: "Privacy Policy",
    footerCookies: "Cookies",
    biddingClosed: "Bidding closed",
    unitDays: "d",
    unitHours: "h",
    unitMinutes: "m",
    unitSeconds: "s",
    statusLive: "Live",
    statusEnded: "Ended",
    statusCancelled: "Cancelled",
    lotLoadFailed: "Failed to load lot",
    gridEmptyTitle: "No lots to show",
    gridEmptyDesc: "Try adjusting your filters or check back soon for new listings.",
    filterSearchPlaceholder: "Search lots by title…",
    filterSearchAria: "Search by title",
    filterCategoryAria: "Filter by category",
    filterAllCategories: "All categories",
    filterMinPlaceholder: "Min $",
    filterMaxPlaceholder: "Max $",
    filterMinAria: "Minimum price",
    filterMaxAria: "Maximum price",
    filterApply: "Apply filters",
    filterReset: "Reset",
    galleryEmpty: "No images available",
    galleryPrev: "Previous image",
    galleryNext: "Next image",
    galleryHint: "Use arrow keys or buttons to navigate",
    galleryImageAlt: "{title} - Image {n} of {total}",
    galleryViewImage: "View image {n}",
    galleryThumbnail: "Thumbnail {n}",
    bidLoginNotice: "Log in as a buyer to place a bid on this lot.",
    bidSellerNotice: "You listed this lot — sellers can't bid on their own auctions.",
    bidClosedNotice: "Bidding has closed on this lot.",
    bidAria: "Your bid amount",
    bidMustExceed: "Your bid must be higher than {amount}.",
    bidsEmptyTitle: "No bids yet",
    bidsEmptyDesc: "Be the first to place a bid on this lot.",
    bidHighest: "Highest",
    bidsLoadMore: "Load more bids",
    winnerFor: "for",
    auctionNotFound: "Auction not found.",
    toastOutbid: "You've just been outbid! Place a higher bid to stay in the running.",
    toastWonAmount: "Congratulations — you won this lot for {amount}!",
    toastWonAuction: "Congratulations — you won an auction!",
    toastAuctionClosed: "One of your auctions has closed.",
    toastNewBid: "{name} placed a new bid on your auction.",
    toastBidPlaced: "Your bid was placed successfully.",
    toastBidConflict: "Someone just placed a bid on this auction before yours went through. Refreshing the latest price…",
    errorBannerTitle: "Couldn't complete that.",
    toastRegionAria: "Notifications",
    dismiss: "Dismiss",
    selectLanguage: "Select language",
    actions: "Actions",
    uploading: "Uploading…",
    aiGenerating: "Generating your lot…",
    sessionChecking: "Checking your session…",
    showPassword: "Show password",
    hidePassword: "Hide password",
    homeExploreEyebrow: "Explore by category",
    homePopularCollections: "Popular collections",
    homeClosingSoon: "Closing soon",
    homeFeaturedLots: "Featured lots",
    homeFeaturedSubtitle: "Hand-picked selections closing within the next 24 hours",
    homeViewAll: "View all lots",
    homeLoadingFeatured: "Loading featured lots…",
    homeFeaturedError: "We're having trouble loading featured lots right now.",
    homeBrowseInstead: "Browse all auctions instead →",
    homeNoLiveTitle: "No live lots right now",
    homeNoLiveDesc: "Check back soon — new auctions go live regularly.",
    homeStatActive: "Active auctions",
    homeStatVolume: "Total volume",
    homeStatSatisfaction: "Seller satisfaction",
    homeStatSupport: "Customer support",
    homeSellEyebrow: "Ready to sell?",
    homeSellTitle: "List your items today",
    homeSellText: "Join thousands of sellers earning from their collections. Get started in minutes with our simple, transparent auction process.",
    homeSellButton: "Create a seller account",
    homeHeroAlt: "Premium auction house interior",
    auctionsShowingOne: "Showing 1 lot",
    auctionsShowingMany: "Showing {n} lots",
    auctionsNoneFor: "No auctions found for \"{keyword}\"",
    auctionsNoneTitle: "No auctions found",
    auctionsNoneAvailable: "No auctions available",
    auctionsNoneDescKeyword: "We couldn't find any auctions matching \"{keyword}\". Try a different search term.",
    auctionsNoneDescGeneric: "Check back soon or refine your search criteria.",
    loginResetSuccess: "Your password was reset. Log in with your new password.",
    loginForgot: "Forgot password?",
    loginCodeTitle: "Enter your code",
    loginCodeText: "We sent a 6-digit code to {email}. It expires in 10 minutes.",
    loginCodeLabel: "6-digit code",
    loginCodeSubmit: "Verify and sign in",
    loginCodeResend: "Send a new code",
    loginCodeResent: "A new code was sent.",
    loginCodeBack: "Back to login",
    loginCodeInvalidFormat: "Enter the 6-digit code from the email.",
    forgotEyebrow: "Password Recovery",
    forgotText: "Enter the email on your account and we'll send you a reset link.",
    forgotSent: "If an account exists for {email}, a reset link is on its way. Check your inbox.",
    forgotSend: "Send reset link",
    forgotRemembered: "Remembered your password?",
    resetTitle: "Reset password",
    resetText: "Choose a new password for your account.",
    resetInvalidLink: "This reset link is invalid or has expired.",
    resetMismatch: "Passwords do not match.",
    resetBack: "Back to login",
    profileChangePassword: "Change password",
    profilePasswordUpdated: "Your password was updated.",
    profileCurrentPassword: "Current password",
    profileNewPassword: "New password",
    profileConfirmNewPassword: "Confirm new password",
    profileUpdatePassword: "Update password",
    profilePasswordsMismatch: "New passwords do not match.",
    profilePasswordSame: "New password must be different from the current password.",
    valEmailRequired: "Email is required.",
    valEmailInvalid: "Enter a valid email address.",
    valPasswordRequired: "Password is required.",
    valPasswordMin: "Password must be at least {n} characters.",
    valUsernameRequired: "Username is required.",
    valUsernameMin: "Username must be at least {n} characters.",
    valRequired: "{field} is required.",
    valNumber: "{field} must be a number.",
    valGreaterThanZero: "{field} must be greater than 0.",
    valInvalidDate: "{field} is not a valid date.",
    valMustBeFuture: "{field} must be in the future.",
    valDefaultPrice: "Price",
    valDefaultDate: "Date",
    valBidRequired: "Enter a bid amount.",
    valBidNumber: "Bid amount must be a number.",
    valRangeNumeric: "Price range must be numeric.",
    valRangeOrder: "Minimum price can't be greater than maximum price.",
    valImageType: "Image URL should point to a valid image file (jpg, png, gif, webp, svg).",
    valImageInvalid: "Image URL must be a valid web address (e.g., https://example.com/image.jpg).",
    err401: "Please log in to continue.",
    err403: "You don't have permission to perform this action.",
    err404: "The item you're looking for doesn't exist.",
    err409: "There was a conflict with your request. Please try again.",
    err429: "Too many requests. Please wait a moment and try again.",
    err5xx: "Server is temporarily unavailable. Please try again later.",
    errOffline: "No internet connection. Please check your network and try again.",
    errNetwork: "Unable to connect to the server. Please check your connection and try again.",
    errDefault: "An error occurred. Please try again.",
    errUnexpected: "An unexpected error occurred. Please try again.",
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
    notificationsToday: 'Сегодня',
    notificationsYesterday: 'Вчера',
    notificationsFilterAll: 'Все',
    notificationsFilterUnread: 'Непрочитанные',
    notificationsMarkAllRead: 'Отметить все как прочитанные',
    notificationsEmptyUnreadTitle: 'Все прочитано',
    notificationsEmptyUnreadDesc: 'Сейчас нет непрочитанных уведомлений.',
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
    createAuctionAiSuggest: '✦ Предложить с AI',
    createAuctionAiSuggesting: 'Думаю…',
    createAuctionAiHint: 'Напишите описание, и AI предложит название, категорию и начальную цену — или оставьте форму пустой, и AI предложит идею лота целиком. Всё можно отредактировать перед публикацией.',
    createAuctionAiError: 'Не удалось получить предложения. Заполните поля вручную.',
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
  aiChat: {
    launcherLabel: 'Спросить AI',
    title: 'AI-помощник',
    subtitle: 'Спросите про лоты, правила ставок или работу платформы',
    placeholder: 'Введите вопрос…',
    send: 'Отправить',
    greeting: 'Привет! Я могу помочь найти лоты, объяснить правила ставок или ответить на вопросы о платформе. Что вас интересует?',
    thinking: 'Печатает…',
    unavailable: 'AI-помощник сейчас недоступен. Попробуйте позже.',
    close: 'Закрыть',
  },
  orders: {
    youWonCheckoutPrompt: 'Поздравляем — вы выиграли этот лот! Оформите заказ, чтобы начать оплату.',
    youWonCheckoutExists: 'Вы уже оформили заказ на этот лот — следующий шаг смотрите в «Моих заказах».',
    checkoutButton: 'Оформить заказ',
    checkoutStarted: 'Заказ оформлен — продолжите в «Моих заказах».',
    viewMyOrder: 'Перейти к заказу',
    myOrdersEyebrow: 'Ваши покупки',
    myOrdersTitle: 'Мои заказы',
    mySalesEyebrow: 'Ваши продажи',
    mySalesTitle: 'Мои продажи',
    colLot: 'Лот',
    colAmount: 'Сумма',
    colStatus: 'Статус',
    colDate: 'Дата',
    emptyOrdersTitle: 'Заказов пока нет',
    emptyOrdersDesc: 'Выиграйте аукцион и оформите заказ — он появится здесь.',
    emptySalesTitle: 'Продаж пока нет',
    emptySalesDesc: 'Когда покупатель оформит заказ на ваш лот, он появится здесь.',
    markAsPaid: 'Я отправил оплату',
    markAsPaidConfirm: 'Подтвердите, что вы отправили оплату продавцу. Продавец получит уведомление для подтверждения получения.',
    markAsPaidDone: 'Отмечено как оплачено — ждём подтверждения от продавца.',
    confirmPayment: 'Подтвердить получение оплаты',
    confirmPaymentConfirm: 'Подтвердите, что вы действительно получили оплату от покупателя. Это закроет заказ.',
    confirmPaymentDone: 'Оплата подтверждена — заказ завершён.',
    statusPendingPayment: 'Ожидает оплаты',
    statusAwaitingSellerConfirmation: 'Оплата отправлена — ожидает подтверждения',
    statusPaid: 'Оплачено',
    statusCancelled: 'Отменено',
    paidOn: 'Оплачено',
    loadMore: 'Загрузить ещё',
    loading: 'Загрузка заказов…',
  },
  ui: {
    roleBuyer: "Покупатель",
    roleSeller: "Продавец",
    navSellerDashboard: "Панель продавца",
    navNewAuction: "+ Новый аукцион",
    navLogin: "Войти",
    navSignup: "Регистрация",
    navLogout: "Выйти",
    footerTagline: "Честные ставки. Прозрачные цены. Безопасные сделки.",
    footerHowItWorks: "Как это работает",
    footerSell: "Продавать",
    footerStartSelling: "Начать продавать",
    footerSellerFees: "Комиссии продавца",
    footerAuthentication: "Проверка подлинности",
    footerSupport: "Поддержка",
    footerContact: "Связаться с нами",
    footerHelpCenter: "Центр помощи",
    footerTerms: "Условия использования",
    footerRights: "Все права защищены.",
    footerPrivacy: "Политика конфиденциальности",
    footerCookies: "Файлы cookie",
    biddingClosed: "Ставки закрыты",
    unitDays: "д",
    unitHours: "ч",
    unitMinutes: "м",
    unitSeconds: "с",
    statusLive: "Идёт",
    statusEnded: "Завершён",
    statusCancelled: "Отменён",
    lotLoadFailed: "Не удалось загрузить лот",
    gridEmptyTitle: "Нет лотов для показа",
    gridEmptyDesc: "Измените фильтры или загляните позже — появятся новые лоты.",
    filterSearchPlaceholder: "Поиск лотов по названию…",
    filterSearchAria: "Поиск по названию",
    filterCategoryAria: "Фильтр по категории",
    filterAllCategories: "Все категории",
    filterMinPlaceholder: "Мин. $",
    filterMaxPlaceholder: "Макс. $",
    filterMinAria: "Минимальная цена",
    filterMaxAria: "Максимальная цена",
    filterApply: "Применить фильтры",
    filterReset: "Сбросить",
    galleryEmpty: "Нет изображений",
    galleryPrev: "Предыдущее изображение",
    galleryNext: "Следующее изображение",
    galleryHint: "Используйте стрелки на клавиатуре или кнопки",
    galleryImageAlt: "{title} — изображение {n} из {total}",
    galleryViewImage: "Показать изображение {n}",
    galleryThumbnail: "Миниатюра {n}",
    bidLoginNotice: "Войдите как покупатель, чтобы сделать ставку на этот лот.",
    bidSellerNotice: "Это ваш лот — продавцы не могут делать ставки на свои аукционы.",
    bidClosedNotice: "Приём ставок на этот лот завершён.",
    bidAria: "Сумма вашей ставки",
    bidMustExceed: "Ваша ставка должна быть выше {amount}.",
    bidsEmptyTitle: "Ставок пока нет",
    bidsEmptyDesc: "Сделайте первую ставку на этот лот.",
    bidHighest: "Лидирует",
    bidsLoadMore: "Загрузить ещё ставки",
    winnerFor: "за",
    auctionNotFound: "Аукцион не найден.",
    toastOutbid: "Вашу ставку перебили! Сделайте ставку выше, чтобы остаться в игре.",
    toastWonAmount: "Поздравляем — вы выиграли этот лот за {amount}!",
    toastWonAuction: "Поздравляем — вы выиграли аукцион!",
    toastAuctionClosed: "Один из ваших аукционов завершён.",
    toastNewBid: "{name} сделал(а) новую ставку на ваш аукцион.",
    toastBidPlaced: "Ваша ставка успешно принята.",
    toastBidConflict: "Кто-то успел сделать ставку раньше вас. Обновляем актуальную цену…",
    errorBannerTitle: "Не удалось выполнить.",
    toastRegionAria: "Уведомления",
    dismiss: "Закрыть",
    selectLanguage: "Выбор языка",
    actions: "Действия",
    uploading: "Загрузка…",
    aiGenerating: "Генерируем ваш лот…",
    sessionChecking: "Проверяем вашу сессию…",
    showPassword: "Показать пароль",
    hidePassword: "Скрыть пароль",
    homeExploreEyebrow: "Обзор по категориям",
    homePopularCollections: "Популярные коллекции",
    homeClosingSoon: "Скоро завершатся",
    homeFeaturedLots: "Избранные лоты",
    homeFeaturedSubtitle: "Лоты, отобранные вручную, — завершатся в ближайшие 24 часа",
    homeViewAll: "Смотреть все лоты",
    homeLoadingFeatured: "Загружаем избранные лоты…",
    homeFeaturedError: "Сейчас не удаётся загрузить избранные лоты.",
    homeBrowseInstead: "Смотреть все аукционы →",
    homeNoLiveTitle: "Сейчас нет активных лотов",
    homeNoLiveDesc: "Загляните позже — новые аукционы появляются регулярно.",
    homeStatActive: "Активных аукционов",
    homeStatVolume: "Общий объём",
    homeStatSatisfaction: "Довольных продавцов",
    homeStatSupport: "Поддержка клиентов",
    homeSellEyebrow: "Готовы продавать?",
    homeSellTitle: "Выставите свои вещи уже сегодня",
    homeSellText: "Присоединяйтесь к тысячам продавцов, которые зарабатывают на своих коллекциях. Начните за несколько минут — процесс простой и прозрачный.",
    homeSellButton: "Создать аккаунт продавца",
    homeHeroAlt: "Интерьер премиального аукционного дома",
    auctionsShowingOne: "Показан 1 лот",
    auctionsShowingMany: "Показано лотов: {n}",
    auctionsNoneFor: "По запросу «{keyword}» аукционов не найдено",
    auctionsNoneTitle: "Аукционы не найдены",
    auctionsNoneAvailable: "Нет доступных аукционов",
    auctionsNoneDescKeyword: "Мы не нашли аукционов по запросу «{keyword}». Попробуйте другой запрос.",
    auctionsNoneDescGeneric: "Загляните позже или уточните условия поиска.",
    loginResetSuccess: "Пароль сброшен. Войдите с новым паролем.",
    loginForgot: "Забыли пароль?",
    loginCodeTitle: "Введите код",
    loginCodeText: "Мы отправили 6-значный код на {email}. Он действует 10 минут.",
    loginCodeLabel: "6-значный код",
    loginCodeSubmit: "Подтвердить и войти",
    loginCodeResend: "Отправить новый код",
    loginCodeResent: "Новый код отправлен.",
    loginCodeBack: "Назад ко входу",
    loginCodeInvalidFormat: "Введите 6-значный код из письма.",
    forgotEyebrow: "Восстановление пароля",
    forgotText: "Введите email вашего аккаунта — мы отправим ссылку для сброса пароля.",
    forgotSent: "Если аккаунт для {email} существует, ссылка для сброса уже отправлена. Проверьте почту.",
    forgotSend: "Отправить ссылку",
    forgotRemembered: "Вспомнили пароль?",
    resetTitle: "Сброс пароля",
    resetText: "Выберите новый пароль для аккаунта.",
    resetInvalidLink: "Ссылка для сброса недействительна или устарела.",
    resetMismatch: "Пароли не совпадают.",
    resetBack: "Вернуться ко входу",
    profileChangePassword: "Смена пароля",
    profilePasswordUpdated: "Пароль обновлён.",
    profileCurrentPassword: "Текущий пароль",
    profileNewPassword: "Новый пароль",
    profileConfirmNewPassword: "Подтвердите новый пароль",
    profileUpdatePassword: "Обновить пароль",
    profilePasswordsMismatch: "Новые пароли не совпадают.",
    profilePasswordSame: "Новый пароль должен отличаться от текущего.",
    valEmailRequired: "Введите email.",
    valEmailInvalid: "Введите корректный email.",
    valPasswordRequired: "Введите пароль.",
    valPasswordMin: "Пароль должен содержать не менее {n} символов.",
    valUsernameRequired: "Введите имя пользователя.",
    valUsernameMin: "Имя пользователя должно содержать не менее {n} символов.",
    valRequired: "Поле «{field}» обязательно.",
    valNumber: "Поле «{field}» должно быть числом.",
    valGreaterThanZero: "Поле «{field}» должно быть больше 0.",
    valInvalidDate: "Поле «{field}» содержит некорректную дату.",
    valMustBeFuture: "Дата в поле «{field}» должна быть в будущем.",
    valDefaultPrice: "Цена",
    valDefaultDate: "Дата",
    valBidRequired: "Введите сумму ставки.",
    valBidNumber: "Сумма ставки должна быть числом.",
    valRangeNumeric: "Диапазон цен должен быть числовым.",
    valRangeOrder: "Минимальная цена не может быть больше максимальной.",
    valImageType: "Ссылка должна вести на изображение (jpg, png, gif, webp, svg).",
    valImageInvalid: "Ссылка на изображение должна быть корректным веб-адресом (например, https://example.com/image.jpg).",
    err401: "Войдите, чтобы продолжить.",
    err403: "У вас нет прав на это действие.",
    err404: "Запрошенный элемент не найден.",
    err409: "Конфликт запроса. Попробуйте ещё раз.",
    err429: "Слишком много запросов. Подождите немного и повторите.",
    err5xx: "Сервер временно недоступен. Попробуйте позже.",
    errOffline: "Нет подключения к интернету. Проверьте сеть и повторите.",
    errNetwork: "Не удаётся подключиться к серверу. Проверьте соединение и повторите.",
    errDefault: "Произошла ошибка. Попробуйте ещё раз.",
    errUnexpected: "Непредвиденная ошибка. Попробуйте ещё раз.",
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
    notificationsToday: 'Bu gün',
    notificationsYesterday: 'Dünən',
    notificationsFilterAll: 'Hamısı',
    notificationsFilterUnread: 'Oxunmamış',
    notificationsMarkAllRead: 'Hamısını oxunmuş kimi qeyd et',
    notificationsEmptyUnreadTitle: 'Hər şey oxunub',
    notificationsEmptyUnreadDesc: 'Hazırda oxunmamış bildiriş yoxdur.',
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
    createAuctionAiSuggest: '✦ AI ilə təklif et',
    createAuctionAiSuggesting: 'Düşünür…',
    createAuctionAiHint: 'Təsvir yazın, AI başlıq, kateqoriya və başlanğıc qiymət təklif etsin — və ya formanı boş buraxın, AI tam lot ideyası təklif etsin. Dərc etməzdən əvvəl hamısını redaktə edə bilərsiniz.',
    createAuctionAiError: 'Təkliflər alına bilmədi. Sahələri özünüz doldurun.',
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
  aiChat: {
    launcherLabel: 'AI-dan soruş',
    title: 'AI Köməkçi',
    subtitle: 'Lotlar, təklif qaydaları və ya platformanın işi haqqında soruşun',
    placeholder: 'Sualınızı yazın…',
    send: 'Göndər',
    greeting: 'Salam! Lot tapmağa, təklif qaydalarını izah etməyə və ya platforma haqqında suallara cavab verməyə kömək edə bilərəm. Nə bilmək istərdiniz?',
    thinking: 'Yazır…',
    unavailable: 'AI köməkçisi hazırda əlçatan deyil. Zəhmət olmasa bir az sonra yenidən cəhd edin.',
    close: 'Bağla',
  },
  orders: {
    youWonCheckoutPrompt: 'Təbriklər — bu lotu udmusunuz! Ödənişə başlamaq üçün sifarişi tamamlayın.',
    youWonCheckoutExists: 'Bu lot üçün artıq sifariş vermisiniz — növbəti addım üçün "Mənim sifarişlərim"ə baxın.',
    checkoutButton: 'Sifarişi tamamla',
    checkoutStarted: 'Sifariş yaradıldı — davam etmək üçün "Mənim sifarişlərim"ə baxın.',
    viewMyOrder: 'Sifarişimə bax',
    myOrdersEyebrow: 'Alışlarınız',
    myOrdersTitle: 'Mənim sifarişlərim',
    mySalesEyebrow: 'Satışlarınız',
    mySalesTitle: 'Mənim satışlarım',
    colLot: 'Lot',
    colAmount: 'Məbləğ',
    colStatus: 'Status',
    colDate: 'Tarix',
    emptyOrdersTitle: 'Hələ sifariş yoxdur',
    emptyOrdersDesc: 'Hərracı udun və sifarişi tamamlayın — o burada görünəcək.',
    emptySalesTitle: 'Hələ satış yoxdur',
    emptySalesDesc: 'Alıcı lotunuza sifariş verdikdə, o burada görünəcək.',
    markAsPaid: 'Ödənişi göndərdim',
    markAsPaidConfirm: 'Satıcıya ödənişi göndərdiyinizi təsdiqləyin. Satıcıya qəbul etdiyini təsdiqləmək üçün bildiriş gedəcək.',
    markAsPaidDone: 'Ödənilmiş kimi qeyd edildi — satıcının təsdiqi gözlənilir.',
    confirmPayment: 'Ödənişin alındığını təsdiqlə',
    confirmPaymentConfirm: 'Alıcıdan ödənişi həqiqətən aldığınızı təsdiqləyin. Bu sifarişi bağlayacaq.',
    confirmPaymentDone: 'Ödəniş təsdiqləndi — sifariş tamamlandı.',
    statusPendingPayment: 'Ödəniş gözlənilir',
    statusAwaitingSellerConfirmation: 'Ödəniş göndərildi — təsdiq gözlənilir',
    statusPaid: 'Ödənilib',
    statusCancelled: 'Ləğv edilib',
    paidOn: 'Ödənilib',
    loadMore: 'Daha çox yüklə',
    loading: 'Sifarişlər yüklənir…',
  },
  ui: {
    roleBuyer: "Alıcı",
    roleSeller: "Satıcı",
    navSellerDashboard: "Satıcı paneli",
    navNewAuction: "+ Yeni auksion",
    navLogin: "Daxil ol",
    navSignup: "Qeydiyyat",
    navLogout: "Çıxış",
    footerTagline: "Ədalətli təkliflər. Şəffaf qiymətlər. Təhlükəsiz əməliyyatlar.",
    footerHowItWorks: "Necə işləyir",
    footerSell: "Satış",
    footerStartSelling: "Satmağa başla",
    footerSellerFees: "Satıcı komissiyaları",
    footerAuthentication: "Orijinallığın yoxlanması",
    footerSupport: "Dəstək",
    footerContact: "Bizimlə əlaqə",
    footerHelpCenter: "Kömək mərkəzi",
    footerTerms: "İstifadə şərtləri",
    footerRights: "Bütün hüquqlar qorunur.",
    footerPrivacy: "Məxfilik siyasəti",
    footerCookies: "Cookie faylları",
    biddingClosed: "Təkliflər bağlanıb",
    unitDays: "g",
    unitHours: "s",
    unitMinutes: "d",
    unitSeconds: "san",
    statusLive: "Aktiv",
    statusEnded: "Bitib",
    statusCancelled: "Ləğv edilib",
    lotLoadFailed: "Lotu yükləmək mümkün olmadı",
    gridEmptyTitle: "Göstəriləcək lot yoxdur",
    gridEmptyDesc: "Filtrləri dəyişin və ya bir az sonra yeni lotlara baxın.",
    filterSearchPlaceholder: "Lotları ada görə axtarın…",
    filterSearchAria: "Ada görə axtarış",
    filterCategoryAria: "Kateqoriyaya görə filtr",
    filterAllCategories: "Bütün kateqoriyalar",
    filterMinPlaceholder: "Min $",
    filterMaxPlaceholder: "Maks $",
    filterMinAria: "Minimum qiymət",
    filterMaxAria: "Maksimum qiymət",
    filterApply: "Filtrləri tətbiq et",
    filterReset: "Sıfırla",
    galleryEmpty: "Şəkil yoxdur",
    galleryPrev: "Əvvəlki şəkil",
    galleryNext: "Növbəti şəkil",
    galleryHint: "Naviqasiya üçün ox düymələrindən və ya düymələrdən istifadə edin",
    galleryImageAlt: "{title} — şəkil {n} / {total}",
    galleryViewImage: "{n}-ci şəkilə bax",
    galleryThumbnail: "Miniatür {n}",
    bidLoginNotice: "Bu lota təklif vermək üçün alıcı kimi daxil olun.",
    bidSellerNotice: "Bu lot sizindir — satıcılar öz auksionlarına təklif verə bilməz.",
    bidClosedNotice: "Bu lot üzrə təkliflər bağlanıb.",
    bidAria: "Təklifinizin məbləği",
    bidMustExceed: "Təklifiniz {amount} məbləğindən yüksək olmalıdır.",
    bidsEmptyTitle: "Hələ təklif yoxdur",
    bidsEmptyDesc: "Bu lota ilk təklifi siz verin.",
    bidHighest: "Ən yüksək",
    bidsLoadMore: "Daha çox təklif yüklə",
    winnerFor: "—",
    auctionNotFound: "Auksion tapılmadı.",
    toastOutbid: "Təklifiniz keçildi! Qalmaq üçün daha yüksək təklif verin.",
    toastWonAmount: "Təbriklər — bu lotu {amount} məbləğinə udmusunuz!",
    toastWonAuction: "Təbriklər — auksionu udmusunuz!",
    toastAuctionClosed: "Auksionlarınızdan biri bağlandı.",
    toastNewBid: "{name} auksionunuza yeni təklif verdi.",
    toastBidPlaced: "Təklifiniz uğurla qəbul edildi.",
    toastBidConflict: "Kimsə sizdən əvvəl təklif verdi. Ən son qiymət yenilənir…",
    errorBannerTitle: "Əməliyyatı tamamlamaq mümkün olmadı.",
    toastRegionAria: "Bildirişlər",
    dismiss: "Bağla",
    selectLanguage: "Dil seçimi",
    actions: "Əməliyyatlar",
    uploading: "Yüklənir…",
    aiGenerating: "Lotunuz yaradılır…",
    sessionChecking: "Sessiyanız yoxlanılır…",
    showPassword: "Parolu göstər",
    hidePassword: "Parolu gizlət",
    homeExploreEyebrow: "Kateqoriyalara görə baxış",
    homePopularCollections: "Məşhur kolleksiyalar",
    homeClosingSoon: "Tezliklə bitir",
    homeFeaturedLots: "Seçilmiş lotlar",
    homeFeaturedSubtitle: "Əl ilə seçilmiş lotlar — növbəti 24 saat ərzində bitir",
    homeViewAll: "Bütün lotlara bax",
    homeLoadingFeatured: "Seçilmiş lotlar yüklənir…",
    homeFeaturedError: "Hazırda seçilmiş lotları yükləmək mümkün olmur.",
    homeBrowseInstead: "Bütün auksionlara bax →",
    homeNoLiveTitle: "Hazırda aktiv lot yoxdur",
    homeNoLiveDesc: "Bir az sonra baxın — yeni auksionlar mütəmadi əlavə olunur.",
    homeStatActive: "Aktiv auksionlar",
    homeStatVolume: "Ümumi həcm",
    homeStatSatisfaction: "Satıcı məmnunluğu",
    homeStatSupport: "Müştəri dəstəyi",
    homeSellEyebrow: "Satmağa hazırsınız?",
    homeSellTitle: "Əşyalarınızı bu gün satışa çıxarın",
    homeSellText: "Kolleksiyalarından qazanan minlərlə satıcıya qoşulun. Sadə və şəffaf auksion prosesi ilə bir neçə dəqiqəyə başlayın.",
    homeSellButton: "Satıcı hesabı yarat",
    homeHeroAlt: "Premium auksion evinin interyeri",
    auctionsShowingOne: "1 lot göstərilir",
    auctionsShowingMany: "Göstərilən lot sayı: {n}",
    auctionsNoneFor: "\"{keyword}\" üzrə auksion tapılmadı",
    auctionsNoneTitle: "Auksion tapılmadı",
    auctionsNoneAvailable: "Mövcud auksion yoxdur",
    auctionsNoneDescKeyword: "\"{keyword}\" üzrə auksion tapılmadı. Başqa axtarış sözü sınayın.",
    auctionsNoneDescGeneric: "Bir az sonra baxın və ya axtarış şərtlərini dəqiqləşdirin.",
    loginResetSuccess: "Parolunuz sıfırlandı. Yeni parolla daxil olun.",
    loginForgot: "Parolu unutmusunuz?",
    loginCodeTitle: "Kodu daxil edin",
    loginCodeText: "{email} ünvanına 6 rəqəmli kod göndərdik. Kod 10 dəqiqə etibarlıdır.",
    loginCodeLabel: "6 rəqəmli kod",
    loginCodeSubmit: "Təsdiqlə və daxil ol",
    loginCodeResend: "Yeni kod göndər",
    loginCodeResent: "Yeni kod göndərildi.",
    loginCodeBack: "Girişə qayıt",
    loginCodeInvalidFormat: "E-poçtdakı 6 rəqəmli kodu daxil edin.",
    forgotEyebrow: "Parolun bərpası",
    forgotText: "Hesabınızın e-poçtunu daxil edin — sıfırlama linki göndərəcəyik.",
    forgotSent: "{email} üçün hesab mövcuddursa, sıfırlama linki göndərildi. Poçt qutunuzu yoxlayın.",
    forgotSend: "Sıfırlama linkini göndər",
    forgotRemembered: "Parolunuzu xatırladınız?",
    resetTitle: "Parolun sıfırlanması",
    resetText: "Hesabınız üçün yeni parol seçin.",
    resetInvalidLink: "Bu sıfırlama linki yanlışdır və ya vaxtı keçib.",
    resetMismatch: "Parollar uyğun gəlmir.",
    resetBack: "Girişə qayıt",
    profileChangePassword: "Parolu dəyiş",
    profilePasswordUpdated: "Parolunuz yeniləndi.",
    profileCurrentPassword: "Cari parol",
    profileNewPassword: "Yeni parol",
    profileConfirmNewPassword: "Yeni parolu təsdiqləyin",
    profileUpdatePassword: "Parolu yenilə",
    profilePasswordsMismatch: "Yeni parollar uyğun gəlmir.",
    profilePasswordSame: "Yeni parol cari paroldan fərqli olmalıdır.",
    valEmailRequired: "E-poçt tələb olunur.",
    valEmailInvalid: "Düzgün e-poçt ünvanı daxil edin.",
    valPasswordRequired: "Parol tələb olunur.",
    valPasswordMin: "Parol ən azı {n} simvoldan ibarət olmalıdır.",
    valUsernameRequired: "İstifadəçi adı tələb olunur.",
    valUsernameMin: "İstifadəçi adı ən azı {n} simvoldan ibarət olmalıdır.",
    valRequired: "\"{field}\" sahəsi tələb olunur.",
    valNumber: "\"{field}\" rəqəm olmalıdır.",
    valGreaterThanZero: "\"{field}\" 0-dan böyük olmalıdır.",
    valInvalidDate: "\"{field}\" düzgün tarix deyil.",
    valMustBeFuture: "\"{field}\" gələcəkdə olmalıdır.",
    valDefaultPrice: "Qiymət",
    valDefaultDate: "Tarix",
    valBidRequired: "Təklif məbləğini daxil edin.",
    valBidNumber: "Təklif məbləği rəqəm olmalıdır.",
    valRangeNumeric: "Qiymət aralığı rəqəm olmalıdır.",
    valRangeOrder: "Minimum qiymət maksimumdan böyük ola bilməz.",
    valImageType: "Link şəkil faylına (jpg, png, gif, webp, svg) yönəlməlidir.",
    valImageInvalid: "Şəkil linki düzgün veb ünvan olmalıdır (məs., https://example.com/image.jpg).",
    err401: "Davam etmək üçün daxil olun.",
    err403: "Bu əməliyyat üçün icazəniz yoxdur.",
    err404: "Axtardığınız element mövcud deyil.",
    err409: "Sorğuda ziddiyyət yarandı. Yenidən cəhd edin.",
    err429: "Çox sayda sorğu. Bir az gözləyib yenidən cəhd edin.",
    err5xx: "Server müvəqqəti əlçatan deyil. Sonra yenidən cəhd edin.",
    errOffline: "İnternet bağlantısı yoxdur. Şəbəkəni yoxlayıb yenidən cəhd edin.",
    errNetwork: "Serverə qoşulmaq mümkün olmadı. Bağlantını yoxlayıb yenidən cəhd edin.",
    errDefault: "Xəta baş verdi. Yenidən cəhd edin.",
    errUnexpected: "Gözlənilməz xəta baş verdi. Yenidən cəhd edin.",
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

// Shared with I18nContext so both read/write the same localStorage key.
export const I18N_STORAGE_KEY = 'preferred-language';

export function isLanguage(value: unknown): value is Language {
  return value === 'en' || value === 'ru' || value === 'az';
}

// For code that runs outside React (validators, axios error helpers,
// Intl formatters): reads the language the user last selected. It's called
// at event time (submit / error), so it always reflects the current choice.
export function getCurrentLanguage(): Language {
  try {
    const stored = localStorage.getItem(I18N_STORAGE_KEY);
    return isLanguage(stored) ? stored : 'en';
  } catch {
    return 'en';
  }
}

export function currentT(): Translations {
  return getTranslation(getCurrentLanguage());
}

// Fills {placeholders} in a translated string: fmt(t.ui.valPasswordMin, { n: 6 }).
export function fmt(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match
  );
}