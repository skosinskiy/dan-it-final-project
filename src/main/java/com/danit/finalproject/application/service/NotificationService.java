package com.danit.finalproject.application.service;

import com.danit.finalproject.application.entity.Notification;
import com.danit.finalproject.application.entity.place.Place;
import com.danit.finalproject.application.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {
  private NotificationRepository notificationRepository;

  @Autowired
  public NotificationService(NotificationRepository notificationRepository) {
    this.notificationRepository = notificationRepository;
  }

  public List<Notification> findAllByPlaceId(Place place) {
    return notificationRepository.findAllByPlace(place);
  }

  public Notification createNewNotification(Notification notification) {
    return notificationRepository.save(notification);
  }

  public Notification updateNotification(Notification notification) {
    return notificationRepository.saveAndFlush(notification);
  }

  public void deleteNotification(Long id) {
    notificationRepository.deleteById(id);
  }
}
