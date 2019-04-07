package com.danit.finalproject.application.service.place;

import com.danit.finalproject.application.entity.place.PlaceCategory;
import com.danit.finalproject.application.repository.place.PlaceCategoryRepository;
import com.danit.finalproject.application.service.CrudService;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlaceCategoryService implements CrudService<PlaceCategory> {
  private PlaceCategoryRepository placeCategoryRepository;

  @Autowired
  public PlaceCategoryService(PlaceCategoryRepository placeCategoryRepository) {
    this.placeCategoryRepository = placeCategoryRepository;
  }

  @Override
  public PlaceCategory getById(Long id) {
    return placeCategoryRepository.findById(id).orElse(null);
  }

  @Override
  public List<PlaceCategory> getAll() {
    return placeCategoryRepository.findAll();
  }

  @Override
  public PlaceCategory create(PlaceCategory placeCategory) {
    return placeCategoryRepository.save(placeCategory);
  }

  @Override
  public PlaceCategory update(Long id, PlaceCategory placeCategory) {
    placeCategory.setId(id);
    return placeCategoryRepository.saveAndFlush(placeCategory);
  }

  @Override
  public PlaceCategory delete(Long id) {
    PlaceCategory placeCategory = getById(id);
    placeCategory.getPlaces().forEach(place -> {
      if (place.getPlaceCategory() != null && place.getPlaceCategory().getId().equals(placeCategory.getId())) {
        place.setPlaceCategory(null);
      }
    });
    placeCategoryRepository.deleteById(id);
    return placeCategory;
  }
}
