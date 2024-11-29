// GalleryModal.js
import React from "react";
import Gallery from "@/app/component/ui/Gallery/Gallery";
import { useDispatch, useSelector } from "react-redux";
import { setGalleryPressed } from "@/state/gallery/GalleryState";

const GalleryModal = ({ apartmentType }) => {
  const dispatch = useDispatch();
  const isGalleryPressed = useSelector((state) => state.gallery.isGalleryPressed);

  const closeGallery = () => {
    dispatch(setGalleryPressed(false));
  };

  return (
    <Gallery
      apartmentType={apartmentType}
      isOpen={isGalleryPressed}
      onClose={closeGallery}
    />
  );
};

export default GalleryModal;
