package com.danit.finalproject.application.entity;

import com.danit.finalproject.application.entity.business.Business;
import com.danit.finalproject.application.entity.event.Event;
import com.danit.finalproject.application.entity.place.Place;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;


@Entity
@Table(name = "notifications")
@Data
@NoArgsConstructor
public class Notification extends BaseEntity {

  @Column(name = "text")
  private String text;

  @ManyToOne
  @JoinColumn(name = "place_id")
  private Place place;

  @ManyToOne
  @JoinColumn(name = "business_id")
  private Business business;

  @OneToOne
  @JoinColumn(name = "event_id")
  private Event event;
}
