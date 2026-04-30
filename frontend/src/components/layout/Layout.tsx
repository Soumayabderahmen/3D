import type { ReactNode } from "react";
import TopBar from "./TopBar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingElements from "./FloatingElements";
import ChatBot from "../../components/ChatBot";

const Layout = ({ children }: { children: ReactNode }) => (
  <>
    <TopBar />
    <Navbar />
    <main>{children}</main>
    <Footer />
    <FloatingElements />
    <ChatBot />
  </>
);

export default Layout;
