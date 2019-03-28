package com.danit.finalproject.application.service;

import com.danit.finalproject.application.entity.Chat;
import com.danit.finalproject.application.entity.ChatMessage;
import com.danit.finalproject.application.repository.ChatMessageRepository;
import com.danit.finalproject.application.repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatService implements CrudService<Chat> {
  private ChatRepository chatRepository;
  private ChatMessageRepository chatMessageRepository;

  @Autowired
  public ChatService(ChatRepository chatRepository, ChatMessageRepository chatMessageRepository) {
    this.chatRepository = chatRepository;
    this.chatMessageRepository = chatMessageRepository;
  }

  @Override
  public Chat getById(Long id) {
    return chatRepository.findById(id).orElse(null);
  }

  @Override
  public List<Chat> getAll() {
    return chatRepository.findAll();
  }

  @Override
  public Chat create(Chat chat) {
    return chatRepository.save(chat);
  }

  @Override
  public Chat update(Long id, Chat chat) {
    chat.setId(id);
    return chatRepository.save(chat);
  }

  @Override
  public Chat delete(Long id) {
    Chat chat = chatRepository.findById(id).orElse(null);
    chatRepository.delete(chat);
    return chat;
  }

  public ChatMessage addNewMessage(ChatMessage chatMessage, Long chatId) {
    chatMessage.setChat(chatRepository.findById(chatId).orElse(null));
    return chatMessageRepository.save(chatMessage);
  }

  public ChatMessage deleteMessage(Long id) {
    ChatMessage chatMessage = chatMessageRepository.findById(id).orElse(null);
    chatMessageRepository.delete(chatMessage);
    return chatMessage;
  }
}
