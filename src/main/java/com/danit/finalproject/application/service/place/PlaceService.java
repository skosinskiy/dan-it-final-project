package com.danit.finalproject.application.service.place;

import com.danit.finalproject.application.entity.place.Place;
import com.danit.finalproject.application.repository.place.PlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlaceService {
  private PlaceRepository placeRepository;

  @Autowired
  public PlaceService(PlaceRepository placeRepository) {
    this.placeRepository = placeRepository;
  }

  public Place getPlaceById(Long id) {
    return placeRepository.findById(id).orElse(null);
  }

  public List<Place> findAll() {
    return placeRepository.findAll();
  }

  public Place createNewPlace(Place place) {
    return placeRepository.save(place);
  }

  public Place updatePlace(Place place, Long id) {
    place.setId(id);
    return placeRepository.save(place);
  }

  public void deletePlace(Long id) {
    placeRepository.deleteById(id);
  }
}
