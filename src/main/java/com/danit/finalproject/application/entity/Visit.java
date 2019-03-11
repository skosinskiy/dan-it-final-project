package com.danit.finalproject.application.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
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

}
