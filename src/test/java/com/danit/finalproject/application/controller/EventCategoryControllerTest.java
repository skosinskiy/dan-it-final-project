package com.danit.finalproject.application.controller;

import com.danit.finalproject.application.entity.event.EventCategory;
import com.danit.finalproject.application.service.event.EventCategoryService;
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
public class EventCategoryControllerTest {
  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @Autowired
  private EventCategoryService eventCategoryService;

  @Test
  public void getEventCategoryById() throws Exception {
    Long expectedId = 1L;
    String expectedName = "event-category-1";

    MvcResult result = mockMvc.perform(get("/api/event-categories/1"))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    EventCategory eventCategory = objectMapper.readValue(responseBody, EventCategory.class);

    assertEquals(expectedId, eventCategory.getId());
    assertEquals(expectedName, eventCategory.getName());
  }

  @Test
  public void getAllCategories() throws Exception {
    int expectedSize = 2;
    String secondCategoryName = "event-category-2";

    MvcResult result = mockMvc.perform(get("/api/event-categories"))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    List<EventCategory> categories = objectMapper.readValue(responseBody, new TypeReference<List<EventCategory>>(){});

    assertEquals(expectedSize, categories.size());
    assertEquals(secondCategoryName, categories.get(1).getName());
    assertEquals(eventCategoryService.getEventCategoryById(1L).getId(), categories.get(1).getParentCategory().getId());
  }

  @Test
  public void createNewPlaceCategory() throws Exception {
    Long expectedId = 3L;
    String expectedName = "event-category-3";
    EventCategory expectedParent = eventCategoryService.getEventCategoryById(2L);

    EventCategory eventCategory = new EventCategory();
    eventCategory.setId(expectedId);
    eventCategory.setName(expectedName);
    eventCategory.setParentCategory(eventCategoryService.getEventCategoryById(2L));
    String eventCategoryJson = objectMapper.writeValueAsString(eventCategory);

    MvcResult result = mockMvc.perform(
        post("/api/event-categories/")
            .with(csrf())
            .content(eventCategoryJson)
            .contentType(MediaType.APPLICATION_JSON))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    EventCategory createdEventCategory = objectMapper.readValue(responseBody, EventCategory.class);
    Long createdEventCategoryId= createdEventCategory.getId();

    assertEquals(expectedName, createdEventCategory.getName());
    assertEquals(expectedParent, createdEventCategory.getParentCategory());
    assertNotNull(createdEventCategory.getCreatedDate());
    assertNotNull(createdEventCategory.getModifiedDate());
    assertNotNull(createdEventCategoryId);
    assertNotNull(eventCategoryService.getEventCategoryById(createdEventCategoryId));
  }

  @Test
  public void updateBusinessCategory() throws Exception {
    String eventCategoryName = "Updated";
    Long eventCategoryId = 2L;
    EventCategory eventCategory = eventCategoryService.getEventCategoryById(eventCategoryId);
    eventCategory.setName(eventCategoryName);
    eventCategory.setParentCategory(null);
    String userJson = objectMapper.writeValueAsString(eventCategory);

    MvcResult result = mockMvc.perform(
        put("/api/event-categories/1")
            .with(csrf())
            .content(userJson)
            .contentType(MediaType.APPLICATION_JSON))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    EventCategory upgatedEventCategory = objectMapper.readValue(responseBody, EventCategory.class);

    assertEquals(eventCategoryName, upgatedEventCategory.getName());
    assertEquals(eventCategoryName, eventCategoryService.getEventCategoryById(eventCategoryId).getName());
    assertNull(upgatedEventCategory.getParentCategory());
  }

  @Test
  public void deleteEventCategory() throws Exception {
    mockMvc.perform(delete("/api/event-categories/2").with(csrf()));

    assertNull(eventCategoryService.getEventCategoryById(2L));
  }
}
