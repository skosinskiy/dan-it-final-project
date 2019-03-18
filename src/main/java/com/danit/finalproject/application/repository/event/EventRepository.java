package com.danit.finalproject.application.repository.event;

import com.danit.finalproject.application.entity.business.Business;
import com.danit.finalproject.application.entity.event.Event;
import com.danit.finalproject.application.entity.place.Place;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
  List<Event> findAllByPlaceAndBusiness(Place place, Business business);
}
