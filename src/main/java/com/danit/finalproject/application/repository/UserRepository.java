package com.danit.finalproject.application.repository;

import com.danit.finalproject.application.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

  Page<User> findAllByEmailStartingWithIgnoreCase(String email, Pageable pageable);

  List<User> findAllByEmailContainingIgnoreCase(String email);

  User findByEmail(String email);

  User findByToken(String token);

}
