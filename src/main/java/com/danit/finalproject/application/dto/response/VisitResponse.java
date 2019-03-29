package com.danit.finalproject.application.dto.response;

import java.util.Date;
import java.util.List;
import lombok.Data;

@Data
public class VisitResponse {

  private Long id;
  private Date dateFinish;
  private List<VisitActionResponse> actions;

}
