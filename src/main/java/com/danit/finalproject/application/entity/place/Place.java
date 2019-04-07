package com.danit.finalproject.application.entity.place;

import com.danit.finalproject.application.entity.BaseEntity;
import com.danit.finalproject.application.entity.Notification;
import com.danit.finalproject.application.entity.Visit;
import com.danit.finalproject.application.entity.business.Business;
import com.danit.finalproject.application.entity.event.Event;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "places")
@Data
@NoArgsConstructor
public class Place extends BaseEntity {

  @Column(name = "title")
  private String title;

  @Column(name = "description")
  private String description;

  @Column(name = "address")
  private String address;

  @OneToMany(mappedBy = "place", cascade = CascadeType.REMOVE)
  @ToString.Exclude
  private List<Business> businesses;


  @OneToMany(mappedBy = "place", cascade = CascadeType.REMOVE)
  @ToString.Exclude
  private List<Event> events;


  @OneToMany(mappedBy = "place", cascade = CascadeType.REMOVE)
  @ToString.Exclude
  private List<Notification> notifications;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "main_photo")
  private PlacePhoto mainPhoto;

  @OneToMany(cascade = CascadeType.ALL, mappedBy = "place")
  @ToString.Exclude
  private List<PlacePhoto> photos;

  @ManyToOne
  @JoinColumn(name = "place_category")
  private PlaceCategory placeCategory;

  @OneToMany(mappedBy = "place")
  @ToString.Exclude
  private List<Visit> visits;

}
