package com.danit.finalproject.application.service.place;

import com.danit.finalproject.application.entity.place.Place;
import com.danit.finalproject.application.entity.place.PlacePhoto;
import com.danit.finalproject.application.repository.place.PlacePhotoRepository;
import com.danit.finalproject.application.repository.place.PlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlacePhotoService {
  private PlacePhotoRepository placePhotoRepository;

  private PlaceRepository placeRepository;

  @Autowired
  public PlacePhotoService(PlacePhotoRepository placePhotoRepository) {
    this.placePhotoRepository = placePhotoRepository;
  }

  public PlacePhoto getPlacePhotoByIdAndPlace(Long photoId, Long placeId) {
    return placePhotoRepository.getByIdAndPlace(photoId, placeRepository.findById(placeId).orElse(null));
  }

  public PlacePhoto createNewPlacePhoto(PlacePhoto placePhoto, Long placeId) {
    placePhoto.setPlace(placeRepository.findById(placeId).orElse(null));
    return placePhotoRepository.save(placePhoto);
  }

  public PlacePhoto deletePlacePhoto(Long placePhotoId, Long placeId) {
    return placePhotoRepository.deletePlacePhotoByIdAndPhoto(placePhotoId, placeRepository.findById(placeId).orElse(null));
  }
}
