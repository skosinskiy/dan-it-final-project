package com.danit.finalproject.application.service.place;

import com.danit.finalproject.application.entity.place.PlacePhoto;
import com.danit.finalproject.application.repository.place.PlacePhotoRepository;
import com.danit.finalproject.application.repository.place.PlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlacePhotoService {

  private PlacePhotoRepository placePhotoRepository;
  private PlaceRepository placeRepository;

  @Autowired
  public PlacePhotoService(PlacePhotoRepository placePhotoRepository, PlaceRepository placeRepository) {
    this.placePhotoRepository = placePhotoRepository;
    this.placeRepository = placeRepository;
  }

  public PlacePhoto getPlacePhotoById(Long placeId) {
    return placePhotoRepository.findById(placeId).orElse(null);
  }

  public PlacePhoto createNewPlacePhoto(PlacePhoto placePhoto, Long placeId) {
    placePhoto.setPlace(placeRepository.findById(placeId).orElse(null));
    return placePhotoRepository.save(placePhoto);
  }

  public void deletePlacePhoto(Long photoId) {
    placePhotoRepository.deleteById(photoId);
  }
}
