package com.danit.finalproject.application.entity.business;

import com.danit.finalproject.application.entity.BaseEntity;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.util.Date;

@Data
@NoArgsConstructor
@Entity
@Table(name = "business_categories")
public class BusinessCategory extends BaseEntity {

  @Column(name = "name")
  private String name;

  @ManyToOne
  @JoinColumn(name = "parent_category_id")
  private BusinessCategory category;

}
