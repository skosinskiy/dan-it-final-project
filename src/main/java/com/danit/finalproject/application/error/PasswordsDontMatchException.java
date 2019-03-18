package com.danit.finalproject.application.error;

public class PasswordsDontMatchException extends KnownException {

  private static final String PASSWORDS_DONT_MATCH_MESSAGE = "Passwords don\'t match";

  public PasswordsDontMatchException() {
    super(PASSWORDS_DONT_MATCH_MESSAGE);
  }
}
