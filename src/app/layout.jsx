import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/Auth/AuthProvider";
import SocketProvider from "@/context/Socket/SocketProvider";
import UserProvider from "../context/User/UserProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Aquacare - Save Water, Save Life",
  description:
    "Aqua Save is a water management system that helps you save water and save life.",
  icons: {
    icon: [
      {
        url: "/rom-s.png",
        href: "/room-s.png",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <UserProvider>
            <SocketProvider>
              <ToastContainer />
                {children}
            </SocketProvider>
          </UserProvider>{" "}
        </AuthProvider>
      </body>
    </html>
  );
}
