import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/Auth/AuthProvider";
import SocketProvider from "@/context/Socket/SocketProvider";
import UserProvider from "../context/User/UserProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
          </UserProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
