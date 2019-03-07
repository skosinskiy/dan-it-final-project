package com.danit.finalproject.application.entity.place;

import com.danit.finalproject.application.entity.BaseEntity;
import com.danit.finalproject.application.entity.Notification;
import com.danit.finalproject.application.entity.User;
import com.danit.finalproject.application.entity.buseness.Business;
import com.danit.finalproject.application.entity.event.Event;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "places")
@Data
@NoArgsConstructor
public class Place extends BaseEntity {
    private String title;
    private String description;
    private String adress;

    @OneToMany(mappedBy = "place")
    private List<Business> businesses;

    @OneToMany(mappedBy = "place")
    private List<Notification> notifications;

    @OneToOne(mappedBy = "main", cascade = CascadeType.ALL)
    private PlacePhoto mainPhoto;

    @OneToMany(mappedBy = "place", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<PlacePhoto> photos;

    @OneToMany(mappedBy = "place")
    private List<Event> events;

    @OneToMany(mappedBy = "place", fetch = FetchType.LAZY)
    private List<User> users;

    @ManyToOne
    @JoinColumn(name = "place_category", nullable = false)
    private PlaceCategory placeCategory;
}
