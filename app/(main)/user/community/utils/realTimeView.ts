export const realTimeView = (createdAt: Date) => {
  const now = new Date();
  const date = new Date(createdAt);
  const dif = now.getTime() - date.getTime();

  const seconds = Math.floor(dif / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return "방금 전";
  }

  if (minutes < 60) {
    return `${minutes}분 전`;
  }

  if (hours < 24) {
    return `${hours}시간 전`;
  }

  if (days < 7) {
    return `${days}일 전`;
  }

  return date.toLocaleDateString();
};
