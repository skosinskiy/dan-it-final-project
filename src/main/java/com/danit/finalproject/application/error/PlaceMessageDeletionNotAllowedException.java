package com.danit.finalproject.application.error;

public class PlaceMessageDeletionNotAllowedException extends KnownException {

  public static final String PLACE_MESSAGE_DELETE_NOT_ALLOWED_MESSAGE =
      "Deletion of this place message not allowed for current user";

  public PlaceMessageDeletionNotAllowedException() {
    super(PLACE_MESSAGE_DELETE_NOT_ALLOWED_MESSAGE);
  }
}
