package com.danit.finalproject.application.repository;

import com.danit.finalproject.application.entity.Chat;
import com.danit.finalproject.application.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatRepository extends JpaRepository<Chat, Long> {
  List<Chat> findAllByUsers(User user);
}
