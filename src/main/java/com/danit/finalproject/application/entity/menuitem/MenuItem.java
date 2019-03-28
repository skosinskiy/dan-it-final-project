package com.danit.finalproject.application.entity.menuitem;

import com.danit.finalproject.application.entity.BaseEntity;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
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
  @Enumerated(EnumType.STRING)
  private MenuItemName name;

  @Column(name = "display_name")
  private String displayName;

}
