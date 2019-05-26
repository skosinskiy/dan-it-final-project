package com.danit.finalproject.application.service.event;

import com.danit.finalproject.application.entity.event.Event;
import com.danit.finalproject.application.entity.event.EventPhoto;
import com.danit.finalproject.application.repository.event.EventRepository;
import com.danit.finalproject.application.service.CrudService;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
public class EventService implements CrudService<Event> {
  private EventRepository eventRepository;
  private EventPhotoService eventPhotoService;

  @Autowired
  public EventService(
      EventRepository eventRepository,
      EventPhotoService eventPhotoService) {
    this.eventRepository = eventRepository;
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

  public Page<Event> getAllEventsByTitleOrBusinessTitleOrPlaceTitle(String searchParam, Pageable pageable) {
    return !StringUtils.hasText(searchParam)
        ? eventRepository.findAll(pageable)
        : eventRepository.getAllEventsByTitleOrBusinessTitleOrPlaceTitle(searchParam, pageable);
  }

  @Override
  public Event create(Event event) {
    return eventRepository.save(event);
  }

  @Override
  public Event update(Long id, Event event) {
    List<EventPhoto> updatedEventPhotos = event.getPhotos();
    if (event.getMainPhoto() != null) {
      event.getMainPhoto().setEvent(event);
      updatedEventPhotos.add(event.getMainPhoto());
    }
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
      event.setBusiness(null);
    }
    eventRepository.delete(event);
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
