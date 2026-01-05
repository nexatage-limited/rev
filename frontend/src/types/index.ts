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

export interface TechnicianProfile {
  id: string;
  name: string;
  level: string;
  rating: number;
  totalJobs: number;
  specialties: string[];
  location: string;
  responseTime: string;
  completionRate: string;
  joinDate: string;
  avatar?: string;
  bio?: string;
  certifications?: string[];
  availability: {
    status: "available" | "busy" | "offline";
    nextAvailable?: string;
  };
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
  id: string;
  sender: "customer" | "technician" | "system";
  content: string;
  timestamp: string;
  type?: "text" | "image" | "location";
}

export interface ChatMessage {
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

export interface BankAccount {
  id: string;
  bankName: string;
  accountType: "checking" | "savings";
  accountNumber: string;
  routingNumber: string;
  accountHolderName: string;
  isPrimary: boolean;
  status: "verified" | "pending" | "failed";
  addedDate: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  status: "verified" | "pending" | "expired" | "rejected";
  fileUrl?: string;
}

export interface TechnicianProfileDetailsProps {
  technician?: TechnicianProfile;
  onContact?: () => void;
  onBook?: () => void;
}

export interface MessagingProps {
  jobId?: string;
  customerName?: string;
  onClose?: () => void;
}

export interface CertificationUploadProps {
  onUpload?: (files: FileList) => void;
  onDelete?: (certId: string) => void;
  existingCertifications?: Certification[];
}
