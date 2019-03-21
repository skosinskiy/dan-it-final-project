package com.danit.finalproject.application.error;

public class TokenExpiredException extends KnownException {

  public static final String INVALID_TOKEN_MESSAGE = "Token is expired";

  public TokenExpiredException() {
    super(INVALID_TOKEN_MESSAGE);
  }
}
