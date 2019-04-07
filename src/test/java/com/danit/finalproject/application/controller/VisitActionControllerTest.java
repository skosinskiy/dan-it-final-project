package com.danit.finalproject.application.controller;

import com.danit.finalproject.application.dto.request.VisitActionRequest;
import com.danit.finalproject.application.dto.response.VisitActionResponse;
import com.danit.finalproject.application.entity.VisitAction;
import com.danit.finalproject.application.service.VisitService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.Assert.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
@Transactional
@WithMockUser(value = "first.user@test.com")
public class VisitActionControllerTest {
  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @Autowired
  private ModelMapper modelMapper;

  @Autowired
  private VisitService visitService;

  @Test
  public void createNewVisitAction() throws Exception {
    Long expectedId = 3L;

    VisitAction visitAction = new VisitAction();
    visitAction.setId(expectedId);
    visitAction.setVisit(visitService.getById(1L));

    String chatJson = objectMapper.writeValueAsString(modelMapper.map(visitAction, VisitActionRequest.class));

    MvcResult result = mockMvc.perform(
        post("/api/actions")
            .with(csrf())
            .content(chatJson)
            .contentType(MediaType.APPLICATION_JSON))
        .andReturn();
    String responseBody  = result.getResponse().getContentAsString();
    VisitActionResponse visitActionResponse   = objectMapper.readValue(responseBody, VisitActionResponse.class);
    Long createdVisitActionId = visitActionResponse.getId();

    assertEquals(expectedId, visitActionResponse.getId());
    assertNotNull(createdVisitActionId);
  }
}
