package com.danit.finalproject.application.repository.event;

import com.danit.finalproject.application.entity.event.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {

  @Query("select e from Event e where "
          + "(:searchParam is null or lower(e.title) like lower(CONCAT('%', :searchParam, '%'))) or "
          + "(:searchParam is null or lower(e.place.title) like lower(CONCAT('%', :searchParam, '%'))) or "
          + "(:searchParam is null or lower(e.business.title) like lower(CONCAT('%', :searchParam, '%')))")
  List<Event> getAllEventsByTitleOrBusinessTitleOrPlaceTitle(@Param("searchParam") String searchParam);
}
