import { EpisodeWithUserInfo } from "@/application/usecases/novel/dto/EpisodeWithUserInfo";
import { create } from "zustand";

interface NovelState {
  episodes: EpisodeWithUserInfo[];
  setEpisodes: (episodes: EpisodeWithUserInfo[]) => void;
  removeEpisode: (episodeId: number) => void;
}

export const useAdminNovelStore = create<NovelState>((set) => ({
  episodes: [],
  setEpisodes: (episodes) => set({ episodes }),
  removeEpisode: (episodeId) =>
    set((state) => ({
      episodes: state.episodes.filter(
        (episode) => episode.episodeId !== episodeId
      ),
    })),
}));
