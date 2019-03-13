package com.danit.finalproject.application.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import java.util.List;

@Entity
@Table(name = "roles")
@Data
@NoArgsConstructor
public class Role extends BaseEntity {

  @Column(name = "name")
  private String name;

  @JsonIgnore
  @ManyToMany(mappedBy="roles")
  private List<User> users;

  @ManyToMany
  @JoinTable(name = "permissions_roles",
          joinColumns = {@JoinColumn(name = "role_id")},
          inverseJoinColumns = {@JoinColumn(name = "permission_id")})
  private List<Permission> permissions;

  @Override
  public String toString() {
    return "Role{" +
        "name='" + name + '\'' +
        ", permissions=" + permissions +
        '}';
  }
}
