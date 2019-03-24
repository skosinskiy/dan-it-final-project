package com.danit.finalproject.application.controller.event;

import com.danit.finalproject.application.dto.request.event.EventPhotoRequestDto;
import com.danit.finalproject.application.dto.request.event.EventRequestDto;
import com.danit.finalproject.application.dto.response.event.EventResponseDto;
import com.danit.finalproject.application.facade.event.EventFacade;
import com.danit.finalproject.application.service.event.EventPhotoService;
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
  private EventFacade eventFacade;
  private EventPhotoService eventPhotoService;

  @Autowired
  public EventController(EventFacade eventFacade, EventPhotoService eventPhotoService) {
    this.eventFacade = eventFacade;
    this.eventPhotoService = eventPhotoService;
  }

  @GetMapping("{id}")
  public EventResponseDto getEventById(@PathVariable("id") Long eventId) {
    return eventFacade.getById(eventId);
  }

  @GetMapping
  public List<EventResponseDto> getAllBusinesses(
      @RequestParam("place") Long placeId,
      @RequestParam("business") Long businessId) {
    return eventFacade.getEvents(placeId, businessId);
  }

  @PostMapping
  public EventResponseDto createNewEvent(@RequestBody EventRequestDto eventRequestDto) {
    return eventFacade.create(eventRequestDto);
  }

  @PutMapping("{id}")
  public EventResponseDto updateEvent(@PathVariable Long id, @RequestBody EventRequestDto eventRequestDto) {
    return eventFacade.update(id, eventRequestDto);
  }

  @DeleteMapping("{id}")
  public EventResponseDto deleteEvent(@PathVariable("id") Long eventId) {
    return eventFacade.delete(eventId);
  }

  @PostMapping("/{eventId}/photos")
  public EventResponseDto addPhotosToEvent(
      @RequestBody EventPhotoRequestDto eventPhotoRequestDto,
      @PathVariable Long eventId) {
    return eventFacade.addPhoto(eventPhotoRequestDto, eventId);
  }

  @DeleteMapping("/{eventId}/photos/{photoId}")
  public void deletePhoto(@PathVariable("photoId") Long photoId) {
    eventPhotoService.deleteEventPhoto(photoId);
  }

}
