package com.danit.finalproject.application.entity.buseness;

import com.danit.finalproject.application.entity.BaseEntity;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "business_photos")
@Data
@NoArgsConstructor
public class BusinessPhoto extends BaseEntity {
    private String photo;

    @OneToOne
    @JoinColumn(name = "main_business_id")
    private Business main;

    @ManyToOne
    @JoinColumn(name = "business_id")
    private Business business;
}
