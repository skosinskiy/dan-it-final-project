package com.danit.finalproject.application.repository.place;

import com.danit.finalproject.application.entity.place.Place;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaceRepository extends JpaRepository<Place, Long> {
}
