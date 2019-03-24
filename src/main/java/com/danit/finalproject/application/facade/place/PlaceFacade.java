package com.danit.finalproject.application.facade.place;

import com.danit.finalproject.application.dto.request.place.PlacePhotoRequestDto;
import com.danit.finalproject.application.dto.request.place.PlaceRequestDto;
import com.danit.finalproject.application.dto.response.place.PlaceResponseDto;
import com.danit.finalproject.application.entity.place.Place;
import com.danit.finalproject.application.entity.place.PlacePhoto;
import com.danit.finalproject.application.facade.AbstractDtoFacade;
import com.danit.finalproject.application.service.place.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PlaceFacade extends AbstractDtoFacade<Place, PlaceRequestDto, PlaceResponseDto> {

  private PlaceService placeService;

  @Autowired
  public PlaceFacade(
      PlaceService placeService) {
    this.placeService = placeService;
  }

  public PlaceResponseDto addPhoto(PlacePhotoRequestDto placePhotoRequestDto, Long placeId) {
    PlacePhoto placePhoto = modelMapper.map(placePhotoRequestDto, PlacePhoto.class);
    Place updatedPlace = placeService.addPhoto(placePhoto, placeId);
    return mapEntityToResponseDto(updatedPlace);
  }
}
