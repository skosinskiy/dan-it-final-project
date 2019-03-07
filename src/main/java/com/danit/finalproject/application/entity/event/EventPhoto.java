package com.danit.finalproject.application.entity.event;

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
@Table(name = "event_photos")
@Data
@NoArgsConstructor
public class EventPhoto extends BaseEntity {
  private String photo;

  @ManyToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "event_id", nullable = false)
  private Event event;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "main_event_id")
  private Event main;
}
