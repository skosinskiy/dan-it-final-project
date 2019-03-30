package com.danit.finalproject.application.repository;

import com.danit.finalproject.application.entity.User;
import com.danit.finalproject.application.entity.Visit;
import com.danit.finalproject.application.entity.place.Place;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VisitRepository extends JpaRepository<Visit, Long> {
  List<Visit> findAllByUserAndPlace(User user, Place place);
}
