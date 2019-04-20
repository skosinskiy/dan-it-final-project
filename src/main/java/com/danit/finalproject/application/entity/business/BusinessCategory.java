package com.danit.finalproject.application.entity.business;

import com.danit.finalproject.application.entity.BaseEntity;
import com.danit.finalproject.application.entity.place.PlaceCategory;
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
@Table(name = "business_categories")
public class BusinessCategory extends BaseEntity {

  @Column(name = "name")
  private String name;

  @Column(name = "description")
  private String description;

  @ManyToOne
  @JoinColumn(name = "parent_category_id")
  private BusinessCategory parentCategory;

  @ManyToMany(mappedBy = "categories")
  @ToString.Exclude
  private List<Business> businesses;

  @Column(name = "image_key")
  private String imageKey;

  @ManyToMany(mappedBy = "businessCategories")
  @ToString.Exclude
  private List<PlaceCategory> placeCategories;
}
