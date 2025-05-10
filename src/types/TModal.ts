export type TModalMap = {
  payment: { 
    price: number, 
    amountProducts?: number,
    fullPrice?: number,
    discount?: number,
    onPayment: () => void, 
    onClose: () => void 
  };
  // INFO: { message: string };
  // CUSTOM: { data: any };
}

export type TModalType = keyof TModalMap