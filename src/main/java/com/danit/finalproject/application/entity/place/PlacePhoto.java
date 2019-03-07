package com.danit.finalproject.application.entity.place;

import com.danit.finalproject.application.entity.BaseEntity;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "places_photos")
@Data
@NoArgsConstructor
public class PlacePhoto extends BaseEntity {
    private String photo;

    @OneToOne
    @JoinColumn(name = "main_place_id")
    private Place main;

    @ManyToOne
    @JoinColumn(name = "place_id", nullable = false)
    private Place place;
}
