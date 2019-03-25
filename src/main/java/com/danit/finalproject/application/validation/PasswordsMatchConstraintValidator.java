package com.danit.finalproject.application.validation;

import com.danit.finalproject.application.dto.request.UpdateUserPasswordRequest;
import org.springframework.stereotype.Component;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

@Component
public class PasswordsMatchConstraintValidator implements ConstraintValidator<PasswordsMatch, UpdateUserPasswordRequest> {
  @Override
  public void initialize(PasswordsMatch constraintAnnotation) { }

  @Override
  public boolean isValid(UpdateUserPasswordRequest userDto, ConstraintValidatorContext constraintValidatorContext) {
    return userDto.getPassword().equals(userDto.getPasswordConfirmation());
  }
}
