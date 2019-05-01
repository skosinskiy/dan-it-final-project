package com.danit.finalproject.application.controller.place;

import com.danit.finalproject.application.dto.request.place.PlaceMessageRequest;
import com.danit.finalproject.application.dto.response.place.PlaceMessageResponse;
import com.danit.finalproject.application.facade.place.PlaceMessageFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/messages")
@RestController
public class PlaceMessageController {
  private PlaceMessageFacade placeMessageFacade;

  @Autowired
  public PlaceMessageController(PlaceMessageFacade placeMessageFacade) {
    this.placeMessageFacade = placeMessageFacade;
  }

  @GetMapping("{place_id}")
  public ResponseEntity<PlaceMessageResponse> getPlaceMessageById(@PathVariable Long placeId) {
    return new ResponseEntity<>(placeMessageFacade.getByPlaceId(placeId), HttpStatus.OK);
  }

  @DeleteMapping("{id}")
  public ResponseEntity<PlaceMessageResponse> deletePlaceMessageById(@PathVariable Long id) {
    return new ResponseEntity<>(placeMessageFacade.deleteById(id), HttpStatus.OK);
  }

  @PostMapping
  public ResponseEntity<PlaceMessageResponse> createNewPlaceMessage(@RequestBody PlaceMessageRequest placeMessage) {
    return new ResponseEntity<>(placeMessageFacade.addPlaceMessage(placeMessage), HttpStatus.OK);
  }
}
