package com.danit.finalproject.application.facade;

import com.danit.finalproject.application.dto.request.VisitActionRequest;
import com.danit.finalproject.application.dto.response.VisitActionResponse;
import com.danit.finalproject.application.entity.VisitAction;
import com.danit.finalproject.application.service.VisitActionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class VisitActionFacade extends AbstractDtoFacade<VisitAction, VisitActionRequest, VisitActionResponse> {
  private VisitActionService visitActionService;

  @Autowired
  public VisitActionFacade(VisitActionService visitActionService) {
    this.visitActionService = visitActionService;
  }
}
