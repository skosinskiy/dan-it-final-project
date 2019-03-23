package com.danit.finalproject.application.dto.response;

import com.danit.finalproject.application.dto.response.place.PlaceResponseDto;
import com.danit.finalproject.application.entity.Gender;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class UserResponseDto {

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
  private List<RoleResponseDto> roles;
  private List<PlaceResponseDto> places;
  private List<ChatResponseDto> chats;
  private List<VisitResponseDto> visits;

}
