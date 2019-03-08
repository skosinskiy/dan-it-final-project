package com.danit.finalproject.application.entity.business;

import com.danit.finalproject.application.entity.BaseEntity;
import com.danit.finalproject.application.entity.event.Event;
import com.danit.finalproject.application.entity.place.Place;
import lombok.AllArgsConstructor;
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
@Table(name = "businesses")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Business extends BaseEntity {

  @Column(name = "title")
  private String title;

  @Column(name = "description")
  private String description;

  @ManyToMany
  @JoinTable(name = "businesses_categories",
          joinColumns = {@JoinColumn(name = "business_id")},
          inverseJoinColumns = {@JoinColumn(name = "category_id")})
  private List<BusinessCategory> categories;

  @Column(name = "address")
  private String address;

  @Column(name = "web_site")
  private String webSite;

  @Column(name = "phone_number")
  private String phoneNumber;

  @ManyToOne
  @JoinColumn(name = "place_id")
  private Place place;

  @OneToMany
  @JoinColumn(name = "event_id")
  private List<Event> events;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "main_photo")
  private BusinessPhoto mainPhoto;

  @OneToMany(cascade = CascadeType.ALL)
  @JoinColumn(name = "photos")
  private List<BusinessPhoto> photos;

}
