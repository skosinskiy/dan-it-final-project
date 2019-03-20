package com.danit.finalproject.application.error;

public class PasswordsDontMatchException extends KnownException {

  public static final String PASSWORDS_DONT_MATCH_MESSAGE = "Passwords do not match";

  public PasswordsDontMatchException() {
    super(PASSWORDS_DONT_MATCH_MESSAGE);
  }
}
