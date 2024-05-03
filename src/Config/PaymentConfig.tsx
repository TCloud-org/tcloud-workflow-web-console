export interface Payment {
  paymentId: string;
  email: string;
  subscriptionPlan: string;
  priceId?: string;
  invoiceId?: string;
  paymentStatus?: string;
  sessionId?: string;
  subscriptionId?: string;
  sessionUrl?: string;
  invoiceUrl?: string;
  invoicePdf?: string;
  amountDue?: number;
  amountPaid?: number;
  amountRemaining?: number;
  externalReferenceNumber?: string;
  createdAt: any;
  updatedAt?: any;
}

export enum SubscriptionPlan {
  FREE = "FREE",
  INDIVIDUAL = "INDIVIDUAL",
  BUSINESS = "BUSINESS",
  ENTERPRISE = "ENTERPRISE",
}
