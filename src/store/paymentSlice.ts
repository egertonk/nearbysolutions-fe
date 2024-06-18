import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaymentStateProps } from "../web/lib/types/PaymentTyoes";
import { paymentStatusStates } from "./defualtStates";

interface PaymentCheckoutState {
  paymentCheckoutState: PaymentStateProps;
}

export const initialState: PaymentCheckoutState = {
  paymentCheckoutState: paymentStatusStates,
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
