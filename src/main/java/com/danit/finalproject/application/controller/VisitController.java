package com.danit.finalproject.application.controller;

import com.danit.finalproject.application.entity.Visit;
import com.danit.finalproject.application.facade.VisitFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/visits")
public class VisitController {
  private VisitFacade visitFacade;

  @Autowired
  public VisitController(VisitFacade visitFacade) {
    this.visitFacade = visitFacade;
  }

  public ResponseEntity<List<Visit>> getVisitsByUserAndPlace(@RequestParam("userId") Long userId, @RequestParam
      ("placeId") Long placeId) {
    return new ResponseEntity(visitFacade.getVisitsByUserAndPlace(userId, placeId), HttpStatus.OK);
  }
}
