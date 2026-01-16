import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TechnicianNav() {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/technician/dashboard", icon: "dashboard" },
    { label: "Jobs", href: "/technician/jobs", icon: "handyman" },
    { label: "Profile", href: "/technician/profile", icon: "person" },
    { label: "Documents", href: "/technician/documents", icon: "description" },
    { label: "Banking", href: "/technician/banking", icon: "account_balance" }
  ];

  return (
    <header className="bg-white border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 text-primary">
            <span className="material-symbols-outlined text-2xl">build</span>
          </div>
          <h1 className="text-xl font-bold">Rev Technician</h1>
        </div>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
                  pathname === item.href
                    ? "text-primary bg-primary/10"
                    : "text-gray-600 hover:text-primary hover:bg-gray-50"
                }`}
              >
                <span className="material-symbols-outlined text-lg">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-bold">Alex M.</p>
              <p className="text-xs text-gray-500">Lvl 3 Technician</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
          </div>
        </div>
      </div>
    </header>
  );
}
