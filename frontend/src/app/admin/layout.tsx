import Sidebar from "@/components/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden relative">
      <Sidebar />
      <main className="flex-1 flex flex-col h-full overflow-hidden md:relative">
        {children}
      </main>
    </div>
  );
}
