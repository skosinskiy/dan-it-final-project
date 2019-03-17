package com.danit.finalproject.application.error;

public class PasswordsDontMatchException extends KnownException {
  public PasswordsDontMatchException(String errorMessage) {
    super(errorMessage);
  }
}
