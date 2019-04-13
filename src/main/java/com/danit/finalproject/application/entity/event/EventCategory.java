package com.danit.finalproject.application.entity.event;

import com.danit.finalproject.application.entity.BaseEntity;
import lombok.AllArgsConstructor;
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

@Data
@NoArgsConstructor
@Entity
@AllArgsConstructor
@Table(name = "event_categories")
public class EventCategory extends BaseEntity {

  @Column(name = "name")
  private String name;

  @Column(name = "description")
  private String description;

  @ManyToOne
  @JoinColumn(name = "parent_category_id")
  private EventCategory parentCategory;

  @ManyToMany(mappedBy = "categories")
  @ToString.Exclude
  private List<Event> events;

  @Column(name = "image_key")
  private String imageKey;
}
