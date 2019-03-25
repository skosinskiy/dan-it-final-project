package com.danit.finalproject.application.controller.place;

import com.danit.finalproject.application.dto.request.place.PlacePhotoRequest;
import com.danit.finalproject.application.dto.request.place.PlaceRequest;
import com.danit.finalproject.application.dto.response.place.PlaceResponse;
import com.danit.finalproject.application.facade.place.PlaceFacade;
import com.danit.finalproject.application.service.place.PlacePhotoService;
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
  private PlacePhotoService placePhotoService;
  private PlaceFacade placeFacade;

  @Autowired
  public PlaceController(PlacePhotoService placePhotoService, PlaceFacade placeFacade) {
    this.placePhotoService = placePhotoService;
    this.placeFacade = placeFacade;
  }

  @GetMapping("{id}")
  public PlaceResponse getPlaceById(@PathVariable("id") Long placeId) {
    return placeFacade.getById(placeId);
  }

  @GetMapping
  public List<PlaceResponse> getAllPlaces() {
    return placeFacade.getAll();
  }

  @PostMapping
  public PlaceResponse createNewPlace(@RequestBody PlaceRequest placeRequest) {
    return placeFacade.create(placeRequest);
  }

  @PutMapping("{id}")
  public PlaceResponse updatePlace(@RequestBody PlaceRequest placeRequest, @PathVariable Long id) {
    return placeFacade.update(id, placeRequest);
  }

  @DeleteMapping("{id}")
  public PlaceResponse deletePlace(@PathVariable("id") Long placeId) {
    return placeFacade.delete(placeId);
  }

  @PostMapping("/{placeId}/photos")
  public PlaceResponse addPhotosToPlace(
      @RequestBody PlacePhotoRequest placePhotoRequest,
      @PathVariable("placeId") Long placeId) {
    return placeFacade.addPhoto(placePhotoRequest, placeId);
  }

  @DeleteMapping("/{placeId}/photos/{photoId}")
  public void deletePhoto(@PathVariable Long photoId) {
    placePhotoService.deletePlacePhoto(photoId);
  }
}
