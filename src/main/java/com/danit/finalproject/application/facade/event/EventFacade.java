package com.danit.finalproject.application.facade.event;

import com.danit.finalproject.application.dto.request.event.EventPhotoRequest;
import com.danit.finalproject.application.dto.request.event.EventRequest;
import com.danit.finalproject.application.dto.response.event.EventResponse;
import com.danit.finalproject.application.entity.event.Event;
import com.danit.finalproject.application.entity.event.EventPhoto;
import com.danit.finalproject.application.facade.AbstractDtoFacade;
import com.danit.finalproject.application.service.event.EventService;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class EventFacade extends AbstractDtoFacade<Event, EventRequest, EventResponse> {

  private EventService eventService;

  @Autowired
  public EventFacade(EventService eventService) {
    this.eventService = eventService;
  }

  public List<EventResponse> getAllEventsByTitleOrBusinessTitleOrPlaceTitle(String searchParam) {
    List<Event> events = eventService.getAllEventsByTitleOrBusinessTitleOrPlaceTitle(searchParam);
    return mapEntityListToResponseDtoList(events);
  }

  public List<EventResponse> getEventsByPlaceIdOrBusinessId(Long placeId, Long businessId) {
    List<Event> events = eventService.findAllPlaceIdOrBusinessId(placeId, businessId);
    return mapEntityListToResponseDtoList(events);
  }

  public EventResponse createEventPhotos(List<EventPhotoRequest> eventPhotosRequest, Long eventId) {
    List<EventPhoto> eventPhotos = eventPhotosRequest
        .stream()
        .map(eventPhotoRequest -> modelMapper.map(eventPhotoRequest, EventPhoto.class))
        .collect(Collectors.toList());
    Event updatedEvent = eventService.createEventPhotos(eventPhotos, eventId);
    return mapEntityToResponseDto(updatedEvent);
  }

  public EventResponse deleteEventPhoto(Long eventId, Long photoId) {
    Event event = eventService.deleteEventPhoto(eventId, photoId);
    return mapEntityToResponseDto(event);
  }
}
