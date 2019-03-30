package com.danit.finalproject.application.service;

import com.danit.finalproject.application.entity.Chat;
import com.danit.finalproject.application.entity.ChatMessage;
import com.danit.finalproject.application.repository.ChatMessageRepository;
import com.danit.finalproject.application.repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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
    Chat chat = chatRepository.findById(chatId).orElse(null);
    List<ChatMessage> messages = chat.getChatMessages();
    messages.add(chatMessage);
    chat.setChatMessages(messages);
    chatRepository.save(chat);
    return chat;
  }

  public Chat deleteMessage(Long chatid, Long messageId) {
    Chat chat = chatRepository.findById(chatid).orElse(null);
    List<ChatMessage> updatedMessages = chat.getChatMessages()
        .stream()
        .filter(message -> message.getId() != messageId)
        .collect(Collectors.toList());
    chat.setChatMessages(updatedMessages);
    ChatMessage chatMessage = chatMessageRepository.findById(messageId).orElse(null);
    chatMessageRepository.delete(chatMessage);
    chatRepository.save(chat);
    return chat;
  }
}
