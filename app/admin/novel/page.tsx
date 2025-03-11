"use client";

import { useEffect, useState } from "react";
import {
  AdminHeader,
  AdminMain,
  ButtonWrapper,
  ModalContentWrapper,
  StatusText,
  Table,
} from "./AdminNovelPage.styled";
import { NovelEpisodeWithUserInfo } from "@/application/usecases/novel/dto/NovelEpisodeWithUserInfo";
import { EPISODE_STATUS } from "@/constants/EPISODE_STATUS";
import { useModalStore } from "@/store/useModalStore";
import Button from "@/components/button/Button";
import Modal from "@/components/modal/Modal";

interface EpisodeWithUserInfo extends NovelEpisodeWithUserInfo {
  statusLabel: string;
}

const Page = () => {
  const [novelEpisodes, setNovelEpisodes] = useState<EpisodeWithUserInfo[]>([]);
  const { isOpen, openModal, onClose } = useModalStore();
  const [selectedEpisode, setSelectedEpisode] =
    useState<EpisodeWithUserInfo | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/admin/novel-episode");
        const data = await response.json();

        const episodesData = data.data;

        if (response.ok) {
          const formattedData = episodesData.map(
            (episode: EpisodeWithUserInfo) => ({
              ...episode,
              statusLabel:
                EPISODE_STATUS.find((status) => status.value === episode.status)
                  ?.label || episode.status,
            })
          );

          setNovelEpisodes(formattedData);
        }
      } catch {
        throw new Error("데이터를 가져오는 데 실패했습니다.");
      }
    };

    fetchData();
  }, []);

  const handleReviewButtonClick = (ep: EpisodeWithUserInfo) => {
    setSelectedEpisode(ep);
    openModal();
  };

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
            <th>등록 일자</th>
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
                <td>{new Date(episode.createdAt).toLocaleString()}</td>
                <StatusText status={episode.status}>
                  {episode.statusLabel}
                  {episode.status === "pending" && (
                    <Button
                      buttonSize="small"
                      backgroudColor="primary"
                      onClick={() => handleReviewButtonClick(episode)}
                    >
                      검토하러 가기
                    </Button>
                  )}
                </StatusText>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>데이터가 없습니다.</td>
            </tr>
          )}
        </tbody>
      </Table>
      {isOpen && selectedEpisode && (
        <Modal>
          <ModalContentWrapper>
            <h3>에피소드 검토하기</h3>
            <p>
              <strong>소설 제목: </strong> {selectedEpisode.novelTitle}
            </p>
            <p>
              <strong>에피소드 제목: </strong> {selectedEpisode.episodeTitle}
            </p>
            <div className="episode-content">
              <p>
                <strong>내용: </strong> {selectedEpisode.episodeContent}
              </p>
            </div>
            <ButtonWrapper>
              <Button buttonSize="big" backgroudColor="white" onClick={onClose}>
                취소
              </Button>
              <Button buttonSize="big" backgroudColor="primary">
                검토 완료
              </Button>
            </ButtonWrapper>
          </ModalContentWrapper>
        </Modal>
      )}
    </AdminMain>
  );
};

export default Page;
