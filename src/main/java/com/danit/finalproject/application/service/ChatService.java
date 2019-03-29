package com.danit.finalproject.application.service;

import com.danit.finalproject.application.entity.Chat;
import com.danit.finalproject.application.entity.ChatMessage;
import com.danit.finalproject.application.repository.ChatMessageRepository;
import com.danit.finalproject.application.repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

  public Chat addNewMessage(ChatMessage chatMessage, Long chatId) {
    Optional<Chat> optionalChat = chatRepository.findById(chatId);
    optionalChat.ifPresent(chat -> chat.getChatMessages().add(chatMessage));
    Chat chat = optionalChat.orElse(null);
    return chatRepository.save(chat);
  }

  public Chat deleteMessage(Long id) {
    Optional<Chat> optionalChat = chatRepository.findById(id);
    if (optionalChat.isPresent()) {
      Optional<ChatMessage> chatMessage = optionalChat.get().getChatMessages()
              .stream()
              .filter(message -> id.equals(message.getId()))
              .findFirst();
      chatMessage.ifPresent(message -> chatMessageRepository.delete(message));
    }
    return optionalChat.orElse(null);
  }
}
