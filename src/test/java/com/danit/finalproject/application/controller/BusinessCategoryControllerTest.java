package com.danit.finalproject.application.controller;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;

import com.amazonaws.services.s3.AmazonS3Client;
import com.danit.finalproject.application.dto.request.business.BusinessCategoryRequest;
import com.danit.finalproject.application.dto.response.business.BusinessCategoryResponse;
import com.danit.finalproject.application.entity.business.BusinessCategory;
import com.danit.finalproject.application.facade.business.BusinessCategoryFacade;
import com.danit.finalproject.application.service.AmazonS3Service;
import com.danit.finalproject.application.service.business.BusinessCategoryService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
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
@WithMockUser(authorities = "MANAGE_BUSINESS_CATEGORIES")
public class BusinessCategoryControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @Autowired
  private ModelMapper modelMapper;

  @Autowired
  private BusinessCategoryService businessCategoryService;

  @Autowired
  private BusinessCategoryFacade businessCategoryFacade;

  @MockBean
  private AmazonS3Client amazonS3Client;

  @Test
  public void getBusinessCategoryById() throws Exception {
    Long expectedId = 1L;
    String expectedName = "business-category-1";

    MvcResult result = mockMvc.perform(get("/api/business-categories/1"))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    BusinessCategoryResponse businessCategory = objectMapper.readValue(responseBody, BusinessCategoryResponse.class);

    assertEquals(expectedId, businessCategory.getId());
    assertEquals(expectedName, businessCategory.getName());
  }

  @Test
  public void getAllCategories() throws Exception {
    int expectedSize = 3;
    String secondCategoryName = "business-category-2";

    MvcResult result = mockMvc.perform(get("/api/business-categories"))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    List<BusinessCategoryResponse> categories =
        objectMapper.readValue(responseBody, new TypeReference<List<BusinessCategoryResponse>>(){});

    assertEquals(expectedSize, categories.size());
    assertEquals(secondCategoryName, categories.get(1).getName());
    assertEquals(businessCategoryService.getById(1L).getId(), categories.get(1).getParentCategory().getId());
  }

  @Test
  public void createNewBusinessCategory() throws Exception {
    Long expectedId = 3L;
    String expectedName = "business-category-3";
    BusinessCategoryResponse expectedParent = businessCategoryFacade.getById(2L);

    BusinessCategory businessCategory = new BusinessCategory();
    businessCategory.setId(expectedId);
    businessCategory.setName(expectedName);
    businessCategory.setParentCategory(businessCategoryService.getById(2L));
    String businessCategoryJson = objectMapper.writeValueAsString(
        modelMapper.map(businessCategory, BusinessCategoryRequest.class));

    MvcResult result = mockMvc.perform(
        post("/api/business-categories/")
            .with(csrf())
            .content(businessCategoryJson)
            .contentType(MediaType.APPLICATION_JSON))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    BusinessCategoryResponse createdBusinessCategory
        = objectMapper.readValue(responseBody, BusinessCategoryResponse.class);
    Long createdBusinesCategoryId= createdBusinessCategory.getId();

    assertEquals(expectedName, createdBusinessCategory.getName());
    assertEquals(expectedParent, createdBusinessCategory.getParentCategory());
    assertNotNull(createdBusinesCategoryId);
    assertNotNull(businessCategoryService.getById(createdBusinesCategoryId));
  }

  @Test
  public void updateBusinessCategory() throws Exception {
    Long businessCategoryId = 2L;
    String expectedBusinessCategoryName = "Updated";
    String expectedImageKey = UUID.randomUUID().toString() + AmazonS3Service.IMAGE_EXTENSION;
    String expectedImageUrl = "https://rion-up-project.s3.eu-central-1.amazonaws.com/" + expectedImageKey;
    BusinessCategory businessCategory = businessCategoryService.getById(businessCategoryId);
    businessCategory.setName(expectedBusinessCategoryName);
    businessCategory.setParentCategory(null);
    businessCategory.setImageKey(expectedImageKey);
    String userJson = objectMapper.writeValueAsString(
        modelMapper.map(businessCategory, BusinessCategoryRequest.class));

    when(amazonS3Client.getResourceUrl(AmazonS3Service.S3_BUCKET_NAME, expectedImageKey)).thenReturn(expectedImageUrl);

    MvcResult result = mockMvc.perform(
        put("/api/business-categories/1")
            .with(csrf())
            .content(userJson)
            .contentType(MediaType.APPLICATION_JSON))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    BusinessCategoryResponse updatedBusinessCategory =
        objectMapper.readValue(responseBody, BusinessCategoryResponse.class);

    assertEquals(expectedBusinessCategoryName, updatedBusinessCategory.getName());
    assertEquals(expectedBusinessCategoryName, businessCategoryService.getById(businessCategoryId).getName());
    assertEquals(expectedImageKey, updatedBusinessCategory.getImageKey());
    assertEquals(expectedImageUrl, updatedBusinessCategory.getImageUrl());
    assertNull(updatedBusinessCategory.getParentCategory());
    verify(amazonS3Client, times(1))
        .deleteObject(AmazonS3Service.S3_BUCKET_NAME, "imageKey");
  }

  @Test
  public void deleteBusinessCategory() throws Exception {
    int expectedCategorySize = businessCategoryService.getAll().size() - 1;
    mockMvc.perform(delete("/api/business-categories/1").with(csrf()));

    assertEquals(expectedCategorySize, businessCategoryService.getAll().size());
    verify(amazonS3Client, times(1))
        .deleteObject(AmazonS3Service.S3_BUCKET_NAME, "imageKey");
  }
}
