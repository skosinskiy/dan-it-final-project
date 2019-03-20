package com.danit.finalproject.application.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "roles")
@Data
@NoArgsConstructor
public class Role extends BaseEntity {

  @Column(name = "name")
  private String name;

  @JsonIgnore
  @ToString.Exclude
  @ManyToMany(mappedBy = "roles")
  private List<User> users;

//  @ManyToMany
//  @JoinTable(name = "permissions_roles",
//          joinColumns = {@JoinColumn(name = "role_id")},
//          inverseJoinColumns = {@JoinColumn(name = "permission_id")})
//  private List<Permission> permissions;

  @ElementCollection
  @CollectionTable(name = "role_permissions", joinColumns = @JoinColumn(name = "role_id"))
  @Column(name = "permission_id")
  private List<Permission> permissions;
}
