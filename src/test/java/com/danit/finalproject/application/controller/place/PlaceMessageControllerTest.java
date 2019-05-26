package com.danit.finalproject.application.controller.place;

import com.danit.finalproject.application.entity.User;
import com.danit.finalproject.application.entity.place.Place;
import com.danit.finalproject.application.entity.place.PlaceMessage;
import com.danit.finalproject.application.service.place.PlaceMessageService;
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

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
@Transactional
@WithMockUser("first.user@test.com")
public class PlaceMessageControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private PlaceMessageService placeMessageService;

  @Autowired
  private ObjectMapper objectMapper;

  @Test
  public void getAllPlaceMessagesTest() throws Exception {
    int expectedPlacesSize = 2;
    Long placeId = 1L;

    MvcResult result = mockMvc.perform(get("/api/place-messages?placeId=1").with(csrf()))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    List<PlaceMessage> placeMessages
        = objectMapper.readValue(responseBody, new TypeReference<List<PlaceMessage>>(){});

    assertEquals(expectedPlacesSize, placeMessages.size());
    assertEquals(
        expectedPlacesSize,
        placeMessages.stream().filter(placeMessage -> placeMessage.getPlace().getId().equals(placeId)).count());
  }

  @Test
  public void deletePlaceMessageTest() throws Exception {
    mockMvc.perform(delete("/api/place-messages/1").with(csrf()));

    assertNull(placeMessageService.getById(1L));
  }

  @Test
  public void createNewPlaceMessageTest() throws Exception {
    Long expectedId = 5L;
    Long expectedPlaceId = 2L;
    String expectedUserEmail = "first.user@test.com";

    PlaceMessage placeMessage = new PlaceMessage();
    placeMessage.setMessage("test");
    placeMessage.setId(3L);
    placeMessage.setUser(new User());
    placeMessage.setPlace(new Place());

    String placeMessageJson = objectMapper.writeValueAsString(placeMessage);

    MvcResult result = mockMvc.perform(
        post("/api/place-messages/place/2")
            .with(csrf())
            .content(placeMessageJson)
            .contentType(MediaType.APPLICATION_JSON))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    PlaceMessage createdPlaceMessage = objectMapper.readValue(responseBody, PlaceMessage.class);

    assertEquals(expectedId, createdPlaceMessage.getId());
    assertEquals(expectedPlaceId, createdPlaceMessage.getPlace().getId());
    assertEquals(expectedUserEmail, createdPlaceMessage.getUser().getEmail());
  }
}