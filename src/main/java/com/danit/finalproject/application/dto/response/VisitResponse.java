package com.danit.finalproject.application.dto.response;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class VisitResponse {

  private Long id;
  private Date dateFinish;
  private List<VisitActionResponse> actions;

}
