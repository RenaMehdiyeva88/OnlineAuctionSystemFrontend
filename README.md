Auctionhouse — Online Auction System Frontend
React + Vite + TypeScript frontend for the Online Auction System, built to talk to the
existing ASP.NET Core Web API (`OnlineAuctionSystem.Presentation`) over HTTP and SignalR.
Setup
```bash
npm install
cp .env.example .env   # then edit VITE_API_BASE_URL / VITE_SIGNALR_HUB_URL
npm run dev
```
The dev server runs on `http://localhost:5173`. All backend URLs are configured through
`.env` — nothing is hardcoded, so pointing at a different environment is a one-line change.
Structure
```
src/
├── api/            axios instance + one file per resource (auth, auction, bid, user, category, notification)
├── models/         TypeScript interfaces mirroring the backend Contracts DTOs
├── context/        AuthContext (session) + NotificationContext (toast/outbid pop-ups)
├── hooks/          useAuth, useToast, useCountdown (F4), useAuctionHub (F3, SignalR)
├── routes/         ProtectedRoute (any logged-in user), SellerRoute (Seller role only)
├── components/
│   ├── common/     Button, form fields, Badge, Spinner, EmptyState, ErrorBanner, Toasts
│   ├── layout/     Navbar, Footer, Layout (wraps every page)
│   ├── auction/    AuctionCard, AuctionGrid, AuctionFilters (F8), CountdownTimer (F4)
│   └── bid/        BidForm (F3), BidHistoryList (F7)
├── pages/          One folder per route (see table below)
├── styles/         tokens.css (design system variables) + global.css
└── utils/          formatters, API base URL constants
```
Pages ↔ features
Page	Route	Features
Home	`/`	Hero, featured auctions, category chips, search
Auctions	`/auctions`	F8 — search, category filter, price range
Auction Details	`/auctions/:id`	F3 (live bidding via SignalR), F4 (countdown), F5 (winner), F7 (bid history)
Login	`/login`	F1
Register	`/register`	F1
Create Auction	`/seller/auctions/new`	F2 (Seller-only route)
Seller Dashboard	`/seller/dashboard`	F6 (Seller-only route)
Profile	`/profile`	Account info, logout (protected route)
404	`*`	—
Real-time bidding (F3)
`useAuctionHub` connects to the real SignalR hub the backend already exposes at
`/hubs/auctions` (`AuctionHub` in `OnlineAuctionSystem.Presentation`). No fake timers or
simulated data — it's a genuine WebSocket connection with automatic reconnect that:
joins the auction's group on mount (`JoinAuctionGroup`)
listens for `NewBid`, `OutBid`, `AuctionWon`, `AuctionClosed` events pushed from the backend
leaves the group on unmount
⚠️ Backend endpoints this frontend expects but that may not exist yet
I designed the API layer against endpoints the backend should expose based on the
Application layer we already built together. A few aren't wired into controllers yet —
add these actions before the frontend will fully work end-to-end:
`POST /api/users/login` → `LoginUserCommand` (Application has the handler, `UsersController` doesn't call it yet)
`POST /api/users/refresh-token` → `RefreshTokenCommand`
`GET /api/categories` → `GetCategoriesQuery` (needs a `CategoriesController`)
`GET /api/notifications?userId=` → `GetNotificationsQuery` (needs a `NotificationsController`) — the frontend currently only uses SignalR push events for notifications, not this endpoint, so it's not blocking.
Also worth revisiting: `AuctionsController.Create` and `BidsController.PlaceBid` currently
take `sellerId`/`bidderId` as query parameters. Once JWT auth middleware is wired up and
`ICurrentUserService` reads the token, those should come from the authenticated user
instead — passing your own ID as a query param is something any client could spoof.
What's intentionally not built
No fake/mock backend anywhere — every API call goes to axios pointed at the real API.
No hardcoded auction/user/bid data.
Image upload isn't implemented (per the backend contract, auctions take an `imageUrl`
string) — sellers paste a link. Swap in a real upload flow later if needed.