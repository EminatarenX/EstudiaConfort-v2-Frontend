import Link from "next/link";

export default function AsideHomeLayout({isOpen}) {
  return (
    <aside
      className={`fixed flex flex-col justify-center items-center gap-6 z-10 lg:hidden bg-white top-0 right-0 w-96 h-screen transition-all transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <Link
        href={"/"}
        className="text-2xl  px-5 py-5 lg:px-10 font-semibold text-sky-950"
      >
        Aqua<span className="text-blue-500">Care</span>
      </Link>
      <Link
        className="h-12 w-40 border border-sky-100 flex justify-center items-center  transition-all text-sky-800 rounded-3xl font-semibold"
        href={"/login"}
      >
        Iniciar sesion
      </Link>
      <Link
        className="h-12 w-40 bg-sky-100 flex justify-center items-center text-sky-600 transition-all rounded-3xl font-semibold"
        href={"/registration"}
      >
        Registro
      </Link>
    </aside>
  );
}
