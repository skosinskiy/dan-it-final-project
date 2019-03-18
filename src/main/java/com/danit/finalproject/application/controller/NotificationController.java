package com.danit.finalproject.application.controller;

import com.danit.finalproject.application.entity.Notification;
import com.danit.finalproject.application.service.NotificationService;
import com.danit.finalproject.application.service.place.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {
  private NotificationService notificationService;

  @Autowired
  public NotificationController(NotificationService notificationService) {
    this.notificationService = notificationService;
  }

  @GetMapping
  public List<Notification> findAllNotificationsByPlace(@RequestParam("placeId") Long id) {
    return notificationService.findAllByPlace(id);
  }

  @PostMapping("/places/{placeId}")
  public Notification createNewNotification(@RequestBody Notification notification, @PathVariable("placeId") Long placeId) {
    return notificationService.createNewNotification(notification, placeId);
  }

  @PutMapping("/{id}")
  public Notification updateNotification(@RequestBody Notification notification, @PathVariable("id") Long id) {
    return notificationService.updateNotification(notification, id);
  }

  @DeleteMapping("{id}")
  public void deleteNotification(@PathVariable("id") Long notificationId) {
    notificationService.deleteNotification(notificationId);
  }
}
