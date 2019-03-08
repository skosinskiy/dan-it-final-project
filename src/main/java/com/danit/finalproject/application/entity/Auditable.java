package com.danit.finalproject.application.entity;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.util.Date;

@Data
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public class Auditable {
  @CreatedDate
  @Column(name = "date_created")
  private Date createdDate;

  @LastModifiedDate
  @Column(name = "date_modified")
  private Date modifiedDate;
}

