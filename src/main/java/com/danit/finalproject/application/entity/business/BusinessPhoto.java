package com.danit.finalproject.application.entity.business;

import com.danit.finalproject.application.entity.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "business_photos")
@Data
@NoArgsConstructor
public class BusinessPhoto extends BaseEntity {

  @Column(name = "photo")
  private String photo;

  @ManyToOne
  @JoinColumn(name = "business_id")
  private Business business;
}
