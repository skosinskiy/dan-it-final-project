package com.danit.finalproject.application.service;

import com.danit.finalproject.application.entity.ChatMessage;
import com.danit.finalproject.application.repository.ChatMessageRepository;
import org.springframework.stereotype.Service;

@Service
public class ChatMessageService {
  private ChatMessageRepository chatMessageRepository;
  private ChatService chatService;

  public ChatMessageService(ChatMessageRepository chatMessageRepository, ChatService chatService) {
    this.chatMessageRepository = chatMessageRepository;
    this.chatService = chatService;
  }

  public ChatMessage addNewMessage(ChatMessage chatMessage, Long chatId) {
    chatMessage.setChat(chatService.getById(chatId));
    return chatMessageRepository.save(chatMessage);
  }

  public ChatMessage deleteMessage(Long id) {
    ChatMessage chatMessage = chatMessageRepository.findById(id).orElse(null);
    chatMessageRepository.delete(chatMessage);
    return chatMessage;
  }
}
