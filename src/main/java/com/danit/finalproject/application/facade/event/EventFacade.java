package com.danit.finalproject.application.facade.event;

import com.danit.finalproject.application.dto.request.event.EventPhotoRequest;
import com.danit.finalproject.application.dto.request.event.EventRequest;
import com.danit.finalproject.application.dto.response.event.EventResponse;
import com.danit.finalproject.application.entity.event.Event;
import com.danit.finalproject.application.entity.event.EventPhoto;
import com.danit.finalproject.application.facade.AbstractDtoFacade;
import com.danit.finalproject.application.service.event.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class EventFacade extends AbstractDtoFacade<Event, EventRequest, EventResponse> {

  private EventService eventService;

  @Autowired
  public EventFacade(EventService eventService) {
    this.eventService = eventService;
  }

  public List<EventResponse> getEvents(Long placeId, Long businessId) {
    List<Event> events = eventService.findAllByLocation(placeId, businessId);
    return mapEntityListToResponseDtoList(events);
  }

  public EventResponse addPhoto(EventPhotoRequest eventPhotoRequest, Long eventId) {
    EventPhoto eventPhoto = modelMapper.map(eventPhotoRequest, EventPhoto.class);
    Event updatedEvent = eventService.addPhoto(eventPhoto, eventId);
    return mapEntityToResponseDto(updatedEvent);
  }
}
