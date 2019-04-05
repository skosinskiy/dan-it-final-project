package com.danit.finalproject.application.entity.place;

import com.danit.finalproject.application.entity.BaseEntity;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.List;

@Entity
@Table(name = "places_categories")
@Data
@NoArgsConstructor
public class PlaceCategory extends BaseEntity {

  @Column(name = "name")
  private String name;

  @Column(name = "multisync")
  private boolean multisync;

  @OneToMany(mappedBy = "placeCategory")
  @ToString.Exclude
  private List<Place> places;
}
