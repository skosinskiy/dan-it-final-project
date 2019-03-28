package com.danit.finalproject.application.service.place;

import com.danit.finalproject.application.entity.place.PlacePhoto;
import com.danit.finalproject.application.repository.place.PlacePhotoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlacePhotoService {

  private PlacePhotoRepository placePhotoRepository;

  @Autowired
  public PlacePhotoService(PlacePhotoRepository placePhotoRepository) {
    this.placePhotoRepository = placePhotoRepository;
  }

  public PlacePhoto getPlacePhotoById(Long placeId) {
    return placePhotoRepository.findById(placeId).orElse(null);
  }

  public PlacePhoto deletePlacePhoto(PlacePhoto placePhoto) {
    placePhotoRepository.delete(placePhoto);
    return placePhoto;
  }

}
