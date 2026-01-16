import { BankAccount, JobStatus, TechnicianDashboardStats, IncomingJob, CustomerDashboardData } from "@/types";

// Bank Accounts Mock Data
export const mockBankAccounts: BankAccount[] = [
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
];

// Job Status Mock Data
export const mockJobStatus: JobStatus = {
  id: '88392',
  deviceName: 'iPhone 13 Pro (Graphite)',
  issue: 'Cracked Screen Front Glass',
  status: 'in_progress',
  technician: {
    name: 'Sarah Jenkins',
    rating: 4.9,
    phone: '+1234567890',
    estimatedArrival: 'Today, 10:45 AM'
  },
  timeline: [
    { step: 'Request Received', completed: true, timestamp: 'Oct 24, 9:00 AM' },
    { step: 'Technician Assigned', completed: true, timestamp: 'Oct 24, 10:30 AM · Assigned to Sarah J.' },
    { step: 'Delivery Rider Accepted', completed: true, timestamp: 'Oct 24, 10:35 AM · Rider: Michael B.' },
    { step: 'On the way to pick up', completed: false, current: true, timestamp: 'Rider is approximately 5 minutes away.' },
    { step: 'In Repair', completed: false, timestamp: 'Technician will begin repairs upon arrival.' },
    { step: 'Ready for Delivery', completed: false, timestamp: 'Estimated delivery: Oct 26' }
  ]
};

// Technician Dashboard Stats Mock Data
export const mockTechnicianStats: TechnicianDashboardStats[] = [
  { label: "Acceptance Rate", value: "92%", trend: "+2%", icon: "trending_up" },
  { label: "Jobs Completed Today", value: "4", icon: "handyman" },
  { label: "Avg Rating", value: "4.9", icon: "star" },
  { label: "Est. Earnings Today", value: "₦320", icon: "attach_money" }
];

// Incoming Jobs Mock Data
export const mockIncomingJobs: IncomingJob[] = [
  {
    device: "iPhone 13 Pro",
    issue: "Screen Replacement",
    location: "2.4 miles • Downtown Area",
    priority: "High Priority",
    aiInsight: "User reports ghost touch issues. Digitizer damage likely. Estimated repair time: 45m."
  },
  {
    device: "Samsung S21",
    issue: "Battery Replacement",
    location: "5.1 miles • North Hills",
    priority: null
  },
  {
    device: "Pixel 6",
    issue: "Charging Port",
    location: "1.2 miles • Westside",
    priority: null
  }
];

// Customer Dashboard Mock Data
export const mockCustomerDashboard: CustomerDashboardData = {
  user: {
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '+1 (555) 123-4567',
    memberSince: 'March 2024'
  },
  ongoingRepairs: [
    {
      id: 'REV-2024-001',
      device: 'iPhone 14 Pro',
      issue: 'Screen Replacement',
      technician: 'Alex Martinez',
      status: 'In Progress',
      estimatedCompletion: '2 hours',
      progress: 65
    }
  ],
  recentRepairs: [
    {
      id: 'REV-2024-002',
      device: 'iPad Air',
      issue: 'Battery Replacement',
      technician: 'Sarah Jenkins',
      completedDate: '2024-01-15',
      rating: 5,
      cost: '₦89'
    },
    {
      id: 'REV-2024-003',
      device: 'iPhone 13',
      issue: 'Water Damage Repair',
      technician: 'Mike Chen',
      completedDate: '2024-01-08',
      rating: 4,
      cost: '₦156'
    }
  ],
  notifications: [
    {
      id: 1,
      type: 'repair_update',
      title: 'Repair Update',
      message: 'Your iPhone 14 Pro screen replacement is 65% complete',
      time: '5 min ago',
      unread: true
    },
    {
      id: 2,
      type: 'technician_assigned',
      title: 'Technician Assigned',
      message: 'Alex Martinez has been assigned to your repair',
      time: '2 hours ago',
      unread: true
    },
    {
      id: 3,
      type: 'repair_completed',
      title: 'Repair Completed',
      message: 'Your iPad Air battery replacement is ready for pickup',
      time: '1 day ago',
      unread: false
    }
  ]
};
