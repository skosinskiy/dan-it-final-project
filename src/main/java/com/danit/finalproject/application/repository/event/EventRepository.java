package com.danit.finalproject.application.repository.event;

import com.danit.finalproject.application.entity.event.Event;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface EventRepository extends JpaRepository<Event, Long> {

  @Query("select e from Event e where "
          + "(:searchParam is null or lower(e.title) like lower(CONCAT('%', :searchParam, '%'))) or "
          + "(:searchParam is null or lower(e.place.title) like lower(CONCAT('%', :searchParam, '%'))) or "
          + "(:searchParam is null or lower(e.business.title) like lower(CONCAT('%', :searchParam, '%')))")
  Page<Event> getAllEventsByTitleOrBusinessTitleOrPlaceTitle(
      @Param("searchParam") String searchParam,
      Pageable pageable);

  @Query("select e from Event e")
  Page<Event> findAll(Pageable pageable);
}
