package com.danit.finalproject.application.controller.place;

import com.danit.finalproject.application.dto.request.place.PlacePhotoRequest;
import com.danit.finalproject.application.dto.request.place.PlaceRequest;
import com.danit.finalproject.application.dto.response.place.PlaceResponse;
import com.danit.finalproject.application.facade.place.PlaceFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
  private PlaceFacade placeFacade;

  @Autowired
  public PlaceController(PlaceFacade placeFacade) {
    this.placeFacade = placeFacade;
  }

  @GetMapping("{id}")
  public ResponseEntity<PlaceResponse> getPlaceById(@PathVariable("id") Long placeId) {
    return new ResponseEntity<>(placeFacade.getById(placeId), HttpStatus.OK);
  }

  @GetMapping
  public ResponseEntity<List<PlaceResponse>> getAllPlaces() {
    return new ResponseEntity<>(placeFacade.getAll(), HttpStatus.OK);
  }

  @PostMapping
  public ResponseEntity<PlaceResponse> createNewPlace(@RequestBody PlaceRequest placeRequest) {
    return new ResponseEntity<>(placeFacade.create(placeRequest), HttpStatus.OK);
  }

  @PutMapping("{id}")
  @PreAuthorize("hasAuthority('MANAGE_PLACES')")
  public ResponseEntity<PlaceResponse> updatePlace(@RequestBody PlaceRequest placeRequest, @PathVariable Long id) {
    return new ResponseEntity<>(placeFacade.update(id, placeRequest), HttpStatus.OK);
  }

  @DeleteMapping("{id}")
  @PreAuthorize("hasAuthority('MANAGE_PLACES')")
  public ResponseEntity<PlaceResponse> deletePlace(@PathVariable("id") Long placeId) {
    return new ResponseEntity<>(placeFacade.delete(placeId), HttpStatus.OK);
  }

  @PostMapping("/{placeId}/photos")
  @PreAuthorize("hasAuthority('MANAGE_PLACES')")
  public ResponseEntity<PlaceResponse> addPhotosToPlace(
      @RequestBody PlacePhotoRequest placePhotoRequest,
      @PathVariable("placeId") Long placeId) {
    return new ResponseEntity<>(placeFacade.addPhoto(placePhotoRequest, placeId), HttpStatus.OK);
  }

  @DeleteMapping("/{placeId}/photos/{photoId}")
  @PreAuthorize("hasAuthority('MANAGE_PLACES')")
  public ResponseEntity<PlaceResponse> deletePhoto(@PathVariable Long placeId, @PathVariable Long photoId) {
    return new ResponseEntity<>(placeFacade.deletePlacePhoto(placeId, photoId), HttpStatus.OK);
  }
}
