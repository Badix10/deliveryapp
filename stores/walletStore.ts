import { create } from 'zustand';

interface WalletStore {
  balance: number;
  currency: string;
  addFunds: (amount: number) => void;
  deductFunds: (amount: number) => boolean; 
}

export const useWalletStore = create<WalletStore>((set, get) => ({
  balance: 150.00, // Mock balance
  currency: 'DZD',
  
  addFunds: (amount) =>
    set((state) => ({ balance: state.balance + amount })),
    
  deductFunds: (amount) => {
    const state = get();
    if (state.balance >= amount) {
      set({ balance: state.balance - amount });
      return true;
    }
    return false;
  },
}));