// ✅ Common fields for Customer (Immutable Tuples for Safety)
export const customerAddressFields = [
  "addressLine2",
  "addressType",
  "city",
  "country",
  "postalCode",
  "region",
  "state",
  "street",
] as const;

export const customerPersonalFields = [
  "firstName",
  "lastName",
  "email",
  "phoneNumber",
] as const;

export const customerFormFieldNames = {
  addressLine2: "addressLine2",
  addressType: "addressType",
  city: "city",
  country: "country",
  postalCode: "postalCode",
  region: "region",
  state: "state",
  street: "street",
  firstName: "firstName",
  lastName: "lastName",
  email: "email",
  phoneNumber: "phoneNumber",
} as const;

export const giftInfoFields: ReadonlyArray<string> = [
  customerFormFieldNames.firstName,
  customerFormFieldNames.lastName,
  customerFormFieldNames.email,
  customerFormFieldNames.phoneNumber,
  customerFormFieldNames.state,
  customerFormFieldNames.postalCode,
  "customerID", // This is an extra field
  customerFormFieldNames.country,
  customerFormFieldNames.city,
  customerFormFieldNames.street,
];
