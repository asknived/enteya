'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { BRAND_CONFIG, Product, StoreLocation } from '@/config/brand';
import {
  StaffMember,
  CustomerProfile,
  LeadRecord,
  EnquiryRecord,
  StoreInventoryRecord,
  StockTransferRecord,
  InventoryHistoryLog,
  SaleRecord,
  ReturnRecord,
  TaskRecord,
  CustomerInteraction,
  AuditLogRecord,
  INITIAL_STAFF,
  INITIAL_CUSTOMERS,
  INITIAL_LEADS,
  INITIAL_ENQUIRIES,
  INITIAL_SALES,
  INITIAL_TRANSFERS,
  INITIAL_TASKS,
  INITIAL_AUDIT_LOGS,
  generateInitialStoreInventory
} from '@/lib/db';

interface CrmContextType {
  // Current Active Role & Store Scope
  currentStaff: StaffMember;
  setCurrentStaff: (staff: StaffMember) => void;
  selectedStoreScope: string; // "all" or store ID
  setSelectedStoreScope: (storeId: string) => void;

  // Data Collections
  stores: StoreLocation[];
  staffList: StaffMember[];
  customers: CustomerProfile[];
  leads: LeadRecord[];
  enquiries: EnquiryRecord[];
  products: Product[];
  storeInventory: StoreInventoryRecord[];
  transfers: StockTransferRecord[];
  sales: SaleRecord[];
  tasks: TaskRecord[];
  interactions: CustomerInteraction[];
  auditLogs: AuditLogRecord[];

  // Actions - Customers
  addCustomer: (cust: Omit<CustomerProfile, 'id' | 'customerId' | 'createdDate' | 'lastInteractionDate' | 'totalSpending' | 'totalOrders' | 'totalEnquiries'>) => CustomerProfile;
  updateCustomer: (id: string, data: Partial<CustomerProfile>) => void;

  // Actions - Leads
  addLead: (lead: Omit<LeadRecord, 'id' | 'leadId' | 'createdDate'>) => LeadRecord;
  updateLeadStage: (id: string, stage: LeadRecord['stage']) => void;

  // Actions - Enquiries
  addEnquiry: (enq: Omit<EnquiryRecord, 'id' | 'enquiryId' | 'createdDate' | 'updatedDate'>) => EnquiryRecord;
  updateEnquiryStatus: (id: string, status: EnquiryRecord['status']) => void;
  convertEnquiryToSale: (enquiryId: string, storeId: string, paymentMethod: SaleRecord['paymentMethod'], discount?: number) => SaleRecord;

  // Actions - Inventory & Transfers
  adjustStoreStock: (productId: string, storeId: string, newQty: number, reason: string) => void;
  createStockTransfer: (productId: string, fromStoreId: string, toStoreId: string, qty: number, reason: string) => StockTransferRecord;
  updateTransferStatus: (transferId: string, status: StockTransferRecord['status']) => void;

  // Actions - Sales & Returns
  recordSale: (sale: Omit<SaleRecord, 'id' | 'saleId' | 'createdDate'>) => SaleRecord;
  processReturn: (saleId: string, productId: string, qty: number, reason: string, refundAmount: number) => void;

  // Actions - Tasks & Interactions
  addTask: (task: Omit<TaskRecord, 'id' | 'createdDate'>) => TaskRecord;
  toggleTaskStatus: (taskId: string, status: TaskRecord['status']) => void;
  addInteraction: (customerId: string, type: CustomerInteraction['type'], summary: string) => void;

  // Utilities
  logAudit: (action: string, entity: AuditLogRecord['entity'], entityId: string, details: string) => void;
  exportCsv: (collectionName: "customers" | "enquiries" | "sales" | "inventory" | "products") => void;
  globalSearch: (query: string) => {
    customers: CustomerProfile[];
    products: Product[];
    enquiries: EnquiryRecord[];
    sales: SaleRecord[];
    stores: StoreLocation[];
  };
}

const CrmContext = createContext<CrmContextType | undefined>(undefined);

export const CrmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State Initialization
  const [staffList, setStaffList] = useState<StaffMember[]>(INITIAL_STAFF);
  const [currentStaff, setCurrentStaff] = useState<StaffMember>(INITIAL_STAFF[0]); // Default Super Admin
  const [selectedStoreScope, setSelectedStoreScope] = useState<string>("all");

  const [stores] = useState<StoreLocation[]>(BRAND_CONFIG.stores);
  const [products, setProducts] = useState<Product[]>(BRAND_CONFIG.products);
  const [customers, setCustomers] = useState<CustomerProfile[]>(INITIAL_CUSTOMERS);
  const [leads, setLeads] = useState<LeadRecord[]>(INITIAL_LEADS);
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>(INITIAL_ENQUIRIES);
  const [sales, setSales] = useState<SaleRecord[]>(INITIAL_SALES);
  const [transfers, setTransfers] = useState<StockTransferRecord[]>(INITIAL_TRANSFERS);
  const [tasks, setTasks] = useState<TaskRecord[]>(INITIAL_TASKS);
  const [auditLogs, setAuditLogs] = useState<AuditLogRecord[]>(INITIAL_AUDIT_LOGS);
  const [storeInventory, setStoreInventory] = useState<StoreInventoryRecord[]>(generateInitialStoreInventory());

  const [interactions, setInteractions] = useState<CustomerInteraction[]>([
    {
      id: "int-001",
      customerId: "cust-001",
      type: "WhatsApp Conversation",
      summary: "Enquired about Classic Antique Gold Choker availability.",
      staffName: "Rohan Verma",
      timestamp: "2026-09-15 03:30 PM"
    },
    {
      id: "int-002",
      customerId: "cust-001",
      type: "Store Visit",
      summary: "Visited Turner Road Boutique, tried size & completed UPI purchase.",
      staffName: "Ananya Mehta",
      timestamp: "2026-09-14 05:15 PM"
    }
  ]);

  // Log Audit Action Helper
  const logAudit = (action: string, entity: AuditLogRecord['entity'], entityId: string, details: string) => {
    const newLog: AuditLogRecord = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' }),
      staffId: currentStaff.id,
      staffName: currentStaff.name,
      role: currentStaff.role,
      action,
      entity,
      entityId,
      details
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // ADD CUSTOMER
  const addCustomer = (data: Omit<CustomerProfile, 'id' | 'customerId' | 'createdDate' | 'lastInteractionDate' | 'totalSpending' | 'totalOrders' | 'totalEnquiries'>): CustomerProfile => {
    const today = new Date().toISOString().split('T')[0];
    const newCust: CustomerProfile = {
      ...data,
      id: `cust-${Date.now()}`,
      customerId: `ENT-CUST-${Math.floor(1000 + Math.random() * 9000)}`,
      createdDate: today,
      lastInteractionDate: today,
      totalSpending: 0,
      totalOrders: 0,
      totalEnquiries: 0
    };
    setCustomers(prev => [newCust, ...prev]);
    logAudit("Created Customer", "Customer", newCust.customerId, `Created profile for ${newCust.fullName} (${newCust.phone})`);
    return newCust;
  };

  // UPDATE CUSTOMER
  const updateCustomer = (id: string, data: Partial<CustomerProfile>) => {
    setCustomers(prev => prev.map(c => c.id === id ? { ...c, ...data } : c));
    logAudit("Updated Customer", "Customer", id, `Updated profile fields.`);
  };

  // ADD LEAD
  const addLead = (data: Omit<LeadRecord, 'id' | 'leadId' | 'createdDate'>): LeadRecord => {
    const newLead: LeadRecord = {
      ...data,
      id: `lead-${Date.now()}`,
      leadId: `ENT-LEAD-${Math.floor(500 + Math.random() * 500)}`,
      createdDate: new Date().toISOString().split('T')[0]
    };
    setLeads(prev => [newLead, ...prev]);
    logAudit("Created Lead", "Lead", newLead.leadId, `Created lead ${newLead.name} via ${newLead.source}`);
    return newLead;
  };

  // UPDATE LEAD STAGE
  const updateLeadStage = (id: string, stage: LeadRecord['stage']) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, stage, lastInteractionDate: new Date().toISOString().split('T')[0] } : l));
    logAudit("Updated Lead Stage", "Lead", id, `Moved stage to ${stage}`);
  };

  // ADD ENQUIRY
  const addEnquiry = (data: Omit<EnquiryRecord, 'id' | 'enquiryId' | 'createdDate' | 'updatedDate'>): EnquiryRecord => {
    const newEnq: EnquiryRecord = {
      ...data,
      id: `enq-${Date.now()}`,
      enquiryId: `ENT-ENQ-${Math.floor(2000 + Math.random() * 8000)}`,
      createdDate: new Date().toISOString().split('T')[0],
      updatedDate: new Date().toISOString().split('T')[0]
    };
    setEnquiries(prev => [newEnq, ...prev]);

    // Update customer's enquiry count
    setCustomers(prev => prev.map(c => c.id === data.customerId ? { ...c, totalEnquiries: c.totalEnquiries + 1 } : c));

    logAudit("Created Enquiry", "Enquiry", newEnq.enquiryId, `Enquiry for ${newEnq.productName} by ${newEnq.customerName}`);
    return newEnq;
  };

  // UPDATE ENQUIRY STATUS
  const updateEnquiryStatus = (id: string, status: EnquiryRecord['status']) => {
    setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status, updatedDate: new Date().toISOString().split('T')[0] } : e));
    logAudit("Updated Enquiry Status", "Enquiry", id, `Status updated to ${status}`);
  };

  // CONVERT ENQUIRY TO SALE
  const convertEnquiryToSale = (enquiryId: string, storeId: string, paymentMethod: SaleRecord['paymentMethod'], discount = 0): SaleRecord => {
    const enq = enquiries.find(e => e.id === enquiryId);
    if (!enq) throw new Error("Enquiry not found.");

    const sale: SaleRecord = {
      id: `sale-${Date.now()}`,
      saleId: `ENT-ORD-${Math.floor(8000 + Math.random() * 1000)}`,
      customerId: enq.customerId,
      customerName: enq.customerName,
      customerPhone: enq.customerPhone,
      enquiryId: enq.id,
      storeId,
      staffId: currentStaff.id,
      channel: "WhatsApp",
      items: [
        {
          productId: enq.productId,
          productName: enq.productName,
          productSku: enq.productSku,
          finish: enq.finish,
          quantity: enq.quantity,
          unitPrice: enq.price,
          subtotal: enq.totalValue
        }
      ],
      subtotal: enq.totalValue,
      discount,
      totalAmount: Math.max(0, enq.totalValue - discount),
      paymentStatus: "Completed",
      paymentMethod,
      status: "Completed",
      createdDate: new Date().toISOString().split('T')[0]
    };

    setSales(prev => [sale, ...prev]);

    // Update Enquiry Status to Converted
    updateEnquiryStatus(enquiryId, "Converted");

    // Deduct stock from assigned store
    adjustStoreStock(enq.productId, storeId, -enq.quantity, `Sale Conversion (${sale.saleId})`);

    // Update Customer spending stats
    setCustomers(prev => prev.map(c => {
      if (c.id === enq.customerId) {
        return {
          ...c,
          status: "Converted",
          totalSpending: c.totalSpending + sale.totalAmount,
          totalOrders: c.totalOrders + 1,
          lastInteractionDate: sale.createdDate
        };
      }
      return c;
    }));

    logAudit("Converted Enquiry to Sale", "Sale", sale.saleId, `Enquiry ${enq.enquiryId} converted to sale of ₹${sale.totalAmount}`);
    return sale;
  };

  // ADJUST STORE STOCK
  const adjustStoreStock = (productId: string, storeId: string, qtyDelta: number, reason: string) => {
    setStoreInventory(prev => prev.map(inv => {
      if (inv.productId === productId && inv.storeId === storeId) {
        const newQty = Math.max(0, inv.quantity + qtyDelta);
        return { ...inv, quantity: newQty, lastRestockedDate: new Date().toISOString().split('T')[0] };
      }
      return inv;
    }));

    logAudit("Adjusted Inventory", "Inventory", productId, `Stock changed by ${qtyDelta} at store ${storeId}. Reason: ${reason}`);
  };

  // CREATE STOCK TRANSFER
  const createStockTransfer = (productId: string, fromStoreId: string, toStoreId: string, qty: number, reason: string): StockTransferRecord => {
    const prod = products.find(p => p.id === productId);
    const transfer: StockTransferRecord = {
      id: `tr-${Date.now()}`,
      transferId: `ENT-TRF-${Math.floor(900 + Math.random() * 100)}`,
      productId,
      productName: prod?.name || "Jewellery Piece",
      productSku: prod?.sku || "SKU-UNKNOWN",
      fromStoreId,
      toStoreId,
      quantity: qty,
      reason,
      status: "Requested",
      requestedByStaffId: currentStaff.id,
      createdDate: new Date().toISOString().split('T')[0],
      updatedDate: new Date().toISOString().split('T')[0]
    };

    setTransfers(prev => [transfer, ...prev]);
    logAudit("Created Stock Transfer", "Transfer", transfer.transferId, `Requested transfer of ${qty} units of ${transfer.productSku} from ${fromStoreId} to ${toStoreId}`);
    return transfer;
  };

  // UPDATE TRANSFER STATUS
  const updateTransferStatus = (transferId: string, status: StockTransferRecord['status']) => {
    const tr = transfers.find(t => t.id === transferId);
    if (!tr) return;

    setTransfers(prev => prev.map(t => t.id === transferId ? { ...t, status, updatedDate: new Date().toISOString().split('T')[0] } : t));

    // If completed, update stock at both source & destination store
    if (status === "Completed") {
      adjustStoreStock(tr.productId, tr.fromStoreId, -tr.quantity, `Transfer Dispatched (${tr.transferId})`);
      adjustStoreStock(tr.productId, tr.toStoreId, tr.quantity, `Transfer Received (${tr.transferId})`);
    }

    logAudit("Updated Transfer Workflow", "Transfer", transferId, `Transfer status updated to ${status}`);
  };

  // RECORD MANUAL SALE
  const recordSale = (data: Omit<SaleRecord, 'id' | 'saleId' | 'createdDate'>): SaleRecord => {
    const sale: SaleRecord = {
      ...data,
      id: `sale-${Date.now()}`,
      saleId: `ENT-ORD-${Math.floor(8000 + Math.random() * 1000)}`,
      createdDate: new Date().toISOString().split('T')[0]
    };
    setSales(prev => [sale, ...prev]);

    // Deduct stock for all items
    sale.items.forEach(item => {
      adjustStoreStock(item.productId, sale.storeId, -item.quantity, `Direct Sale (${sale.saleId})`);
    });

    logAudit("Recorded Manual Sale", "Sale", sale.saleId, `Recorded sale of ₹${sale.totalAmount} at store ${sale.storeId}`);
    return sale;
  };

  // PROCESS RETURN
  const processReturn = (saleId: string, productId: string, qty: number, reason: string, refundAmount: number) => {
    const sale = sales.find(s => s.id === saleId);
    if (!sale) return;

    // Restock product to store
    adjustStoreStock(productId, sale.storeId, qty, `Customer Return (${saleId})`);

    // Update Sale status to Returned
    setSales(prev => prev.map(s => s.id === saleId ? { ...s, status: "Returned", paymentStatus: "Refunded" } : s));

    logAudit("Processed Return", "Return", saleId, `Returned ${qty} units for refund ₹${refundAmount}. Reason: ${reason}`);
  };

  // ADD TASK
  const addTask = (data: Omit<TaskRecord, 'id' | 'createdDate'>): TaskRecord => {
    const newTask: TaskRecord = {
      ...data,
      id: `task-${Date.now()}`,
      createdDate: new Date().toISOString().split('T')[0]
    };
    setTasks(prev => [newTask, ...prev]);
    logAudit("Created Task", "Customer", newTask.id, `Task assigned: ${newTask.title}`);
    return newTask;
  };

  // TOGGLE TASK STATUS
  const toggleTaskStatus = (taskId: string, status: TaskRecord['status']) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status } : t));
  };

  // ADD INTERACTION LOG
  const addInteraction = (customerId: string, type: CustomerInteraction['type'], summary: string) => {
    const newInt: CustomerInteraction = {
      id: `int-${Date.now()}`,
      customerId,
      type,
      summary,
      staffName: currentStaff.name,
      timestamp: new Date().toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })
    };
    setInteractions(prev => [newInt, ...prev]);
  };

  // GLOBAL SEARCH
  const globalSearch = (query: string) => {
    const q = query.toLowerCase().trim();
    if (!q) return { customers: [], products: [], enquiries: [], sales: [], stores: [] };

    return {
      customers: customers.filter(c => c.fullName.toLowerCase().includes(q) || c.phone.includes(q) || c.customerId.toLowerCase().includes(q)),
      products: products.filter(p => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q)),
      enquiries: enquiries.filter(e => e.customerName.toLowerCase().includes(q) || e.enquiryId.toLowerCase().includes(q) || e.productSku.toLowerCase().includes(q)),
      sales: sales.filter(s => s.saleId.toLowerCase().includes(q) || s.customerName.toLowerCase().includes(q)),
      stores: stores.filter(s => s.name.toLowerCase().includes(q) || s.city.toLowerCase().includes(q))
    };
  };

  // EXPORT CSV UTILITY
  const exportCsv = (collectionName: "customers" | "enquiries" | "sales" | "inventory" | "products") => {
    let csvData: any[] = [];
    let filename = `enteya_${collectionName}_${new Date().toISOString().split('T')[0]}.csv`;

    if (collectionName === "customers") csvData = customers;
    else if (collectionName === "enquiries") csvData = enquiries;
    else if (collectionName === "sales") csvData = sales;
    else if (collectionName === "inventory") csvData = storeInventory;
    else if (collectionName === "products") csvData = products;

    if (csvData.length === 0) return;

    const headers = Object.keys(csvData[0]).join(',');
    const rows = csvData.map(obj => Object.values(obj).map(val => `"${String(val).replace(/"/g, '""')}"`).join(','));
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    logAudit("Exported CSV", "Settings", collectionName, `Exported ${collectionName} records.`);
  };

  return (
    <CrmContext.Provider
      value={{
        currentStaff,
        setCurrentStaff,
        selectedStoreScope,
        setSelectedStoreScope,
        stores,
        staffList,
        customers,
        leads,
        enquiries,
        products,
        storeInventory,
        transfers,
        sales,
        tasks,
        interactions,
        auditLogs,
        addCustomer,
        updateCustomer,
        addLead,
        updateLeadStage,
        addEnquiry,
        updateEnquiryStatus,
        convertEnquiryToSale,
        adjustStoreStock,
        createStockTransfer,
        updateTransferStatus,
        recordSale,
        processReturn,
        addTask,
        toggleTaskStatus,
        addInteraction,
        logAudit,
        exportCsv,
        globalSearch
      }}
    >
      {children}
    </CrmContext.Provider>
  );
};

export const useCrm = () => {
  const context = useContext(CrmContext);
  if (!context) {
    throw new Error('useCrm must be used within a CrmProvider');
  }
  return context;
};
