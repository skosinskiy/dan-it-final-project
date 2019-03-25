package com.danit.finalproject.application.dto.response;

import com.danit.finalproject.application.dto.response.place.PlaceResponse;
import com.danit.finalproject.application.entity.Gender;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class UserResponse {

  private Long id;
  private String email;
  @JsonIgnore
  private String password;
  private String photo;
  private String firstName;
  private String lastName;
  private Integer age;
  private Gender gender;
  private String token;
  private Date tokenExpirationDate;
  private List<RoleResponse> roles;
  private List<PlaceResponse> places;
  private List<ChatResponse> chats;
  private List<VisitResponse> visits;

}
