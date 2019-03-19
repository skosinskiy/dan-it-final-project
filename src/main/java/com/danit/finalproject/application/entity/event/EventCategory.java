package com.danit.finalproject.application.entity.event;

import com.danit.finalproject.application.entity.BaseEntity;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.util.List;

@Entity
@Table(name = "event_categories")
@Data
@NoArgsConstructor
public class EventCategory extends BaseEntity {

  @Column(name = "name")
  private String name;

  @ManyToOne
  @JoinColumn(name = "parent_category_id")
  private EventCategory parentCategory;
}
