package com.danit.finalproject.application.dto.response.business;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.ToString;

@Data
public class BusinessPhotoResponse {

  private Long id;
  private String photo;
  @JsonIgnore
  @ToString.Exclude
  private BusinessResponse business;

}
