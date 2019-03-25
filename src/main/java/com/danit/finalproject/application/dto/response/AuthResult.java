package com.danit.finalproject.application.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class AuthResult {

  private Date timestamp;
  private int status;
  private String message;

}
