package com.danit.finalproject.application.controller;

import com.danit.finalproject.application.dto.request.NotificationRequest;
import com.danit.finalproject.application.dto.response.NotificationResponse;
import com.danit.finalproject.application.facade.NotificationFacade;
import java.util.List;
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

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

  private NotificationFacade notificationFacade;

  @Autowired
  public NotificationController(NotificationFacade notificationFacade) {
    this.notificationFacade = notificationFacade;
  }

  @GetMapping
  public List<NotificationResponse> findAllNotificationsByPlace(@RequestParam("placeId") Long id) {
    return notificationFacade.findAllByPlace(id);
  }

  @PostMapping("/places")
  public NotificationResponse createNewNotification(@RequestBody NotificationRequest notificationDto) {
    return notificationFacade.create(notificationDto);
  }

  @PutMapping("/{id}")
  public NotificationResponse updateNotification(
      @RequestBody NotificationRequest notificationDto,
      @PathVariable("id") Long id) {
    return notificationFacade.update(id, notificationDto);
  }

  @DeleteMapping("{id}")
  public void deleteNotification(@PathVariable("id") Long id) {
    notificationFacade.delete(id);
  }
}
