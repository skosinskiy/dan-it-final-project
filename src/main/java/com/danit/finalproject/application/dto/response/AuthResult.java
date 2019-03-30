package com.danit.finalproject.application.dto.response;

import java.util.Date;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthResult {

  private Date timestamp;
  private int status;
  private String message;

}
