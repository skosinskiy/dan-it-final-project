package com.danit.finalproject.application.entity.place;

import com.danit.finalproject.application.entity.BaseEntity;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;


@Entity
@Table(name = "places_photos")
@Data
@NoArgsConstructor
public class PlacePhoto extends BaseEntity {
  private String photo;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "main_place_id")
  private Place main;

  @ManyToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "place_id", nullable = false)
  private Place place;
}
