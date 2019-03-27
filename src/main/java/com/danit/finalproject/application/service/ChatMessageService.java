package com.danit.finalproject.application.service;

import com.danit.finalproject.application.entity.ChatMessage;
import com.danit.finalproject.application.repository.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatMessageService implements CrudService<ChatMessage>{
  private ChatMessageRepository chatMessageRepository;
  private ChatService chatService;

  @Autowired
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

  @Override
  public ChatMessage getById(Long id) {
    return chatMessageRepository.findById(id).orElse(null);
  }

  @Override
  public List<ChatMessage> getAll() {
    return chatMessageRepository.findAll();
  }

  @Override
  public ChatMessage create(ChatMessage chatMessage) {
    return chatMessageRepository.save(chatMessage);
  }

  @Override
  public ChatMessage update(Long id, ChatMessage chatMessage) {
    chatMessage.setId(id);
    return chatMessageRepository.save(chatMessage);
  }

  @Override
  public ChatMessage delete(Long id) {
    ChatMessage chatMessage = chatMessageRepository.findById(id).orElse(null);
    chatMessageRepository.delete(chatMessage);
    return chatMessage;
  }
}
