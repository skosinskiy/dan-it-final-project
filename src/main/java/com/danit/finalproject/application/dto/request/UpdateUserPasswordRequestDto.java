package com.danit.finalproject.application.dto.request;

import com.danit.finalproject.application.validation.TokenNotExpired;
import com.danit.finalproject.application.validation.PasswordsMatch;
import lombok.Data;

@Data
@PasswordsMatch
public class UpdateUserPasswordRequestDto {
  @TokenNotExpired
  private String token;
  private String password;
  private String passwordConfirmation;
}
