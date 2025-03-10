"use client";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Loading = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Skeleton height={30} width={200} />

      <Skeleton height={20} width={150} style={{ marginRight: "10px" }} />
      <Skeleton height={20} width={100} />

      <br />

      <Skeleton width={330} height={100} />

      <Skeleton height={25} width={120} />

      <Skeleton height={40} width={"100%"} />

      <br />

      <div style={{ display: "flex", alignItems: "center" }}>
        <Skeleton circle height={40} width={40} />
        <div style={{ marginLeft: "10px" }}>
          <Skeleton height={15} width={100} />
          <Skeleton height={15} width={150} />
        </div>
      </div>

      <Skeleton count={2} height={15} />
    </div>
  );
};

export default Loading;
