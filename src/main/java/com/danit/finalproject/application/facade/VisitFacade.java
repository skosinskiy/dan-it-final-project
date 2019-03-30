package com.danit.finalproject.application.facade;

import com.danit.finalproject.application.dto.request.VisitRequest;
import com.danit.finalproject.application.dto.response.VisitResponse;
import com.danit.finalproject.application.entity.User;
import com.danit.finalproject.application.entity.Visit;
import com.danit.finalproject.application.service.VisitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class VisitFacade extends AbstractDtoFacade<Visit, VisitRequest, VisitResponse> {
  private VisitService visitService;

  @Autowired
  public VisitFacade(VisitService visitService) {
    this.visitService = visitService;
  }

  public List<VisitResponse> getVisitsByUserAndPlace(Long userId, Long placeId) {
    List<Visit> visits = visitService.getAllVisitsByUserAndPlace(userId, placeId);
    return mapEntityListToResponseDtoList(visits);
  }
}
