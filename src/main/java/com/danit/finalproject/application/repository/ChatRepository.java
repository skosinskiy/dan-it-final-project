package com.danit.finalproject.application.repository;

import com.danit.finalproject.application.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRepository extends JpaRepository<Chat, Long> {}
