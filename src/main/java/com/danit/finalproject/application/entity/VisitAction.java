package com.danit.finalproject.application.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "visits_actions")
@Data
@NoArgsConstructor
public class VisitAction extends BaseEntity {

  @Column(name = "type")
  @Enumerated(EnumType.STRING)
  private Action action;

  @Column(name = "mood")
  @Enumerated(EnumType.STRING)
  private Mood mood;

  @ManyToOne
  @JoinColumn(name = "visit_id")
  private Visit visit;

}
