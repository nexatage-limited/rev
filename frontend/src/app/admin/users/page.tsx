"use client";

import { useState, useMemo } from "react";

const MOCK_USERS = [
  {
    id: "1",
    name: "Sarah Jenkins",
    email: "sarah.j@example.com",
    role: "Customer",
    status: "Active",
    trustScore: 98,
    activeRepairs: "1 Active",
    img: "https://i.pravatar.cc/150?u=sarah",
  },
  {
    id: "2",
    name: "Michael Jordan",
    email: "m.jordan@bulls.com",
    role: "Technician",
    status: "Verify",
    trustScore: 75,
    activeRepairs: "-",
    initials: "MJ",
  },
  {
    id: "3",
    name: "David Smith",
    email: "david.s@example.com",
    role: "Customer",
    status: "Suspended",
    trustScore: 25,
    activeRepairs: "0 Active",
    img: "https://i.pravatar.cc/150?u=david",
  },
  {
    id: "4",
    name: "Elena Lopez",
    email: "e.lopez@design.com",
    role: "Customer",
    status: "Active",
    trustScore: 88,
    activeRepairs: "2 Active",
    initials: "EL",
  },
];

export default function UserManagement() {
  const [selectedUserId, setSelectedUserId] = useState(MOCK_USERS[0].id);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");

  const filteredUsers = useMemo(() => {
    return MOCK_USERS.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.id.includes(searchQuery);

      const matchesStatus = statusFilter === "all" || user.status.toLowerCase() === statusFilter.toLowerCase();
      const matchesRole = roleFilter === "all" || user.role.toLowerCase() === roleFilter.toLowerCase();

      return matchesSearch && matchesStatus && matchesRole;
    });
  }, [searchQuery, statusFilter, roleFilter]);

  const selectedUser = filteredUsers.find((u) => u.id === selectedUserId) || filteredUsers[0] || MOCK_USERS[0];

  return (
    <>
      <header className="flex-shrink-0 flex flex-col gap-6 p-6 pb-2 border-b border-slate-200/50">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
            <p className="text-slate-500">Manage accounts, view profiles, and AI trust scores.</p>
          </div>
          <button className="bg-primary hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-all shadow-sm">
            <span className="material-symbols-outlined text-[20px]">add</span>
            Add New User
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3 pb-4">
          <div className="flex-1 min-w-[280px] relative h-11">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">
              search
            </span>
            <input
              className="w-full h-full pl-10 pr-4 rounded-lg bg-white border border-slate-200 focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all"
              placeholder="Search by Name, Email, or Repair ID"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className="h-11 px-4 rounded-lg bg-white border border-slate-200 text-sm outline-none cursor-pointer"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Status: All</option>
            <option value="active">Active</option>
            <option value="verify">Verify</option>
            <option value="suspended">Suspended</option>
          </select>
          <select
            className="h-11 px-4 rounded-lg bg-white border border-slate-200 text-sm outline-none cursor-pointer"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="all">Role: All</option>
            <option value="customer">Customer</option>
            <option value="technician">Technician</option>
          </select>
        </div>
      </header>

      <div className="flex-1 overflow-hidden flex p-6 gap-6 bg-slate-50">
        <div className="flex-1 flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 sticky top-0 z-10">
                <tr>
                  <th className="py-3 px-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                    User
                  </th>
                  <th className="py-3 px-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                    Role
                  </th>
                  <th className="py-3 px-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                    Status
                  </th>
                  <th className="py-3 px-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                    AI Trust
                  </th>
                  <th className="py-3 px-4 text-right border-b border-slate-200"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      onClick={() => setSelectedUserId(user.id)}
                      className={`cursor-pointer transition-colors ${
                        selectedUserId === user.id ? "bg-primary/5" : "hover:bg-slate-50"
                      }`}
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          {user.img ? (
                            <img
                              src={user.img}
                              className="size-10 rounded-full object-cover border border-slate-200"
                              alt=""
                            />
                          ) : (
                            <div className="size-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
                              {user.initials}
                            </div>
                          )}
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold">{user.name}</span>
                            <span className="text-[11px] text-slate-500">{user.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">{user.role}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                            user.status === "Active"
                              ? "bg-emerald-100 text-emerald-800"
                              : user.status === "Verify"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                user.trustScore > 80
                                  ? "bg-emerald-500"
                                  : user.trustScore > 50
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                              }`}
                              style={{ width: `${user.trustScore}%` }}
                            />
                          </div>
                          <span
                            className={`text-xs font-bold ${
                              user.trustScore > 80 ? "text-emerald-600" : "text-slate-500"
                            }`}
                          >
                            {user.trustScore}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button className="text-slate-400 hover:text-primary transition-colors">
                          <span className="material-symbols-outlined">more_vert</span>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-500">
                      No users found matching your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-white">
            <p className="text-xs text-slate-500 font-medium">Showing {filteredUsers.length} of {MOCK_USERS.length} users</p>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 rounded border border-slate-200 text-xs font-semibold hover:bg-slate-50">
                Prev
              </button>
              <button className="px-3 py-1.5 rounded border border-slate-200 text-xs font-semibold hover:bg-slate-50">
                Next
              </button>
            </div>
          </div>
        </div>

        <aside className="w-[400px] flex-shrink-0 hidden xl:flex flex-col bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden">
          <div className="h-28 bg-gradient-to-r from-blue-500 to-cyan-500 relative flex-shrink-0" />

          <div className="px-6 relative flex-1 overflow-y-auto pb-6">
            <div className="absolute -top-10 left-6">
              <div className="size-20 rounded-full border-4 border-white shadow-md bg-slate-100 overflow-hidden">
                <img src={`https://i.pravatar.cc/150?u=${selectedUser.id}`} className="w-full h-full object-cover" alt="" />
              </div>
            </div>

            <div className="pt-12 pb-4 flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold">{selectedUser.name}</h2>
                <p className="text-sm text-slate-500">Member since Oct 2023</p>
              </div>
              <div className="flex gap-1">
                <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
                  <span className="material-symbols-outlined text-[20px]">edit</span>
                </button>
                <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
                  <span className="material-symbols-outlined text-[20px]">mail</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Total Spend</p>
                <p className="text-lg font-black">$1,240</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Repairs</p>
                <p className="text-lg font-black">3 Total</p>
              </div>
            </div>

            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 mb-6 relative overflow-hidden">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-black text-primary uppercase tracking-widest">
                  Active Case #R-2940
                </span>
                <span className="bg-primary text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                  In Progress
                </span>
              </div>
              <h3 className="text-sm font-bold mb-1">iPhone 13 Pro Screen Replacement</h3>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                System is 98% confident this is a display assembly failure based on diagnostic logs.
              </p>

              <div className="bg-white rounded-lg p-3 border border-primary/10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-[18px] text-primary">smart_toy</span>
                  <p className="text-[11px] font-bold">AI Diagnosis Engine</p>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: "98%" }} />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Admin Notes</label>
              <textarea
                className="w-full rounded-xl bg-slate-50 border-none text-sm p-4 h-24 resize-none focus:ring-1 focus:ring-primary outline-none"
                placeholder="Add private note about this customer..."
              />
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
