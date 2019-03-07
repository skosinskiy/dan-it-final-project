package com.danit.finalproject.application.entity.buseness;

import com.danit.finalproject.application.entity.BaseEntity;
import com.danit.finalproject.application.entity.event.Event;
import com.danit.finalproject.application.entity.Notification;
import com.danit.finalproject.application.entity.place.Place;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
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
    private String web_site;
    private String phone;

    @ManyToOne
    @JoinColumn(name = "place_id")
    private Place place;

    @OneToOne(mappedBy = "mainBusiness")
    private Event event;

    @OneToOne(mappedBy = "main", cascade = CascadeType.ALL)
    private BusinessPhoto mainPhoto;

    @OneToMany(mappedBy = "business", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<BusinessPhoto> photos;

    @OneToOne(mappedBy = "business")
    private Notification notification;
}
