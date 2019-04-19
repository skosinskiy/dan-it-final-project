package com.danit.finalproject.application.repository.event;

import com.danit.finalproject.application.entity.business.Business;
import com.danit.finalproject.application.entity.event.Event;
import com.danit.finalproject.application.entity.place.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
  @Query("select b from Events b where "
         + "(:placeId is null or b.place.id = :placeId) and "
         + "(:businessId is null or b.business.id = :businessId)"
         )
  List<Event> findByParams(@Param("placeId") Long placeId, @Param("businessId") Long businessId);
}
