-- CreateTable
CREATE TABLE "communityComment" (
    "id" SERIAL NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "postId" INTEGER NOT NULL,
    "parentId" TEXT,

    CONSTRAINT "communityComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "communityCommentLike" (
    "communityCommentId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "communityCommentLike_pkey" PRIMARY KEY ("communityCommentId","userId")
);

-- CreateTable
CREATE TABLE "communityPost" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "view" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "communityPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "communityPostGenre" (
    "postId" INTEGER NOT NULL,
    "genreId" INTEGER NOT NULL,

    CONSTRAINT "CommunityPostGenre_pkey" PRIMARY KEY ("postId","genreId")
);

-- CreateTable
CREATE TABLE "communityPostLike" (
    "userId" TEXT NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "communityPostLike_pkey" PRIMARY KEY ("userId","postId")
);

-- CreateTable
CREATE TABLE "funding" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "novelId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "funding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fundingUser" (
    "id" SERIAL NOT NULL,
    "userId" TEXT,
    "fundingId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fundingUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "genre" (
    "id" SERIAL NOT NULL,
    "genreName" TEXT NOT NULL,

    CONSTRAINT "genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "novel" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "image" TEXT,
    "title" TEXT NOT NULL,
    "serialDay" TEXT NOT NULL,
    "novelIntroduce" TEXT NOT NULL,
    "serialStatus" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "novel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "novelComment" (
    "id" SERIAL NOT NULL,
    "novelEpisodeId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "novelId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "novelComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "novelCommentLike" (
    "novelCommentId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "novelCommentLike_pkey" PRIMARY KEY ("novelCommentId","userId")
);

-- CreateTable
CREATE TABLE "novelEpisode" (
    "id" SERIAL NOT NULL,
    "novelId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "episode" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "view" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "novelEpisode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "novelGenre" (
    "genreId" INTEGER NOT NULL,
    "novelId" INTEGER NOT NULL,

    CONSTRAINT "novelGenre_pkey" PRIMARY KEY ("genreId","novelId")
);

-- CreateTable
CREATE TABLE "novelLike" (
    "userId" TEXT NOT NULL,
    "novelId" INTEGER NOT NULL,

    CONSTRAINT "novelLike_pkey" PRIMARY KEY ("userId","novelId")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL DEFAULT 'user',
    "introduce" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "funding_novelId_key" ON "funding"("novelId");

-- CreateIndex
CREATE UNIQUE INDEX "fundingUser_userId_fundingId_key" ON "fundingUser"("userId", "fundingId");

-- CreateIndex
CREATE UNIQUE INDEX "novelEpisode_novelId_episode_key" ON "novelEpisode"("novelId", "episode");

-- CreateIndex
CREATE UNIQUE INDEX "user_nickname_key" ON "user"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "user_userEmail_key" ON "user"("userEmail");

-- AddForeignKey
ALTER TABLE "communityComment" ADD CONSTRAINT "communityComment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "communityPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "communityComment" ADD CONSTRAINT "communityComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "communityCommentLike" ADD CONSTRAINT "communityCommentLike_communityCommentId_fkey" FOREIGN KEY ("communityCommentId") REFERENCES "communityComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "communityCommentLike" ADD CONSTRAINT "communityCommentLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "communityPost" ADD CONSTRAINT "communityPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "communityPostGenre" ADD CONSTRAINT "CommunityPostGenre_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "communityPostGenre" ADD CONSTRAINT "CommunityPostGenre_postId_fkey" FOREIGN KEY ("postId") REFERENCES "communityPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "communityPostLike" ADD CONSTRAINT "communityPostLike_postId_fkey" FOREIGN KEY ("postId") REFERENCES "communityPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "communityPostLike" ADD CONSTRAINT "communityPostLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "funding" ADD CONSTRAINT "funding_novelId_fkey" FOREIGN KEY ("novelId") REFERENCES "novel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fundingUser" ADD CONSTRAINT "fundingUser_fundingId_fkey" FOREIGN KEY ("fundingId") REFERENCES "funding"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fundingUser" ADD CONSTRAINT "fundingUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "novel" ADD CONSTRAINT "novel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "novelComment" ADD CONSTRAINT "novelComment_novelEpisodeId_fkey" FOREIGN KEY ("novelEpisodeId") REFERENCES "novelEpisode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "novelComment" ADD CONSTRAINT "novelComment_novelId_fkey" FOREIGN KEY ("novelId") REFERENCES "novel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "novelComment" ADD CONSTRAINT "novelComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "novelCommentLike" ADD CONSTRAINT "novelCommentLike_novelCommentId_fkey" FOREIGN KEY ("novelCommentId") REFERENCES "novelComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "novelCommentLike" ADD CONSTRAINT "novelCommentLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "novelEpisode" ADD CONSTRAINT "novelEpisode_novelId_fkey" FOREIGN KEY ("novelId") REFERENCES "novel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "novelEpisode" ADD CONSTRAINT "novelEpisode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "novelGenre" ADD CONSTRAINT "novelGenre_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "novelGenre" ADD CONSTRAINT "novelGenre_novelId_fkey" FOREIGN KEY ("novelId") REFERENCES "novel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "novelLike" ADD CONSTRAINT "novelLike_novelId_fkey" FOREIGN KEY ("novelId") REFERENCES "novel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "novelLike" ADD CONSTRAINT "novelLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
