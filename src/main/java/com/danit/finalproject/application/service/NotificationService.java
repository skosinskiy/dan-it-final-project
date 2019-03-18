package com.danit.finalproject.application.service;

import com.danit.finalproject.application.entity.Notification;
import com.danit.finalproject.application.entity.place.Place;
import com.danit.finalproject.application.repository.NotificationRepository;
import com.danit.finalproject.application.repository.place.PlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {
  private NotificationRepository notificationRepository;

  private PlaceRepository placeRepository;

  @Autowired
  public NotificationService(NotificationRepository notificationRepository) {
    this.notificationRepository = notificationRepository;
  }

  public Notification getNotifivcationById(Long id) {
    return notificationRepository.findById(id).orElse(null);
  }

  public List<Notification> findAllByPlace(Long placeId) {
    return notificationRepository.findAllByPlace(placeRepository.findById(placeId).orElse(null));
  }

  public Notification createNewNotification(Notification notification, Long placeId) {
    notification.setPlace(placeRepository.findById(placeId).orElse(null));
    return notificationRepository.save(notification);
  }

  public Notification updateNotification(Notification notification, Long id) {
    notification.setId(id);
    return notificationRepository.saveAndFlush(notification);
  }

  public void deleteNotification(Long id) {
    notificationRepository.deleteById(id);
  }
}
