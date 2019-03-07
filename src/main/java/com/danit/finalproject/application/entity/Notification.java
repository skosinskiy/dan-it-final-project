package com.danit.finalproject.application.entity;

import com.danit.finalproject.application.entity.buseness.Business;
import com.danit.finalproject.application.entity.event.Event;
import com.danit.finalproject.application.entity.place.Place;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "notifications")
@Data
@NoArgsConstructor
public class Notification extends BaseEntity {
    private String text;

    @ManyToOne
    @JoinColumn(name = "place_id")
    private Place place;

    @OneToOne
    @JoinColumn(name = "business_id")
    private Business business;

    @OneToOne
    @JoinColumn(name = "event_id")
    private Event event;
}
