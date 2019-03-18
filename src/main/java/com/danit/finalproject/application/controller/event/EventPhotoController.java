package com.danit.finalproject.application.controller.event;

import com.danit.finalproject.application.entity.event.EventPhoto;
import com.danit.finalproject.application.entity.place.PlacePhoto;
import com.danit.finalproject.application.service.event.EventPhotoService;
import com.danit.finalproject.application.service.place.PlacePhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/events/{eventId}/photos")
public class EventPhotoController {
  private EventPhotoService eventPhotoService;

  @Autowired
  public EventPhotoController(EventPhotoService eventPhotoService) {
    this.eventPhotoService = eventPhotoService;
  }

  @PostMapping
  public void addPhotosToEvent(@RequestBody EventPhoto eventPhoto, @PathVariable("eventId") Long eventId) {
    eventPhotoService.createNewEventPhoto(eventPhoto, eventId);
  }

  @DeleteMapping("/{photoId}")
  public void deletePhoto(@PathVariable("photoId") Long photoId) {
    eventPhotoService.deleteEventPhoto(photoId);
  }
}
