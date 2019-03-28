package com.danit.finalproject.application.entity.business;

import com.danit.finalproject.application.entity.BaseEntity;
import com.danit.finalproject.application.entity.event.Event;
import com.danit.finalproject.application.entity.place.Place;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.List;
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
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

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

  @ManyToMany(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
  @JoinTable(name = "businesses_categories",
          joinColumns = {@JoinColumn(name = "business_id")},
          inverseJoinColumns = {@JoinColumn(name = "category_id")})
  @ToString.Exclude
  private List<BusinessCategory> categories;

  @Column(name = "address")
  private String address;

  @Column(name = "web_site")
  private String webSite;

  @Column(name = "phone_number")
  private String phoneNumber;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "main_photo")
  private BusinessPhoto mainPhoto;

  @OneToMany(cascade = CascadeType.ALL, mappedBy = "business")
  @ToString.Exclude
  @JsonIgnore
  private List<BusinessPhoto> photos;

  @ManyToOne
  @JoinColumn(name = "place_id")
  private Place place;


  @OneToMany(mappedBy = "business", cascade = CascadeType.REMOVE)
  @ToString.Exclude
  @JsonIgnore
  private List<Event> events;
}
