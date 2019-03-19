package com.danit.finalproject.application.repository.event;

import com.danit.finalproject.application.entity.event.EventCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventCategoryRepository extends JpaRepository<EventCategory, Long> {
}
