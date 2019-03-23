package com.danit.finalproject.application.dto.response.business;

import lombok.Data;

@Data
public class BusinessPhotoResponseDto {

  private Long id;
  private String photo;
  private BusinessResponseDto business;

}
