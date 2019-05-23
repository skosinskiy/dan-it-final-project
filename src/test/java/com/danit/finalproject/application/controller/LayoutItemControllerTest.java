package com.danit.finalproject.application.controller;

import static org.junit.Assert.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.danit.finalproject.application.entity.LayoutItem;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
@Transactional
@WithMockUser(authorities = "MANAGE_PLACE_CATEGORIES")
public class LayoutItemControllerTest {
  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @Autowired
  private ModelMapper modelMapper;

  @Test
  public void getAllLayoutItems() throws Exception {
    String[] expectedLayoutItems = {"NEWS", "VIDEO", "EVENTS", "MESSAGES"};
    MvcResult result = mockMvc.perform(get("/api/layout-items"))
        .andExpect(status().isOk())
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    List<LayoutItem> categories =
        objectMapper.readValue(responseBody, new TypeReference<List<String>>(){});
    assertTrue(Arrays.asList(expectedLayoutItems).containsAll(categories));
  }
}
