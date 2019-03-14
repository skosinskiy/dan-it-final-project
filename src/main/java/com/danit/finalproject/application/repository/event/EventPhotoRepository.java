package com.danit.finalproject.application.repository.event;

import com.danit.finalproject.application.entity.event.EventPhoto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventPhotoRepository extends JpaRepository<EventPhoto, Long> {
}
