"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { icon: "dashboard", label: "Dashboard", href: "/admin" },
  { icon: "group", label: "Users", href: "/admin/users" },
  { icon: "handyman", label: "Technicians", href: "/admin/technicians" },
  { icon: "local_shipping", label: "Deliveries", href: "/admin/deliveries" },
  { icon: "gavel", label: "Disputes", href: "/admin/disputes", badge: 3 },
  { icon: "settings", label: "Settings", href: "/admin/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-surface-dark text-white rounded-lg"
      >
        <span className="material-symbols-outlined">{isOpen ? "close" : "menu"}</span>
      </motion.button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="md:hidden fixed z-40 flex flex-col w-64 h-full bg-surface-dark border-r border-border-dark flex-shrink-0"
          >
            <div className="p-6 flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-primary/20 flex items-center justify-center rounded-lg size-10 text-primary"
              >
                <span className="material-symbols-outlined">verified_user</span>
              </motion.div>
              <div className="flex flex-col">
                <h1 className="text-white text-lg font-bold leading-tight">Rev Admin</h1>
                <p className="text-slate-400 text-xs font-normal">Trust-first Platform</p>
              </div>
            </div>

            <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-primary text-white"
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span className={`material-symbols-outlined ${isActive ? "fill-1" : ""}`}>
                      {item.icon}
                    </span>
                    <span className="text-sm font-medium flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="bg-accent text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-border-dark">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold text-sm">
                  AD
                </div>
                <div className="flex flex-col">
                  <p className="text-white text-sm font-medium">Admin User</p>
                  <p className="text-slate-400 text-xs">Super Admin</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="ml-auto text-slate-400 hover:text-white"
                >
                  <span className="material-symbols-outlined">logout</span>
                </motion.button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: 0 }}
        className="hidden md:flex flex-col w-64 h-full bg-surface-dark border-r border-border-dark flex-shrink-0"
      >
        <div className="p-6 flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-primary/20 flex items-center justify-center rounded-lg size-10 text-primary"
          >
            <span className="material-symbols-outlined">verified_user</span>
          </motion.div>
          <div className="flex flex-col">
            <h1 className="text-white text-lg font-bold leading-tight">Rev Admin</h1>
            <p className="text-slate-400 text-xs font-normal">Trust-first Platform</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-1">
          {navItems.map((item, i) => {
            const isActive = pathname === item.href;
            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span className={`material-symbols-outlined ${isActive ? "fill-1" : ""}`}>
                    {item.icon}
                  </span>
                  <span className="text-sm font-medium flex-1">{item.label}</span>
                  {item.badge && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                      className="bg-accent text-white text-[10px] font-bold px-1.5 py-0.5 rounded"
                    >
                      {item.badge}
                    </motion.span>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border-dark">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold text-sm">
              AD
            </div>
            <div className="flex flex-col">
              <p className="text-white text-sm font-medium">Admin User</p>
              <p className="text-slate-400 text-xs">Super Admin</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="ml-auto text-slate-400 hover:text-white"
            >
              <span className="material-symbols-outlined">logout</span>
            </motion.button>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
