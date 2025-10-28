import { create } from "zustand";

interface CompareState {
  compareList: number[]; // 최대 3개까지 비교
  addToCompare: (id: number) => void;
  removeFromCompare: (id: number) => void;
  isInCompare: (id: number) => boolean;
  clearCompare: () => void;
  toggleCompare: (id: number) => void;
}

export const useCompareStore = create<CompareState>((set, get) => ({
  compareList: [],
  addToCompare: (id) =>
    set((state) => {
      if (state.compareList.length >= 3) {
        alert("최대 3개까지만 비교할 수 있습니다!");
        return state;
      }
      if (state.compareList.includes(id)) {
        return state;
      }
      return { compareList: [...state.compareList, id] };
    }),
  removeFromCompare: (id) =>
    set((state) => ({
      compareList: state.compareList.filter((cid) => cid !== id),
    })),
  isInCompare: (id) => get().compareList.includes(id),
  clearCompare: () => set({ compareList: [] }),
  toggleCompare: (id) => {
    const { compareList } = get();
    if (compareList.includes(id)) {
      set({ compareList: compareList.filter((cid) => cid !== id) });
    } else {
      if (compareList.length >= 3) {
        alert("최대 3개까지만 비교할 수 있습니다!");
        return;
      }
      set({ compareList: [...compareList, id] });
    }
  },
}));
