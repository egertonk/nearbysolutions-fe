import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaymentStateProps } from "../web/lib/types/paymentTyoes";

interface PaymentCheckoutState {
  paymentCheckoutState: PaymentStateProps;
}

const initialState: PaymentCheckoutState = {
  paymentCheckoutState: {
    showPaymentInputs: true,
    showCreditCard: false,
    showPaypal: false,
    showPaymentSelection: true,
    showPaymentInfo: false,
    showPayment: true,
    showSelectPayment: true,
  },
};

const paymentSlice = createSlice({
  name: "paymentCheckoutState",
  initialState,
  reducers: {
    setPaymentState(state, action: PayloadAction<PaymentStateProps>) {
      state.paymentCheckoutState = action.payload;
    },
  },
});

export const { setPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;
