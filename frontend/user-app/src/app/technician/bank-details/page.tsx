"use client";

import { useState } from "react";
import { BankAccount } from "@/types";

export default function TechnicianBankDetails() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [accounts, setAccounts] = useState<BankAccount[]>([
    {
      id: "acc-1",
      bankName: "Chase Bank",
      accountType: "checking",
      accountNumber: "****1234",
      routingNumber: "021000021",
      accountHolderName: "Alex Martinez",
      isPrimary: true,
      status: "verified",
      addedDate: "2023-03-15"
    },
    {
      id: "acc-2", 
      bankName: "Bank of America",
      accountType: "savings",
      accountNumber: "****5678",
      routingNumber: "026009593",
      accountHolderName: "Alex Martinez",
      isPrimary: false,
      status: "pending",
      addedDate: "2023-11-20"
    }
  ]);

  const [formData, setFormData] = useState({
    bankName: "",
    accountType: "checking" as "checking" | "savings",
    accountNumber: "",
    routingNumber: "",
    accountHolderName: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAccount: BankAccount = {
      id: `acc-${Date.now()}`,
      ...formData,
      accountNumber: `****${formData.accountNumber.slice(-4)}`,
      isPrimary: accounts.length === 0,
      status: "pending",
      addedDate: new Date().toISOString().split('T')[0]
    };
    setAccounts([...accounts, newAccount]);
    setFormData({
      bankName: "",
      accountType: "checking",
      accountNumber: "",
      routingNumber: "",
      accountHolderName: ""
    });
    setShowAddForm(false);
  };

  const setPrimaryAccount = (accountId: string) => {
    setAccounts(accounts.map(acc => ({
      ...acc,
      isPrimary: acc.id === accountId
    })));
  };

  const deleteAccount = (accountId: string) => {
    setAccounts(accounts.filter(acc => acc.id !== accountId));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified": return "text-green-700 bg-green-100 border-green-200";
      case "pending": return "text-yellow-700 bg-yellow-100 border-yellow-200";
      case "failed": return "text-red-700 bg-red-100 border-red-200";
      default: return "text-gray-700 bg-gray-100 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified": return "verified";
      case "pending": return "schedule";
      case "failed": return "error";
      default: return "help";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Bank Account Details</h1>
            <p className="text-gray-600">Manage your payment methods for receiving earnings</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-primary text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2"
          >
            <span className="material-symbols-outlined">add</span>
            Add Account
          </button>
        </div>
      </header>

      <main className="p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Available Balance</span>
                <span className="material-symbols-outlined text-green-500">account_balance_wallet</span>
              </div>
              <p className="text-3xl font-bold text-green-600">$1,840</p>
              <p className="text-sm text-gray-500">Ready to withdraw</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Pending Earnings</span>
                <span className="material-symbols-outlined text-yellow-500">schedule</span>
              </div>
              <p className="text-3xl font-bold text-yellow-600">$320</p>
              <p className="text-sm text-gray-500">Processing</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Next Payout</span>
                <span className="material-symbols-outlined text-primary">event</span>
              </div>
              <p className="text-3xl font-bold">Friday</p>
              <p className="text-sm text-gray-500">Weekly schedule</p>
            </div>
          </div>

          {showAddForm && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Add Bank Account</h2>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Bank Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.bankName}
                      onChange={(e) => setFormData({...formData, bankName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                      placeholder="e.g., Chase Bank"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Account Type *</label>
                    <select
                      value={formData.accountType}
                      onChange={(e) => setFormData({...formData, accountType: e.target.value as "checking" | "savings"})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                    >
                      <option value="checking">Checking</option>
                      <option value="savings">Savings</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Account Holder Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.accountHolderName}
                      onChange={(e) => setFormData({...formData, accountHolderName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                      placeholder="Full name on account"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Routing Number *</label>
                    <input
                      type="text"
                      required
                      value={formData.routingNumber}
                      onChange={(e) => setFormData({...formData, routingNumber: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                      placeholder="9-digit routing number"
                      maxLength={9}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Account Number *</label>
                    <input
                      type="text"
                      required
                      value={formData.accountNumber}
                      onChange={(e) => setFormData({...formData, accountNumber: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                      placeholder="Account number"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90"
                  >
                    Add Account
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b">
              <h2 className="text-xl font-bold">Your Bank Accounts</h2>
            </div>

            {accounts.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <span className="material-symbols-outlined text-4xl mb-2 block">account_balance</span>
                <p>No bank accounts added yet</p>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="mt-4 text-primary hover:underline"
                >
                  Add your first account
                </button>
              </div>
            ) : (
              <div className="divide-y">
                {accounts.map((account) => (
                  <div key={account.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="material-symbols-outlined text-blue-600">account_balance</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-bold text-lg">{account.bankName}</h3>
                            {account.isPrimary && (
                              <span className="bg-primary text-white text-xs px-2 py-1 rounded-full font-bold">
                                Primary
                              </span>
                            )}
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(account.status)}`}>
                              <span className="material-symbols-outlined text-xs">{getStatusIcon(account.status)}</span>
                              {account.status.charAt(0).toUpperCase() + account.status.slice(1)}
                            </span>
                          </div>
                          <div className="space-y-1 text-sm text-gray-600">
                            <p>{account.accountHolderName}</p>
                            <p>{account.accountType.charAt(0).toUpperCase() + account.accountType.slice(1)} • {account.accountNumber}</p>
                            <p>Routing: {account.routingNumber}</p>
                            <p className="text-xs text-gray-500">Added {new Date(account.addedDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {!account.isPrimary && (
                          <button
                            onClick={() => setPrimaryAccount(account.id)}
                            className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
                          >
                            Set Primary
                          </button>
                        )}
                        <button
                          onClick={() => deleteAccount(account.id)}
                          className="p-2 text-gray-400 hover:text-red-600 rounded"
                        >
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-blue-600">info</span>
              <div>
                <h4 className="font-medium text-blue-900 mb-1">Payment Information</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Payments are processed weekly on Fridays</li>
                  <li>• Bank verification typically takes 1-2 business days</li>
                  <li>• Your primary account will be used for all payouts</li>
                  <li>• All banking information is encrypted and secure</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}