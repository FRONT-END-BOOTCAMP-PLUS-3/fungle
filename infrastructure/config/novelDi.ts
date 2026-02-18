import { PrNovelRepository } from "@/infrastructure/repositories/PrNovelRepostiory";
import { PrUserRepository } from "@/infrastructure/repositories/PrUserRepository";
import { PrNovelGenreRepository } from "@/infrastructure/repositories/PrNovelGenreRepository";
import { PrNovelLikeRepository } from "@/infrastructure/repositories/PrNovelLikeRepository";
import { PrNovelEpisodeRepository } from "@/infrastructure/repositories/PrNovelEpisodeRepository";
import { PrGenreRepository } from "@/infrastructure/repositories/PrGenreRepository";
import { PrNovelCommentRepository } from "@/infrastructure/repositories/PrNovelCommentRepository";
import { PrNovelCommentLikeRepository } from "@/infrastructure/repositories/PrNovelCommentLikeRepository";

import { DfNovelByIdUseCase } from "@/application/usecases/novel/DfNovelUsecase";
import { DfEpisodesByNovelIdUsecase } from "@/application/usecases/novel/DfEpisodesByNovelIdUsecase";
import { DfCreateNovelUsecase } from "@/application/usecases/novel/DfCreateNovelUsecase";
import { DfCreateEpisodeUseCase } from "@/application/usecases/novel/DfCreateEpisodeUsecase";
import { DfIncreaseViewCountUsecase } from "@/application/usecases/novel/DfIncreaseViewCountUsecase";
import { FileService } from "@/infrastructure/services/FileService";
import { DfNovelsBySerialDayUsecase } from "@/application/usecases/novel/DfNovelsBySerialDayUsecase";
import { DfBannerNovelsUsecase } from "@/application/usecases/novel/DfBannerNovelsUsecase";
import { DfEpisodeByIdUsecase } from "@/application/usecases/novel/DfEpisodeByIdUsecase";
import { DfTopNovelsUsecase } from "@/application/usecases/novel/DfTopNovelsUsecase";
import { DfSearchNovelsUsecase } from "@/application/usecases/novel/DfSearchNovelsUsecase";
import { DfNovelCommentCountUsecase } from "@/application/usecases/novel/comments/DfNovelCommentCountUsecase";
import { DfNovelCommentCreateUsecase } from "@/application/usecases/novel/comments/DfNovelCommentCreateUsecase";
import { DfNovelCommentDeleteUsecase } from "@/application/usecases/novel/comments/DfNovelCommentDeleteUsecase";
import { DfNovelCommentUpdateUsecase } from "@/application/usecases/novel/comments/DfNovelCommentUpdateUsecase";
import { DfNovelToggleCommentUsecase } from "@/application/usecases/novel/comments/DfNovelToggleCommentUsecase";
import { DfgetNovelCommentUsecase } from "@/application/usecases/novel/comments/DfNovelgetCommentUsecase";
import { DfCheckNovelLikeStatusUsecase } from "@/application/usecases/novel/DfCheckNovelLikeStatusUsecase";

export const novelDi = {
  novelRepository: new PrNovelRepository(),
  userRepository: new PrUserRepository(),
  novelGenreRepository: new PrNovelGenreRepository(),
  novelLikeRepository: new PrNovelLikeRepository(),
  novelEpisodeRepository: new PrNovelEpisodeRepository(),
  fileService: new FileService(),
  genreRepository: new PrGenreRepository(),

  getEpisodesByNovelIdUseCase: new DfEpisodesByNovelIdUsecase(
    new PrNovelEpisodeRepository(),
  ),
  getEpisodeByIdUseCase: new DfEpisodeByIdUsecase(
    new PrNovelEpisodeRepository(),
  ),

  getNovelByIdUseCase: new DfNovelByIdUseCase(
    new PrNovelRepository(),
    new PrNovelGenreRepository(),
    new PrUserRepository(),
    new PrNovelLikeRepository(),
    new DfEpisodesByNovelIdUsecase(new PrNovelEpisodeRepository()),
  ),

  createNovelUseCase: new DfCreateNovelUsecase(
    new PrNovelRepository(),
    new PrGenreRepository(),
    FileService,
  ),

  createEpisodeUseCase: new DfCreateEpisodeUseCase(
    new PrNovelEpisodeRepository(),
    new PrNovelRepository(),
  ),

  increaseViewCountUseCase: new DfIncreaseViewCountUsecase(
    new PrNovelEpisodeRepository(),
  ),

  getNovelsBySerialDayUseCase: new DfNovelsBySerialDayUsecase(
    new PrNovelRepository(),
    new PrUserRepository(),
  ),
  getBannerNovelsUsecase: new DfBannerNovelsUsecase(new PrNovelRepository()),

  getTopNovelsUseCase: new DfTopNovelsUsecase(
    new PrNovelRepository(),
    new PrNovelGenreRepository(),
    new PrUserRepository(),
    new PrNovelLikeRepository(),
    new PrNovelEpisodeRepository(),
  ),

  searchNovelsUsecase: new DfSearchNovelsUsecase(
    new PrNovelRepository(),
    new PrGenreRepository(),
    new PrNovelGenreRepository(),
    new PrUserRepository(),
  ),
  getCommentsUsecase: new DfgetNovelCommentUsecase(
    new PrNovelCommentRepository(),
  ),
  getCommentCountUsecase: new DfNovelCommentCountUsecase(
    new PrNovelCommentRepository(),
  ),
  createCommentUsecase: new DfNovelCommentCreateUsecase(
    new PrNovelCommentRepository(),
  ),
  updateCommentUsecase: new DfNovelCommentUpdateUsecase(
    new PrNovelCommentRepository(),
  ),
  deleteCommentUsecase: new DfNovelCommentDeleteUsecase(
    new PrNovelCommentRepository(),
  ),
  toggleCommentLikeUsecase: new DfNovelToggleCommentUsecase(
    new PrNovelCommentLikeRepository(),
  ),
  checkNovelLikeStatusUsecase: new DfCheckNovelLikeStatusUsecase(
    new PrNovelLikeRepository(),
  ),
};
