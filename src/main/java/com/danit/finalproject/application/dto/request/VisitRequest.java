package com.danit.finalproject.application.dto.request;

import java.util.Date;
import java.util.List;
import lombok.Data;

@Data
public class VisitRequest {

  private Long id;
  private Date dateFinish;
  private List<VisitActionRequest> actions;

}
