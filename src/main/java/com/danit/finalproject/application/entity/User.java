package com.danit.finalproject.application.entity;

import com.danit.finalproject.application.entity.place.Place;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
public class User extends BaseEntity {

  @Column(name = "email")
  private String email;

  @Column(name = "password")
  private String password;

  @Column(name = "photo")
  private String photo;

  @Column(name = "first_name")
  private String firstName;

  @Column(name = "last_name")
  private String lastName;

  @Column(name = "age")
  private Integer age;

  @Column(name = "gender")
  private Gender gender;

  @Column(name = "token")
  private String token;

  @Column(name = "token_expiration_date")
  private Date tokenExpirationDate;

  @ManyToMany(fetch = FetchType.EAGER)
  @JoinTable(name = "users_roles",
      joinColumns = {@JoinColumn(name = "user_id")},
      inverseJoinColumns = {@JoinColumn(name = "role_id")})
  private List<Role> roles;

  @ManyToMany
  @JoinTable(name = "users_places",
      joinColumns = {@JoinColumn(name = "user_id")},
      inverseJoinColumns = {@JoinColumn(name = "place_id")})
  @ToString.Exclude
  private List<Place> places;

  @ManyToMany
  @JoinTable(name = "users_chats",
      joinColumns = {@JoinColumn(name = "user_id")},
      inverseJoinColumns = {@JoinColumn(name = "chat_id")})
  @ToString.Exclude
  private List<Chat> chats;

  @OneToMany
  @JoinColumn(name = "visit_id")
  @ToString.Exclude
  private List<Visit> visits;

  @ManyToMany
  @JoinTable(name = "user_friends",
      joinColumns = {@JoinColumn(name = "user_id")},
      inverseJoinColumns = {@JoinColumn(name = "friend_id")})
  @ToString.Exclude
  private List<User> friends;
}
