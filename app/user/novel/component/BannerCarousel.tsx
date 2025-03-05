"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import styled from "styled-components";

interface Banner {
  id: number;
  src: string;
  alt: string;
}

const banners: Banner[] = [
  { id: 1, src: "/banner/badBoyBanner.svg", alt: "배너 1" },
  { id: 2, src: "/banner/napoliBanner.svg", alt: "배너 2" },
  { id: 3, src: "/banner/manimBanner.svg", alt: "배너 3" },
];

const BannerWrapper = styled.div`
  width: 100%;
  margin: 20px auto;
`;

const StyledImage = styled.img`
  width: 100%;
  object-fit: cover;
`;

const BannerCarousel = () => {
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
          <SwiperSlide key={banner.id}>
            <StyledImage src={banner.src} alt={banner.alt} />
          </SwiperSlide>
        ))}
      </Swiper>
    </BannerWrapper>
  );
};

export default BannerCarousel;
