package com.danit.finalproject.application.controller;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;

import com.danit.finalproject.application.dto.request.event.EventCategoryRequest;
import com.danit.finalproject.application.dto.response.event.EventCategoryResponse;
import com.danit.finalproject.application.entity.event.EventCategory;
import com.danit.finalproject.application.facade.event.EventCategoryFacade;
import com.danit.finalproject.application.service.event.EventCategoryService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
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
@WithMockUser(authorities = "MANAGE_EVENT_CATEGORIES")
public class EventCategoryControllerTest {
  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @Autowired
  private ModelMapper modelMapper;

  @Autowired
  private EventCategoryService eventCategoryService;

  @Autowired
  private EventCategoryFacade eventCategoryFacade;

  @Test
  public void getEventCategoryById() throws Exception {
    Long expectedId = 1L;
    String expectedName = "event-category-1";

    MvcResult result = mockMvc.perform(get("/api/event-categories/1"))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    EventCategoryResponse eventCategory = objectMapper.readValue(responseBody, EventCategoryResponse.class);

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
    List<EventCategoryResponse> categories = objectMapper.readValue(responseBody, new TypeReference<List<EventCategoryResponse>>(){});

    assertEquals(expectedSize, categories.size());
    assertEquals(secondCategoryName, categories.get(1).getName());
    assertEquals(eventCategoryService.getById(1L).getId(), categories.get(1).getParentCategory().getId());
  }

  @Test
  public void createNewPlaceCategory() throws Exception {
    Long expectedId = 3L;
    String expectedName = "event-category-3";
    EventCategoryResponse expectedParent = eventCategoryFacade.getById(2L);

    EventCategory eventCategory = new EventCategory();
    eventCategory.setId(expectedId);
    eventCategory.setName(expectedName);
    eventCategory.setParentCategory(eventCategoryService.getById(2L));
    String eventCategoryJson = objectMapper.writeValueAsString(modelMapper.map(eventCategory, EventCategoryRequest.class));

    MvcResult result = mockMvc.perform(
        post("/api/event-categories/")
            .with(csrf())
            .content(eventCategoryJson)
            .contentType(MediaType.APPLICATION_JSON))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    EventCategoryResponse createdEventCategory = objectMapper.readValue(responseBody, EventCategoryResponse.class);
    Long createdEventCategoryId= createdEventCategory.getId();

    assertEquals(expectedName, createdEventCategory.getName());
    assertEquals(expectedParent,  createdEventCategory.getParentCategory());
    assertNotNull(createdEventCategoryId);
    assertNotNull(eventCategoryService.getById(createdEventCategoryId));
  }

  @Test
  public void updateBusinessCategory() throws Exception {
    String eventCategoryName = "Updated";
    Long eventCategoryId = 2L;
    EventCategory eventCategory = eventCategoryService.getById(eventCategoryId);
    eventCategory.setName(eventCategoryName);
    eventCategory.setParentCategory(null);
    String userJson = objectMapper.writeValueAsString(modelMapper.map(eventCategory, EventCategoryRequest.class));

    MvcResult result = mockMvc.perform(
        put("/api/event-categories/1")
            .with(csrf())
            .content(userJson)
            .contentType(MediaType.APPLICATION_JSON))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    EventCategoryResponse upgatedEventCategory = objectMapper.readValue(responseBody, EventCategoryResponse.class);

    assertEquals(eventCategoryName, upgatedEventCategory.getName());
    assertEquals(eventCategoryName, eventCategoryService.getById(eventCategoryId).getName());
    assertNull(upgatedEventCategory.getParentCategory());
  }

  @Test
  public void deleteEventCategory() throws Exception {
    mockMvc.perform(delete("/api/event-categories/2").with(csrf()));

    assertNull(eventCategoryService.getById(2L));
  }
}
