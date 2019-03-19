package com.danit.finalproject.application.repository;

import com.danit.finalproject.application.entity.Notification;
import com.danit.finalproject.application.entity.place.Place;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
  List<Notification> findAllByPlace(Place place);
}
