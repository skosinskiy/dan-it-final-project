package com.danit.finalproject.application.facade;

import com.danit.finalproject.application.dto.request.NotificationRequestDto;
import com.danit.finalproject.application.dto.response.NotificationResponseDto;
import com.danit.finalproject.application.entity.Notification;
import com.danit.finalproject.application.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class NotificationFacade extends
    AbstractDtoFacade<Notification, NotificationRequestDto, NotificationResponseDto> {

  private NotificationService notificationService;

  @Autowired
  public NotificationFacade(NotificationService notificationService) {
    this.notificationService = notificationService;
  }

  public List<NotificationResponseDto> findAllByPlace(Long id) {
    List<Notification> notifications = notificationService.findAllByPlace(id);
    return mapEntityListToResponseDtoList(notifications);
  }
}
