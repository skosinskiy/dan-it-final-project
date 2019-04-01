package com.danit.finalproject.application.controller;

import com.danit.finalproject.application.dto.request.VisitActionRequest;
import com.danit.finalproject.application.entity.VisitAction;
import com.danit.finalproject.application.facade.VisitActionFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/actions")
public class VisitActionController {
  private VisitActionFacade visitActionFacade;

  @Autowired
  public VisitActionController(VisitActionFacade visitActionFacade) {
    this.visitActionFacade = visitActionFacade;
  }

  @PostMapping
  public ResponseEntity<VisitAction> addNewVisitAction(VisitActionRequest visitActionRequest) {
    return new ResponseEntity(visitActionFacade.create(visitActionRequest), HttpStatus.OK);
  }
}
