export class User {
  constructor(
    public id: string,
    public nickname: string,
    public userEmail: string,
    public introduce: string | null, 
    public createdAt: Date,
    public type: string
  ) {}
}
