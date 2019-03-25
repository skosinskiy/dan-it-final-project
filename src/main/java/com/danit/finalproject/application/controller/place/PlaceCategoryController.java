package com.danit.finalproject.application.controller.place;

import com.danit.finalproject.application.dto.request.place.PlaceCategoryRequest;
import com.danit.finalproject.application.dto.response.place.PlaceCategoryResponse;
import com.danit.finalproject.application.facade.place.PlaceCategoryFacade;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/place-categories")
public class PlaceCategoryController {
  private PlaceCategoryFacade placeCategoryFacade;

  @Autowired
  public PlaceCategoryController(PlaceCategoryFacade placeCategoryFacade) {
    this.placeCategoryFacade = placeCategoryFacade;
  }

  @GetMapping("{id}")
  public PlaceCategoryResponse getPlaceCategoryById(@PathVariable("id") Long placeCategoryId) {
    return placeCategoryFacade.getById(placeCategoryId);
  }

  @GetMapping
  public List<PlaceCategoryResponse> getAllPlaceCategories() {
    return placeCategoryFacade.getAll();
  }

  @PostMapping
  public PlaceCategoryResponse createNewPlaceCategory(@RequestBody PlaceCategoryRequest placeCategoryRequest) {
    return placeCategoryFacade.create(placeCategoryRequest);
  }

  @PutMapping("{id}")
  public PlaceCategoryResponse updatePlaceCategory(
      @PathVariable Long id,
      @RequestBody PlaceCategoryRequest placeCategoryRequest) {
    return placeCategoryFacade.update(id, placeCategoryRequest);
  }

  @DeleteMapping("{id}")
  public PlaceCategoryResponse deletePlace(@PathVariable("id") Long placeCategoryId) {
    return placeCategoryFacade.delete(placeCategoryId);
  }
}
