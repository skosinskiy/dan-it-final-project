package com.danit.finalproject.application.service.event;

import com.danit.finalproject.application.entity.event.Event;
import com.danit.finalproject.application.entity.event.EventPhoto;
import com.danit.finalproject.application.repository.event.EventRepository;
import com.danit.finalproject.application.service.CrudService;
import com.danit.finalproject.application.service.business.BusinessService;
import com.danit.finalproject.application.service.place.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService implements CrudService<Event> {
  private EventRepository eventRepository;
  private BusinessService businessService;
  private PlaceService    placeService;

  @Autowired
  public EventService(EventRepository eventRepository,
      BusinessService businessService, PlaceService placeService) {
    this.eventRepository = eventRepository;
    this.businessService = businessService;
    this.placeService = placeService;
  }

  @Override
  public Event getById(Long id) {
    return eventRepository.findById(id).orElse(null);
  }

  @Override
  public List<Event> getAll() {
    return eventRepository.findAll();
  }

  public List<Event> findAllByLocation(Long placeId, Long businessId) {
    return eventRepository.findAllByPlaceAndBusiness(placeService.getById(placeId), businessService
        .getById(businessId));
  }

  @Override
  public Event create(Event event) {
    return eventRepository.save(event);
  }

  @Override
  public Event update(Long id, Event event) {
    event.setId(id);
    return eventRepository.save(event);
  }

  @Override
  public Event delete(Long id) {
    Event event = eventRepository.findById(id).orElse(null);
    eventRepository.deleteById(id);
    return event;
  }

  public Event addPhoto(EventPhoto eventPhoto, Long eventId) {
    Optional<Event> optionalEvent = eventRepository.findById(eventId);
    optionalEvent.ifPresent(event -> event.getPhotos().add(eventPhoto));
    Event event = optionalEvent.orElse(null);
    eventRepository.save(event);
    return event;
  }

  public Event deleteEventPhoto(Long eventId, Long photoId) {
    Optional<Event> optionalEvent = eventRepository.findById(eventId);
    if (optionalEvent.isPresent()) {
      EventPhoto eventPhoto = optionalEvent.get().getPhotos()
          .stream()
          .filter(photo -> photoId.equals(photo.getId()))
          .findFirst().orElse(null);
      Event event = optionalEvent.get();
      event.getPhotos().remove(eventPhoto);
      eventRepository.saveAndFlush(event);
    }
    return optionalEvent.orElse(null);
  }
}
