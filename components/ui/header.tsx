"use client";
import { useState } from "react";

import Link from "next/link";
import CustomSheet from "./cart-sheet";

export default function Header(): JSX.Element {
  const [isSheetOpen, setSheetOpen] = useState(false);

  return (
    <header className="relative isolate z-10 flex h-24 w-full flex-row items-center justify-between bg-white shadow-xl">
      <nav
        aria-label="Global"
        className="flex w-full items-center justify-between px-4 sm:px-6 lg:px-10 xl:px-40"
      >
        <div className="flex items-center justify-between gap-12">
          <div className="flex">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">SHOP.CO</span>
              <h1 className="text-3xl font-semibold">SHOP.CO</h1>
            </Link>
          </div>
          <div className="hidden lg:flex lg:gap-x-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Link
                key={index}
                href="/shop"
                className="text-lg/6 font-medium text-gray-900"
              >
                Shop
              </Link>
            ))}
          </div>
        </div>

        <CustomSheet isSheetOpen={isSheetOpen} setSheetOpen={setSheetOpen} />
      </nav>
    </header>
  );
}
