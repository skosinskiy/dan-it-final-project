package com.danit.finalproject.application.repository;

import com.danit.finalproject.application.entity.User;

import com.danit.finalproject.application.entity.place.Place;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

  Page<User> findAllByEmailContainingIgnoreCase(String email, Pageable pageable);

  User findByEmail(String email);

  User findByToken(String token);

  Page<User> findAllByPlaces(Place place, Pageable pageable);

}
