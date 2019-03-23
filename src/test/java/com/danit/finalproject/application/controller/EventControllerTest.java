package com.danit.finalproject.application.controller;

import com.danit.finalproject.application.entity.event.Event;
import com.danit.finalproject.application.entity.event.EventCategory;
import com.danit.finalproject.application.entity.event.EventPhoto;
import com.danit.finalproject.application.entity.place.Place;
import com.danit.finalproject.application.service.business.BusinessService;
import com.danit.finalproject.application.service.event.EventCategoryService;
import com.danit.finalproject.application.service.event.EventPhotoService;
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

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
@Transactional
@WithMockUser(value = "first.user@test.com")
public class EventControllerTest {
  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @Autowired
  private EventService eventService;

  @Autowired
  private EventCategoryService eventCategoryService;

  @Autowired
  private EventPhotoService eventPhotoService;

  @Autowired
  private BusinessService businessService;

  @Autowired
  private PlaceService placeService;

  @Test
  public void getEventById() throws Exception {
    Long expectedId = 1L;
    String expectedName = "event-1";

    MvcResult result = mockMvc.perform(get("/api/events/1"))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    Event event = objectMapper.readValue(responseBody, Event.class);

    assertEquals(expectedId, event.getId());
    assertEquals(expectedName, event.getTitle());
  }

  @Test
  public void getAllEventsByPlaceAndBusiness() throws Exception {
    int expectedSize = 1;

    MvcResult result = mockMvc.perform(get("/api/events?place=1&business=1"))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    List<Event> events = objectMapper.readValue(responseBody, new TypeReference<List<Place>>(){});

    assertEquals(expectedSize, events.size());
  }

  @Test
  public void createNewEvent() throws Exception {
    Long expectedId = 3L;
    String expectedName = "event-3";

    Event event = new Event();
    event.setId(expectedId);
    event.setTitle(expectedName);

    List<EventCategory> eventCategories = new ArrayList<>();
    eventCategories.add(eventCategoryService.getEventCategoryById(1L));
    eventCategories.add(eventCategoryService.getEventCategoryById(2L));
    event.setCategories(eventCategories);

    event.setBusiness(businessService.getBusinessById(1L));
    event.setPlace(placeService.getPlaceById(1L));

    String placeCategoryJson = objectMapper.writeValueAsString(event);

    MvcResult result = mockMvc.perform(
        post("/api/events/")
            .with(csrf())
            .content(placeCategoryJson)
            .contentType(MediaType.APPLICATION_JSON))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    Event createdEvent = objectMapper.readValue(responseBody, Event.class);
    Long createdEventId= createdEvent.getId();

    assertEquals(expectedName, createdEvent.getTitle());
    assertNotNull(createdEvent.getCreatedDate());
    assertNotNull(createdEvent.getModifiedDate());
    assertNotNull(createdEventId);
    assertEquals(createdEvent.getCategories().get(0).getId(), eventCategoryService.getEventCategoryById(1L).getId());
    assertEquals(createdEvent.getBusiness().getId(), businessService.getBusinessById(1L).getId());
  }

  @Test
  public void updateEvent() throws Exception {
    String eventTitle = "Updated";
    Long eventId = 1L;
    Event event = eventService.getEventById(eventId);
    event.setTitle(eventTitle);
    event.setBusiness(businessService.getBusinessById(2L));
    event.setPlace(placeService.getPlaceById(2L));

    String userJson = objectMapper.writeValueAsString(event);

    MvcResult result = mockMvc.perform(
        put("/api/events/1")
            .with(csrf())
            .content(userJson)
            .contentType(MediaType.APPLICATION_JSON))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    Event upgatedEvent = objectMapper.readValue(responseBody, Event.class);

    assertEquals(eventTitle, upgatedEvent.getTitle());
    assertEquals(eventTitle, eventService.getEventById(eventId).getTitle());
    assertEquals(businessService.getBusinessById(2L).getId(), upgatedEvent.getBusiness().getId());
    assertEquals(placeService.getPlaceById(2L).getId(), upgatedEvent.getPlace().getId());
  }

  @Test
  public void deleteEvent() throws Exception {
    mockMvc.perform(delete("/api/events/2").with(csrf()));

    assertNull(eventService.getEventById(2L));
  }

  @Test
  public void createNewEventPhoto() throws Exception {
    Long expectedId = 5L;
    String expectedName = "photo-5";

    EventPhoto eventPhoto = new EventPhoto();
    eventPhoto.setId(expectedId);
    eventPhoto.setPhoto(expectedName);

    String placeCategoryJson = objectMapper.writeValueAsString(eventPhoto);

    MvcResult result = mockMvc.perform(
        post("/api/events/1/photos")
            .with(csrf())
            .content(placeCategoryJson)
            .contentType(MediaType.APPLICATION_JSON))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    EventPhoto createdEventPhoto = objectMapper.readValue(responseBody, EventPhoto.class);
    Long createdEventPhotoId= createdEventPhoto.getId();

    assertEquals(expectedName, createdEventPhoto.getPhoto());
    assertNotNull(createdEventPhoto.getCreatedDate());
    assertNotNull(createdEventPhoto.getModifiedDate());
    assertNotNull(createdEventPhotoId);
    assertEquals(createdEventPhoto.getEvent().getId(), eventService.getEventById(1L).getId());
  }

  @Test
  public void deleteEventPhoto() throws Exception {
    mockMvc.perform(delete("/api/events/1/photos/1").with(csrf()));

    assertNull(eventPhotoService.getEventPhotoById(1L));
  }
}
