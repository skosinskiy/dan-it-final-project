package com.danit.finalproject.application.dto.request;

import lombok.Data;

@Data
public class UpdateUserPassWordRequestDTO {
  private String token;
  private String password;
  private String passwordConfirmation;
}
