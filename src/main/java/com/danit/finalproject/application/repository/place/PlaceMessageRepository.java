package com.danit.finalproject.application.repository.place;
import com.danit.finalproject.application.entity.place.PlaceMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaceMessageRepository extends JpaRepository<PlaceMessage, Long> {
  PlaceMessage findByPlaceId(Long placeId);
}
