package com.danit.finalproject.application.facade;

import com.danit.finalproject.application.dto.request.ChatMessageRequest;
import com.danit.finalproject.application.dto.response.ChatMessageResponse;
import com.danit.finalproject.application.entity.ChatMessage;
import com.danit.finalproject.application.service.ChatMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ChatMessageFacade extends AbstractDtoFacade<ChatMessage, ChatMessageRequest, ChatMessageResponse> {
  private ChatMessageService chatMessageService;

  @Autowired
  public ChatMessageFacade(ChatMessageService chatMessageService) {
    this.chatMessageService = chatMessageService;
  }

  public ChatMessageResponse addChatMessage(ChatMessageRequest chatMessageRequest, Long chatId) {
    ChatMessage chatMessage = modelMapper.map(chatMessageRequest, ChatMessage.class);
    ChatMessage savedChatMessage = chatMessageService.addNewMessage(chatMessage, chatId);
    return mapEntityToResponseDto(savedChatMessage);
  }

  public ChatMessageResponse deleteMessage(Long id) {
    ChatMessage chatMessage = chatMessageService.deleteMessage(id);
    return mapEntityToResponseDto(chatMessage);
  }
}
