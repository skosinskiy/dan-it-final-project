package com.danit.finalproject.application.controller.place;

import com.danit.finalproject.application.entity.place.Place;
import com.danit.finalproject.application.entity.place.PlacePhoto;
import com.danit.finalproject.application.service.place.PlacePhotoService;
import com.danit.finalproject.application.service.place.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/places")
public class PlaceController {
  private PlaceService placeService;
  private PlacePhotoService placePhotoService;

  @Autowired
  public PlaceController(PlaceService placeService, PlacePhotoService placePhotoService) {
    this.placeService = placeService;
    this.placePhotoService = placePhotoService;
  }

  @GetMapping("{id}")
  public Place getPlaceById(@PathVariable("id") Long placeId) {
    return placeService.getPlaceById(placeId);
  }

  @GetMapping
  public List<Place> getAllPlaces() {
    return placeService.findAll();
  }

  @PostMapping
  public Place createNewPlace(@RequestBody Place place) {
    return placeService.createNewPlace(place);
  }

  @PutMapping("{id}")
  public Place updatePlace(@PathVariable("id") Long placeId, @RequestBody Place place) {
    return placeService.updatePlace(place, placeId);
  }

  @DeleteMapping("{id}")
  public Place deletePlace(@PathVariable("id") Long placeId) {
    return placeService.deletePlace(placeId);
  }

  @PostMapping("/{placeId}/photos")
  public PlacePhoto addPhotosToPlace(@RequestBody PlacePhoto placePhoto, @PathVariable("placeId") Long placeId) {
    return placePhotoService.createNewPlacePhoto(placePhoto, placeId);
  }

  @DeleteMapping("/{placeId}/photos/{photoId}")
  public void deletePhoto(@PathVariable("photoId") Long photoId ) {
    placePhotoService.deletePlacePhoto(photoId);
  }
}
