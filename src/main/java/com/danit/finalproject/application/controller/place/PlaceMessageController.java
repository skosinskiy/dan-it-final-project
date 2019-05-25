package com.danit.finalproject.application.controller.place;

import com.danit.finalproject.application.dto.request.place.PlaceMessageRequest;
import com.danit.finalproject.application.dto.response.place.PlaceMessageResponse;
import com.danit.finalproject.application.dto.view.View;
import com.danit.finalproject.application.facade.place.PlaceMessageFacade;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/api/place-messages")
@RestController
public class PlaceMessageController {
  private PlaceMessageFacade placeMessageFacade;

  @Autowired
  public PlaceMessageController(PlaceMessageFacade placeMessageFacade) {
    this.placeMessageFacade = placeMessageFacade;
  }

  @GetMapping
  @JsonView(View.Chat.class)
  public ResponseEntity<List<PlaceMessageResponse>> getAllPlaceMessages(@RequestParam(required = false) Long placeId) {
    return new ResponseEntity<>(placeMessageFacade.getAllByParam(placeId), HttpStatus.OK);
  }

  @DeleteMapping("{placeMessageId}")
  @JsonView(View.Chat.class)
  public ResponseEntity<PlaceMessageResponse> deletePlaceMessage(@PathVariable Long placeMessageId) {
    return new ResponseEntity<>(placeMessageFacade.delete(placeMessageId), HttpStatus.OK);
  }

  @PostMapping("place/{placeId}")
  @JsonView(View.Chat.class)
  public ResponseEntity<PlaceMessageResponse> createNewPlaceMessage(
      @RequestBody PlaceMessageRequest placeMessage,
      @PathVariable Long placeId
  ) {
    return new ResponseEntity<>(placeMessageFacade.create(placeMessage, placeId), HttpStatus.OK);
  }
}
