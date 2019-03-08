package com.danit.finalproject.application.entity.event;

import com.danit.finalproject.application.entity.BaseEntity;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "event_photos")
@Data
@NoArgsConstructor
public class EventPhoto extends BaseEntity {

  @Column(name = "photo")
  private String photo;

}
