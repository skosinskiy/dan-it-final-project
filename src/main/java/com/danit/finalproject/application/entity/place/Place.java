package com.danit.finalproject.application.entity.place;

import com.danit.finalproject.application.entity.BaseEntity;
import com.danit.finalproject.application.entity.Notification;
import com.danit.finalproject.application.entity.User;
import com.danit.finalproject.application.entity.business.Business;
import com.danit.finalproject.application.entity.event.Event;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.util.List;

@Entity
@Table(name = "places")
@Data
@NoArgsConstructor
public class Place extends BaseEntity {
  private String title;
  private String description;
  private String adress;

  @OneToMany(mappedBy = "place")
  private List<Business> businesses;

  @OneToMany(mappedBy = "place")
  private List<Notification> notifications;

  @OneToOne(mappedBy = "main")
  private PlacePhoto mainPhoto;

  @OneToMany(mappedBy = "place", fetch = FetchType.LAZY)
  private List<PlacePhoto> photos;

  @OneToMany(mappedBy = "place")
  private List<Event> events;

  @OneToMany(mappedBy = "place", fetch = FetchType.LAZY)
  private List<User> users;

  @ManyToOne
  @JoinColumn(name = "place_category", nullable = false)
  private PlaceCategory placeCategory;
}
