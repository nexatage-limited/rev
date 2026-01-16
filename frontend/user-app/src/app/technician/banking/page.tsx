"use client";

import { useState } from "react";

export default function TechnicianBanking() {
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  const earnings = {
    today: "₦320",
    week: "₦1,840", 
    month: "₦7,650",
    total: "₦24,890"
  };

  const recentTransactions = [
    {
      id: "TXN-001",
      type: "Job Payment",
      description: "iPhone 13 Screen Repair - Sarah J.",
      amount: "+₦85",
      date: "Today, 3:45 PM",
      status: "completed"
    },
    {
      id: "TXN-002", 
      type: "Job Payment",
      description: "Samsung S21 Battery - Michael B.",
      amount: "+₦65",
      date: "Today, 1:20 PM", 
      status: "completed"
    },
    {
      id: "TXN-003",
      type: "Weekly Payout",
      description: "Bank Transfer to ****1234",
      amount: "-₦1,520",
      date: "Yesterday, 9:00 AM",
      status: "processing"
    },
    {
      id: "TXN-004",
      type: "Job Payment", 
      description: "iPad Air Charging Port - Elena L.",
      amount: "+₦75",
      date: "2 days ago",
      status: "completed"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Banking & Earnings</h1>
          <button className="bg-primary text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2">
            <span className="material-symbols-outlined">account_balance</span>
            Withdraw Earnings
          </button>
        </div>
      </header>

      <main className="p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-l-green-500">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Today&apos;s Earnings</span>
                <span className="material-symbols-outlined text-green-500">trending_up</span>
              </div>
              <p className="text-3xl font-bold text-green-600">{earnings.today}</p>
              <p className="text-sm text-gray-500">4 jobs completed</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">This Week</span>
                <span className="material-symbols-outlined text-primary">calendar_today</span>
              </div>
              <p className="text-3xl font-bold">{earnings.week}</p>
              <p className="text-sm text-green-600">+12% from last week</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">This Month</span>
                <span className="material-symbols-outlined text-primary">date_range</span>
              </div>
              <p className="text-3xl font-bold">{earnings.month}</p>
              <p className="text-sm text-green-600">+8% from last month</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Total Earned</span>
                <span className="material-symbols-outlined text-primary">account_balance_wallet</span>
              </div>
              <p className="text-3xl font-bold">{earnings.total}</p>
              <p className="text-sm text-gray-500">Since March 2023</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Earnings Overview</h2>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  {["week", "month", "year"].map((period) => (
                    <button
                      key={period}
                      onClick={() => setSelectedPeriod(period)}
                      className={`px-3 py-1 rounded text-sm font-medium capitalize ${
                        selectedPeriod === period
                          ? "bg-white text-primary shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-64 flex items-end justify-between gap-2 mb-4">
                {[65, 85, 45, 95, 75, 120, 90].map((height, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-primary/20 rounded-t hover:bg-primary/30 transition-colors cursor-pointer"
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-xs text-gray-500 mt-2">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Weekly earnings trend</span>
                <span className="text-green-600 font-medium">↗ +12% vs last week</span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6">Payment Method</h2>
              
              <div className="border rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                      <span className="material-symbols-outlined text-blue-600 text-sm">account_balance</span>
                    </div>
                    <div>
                      <p className="font-medium">Chase Bank</p>
                      <p className="text-sm text-gray-500">****1234</p>
                    </div>
                  </div>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                    Primary
                  </span>
                </div>
              </div>

              <button className="w-full border border-gray-300 rounded-lg py-2 text-sm font-medium hover:bg-gray-50 mb-4">
                + Add Payment Method
              </button>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Available Balance</span>
                  <span className="font-bold text-green-600">₦1,840</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Pending Payout</span>
                  <span className="font-medium">₦320</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Next Payout</span>
                  <span className="font-medium">Friday</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b">
              <h2 className="text-xl font-bold">Recent Transactions</h2>
            </div>
            <div className="divide-y">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === "Job Payment" 
                          ? "bg-green-100 text-green-600"
                          : "bg-blue-100 text-blue-600"
                      }`}>
                        <span className="material-symbols-outlined text-sm">
                          {transaction.type === "Job Payment" ? "work" : "account_balance"}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{transaction.type}</p>
                        <p className="text-sm text-gray-600">{transaction.description}</p>
                        <p className="text-xs text-gray-500">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${
                        transaction.amount.startsWith("+") ? "text-green-600" : "text-gray-900"
                      }`}>
                        {transaction.amount}
                      </p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        transaction.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}