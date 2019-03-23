package com.danit.finalproject.application.dto.request.business;

import lombok.Data;

@Data
public class BusinessPhotoRequestDto {

  private Long id;
  private String photo;
  private BusinessRequestDto business;

}
