import { FindAllFundingWithNovelDto } from "@/application/usecases/funding/dto/FindAllFundingWithNovel";
import { create } from "zustand";

interface FundingState {
  fundings: FindAllFundingWithNovelDto[];
  setFundings: (
    fundings:
      | FindAllFundingWithNovelDto[]
      | ((prev: FindAllFundingWithNovelDto[]) => FindAllFundingWithNovelDto[])
  ) => void;
  removeFunding: (fundingId: string) => void;
}

export const useFundingState = create<FundingState>((set) => ({
  fundings: [],
  setFundings: (fundings) =>
    set((state) => ({
      fundings:
        typeof fundings === "function" ? fundings(state.fundings) : fundings,
    })),
  removeFunding: (fundingId) =>
    set((state) => ({
      fundings: state.fundings.filter((funding) => funding.id !== fundingId),
    })),
}));
