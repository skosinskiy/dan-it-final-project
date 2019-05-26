package com.danit.finalproject.application.error;

import org.junit.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.Assert.assertEquals;


public class GenericExceptionHandlerTest {

  private GenericExceptionHandler genericExceptionHandler = new GenericExceptionHandler();

  @Test
  public void handleKnownException() {
    String expectedMessage = "test";
    KnownException exception = new KnownException(expectedMessage);
    ResponseEntity<String> responseEntity = genericExceptionHandler.handleKnownException(exception);

    assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
    assertEquals(expectedMessage, responseEntity.getBody());
  }

  @Test
  public void handleUnknownException() {
    String expectedMessage = "test";
    RuntimeException exception = new RuntimeException(expectedMessage);
    ResponseEntity<String> responseEntity = genericExceptionHandler.handleUnknownException(exception);

    assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, responseEntity.getStatusCode());
    assertEquals(expectedMessage, responseEntity.getBody());
  }
}