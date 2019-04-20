package com.danit.finalproject.application.controller.event;

import com.danit.finalproject.application.dto.request.event.EventPhotoRequest;
import com.danit.finalproject.application.dto.request.event.EventRequest;
import com.danit.finalproject.application.dto.response.event.EventResponse;
import com.danit.finalproject.application.dto.view.View;
import com.danit.finalproject.application.facade.event.EventFacade;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/events")
@JsonView(View.Event.class)
public class EventController {
  private EventFacade eventFacade;

  @Autowired
  public EventController(EventFacade eventFacade) {
    this.eventFacade = eventFacade;
  }

  @GetMapping("{id}")
  @JsonView(View.Event.class)
  public ResponseEntity<EventResponse> getEventById(@PathVariable("id") Long eventId) {
    return new ResponseEntity<>(eventFacade.getById(eventId), HttpStatus.OK);
  }

  @GetMapping
  @JsonView(View.Empty.class)
  public ResponseEntity<List<EventResponse>> getAllEventsByTitleOrBusinessTitleOrPlaceTitle(
      @RequestParam(required = false) String searchParam) {
    return new ResponseEntity<>(eventFacade.getAllEventsByTitleOrBusinessTitleOrPlaceTitle(searchParam), HttpStatus.OK);
  }

  @PostMapping
  @PreAuthorize("hasAuthority('MANAGE_EVENTS')")
  @JsonView(View.Event.class)
  public ResponseEntity<EventResponse> createNewEvent(@RequestBody EventRequest eventRequest) {
    return new ResponseEntity<>(eventFacade.create(eventRequest), HttpStatus.OK);
  }

  @PutMapping("{id}")
  @PreAuthorize("hasAuthority('MANAGE_EVENTS')")
  @JsonView(View.Event.class)
  public ResponseEntity<EventResponse> updateEvent(@PathVariable Long id, @RequestBody EventRequest eventRequest) {
    return new ResponseEntity<>(eventFacade.update(id, eventRequest), HttpStatus.OK);
  }

  @DeleteMapping("{id}")
  @PreAuthorize("hasAuthority('MANAGE_EVENTS')")
  @JsonView(View.Event.class)
  public ResponseEntity<EventResponse> deleteEvent(@PathVariable("id") Long eventId) {
    return new ResponseEntity<>(eventFacade.delete(eventId), HttpStatus.OK);
  }

  @PostMapping("/{eventId}/photos")
  @PreAuthorize("hasAuthority('MANAGE_EVENTS')")
  @JsonView(View.Event.class)
  public ResponseEntity<EventResponse> addPhotosToEvent(
      @RequestBody List<EventPhotoRequest> eventPhotos,
      @PathVariable("eventId") Long eventId) {
    return new ResponseEntity<>(eventFacade.createEventPhotos(eventPhotos, eventId), HttpStatus.OK);
  }

  @DeleteMapping("/{eventId}/photos/{photoId}")
  @PreAuthorize("hasAuthority('MANAGE_EVENTS')")
  @JsonView(View.Event.class)
  public ResponseEntity<EventResponse> deletePhoto(@PathVariable Long eventId, @PathVariable Long photoId) {
    return new ResponseEntity<>(eventFacade.deleteEventPhoto(eventId, photoId), HttpStatus.OK);
  }

}
