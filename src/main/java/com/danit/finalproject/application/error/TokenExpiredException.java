package com.danit.finalproject.application.error;

public class TokenExpiredException extends KnownException {
  public TokenExpiredException(String errorMessage) {
    super(errorMessage);
  }
}
