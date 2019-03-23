package com.danit.finalproject.application.service;

import com.danit.finalproject.application.error.PasswordsDontMatchException;
import com.danit.finalproject.application.error.TokenExpiredException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;

import static com.danit.finalproject.application.error.TokenExpiredException.INVALID_TOKEN_MESSAGE;
import static com.danit.finalproject.application.error.PasswordsDontMatchException.PASSWORDS_DONT_MATCH_MESSAGE;

@Service
public class ValidationService {

  private MessageSource messageSource;

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
