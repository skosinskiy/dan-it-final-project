package com.danit.finalproject.application.entity.place;

import com.danit.finalproject.application.entity.BaseEntity;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "places_photos")
@Data
@NoArgsConstructor
public class PlacePhoto extends BaseEntity {

  @Column(name = "photo")
  private String photo;
}
