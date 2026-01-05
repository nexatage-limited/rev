"use client";

import { useState } from "react";
import Image from "next/image";

const TICKETS = [
  {
    id: "REV-2942",
    title: "Screen flickers after repair",
    preview: "Customer claims the technician damaged the flex cable during installation.",
    user: "Sarah J.",
    time: "2m ago",
    priority: "High Priority",
    status: "Dispute",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    risk: 85,
  },
  {
    id: "REV-2941",
    title: "Technician didn't show up",
    preview: "I waited for 2 hours and nobody came. I want a refund immediately.",
    user: "Mike R.",
    time: "4h ago",
    priority: "Normal",
    status: "Dispute",
    avatar: "https://i.pravatar.cc/150?u=mike",
    risk: 40,
  },
  {
    id: "REV-2938",
    title: "Battery drains fast",
    preview: "New battery installed yesterday seems faulty.",
    user: "Jen K.",
    time: "1d ago",
    priority: "Low",
    status: "New",
    avatar: "https://i.pravatar.cc/150?u=jen",
    risk: 15,
  },
];

export default function DisputeManagement() {
  const [activeTicket, setActiveTicket] = useState(TICKETS[0]);
  const [composerMode, setComposerMode] = useState<"reply" | "note">("reply");

  return (
    <div className="flex h-full w-full overflow-hidden flex-col md:flex-row">
      <section className="w-full md:w-[380px] border-r border-slate-200 bg-white flex flex-col shrink-0">
        <div className="p-4 border-b border-slate-100">
          <h2 className="text-lg font-bold mb-4">Support Queue</h2>
          <div className="relative mb-4">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-[18px]">
              search
            </span>
            <input
              placeholder="Search ID or user..."
              className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            <button className="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-bold whitespace-nowrap">
              All Open (12)
            </button>
            <button className="px-3 py-1.5 rounded-lg bg-slate-100 text-xs font-medium whitespace-nowrap">
              My Assigned
            </button>
            <button className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-xs font-medium whitespace-nowrap">
              Urgent
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {TICKETS.map((ticket) => (
            <div
              key={ticket.id}
              onClick={() => setActiveTicket(ticket)}
              className={`p-4 border-b border-slate-50 cursor-pointer transition-all border-l-4 ${
                activeTicket.id === ticket.id
                  ? "bg-blue-50/50 border-l-primary"
                  : "hover:bg-slate-50 border-l-transparent"
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{ticket.id}</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    ticket.priority === "High Priority" ? "bg-red-100 text-red-700" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {ticket.priority}
                </span>
              </div>
              <h3 className="text-sm font-bold line-clamp-1">{ticket.title}</h3>
              <p className="text-xs text-slate-500 line-clamp-2 mt-1">{ticket.preview}</p>
              <div className="flex items-center gap-2 mt-3">
                <Image src={ticket.avatar} width={20} height={20} className="size-5 rounded-full" alt="User avatar" />
                <span className="text-[10px] text-slate-400 font-medium">
                  {ticket.user} • {ticket.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex-1 flex flex-col bg-slate-50 min-w-0">
        <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] font-bold text-slate-400">{activeTicket.id}</span>
              <span className="size-1 bg-slate-300 rounded-full" />
              <span className="text-[10px] font-bold text-red-500 uppercase">{activeTicket.status}</span>
            </div>
            <h2 className="text-sm font-bold">{activeTicket.title}</h2>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg text-xs font-bold">
              <div className="size-4 bg-primary rounded-full flex items-center justify-center text-[8px] text-white">A</div>
              Assigned to Me
              <span className="material-symbols-outlined text-[14px]">expand_more</span>
            </button>
            <button className="bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-lg shadow-sm hover:bg-blue-600 transition-colors">
              Resolve
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex justify-center">
            <span className="text-[10px] font-bold text-slate-400 bg-slate-200 px-3 py-1 rounded-full uppercase">
              Today
            </span>
          </div>

          <div className="flex items-center gap-3 p-3 bg-blue-50/50 border border-blue-100 rounded-xl text-xs">
            <span className="material-symbols-outlined text-primary text-[16px] shrink-0">info</span>
            <p>
              <span className="font-bold">System:</span> Technician uploaded 2 photos for evidence. View Evidence
            </p>
          </div>

          <div className="flex gap-4 max-w-[80%]">
            <Image src={activeTicket.avatar} width={32} height={32} className="size-8 rounded-full shrink-0" alt="User avatar" />
            <div className="space-y-1">
              <p className="text-xs font-bold">
                {activeTicket.user} <span className="font-medium text-slate-400 ml-2">10:45 AM</span>
              </p>
              <div className="p-3 bg-white border border-slate-100 rounded-2xl rounded-tl-none shadow-sm text-sm">
                Hi, I just got my phone back an hour ago. The screen is flickering like crazy. The technician seemed in a
                rush.
              </div>
            </div>
          </div>

          <div className="flex gap-4 max-w-[90%] mx-auto w-full">
            <div className="flex flex-col w-full gap-1 p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-[14px] text-yellow-600">lock</span>
                <span className="text-[10px] font-bold text-yellow-700 uppercase">Internal Note • Support Lead</span>
              </div>
              <p className="text-xs text-yellow-800">
                Checking Tech ID #882. This is the 3rd complaint this week regarding display flicker. Escalate if valid.
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white border-t border-slate-200">
          <div
            className={`border rounded-xl overflow-hidden shadow-sm transition-all ${
              composerMode === "note" ? "border-yellow-400/50 ring-2 ring-yellow-400/10" : "border-slate-200"
            }`}
          >
            <div className="flex bg-slate-50 border-b border-slate-200">
              <button
                onClick={() => setComposerMode("reply")}
                className={`px-4 py-2 text-xs font-bold transition-all ${
                  composerMode === "reply" ? "bg-white text-primary" : "text-slate-400"
                }`}
              >
                Reply
              </button>
              <button
                onClick={() => setComposerMode("note")}
                className={`px-4 py-2 text-xs font-bold transition-all flex items-center gap-2 ${
                  composerMode === "note" ? "bg-yellow-50 text-yellow-700" : "text-slate-400"
                }`}
              >
                <div className="size-2 rounded-full bg-yellow-400" /> Internal Note
              </button>
            </div>
            <textarea
              className={`w-full h-24 p-4 text-sm resize-none focus:outline-none bg-white ${
                composerMode === "note" ? "placeholder-yellow-600/50" : ""
              }`}
              placeholder={
                composerMode === "reply"
                  ? "Type your reply to customer..."
                  : "Add a private note only admins can see..."
              }
            />
            <div className="flex justify-between items-center p-2 px-3 border-t border-slate-50 bg-white">
              <div className="flex gap-2 text-slate-400">
                <button className="p-1.5 rounded hover:bg-slate-100 transition-colors">
                  <span className="material-symbols-outlined text-[18px]">format_bold</span>
                </button>
                <button className="p-1.5 rounded hover:bg-slate-100 transition-colors">
                  <span className="material-symbols-outlined text-[18px]">attach_file</span>
                </button>
                <button className="p-1.5 rounded hover:bg-slate-100 transition-colors">
                  <span className="material-symbols-outlined text-[18px]">image</span>
                </button>
              </div>
              <button
                className={`px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
                  composerMode === "note" ? "bg-yellow-500 text-white" : "bg-primary text-white"
                }`}
              >
                {composerMode === "reply" ? "Send Reply" : "Save Note"}{" "}
                <span className="material-symbols-outlined text-[14px]">send</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <aside className="w-full md:w-[340px] border-l border-slate-200 bg-white flex flex-col overflow-y-auto shrink-0 hidden md:flex">
        <div className="p-4 border-b border-slate-50">
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-4 rounded-xl border border-indigo-100">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-[16px] text-indigo-600">auto_awesome</span>
              <h4 className="text-[10px] font-black text-indigo-700 uppercase tracking-widest">AI Intelligence</h4>
            </div>
            <p className="text-xs font-medium mb-3">
              Customer sentiment is <span className="text-red-500 underline underline-offset-2">Highly Frustrated</span>.
              Likely to request a full refund.
            </p>
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-bold text-indigo-400 uppercase">
                <span>Refund Risk</span>
                <span>{activeTicket.risk}%</span>
              </div>
              <div className="w-full bg-white h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-500 h-full rounded-full transition-all duration-700"
                  style={{ width: `${activeTicket.risk}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 border-b border-slate-50">
          <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Customer Details</h5>
          <div className="flex items-center gap-3 mb-4">
            <Image src={activeTicket.avatar} width={48} height={48} className="size-12 rounded-full ring-2 ring-slate-100" alt="User avatar" />
            <div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-sm">{activeTicket.user}</span>
                <span className="material-symbols-outlined text-[14px] text-blue-500">verified</span>
              </div>
              <p className="text-xs text-slate-400">Joined 2021 • Pro Member</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-500">
              <span className="material-symbols-outlined text-[14px]">mail</span>
              <span className="text-xs font-medium">sarah.j@example.com</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              <span className="material-symbols-outlined text-[14px]">phone</span>
              <span className="text-xs font-medium">+1 (555) 012-3456</span>
            </div>
          </div>
        </div>

        <div className="p-5 mt-auto bg-slate-50">
          <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Quick Resolution</h5>
          <div className="space-y-2">
            <button className="w-full flex items-center justify-center gap-2 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold hover:bg-slate-50 transition-all">
              <span className="material-symbols-outlined text-[18px] text-emerald-500">check_circle</span> Approve Refund
            </button>
            <button className="w-full flex items-center justify-center gap-2 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold hover:bg-slate-50 transition-all">
              <span className="material-symbols-outlined text-[18px] text-blue-500">credit_card</span> Issue Credit
            </button>
            <button className="w-full flex items-center justify-center gap-2 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold hover:bg-slate-50 transition-all">
              <span className="material-symbols-outlined text-[18px] text-red-500">block</span> Deny Request
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
