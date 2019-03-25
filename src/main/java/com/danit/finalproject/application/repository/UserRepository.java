package com.danit.finalproject.application.repository;

import com.danit.finalproject.application.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends PagingAndSortingRepository<User, Long> {

  Page<User> findAllByEmailStartingWithIgnoreCase(String email, Pageable pageable);

  User findByEmail(String email);

  User findByToken(String token);

}
