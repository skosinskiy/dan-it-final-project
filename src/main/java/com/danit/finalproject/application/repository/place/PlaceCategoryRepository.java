package com.danit.finalproject.application.repository.place;

import com.danit.finalproject.application.entity.place.PlaceCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlaceCategoryRepository extends JpaRepository<PlaceCategory, Long> {
}
