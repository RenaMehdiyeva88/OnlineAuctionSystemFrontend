import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ToastContainer from "@/components/common/ToastContainer";
import AiChatWidget from "@/components/common/AiChatWidget";

export default function Layout() {
  return (
    <>
      <Navbar />
      <main className="page">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer />
      <AiChatWidget />
    </>
  );
}