package com.danit.finalproject.application.controller.event;

import com.danit.finalproject.application.dto.request.event.EventPhotoRequest;
import com.danit.finalproject.application.dto.request.event.EventRequest;
import com.danit.finalproject.application.dto.response.event.EventResponse;
import com.danit.finalproject.application.facade.event.EventFacade;
import com.danit.finalproject.application.service.event.EventPhotoService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
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
public class EventController {
  private EventFacade eventFacade;
  private EventPhotoService eventPhotoService;

  @Autowired
  public EventController(EventFacade eventFacade, EventPhotoService eventPhotoService) {
    this.eventFacade = eventFacade;
    this.eventPhotoService = eventPhotoService;
  }

  @GetMapping("{id}")
  public EventResponse getEventById(@PathVariable("id") Long eventId) {
    return eventFacade.getById(eventId);
  }

  @GetMapping
  public List<EventResponse> getAllBusinesses(
      @RequestParam("place") Long placeId,
      @RequestParam("business") Long businessId) {
    return eventFacade.getEvents(placeId, businessId);
  }

  @PostMapping
  public EventResponse createNewEvent(@RequestBody EventRequest eventRequest) {
    return eventFacade.create(eventRequest);
  }

  @PutMapping("{id}")
  public EventResponse updateEvent(@PathVariable Long id, @RequestBody EventRequest eventRequest) {
    return eventFacade.update(id, eventRequest);
  }

  @DeleteMapping("{id}")
  public EventResponse deleteEvent(@PathVariable("id") Long eventId) {
    return eventFacade.delete(eventId);
  }

  @PostMapping("/{eventId}/photos")
  public EventResponse addPhotosToEvent(
      @RequestBody EventPhotoRequest eventPhotoRequest,
      @PathVariable Long eventId) {
    return eventFacade.addPhoto(eventPhotoRequest, eventId);
  }

  @DeleteMapping("/{eventId}/photos/{photoId}")
  public void deletePhoto(@PathVariable("photoId") Long photoId) {
    eventPhotoService.deleteEventPhoto(photoId);
  }

}
