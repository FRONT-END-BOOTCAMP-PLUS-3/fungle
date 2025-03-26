"use client";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CommunityPostSkeleton = () => {
  return (
    <SkeletonTheme
      baseColor="var(--gray-300)"
      highlightColor="var(--gray-100)"
      height={200}
    >
      <div
        style={{
          borderTop: "0.0625rem solid var(--gray-300)",
          borderBottom: "0.0625rem solid var(--gray-300)",

          padding: "0.5rem",
          marginBottom: "1rem",
        }}
      >
        <Skeleton width={60} height={24} style={{ borderRadius: "0.75rem" }} />

        <Skeleton height={20} width="60%" />

        <Skeleton height={16} width="80%" />

        <div
          style={{
            display: "flex",
            gap: "0.625rem",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "0.625rem",
            }}
          >
            <Skeleton width={20} height={16} />

            <Skeleton width={20} height={16} />
          </div>
          <div
            style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}
          >
            <Skeleton circle width={20} height={20} />
            <Skeleton circle width={20} height={20} />
            <Skeleton circle width={20} height={20} />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default CommunityPostSkeleton;
