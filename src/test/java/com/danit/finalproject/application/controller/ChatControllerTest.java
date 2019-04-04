package com.danit.finalproject.application.controller;

import com.danit.finalproject.application.dto.request.ChatRequest;
import com.danit.finalproject.application.dto.response.ChatResponse;
import com.danit.finalproject.application.dto.response.place.PlaceResponse;
import com.danit.finalproject.application.entity.Chat;
import com.danit.finalproject.application.entity.ChatMessage;
import com.danit.finalproject.application.entity.place.Place;
import com.danit.finalproject.application.entity.place.PlacePhoto;
import com.danit.finalproject.application.repository.ChatMessageRepository;
import com.danit.finalproject.application.service.ChatService;
import com.danit.finalproject.application.service.place.PlaceCategoryService;
import com.danit.finalproject.application.service.place.PlacePhotoService;
import com.danit.finalproject.application.service.place.PlaceService;
import com.fasterxml.jackson.core.type.TypeReference;
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

import java.util.List;

import static org.junit.Assert.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
@Transactional
@WithMockUser(value = "first.user@test.com")
public class ChatControllerTest {
  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @Autowired
  private ModelMapper modelMapper;

  @Autowired
  private ChatService chatService;

  @Autowired
  private ChatMessageRepository chatMessageRepository;

  @Test
  public void getChatById() throws Exception {
    Long expectedId = 1L;
    String expectedName = "chat-1";

    MvcResult result = mockMvc.perform(get("/api/chats/1").with(csrf()))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    ChatResponse chat = objectMapper.readValue(responseBody, ChatResponse.class);

    assertEquals(expectedId, chat.getId());
    assertEquals(expectedName, chat.getName());
  }

  @Test
  public void getAllChats() throws Exception {
    int expectedSize = 2;
    String secondCategoryName = "chat-2";

    MvcResult result = mockMvc.perform(get("/api/chats"))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    List<ChatResponse> chats = objectMapper.readValue(responseBody, new TypeReference<List<ChatResponse>>(){});

    assertEquals(expectedSize, chats.size());
    assertEquals(secondCategoryName, chats.get(1).getName());
  }

  @Test
  public void createNewChat() throws Exception {
    Long expectedId = 3L;
    String expectedName = "chat-3";

    Chat chat = new Chat();
    chat.setId(expectedId);
    chat.setName(expectedName);

    String chatJson = objectMapper.writeValueAsString(chat);

    MvcResult result = mockMvc.perform(
        post("/api/chats")
            .with(csrf())
            .content(chatJson)
            .contentType(MediaType.APPLICATION_JSON))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    ChatResponse createdChat = objectMapper.readValue(responseBody, ChatResponse.class);
    Long createdChatId= createdChat.getId();

    assertEquals(expectedName, createdChat.getName());
    assertNotNull(createdChatId);
  }

  @Test
  public void updateChat() throws Exception {
    String chatTitle = "Updated";
    Long chatId = 1L;
    Chat chat = chatService.getById(chatId);
    chat.setName(chatTitle);

    String userJson = objectMapper.writeValueAsString(modelMapper.map(chat, ChatRequest.class));

    MvcResult result = mockMvc.perform(
        put("/api/chats/1")
            .with(csrf())
            .content(userJson)
            .contentType(MediaType.APPLICATION_JSON))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    ChatResponse updatedChat = objectMapper.readValue(responseBody, ChatResponse.class);

    assertEquals(chatTitle, updatedChat.getName());
    assertEquals(chatTitle, chatService.getById(chatId).getName());
  }

  @Test
  public void deletePlace() throws Exception {
    mockMvc.perform(delete("/api/chats/2").with(csrf()));

    assertNull(chatService.getById(2L));
  }

  @Test
  public void createNewMessage() throws Exception {
    Long expectedId = 5L;
    String expectedText = "message-5";
    int expectedSize = 3;

    ChatMessage chatMessage = new ChatMessage();
    chatMessage.setId(expectedId);
    chatMessage.setMessage(expectedText);

    String chatMessageJson = objectMapper.writeValueAsString(chatMessage);

    MvcResult result = mockMvc.perform(
        post("/api/chats/1/messages")
            .with(csrf())
            .content(chatMessageJson)
            .contentType(MediaType.APPLICATION_JSON))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    ChatResponse chatResponse = objectMapper.readValue(responseBody, ChatResponse.class);

    assertEquals(expectedSize, chatResponse.getChatMessages().size());
  }

  @Test
  public void deleteMessage() throws Exception {
    mockMvc.perform(delete("/api/chats/1/messages/1").with(csrf()));
    assertNull(chatMessageRepository.findById(1L).orElse(null));
  }
}
