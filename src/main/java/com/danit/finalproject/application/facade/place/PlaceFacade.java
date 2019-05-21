package com.danit.finalproject.application.facade.place;

import com.danit.finalproject.application.dto.request.place.PlacePhotoRequest;
import com.danit.finalproject.application.dto.request.place.PlaceRequest;
import com.danit.finalproject.application.dto.response.place.PlaceResponse;
import com.danit.finalproject.application.entity.place.Place;
import com.danit.finalproject.application.entity.place.PlacePhoto;
import com.danit.finalproject.application.facade.AbstractDtoFacade;
import com.danit.finalproject.application.service.place.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class PlaceFacade extends AbstractDtoFacade<Place, PlaceRequest, PlaceResponse> {

  private PlaceService placeService;

  @Autowired
  public PlaceFacade(
      PlaceService placeService) {
    this.placeService = placeService;
  }

  public PlaceResponse createPlacePhotos(List<PlacePhotoRequest> placePhotosRequest, Long placeId) {
    List<PlacePhoto> placePhotos = placePhotosRequest
        .stream()
        .map(placePhotoRequest -> modelMapper.map(placePhotoRequest, PlacePhoto.class))
        .collect(Collectors.toList());
    Place updatedPlace = placeService.createPlacePhotos(placePhotos, placeId);
    return mapEntityToResponseDto(updatedPlace);
  }

  public PlaceResponse deletePlacePhoto(Long placeId, Long photoId) {
    Place place = placeService.deletePlacePhoto(placeId, photoId);
    return mapEntityToResponseDto(place);
  }

  public Page<PlaceResponse> getAllPlacesByParam(String param, Pageable pageable) {
    Page<Place> places = placeService.getAllPlacesByParam(param, pageable);
    return mapEntityListToResponseDtoList(places);
  }
}
