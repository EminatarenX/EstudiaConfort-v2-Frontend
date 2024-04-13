import { useState } from "react";
import HeaderHomeLayout from "./HeaderHomeLayout";
export default function HomeLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <main className="p-10 h-screen  bg-slate-200">

      <HeaderHomeLayout isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="bg-white rounded-b-3xl overflow-scroll scrollbar-hide h-[80svh] max-h-[80svh]">
        {children}
        <footer className="flex justify-center items-center bg-white py-20">
          <p className="text-gray-400">AquaCare &copy; 2021</p>
        </footer>
      </div>
    </main>
  );
}
