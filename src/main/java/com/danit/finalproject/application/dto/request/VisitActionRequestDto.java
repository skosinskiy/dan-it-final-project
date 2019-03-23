package com.danit.finalproject.application.dto.request;

import com.danit.finalproject.application.entity.Action;
import com.danit.finalproject.application.entity.Mood;
import lombok.Data;

@Data
public class VisitActionRequestDto {

  private Long id;
  private Action action;
  private Mood mood;

}
