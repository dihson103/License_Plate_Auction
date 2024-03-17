import { create } from 'zustand'
import { BidResponse } from '../types/bid.type'

type State = {
  bids: BidResponse[]
  currentHighBid: number
}

type Actions = {
  setBids: (bids: BidResponse[]) => void
  addBid: (bid: BidResponse) => void
}

export const useBidsStore = create<State & Actions>((set) => ({
  bids: [],
  currentHighBid: 0,
  setBids: (bids: BidResponse[]) => {
    set(() => ({
      bids
    }))
    set((state) => ({
      currentHighBid: state.bids.reduce((prev, current) => (prev > current.amount ? prev : current.amount), 0)
    }))
  },
  addBid: (bid: BidResponse) => {
    set((state) => ({
      bids: !state.bids.find((x) => x.id == bid.id) ? [bid, ...state.bids] : [...state.bids]
    }))
    set((state) => ({
      currentHighBid: Math.max(bid.amount, state.currentHighBid)
    }))
  }
}))
