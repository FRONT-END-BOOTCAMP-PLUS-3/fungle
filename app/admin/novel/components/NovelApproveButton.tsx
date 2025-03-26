import { EpisodeWithUserInfo } from "@/application/usecases/novel/dto/EpisodeWithUserInfo";
import Button from "@/components/button/Button";
import { useAdminNovelStore } from "@/store/useAdminNovelStore";
import { useModalStore } from "@/store/useModalStore";

const NovelApproveButton = ({ episodeId }: { episodeId: number }) => {
  const { onClose } = useModalStore();
  const { setEpisodes } = useAdminNovelStore();

  const handleButtonClick = async () => {
    try {
      const response = await fetch(`/api/admin/novel-episode/${episodeId}`, {
        method: "PATCH",
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        setEpisodes((prevEpisodes: EpisodeWithUserInfo[]) => {
          return prevEpisodes.map((episode: EpisodeWithUserInfo) =>
            episode.episodeId === episodeId
              ? { ...episode, status: "approved", statusLabel: "등록 완료" }
              : episode
          );
        });
        onClose();
      } else {
        alert(data.error || "에피소드 등록에 실패했습니다.");
      }
    } catch {
      alert("에피소드 등록 중 오류가 발생했습니다.");
    }
  };
  return (
    <Button
      buttonSize="big"
      backgroudColor="primary"
      onClick={handleButtonClick}
    >
      검토 완료
    </Button>
  );
};

export default NovelApproveButton;
