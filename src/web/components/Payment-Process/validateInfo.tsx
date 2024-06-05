import valid from "card-validator";
import { Errors, Values } from "./useCreditCardForm";

export default function validateInfo(values: Values): Errors {
  let errors: Errors = {
    show: true,
    variant: "danger",
    message: "An unknown error occured. Please try again later",
    cname: false,
    cnumber: false,
    ctype: false,
    cexp: false,
    ccvv: false,
    cpostal: false,
  };

  const cardNumber = valid.number(values.cardNumber);
  const expirationDate = valid.expirationDate(values.cardExpiration);
  const cvv = valid.cvv(values.cardSecurityCode);
  const cardholderName = valid.cardholderName(values.cardName);
  const postalCode = valid.postalCode(values.cardPostalCode);

  if (!values.cardPostalCode.trim()) {
    errors.message = "Credit card postal code is not complete";
  } else if (postalCode.isValid) {
    errors.cpostal = true;
  } else {
    errors.message = "Credit card postal code is invalid";
  }

  if (!values.cardSecurityCode.trim()) {
    errors.message = "Credit card CVC is not complete";
  } else if (cvv.isValid) {
    errors.ccvv = true;
  } else {
    errors.message = "Credit card CVC is invalid";
  }

  if (!values.cardExpiration.trim()) {
    errors.message = "Credit card expiration date is not complete";
  } else if (expirationDate.isValid) {
    errors.cexp = true;
  } else {
    errors.message = "Credit card expiration date is invalid";
  }

  if (!values.cardType.trim() || cardNumber.card === null) {
    errors.message = "Credit card type is not complete";
  } else if (
    cardNumber.card?.type?.toUpperCase() === values.cardType.toUpperCase()
  ) {
    errors.ctype = true;
  } else {
    errors.message = "Credit card type is invalid";
  }

  if (!values.cardNumber.trim()) {
    errors.message = "Credit card number is not complete";
  } else if (cardNumber.isValid) {
    errors.cnumber = true;
  } else {
    errors.message = "Credit card number is invalid";
  }

  if (!values.cardName.trim()) {
    errors.message = "Cardholder name is not complete";
  } else if (cardholderName.isValid) {
    errors.cname = true;
  } else {
    errors.message = "Cardholder name is invalid";
  }

  if (
    errors.ctype &&
    errors.cname &&
    errors.cnumber &&
    errors.cexp &&
    errors.cpostal &&
    errors.ccvv
  ) {
    errors.variant = "success";
    errors.message = "Credit Card is valid";
  }

  return errors;
}
