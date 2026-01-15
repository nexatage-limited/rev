export default function DeliveryManagement() {
  return (
    <>
      <header className="bg-white border-b border-slate-200 px-8 py-5 flex justify-between items-center shrink-0">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900">Delivery Management</h2>
          <p className="text-slate-500 text-sm mt-1">Oversee logistics, track riders, and manage delivery issues.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm font-semibold">
            <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
              download
            </span>
            Export Report
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-blue-600 text-white rounded-lg shadow-sm shadow-primary/30 transition-all text-sm font-bold">
            <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
              add
            </span>
            Create New Request
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto overflow-x-hidden p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
              <p className="text-slate-500 text-sm font-medium">Active Deliveries</p>
              <span className="material-symbols-outlined text-primary bg-primary/10 p-1 rounded-md" style={{ fontSize: "20px" }}>
                local_shipping
              </span>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900">24</p>
              <div className="flex items-center gap-1 mt-1">
                <span className="material-symbols-outlined text-green-600 text-sm">trending_up</span>
                <p className="text-green-600 text-xs font-bold">+2% vs yesterday</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
              <p className="text-slate-500 text-sm font-medium">Available Riders</p>
              <span className="material-symbols-outlined text-slate-400 bg-slate-100 p-1 rounded-md" style={{ fontSize: "20px" }}>
                sports_motorsports
              </span>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900">8</p>
              <p className="text-slate-400 text-xs font-medium mt-1">Across 3 zones</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
              <p className="text-slate-500 text-sm font-medium">Avg. Delivery Time</p>
              <span className="material-symbols-outlined text-slate-400 bg-slate-100 p-1 rounded-md" style={{ fontSize: "20px" }}>
                schedule
              </span>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900">18m</p>
              <div className="flex items-center gap-1 mt-1">
                <span className="material-symbols-outlined text-green-600 text-sm">trending_down</span>
                <p className="text-green-600 text-xs font-bold">-1m improvement</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-32 ring-1 ring-red-100">
            <div className="flex justify-between items-start">
              <p className="text-slate-500 text-sm font-medium">Issues Flagged</p>
              <span className="material-symbols-outlined text-red-500 bg-red-50 p-1 rounded-md" style={{ fontSize: "20px" }}>
                warning
              </span>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900">2</p>
              <p className="text-red-600 text-xs font-bold mt-1">Requires attention</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-6 h-[500px]">
          <div className="flex-[2] bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col relative group">
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
              <div className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg shadow-sm border border-slate-200">
                <p className="text-xs font-bold text-slate-700">Live Rider Tracking</p>
              </div>
            </div>
            <div className="w-full h-full bg-slate-200 relative">
              <div className="absolute inset-0 bg-slate-500/10 mix-blend-multiply pointer-events-none"></div>
              <div className="absolute top-[30%] left-[40%] flex flex-col items-center group cursor-pointer">
                <div className="bg-primary text-white p-1.5 rounded-full shadow-lg shadow-primary/40 ring-2 ring-white transform transition-transform hover:scale-110">
                  <span className="material-symbols-outlined text-sm block">two_wheeler</span>
                </div>
                <div className="bg-white px-2 py-1 rounded shadow-md mt-1 opacity-0 group-hover:opacity-100 transition-opacity absolute top-8 whitespace-nowrap z-20">
                  <p className="text-xs font-bold text-slate-800">Mike T.</p>
                  <p className="text-[10px] text-slate-500">In Transit</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <label className="flex flex-col w-full">
                <div className="flex w-full items-center rounded-lg bg-slate-100 px-3 py-2.5">
                  <span className="material-symbols-outlined text-slate-400" style={{ fontSize: "20px" }}>
                    search
                  </span>
                  <input
                    className="bg-transparent border-none outline-none text-sm ml-2 w-full text-slate-900 placeholder:text-slate-400 focus:ring-0"
                    placeholder="Search Order ID, Rider, or Region..."
                  />
                </div>
              </label>
              <div className="mt-4">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Filter by Status</p>
                <div className="flex flex-wrap gap-2">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-xs font-medium border border-primary/20">
                    All Status
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium hover:bg-slate-200 border border-transparent">
                    <span className="size-1.5 rounded-full bg-blue-500"></span> In Transit
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium hover:bg-slate-200 border border-transparent">
                    <span className="size-1.5 rounded-full bg-orange-400"></span> Pending
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium hover:bg-slate-200 border border-transparent">
                    <span className="size-1.5 rounded-full bg-red-500"></span> Issues
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Quick Assignments</p>
                <div className="space-y-2">
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="bg-orange-100 text-orange-600 p-1.5 rounded">
                        <span className="material-symbols-outlined text-lg">inventory_2</span>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">Order #1025</p>
                        <p className="text-[10px] text-slate-500">Samsung S21 Battery</p>
                      </div>
                    </div>
                    <button className="text-xs font-semibold text-primary hover:underline">Assign</button>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="bg-orange-100 text-orange-600 p-1.5 rounded">
                        <span className="material-symbols-outlined text-lg">inventory_2</span>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">Order #1028</p>
                        <p className="text-[10px] text-slate-500">iPhone 14 Screen</p>
                      </div>
                    </div>
                    <button className="text-xs font-semibold text-primary hover:underline">Assign</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-900">Recent Delivery Activity</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Last updated: Just now</span>
              <span className="material-symbols-outlined text-slate-400 text-sm animate-spin">refresh</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500">
                <tr>
                  <th className="px-6 py-3">Order ID</th>
                  <th className="px-6 py-3">Device / Issue</th>
                  <th className="px-6 py-3">Rider</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">ETA</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="group hover:bg-slate-50 transition-colors bg-blue-50/50 cursor-pointer">
                  <td className="px-6 py-4 font-medium text-slate-900">#1024</td>
                  <td className="px-6 py-4">iPhone 13 Screen Repair</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded-full bg-slate-200"></div>
                      <span className="font-medium">Mike T.</span>
                      <span className="material-symbols-outlined text-blue-500 text-sm" title="Verified">
                        verified
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                      <span className="size-1.5 rounded-full bg-blue-600 animate-pulse"></span>
                      In Transit
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono">10 mins</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-primary transition-colors">
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
