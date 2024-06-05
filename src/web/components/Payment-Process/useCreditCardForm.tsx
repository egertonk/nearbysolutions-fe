import { useState, ChangeEvent, FocusEvent, FormEvent } from "react";
import validateInfo from "./validateInfo";

export type Values = {
  cardName: string;
  cardNumber: string;
  cardType: string;
  cardExpiration: string;
  cardSecurityCode: string;
  cardPostalCode: string;
  focus: string;
};

export type Errors = {
  show: boolean;
  variant: "danger" | "success" | "";
  message: string;
  cname: boolean;
  cnumber: boolean;
  ctype: boolean;
  cexp: boolean;
  ccvv: boolean;
  cpostal: boolean;
};

export const useCreditCardForm = () => {
  const [values, setValues] = useState<Values>({
    cardName: "",
    cardNumber: "",
    cardType: "",
    cardExpiration: "",
    cardSecurityCode: "",
    cardPostalCode: "",
    focus: "",
  });

  const [errors, setErrors] = useState<Errors>({
    show: false,
    variant: "",
    message: "",
    cname: false,
    cnumber: false,
    ctype: false,
    cexp: false,
    ccvv: false,
    cpostal: false,
  });

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      focus: e.target.name === "cardSecurityCode" ? "cvc" : e.target.name,
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrors(validateInfo(values));
  };

  return { handleChange, handleFocus, handleSubmit, values, errors };
};
