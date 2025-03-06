import Link from "next/link";
import Image from "next/image";
import {
  ArrowWrapper,
  ButtonWrapper,
  EpisodeList,
  EpisodeStatus,
  EpisodeWrapper,
  ProfileNovelItem,
} from "./ProfileNovelList.styled";
import { useEffect, useRef, useState } from "react";
import Button from "@/components/button/Button";
import { NovelEpisodesByUserIdDto } from "@/application/usecases/novel/dto/NovelEpisodesByUserId";
import { NovelsByUserIdDto } from "@/application/usecases/novel/dto/NovelsByUserId";
import StatusUpdateButton from "./StatusUpdateButton";

const ProfileNovelList = () => {
  const [isOpenMap, setIsOpenMap] = useState<{ [key: string]: boolean }>({});
  const [novels, setNovels] = useState<
    (NovelsByUserIdDto & { episodes: NovelEpisodesByUserIdDto[] })[]
  >([]);

  const episodeListRefs = useRef<{ [key: number]: HTMLUListElement | null }>(
    {}
  );

  useEffect(() => {
    const fetchNovelData = async () => {
      const response = await fetch("/api/user/novel", {
        method: "GET",
      });

      const data = await response.json();
      const formattedData = data.novels.map((novel: NovelsByUserIdDto) => ({
        ...novel,
        createdAt: new Date(novel.createdAt).toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
      }));

      setNovels(formattedData);
    };

    fetchNovelData();
  }, []);

  const toggleOpen = (novelId: number) => {
    setIsOpenMap((prev) => {
      const newState = {
        ...prev,
        [novelId]: !prev[novelId],
      };

      if (!prev[novelId]) {
        setTimeout(() => {
          episodeListRefs.current[novelId]?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      }

      return newState;
    });
  };

  const handleDeleteClick = async (novelId: number) => {
    const isConfirmed = confirm("해당 소설을 삭제하시겠습니까?");
    if (!isConfirmed) return;

    try {
      const response = await fetch("/api/user/novel", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ novelId }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "소설 삭제에 실패했습니다.");
        return;
      }

      alert(data.message);
      setNovels((prevNovels) =>
        prevNovels.filter((novel) => novel.id !== novelId)
      );
    } catch (error) {
      if (error instanceof Error) {
        alert("소설 삭제에 실패했습니다.");
      }
    }
  };

  const handleStatusUpdate = async (novelId: number, status: string) => {
    try {
      const response = await fetch("/api/user/novel", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ novelId, status }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "연재 상태 변경에 실패했습니다.");
        return false;
      }

      setNovels((prevNovels) =>
        prevNovels.map((novel) =>
          novel.id === novelId ? { ...novel, serialStatus: status } : novel
        )
      );
      return true;
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert("연재 상태 변경에 실패했습니다.");
        return false;
      }
    }
    return false;
  };

  return (
    <div>
      {novels.map((novel) => (
        <div key={novel.id}>
          <ProfileNovelItem key={novel.id}>
            <div className="novel-wrapper">
              <Image
                src={novel.image || "/image/book.svg"}
                alt={novel.title}
                width={80}
                height={80}
                className="episode-img"
              />
              <div className="novel-title-status">
                <div className="episode-info">
                  <div className="novel-title">
                    <Link href={`/user/novel/${novel.id}`} passHref>
                      <p className="episode-title">{novel.title}</p>
                    </Link>
                    <ArrowWrapper
                      onClick={() => toggleOpen(novel.id)}
                      $isOpen={!!isOpenMap[novel.id]}
                    >
                      <Image
                        src={"/icon/dropdown_arrow.svg"}
                        alt="소설 검토 상태 확인"
                        width={12}
                        height={6}
                      />
                    </ArrowWrapper>
                  </div>
                </div>
                <div className="novel-manage">
                  <p className="episode-date">{novel.createdAt.toString()}</p>
                  <ButtonWrapper>
                    <StatusUpdateButton
                      currentStatus={novel.serialStatus}
                      onUpdateStatus={(newStatus) =>
                        handleStatusUpdate(novel.id, newStatus)
                      }
                    />
                    <Button
                      buttonSize="xsmall"
                      backgroudColor="leave"
                      onClick={() => handleDeleteClick(novel.id)}
                      disabled={novel.serialStatus === "completed"}
                    >
                      삭제
                    </Button>
                  </ButtonWrapper>
                </div>
              </div>
            </div>
          </ProfileNovelItem>

          {isOpenMap[novel.id] &&
            novel.episodes.map((episode, index) => (
              <EpisodeList
                ref={(el) => {
                  episodeListRefs.current[novel.id] = el;
                }}
                key={episode.id}
              >
                <EpisodeWrapper>
                  <li>
                    {index + 1}화 {episode.title}
                  </li>
                  <EpisodeStatus status={episode.status}>
                    {episode.statusLabel}
                  </EpisodeStatus>
                </EpisodeWrapper>
              </EpisodeList>
            ))}
        </div>
      ))}
    </div>
  );
};

export default ProfileNovelList;
