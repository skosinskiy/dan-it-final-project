package com.danit.finalproject.application.service.event;

import com.danit.finalproject.application.entity.business.Business;
import com.danit.finalproject.application.entity.event.Event;
import com.danit.finalproject.application.entity.event.EventPhoto;
import com.danit.finalproject.application.repository.event.EventRepository;
import com.danit.finalproject.application.service.CrudService;
import com.danit.finalproject.application.service.business.BusinessService;
import com.danit.finalproject.application.service.place.PlaceService;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EventService implements CrudService<Event> {
  private EventRepository eventRepository;
  private BusinessService businessService;
  private PlaceService placeService;
  private EventPhotoService eventPhotoService;

  @Autowired
  public EventService(
      EventRepository eventRepository,
      BusinessService businessService,
      PlaceService placeService,
      EventPhotoService eventPhotoService) {
    this.eventRepository = eventRepository;
    this.businessService = businessService;
    this.placeService = placeService;
    this.eventPhotoService = eventPhotoService;
  }

  @Override
  public Event getById(Long id) {
    return eventRepository.findById(id).orElse(null);
  }

  @Override
  public List<Event> getAll() {
    return eventRepository.findAll();
  }

  public List<Event> getAllEventsByParams(String searchParam) {
    return eventRepository.findByParams(searchParam);
  }

  @Override
  public Event create(Event event) {
    return eventRepository.save(event);
  }

  @Override
  public Event update(Long id, Event event) {
    List<EventPhoto> updatedEventPhotos = event.getPhotos();
    deleteEventPhotos(getById(id).getPhotos(), updatedEventPhotos);
    updatedEventPhotos.forEach(eventPhoto -> eventPhoto.setEvent(event));
    event.setId(id);
    return eventRepository.save(event);
  }

  private void deleteEventPhotos(
      List<EventPhoto> currentEventPhotos,
      List<EventPhoto> updatedEventPhotos) {
    currentEventPhotos
        .stream()
        .filter(currentEventPhoto -> updatedEventPhotos
            .stream()
            .noneMatch(businessPhoto -> currentEventPhoto.getImageKey().equals(businessPhoto.getImageKey())))
        .forEach(businessPhoto -> eventPhotoService.deleteEventPhoto(businessPhoto));
  }

  @Override
  public Event delete(Long id) {
    Event event = eventRepository.findById(id).orElse(null);
    if (event != null) {
      event.getPhotos().forEach(businessPhoto -> eventPhotoService.deleteEventPhoto(businessPhoto));
    }
    eventRepository.delete(event);
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
      Optional<EventPhoto> optionalEventPhoto = optionalEvent.get().getPhotos()
          .stream()
          .filter(photo -> photoId.equals(photo.getId()))
          .findFirst();
      optionalEventPhoto.ifPresent(photo -> eventPhotoService.deleteEventPhoto(photo));
    }
    return optionalEvent.orElse(null);
  }

  public Event createEventPhotos(List<EventPhoto> eventPhotos, Long eventId) {
    Event event = getById(eventId);
    event.setPhotos(eventPhotos);
    return eventRepository.save(event);
  }
}
