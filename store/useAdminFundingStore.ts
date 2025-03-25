import { FindAllFundingWithNovelDto } from "@/application/usecases/funding/dto/FindAllFundingWithNovel";
import { create } from "zustand";

interface FundingState {
  fundings: FindAllFundingWithNovelDto[];
  setFundings: (
    fundings:
      | FindAllFundingWithNovelDto[]
      | ((prev: FindAllFundingWithNovelDto[]) => FindAllFundingWithNovelDto[])
  ) => void;
  removeFunding: (stageId: number) => void;
}

export const useAdminFundingStore = create<FundingState>((set) => ({
  fundings: [],
  setFundings: (fundings) =>
    set((state) => ({
      fundings:
        typeof fundings === "function" ? fundings(state.fundings) : fundings,
    })),
  removeFunding: (stageId: number) =>
    set((state) => ({
      fundings: state.fundings.filter((funding) => funding.stageId !== stageId),
    })),
}));
