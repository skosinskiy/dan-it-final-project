package com.danit.finalproject.application.facade.place;

import com.danit.finalproject.application.dto.request.place.PlacePhotoRequest;
import com.danit.finalproject.application.dto.request.place.PlaceRequest;
import com.danit.finalproject.application.dto.response.place.PlaceResponse;
import com.danit.finalproject.application.entity.place.Place;
import com.danit.finalproject.application.entity.place.PlacePhoto;
import com.danit.finalproject.application.facade.AbstractDtoFacade;
import com.danit.finalproject.application.service.place.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PlaceFacade extends AbstractDtoFacade<Place, PlaceRequest, PlaceResponse> {

  private PlaceService placeService;

  @Autowired
  public PlaceFacade(
      PlaceService placeService) {
    this.placeService = placeService;
  }

  public PlaceResponse addPhoto(PlacePhotoRequest placePhotoRequest, Long placeId) {
    PlacePhoto placePhoto = modelMapper.map(placePhotoRequest, PlacePhoto.class);
    Place updatedPlace = placeService.addPhoto(placePhoto, placeId);
    return mapEntityToResponseDto(updatedPlace);
  }
}
