package com.danit.finalproject.application.service;

import com.danit.finalproject.application.entity.Notification;
import com.danit.finalproject.application.repository.NotificationRepository;
import com.danit.finalproject.application.repository.place.PlaceRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NotificationService implements CrudService<Notification> {
  private NotificationRepository notificationRepository;
  private PlaceRepository placeRepository;

  @Autowired
  public NotificationService(NotificationRepository notificationRepository, PlaceRepository placeRepository) {
    this.notificationRepository = notificationRepository;
    this.placeRepository = placeRepository;
  }

  @Override
  public Notification getById(Long id) {
    return notificationRepository.findById(id).orElse(null);
  }

  @Override
  public List<Notification> getAll() {
    return notificationRepository.findAll();
  }

  public List<Notification> findAllByPlace(Long placeId) {
    return notificationRepository.findAllByPlace(placeRepository.findById(placeId).orElse(null));
  }

  @Override
  public Notification create(Notification notification) {
    notification.setPlace(placeRepository.findById(notification.getPlace().getId()).orElse(null));
    return notificationRepository.save(notification);
  }

  @Override
  public Notification update(Long id, Notification notification) {
    notification.setId(id);
    return notificationRepository.saveAndFlush(notification);
  }

  @Override
  public Notification delete(Long id) {
    Notification notification = notificationRepository.findById(id).orElse(null);
    notificationRepository.deleteById(id);
    return notification;
  }
}
