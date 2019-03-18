package com.danit.finalproject.application.controller;

import com.danit.finalproject.application.entity.business.BusinessPhoto;
import com.danit.finalproject.application.service.business.BusinessPhotoService;
import com.danit.finalproject.application.service.business.BusinessService;
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

import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
@Transactional
public class BusinessPhotoControllerTest {
  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @Autowired
  private BusinessService businessService;

  @Autowired
  private BusinessPhotoService businessPhotoService;

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
