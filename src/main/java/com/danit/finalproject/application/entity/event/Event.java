package com.danit.finalproject.application.entity.event;

import com.danit.finalproject.application.entity.BaseEntity;
import com.danit.finalproject.application.entity.Notification;
import com.danit.finalproject.application.entity.place.Place;
import com.danit.finalproject.application.entity.buseness.Business;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "events")
@Data
@NoArgsConstructor
public class Event extends BaseEntity {

    private String title;
    private String description;

    @ManyToMany
    @JoinTable(name = "events_categories",
    joinColumns = {@JoinColumn(name = "event_id")},
    inverseJoinColumns = {@JoinColumn(name = "category_id")})
    private List<EventCategory> categories;

    @OneToOne(mappedBy = "main", cascade = CascadeType.ALL)
    private EventPhoto mainPhoto;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<EventPhoto> photos;

    @OneToOne
    @JoinColumn(name = "business_id")
    private Business business;

    @OneToOne(mappedBy = "event")
    private Notification notification;

    @ManyToOne
    @JoinColumn(name = "place_id")
    private Place place;

    private String adress;
}
