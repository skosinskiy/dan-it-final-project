package com.danit.finalproject.application.service.event;

import com.danit.finalproject.application.entity.event.EventPhoto;
import com.danit.finalproject.application.repository.event.EventPhotoRepository;
import com.danit.finalproject.application.repository.event.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventPhotoService {
  private EventPhotoRepository eventPhotoRepository;
  private EventRepository eventRepository;

  @Autowired
  public EventPhotoService(EventPhotoRepository eventPhotoRepository, EventRepository eventRepository) {
    this.eventPhotoRepository = eventPhotoRepository;
    this.eventRepository = eventRepository;
  }

  public EventPhoto getEventPhotoById(Long photoId) {
    return eventPhotoRepository.findById(photoId).orElse(null);
  }

  public EventPhoto createNewEventPhoto(EventPhoto eventPhoto, Long eventId) {
    eventPhoto.setEvent(eventRepository.findById(eventId).orElse(null));
    return eventPhotoRepository.save(eventPhoto);
  }

  public void deleteEventPhoto(Long eventPhotoId) {
    eventPhotoRepository.deleteById(eventPhotoId);
  }
}
