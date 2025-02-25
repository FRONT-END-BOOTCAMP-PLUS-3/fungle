export class NovelEntity {
  constructor(
    public id: number,
    public title: string,
    public image: string | null,
    public serialDay: string,
    public novelIntroduce: string,
    public serialStatus: string,
    public author: string,
    public userIntroduce: string | null,
    public likeCount: number,
    public episodes: { id: number; title: string; createdAt: Date }[],
    public genres: string[],
  ) {}
}
