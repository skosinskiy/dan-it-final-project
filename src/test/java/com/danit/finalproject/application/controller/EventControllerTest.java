package com.danit.finalproject.application.controller;

import com.danit.finalproject.application.entity.business.Business;
import com.danit.finalproject.application.entity.business.BusinessCategory;
import com.danit.finalproject.application.entity.event.Event;
import com.danit.finalproject.application.entity.event.EventCategory;
import com.danit.finalproject.application.entity.event.EventPhoto;
import com.danit.finalproject.application.entity.place.Place;
import com.danit.finalproject.application.entity.place.PlacePhoto;
import com.danit.finalproject.application.service.business.BusinessService;
import com.danit.finalproject.application.service.event.EventCategoryService;
import com.danit.finalproject.application.service.event.EventPhotoService;
import com.danit.finalproject.application.service.event.EventService;
import com.danit.finalproject.application.service.place.PlaceCategoryService;
import com.danit.finalproject.application.service.place.PlacePhotoService;
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

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
@Transactional
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
    String expectedName = "place-1";

    MvcResult result = mockMvc.perform(get("/api/events/1"))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    Event event = objectMapper.readValue(responseBody, Event.class);

    assertEquals(expectedId, event.getId());
    assertEquals(expectedName, event.getTitle());
  }

//  @Test
//  public void getAllPlaces() throws Exception {
//    int expectedSize = 2;
//    String secondCategoryName = "place-2";
//
//    MvcResult result = mockMvc.perform(get("/api/places"))
//        .andReturn();
//    String responseBody = result.getResponse().getContentAsString();
//    List<Place> places = objectMapper.readValue(responseBody, new TypeReference<List<Place>>(){});
//
//    assertEquals(expectedSize, places.size());
//    assertEquals(secondCategoryName, places.get(1).getTitle());
//  }

  @Test
  public void createNewEvent() throws Exception {
    Long expectedId = 3L;
    String expectedName = "place-3";

    Event event = new Event();
    event.setId(expectedId);
    event.setTitle(expectedName);

    List<EventCategory> eventCategories = new ArrayList<>();
    eventCategories.add(eventCategoryService.getEventCategoryById(1L));
    eventCategories.add(eventCategoryService.getEventCategoryById(2L));
    event.setCategories(eventCategories);
//    event.setMainPhoto(eventPhotoService.getEventPhotoById(1L));
    List<EventPhoto> photos = new ArrayList<>();

//    photos.add(eventPhotoService.getEventPhotoById(1L));
//    photos.add(eventPhotoService.getEventPhotoById(2L));
    event.setPhotos(photos);

    event.setBusiness(businessService.getBusinessById(1L));
    event.setPlace(placeService.getPlaceById(1L));

    String placeCategoryJson = objectMapper.writeValueAsString(event);

    MvcResult result = mockMvc.perform(
        post("/api/events/")
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
//    assertEquals(createdEvent.getMainPhoto().getId(), eventPhotoService.getEventPhotoById(1L).getId());
//    assertEquals(createdEvent.getPhotos().get(1).getId(), eventPhotoService.getEventPhotoById(2L).getId());
    assertEquals(createdEvent.getBusiness().getId(), businessService.getBusinessById(1L).getId());
  }

  @Test
  public void updateEvent() throws Exception {
    String eventTitle = "Updated";
    Long eventId = 1L;
    Event event = eventService.getEventById(eventId);
    event.setTitle(eventTitle);

    List<EventPhoto> photos = event.getPhotos();
    photos.remove(1);
    event.setPhotos(photos);

    event.setBusiness(businessService.getBusinessById(2L));
    event.setPlace(placeService.getPlaceById(2L));

    String userJson = objectMapper.writeValueAsString(event);

    MvcResult result = mockMvc.perform(
        put("/api/events/1")
            .content(userJson)
            .contentType(MediaType.APPLICATION_JSON))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    Event upgatedEvent = objectMapper.readValue(responseBody, Event.class);

    assertEquals(eventTitle, upgatedEvent.getTitle());
    assertEquals(eventTitle, eventService.getEventById(eventId).getTitle());
    assertEquals(1, upgatedEvent.getPhotos().size());
    assertEquals(businessService.getBusinessById(2L).getId(), upgatedEvent.getBusiness().getId());
    assertEquals(placeService.getPlaceById(2L).getId(), upgatedEvent.getPlace().getId());
  }

  @Test
  public void deleteEvent() throws Exception {
    mockMvc.perform(delete("/api/events/2"));

    assertNull(eventService.getEventById(2L));
  }
}
