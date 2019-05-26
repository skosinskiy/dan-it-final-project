package com.danit.finalproject.application.error;

public class PlaceMessagesNotAllowedException extends KnownException {

  public static final String PLACE_MESSAGES_NOT_ALLOWED_MESSAGE =
      "Place messages are not allowed for this type of place";

  public PlaceMessagesNotAllowedException() {
    super(PLACE_MESSAGES_NOT_ALLOWED_MESSAGE);
  }
}
