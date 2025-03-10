"use client";

import React, { useEffect, useState } from "react";
import CommunityPostSkeleton from "./components/CommunityPostSkeleton";

const Loading = () => {
  const [skeletonCount, setSkeletonCount] = useState(0);

  useEffect(() => {
    const itemHeight = 200;

    const screenHeight = window.innerHeight;

    const itemsNeeded = Math.ceil(screenHeight / itemHeight);
    setSkeletonCount(itemsNeeded);
  }, []);

  return (
    <div style={{ overflow: "hidden" }}>
      {Array.from({ length: skeletonCount }).map((_, i) => (
        <CommunityPostSkeleton key={i} />
      ))}
    </div>
  );
};

export default Loading;
