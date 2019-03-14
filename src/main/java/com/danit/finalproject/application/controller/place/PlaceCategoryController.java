package com.danit.finalproject.application.controller.place;

import com.danit.finalproject.application.entity.place.PlaceCategory;
import com.danit.finalproject.application.service.place.PlaceCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/place-categories/")
public class PlaceCategoryController {
  private PlaceCategoryService placeCategoryService;

  @Autowired
  public PlaceCategoryController(PlaceCategoryService placeCategoryService) {
    this.placeCategoryService = placeCategoryService;
  }

  @GetMapping("{id}")
  public PlaceCategory getPlaceCategoryById(@PathVariable("id") Long placeCategoryId) {
    return placeCategoryService.getPlaceCategoryById(placeCategoryId);
  }

  @GetMapping
  public List<PlaceCategory> getAllPlaceCategories() {
    return placeCategoryService.findAll();
  }

  @PostMapping
  public PlaceCategory createNewPlaceCategory(@RequestBody PlaceCategory placeCategory) {
    return placeCategoryService.createNewPlaceCategory(placeCategory);
  }

  @PutMapping("{id}")
  public PlaceCategory updatePlaceCategory(@RequestBody PlaceCategory placeCategory) {
    return placeCategoryService.updatePlaceCategory(placeCategory);
  }

  @DeleteMapping("{id}")
  public void deletePlace(@PathVariable("id") Long placeCategoryId) {
    placeCategoryService.deletePlaceCategory(placeCategoryId);
  }
}
