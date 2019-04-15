package com.danit.finalproject.application.service.place;

import com.danit.finalproject.application.entity.place.PlacePhoto;
import com.danit.finalproject.application.repository.place.PlacePhotoRepository;
import com.danit.finalproject.application.service.AmazonS3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PlacePhotoService {

  private PlacePhotoRepository placePhotoRepository;
  private AmazonS3Service amazonS3Service;

  @Autowired
  public PlacePhotoService(
      PlacePhotoRepository placePhotoRepository,
      AmazonS3Service amazonS3Service) {
    this.placePhotoRepository = placePhotoRepository;
    this.amazonS3Service = amazonS3Service;
  }

  public PlacePhoto getPlacePhotoById(Long placeId) {
    return placePhotoRepository.findById(placeId).orElse(null);
  }

  @Transactional
  public PlacePhoto deletePlacePhoto(PlacePhoto placePhoto) {
    placePhotoRepository.delete(placePhoto);
    amazonS3Service.deleteObject(placePhoto.getImageKey());
    return placePhoto;
  }

}
