package com.danit.finalproject.application.validation;

import com.danit.finalproject.application.entity.User;
import com.danit.finalproject.application.service.UserService;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TokenNotExpiredConstraintValidator implements ConstraintValidator<TokenNotExpired, String> {

  private UserService userService;

  @Autowired
  public TokenNotExpiredConstraintValidator(UserService userService) {
    this.userService = userService;
  }

  @Override
  public void initialize(TokenNotExpired constraint) {
  }

  public boolean isValid(String token, ConstraintValidatorContext context) {
    User user = userService.getUserByToken(token);
    return System.currentTimeMillis() <= user.getTokenExpirationDate().getTime();
  }
}
