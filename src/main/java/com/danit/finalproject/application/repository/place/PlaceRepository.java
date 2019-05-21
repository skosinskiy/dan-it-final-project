package com.danit.finalproject.application.repository.place;

import com.danit.finalproject.application.entity.place.Place;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PlaceRepository extends JpaRepository<Place, Long> {

  @Query("select p from Place p where "
      + "(:param is null or lower(p.title) like lower(CONCAT('%', :param, '%')))")
  Page<Place> getAllPlacesByParam(String param, Pageable pageable);
}
