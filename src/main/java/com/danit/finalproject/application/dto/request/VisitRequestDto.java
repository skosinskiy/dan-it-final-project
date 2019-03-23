package com.danit.finalproject.application.dto.request;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class VisitRequestDto {

  private Long id;
  private Date dateFinish;
  private List<VisitActionRequestDto> actions;

}
