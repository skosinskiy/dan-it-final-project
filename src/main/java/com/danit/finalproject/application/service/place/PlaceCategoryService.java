package com.danit.finalproject.application.service.place;

import com.danit.finalproject.application.entity.place.PlaceCategory;
import com.danit.finalproject.application.repository.place.PlaceCategoryRepository;
import com.danit.finalproject.application.service.AmazonS3Service;
import com.danit.finalproject.application.service.CrudService;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlaceCategoryService implements CrudService<PlaceCategory> {
  private PlaceCategoryRepository placeCategoryRepository;
  private AmazonS3Service amazonS3Service;

  @Autowired
  public PlaceCategoryService(PlaceCategoryRepository placeCategoryRepository, AmazonS3Service amazonS3Service) {
    this.placeCategoryRepository = placeCategoryRepository;
    this.amazonS3Service = amazonS3Service;
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
    deleteCategoryIcon(placeCategory, id);
    return placeCategoryRepository.saveAndFlush(placeCategory);
  }

  private void deleteCategoryIcon(PlaceCategory updatedPlaceCategory, Long id) {
    PlaceCategory currentPlaceCategory = getById(id);
    String currentIconKey = currentPlaceCategory.getIconKey();
    String updatedIconKey = updatedPlaceCategory.getIconKey();
    if (currentIconKey != null && !currentIconKey.equals(updatedIconKey)) {
      amazonS3Service.deleteObject(currentIconKey);
    }
  }

  @Override
  public PlaceCategory delete(Long id) {
    PlaceCategory placeCategory = getById(id);
    deleteCategoryIcon(placeCategory);
    placeCategory.getPlaces().forEach(place -> {
      if (place.getPlaceCategory() != null && place.getPlaceCategory().getId().equals(placeCategory.getId())) {
        place.setPlaceCategory(null);
      }
    });
    placeCategoryRepository.deleteById(id);
    return placeCategory;
  }

  private void deleteCategoryIcon(PlaceCategory placeCategory) {
    String iconKey = placeCategory.getIconKey();
    if (iconKey != null) {
      amazonS3Service.deleteObject(iconKey);
    }
  }
}
