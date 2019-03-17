package com.danit.finalproject.application.repository.place;

import com.danit.finalproject.application.entity.place.Place;
import com.danit.finalproject.application.entity.place.PlacePhoto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlacePhotoRepository extends JpaRepository<PlacePhoto, Long> {
  PlacePhoto deletePlacePhotoByIdAndPhoto(Long photoId, Place place);

  PlacePhoto getByIdAndPlace(Long photoId, Place place);
}
