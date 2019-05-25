package com.danit.finalproject.application.facade.place;

import com.danit.finalproject.application.dto.request.place.PlaceMessageRequest;
import com.danit.finalproject.application.dto.response.place.PlaceMessageResponse;
import com.danit.finalproject.application.entity.place.PlaceMessage;
import com.danit.finalproject.application.facade.AbstractDtoFacade;
import com.danit.finalproject.application.service.place.PlaceMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PlaceMessageFacade extends AbstractDtoFacade<PlaceMessage, PlaceMessageRequest, PlaceMessageResponse> {
  private PlaceMessageService placeMessageService;

  @Autowired
  public PlaceMessageFacade(PlaceMessageService placeMessageService) {
    this.placeMessageService = placeMessageService;
  }

  public List<PlaceMessageResponse> getAllByParam(Long placeId) {
    List<PlaceMessage> placeMessages = placeMessageService.getAllByParam(placeId);
    return mapEntityListToResponseDtoList(placeMessages);
  }

  public PlaceMessageResponse create(PlaceMessageRequest placeMessageRequest, Long placeId) {
    PlaceMessage placeMessage = placeMessageService.create(mapRequestDtoToEntity(placeMessageRequest), placeId);
    return mapEntityToResponseDto(placeMessage);
  }
}
