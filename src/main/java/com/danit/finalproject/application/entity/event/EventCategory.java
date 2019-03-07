package com.danit.finalproject.application.entity.event;

import com.danit.finalproject.application.entity.BaseEntity;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import java.util.List;

@Entity
@Table(name = "event_categories")
@Data
@NoArgsConstructor
public class EventCategory extends BaseEntity {
  private String name;

  @ManyToMany(mappedBy = "categories", fetch = FetchType.LAZY)
  private List<Event> events;
}
