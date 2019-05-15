package com.danit.finalproject.application.controller;

import com.danit.finalproject.application.dto.request.ChatMessageRequest;
import com.danit.finalproject.application.dto.request.ChatRequest;
import com.danit.finalproject.application.dto.response.ChatResponse;
import com.danit.finalproject.application.dto.view.View;
import com.danit.finalproject.application.facade.ChatFacade;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/chats")
public class ChatController {
  private ChatFacade chatFacade;

  @Autowired
  public ChatController(ChatFacade chatFacade) {
    this.chatFacade = chatFacade;
  }

  @GetMapping("{id}")
  @JsonView(View.Chat.class)
  public ResponseEntity<ChatResponse> getChatById(@PathVariable("id") Long placeId) {
    return new ResponseEntity<>(chatFacade.getById(placeId), HttpStatus.OK);
  }

  @GetMapping("user/{userId}")
  @JsonView(View.Chat.class)
  public ResponseEntity<List<ChatResponse>> getAllChatsForUser(@PathVariable("userId") Long userId) {
    return new ResponseEntity<>(chatFacade.getAllchatsForUser(userId), HttpStatus.OK);
  }

  @GetMapping
  @JsonView(View.Chat.class)
  public ResponseEntity<List<ChatResponse>> getAllChats() {
    return new ResponseEntity<>(chatFacade.getAll(), HttpStatus.OK);
  }

  @PostMapping
  @JsonView(View.Chat.class)
  public ResponseEntity<ChatResponse> createNewChat(@RequestBody ChatRequest chatRequest) {
    return new ResponseEntity<>(chatFacade.create(chatRequest), HttpStatus.OK);
  }

  @PutMapping("{id}")
  @JsonView(View.Chat.class)
  public ResponseEntity<ChatResponse> updateChat(@RequestBody ChatRequest chatRequest, @PathVariable Long id) {
    return new ResponseEntity<>(chatFacade.update(id, chatRequest), HttpStatus.OK);
  }

  @DeleteMapping("{id}")
  @JsonView(View.Chat.class)
  public ResponseEntity<ChatResponse> deleteChat(@PathVariable("id") Long placeId) {
    return new ResponseEntity<>(chatFacade.delete(placeId), HttpStatus.OK);
  }

  @PostMapping("{chatId}/messages")
  @JsonView(View.Chat.class)
  public ResponseEntity<ChatResponse> createNewMessage(
      @PathVariable("chatId") Long chatId, @RequestBody ChatMessageRequest chatMessage) {
    return new ResponseEntity<>(chatFacade.addChatMessage(chatMessage, chatId), HttpStatus.OK);
  }

  @DeleteMapping("{chatId}/messages/{id}")
  @JsonView(View.Chat.class)
  public ResponseEntity<ChatResponse> deleteMessage(
      @PathVariable("chatId") Long chatId, @PathVariable("id") Long messageId) {
    return new ResponseEntity<>(chatFacade.deleteMessage(chatId, messageId), HttpStatus.OK);
  }
}
