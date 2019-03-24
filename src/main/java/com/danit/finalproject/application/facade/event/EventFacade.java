package com.danit.finalproject.application.facade.event;

import com.danit.finalproject.application.dto.request.event.EventPhotoRequestDto;
import com.danit.finalproject.application.dto.request.event.EventRequestDto;
import com.danit.finalproject.application.dto.response.event.EventResponseDto;
import com.danit.finalproject.application.entity.event.Event;
import com.danit.finalproject.application.entity.event.EventPhoto;
import com.danit.finalproject.application.facade.AbstractDtoFacade;
import com.danit.finalproject.application.service.event.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class EventFacade extends AbstractDtoFacade<Event, EventRequestDto, EventResponseDto> {

  private EventService eventService;

  @Autowired
  public EventFacade(EventService eventService) {
    this.eventService = eventService;
  }

  public List<EventResponseDto> getEvents(Long placeId, Long businessId) {
    List<Event> events = eventService.findAllByLocation(placeId, businessId);
    return mapEntityListToResponseDtoList(events);
  }

  public EventResponseDto addPhoto(EventPhotoRequestDto eventPhotoRequestDto, Long eventId) {
    EventPhoto eventPhoto = modelMapper.map(eventPhotoRequestDto, EventPhoto.class);
    Event updatedEvent = eventService.addPhoto(eventPhoto, eventId);
    return mapEntityToResponseDto(updatedEvent);
  }
}
