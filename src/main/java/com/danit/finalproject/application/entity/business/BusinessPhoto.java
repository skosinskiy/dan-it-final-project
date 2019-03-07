package com.danit.finalproject.application.entity.business;

import com.danit.finalproject.application.entity.BaseEntity;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;


@Entity
@Table(name = "business_photos")
@Data
@NoArgsConstructor
public class BusinessPhoto extends BaseEntity {

  @Column(name = "photo")
  private String photo;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "main_business_id")
  private Business main;

  @ManyToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "business_id")
  private Business business;
}
