package com.danit.finalproject.application.repository;

import  com.danit.finalproject.application.entity.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {}
