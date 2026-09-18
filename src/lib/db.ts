import { BRAND_CONFIG, Product, StoreLocation } from '@/config/brand';

export interface StaffMember {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  role: "Super Admin" | "Admin" | "Store Manager" | "Sales Staff" | "Inventory Manager" | "CRM Staff";
  storeId: string; // "all" or specific store ID
  status: "Active" | "Inactive";
  joinedDate: string;
}

export interface CustomerProfile {
  id: string;
  customerId: string;
  fullName: string;
  phone: string;
  whatsapp: string;
  email: string;
  dateOfBirth?: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
  status: "New" | "Active" | "Returning" | "VIP" | "Inactive" | "Lead" | "Converted";
  preferredStoreId: string;
  createdDate: string;
  lastInteractionDate: string;
  totalSpending: number;
  totalOrders: number;
  totalEnquiries: number;
}

export interface LeadRecord {
  id: string;
  leadId: string;
  name: string;
  phone: string;
  whatsapp: string;
  email?: string;
  source: "Website" | "WhatsApp" | "Instagram" | "Facebook" | "Google" | "Store" | "Referral" | "Walk-in" | "Campaign";
  interestedCategory?: string;
  interestedProductId?: string;
  preferredStoreId: string;
  assignedStaffId: string;
  stage: "New Lead" | "Contacted" | "Interested" | "Product Discussion" | "Store Visit" | "Enquiry" | "Converted" | "Lost";
  priority: "High" | "Medium" | "Low";
  notes: string;
  createdDate: string;
  lastInteractionDate: string;
  nextFollowUpDate?: string;
}

export interface EnquiryRecord {
  id: string;
  enquiryId: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  productId: string;
  productName: string;
  productSku: string;
  finish: string;
  quantity: number;
  price: number;
  totalValue: number;
  storeId: string;
  assignedStaffId: string;
  source: "Website" | "WhatsApp" | "Store Walk-in" | "Phone";
  status: "New" | "Contacted" | "Waiting for Customer" | "Product Available" | "Store Visit Planned" | "Converted" | "Lost" | "Closed";
  notes?: string;
  createdDate: string;
  updatedDate: string;
  followUpDate?: string;
}

export interface StoreInventoryRecord {
  productId: string;
  storeId: string;
  quantity: number;
  minThreshold: number;
  lastRestockedDate: string;
}

export interface StockTransferRecord {
  id: string;
  transferId: string;
  productId: string;
  productName: string;
  productSku: string;
  fromStoreId: string;
  toStoreId: string;
  quantity: number;
  reason: string;
  status: "Requested" | "Approved" | "Dispatched" | "Received" | "Completed" | "Cancelled";
  requestedByStaffId: string;
  approvedByStaffId?: string;
  createdDate: string;
  updatedDate: string;
}

export interface InventoryHistoryLog {
  id: string;
  timestamp: string;
  productId: string;
  productSku: string;
  storeId: string;
  changeQuantity: number;
  previousQuantity: number;
  newQuantity: number;
  reason: "Initial Stock" | "Sale" | "Return" | "Stock Adjustment" | "Transfer In" | "Transfer Out";
  staffId: string;
  staffName: string;
}

export interface SaleRecord {
  id: string;
  saleId: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  enquiryId?: string;
  storeId: string;
  staffId: string;
  channel: "Physical Store" | "WhatsApp" | "Phone" | "Website";
  items: {
    productId: string;
    productName: string;
    productSku: string;
    finish: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
  }[];
  subtotal: number;
  discount: number;
  totalAmount: number;
  paymentStatus: "Completed" | "Pending" | "Refunded";
  paymentMethod: "UPI" | "Card" | "Cash" | "NetBanking";
  status: "Draft" | "Confirmed" | "Completed" | "Cancelled" | "Returned";
  createdDate: string;
}

export interface ReturnRecord {
  id: string;
  returnId: string;
  saleId: string;
  customerId: string;
  customerName: string;
  productId: string;
  productSku: string;
  quantity: number;
  storeId: string;
  reason: string;
  refundAmount: number;
  status: "Pending" | "Approved" | "Restocked" | "Rejected";
  staffId: string;
  createdDate: string;
}

export interface TaskRecord {
  id: string;
  title: string;
  customerId?: string;
  customerName?: string;
  assignedStaffId: string;
  assignedStaffName: string;
  type: "Call" | "WhatsApp" | "Store Visit" | "Product Follow-up" | "Payment Follow-up";
  priority: "High" | "Medium" | "Low";
  status: "Pending" | "Completed" | "Cancelled" | "Rescheduled";
  dueDate: string;
  dueTime: string;
  notes: string;
  createdDate: string;
}

export interface CustomerInteraction {
  id: string;
  customerId: string;
  type: "WhatsApp Conversation" | "Phone Call" | "Store Visit" | "Email" | "Manual Note" | "System Update";
  summary: string;
  staffName: string;
  timestamp: string;
}

export interface AuditLogRecord {
  id: string;
  timestamp: string;
  staffId: string;
  staffName: string;
  role: string;
  action: string;
  entity: "Customer" | "Lead" | "Enquiry" | "Product" | "Inventory" | "Transfer" | "Sale" | "Return" | "Staff" | "Settings";
  entityId: string;
  details: string;
}

// INITIAL DEMO DATA SEEDS FOR REALISTIC APPLICATION
export const INITIAL_STAFF: StaffMember[] = [
  {
    id: "staff-super-admin",
    employeeId: "EMP-001",
    name: "Vikramaditya Roy",
    email: "vikram@enteya.in",
    phone: "+91 98200 11111",
    role: "Super Admin",
    storeId: "all",
    status: "Active",
    joinedDate: "2024-01-15"
  },
  {
    id: "staff-store-mgr-mumbai",
    employeeId: "EMP-002",
    name: "Ananya Mehta",
    email: "ananya.mumbai@enteya.in",
    phone: "+91 98201 22222",
    role: "Store Manager",
    storeId: "store-mumbai-bandra",
    status: "Active",
    joinedDate: "2024-03-01"
  },
  {
    id: "staff-sales-mumbai",
    employeeId: "EMP-003",
    name: "Rohan Verma",
    email: "rohan.sales@enteya.in",
    phone: "+91 98201 33333",
    role: "Sales Staff",
    storeId: "store-mumbai-bandra",
    status: "Active",
    joinedDate: "2024-05-10"
  },
  {
    id: "staff-store-mgr-delhi",
    employeeId: "EMP-004",
    name: "Pooja Kapoor",
    email: "pooja.delhi@enteya.in",
    phone: "+91 98110 44444",
    role: "Store Manager",
    storeId: "store-delhi-south-ext",
    status: "Active",
    joinedDate: "2024-02-20"
  },
  {
    id: "staff-inv-mgr",
    employeeId: "EMP-005",
    name: "Rajesh Iyer",
    email: "rajesh.inventory@enteya.in",
    phone: "+91 98450 55555",
    role: "Inventory Manager",
    storeId: "all",
    status: "Active",
    joinedDate: "2024-01-20"
  }
];

export const INITIAL_CUSTOMERS: CustomerProfile[] = [
  {
    id: "cust-001",
    customerId: "ENT-CUST-1001",
    fullName: "Priya Sharma",
    phone: "+91 98765 43210",
    whatsapp: "+91 98765 43210",
    email: "priya.sharma@gmail.com",
    address: "402 Palm Beach Towers, Bandra West",
    city: "Mumbai",
    state: "Maharashtra",
    pinCode: "400050",
    status: "VIP",
    preferredStoreId: "store-mumbai-bandra",
    createdDate: "2026-08-10",
    lastInteractionDate: "2026-09-15",
    totalSpending: 6497,
    totalOrders: 4,
    totalEnquiries: 6
  },
  {
    id: "cust-002",
    customerId: "ENT-CUST-1002",
    fullName: "Meera Nair",
    phone: "+91 98112 34567",
    whatsapp: "+91 98112 34567",
    email: "meera.nair@yahoo.com",
    address: "B-12 Vasant Kunj",
    city: "New Delhi",
    state: "Delhi",
    pinCode: "110070",
    status: "Active",
    preferredStoreId: "store-delhi-south-ext",
    createdDate: "2026-08-22",
    lastInteractionDate: "2026-09-14",
    totalSpending: 3298,
    totalOrders: 2,
    totalEnquiries: 3
  },
  {
    id: "cust-003",
    customerId: "ENT-CUST-1003",
    fullName: "Deepika Reddy",
    phone: "+91 98491 87654",
    whatsapp: "+91 98491 87654",
    email: "deepika.r@outlook.com",
    address: "Plot 88 Jubilee Hills",
    city: "Hyderabad",
    state: "Telangana",
    pinCode: "500033",
    status: "Lead",
    preferredStoreId: "store-hyderabad-jubilee",
    createdDate: "2026-09-01",
    lastInteractionDate: "2026-09-12",
    totalSpending: 0,
    totalOrders: 0,
    totalEnquiries: 2
  },
  {
    id: "cust-004",
    customerId: "ENT-CUST-1004",
    fullName: "Kavita Menon",
    phone: "+91 98452 99887",
    whatsapp: "+91 98452 99887",
    email: "kavita.m@gmail.com",
    address: "7th Main Indiranagar",
    city: "Bengaluru",
    state: "Karnataka",
    pinCode: "560038",
    status: "Returning",
    preferredStoreId: "store-bengaluru-indiranagar",
    createdDate: "2026-07-15",
    lastInteractionDate: "2026-09-10",
    totalSpending: 4797,
    totalOrders: 3,
    totalEnquiries: 5
  }
];

export const INITIAL_LEADS: LeadRecord[] = [
  {
    id: "lead-001",
    leadId: "ENT-LEAD-501",
    name: "Sneha Mukherji",
    phone: "+91 98301 99999",
    whatsapp: "+91 98301 99999",
    email: "sneha.m@gmail.com",
    source: "Instagram",
    interestedCategory: "Necklaces",
    interestedProductId: "classic-antique-gold-necklace",
    preferredStoreId: "store-kolkata-parkstreet",
    assignedStaffId: "staff-super-admin",
    stage: "Interested",
    priority: "High",
    notes: "Asked about Antique Choker weight & availability for upcoming wedding.",
    createdDate: "2026-09-14",
    lastInteractionDate: "2026-09-15",
    nextFollowUpDate: "2026-09-17"
  },
  {
    id: "lead-002",
    leadId: "ENT-LEAD-502",
    name: "Anu Agarwal",
    phone: "+91 98251 88888",
    whatsapp: "+91 98251 88888",
    source: "WhatsApp",
    interestedCategory: "Bangles",
    interestedProductId: "royal-rolled-gold-bangles-set",
    preferredStoreId: "store-ahmedabad-cgroad",
    assignedStaffId: "staff-store-mgr-mumbai",
    stage: "Store Visit",
    priority: "High",
    notes: "Planning to visit C.G. Road store on Saturday to try size 2.6.",
    createdDate: "2026-09-12",
    lastInteractionDate: "2026-09-16",
    nextFollowUpDate: "2026-09-18"
  }
];

export const INITIAL_ENQUIRIES: EnquiryRecord[] = [
  {
    id: "enq-001",
    enquiryId: "ENT-ENQ-2001",
    customerId: "cust-001",
    customerName: "Priya Sharma",
    customerPhone: "+91 98765 43210",
    productId: "classic-antique-gold-necklace",
    productName: "Classic Antique Gold Choker Necklace",
    productSku: "ENT-NK-001",
    finish: "Antique Gold",
    quantity: 1,
    price: 1799,
    totalValue: 1799,
    storeId: "store-mumbai-bandra",
    assignedStaffId: "staff-sales-mumbai",
    source: "WhatsApp",
    status: "Product Available",
    notes: "Customer wants piece delivered to Turner Road boutique for pickup.",
    createdDate: "2026-09-15",
    updatedDate: "2026-09-16",
    followUpDate: "2026-09-17"
  },
  {
    id: "enq-002",
    enquiryId: "ENT-ENQ-2002",
    customerId: "cust-002",
    customerName: "Meera Nair",
    customerPhone: "+91 98112 34567",
    productId: "royal-rolled-gold-bangles-set",
    productName: "Royal Rolled-Gold Bangles Set of 4",
    productSku: "ENT-BG-002",
    finish: "Rolled Gold",
    quantity: 2,
    price: 1499,
    totalValue: 2998,
    storeId: "store-delhi-south-ext",
    assignedStaffId: "staff-store-mgr-delhi",
    source: "Website",
    status: "Contacted",
    notes: "Confirmed size 2.6 availability in South Ext. store.",
    createdDate: "2026-09-16",
    updatedDate: "2026-09-16",
    followUpDate: "2026-09-17"
  }
];

export const INITIAL_SALES: SaleRecord[] = [
  {
    id: "sale-001",
    saleId: "ENT-ORD-8001",
    customerId: "cust-001",
    customerName: "Priya Sharma",
    customerPhone: "+91 98765 43210",
    enquiryId: "enq-001",
    storeId: "store-mumbai-bandra",
    staffId: "staff-sales-mumbai",
    channel: "Physical Store",
    items: [
      {
        productId: "classic-antique-gold-necklace",
        productName: "Classic Antique Gold Choker Necklace",
        productSku: "ENT-NK-001",
        finish: "Antique Gold",
        quantity: 1,
        unitPrice: 1799,
        subtotal: 1799
      },
      {
        productId: "aarna-sunburst-cocktail-ring",
        productName: "Aarna Sunburst Antique Cocktail Ring",
        productSku: "ENT-RG-005",
        finish: "Antique Gold",
        quantity: 1,
        unitPrice: 799,
        subtotal: 799
      }
    ],
    subtotal: 2598,
    discount: 100,
    totalAmount: 2498,
    paymentStatus: "Completed",
    paymentMethod: "UPI",
    status: "Completed",
    createdDate: "2026-09-14"
  }
];

export const INITIAL_TRANSFERS: StockTransferRecord[] = [
  {
    id: "tr-001",
    transferId: "ENT-TRF-901",
    productId: "classic-antique-gold-necklace",
    productName: "Classic Antique Gold Choker Necklace",
    productSku: "ENT-NK-001",
    fromStoreId: "store-mumbai-bandra",
    toStoreId: "store-delhi-south-ext",
    quantity: 3,
    reason: "Demand surge at Delhi South Extension boutique",
    status: "Dispatched",
    requestedByStaffId: "staff-store-mgr-delhi",
    approvedByStaffId: "staff-inv-mgr",
    createdDate: "2026-09-15",
    updatedDate: "2026-09-16"
  }
];

export const INITIAL_TASKS: TaskRecord[] = [
  {
    id: "task-001",
    title: "Call Priya Sharma regarding choker pickup at Bandra store",
    customerId: "cust-001",
    customerName: "Priya Sharma",
    assignedStaffId: "staff-sales-mumbai",
    assignedStaffName: "Rohan Verma",
    type: "Call",
    priority: "High",
    status: "Pending",
    dueDate: "2026-09-17",
    dueTime: "11:30 AM",
    notes: "Confirm timing before she arrives.",
    createdDate: "2026-09-16"
  },
  {
    id: "task-002",
    title: "WhatsApp Sneha Mukherji with Jhumka weight details",
    customerId: "cust-003",
    customerName: "Sneha Mukherji",
    assignedStaffId: "staff-super-admin",
    assignedStaffName: "Vikramaditya Roy",
    type: "WhatsApp",
    priority: "Medium",
    status: "Pending",
    dueDate: "2026-09-17",
    dueTime: "02:00 PM",
    notes: "Send photos from Kolkata lounge inventory.",
    createdDate: "2026-09-16"
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogRecord[] = [
  {
    id: "log-001",
    timestamp: "2026-09-16 10:15 AM",
    staffId: "staff-super-admin",
    staffName: "Vikramaditya Roy",
    role: "Super Admin",
    action: "System Initialization",
    entity: "Settings",
    entityId: "SYS-001",
    details: "ENTEYA CRM & Multi-Store Inventory OS initialized across 12 boutiques."
  },
  {
    id: "log-002",
    timestamp: "2026-09-16 11:30 AM",
    staffId: "staff-inv-mgr",
    staffName: "Rajesh Iyer",
    role: "Inventory Manager",
    action: "Transfer Approved",
    entity: "Transfer",
    entityId: "ENT-TRF-901",
    details: "Approved transfer of 3 units of ENT-NK-001 from Bandra to South Extension."
  }
];

// GENERATE INITIAL STORE INVENTORY MATRIX (12 Stores x 12 Products)
export function generateInitialStoreInventory(): StoreInventoryRecord[] {
  const storeInventory: StoreInventoryRecord[] = [];
  
  BRAND_CONFIG.products.forEach((product, pIdx) => {
    BRAND_CONFIG.stores.forEach((store, sIdx) => {
      // Deterministic initial stock calculation
      const seedQty = Math.max(0, ((pIdx * 7 + sIdx * 3 + 4) % 12));
      storeInventory.push({
        productId: product.id,
        storeId: store.id,
        quantity: seedQty,
        minThreshold: 2,
        lastRestockedDate: "2026-09-01"
      });
    });
  });

  return storeInventory;
}
