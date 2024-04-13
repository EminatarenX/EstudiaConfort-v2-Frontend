import Link from "next/link";
import AsideHomeLayout from "./AsideHomeLayout";

export default function HeaderHomeLayout({isOpen, setIsOpen}) {
  return (
    <header className="flex justify-center lg:justify-between items-center bg-white rounded-t-3xl relative">
    <Link
      href={"/"}
      className="text-2xl  px-5 py-5 lg:px-10 font-semibold text-sky-950"
    >
      Aqua<span className="text-blue-500">Care</span>
    </Link>
    <nav className="hidden lg:flex gap-5 px-5 py-5 ">
      <Link
        className="h-12 w-40 border border-sky-100 flex justify-center items-center  transition-all text-sky-800 rounded-3xl font-semibold"
        href={"/login"}
      >
        Iniciar sesion
      </Link>
      <Link
        className="h-12 w-40 bg-sky-100 flex justify-center items-center text-sky-400 transition-all rounded-3xl font-semibold"
        href={"/registration"}
      >
        Registro
      </Link>
    </nav>
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="lg:hidden absolute text-neutral-600 text-2xl p-4 top-0 right-0 z-20"
    >
      &#9776;
    </button>
    <AsideHomeLayout isOpen={isOpen} />
  </header>
  )
}
