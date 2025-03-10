"use client";

import { useEffect, useState } from "react";
import { AdminHeader, AdminMain, Table } from "./AdminNovelPage.styled";
import { NovelEpisodeWithUserInfo } from "@/application/usecases/novel/dto/NovelEpisodeWithUserInfo";

const Page = () => {
  const [novelEpisodes, setNovelEpisodes] = useState<
    NovelEpisodeWithUserInfo[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/admin/novel-episode");
        const data = await response.json();

        if (response.ok) setNovelEpisodes(data.data);
      } catch {
        throw new Error("데이터를 가져오는 데 실패했습니다.");
      }
    };

    fetchData();
  }, []);

  return (
    <AdminMain>
      <AdminHeader>
        <h1>소설 검토</h1>
      </AdminHeader>

      <Table>
        <thead>
          <tr>
            <th>사용자 ID</th>
            <th>닉네임</th>
            <th>소설 제목</th>
            <th>에피소드 제목</th>
            <th>검토 상태</th>
          </tr>
        </thead>
        <tbody>
          {novelEpisodes.length > 0 ? (
            novelEpisodes.map((episode) => (
              <tr key={episode.episodeTitle}>
                <td>{episode.userId}</td>
                <td>{episode.userNickname}</td>
                <td>{episode.novelTitle}</td>
                <td>{episode.episodeTitle}</td>
                <td>{episode.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>데이터가 없습니다.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </AdminMain>
  );
};

export default Page;
