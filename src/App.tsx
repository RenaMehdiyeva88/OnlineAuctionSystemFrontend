import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { NotificationProvider } from "@/context/NotificationContext";
import { I18nProvider } from "@/context/I18nContext";
import { ThemeProvider } from "@/context/ThemeContext";
import Layout from "@/components/layout/Layout";
import ProtectedRoute from "@/routes/ProtectedRoute";
import SellerRoute from "@/routes/SellerRoute";

import Home from "@/pages/Home/Home";
import Auctions from "@/pages/Auctions/Auctions";
import AuctionDetails from "@/pages/AuctionDetails/AuctionDetails";
import Login from "@/pages/Login/Login";
import Register from "@/pages/Register/Register";
import CreateAuction from "@/pages/CreateAuction/CreateAuction";
import SellerDashboard from "@/pages/SellerDashboard/SellerDashboard";
import Profile from "@/pages/Profile/Profile";
import Notifications from "@/pages/Notifications/Notifications";
import NotFound from "@/pages/NotFound/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <I18nProvider>
          <AuthProvider>
            <NotificationProvider>
              <Routes>
                <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="auctions" element={<Auctions />} />
              <Route path="auctions/:id" element={<AuctionDetails />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />

              {/* F1: protected routes — require an authenticated session */}
              <Route element={<ProtectedRoute />}>
                <Route path="profile" element={<Profile />} />
                <Route path="notifications" element={<Notifications />} />
              </Route>

              {/* F2/F6: seller-only routes */}
              <Route element={<SellerRoute />}>
                <Route path="seller/dashboard" element={<SellerDashboard />} />
                <Route path="seller/auctions/new" element={<CreateAuction />} />
              </Route>

              <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </NotificationProvider>
          </AuthProvider>
        </I18nProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
