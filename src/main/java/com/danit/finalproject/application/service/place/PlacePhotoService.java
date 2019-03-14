package com.danit.finalproject.application.service.place;

import com.danit.finalproject.application.entity.place.PlacePhoto;
import com.danit.finalproject.application.repository.place.PlacePhotoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlacePhotoService {
  private PlacePhotoRepository placePhotoRepository;

  @Autowired
  public PlacePhotoService(PlacePhotoRepository placePhotoRepository) {
    this.placePhotoRepository = placePhotoRepository;
  }

  public void createNewPlacePhoto(PlacePhoto placePhoto) {
    placePhotoRepository.save(placePhoto);
  }

  public void deletePlacePhoto(Long id) {
    placePhotoRepository.deleteById(id);
  }
}
