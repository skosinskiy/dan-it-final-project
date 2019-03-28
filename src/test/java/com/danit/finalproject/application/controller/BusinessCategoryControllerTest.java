package com.danit.finalproject.application.controller;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;

import com.danit.finalproject.application.dto.response.business.BusinessCategoryResponse;
import com.danit.finalproject.application.entity.business.BusinessCategory;
import com.danit.finalproject.application.facade.business.BusinessCategoryFacade;
import com.danit.finalproject.application.service.business.BusinessCategoryService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
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
@WithMockUser(authorities = "MANAGE_BUSINESS_CATEGORIES")
public class BusinessCategoryControllerTest {
  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @Autowired
  private BusinessCategoryService businessCategoryService;

  @Autowired
  private BusinessCategoryFacade businessCategoryFacade;

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
    int expectedSize = 2;
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
    String businessCategoryJson = objectMapper.writeValueAsString(businessCategory);

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
    String businessCategoryName = "Updated";
    Long businessCategoryId = 2L;
    BusinessCategory businessCategory = businessCategoryService.getById(businessCategoryId);
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
    BusinessCategoryResponse updatedBusinessCategory =
        objectMapper.readValue(responseBody, BusinessCategoryResponse.class);

    assertEquals(businessCategoryName, updatedBusinessCategory.getName());
    assertEquals(businessCategoryName, businessCategoryService.getById(businessCategoryId).getName());
    assertNull(updatedBusinessCategory.getParentCategory());
  }

  @Test
  public void deleteBusinessCategory() throws Exception {
    mockMvc.perform(delete("/api/business-categories/2").with(csrf()));

    assertNull(businessCategoryService.getById(2L));
  }
}
