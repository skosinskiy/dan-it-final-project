package com.danit.finalproject.application.controller;

import com.danit.finalproject.application.entity.business.Business;
import com.danit.finalproject.application.entity.business.BusinessCategory;
import com.danit.finalproject.application.entity.business.BusinessPhoto;
import com.danit.finalproject.application.service.business.BusinessCategoryService;
import com.danit.finalproject.application.service.business.BusinessPhotoService;
import com.danit.finalproject.application.service.business.BusinessService;
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
public class BusinessControllerTest {
  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @Autowired
  private BusinessCategoryService businessCategoryService;

  @Autowired
  private BusinessService businessService;

  @Autowired
  private PlaceService placeService;

  @Autowired
  private BusinessPhotoService businessPhotoService;

  @Test
  public void getBusinessById() throws Exception {
    Long expectedId = 1L;
    String expectedName = "business-1";

    MvcResult result = mockMvc.perform(get("/api/businesses/1"))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    Business business = objectMapper.readValue(responseBody, Business.class);

    assertEquals(expectedId, business.getId());
    assertEquals(expectedName, business.getTitle());
  }

  @Test
  public void getAllBusinessesByPlace() throws Exception {
    int expectedSize = 2;
    String secondCategoryName = "business-3";

    MvcResult result = mockMvc.perform(get("/api/businesses?placeId=1"))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    List<Business> businesses = objectMapper.readValue(responseBody, new TypeReference<List<Business>>(){});

    assertEquals(expectedSize, businesses.size());
    assertEquals(secondCategoryName, businesses.get(1).getTitle());
  }

  @Test
  public void createNewBusiness() throws Exception {
    Long expectedId = 4L;
    String expectedName = "business-4";

    Business business = new Business();
    business.setId(expectedId);
    business.setTitle(expectedName);
    business.setPlace(placeService.getPlaceById(2L));

    List<BusinessCategory> businessCategories = new ArrayList<>();
    businessCategories.add(businessCategoryService.getBusinessCategoryById(1L));
    businessCategories.add(businessCategoryService.getBusinessCategoryById(2L));
    business.setCategories(businessCategories);

    String businessJson = objectMapper.writeValueAsString(business);

    MvcResult result = mockMvc.perform(
        post("/api/businesses")
            .content(businessJson)
            .contentType(MediaType.APPLICATION_JSON))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    Business createdBusiness = objectMapper.readValue(responseBody, Business.class);
    Long createdBUsinessId= createdBusiness.getId();

    assertEquals(expectedName, createdBusiness.getTitle());
    assertNotNull(createdBusiness.getCreatedDate());
    assertNotNull(createdBusiness.getModifiedDate());
    assertNotNull(createdBUsinessId);
    assertEquals(createdBusiness.getCategories().get(0).getId(), businessCategoryService.getBusinessCategoryById(1L).getId());
    assertEquals(createdBusiness.getPlace().getId(), placeService.getPlaceById(2L).getId());
 }

  @Test
  public void updateBusiness() throws Exception {
    String businessTitle = "Updated";
    Long businesssId = 1L;
    Business business = businessService.getBusinessById(businesssId);
    business.setTitle(businessTitle);
    business.setPlace(placeService.getPlaceById(2L));

    String userJson = objectMapper.writeValueAsString(business);

    MvcResult result = mockMvc.perform(
        put("/api/businesses/1")
            .content(userJson)
            .contentType(MediaType.APPLICATION_JSON))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    Business upgatedBusiness = objectMapper.readValue(responseBody, Business.class);

    assertEquals(businessTitle, upgatedBusiness.getTitle());
    assertEquals(businessTitle, businessService.getBusinessById(businesssId).getTitle());
    assertEquals(upgatedBusiness.getPlace().getId(), placeService.getPlaceById(2L).getId());
  }

  @Test
  public void deleteBusiness() throws Exception {
    mockMvc.perform(delete("/api/businesses/2"));

    assertNull(businessService.getBusinessById(2L));
  }

  @Test
  public void createNewBusinessPhoto() throws Exception {
    Long expectedId = 5L;
    String expectedName = "photo-5";

    BusinessPhoto businessPhoto = new BusinessPhoto();
    businessPhoto.setId(expectedId);
    businessPhoto.setPhoto(expectedName);

    String businessPhotoJson = objectMapper.writeValueAsString(businessPhoto);

    MvcResult result = mockMvc.perform(
        post("/api/businesses/2/photos")
            .content(businessPhotoJson)
            .contentType(MediaType.APPLICATION_JSON))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    BusinessPhoto createdBUsinessPhoto = objectMapper.readValue(responseBody, BusinessPhoto.class);
    Long createdBusinessPhotoId= createdBUsinessPhoto.getId();

    assertEquals(expectedName, createdBUsinessPhoto.getPhoto());
    assertNotNull(createdBUsinessPhoto.getCreatedDate());
    assertNotNull(createdBUsinessPhoto.getModifiedDate());
    assertNotNull(createdBusinessPhotoId);
    assertEquals(createdBUsinessPhoto.getBusiness().getId(), businessService.getBusinessById(2L).getId());
  }

  @Test
  public void deletePlace() throws Exception {
    mockMvc.perform(delete("/api/businesses/1/photos/1"));

    assertNull(businessPhotoService.getBusinessPhotoById(1L));
  }
}
