package com.danit.finalproject.application.controller.event;

import com.danit.finalproject.application.entity.event.Event;
import com.danit.finalproject.application.entity.event.EventPhoto;
import com.danit.finalproject.application.service.event.EventPhotoService;
import com.danit.finalproject.application.service.event.EventService;
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

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {
  private EventService eventService;
  private EventPhotoService eventPhotoService;

  @Autowired
  public EventController(EventService eventService, EventPhotoService eventPhotoService) {
    this.eventService = eventService;
    this.eventPhotoService = eventPhotoService;
  }

  @GetMapping("{id}")
  public Event getEventById(@PathVariable("id") Long eventId) {
    return eventService.getEventById(eventId);
  }

  @GetMapping
  public List<Event> getAllBusinesses(@RequestParam("place") Long placeId, @RequestParam("business") Long businessId) {
    return eventService.findAllByLocation(placeId, businessId);
  }

  @PostMapping
  public Event createNewEvent(@RequestBody Event event) {
    return eventService.createNewEvent(event);
  }

  @PutMapping("{id}")
  public Event updateEvent(@RequestBody Event event) {
    return eventService.updateEvent(event);
  }

  @DeleteMapping("{id}")
  public void deleteEvent(@PathVariable("id") Long eventId) {
    eventService.deleteEvent(eventId);
  }

  @PostMapping("/{eventId}/photos")
  public EventPhoto addPhotosToEvent(@RequestBody EventPhoto eventPhoto, @PathVariable("eventId") Long eventId) {
    return eventPhotoService.createNewEventPhoto(eventPhoto, eventId);
  }

  @DeleteMapping("/{eventId}/photos/{photoId}")
  public void deletePhoto(@PathVariable("photoId") Long photoId) {
    eventPhotoService.deleteEventPhoto(photoId);
  }

}
