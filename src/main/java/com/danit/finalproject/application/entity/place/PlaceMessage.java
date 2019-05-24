package com.danit.finalproject.application.entity.place;

import com.danit.finalproject.application.entity.BaseEntity;
import com.danit.finalproject.application.entity.User;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "place_messages")
@Data
@NoArgsConstructor
public class PlaceMessage extends BaseEntity {

  @Column(name = "message")
  private String message;

  @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.PERSIST})
  @JoinColumn(name = "user_id")
  private User user;

  @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.DETACH, CascadeType.PERSIST, CascadeType.REFRESH})
  @JoinColumn(name = "place_id")
  private Place place;

}