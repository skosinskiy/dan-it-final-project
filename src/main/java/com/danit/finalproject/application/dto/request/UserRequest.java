package com.danit.finalproject.application.dto.request;

import com.danit.finalproject.application.dto.request.place.PlaceRequest;
import com.danit.finalproject.application.entity.Gender;
import java.util.Date;
import java.util.List;
import lombok.Data;

@Data
public class UserRequest {

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
  private List<RoleRequest> roles;
  private List<PlaceRequest> places;
  private List<ChatRequest> chats;
  private List<VisitRequest> visits;

}