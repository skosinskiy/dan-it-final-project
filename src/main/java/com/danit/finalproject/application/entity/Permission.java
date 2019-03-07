package com.danit.finalproject.application.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import java.util.List;

@Entity
@Table(name = "permissions")
@Data
@NoArgsConstructor
public class Permission extends BaseEntity {
  private String name;

  @ManyToMany(mappedBy = "permissions")
  private List<Role> roles;
}
