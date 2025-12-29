export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  initials?: string;
  role: "Customer" | "Technician" | "Admin";
  status: "Active" | "Suspended" | "Pending Review";
  verified: boolean;
  repairs: number;
  lastActive: string;
  joined: string;
  location: string;
  earnings?: string;
  rating?: number;
}

export interface Technician {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  status: "Verified" | "Pending Review" | "Suspended";
  expertise: string[];
  rating: number | null;
  jobs: number;
  location: string;
  verificationMatch?: number;
  submittedDate?: string;
  img?: string;
}

export interface Rider {
  id: string;
  name: string;
  status: "Active" | "Delayed" | "Offline";
  location: string;
  successRate: number;
  img?: string;
  verified: boolean;
  riderImg?: string;
}

export interface DeliveryOrder {
  id: string;
  device: string;
  rider: string;
  status: "In Transit" | "Delivered" | "Delay Reported";
  eta: string;
  riderImg?: string;
}

export interface Ticket {
  id: string;
  title: string;
  desc: string;
  user: string;
  time: string;
  priority: "High Priority" | "Medium" | "Low";
  type: string;
  status: "open" | "resolved" | "pending";
}

export interface Message {
  type: "system" | "internal" | "user" | "admin";
  sender?: string;
  role?: string;
  text: string;
  time?: string;
  attachment?: boolean;
}

export interface Activity {
  id: number;
  type: string;
  title: string;
  desc: string;
  time: string;
  icon: string;
  color: string;
  filled?: boolean;
}

export interface Stat {
  label: string;
  value: string;
  trend: string;
  icon: string;
  iconColor?: string;
  iconBg?: string;
  trendColor?: string;
  color?: string;
  bgClass?: string;
  colorClass?: string;
  isAccent?: boolean;
  isWarning?: boolean;
  alert?: boolean;
}
