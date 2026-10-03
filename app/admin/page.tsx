"use client";

import { ShoppingBag, Package, Tags, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

const cards = [
  {
    title: "Orders",
    description: "View and manage customer orders.",
    href: "/admin/orders",
    icon: ShoppingBag,
  },
  {
    title: "Products",
    description: "Manage products in your store.",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "Categories",
    description: "Manage product categories.",
    href: "/admin/categories",
    icon: Tags,
  },
  {
    title: "Users",
    description: "View and manage users.",
    href: "/admin/users",
    icon: Users,
  },
];

export default function AdminDashboard() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>

        <p className="mt-2 text-gray-600">Manage your Bayaa store from here.</p>
      </div>

      {/* Quick links */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <Link
              key={card.title}
              href={card.href}
              className="group rounded-lg border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-gray-100">
                <Icon size={22} className="text-gray-700" />
              </div>

              <h2 className="text-lg font-semibold text-gray-900">
                {card.title}
              </h2>

              <p className="mt-2 text-sm text-gray-500">{card.description}</p>

              <div className="mt-5 flex items-center gap-2 text-sm font-medium text-black">
                Manage
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Welcome section */}
      <div className="mt-8 rounded-lg border bg-white p-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Welcome to Bayaa Admin
        </h2>

        <p className="mt-2 text-gray-600">
          Use the sidebar to manage orders, products, categories, and users.
        </p>
      </div>
    </div>
  );
}
