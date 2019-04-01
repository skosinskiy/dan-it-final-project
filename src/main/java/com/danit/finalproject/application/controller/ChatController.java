package com.danit.finalproject.application.controller;

import com.danit.finalproject.application.dto.request.ChatMessageRequest;
import com.danit.finalproject.application.dto.request.ChatRequest;
import com.danit.finalproject.application.dto.response.ChatMessageResponse;
import com.danit.finalproject.application.dto.response.ChatResponse;
import com.danit.finalproject.application.entity.Chat;
import com.danit.finalproject.application.facade.ChatFacade;
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
  public ResponseEntity<ChatResponse> getPlaceById(@PathVariable("id") Long placeId) {
    return new ResponseEntity(chatFacade.getById(placeId), HttpStatus.OK);
  }

  @GetMapping
  public ResponseEntity<List<ChatResponse>> getAllPlaces() {
    return new ResponseEntity(chatFacade.getAll(), HttpStatus.OK);
  }

  @PostMapping
  public ResponseEntity<ChatResponse> createNewPlace(@RequestBody ChatRequest chatRequest) {
    return new ResponseEntity(chatFacade.create(chatRequest), HttpStatus.OK);
  }

  @PutMapping("{id}")
  public ResponseEntity<ChatResponse> updatePlace(@RequestBody ChatRequest chatRequest, @PathVariable Long id) {
    return new ResponseEntity(chatFacade.update(id, chatRequest), HttpStatus.OK);
  }

  @DeleteMapping("{id}")
  public ResponseEntity<ChatResponse> deletePlace(@PathVariable("id") Long placeId) {
    return new ResponseEntity(chatFacade.delete(placeId), HttpStatus.OK);
  }

  @PostMapping("{chatId}/messages")
  public ResponseEntity<Chat> createNewMessage(@PathVariable("chatId") Long chatId, ChatMessageRequest chatMessage) {
    return new ResponseEntity(chatFacade.addChatMessage(chatMessage, chatId), HttpStatus.OK);
  }

  @DeleteMapping("{chatId}/messages/{id}")
  public ResponseEntity<Chat> deleteMessege(@PathVariable("chatId") Long chatId, @PathVariable("id") Long messageId) {
    return new ResponseEntity(chatFacade.deleteMessage(chatId, messageId), HttpStatus.OK);
  }
}
