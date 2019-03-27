package com.danit.finalproject.application.service;

import com.danit.finalproject.application.entity.User;
import com.danit.finalproject.application.entity.Visit;
import com.danit.finalproject.application.entity.place.Place;
import com.danit.finalproject.application.repository.VisitRepository;
import com.danit.finalproject.application.service.place.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VisitService {
  private VisitRepository visitRepository;
  private UserService userService;
  private PlaceService placeService;

  @Autowired
  public VisitService(VisitRepository visitRepository, UserService userService, PlaceService placeService) {
    this.visitRepository = visitRepository;
    this.userService = userService;
    this.placeService = placeService;
  }

  public List<Visit> getAllVisitsByUserAndPlace(Long userId, Long placeId) {
    User user = userService.getById(userId);
    Place place = placeService.getById(placeId);
    return visitRepository.findAllByUserAndPlace(user, place);
  }
}
