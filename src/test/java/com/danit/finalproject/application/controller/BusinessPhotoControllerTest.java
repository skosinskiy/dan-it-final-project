package com.danit.finalproject.application.controller;

import com.danit.finalproject.application.entity.business.BusinessPhoto;
import com.danit.finalproject.application.entity.event.EventPhoto;
import com.danit.finalproject.application.service.business.BusinessPhotoService;
import com.danit.finalproject.application.service.business.BusinessService;
import com.danit.finalproject.application.service.event.EventPhotoService;
import com.danit.finalproject.application.service.event.EventService;
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
  public void createNewEventPhoto() throws Exception {
    Long expectedId = 3L;
    String expectedName = "photo-3";

    BusinessPhoto businessPhoto = new BusinessPhoto();
    businessPhoto.setId(expectedId);
    businessPhoto.setPhoto(expectedName);

    String placeCategoryJson = objectMapper.writeValueAsString(businessPhoto);

    MvcResult result = mockMvc.perform(
        post("/api/businesses/1/photos")
            .content(placeCategoryJson)
            .contentType(MediaType.APPLICATION_JSON))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    BusinessPhoto createdBusinessPhoto = objectMapper.readValue(responseBody, BusinessPhoto.class);
    Long createdBusinessPhotoId= createdBusinessPhoto.getId();

    assertEquals(expectedName, createdBusinessPhoto.getPhoto());
    assertNotNull(createdBusinessPhoto.getCreatedDate());
    assertNotNull(createdBusinessPhoto.getModifiedDate());
    assertNotNull(createdBusinessPhotoId);
    assertEquals(createdBusinessPhoto.getBusiness().getId(), businessService.getBusinessById(1L).getId());
  }

  @Test
  public void deletePlace() throws Exception {
    mockMvc.perform(delete("/api/businesses/1/photos/1"));

    assertNull(businessPhotoService.getBusinessPhotoByIdAndBusiness(1L, 1L));
  }
}
