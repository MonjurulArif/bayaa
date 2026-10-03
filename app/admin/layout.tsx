"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Tags,
  Users,
  Settings,
  Store,
} from "lucide-react";

const menuItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Orders",
    href: "/admin/orders",
    icon: ShoppingBag,
  },
  {
    label: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    label: "Categories",
    href: "/admin/categories",
    icon: Tags,
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r bg-white">
          {/* Logo */}
          <div className="flex h-16 items-center gap-2 border-b px-6">
            <Store size={24} className="text-black" />

            <Link href="/admin" className="text-xl font-bold text-black">
              Bayaa Admin
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {menuItems.map((item) => {
              const Icon = item.icon;

              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-black text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon size={19} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Back to Store */}
          <div className="border-t p-4">
            <Link
              href="/"
              className="flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Back to Store
            </Link>
          </div>
        </aside>

        {/* Main content */}
        <main className="ml-64 min-h-screen flex-1">{children}</main>
      </div>
    </div>
  );
}
