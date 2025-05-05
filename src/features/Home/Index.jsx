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
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center bg-black overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&auto=format&fit=crop&w=2830&q=80"
          alt="Cricket"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative text-center px-4">
          <h1 className="text-5xl sm:text-7xl font-bold text-gold drop-shadow-md">
            Tolaram Premier League
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-white/90">
            Experience the thrill of premier cricket battles where legends are made.
            Watch the finest teams compete for glory in this prestigious tournament.
          </p>
          <div className="mt-8">
            <Link
              to="/login"
              className="inline-block text-white rounded-lg bg-gradient-to-r from-yellow-500 to-amber-600 bg-transparent px-12 py-3 text-lg font-bold hover:bg-green-500"
            >
              Log in
            </Link>
          </div>
        </div>
      </section>

      {/* Teams Section */}
      {teams?.teams && (
        <section className="bg-black px-6 py-20 lg:px-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gold">
            Watch Our Teams Play
          </h2>
          <div className="mt-12 grid gap-10 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 justify-center">
            {teams.teams.map((team, index) => (
              <Link
                to={`/team/${team.id}`}
                key={team.id}
                className="flex flex-col items-center hover:scale-105 transition-transform duration-300"
              >
                <div className="w-28 h-28 bg-gradient-to-b from-green-700 to-black rounded-full flex items-center justify-center shadow-lg border-2 border-gold">
                  <img
                    src={team.team_logo}
                    alt={team.team_name}
                    className="h-20 w-20 object-contain"
                  />
                </div>
                <p className="mt-4 text-white text-center font-medium">
                  {team.team_name}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default Index;
