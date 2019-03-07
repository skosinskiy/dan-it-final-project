package com.danit.finalproject.application.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "visits_actions")
@Data
@NoArgsConstructor
public class VisitAction extends BaseEntity {
  private String type;
  private String mood;

  @ManyToOne
  @JoinColumn(name = "visit_id", nullable = false)
  private Visit visit;
}
