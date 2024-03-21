import { create } from 'zustand'

type State = {
  wallet: number
  userId: string
}

type Actions = {
  setWallet: (amount: number) => void
  addWallet: (amount: number, id: string) => void
  setUserId: (userId: string) => void
}

export const useWallet = create<State & Actions>((set) => ({
  wallet: 0,
  userId: '',
  setWallet: (amount: number) => {
    set(() => ({
      wallet: amount
    }))
  },
  addWallet: (amount: number, id: string) => {
    set((state) => ({
      wallet: id === state.userId ? state.wallet + amount : state.wallet
    }))
  },
  setUserId: (id: string) => {
    set(() => ({
      userId: id
    }))
  }
}))
