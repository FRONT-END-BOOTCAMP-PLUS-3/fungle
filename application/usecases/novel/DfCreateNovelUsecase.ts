import { NovelRepository } from "@/domain/repositories/NovelRepository";
import { GenreRepository } from "@/domain/repositories/GenreRepository";
import { FileService } from "@/infrastructure/services/FileService";
import { CreateNovelDto } from "@/application/usecases/novel/dto/CreateNovel";
import { NovelResponseDto } from "./dto/NovelResponse";

export class DfCreateNovelUseCase {
  constructor(
    private novelRepository: NovelRepository,
    private genreRepository: GenreRepository,
    private fileService: FileService
  ) {}

  async execute(data: CreateNovelDto): Promise<NovelResponseDto> {
    const genreRecords = await this.genreRepository.getGenreIdsByNames(data.genres);
    const genreIds = genreRecords.map((genre) => genre.id);
  
    if (genreIds.length === 0) {
      throw new Error("선택한 장르가 존재하지 않습니다.");
    }
  
    let coverImageUrl = null;
    if (data.coverImage) {
      coverImageUrl = await FileService.saveCoverImage(data.coverImage);
    }
  
    const novel = await this.novelRepository.createNovel({
      title: data.title,
      novelIntroduce: data.description,
      serialDay: data.serialDay,
      userId: data.userId,
      image: coverImageUrl,
      serialStatus: "ongoing", 
    });
  
    await this.novelRepository.addGenres(novel.id, genreIds);
  
    return new NovelResponseDto(novel, data.genres);
  }  
}
