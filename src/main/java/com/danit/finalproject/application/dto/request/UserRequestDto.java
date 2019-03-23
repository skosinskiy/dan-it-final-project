package com.danit.finalproject.application.dto.request;

import com.danit.finalproject.application.dto.request.place.PlaceRequestDto;
import com.danit.finalproject.application.entity.Gender;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class UserRequestDto {

  private Long id;
  private String email;
  private String password;
  private String photo;
  private String firstName;
  private String lastName;
  private Integer age;
  private Gender gender;
  private String token;
  private Date tokenExpirationDate;
  private List<RoleRequestDto> roles;
  private List<PlaceRequestDto> places;
  private List<ChatRequestDto> chats;
  private List<VisitRequestDto> visits;

}
