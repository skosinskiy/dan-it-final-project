package com.danit.finalproject.application.entity.place;

import com.danit.finalproject.application.entity.BaseEntity;
import com.danit.finalproject.application.entity.menuitem.MenuItem;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import lombok.ToString;

@Entity
@Table(name = "places_categories")
@Data
@NoArgsConstructor
public class PlaceCategory extends BaseEntity {

  @Column(name = "name")
  private String name;

  @Column(name = "multisync")
  private boolean multisync;

  @ManyToMany(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
  @JoinTable(name = "placeCategories_menuItems",
      joinColumns = {@JoinColumn(name = "placeCategory_id")},
      inverseJoinColumns = {@JoinColumn(name = "menuItem_id")})
  @ToString.Exclude
  private List<MenuItem> menuItems;
}
