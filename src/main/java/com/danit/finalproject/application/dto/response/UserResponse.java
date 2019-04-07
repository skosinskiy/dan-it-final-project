package com.danit.finalproject.application.dto.response;

import com.danit.finalproject.application.entity.Gender;
import java.util.Date;
import java.util.List;
import lombok.Data;

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
  private List<RoleResponse> roles;

}
