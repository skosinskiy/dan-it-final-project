package com.danit.finalproject.application.dto.request;

import com.danit.finalproject.application.validation.PasswordsMatch;
import com.danit.finalproject.application.validation.TokenNotExpired;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@PasswordsMatch
public class UpdateUserPasswordRequestDto {
  @TokenNotExpired
  private String token;
  private String password;
  private String passwordConfirmation;
}
