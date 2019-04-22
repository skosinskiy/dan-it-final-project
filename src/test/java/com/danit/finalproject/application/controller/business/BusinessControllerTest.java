package com.danit.finalproject.application.controller.business;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;

import com.amazonaws.services.s3.AmazonS3Client;
import com.danit.finalproject.application.dto.request.business.BusinessPhotoRequest;
import com.danit.finalproject.application.dto.request.business.BusinessRequest;
import com.danit.finalproject.application.dto.response.business.BusinessResponse;
import com.danit.finalproject.application.dto.view.View;
import com.danit.finalproject.application.entity.business.Business;
import com.danit.finalproject.application.entity.business.BusinessCategory;
import com.danit.finalproject.application.entity.business.BusinessPhoto;
import com.danit.finalproject.application.entity.event.Event;
import com.danit.finalproject.application.service.AmazonS3Service;
import com.danit.finalproject.application.service.business.BusinessCategoryService;
import com.danit.finalproject.application.service.business.BusinessPhotoService;
import com.danit.finalproject.application.service.business.BusinessService;
import com.danit.finalproject.application.service.event.EventService;
import com.danit.finalproject.application.service.place.PlaceService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
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
@WithMockUser(authorities = "MANAGE_BUSINESSES")
public class BusinessControllerTest {
  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @Autowired
  private ModelMapper modelMapper;

  @Autowired
  private BusinessCategoryService businessCategoryService;

  @Autowired
  private BusinessService businessService;

  @Autowired
  private PlaceService placeService;

  @Autowired
  private BusinessPhotoService businessPhotoService;

  @MockBean
  private AmazonS3Client amazonS3Client;

  @Test
  public void getBusinessById() throws Exception {
    Long expectedId = 1L;
    String expectedName = "Cupcake";

    MvcResult result = mockMvc.perform(get("/api/businesses/1"))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    BusinessResponse business = objectMapper.readValue(responseBody, BusinessResponse.class);

    assertEquals(expectedId, business.getId());
    assertEquals(expectedName, business.getTitle());
  }

  @Test
  public void getAllBusinessesByPlace() throws Exception {
    int expectedSize = 6;
    String secondCategoryName = "business-3";

    MvcResult result = mockMvc.perform(get("/api/businesses?placeId=1"))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    HashMap<String, Object> businesses
        = objectMapper.readValue(responseBody, new TypeReference<HashMap<String, Object>>() {
    });

    assertEquals(expectedSize, ((List) businesses.get("content")).size());
    assertEquals(secondCategoryName, ((LinkedHashMap) ((List) businesses.get("content")).get(1)).get("title"));
  }

  @Test
  public void businessesAreFoundByPartOfTitle() throws Exception {
    int expectedSize = 1;
    String titlePart = "ness-1";

    MvcResult result = mockMvc.perform(get("/api/businesses?title=" + titlePart))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    HashMap<String, Object> businesses
        = objectMapper.readValue(responseBody, new TypeReference<HashMap<String, Object>>() {
    });

    assertEquals(expectedSize, ((List) businesses.get("content")).size());
    assertTrue(((String) (((LinkedHashMap) ((List) businesses.get("content")).get(0)).get("title"))).contains(titlePart));
  }

  @Test
  public void createNewBusiness() throws Exception {
    Long expectedId = 4L;
    String expectedName = "business-4";

    Business business = new Business();
    business.setId(expectedId);
    business.setTitle(expectedName);
    business.setPlace(placeService.getById(2L));

    List<BusinessCategory> businessCategories = new ArrayList<>();
    businessCategories.add(businessCategoryService.getById(1L));
    businessCategories.add(businessCategoryService.getById(2L));
    business.setCategories(businessCategories);

    String businessJson = objectMapper
        .writerWithView(View.Business.class)
        .writeValueAsString(modelMapper.map(business, BusinessRequest.class));

    MvcResult result = mockMvc.perform(
        post("/api/businesses")
            .with(csrf())
            .content(businessJson)
            .contentType(MediaType.APPLICATION_JSON))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    BusinessResponse createdBusiness = objectMapper.readValue(responseBody, BusinessResponse.class);
    Long createdBUsinessId = createdBusiness.getId();

    assertEquals(expectedName, createdBusiness.getTitle());
    assertNotNull(createdBUsinessId);
    assertEquals(createdBusiness.getCategories().get(0).getId(), businessCategoryService.getById(1L).getId());
    assertEquals(createdBusiness.getPlace().getId(), placeService.getById(2L).getId());
  }

  @Test
  public void updateBusiness() throws Exception {
    String businessTitle = "Updated";
    Long businesssId = 1L;
    Business business = businessService.getById(businesssId);
    business.setTitle(businessTitle);
    business.setPlace(placeService.getById(2L));

    String userJson = objectMapper
        .writerWithView(View.Business.class)
        .writeValueAsString(modelMapper.map(business, BusinessRequest.class));

    MvcResult result = mockMvc.perform(
        put("/api/businesses/1")
            .with(csrf())
            .content(userJson)
            .contentType(MediaType.APPLICATION_JSON))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    BusinessResponse upgatedBusiness = objectMapper.readValue(responseBody, BusinessResponse.class);

    assertEquals(businessTitle, upgatedBusiness.getTitle());
    assertEquals(businessTitle, businessService.getById(businesssId).getTitle());
    assertEquals(upgatedBusiness.getPlace().getId(), placeService.getById(2L).getId());
  }

  @Test
  public void deleteBusiness() throws Exception {
    mockMvc.perform(delete("/api/businesses/2").with(csrf()));

    verify(amazonS3Client, times(1))
        .deleteObject(AmazonS3Service.S3_BUCKET_NAME, "imageKey-3");
    verify(amazonS3Client, times(1))
        .deleteObject(AmazonS3Service.S3_BUCKET_NAME, "imageKey-4");
    assertNull(businessService.getById(2L));
  }

  @Test
  public void createNewBusinessPhoto() throws Exception {
    Long expectedId = 5L;
    String expectedImageKey = UUID.randomUUID().toString() + AmazonS3Service.IMAGE_EXTENSION;
    String expectedImageUrl = "https://rion-up-project.s3.eu-central-1.amazonaws.com/" + expectedImageKey;

    BusinessPhoto businessPhoto = new BusinessPhoto();
    businessPhoto.setImageKey(expectedImageKey);
    List<BusinessPhoto> businessPhotos = new ArrayList<>();
    businessPhotos.add(businessPhoto);

    when(amazonS3Client.getResourceUrl(AmazonS3Service.S3_BUCKET_NAME, expectedImageKey))
        .thenReturn(expectedImageUrl);
    when(amazonS3Client.getResourceUrl(AmazonS3Service.S3_BUCKET_NAME, "imageKey")).thenReturn("imageUrl");

    String businessPhotoJson = objectMapper
        .writerWithView(View.Business.class)
        .writeValueAsString(modelMapper.map(businessPhotos, new TypeToken<List<BusinessPhotoRequest>>() {
        }.getType()));

    MvcResult result = mockMvc.perform(
        post("/api/businesses/2/photos")
            .with(csrf())
            .content(businessPhotoJson)
            .contentType(MediaType.APPLICATION_JSON))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    BusinessResponse updatedBusiness = objectMapper.readValue(responseBody, BusinessResponse.class);

    assertTrue(updatedBusiness.getPhotos().stream().anyMatch(photo -> photo.getImageKey().equals(expectedImageKey)));
    assertTrue(updatedBusiness.getPhotos().stream().anyMatch(photo -> photo.getId().equals(expectedId)));
    assertTrue(updatedBusiness.getPhotos().stream().anyMatch(photo -> photo.getImageUrl().equals(expectedImageUrl)));
  }

  @Test
  public void deleteBusinessPhoto() throws Exception {
    mockMvc.perform(delete("/api/businesses/1/photos/1").with(csrf()));

    assertNull(businessPhotoService.getBusinessPhotoById(1L));
  }
}
