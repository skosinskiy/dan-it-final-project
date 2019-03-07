package com.danit.finalproject.application.entity.business;

import com.danit.finalproject.application.entity.BaseEntity;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.List;

@Entity
@Table(name = "business_categories")
@Data
@NoArgsConstructor
public class BusinessCategory extends BaseEntity {

  @Column(name = "name")
  private String name;

  @OneToMany(mappedBy = "parentCategory", fetch = FetchType.LAZY)
  private List<BusinessSubcategory> subcategories;
}
