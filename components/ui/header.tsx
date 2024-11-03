"use client";
import { useState } from "react";
import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import {
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
  RectangleGroupIcon,
} from "@heroicons/react/20/solid";

import Link from "next/link";
import CustomSheet from "./cart-sheet";

const products = [
  {
    name: "Analytics",
    description: "Get a better understanding where your traffic is coming from",
    href: "#",
    icon: ChartPieIcon,
  },
  {
    name: "Engagement",
    description: "Speak directly to your customers with our engagement tool",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Security",
    description: "Your customers’ data will be safe and secure",
    href: "#",
    icon: FingerPrintIcon,
  },
  {
    name: "Integrations",
    description: "Your customers’ data will be safe and secure",
    href: "#",
    icon: SquaresPlusIcon,
  },
];
const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
  { name: "View all products", href: "#", icon: RectangleGroupIcon },
];

export default function Header(): JSX.Element {
  const [isSheetOpen, setSheetOpen] = useState(false);

  return (
    <header className="relative isolate z-10 flex h-24 w-full flex-row items-center justify-between bg-white shadow-xl">
      <nav
        aria-label="Global"
        className="flex w-full items-center justify-between px-4 sm:px-6 lg:px-10 xl:px-40"
      >
        <div className="flex items-center gap-12">
          <div className="flex">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">SHOP.CO</span>
              <h1 className="text-3xl font-semibold">SHOP.CO</h1>
            </Link>
          </div>
          <PopoverGroup className="hidden lg:flex lg:gap-x-4">
            <Popover>
              <PopoverButton className="flex items-center gap-x-1 text-sm/6 text-gray-900">
                Shop{" "}
                <ChevronDownIcon
                  aria-hidden="true"
                  className="h-5 w-5 flex-none text-gray-400"
                />
              </PopoverButton>

              <PopoverPanel
                transition
                className="absolute inset-x-0 top-0 -z-10 bg-white pt-14 shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:-translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="mx-auto grid max-w-7xl grid-cols-4 gap-x-4 px-6 py-10 lg:px-8 xl:gap-x-8">
                  {products.map((item) => (
                    <div
                      key={item.name}
                      className="group relative rounded-lg p-6 text-sm/6 hover:bg-gray-50"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <item.icon
                          aria-hidden="true"
                          className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                        />
                      </div>
                      <a
                        href={item.href}
                        className="mt-6 block font-semibold text-gray-900"
                      >
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>
                      <p className="mt-1 text-gray-600">{item.description}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-gray-50">
                  <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-3 divide-x divide-gray-900/5 border-x border-gray-900/5">
                      {callsToAction.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100"
                        >
                          <item.icon
                            aria-hidden="true"
                            className="h-5 w-5 flex-none text-gray-400"
                          />
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </PopoverPanel>
            </Popover>

            <Link href="#" className="text-sm/6 text-gray-900">
              Features
            </Link>
            <Link href="#" className="text-sm/6 text-gray-900">
              Marketplace
            </Link>
            <Link href="#" className="text-sm/6 text-gray-900">
              Company
            </Link>
          </PopoverGroup>
        </div>

        <CustomSheet isSheetOpen={isSheetOpen} setSheetOpen={setSheetOpen} />
      </nav>
    </header>
  );
}
