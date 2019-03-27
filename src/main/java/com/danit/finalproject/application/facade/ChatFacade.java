package com.danit.finalproject.application.facade;

import com.danit.finalproject.application.dto.request.ChatRequest;
import com.danit.finalproject.application.entity.Chat;
import org.springframework.stereotype.Component;

@Component
public class ChatFacade extends AbstractDtoFacade<Chat, ChatRequest, ChatRequest> {
}
