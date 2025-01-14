import React, { ChangeEvent, useRef, useState } from 'react';
import Cropper, { Area, Point } from 'react-easy-crop';

import ArrowIosBack from '@/../public/assets/components/ArrowIosBack';
import ArrowIosForward from '@/../public/assets/components/ArrowIosForward';
import { PhotoAspectRatioType, photoAspectRatios } from '@/entities';
import { useAppDispatch, useAppSelector } from '@/shared/lib';
import { clsx } from 'clsx';
import { Swiper as SwiperProps } from 'swiper';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import s from './CropAndScale.module.scss';

import { createPostActions, createPostSelectors } from '../../service/createPostSlice';
import { AddNewImgPanel } from './addNewImgPanel/AddNewImgPanel';
import { CropAndScalePanel } from './cropAndScalePanel/CropAndScalePanel';

type CropAndScaleSectionType = {
  errorMessage?: null | string;
  onSelectFile: (e: ChangeEvent<HTMLInputElement>) => void;
};

/**
 * Компонента СЕКЦИИ для обрезания и масштабирования картинки
 * @param {(e: ChangeEvent<HTMLInputElement>) => void} props.onSelectFile - обязательный параметр, функция для добавления изображения, которая передается в AddNewImgPanel
 * @description * Сохраняем индекс активной картинки карусели Swiper (используем тут) и передаем в AddNewImgPanel (чтобы в DropDown можно было переключаться по картинкам тоже)
 * * В Swiper отображаем Cropper компонентой от ReactEasyCrop котрая принимает crop область, aspect, zoom и функции для их изменения
 * * AddNewImgPanel - компонент для добавления новых изображений
 * * CropAndScalePanel - компонент для масштабирования и обрезания
 */
export const CropAndScale = (props: CropAndScaleSectionType) => {
  const { errorMessage, onSelectFile } = props;
  const dispatch = useAppDispatch();
  const allPostImages = useAppSelector(createPostSelectors.allPostImages);
  // Для передачи в slider с какой id картинки работаем
  const [currentIndex, setCurrentIndex] = useState(0);
  // Рефы для слайдера
  const nextRef = useRef<HTMLButtonElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<SwiperProps | null>(null);

  // * Блок хендлеров обрезки и масштабирования
  const onCropChange = ({ crop, id }: { crop: Point; id: string }) => {
    dispatch(createPostActions.setCrop({ crop, id }));
  };

  const onZoomChange = ({ id, zoom }: { id: string; zoom: number }) => {
    dispatch(createPostActions.setZoom({ id, zoom }));
  };

  const onAspectChange = ({ aspect, id }: { aspect: PhotoAspectRatioType; id: string }) => {
    if (aspect) {
      dispatch(createPostActions.setAspect({ aspect, id }));
      if (aspect.text === photoAspectRatios[0].text) {
        dispatch(createPostActions.setZoom({ id, zoom: 1 }));
        dispatch(createPostActions.setCrop({ crop: { x: 0, y: 0 }, id }));
      }
    }
  };

  const onCropComplete = (id: string) => (croppedArea: Area, croppedAreaPixels: Area) => {
    dispatch(
      createPostActions.setCroppedAreaPixels({
        croppedAreaPx: croppedAreaPixels,
        id
      })
    );
  };

  const cropperExtraStyles = {
    style: {
      containerStyle: {
        backgroundColor: '#4C4C4C', // '#D5DAE0'
        backgroundPosition: 'center'
      },
      cropAreaStyle: {
        border: 'none'
      }
    }
  };

  // * Блок хендлеров переключения слайдера

  const handleSwiperInit = (swiper: SwiperProps) => {
    swiperRef.current = swiper;
  };

  const handleSlideChange = (swiper: SwiperProps) => {
    // Передаем id картинки с которой работаем, когда свайпнулись
    setCurrentIndex(swiper.realIndex);
  };

  // Функция для переключения на слайд по индексу
  const handleSelectImageSwiper = (index: number) => {
    swiperRef.current?.slideTo(index);
  };

  const selectedImg = allPostImages[currentIndex];

  return (
    <div className={s.wrapper}>
      <div className={s.croppingBlock}>
        <Swiper
          navigation={{
            nextEl: `.${s.swiperButtonNext}`,
            prevEl: `.${s.swiperButtonPrev}`
          }}
          allowTouchMove={false}
          className={s.photosSwiper}
          key={allPostImages.length}
          modules={[Navigation]}
          onSlideChange={handleSlideChange}
          onSwiper={handleSwiperInit}
          touchStartPreventDefault={false}
        >
          {allPostImages.map((img) => (
            <SwiperSlide key={img.id}>
              <div className={s.cropperElement}>
                {/* ! ЭТО СПЕЦИАЛЬНО, из-за objectFit (не понятно почему подчеркивает красным, но все работает). Можно заменить на 'object-fit', тогда в консоли ошибка */}
                {/* @ts-ignore */}
                <Cropper
                  aspect={img.aspect.value}
                  crop={img.crop}
                  image={img.originUrl}
                  onCropChange={(crop) => onCropChange({ crop, id: img.id })}
                  onCropComplete={onCropComplete(img.id)}
                  onZoomChange={(zoom) => onZoomChange({ id: img.id, zoom })}
                  showGrid={false}
                  zoom={img.zoom}
                  {...cropperExtraStyles}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {allPostImages.length > 1 && (
          <>
            <button className={clsx(s.swiperButtonPrev, currentIndex === 0 && s.hidden)} ref={prevRef}>
              <ArrowIosBack />
            </button>
            <button
              className={clsx(s.swiperButtonNext, currentIndex === allPostImages.length - 1 && s.hidden)}
              ref={nextRef}
            >
              <ArrowIosForward />
            </button>
          </>
        )}
      </div>
      <div>
        <CropAndScalePanel
          id={selectedImg.id}
          onAspectChange={({ aspect }) => onAspectChange({ aspect, id: selectedImg.id })}
          onZoomChange={({ zoom }) => onZoomChange({ id: selectedImg.id, zoom })}
        />
      </div>
      <div className={s.addImg}>
        <AddNewImgPanel
          onSelectFile={onSelectFile}
          onSelectImageSwiper={handleSelectImageSwiper}
          swiperIndex={swiperRef.current?.realIndex}
        />
      </div>
    </div>
  );
};
