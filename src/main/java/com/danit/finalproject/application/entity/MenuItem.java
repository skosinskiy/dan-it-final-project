package com.danit.finalproject.application.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "menu_items")
@Data
@NoArgsConstructor
public class MenuItem extends BaseEntity {

  @Column(name = "name")
  private String name;

  @Column(name = "display_name")
  private String displayName;

}
