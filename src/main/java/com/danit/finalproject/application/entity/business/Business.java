package com.danit.finalproject.application.entity.business;

import com.danit.finalproject.application.entity.BaseEntity;
import com.danit.finalproject.application.entity.event.Event;
import com.danit.finalproject.application.entity.Notification;
import com.danit.finalproject.application.entity.place.Place;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.util.List;

@Entity
@Table(name = "places")
@Data
@NoArgsConstructor
public class Business extends BaseEntity {
  private String title;
  private String description;

  @ManyToMany
  @JoinTable(name = "businesses_categorie",
          joinColumns = {@JoinColumn(name = "business_id")},
          inverseJoinColumns = {@JoinColumn(name = "category_id")})
  private BusinessSubcategory category;

  private String adress;
  @Column(name = "web_site")
  private String site;
  private String phone;

  @ManyToOne
  @JoinColumn(name = "place_id")
  private Place place;

  @OneToOne(mappedBy = "mainBusiness")
  private Event event;

  @OneToOne(mappedBy = "main")
  private BusinessPhoto mainPhoto;

  @OneToMany(mappedBy = "business", fetch = FetchType.LAZY)
  private List<BusinessPhoto> photos;

  @OneToOne(mappedBy = "business")
  private Notification notification;
}
