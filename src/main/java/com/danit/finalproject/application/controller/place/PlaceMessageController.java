package com.danit.finalproject.application.controller.place;

import com.danit.finalproject.application.dto.request.place.PlaceMessageRequest;
import com.danit.finalproject.application.dto.response.place.PlaceMessageResponse;
import com.danit.finalproject.application.entity.place.PlaceMessage;
import com.danit.finalproject.application.facade.place.PlaceMessageFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

public class PlaceMessageController {
  private PlaceMessageFacade placeMessageFacade;
//to do 3 methods: GET all messages by place_id, DELETE message by place_id, POST message by place_id
  @GetMapping("{place_id}")
  public ResponseEntity<PlaceMessageResponse> getPlaceMessageById(@PathVariable Long placeId) {
    return new ResponseEntity<>(placeMessageFacade.getByPlaceId(placeId), HttpStatus.OK);
  }
  @DeleteMapping("{id}")
  public ResponseEntity<PlaceMessageResponse> deletePlaceMessageById(@PathVariable Long placeId) {
    return new ResponseEntity<>(placeMessageFacade.deleteByPlaceId(placeId), HttpStatus.OK);
  }
//  @PostMapping("{chatId}/messages")
//  public ResponseEntity<PlaceMessageResponse> createNewPlaceMessage(@PathVariable("chatId") Long chatId, PlaceMessageRequest placeMessage) {
//    return new ResponseEntity<>(chatFacade.addChatMessage(chatMessage, chatId), HttpStatus.OK);
//  }
}
