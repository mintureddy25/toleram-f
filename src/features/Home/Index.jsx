import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useGetTeamsQuery } from "../../app/Services/Admin/adminTeams";

const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];

function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: teams } = useGetTeamsQuery();

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gray-900">
        <header className="absolute inset-x-0 top-0 z-50">
          <nav
            aria-label="Global"
            className="flex items-center justify-between p-6 lg:px-8"
          >
            <div className="flex lg:flex-1">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  alt=""
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                  className="h-8 w-auto"
                />
              </a>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="hidden lg:flex lg:gap-x-12">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm/6 font-semibold text-white"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <Link to="/login" className="text-sm/6 font-semibold text-white">
                Log in <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </nav>
          <Dialog
            open={mobileMenuOpen}
            onClose={setMobileMenuOpen}
            className="lg:hidden"
          >
            <div className="fixed inset-0 z-50" />
            <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
              <div className="flex items-center justify-between">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">Your Company</span>
                  <img
                    alt=""
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                    className="h-8 w-auto"
                  />
                </a>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-m-2.5 rounded-md p-2.5 text-gray-400"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/25">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-gray-800"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <div className="py-6">
                    <a
                      href="#"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-gray-800"
                    >
                      Log in
                    </a>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </Dialog>
        </header>

        <div className="relative isolate overflow-hidden pt-14">
          <img
            alt="Cricket Stadium"
            src="https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&auto=format&fit=crop&w=2830&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
            className="absolute inset-0 -z-10 size-full object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-46">
              <div className="text-center">
                <section class="animate-fade-in-up max-w-4xl mx-auto text-center">
                  <h1 class="text-4xl sm:text-7xl font-bold tracking-tight">
                    <span class="inline-block bg-gradient-to-r from-gray-200 via-indigo-300 to-gray-200 bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
                      Toleram Premier League
                    </span>
                  </h1>
                  <p class="mt-8 text-pretty text-base sm:text-xl max-w-xl inline-block text-white bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
                    Experience the thrill of premier cricket battles where
                    legends are made. Watch the finest teams compete for glory
                    in this prestigious tournament.
                  </p>
                </section>

                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <Link
                    to="/login"
                    className="rounded-md bg-indigo-600 px-8 py-2.5 text-lg font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                  >
                    Log in
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            />
          </div>
        </div>
        {teams?.teams && <div className="py-12 sm:py-24 max-w-7xl mx-auto bg-gray-900">
          <p class="mt-8 text-pretty text-2xl sm:text-4xl font-bold max-w-xl inline-block text-white bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
            Watch Our Teams Play
          </p>
          <div className="mx-auto grid max-w-lg grid-cols-2 md:grid-cols-4 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-3 lg:mx-0 lg:max-w-none lg:grid-cols-5 py-12 sm:py-24">
            {teams?.teams.map((t, index) => (
              <Link
                to={`/team/${t.id}`}
                className="group flex flex-col items-center transition-all duration-300 hover:scale-110 animate-fade-slide-up"
                style={{
                  animationDelay: `${index * 150}ms`,
                }}
              >
                <div
                  key={t.team_name}
                  className="group flex flex-col items-center transition-all duration-300 hover:scale-110 animate-fade-slide-up"
                  style={{
                    animationDelay: `${index * 150}ms`,
                  }}
                >
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-gray-800 to-gray-900 p-4 shadow-[0_0_15px_rgba(139,92,246,0.2)] group-hover:shadow-[0_0_25px_rgba(139,92,246,0.4)] border border-purple-500/10 motion-safe:animate-pulse">
                    <img
                      className="h-28 w-24 object-contain"
                      src={t.team_logo}
                      alt={t.team_name}
                    />
                  </div>
                  <div className="mt-4 text-base font-medium text-gray-300 group-hover:text-cyan-400 transition-colors">
                    {t.team_name}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>}
      </div>
    </>
  );
}

export default Index;
