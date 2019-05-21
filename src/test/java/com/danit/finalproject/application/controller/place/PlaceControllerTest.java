package com.danit.finalproject.application.controller.place;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;

import com.amazonaws.services.s3.AmazonS3Client;
import com.danit.finalproject.application.dto.request.place.PlaceRequest;
import com.danit.finalproject.application.dto.response.place.PlaceResponse;
import com.danit.finalproject.application.entity.place.Place;
import com.danit.finalproject.application.entity.place.PlacePhoto;
import com.danit.finalproject.application.service.AmazonS3Service;
import com.danit.finalproject.application.service.place.PlaceCategoryService;
import com.danit.finalproject.application.service.place.PlacePhotoService;
import com.danit.finalproject.application.service.place.PlaceService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
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
@WithMockUser(authorities = "MANAGE_PLACES")
public class PlaceControllerTest {
  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @Autowired
  private ModelMapper modelMapper;

  @Autowired
  private PlaceService placeService;

  @Autowired
  private PlaceCategoryService placeCategoryService;

  @Autowired
  private PlacePhotoService placePhotoService;

  @MockBean
  private AmazonS3Client amazonS3Client;

  @Test
  public void getPlaceById() throws Exception {
    Long expectedId = 1L;
    String expectedName = "Ocean Plaza";

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

    MvcResult result = mockMvc.perform(get("/api/places"))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    HashMap<String, Object> places
        = objectMapper.readValue(responseBody, new TypeReference<HashMap<String, Object>>(){});

    assertEquals(expectedSize, ((List) places.get("content")).size());
  }

  @Test
  public void createNewPlace() throws Exception {
    Long expectedId = 3L;
    String expectedName = "place-3";

    Place place = new Place();
    place.setTitle(expectedName);
    place.setPlaceCategory(placeCategoryService.getById(1L));

    String placeCategoryJson = objectMapper.writeValueAsString(modelMapper.map(place, PlaceRequest.class));

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
    assertEquals(expectedId, createdPlaceId);
    assertEquals(createdPlace.getPlaceCategory().getId(), placeCategoryService.getById(1L).getId());
  }

  @Test
  public void updatePlace() throws Exception {
    String placeTitle = "Updated";
    Long placeId = 1L;
    Place place = placeService.getById(placeId);
    place.setTitle(placeTitle);

    String userJson = objectMapper.writeValueAsString(modelMapper.map(place, PlaceRequest.class));

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

    verify(amazonS3Client, times(1))
        .deleteObject(AmazonS3Service.S3_BUCKET_NAME, "imageKey-3");
    verify(amazonS3Client, times(1))
        .deleteObject(AmazonS3Service.S3_BUCKET_NAME, "imageKey-4");
    assertNull(placeService.getById(2L));
  }

  @Test
  public void createNewPlacePhoto() throws Exception {
    Long expectedId = 5L;
    String expectedImageKey = UUID.randomUUID().toString() + AmazonS3Service.IMAGE_EXTENSION;
    String expectedImageUrl = "https://rion-up-project.s3.eu-central-1.amazonaws.com/" + expectedImageKey;

    PlacePhoto placePhoto = new PlacePhoto();
    placePhoto.setImageKey(expectedImageKey);
    List<PlacePhoto> placePhotos = new ArrayList<>();
    placePhotos.add(placePhoto);

    when(amazonS3Client.getResourceUrl(AmazonS3Service.S3_BUCKET_NAME, expectedImageKey))
        .thenReturn(expectedImageUrl);
    when(amazonS3Client.getResourceUrl(AmazonS3Service.S3_BUCKET_NAME, "imageKey")).thenReturn("imageUrl");

    String placePhotoJson = objectMapper.writeValueAsString(placePhotos);

    MvcResult result = mockMvc.perform(
        post("/api/places/1/photos")
            .with(csrf())
            .content(placePhotoJson)
            .contentType(MediaType.APPLICATION_JSON))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    PlaceResponse updatedPlace = objectMapper.readValue(responseBody, PlaceResponse.class);

    assertTrue(updatedPlace.getPhotos().stream().anyMatch(photo -> photo.getImageKey().equals(expectedImageKey)));
    assertTrue(updatedPlace.getPhotos().stream().anyMatch(photo -> photo.getId().equals(expectedId)));
    assertTrue(updatedPlace.getPhotos().stream().anyMatch(photo -> photo.getImageUrl().equals(expectedImageUrl)));
  }

  @Test
  public void deletePlacePhoto() throws Exception {
    mockMvc.perform(delete("/api/places/1/photos/1").with(csrf()));
    assertNull(placePhotoService.getPlacePhotoById(1L));
  }

}
