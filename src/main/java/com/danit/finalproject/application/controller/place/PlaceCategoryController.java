package com.danit.finalproject.application.controller.place;

import com.danit.finalproject.application.dto.request.place.PlaceCategoryRequestDto;
import com.danit.finalproject.application.dto.response.place.PlaceCategoryResponseDto;
import com.danit.finalproject.application.facade.place.PlaceCategoryFacade;
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
@RequestMapping("/api/place-categories")
public class PlaceCategoryController {
  private PlaceCategoryFacade placeCategoryFacade;

  @Autowired
  public PlaceCategoryController(PlaceCategoryFacade placeCategoryFacade) {
    this.placeCategoryFacade = placeCategoryFacade;
  }

  @GetMapping("{id}")
  public PlaceCategoryResponseDto getPlaceCategoryById(@PathVariable("id") Long placeCategoryId) {
    return placeCategoryFacade.getById(placeCategoryId);
  }

  @GetMapping
  public List<PlaceCategoryResponseDto> getAllPlaceCategories() {
    return placeCategoryFacade.getAll();
  }

  @PostMapping
  public PlaceCategoryResponseDto createNewPlaceCategory(@RequestBody PlaceCategoryRequestDto placeCategoryRequestDto) {
    return placeCategoryFacade.create(placeCategoryRequestDto);
  }

  @PutMapping("{id}")
  public PlaceCategoryResponseDto updatePlaceCategory(
      @PathVariable Long id,
      @RequestBody PlaceCategoryRequestDto placeCategoryRequestDto) {
    return placeCategoryFacade.update(id, placeCategoryRequestDto);
  }

  @DeleteMapping("{id}")
  public PlaceCategoryResponseDto deletePlace(@PathVariable("id") Long placeCategoryId) {
    return placeCategoryFacade.delete(placeCategoryId);
  }
}
