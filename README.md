# Online Auction System — Frontend

React + TypeScript + Vite client for the Online Auction System. It talks to the ASP.NET Core backend over REST and SignalR.
Backend repository: [OnlineAuctionSystemBackend](https://github.com/RenaMehdiyeva88/OnlineAuctionSystemBackend).

## Features
- Browse, search and filter auctions; live countdown timers
- Place bids with real-time updates (SignalR): outbid, new bid, auction won/closed notifications
- Register / login with an e-mail confirmation code, password reset
- Sellers: create lots with photo upload, "Suggest with AI" listing generation, seller dashboard, sales
- Buyers: bid history, orders (checkout for won auctions, mark payment sent)
- AI assistant chat answering questions about the auction rules and current lots
- Interface in English, Russian and Azerbaijani

## Tech stack
React 18, TypeScript, Vite, React Router 6, Axios, @microsoft/signalr.

## Getting started
Requirements: Node.js 18+ and the backend running (see its README).

```bash
npm install
cp .env.example .env      # Windows PowerShell: copy .env.example .env
npm run dev
```
The app runs at `http://localhost:5173`.

### Environment variables (`.env`)
| Variable | Meaning |
|---|---|
| `VITE_API_BASE_URL` | Backend API base, e.g. `https://localhost:7201/api` |
| `VITE_SIGNALR_HUB_URL` | SignalR hub, e.g. `https://localhost:7201/hubs/notifications` |

The ports must match the backend launch profile (`http` → 5201, `https` → 7201). Do not put secrets in `.env`; everything here is public in the browser bundle.

## Scripts
| Command | What it does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Type-check (`tsc -b`) and production build |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint |

## Structure
```
src/
├── api/          Axios client + one file per resource (auth, auction, bid, order, ai, ...)
├── models/       TypeScript types mirroring the backend DTOs
├── context/      Auth and notification state
├── hooks/        useAuctionHub / useNotificationHub (SignalR), useCountdown, ...
├── i18n/         en / ru / az translations
├── routes/       ProtectedRoute, SellerRoute
├── components/   common, layout, auction, bid
├── pages/        Home, Auctions, AuctionDetails, Login, Register, CreateAuction,
│                 MyOrders, MySales, SellerDashboard, Notifications, Profile, ...
└── styles/       design tokens + global styles
```

## Routes
`/` · `/auctions` · `/auctions/:id` · `/login` · `/register` · `/forgot-password` · `/reset-password`
Logged in: `/profile`, `/notifications`, `/orders/mine` · Seller only: `/seller/dashboard`, `/seller/auctions/new`, `/seller/sales`

## Demo checklist
1. Log in as a seller and create a lot (try "Suggest with AI").
2. Log in as a buyer in another browser and place bids; the first buyer gets an outbid notification.
3. Let a short auction end; the winner can check out from "My orders", the seller confirms payment.

## Known limitations
- No automated frontend tests yet.
- Auth tokens are kept in `localStorage`.
- Payment is manual (no payment provider).
- AI price suggestions are rough estimates.
