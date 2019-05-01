package com.danit.finalproject.application.facade.place;

import com.danit.finalproject.application.dto.request.place.PlaceMessageRequest;
import com.danit.finalproject.application.dto.response.place.PlaceMessageResponse;
import com.danit.finalproject.application.entity.place.PlaceMessage;
import com.danit.finalproject.application.facade.AbstractDtoFacade;
import com.danit.finalproject.application.service.place.PlaceMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PlaceMessageFacade extends AbstractDtoFacade<PlaceMessage, PlaceMessageRequest, PlaceMessageResponse> {
  private PlaceMessageService placeMessageService;

  @Autowired
  public PlaceMessageFacade(PlaceMessageService placeMessageService) {
    this.placeMessageService = placeMessageService;
  }

//  public PlaceMessageResponse addPlaceMessage(PlaceMessageRequest placeMessageRequest, Long placeMessageId) {
//    PlaceMessage placeMessage = modelMapper.map(placeMessageRequest, PlaceMessage.class);
//    Chat chat = chatService.addNewMessage(chatMessage, chatId);
//    return mapEntityToResponseDto(chat);
//  }

  public PlaceMessageResponse getByPlaceId(Long placeId) {
    PlaceMessage placeMessage = placeMessageService.getByPlaceId(placeId);
    return mapEntityToResponseDto(placeMessage);
  }

  public PlaceMessageResponse deleteById(Long id) {
    PlaceMessage placeMessage = placeMessageService.deleteById(id);
    return mapEntityToResponseDto(placeMessage);
  }

  public PlaceMessageResponse addPlaceMessage(PlaceMessageRequest placeMessageRequest) {
    PlaceMessage placeMessage = placeMessageService.create(mapRequestDtoToEntity(placeMessageRequest));
    return mapEntityToResponseDto(placeMessage);
  }
}
