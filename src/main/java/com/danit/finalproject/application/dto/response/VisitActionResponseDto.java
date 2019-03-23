package com.danit.finalproject.application.dto.response;

import com.danit.finalproject.application.entity.Action;
import com.danit.finalproject.application.entity.Mood;
import lombok.Data;

@Data
public class VisitActionResponseDto {

  private Long id;
  private Action action;
  private Mood mood;

}
