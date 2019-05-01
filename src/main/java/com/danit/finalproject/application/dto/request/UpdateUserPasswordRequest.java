package com.danit.finalproject.application.dto.request;

import com.danit.finalproject.application.validation.PasswordsMatch;
import com.danit.finalproject.application.validation.TokenNotExpired;
import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;

@Data
@Builder
@PasswordsMatch
public class UpdateUserPasswordRequest {
  @TokenNotExpired
  private String token;
  @NotEmpty
  private String password;
  private String passwordConfirmation;
}
