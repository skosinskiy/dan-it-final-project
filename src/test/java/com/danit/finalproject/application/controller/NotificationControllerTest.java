package com.danit.finalproject.application.controller;

import com.danit.finalproject.application.dto.response.NotificationResponse;
import com.danit.finalproject.application.entity.Notification;
import com.danit.finalproject.application.entity.place.Place;
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
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.Assert.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
@Transactional
@WithMockUser(value = "first.user@test.com")
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
    List<NotificationResponse> notifications =
        objectMapper.readValue(responseBody, new TypeReference<List<NotificationResponse>>(){});

    assertEquals(expectedSize, notifications.size());
  }

  @Test
  public void createNewNotification() throws Exception {
    Long expectedId = 3L;
    String expectedText = "notification-3";

    Place place = new Place();
    place.setId(1L);

    Notification notification = new Notification();
    notification.setId(expectedId);
    notification.setText(expectedText);
    notification.setPlace(place);
    notification.setBusiness(businessService.getById(1L));
    notification.setEvent(eventService.getById(1L));

    String notificationJson = objectMapper.writeValueAsString(notification);

    MvcResult result = mockMvc.perform(
        post("/api/notifications/places")
            .with(csrf())
            .content(notificationJson)
            .contentType(MediaType.APPLICATION_JSON))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    NotificationResponse createdNotification = objectMapper.readValue(responseBody, NotificationResponse.class);
    Long createdNotificationId= createdNotification.getId();

    assertEquals(expectedText, createdNotification.getText());
    assertNotNull(createdNotificationId);
    assertEquals(createdNotification.getBusiness().getId(), businessService.getById(1L).getId());
    assertEquals(createdNotification.getEvent().getId(), eventService.getById(1L).getId());
    assertEquals(createdNotification.getPlace().getId(), placeService.getById(1L).getId());
  }

  @Test
  public void updateNotification() throws Exception {
    String notificationText = "Updated";
    Long notificationId = 1L;
    Notification notification = notificationService.getById(notificationId);
    notification.setText(notificationText);

    notification.setBusiness(businessService.getById(2L));
    notification.setEvent(eventService.getById(2L));
    notification.setPlace(placeService.getById(2L));

    String userJson = objectMapper.writeValueAsString(notification);

    MvcResult result = mockMvc.perform(
        put("/api/notifications/1")
            .with(csrf())
            .content(userJson)
            .contentType(MediaType.APPLICATION_JSON))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    NotificationResponse upgatedNotification = objectMapper.readValue(responseBody, NotificationResponse.class);

    assertEquals(notificationText, upgatedNotification.getText());
    assertEquals(notificationText, notificationService.getById(notificationId).getText());
    assertEquals(businessService.getById(2L).getId(), upgatedNotification.getBusiness().getId());
    assertEquals(eventService.getById(2L).getId(), upgatedNotification.getEvent().getId());
    assertEquals(placeService.getById(2L).getId(), upgatedNotification.getEvent().getId());
  }

  @Test
  public void deleteNotification() throws Exception {
    mockMvc.perform(delete("/api/notifications/2").with(csrf()));

    assertNull(notificationService.getById(2L));
  }
}
