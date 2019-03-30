package com.danit.finalproject.application.controller;

import com.danit.finalproject.application.dto.response.ChatResponse;
import com.danit.finalproject.application.dto.response.VisitResponse;
import com.danit.finalproject.application.dto.response.place.PlaceResponse;
import com.danit.finalproject.application.entity.Chat;
import com.danit.finalproject.application.entity.ChatMessage;
import com.danit.finalproject.application.repository.ChatMessageRepository;
import com.danit.finalproject.application.service.ChatService;
import com.danit.finalproject.application.service.VisitService;
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
public class VisitControllerTest {
  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @Autowired
  private VisitService visitService;

  @Test
  public void getVisitsByUserAndPlaceTest() throws Exception {
    int expectedSize = 1;

    MvcResult result = mockMvc.perform(get("/api/visits?userId=1&placeId=2").with(csrf()))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    List<VisitResponse> visitResponse = objectMapper.readValue(responseBody, new TypeReference<List<VisitResponse>>(){});

    assertEquals(expectedSize, visitResponse.size());
  }
}
