package com.danit.finalproject.application.service.event;

import com.danit.finalproject.application.entity.event.Event;
import com.danit.finalproject.application.repository.event.EventRepository;
import com.danit.finalproject.application.service.business.BusinessService;
import com.danit.finalproject.application.service.place.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {
  private EventRepository eventRepository;
  private BusinessService businessService;
  private PlaceService placeService;

  @Autowired
  public EventService(EventRepository eventRepository,
    BusinessService businessService,
    PlaceService placeService) {
    this.eventRepository = eventRepository;
    this.businessService = businessService;
    this.placeService = placeService;
  }

  public Event getEventById(Long id) {
    return eventRepository.findById(id).orElse(null);
  }

  public List<Event> findAllByLocation(Long placeId, Long businessId) {
    return eventRepository.findAllByPlaceAndBusiness(placeService.getPlaceById(placeId),
    businessService.getBusinessById(businessId));
  }

  public Event createNewEvent(Event event) {
    return eventRepository.save(event);
  }

  public Event updateEvent(Event event) {
    return eventRepository.saveAndFlush(event);
  }

  public void deleteEvent(Long id) {
    eventRepository.deleteById(id);
  }
}
