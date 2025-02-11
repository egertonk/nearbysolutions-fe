// Common items for Customer

export const customerAddressFields = [
  "addressLine2",
  "addressType",
  "city",
  "country",
  "postalCode",
  "region",
  "state",
  "street",
];

export const customerPeronalFields = [
  "firstName",
  "lastName",
  "email",
  "phoneNumber",
];

export const customerFormFieldNames = {
  addressLine2: customerAddressFields[0],
  addressType: customerAddressFields[1],
  city: customerAddressFields[2],
  country: customerAddressFields[3],
  postalCode: customerAddressFields[4],
  region: customerAddressFields[5],
  state: customerAddressFields[6],
  street: customerAddressFields[7],
  firstName: customerPeronalFields[0],
  lastName: customerPeronalFields[1],
  email: customerPeronalFields[2],
  phoneNumber: customerPeronalFields[3],
};

export const giftInfoFields = [
  customerFormFieldNames.firstName,
  customerFormFieldNames.lastName,
  customerFormFieldNames.email,
  customerFormFieldNames.phoneNumber,
  customerFormFieldNames.state,
  customerFormFieldNames.postalCode,
  "customerID",
  customerFormFieldNames.country,
  customerFormFieldNames.city,
  customerFormFieldNames.street,
]; 
