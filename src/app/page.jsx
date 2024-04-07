"use client";
import HomeLayout from "@/components/layouts/HomeLayout";
import Image from "next/image";

export default function Home() {

  return (
    <HomeLayout>
      <h1 className={`text-3xl font-semibold text-center`}>
        Welcome to Mambul
        <section className="container mx-auto flex justify-center">

          <Image src="/mabul.png" width={800} height={800} alt="Mambul Logo" className="" />
        </section>
      </h1>
    </HomeLayout>
  );
}
