package com.danit.finalproject.application.facade.place;

import com.danit.finalproject.application.dto.request.place.PlaceCategoryRequestDto;
import com.danit.finalproject.application.dto.response.place.PlaceCategoryResponseDto;
import com.danit.finalproject.application.entity.place.PlaceCategory;
import com.danit.finalproject.application.facade.AbstractDtoFacade;
import org.springframework.stereotype.Component;

@Component
public class PlaceCategoryFacade extends
    AbstractDtoFacade<PlaceCategory, PlaceCategoryRequestDto, PlaceCategoryResponseDto> {
}
