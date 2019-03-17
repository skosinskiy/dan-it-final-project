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

  public EventPhoto getEventPhotoByIdAndEvent(Long photoId, Long eventId) {
    return eventPhotoRepository.getByIdAndEvent(photoId, eventRepository.findById(eventId).orElse(null));
  }

  public void createNewEventPhoto(EventPhoto eventPhoto, Long eventId) {
//    eventPhoto.setEvent(eventRepository.findById(eventId).orElse(null));
    eventPhotoRepository.save(eventPhoto);
  }

  public void deleteEventPhoto(Long eventPhotoId, Long eventId) {
    eventPhotoRepository.deleteEventPhotoByIdAndEvent(eventPhotoId, eventRepository.findById(eventId).orElse(null));
  }
}
