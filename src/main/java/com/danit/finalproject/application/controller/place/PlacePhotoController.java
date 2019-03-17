package com.danit.finalproject.application.controller.place;

import com.danit.finalproject.application.entity.place.PlacePhoto;
import com.danit.finalproject.application.service.place.PlacePhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/places/{placeId}/photos")
public class PlacePhotoController {
  private PlacePhotoService placePhotoService;

  @Autowired
  public PlacePhotoController(PlacePhotoService placePhotoService) {
    this.placePhotoService = placePhotoService;
  }

  @PostMapping
  public void addPhotosToPlace(@RequestBody PlacePhoto placePhoto, @PathVariable("placeId") Long placeId) {
    placePhotoService.createNewPlacePhoto(placePhoto, placeId);
  }

  @DeleteMapping("/photoId")
  public void deletePhoto(@PathVariable("placeId") Long placeId, @PathVariable("photoId") Long photoId) {
    placePhotoService.deletePlacePhoto(photoId, placeId);
  }
}
