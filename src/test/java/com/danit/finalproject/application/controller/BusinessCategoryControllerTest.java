package com.danit.finalproject.application.controller;

import com.danit.finalproject.application.entity.business.BusinessCategory;
import com.danit.finalproject.application.service.business.BusinessCategoryService;
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
public class BusinessCategoryControllerTest {
  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @Autowired
  private BusinessCategoryService businessCategoryService;

  @Test
  public void getBusinessCategoryById() throws Exception {
    Long expectedId = 1L;
    String expectedName = "business-category-1";

    MvcResult result = mockMvc.perform(get("/api/business-categories/1"))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    BusinessCategory businessCategory = objectMapper.readValue(responseBody, BusinessCategory.class);

    assertEquals(expectedId, businessCategory.getId());
    assertEquals(expectedName, businessCategory.getName());
  }

  @Test
  public void getAllCategories() throws Exception {
    int expectedSize = 2;
    String secondCategoryName = "business-category-2";

    MvcResult result = mockMvc.perform(get("/api/business-categories"))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    List<BusinessCategory> categories = objectMapper.readValue(responseBody, new TypeReference<List<BusinessCategory>>(){});

    assertEquals(expectedSize, categories.size());
    assertEquals(secondCategoryName, categories.get(1).getName());
    assertEquals(businessCategoryService.getBusinessCategoryById(1L).getId(), categories.get(1).getParentCategory().getId());
  }

  @Test
  public void createNewPlaceCategory() throws Exception {
    Long expectedId = 3L;
    String expectedName = "business-category-3";
    BusinessCategory expectedParent = businessCategoryService.getBusinessCategoryById(2L);

    BusinessCategory businessCategory = new BusinessCategory();
    businessCategory.setId(expectedId);
    businessCategory.setName(expectedName);
    businessCategory.setParentCategory(businessCategoryService.getBusinessCategoryById(2L));
    String businessCategoryJson = objectMapper.writeValueAsString(businessCategory);

    MvcResult result = mockMvc.perform(
        post("/api/business-categories/")
            .with(csrf())
            .content(businessCategoryJson)
            .contentType(MediaType.APPLICATION_JSON))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    BusinessCategory createdBusinessCategory = objectMapper.readValue(responseBody, BusinessCategory.class);
    Long createdBusinesCategoryId= createdBusinessCategory.getId();

    assertEquals(expectedName, createdBusinessCategory.getName());
    assertEquals(expectedParent, createdBusinessCategory.getParentCategory());
    assertNotNull(createdBusinessCategory.getCreatedDate());
    assertNotNull(createdBusinessCategory.getModifiedDate());
    assertNotNull(createdBusinesCategoryId);
    assertNotNull(businessCategoryService.getBusinessCategoryById(createdBusinesCategoryId));
  }

  @Test
  public void updateBusinessCategory() throws Exception {
    String businessCategoryName = "Updated";
    Long businessCategoryId = 2L;
    BusinessCategory businessCategory = businessCategoryService.getBusinessCategoryById(businessCategoryId);
    businessCategory.setName(businessCategoryName);
    businessCategory.setParentCategory(null);
    String userJson = objectMapper.writeValueAsString(businessCategory);

    MvcResult result = mockMvc.perform(
        put("/api/business-categories/1")
            .with(csrf())
            .content(userJson)
            .contentType(MediaType.APPLICATION_JSON))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    BusinessCategory upgatedBusinesCategory = objectMapper.readValue(responseBody, BusinessCategory.class);

    assertEquals(businessCategoryName, upgatedBusinesCategory.getName());
    assertEquals(businessCategoryName, businessCategoryService.getBusinessCategoryById(businessCategoryId).getName());
    assertNull(upgatedBusinesCategory.getParentCategory());
  }

  @Test
  public void deleteBusinessCategory() throws Exception {
    mockMvc.perform(delete("/api/business-categories/2").with(csrf()));

    assertNull(businessCategoryService.getBusinessCategoryById(2L));
  }
}
