package com.danit.finalproject.application.entity;

import com.danit.finalproject.application.entity.place.Place;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "visits")
@Data
@NoArgsConstructor
public class Visit extends BaseEntity {

  @Column(name = "date_finished")
  private Date dateFinish;

  @OneToMany
  @JoinColumn(name = "action_id")
  private List<VisitAction> actions;

  @ManyToOne
  @JoinColumn(name = "userId")
  @JsonIgnore
  @ToString.Exclude
  private User user;

  @ManyToOne
  @JoinColumn(name = "placeId")
  @JsonIgnore
  @ToString.Exclude
  private Place place;

}
