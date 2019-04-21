package com.danit.finalproject.application.service.event;

import com.danit.finalproject.application.entity.event.EventPhoto;
import com.danit.finalproject.application.repository.event.EventPhotoRepository;
import com.danit.finalproject.application.service.AmazonS3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EventPhotoService {
  private EventPhotoRepository eventPhotoRepository;
  private AmazonS3Service amazonS3Service;

  @Autowired
  public EventPhotoService(
      EventPhotoRepository eventPhotoRepository,
      AmazonS3Service amazonS3Service) {
    this.eventPhotoRepository = eventPhotoRepository;
    this.amazonS3Service = amazonS3Service;
  }

  public EventPhoto getEventPhotoById(Long photoId) {
    return eventPhotoRepository.findById(photoId).orElse(null);
  }

  public EventPhoto deleteEventPhoto(EventPhoto eventPhoto) {
    eventPhotoRepository.delete(eventPhoto);
    amazonS3Service.deleteObject(eventPhoto.getImageKey());
    return eventPhoto;
  }
}
