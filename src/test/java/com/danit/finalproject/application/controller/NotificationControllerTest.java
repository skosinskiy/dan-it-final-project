package com.danit.finalproject.application.controller;

import com.danit.finalproject.application.entity.Notification;
import com.danit.finalproject.application.service.NotificationService;
import com.danit.finalproject.application.service.business.BusinessService;
import com.danit.finalproject.application.service.event.EventService;
import com.danit.finalproject.application.service.place.PlaceService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
@Transactional
public class NotificationControllerTest {
  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @Autowired
  private EventService eventService;

  @Autowired
  private BusinessService businessService;

  @Autowired
  private PlaceService placeService;

  @Autowired
  private NotificationService notificationService;


  @Test
  public void getNotificationsByPlace() throws Exception {
    int expectedSize = 1;

    MvcResult result = mockMvc.perform(get("/api/notifications?placeId=1"))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    List<Notification> notifications = objectMapper.readValue(responseBody, new TypeReference<List<Notification>>(){});

    assertEquals(expectedSize, notifications.size());
  }

  @Test
  public void createNewNotification() throws Exception {
    Long expectedId = 3L;
    String expectedText = "notification-3";

    Notification notification = new Notification();
    notification.setId(expectedId);
    notification.setText(expectedText);
    notification.setBusiness(businessService.getBusinessById(1L));
    notification.setEvent(eventService.getEventById(1L));

    String notificationJson = objectMapper.writeValueAsString(notification);

    MvcResult result = mockMvc.perform(
        post("/api/notifications/places/1")
            .content(notificationJson)
            .contentType(MediaType.APPLICATION_JSON))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    Notification createdNotification = objectMapper.readValue(responseBody, Notification.class);
    Long createdNotificationId= createdNotification.getId();

    assertEquals(expectedText, createdNotification.getText());
    assertNotNull(createdNotification.getCreatedDate());
    assertNotNull(createdNotification.getModifiedDate());
    assertNotNull(createdNotificationId);
    assertEquals(createdNotification.getBusiness().getId(), businessService.getBusinessById(1L).getId());
    assertEquals(createdNotification.getEvent().getId(), eventService.getEventById(1L).getId());
    assertEquals(createdNotification.getPlace().getId(), placeService.getPlaceById(1L).getId());
  }

  @Test
  public void updateNotification() throws Exception {
    String notificationText = "Updated";
    Long notificationId = 1L;
    Notification notification = notificationService.getNotifivcationById(notificationId);
    notification.setText(notificationText);

    notification.setBusiness(businessService.getBusinessById(2L));
    notification.setEvent(eventService.getEventById(2L));
    notification.setPlace(placeService.getPlaceById(2L));

    String userJson = objectMapper.writeValueAsString(notification);

    MvcResult result = mockMvc.perform(
        put("/api/notifications/1")
            .content(userJson)
            .contentType(MediaType.APPLICATION_JSON))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    Notification upgatedNotification = objectMapper.readValue(responseBody, Notification.class);

    assertEquals(notificationText, upgatedNotification.getText());
    assertEquals(notificationText, notificationService.getNotifivcationById(notificationId).getText());
    assertEquals(businessService.getBusinessById(2L).getId(), upgatedNotification.getBusiness().getId());
    assertEquals(eventService.getEventById(2L).getId(), upgatedNotification.getEvent().getId());
    assertEquals(placeService.getPlaceById(2L).getId(), upgatedNotification.getEvent().getId());
  }

  @Test
  public void deleteNotification() throws Exception {
    mockMvc.perform(delete("/api/notifications/2"));

    assertNull(notificationService.getNotifivcationById(2L));
  }
}
