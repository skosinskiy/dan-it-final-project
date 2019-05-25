package com.danit.finalproject.application.repository.place;

import com.danit.finalproject.application.entity.place.PlaceMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlaceMessageRepository extends JpaRepository<PlaceMessage, Long> {

  List<PlaceMessage> findAllByPlaceId(Long placeId);

}
