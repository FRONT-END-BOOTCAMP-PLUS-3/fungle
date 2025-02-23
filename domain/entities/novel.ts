export class Novel {
  constructor(
    public id: number,
    public title: string,
    public image: string | null,
    public serialDay: string,
    public novelIntroduce: string,
    public serialStatus: string,
    public author: string
  ) {}

  static fromPrisma(data: any): Novel {
    return new Novel(
      data.id,
      data.title,
      data.image,
      data.serialDay,
      data.novelIntroduce,
      data.serialStatus,
      data.user.nickname
    );
  }
}
