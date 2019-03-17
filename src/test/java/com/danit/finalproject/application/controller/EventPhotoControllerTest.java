package com.danit.finalproject.application.controller;

import com.danit.finalproject.application.entity.event.EventPhoto;
import com.danit.finalproject.application.entity.place.PlacePhoto;
import com.danit.finalproject.application.service.business.BusinessService;
import com.danit.finalproject.application.service.event.EventPhotoService;
import com.danit.finalproject.application.service.event.EventService;
import com.danit.finalproject.application.service.place.PlaceCategoryService;
import com.danit.finalproject.application.service.place.PlacePhotoService;
import com.danit.finalproject.application.service.place.PlaceService;
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

import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
@Transactional
public class EventPhotoControllerTest {
  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @Autowired
  private EventService eventService;

  @Autowired
  private EventPhotoService eventPhotoService;

  @Test
  public void createNewEventPhoto() throws Exception {
    Long expectedId = 3L;
    String expectedName = "photo-3";

    EventPhoto eventPhoto = new EventPhoto();
    eventPhoto.setId(expectedId);
    eventPhoto.setPhoto(expectedName);

    String placeCategoryJson = objectMapper.writeValueAsString(eventPhoto);

    MvcResult result = mockMvc.perform(
        post("/api/events/1/photos")
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
  public void deletePlace() throws Exception {
    mockMvc.perform(delete("/api/events/1/photos/1"));

    assertNull(eventPhotoService.getEventPhotoByIdAndEvent(1L, 1L));
  }
}
