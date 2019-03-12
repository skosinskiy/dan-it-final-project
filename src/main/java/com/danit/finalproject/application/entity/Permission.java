package com.danit.finalproject.application.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "permissions")
@Data
@NoArgsConstructor
public class Permission extends BaseEntity {

  @Column(name = "name")
  private String name;

}
