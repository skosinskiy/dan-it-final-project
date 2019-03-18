package com.danit.finalproject.application.entity.place;

import com.danit.finalproject.application.entity.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "places_photos")
@Data
@NoArgsConstructor
public class PlacePhoto extends BaseEntity {

  @Column(name = "photo")
  private String photo;

  @ManyToOne
  @JoinColumn(name = "place_id")
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @JsonIgnore
  private Place place;

}
