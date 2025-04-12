import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import {
  ArrowsRightLeftIcon,
  Cog6ToothIcon,
  HomeIcon,
  ChartBarIcon,
  TrophyIcon,
  UserGroupIcon,
  UserIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { isAdmin } from "../../Utils/Helpers";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const nav = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: HomeIcon,
  },
  {
    name: "Teams",
    href: "/admin/teams",
    icon: UserGroupIcon,
  },
  {
    name: "Matches",
    href: "/admin/matches",
    icon: ArrowsRightLeftIcon,
  },
  {
    name: "Tournaments",
    href: "/admin/tournament",
    icon: TrophyIcon,
  },
  {
    name: "User",
    href: "/admin/user",
    icon: UserIcon,
  }
];

export default function AdminLayout() {
  const token = useSelector((state) => state.auth.JWTtoken);
  const location = useLocation();
  const navigate = useNavigate();

  if (!isAdmin(token)) {
    navigate("/matches");
  }
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = nav.map((item) => {
    return {
      ...item,
      current: location.pathname.includes(item.href),
    };
  });

  return (
    <>
      <div>
        <div className="lg:hidden flex justify-end">
          <button
            type="button"
            className="text-gray-100 hover:text-gray-600 focus:outline-none"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <Dialog
          open={sidebarOpen}
          onClose={setSidebarOpen}
          className="relative z-50 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="-m-2.5 p-2.5"
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      aria-hidden="true"
                      className="size-6 text-white"
                    />
                  </button>
                </div>
              </TransitionChild>

              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-800 px-6 pb-4">
                <div className="flex h-16 shrink-0 items-center">
                  <img
                    alt="Tolaram"
                    src="/toleram-icon.png"
                    className="h-8 w-auto"
                  />
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <Link
                              to={item.href}
                              className={classNames(
                                item.current
                                  ? "bg-gray-800 text-gray-100 border border-gray-700"
                                  : "text-gray-400 hover:bg-gray-700 hover:text-white",
                                "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                              )}
                              onClick={() => setSidebarOpen(false)}
                            >
                              <item.icon
                                aria-hidden="true"
                                className={classNames(
                                  item.current
                                    ? "text-indigo-600"
                                    : "text-gray-400 group-hover:text-white",
                                  "size-6 shrink-0"
                                )}
                              />
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
        <div className="max-w-7xl mx-auto min-h-full">
          <div className="hidden lg:fixed lg:inset-y-3 lg:z-50 lg:flex lg:w-72 lg:flex-col mt-[6.5rem] border-r border-gray-700">
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 mt-12">
              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="-mx-2 space-y-1">
                      {navigation.map((item) => (
                        <li key={item.name}>
                          <Link
                            to={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-800 text-gray-100 border border-gray-700"
                                : "text-gray-400 hover:bg-gray-700 hover:text-white",
                              "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                            )}
                          >
                            <item.icon
                              aria-hidden="true"
                              className={classNames(
                                item.current
                                  ? "text-indigo-600"
                                  : "text-gray-400 group-hover:text-white",
                                "size-6 shrink-0"
                              )}
                            />
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="lg:pl-72 ">
            <main className="">
              <div className="mx-auto">
                <>
                  <Outlet />
                </>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
