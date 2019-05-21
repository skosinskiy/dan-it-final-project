package com.danit.finalproject.application.facade;

import com.danit.finalproject.application.dto.request.ChatMessageRequest;
import com.danit.finalproject.application.dto.request.ChatRequest;
import com.danit.finalproject.application.dto.response.ChatResponse;
import com.danit.finalproject.application.entity.Chat;
import com.danit.finalproject.application.entity.ChatMessage;
import com.danit.finalproject.application.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ChatFacade extends AbstractDtoFacade<Chat, ChatRequest, ChatResponse> {
  private ChatService chatService;

  @Autowired
  public ChatFacade(ChatService chatService) {
    this.chatService = chatService;
  }

  public ChatResponse addChatMessage(ChatMessageRequest chatMessageRequest, Long chatId) {
    ChatMessage chatMessage = modelMapper.map(chatMessageRequest, ChatMessage.class);
    Chat chat = chatService.addNewMessage(chatMessage, chatId);
    return mapEntityToResponseDto(chat);
  }

  public ChatResponse deleteMessage(Long chatId, Long messageId) {
    Chat chat = chatService.deleteMessage(chatId, messageId);
    return mapEntityToResponseDto(chat);
  }

  public List<ChatResponse> getAllchatsForUser(Long userId) {
    List<Chat> chats = chatService.getAllChatsForUser(userId);
    return mapEntityListToResponseDtoList(chats);
  }
}
