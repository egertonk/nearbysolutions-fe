import { SolutionistResponseTypes, Talent } from "../../lib/types/solutionistTypes";

export interface CustomerTypes {
  customerId: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  country: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phoneNumber: string;
  email: string;
  accountCreationDate: string;
  lastUpdatedDate: string;
  customerType: string;
  preferredContactMethod: string;
  status: boolean;
  notes: string;
}

export interface OrderTypes {
  orderId: number;
  customer: CustomerTypes;
  contractor: SolutionistResponseTypes;
  talent: Talent;
  orderDate: string;
  orderStatus: string;
  startTime: string;
  startDate: string;
  endDate: string;
  serviceDescription: string;
  workLocation: string;
  totalAmount: number;
  paymentStatus: string;
  paymentMethod: string;
  currency: string;
  invoiceId: string;
  priority: string;
  notes: string;
  createdBy: string;
  lastModifiedBy: string;
  createdAt: string;
  updatedAt: string;
}
