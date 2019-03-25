package com.danit.finalproject.application.dto.request;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class VisitRequest {

  private Long id;
  private Date dateFinish;
  private List<VisitActionRequest> actions;

}
