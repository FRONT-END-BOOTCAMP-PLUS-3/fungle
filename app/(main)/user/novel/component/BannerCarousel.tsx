"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import {
  BannerWrapper,
  StyledImage,
} from "@/app/(main)/user/novel/component/BannerCorousel.styled";

interface Banner {
  id: number;
  bannerImage: string;
}

const BannerCarousel = () => {
  const router = useRouter();
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch("/api/novel/banner");
        if (!response.ok) throw new Error("Failed to fetch banners");

        const data = await response.json();
        setBanners(data.banners);
      } catch (error) {
        throw new Error("배너 불러오기 에러");
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  if (loading) return <p>배너를 불러오는 중...</p>;

  return (
    <BannerWrapper>
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Autoplay]}
      >
        {banners.map((banner) => (
          <SwiperSlide
            key={banner.id}
            onClick={() => router.push(`/user/novel/${banner.id}`)}
          >
            <StyledImage src={banner.bannerImage} alt={`배너 ${banner.id}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </BannerWrapper>
  );
};

export default BannerCarousel;
