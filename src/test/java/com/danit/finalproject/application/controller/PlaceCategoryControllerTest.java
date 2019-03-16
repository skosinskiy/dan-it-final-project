package com.danit.finalproject.application.controller;

import com.danit.finalproject.application.entity.place.PlaceCategory;
import com.danit.finalproject.application.service.place.PlaceCategoryService;
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

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
@Transactional
public class PlaceCategoryControllerTest {
  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @Autowired
  private PlaceCategoryService placeCategoryService;

  @Test
  public void getPlaceCategoryById() throws Exception {
    Long expectedId = 1L;
    String expectedName = "place-category-1";

    MvcResult result = mockMvc.perform(get("/api/place-categories/1"))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    PlaceCategory placeCategory = objectMapper.readValue(responseBody, PlaceCategory.class);

    assertEquals(expectedId, placeCategory.getId());
    assertEquals(expectedName, placeCategory.getName());
  }

  @Test
  public void getAllCategories() throws Exception {
    int expectedSize = 2;
    String secondCategoryName = "place-category-2";

    MvcResult result = mockMvc.perform(get("/api/place-categories"))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    List<PlaceCategory> categories = objectMapper.readValue(responseBody, new TypeReference<List<PlaceCategory>>(){});

    assertEquals(expectedSize, categories.size());
    assertEquals(secondCategoryName, categories.get(1).getName());
  }

  @Test
  public void createNewPlaceCategory() throws Exception {
    Long expectedId = 3L;
    String expectedName = "place-category-3";

    PlaceCategory placeCategory = new PlaceCategory();
    placeCategory.setId(expectedId);
    placeCategory.setName(expectedName);
    String placeCategoryJson = objectMapper.writeValueAsString(placeCategory);

    MvcResult result = mockMvc.perform(
        post("/api/place-categories/")
            .content(placeCategoryJson)
            .contentType(MediaType.APPLICATION_JSON))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    PlaceCategory createdPlaceCategory = objectMapper.readValue(responseBody, PlaceCategory.class);
    Long createdPlaceCategoryId= createdPlaceCategory.getId();

    assertEquals(expectedName, createdPlaceCategory.getName());
    assertNotNull(createdPlaceCategory.getCreatedDate());
    assertNotNull(createdPlaceCategory.getModifiedDate());
    assertNotNull(createdPlaceCategoryId);
    assertNotNull(placeCategoryService.getPlaceCategoryById(createdPlaceCategoryId));
  }

  @Test
  public void updatePlaceCategory() throws Exception {
    String placeCategoryName = "Updated";
    Long placeCategoryId = 1L;
    PlaceCategory placeCategory = placeCategoryService.getPlaceCategoryById(placeCategoryId);
    placeCategory.setName(placeCategoryName);
    String userJson = objectMapper.writeValueAsString(placeCategory);

    MvcResult result = mockMvc.perform(
        put("/api/place-categories/1")
            .content(userJson)
            .contentType(MediaType.APPLICATION_JSON))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    PlaceCategory upgatedPlaceCategory = objectMapper.readValue(responseBody, PlaceCategory.class);

    assertEquals(placeCategoryName, upgatedPlaceCategory.getName());
    assertEquals(placeCategoryName, placeCategoryService.getPlaceCategoryById(placeCategoryId).getName());
  }

  @Test
  public void deletePlaceCategory() throws Exception {
    mockMvc.perform(delete("/api/place-categories/2"));

    assertNull(placeCategoryService.getPlaceCategoryById(2L));
  }
}
