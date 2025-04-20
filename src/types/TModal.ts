export type TModalMap = {
  payment: { price: number, onPayment: () => void, onClose: () => void };
  // INFO: { message: string };
  // CUSTOM: { data: any };
}

export type TModalType = keyof TModalMap