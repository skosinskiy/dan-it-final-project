package com.danit.finalproject.application.entity.event;

import com.danit.finalproject.application.entity.BaseEntity;
import com.danit.finalproject.application.entity.place.Place;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.util.List;

@Entity
@Table(name = "events")
@Data
@NoArgsConstructor
public class Event extends BaseEntity {

  @Column(name = "title")
  private String title;

  @Column(name = "description")
  private String description;

  @ManyToMany
  @JoinTable(name = "events_categories",
          joinColumns = {@JoinColumn(name = "event_id")},
          inverseJoinColumns = {@JoinColumn(name = "category_id")})
  private List<EventCategory> categories;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "main_photo")
  private EventPhoto mainPhoto;

  @OneToMany(cascade = CascadeType.ALL)
  @JoinColumn(name = "photos")
  private List<EventPhoto> photos;

  @ManyToOne
  @JoinColumn(name = "place_id")
  private Place place;

  @Column(name = "address")
  private String address;
}
