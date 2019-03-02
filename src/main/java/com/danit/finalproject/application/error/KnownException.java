package com.danit.finalproject.application.error;

public class KnownException extends RuntimeException {
  public KnownException(String errorMessage) {
    super(errorMessage);
  }
}
