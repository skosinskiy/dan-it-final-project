package com.danit.finalproject.application.service.place;

import com.danit.finalproject.application.entity.place.PlaceCategory;
import com.danit.finalproject.application.repository.place.PlaceCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlaceCategoryService {
  private PlaceCategoryRepository placeCategoryRepository;

  @Autowired
  public PlaceCategoryService(PlaceCategoryRepository placeCategoryRepository) {
    this.placeCategoryRepository = placeCategoryRepository;
  }

  public PlaceCategory getPlaceCategoryById(Long id) {
    return placeCategoryRepository.getOne(id);
  }

  public List<PlaceCategory> findAll() {
    return placeCategoryRepository.findAll();
  }

  public PlaceCategory createNewPlaceCategory(PlaceCategory placeCategory) {
    return placeCategoryRepository.save(placeCategory);
  }

  public PlaceCategory updatePlaceCategory(PlaceCategory placeCategory) {
    return placeCategoryRepository.saveAndFlush(placeCategory);
  }

  public void deletePlaceCategory(Long id) {
    placeCategoryRepository.deleteById(id);
  }
}
