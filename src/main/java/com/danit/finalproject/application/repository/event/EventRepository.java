package com.danit.finalproject.application.repository.event;

import com.danit.finalproject.application.entity.event.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
}
