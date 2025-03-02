import { PrNovelRepository } from "@/infrastructure/repositories/PrNovelRepostiory";
import { PrUserRepository } from "@/infrastructure/repositories/PrUserRepository";
import { PrNovelGenreRepository } from "@/infrastructure/repositories/PrNovelGenreRepository";
import { PrNovelLikeRepository } from "@/infrastructure/repositories/PrNovelLikeRepository";
import { PrNovelEpisodeRepository } from "@/infrastructure/repositories/PrNovelEpisodeRepository";
import { PrGenreRepository } from "../repositories/PrGenreRepository";
import { DfNovelByIdUseCase } from "@/application/usecases/novel/DfNovelUsecase";
import { DfEpisodesByNovelIdUseCase } from "@/application/usecases/novel/DfEpisodesByNovelIdUseCase";
import { DfEpisodeByIdUseCase } from "@/application/usecases/novel/DfEpisodeByIdUseCase";
import { DfCreateNovelUseCase } from "@/application/usecases/novel/DfCreateNovelUsecase";
import { DfCreateEpisodeUseCase } from "@/application/usecases/novel/DfCreateEpisodeUsecase"; 
import { FileService } from "@/infrastructure/services/FileService";

export const novelDi = {
  novelRepository: new PrNovelRepository(),
  userRepository: new PrUserRepository(),
  novelGenreRepository: new PrNovelGenreRepository(),
  novelLikeRepository: new PrNovelLikeRepository(),
  novelEpisodeRepository: new PrNovelEpisodeRepository(),
  fileService: new FileService(),
  genreRepository: new PrGenreRepository(),

  getEpisodesByNovelIdUseCase: new DfEpisodesByNovelIdUseCase(new PrNovelEpisodeRepository()),
  getEpisodeByIdUseCase: new DfEpisodeByIdUseCase(new PrNovelEpisodeRepository()),

  getNovelByIdUseCase: new DfNovelByIdUseCase(
    new PrNovelRepository(),
    new PrNovelGenreRepository(),
    new PrUserRepository(),
    new PrNovelLikeRepository(),
    new DfEpisodesByNovelIdUseCase(new PrNovelEpisodeRepository())
  ),

  createNovelUseCase: new DfCreateNovelUseCase(
    new PrNovelRepository(),
    new PrGenreRepository(), 
    FileService 
  ),

  createEpisodeUseCase: new DfCreateEpisodeUseCase(new PrNovelEpisodeRepository()), 
}
