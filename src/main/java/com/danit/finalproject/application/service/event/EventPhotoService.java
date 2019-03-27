package com.danit.finalproject.application.service.event;

import com.danit.finalproject.application.entity.event.EventPhoto;
import com.danit.finalproject.application.repository.event.EventPhotoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EventPhotoService {
  private EventPhotoRepository eventPhotoRepository;

  @Autowired
  public EventPhotoService(EventPhotoRepository eventPhotoRepository) {
    this.eventPhotoRepository = eventPhotoRepository;
  }

  public EventPhoto getEventPhotoById(Long photoId) {
    return eventPhotoRepository.findById(photoId).orElse(null);
  }
}
