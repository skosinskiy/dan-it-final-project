package com.danit.finalproject.application.service;

import com.danit.finalproject.application.error.PasswordsDontMatchException;
import com.danit.finalproject.application.error.TokenExpiredException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;

@Service
public class ValidationService {

  private MessageSource messageSource;
  private static final String INVALID_TOKEN_MESSAGE = "Token is expired";
  private static final String PASSWORDS_DONT_MATCH_MESSAGE = "Passwords don\'t match";

  @Autowired
  public ValidationService(MessageSource messageSource) {
    this.messageSource = messageSource;
  }

  public void checkForValidationErrors(BindingResult bindingResult) {
    if (bindingResult.hasErrors()) {
      for (Object object : bindingResult.getAllErrors()) {
        if (object instanceof FieldError) {
          FieldError fieldError = (FieldError) object;
          String errorMessage = messageSource.getMessage(fieldError, null);
          if (INVALID_TOKEN_MESSAGE.equals(errorMessage)) {
            throw new TokenExpiredException();
          }
        } else if (object instanceof ObjectError) {
          ObjectError objectError = (ObjectError) object;
          String errorMessage = messageSource.getMessage(objectError, null);
          if (PASSWORDS_DONT_MATCH_MESSAGE.equals(errorMessage)) {
            throw new PasswordsDontMatchException();
          }
        }
      }
    }
  }




}
