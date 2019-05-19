package com.danit.finalproject.application.dto.response;

import com.danit.finalproject.application.dto.response.place.PlaceResponse;
import com.danit.finalproject.application.dto.view.View;
import com.danit.finalproject.application.entity.Gender;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
public class UserResponse {

  private Long id;
  private String email;
  private String photo;
  private String firstName;
  private String lastName;
  private Integer age;
  private Gender gender;
  private String token;
  private Date tokenExpirationDate;
  @JsonView(View.User.class)
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  private List<ChatResponse> chats;
  private List<RoleResponse> roles;
  private List<PlaceResponse> places;
  @JsonView(View.User.class)
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  private List<UserResponse> friends;

}
