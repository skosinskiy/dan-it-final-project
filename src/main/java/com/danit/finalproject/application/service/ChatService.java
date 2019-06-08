package com.danit.finalproject.application.service;

import com.danit.finalproject.application.entity.Chat;
import com.danit.finalproject.application.entity.ChatMessage;
import com.danit.finalproject.application.entity.User;
import com.danit.finalproject.application.repository.ChatMessageRepository;
import com.danit.finalproject.application.repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ChatService implements CrudService<Chat> {
  private ChatRepository chatRepository;
  private ChatMessageRepository chatMessageRepository;
  private UserService userService;

  @Autowired
  public ChatService(ChatRepository chatRepository,
                     ChatMessageRepository chatMessageRepository,
                     UserService userService) {
    this.chatRepository = chatRepository;
    this.chatMessageRepository = chatMessageRepository;
    this.userService = userService;
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
    chat.setId(null);
    User currentUser = userService.getPrincipalUser();
    if (isChatCreationRestricted(chat, currentUser)) {
      return null;
    }
    if (isGroupChat(chat)) {
      return chatRepository.save(chat);
    }
    return getExistingChatOrCreateNew(chat, currentUser);
  }

  private boolean isChatCreationRestricted(Chat newChat, User currentUser) {
    return newChat.getUsers().size() < 2 ||
        newChat.getUsers().stream().noneMatch(user -> user.getId().equals(currentUser.getId()));
  }

  private boolean isGroupChat(Chat chat) {
    return chat.getUsers().size() > 2;
  }

  private Chat getExistingChatOrCreateNew(Chat chat, User currentUser) {
    List<Chat> allChatsForCurrentUser = getAllChatsForUser(currentUser.getId());
    User anotherChatUser = chat.getUsers()
        .stream()
        .filter(user -> !user.getId().equals(currentUser.getId()))
        .findFirst()
        .orElse(new User());
    Optional<Chat> chatWithUser = allChatsForCurrentUser
        .stream()
        .filter(userChat -> userChat.getUsers().size() == 2)
        .filter(userChat -> userChat.getUsers()
            .stream()
            .anyMatch(user -> user.getId().equals(anotherChatUser.getId()))
        )
        .findFirst();
    return chatWithUser.orElseGet(() -> chatRepository.save(chat));
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
    User currentUser = userService.getPrincipalUser();
    chatMessage.setUser(currentUser);
    chat.getChatMessages().add(chatMessage);
    chatMessageRepository.save(chatMessage);
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

  public List<Chat> getAllChatsForUser(Long userId) {
    User user = userService.getById(userId);
    return chatRepository.findAllByUsers(user);
  }
}
