package com.danit.finalproject.application.facade;

import com.danit.finalproject.application.dto.request.ChatMessageRequest;
import com.danit.finalproject.application.dto.request.ChatRequest;
import com.danit.finalproject.application.dto.response.ChatMessageResponse;
import com.danit.finalproject.application.entity.Chat;
import com.danit.finalproject.application.entity.ChatMessage;
import com.danit.finalproject.application.service.ChatMessageService;
import com.danit.finalproject.application.service.ChatService;
import org.springframework.stereotype.Component;

@Component
public class ChatFacade extends AbstractDtoFacade<Chat, ChatRequest, ChatRequest> {

}
