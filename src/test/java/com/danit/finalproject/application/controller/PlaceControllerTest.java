package com.danit.finalproject.application.controller;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.danit.finalproject.application.dto.response.place.PlaceResponse;
import com.danit.finalproject.application.entity.menuitem.MenuItemName;
import com.danit.finalproject.application.entity.place.Place;
import com.danit.finalproject.application.entity.place.PlacePhoto;
import com.danit.finalproject.application.service.place.PlaceCategoryService;
import com.danit.finalproject.application.service.place.PlacePhotoService;
import com.danit.finalproject.application.service.place.PlaceService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
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

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
@Transactional
@WithMockUser(value = "first.user@test.com")
public class PlaceControllerTest {
  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @Autowired
  private PlaceService placeService;

  @Autowired
  private PlaceCategoryService placeCategoryService;

  @Autowired
  private PlacePhotoService placePhotoService;

  @Test
  public void getPlaceById() throws Exception {
    Long expectedId = 1L;
    String expectedName = "place-1";

    MvcResult result = mockMvc.perform(get("/api/places/1").with(csrf()))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    PlaceResponse place = objectMapper.readValue(responseBody, PlaceResponse.class);

    assertEquals(expectedId, place.getId());
    assertEquals(expectedName, place.getTitle());
  }

  @Test
  public void getAllPlaces() throws Exception {
    int expectedSize = 2;
    String secondCategoryName = "place-2";

    MvcResult result = mockMvc.perform(get("/api/places"))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    List<PlaceResponse> places
        = objectMapper.readValue(responseBody, new TypeReference<List<PlaceResponse>>(){});

    assertEquals(expectedSize, places.size());
    assertEquals(secondCategoryName, places.get(1).getTitle());
  }

  @Test
  public void createNewPlace() throws Exception {
    Long expectedId = 3L;
    String expectedName = "place-3";

    Place place = new Place();
    place.setId(expectedId);
    place.setTitle(expectedName);
    place.setPlaceCategory(placeCategoryService.getById(1L));

    String placeCategoryJson = objectMapper.writeValueAsString(place);

    MvcResult result = mockMvc.perform(
        post("/api/places")
            .with(csrf())
            .content(placeCategoryJson)
            .contentType(MediaType.APPLICATION_JSON))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    PlaceResponse createdPlace = objectMapper.readValue(responseBody, PlaceResponse.class);
    Long createdPlaceId= createdPlace.getId();

    assertEquals(expectedName, createdPlace.getTitle());
    assertNotNull(createdPlaceId);
    assertEquals(createdPlace.getPlaceCategory().getId(), placeCategoryService.getById(1L).getId());
  }

  @Test
  public void updatePlace() throws Exception {
    String placeTitle = "Updated";
    Long placeId = 1L;
    Place place = placeService.getById(placeId);
    place.setTitle(placeTitle);

    String userJson = objectMapper.writeValueAsString(place);

    MvcResult result = mockMvc.perform(
        put("/api/places/1")
            .with(csrf())
            .content(userJson)
            .contentType(MediaType.APPLICATION_JSON))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    PlaceResponse upgatedPlace = objectMapper.readValue(responseBody, PlaceResponse.class);

    assertEquals(placeTitle, upgatedPlace.getTitle());
    assertEquals(placeTitle, placeService.getById(placeId).getTitle());
  }

  @Test
  public void deletePlace() throws Exception {
    mockMvc.perform(delete("/api/places/2").with(csrf()));

    assertNull(placeService.getById(2L));
  }

  @Test
  public void createNewPlacePhoto() throws Exception {
    Long expectedId = 5L;
    String expectedName = "photo-5";

    PlacePhoto placePhoto = new PlacePhoto();
    placePhoto.setId(expectedId);
    placePhoto.setPhoto(expectedName);

    String placePhotoJson = objectMapper.writeValueAsString(placePhoto);

    MvcResult result = mockMvc.perform(
        post("/api/places/1/photos")
            .with(csrf())
            .content(placePhotoJson)
            .contentType(MediaType.APPLICATION_JSON))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    PlaceResponse updatedPlace = objectMapper.readValue(responseBody, PlaceResponse.class);

    assertTrue(updatedPlace.getPhotos().stream().anyMatch(photo -> photo.getPhoto().equals(expectedName)));
    assertTrue(updatedPlace.getPhotos().stream().anyMatch(photo -> photo.getId().equals(expectedId)));
  }

  @Test
  public void deletePlacePhoto() throws Exception {
    mockMvc.perform(delete("/api/places/1/photos/1").with(csrf()));
    assertNull(placePhotoService.getPlacePhotoById(1L));
  }

  @Test
  public void getAvailableMenuItemNames() throws Exception {
    String response = mockMvc.perform(get("/api/places/menu-items"))
        .andExpect(status().isOk())
        .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
        .andReturn()
        .getResponse()
        .getContentAsString();
    ;
    assertEquals(Arrays.asList(MenuItemName.values()),
        new ObjectMapper().readValue(response, new TypeReference<ArrayList<MenuItemName>>() {}));
  }
}
