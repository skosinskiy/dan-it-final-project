package com.danit.finalproject.application.controller.place;

import com.danit.finalproject.application.dto.request.place.PlacePhotoRequestDto;
import com.danit.finalproject.application.dto.request.place.PlaceRequestDto;
import com.danit.finalproject.application.dto.response.place.PlaceResponseDto;
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
  public PlaceResponseDto getPlaceById(@PathVariable("id") Long placeId) {
    return placeFacade.getById(placeId);
  }

  @GetMapping
  public List<PlaceResponseDto> getAllPlaces() {
    return placeFacade.getAll();
  }

  @PostMapping
  public PlaceResponseDto createNewPlace(@RequestBody PlaceRequestDto placeRequestDto) {
    return placeFacade.create(placeRequestDto);
  }

  @PutMapping("{id}")
  public PlaceResponseDto updatePlace(@RequestBody PlaceRequestDto placeRequestDto, @PathVariable Long id) {
    return placeFacade.update(id, placeRequestDto);
  }

  @DeleteMapping("{id}")
  public PlaceResponseDto deletePlace(@PathVariable("id") Long placeId) {
    return placeFacade.delete(placeId);
  }

  @PostMapping("/{placeId}/photos")
  public PlaceResponseDto addPhotosToPlace(
      @RequestBody PlacePhotoRequestDto placePhotoRequestDto,
      @PathVariable("placeId") Long placeId) {
    return placeFacade.addPhoto(placePhotoRequestDto, placeId);
  }

  @DeleteMapping("/{placeId}/photos/{photoId}")
  public void deletePhoto(@PathVariable Long photoId) {
    placePhotoService.deletePlacePhoto(photoId);
  }
}
