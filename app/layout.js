import { Inter } from "next/font/google";
import "./globals.css";
import { Session } from "next-auth";
import AuthProvider from "@/components/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from 'next/head';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
export default function RootLayout({ children, session }) {
  return (
    <html lang="en">

      <body>
        <ToastContainer />
        <AuthProvider session={session}>
          {/* <Navbar authenticated={false} name='null' image='null'/> */}
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
