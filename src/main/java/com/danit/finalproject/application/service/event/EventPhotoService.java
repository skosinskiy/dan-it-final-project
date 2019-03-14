package com.danit.finalproject.application.service.event;

import com.danit.finalproject.application.entity.event.EventPhoto;
import com.danit.finalproject.application.repository.event.EventPhotoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventPhotoService {
  private EventPhotoRepository eventPhotoRepository;

  @Autowired
  public EventPhotoService(EventPhotoRepository eventPhotoRepository) {
    this.eventPhotoRepository = eventPhotoRepository;
  }

  public void createNewEventPhoto(EventPhoto eventPhoto) {
    eventPhotoRepository.save(eventPhoto);
  }

  public void deleteEventPhoto(Long id) {
    eventPhotoRepository.deleteById(id);
  }
}
