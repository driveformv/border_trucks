"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

interface Image {
  id: string;
  url: string;
  isPrimary: boolean;
  caption?: string;
}

interface ImageGalleryProps {
  images: Image[];
  title: string;
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  if (!images?.length) return null;

  return (
    <div className="space-y-4">
      {/* Main Slider */}
      <div className="relative aspect-[16/9] w-full">
        <Swiper
          modules={[Navigation, Pagination, Thumbs]}
          navigation
          pagination={{ clickable: true }}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          className="h-full w-full rounded-lg"
        >
          {images.map((image) => (
            <SwiperSlide key={image.id}>
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={image.url}
                  alt={image.caption || title}
                  fill
                  className="object-cover"
                  priority={image.isPrimary}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Thumbnail Slider */}
      {images.length > 1 && (
        <div className="relative w-full">
          <Swiper
            modules={[Navigation, Thumbs]}
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            watchSlidesProgress
            className="thumbs-swiper"
          >
            {images.map((image) => (
              <SwiperSlide key={image.id}>
                <div className="relative aspect-[16/9] cursor-pointer rounded-lg overflow-hidden">
                  <Image
                    src={image.url}
                    alt={image.caption || title}
                    fill
                    className="object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}
