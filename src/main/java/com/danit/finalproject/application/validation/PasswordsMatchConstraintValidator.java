package com.danit.finalproject.application.validation;

import com.danit.finalproject.application.dto.request.UpdateUserPasswordRequestDto;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class PasswordsMatchConstraintValidator implements ConstraintValidator<PasswordsMatch, UpdateUserPasswordRequestDto> {
  @Override
  public void initialize(PasswordsMatch constraintAnnotation) { }

  @Override
  public boolean isValid(UpdateUserPasswordRequestDto userDto, ConstraintValidatorContext constraintValidatorContext) {
    return userDto.getPassword().equals(userDto.getPasswordConfirmation());
  }
}
