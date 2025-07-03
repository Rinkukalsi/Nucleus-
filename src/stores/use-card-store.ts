import { create } from 'zustand'
import { CardId } from '../components/core/feature-card'

interface CardStore {
  expandedCard: CardId | null
  setExpandedCard: (card: CardId | null) => void
}

export const useCardStore = create<CardStore>((set) => ({
  expandedCard: null,
  setExpandedCard: (card) => set({ expandedCard: card }),
}))
