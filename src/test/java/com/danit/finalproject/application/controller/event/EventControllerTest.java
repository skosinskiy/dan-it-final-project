package com.danit.finalproject.application.controller.event;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;

import com.danit.finalproject.application.dto.request.event.EventPhotoRequest;
import com.danit.finalproject.application.dto.request.event.EventRequest;
import com.danit.finalproject.application.dto.response.event.EventResponse;
import com.danit.finalproject.application.entity.event.Event;
import com.danit.finalproject.application.entity.event.EventCategory;
import com.danit.finalproject.application.entity.event.EventPhoto;
import com.danit.finalproject.application.service.business.BusinessService;
import com.danit.finalproject.application.service.event.EventCategoryService;
import com.danit.finalproject.application.service.event.EventPhotoService;
import com.danit.finalproject.application.service.event.EventService;
import com.danit.finalproject.application.service.place.PlaceService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.ArrayList;
import java.util.List;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
@Transactional
@WithMockUser(authorities = "MANAGE_EVENTS")
public class EventControllerTest {
  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @Autowired
  private ModelMapper modelMapper;

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
    EventResponse event = objectMapper.readValue(responseBody, EventResponse.class);

    assertEquals(expectedId, event.getId());
    assertEquals(expectedName, event.getTitle());
  }

  @Test
  public void getAllEventsByPlaceAndBusiness() throws Exception {
    int expectedSize = 1;

    MvcResult result = mockMvc.perform(get("/api/events?place=1&business=1"))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    List<EventResponse> events = objectMapper.readValue(responseBody, new TypeReference<List<EventResponse>>(){});

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
    eventCategories.add(eventCategoryService.getById(1L));
    eventCategories.add(eventCategoryService.getById(2L));
    event.setCategories(eventCategories);

    event.setBusiness(businessService.getById(1L));
    event.setPlace(placeService.getById(1L));

    String placeCategoryJson = objectMapper.writeValueAsString(modelMapper.map(event, EventRequest.class));

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
    assertNotNull(createdEventId);
    assertEquals(createdEvent.getCategories().get(0).getId(), eventCategoryService.getById(1L).getId());
    assertEquals(createdEvent.getBusiness().getId(), businessService.getById(1L).getId());
  }

  @Test
  public void updateEvent() throws Exception {
    String eventTitle = "Updated";
    Long eventId = 1L;
    Event event = eventService.getById(eventId);
    event.setTitle(eventTitle);
    event.setBusiness(businessService.getById(2L));
    event.setPlace(placeService.getById(2L));

    String userJson = objectMapper.writeValueAsString(modelMapper.map(event, EventRequest.class));

    MvcResult result = mockMvc.perform(
        put("/api/events/1")
            .with(csrf())
            .content(userJson)
            .contentType(MediaType.APPLICATION_JSON))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    Event upgatedEvent = objectMapper.readValue(responseBody, Event.class);

    assertEquals(eventTitle, upgatedEvent.getTitle());
    assertEquals(eventTitle, eventService.getById(eventId).getTitle());
    assertEquals(businessService.getById(2L).getId(), upgatedEvent.getBusiness().getId());
    assertEquals(placeService.getById(2L).getId(), upgatedEvent.getPlace().getId());
  }

  @Test
  public void deleteEvent() throws Exception {
    mockMvc.perform(delete("/api/events/2").with(csrf()));

    assertNull(eventService.getById(2L));
  }

  @Test
  public void createNewEventPhoto() throws Exception {
    Long expectedId = 5L;
    String expectedName = "imageKey-5";

    EventPhoto eventPhoto = new EventPhoto();
    eventPhoto.setImageKey(expectedName);

    String placeCategoryJson = objectMapper.writeValueAsString(modelMapper.map(eventPhoto, EventPhotoRequest.class));

    MvcResult result = mockMvc.perform(
        post("/api/events/1/photos")
            .with(csrf())
            .content(placeCategoryJson)
            .contentType(MediaType.APPLICATION_JSON))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    EventResponse updatedEvent = objectMapper.readValue(responseBody, EventResponse.class);

    assertTrue(updatedEvent.getPhotos().stream().anyMatch(photo -> photo.getPhoto().equals(expectedName)));
    assertTrue(updatedEvent.getPhotos().stream().anyMatch(photo -> photo.getId().equals(expectedId)));
  }

  @Test
  public void deleteEventPhoto() throws Exception {
    mockMvc.perform(delete("/api/events/1/photos/1").with(csrf()));

    assertNull(eventPhotoService.getEventPhotoById(1L));
  }
}
