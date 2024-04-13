"use client";
import HomeLayout from "@/components/layouts/HomeLayout";
import Image from "next/image";

export default function Home() {

  return (
    <HomeLayout>
      <h1 className={`text-6xl font-bold text-center`}>
        Cuidamos de manera <p className="text-blue-500">inteligente</p>
      </h1>
        <section className="container mx-auto flex justify-center mt-5">
          <Image src="/hero.png" width={800} height={800} alt="aqua-hero" className="object-contain floating" />
        </section>
        <section className="flex flex-col lg:flex-row mt-5">
        <article className="mt-5 px-10">
          <h2 className="text-4xl font-bold text-center">¿Qué es Aqua<span className="text-blue-500">Care</span>?</h2>
          <p className="text-center mt-5 text-xl">AquaCare es un sistema de monitoreo y control de consumo de agua y gas en tiempo real, que te permite tener un control total de tus consumos y detectar fugas de manera temprana.</p>
        </article>
        <article className="mt-5 px-10">
          <h2 className="text-4xl font-bold text-center">¿Cómo funciona?</h2>
          <p className="text-center mt-5 text-xl">AquaCare se instala en tu hogar y se conecta a tu red de agua y gas, a partir de ahí podrás monitorear tus consumos en tiempo real desde tu dispositivo móvil.</p>
        </article>
        </section>
    </HomeLayout>
  );
}
