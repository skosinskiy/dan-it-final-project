package com.danit.finalproject.application.facade;

import com.danit.finalproject.application.dto.request.NotificationRequest;
import com.danit.finalproject.application.dto.response.NotificationResponse;
import com.danit.finalproject.application.entity.Notification;
import com.danit.finalproject.application.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class NotificationFacade extends
    AbstractDtoFacade<Notification, NotificationRequest, NotificationResponse> {

  private NotificationService notificationService;

  @Autowired
  public NotificationFacade(NotificationService notificationService) {
    this.notificationService = notificationService;
  }

  public List<NotificationResponse> findAllByPlace(Long id) {
    List<Notification> notifications = notificationService.findAllByPlace(id);
    return mapEntityListToResponseDtoList(notifications);
  }
}
