package com.danit.finalproject.application.controller;

import com.danit.finalproject.application.entity.business.BusinessCategory;
import com.danit.finalproject.application.service.business.BusinessCategoryService;
import com.danit.finalproject.application.service.place.PlacePhotoService;
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

import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
@Transactional
public class PlacePhotoControllerTest {
  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @Autowired
  private PlacePhotoService placePhotoService;

  @Test
  public void addPhotosToPlace() throws Exception {
    Long expectedId = 3L;
    String expectedName = "photo-3";

  }

  @Test
  public void deletePlacephoto() throws Exception {
    mockMvc.perform(delete("/api/business-categories/2"));

  }
}
