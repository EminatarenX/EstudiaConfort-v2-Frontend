"use client"

import HomeLayout from "@/components/layouts/HomeLayout";

export default function Home() {


  return (
    <HomeLayout>
        <h1
          className={`text-3xl font-semibold text-center`}
        >
          Welcome to the app
        </h1>
    </HomeLayout>

  );
}
