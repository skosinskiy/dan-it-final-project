package com.danit.finalproject.application.service.place;

import com.danit.finalproject.application.entity.place.PlaceCategory;
import com.danit.finalproject.application.repository.place.PlaceCategoryRepository;
import com.danit.finalproject.application.service.AmazonS3Service;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest
public class PlaceCategoryServiceTest {

  @Autowired
  private PlaceCategoryService placeCategoryService;

  @MockBean
  private PlaceCategoryRepository placeCategoryRepository;

  @MockBean
  private AmazonS3Service amazonS3Service;

  @Test
  public void verifyFindByIdCalledOnce() {
    Long expectedId = 1L;
    when(placeCategoryRepository.findById(expectedId)).thenReturn(Optional.of(new PlaceCategory()));

    PlaceCategory placeCategory = placeCategoryService.getById(expectedId);

    verify(placeCategoryRepository, times(1)).findById(expectedId);
    assertNotNull(placeCategory);
  }

  @Test
  public void verifyFindAllCalledOnce() {
    when(placeCategoryRepository.findAll()).thenReturn(new ArrayList<>());

    List<PlaceCategory> placeCategories = placeCategoryService.getAll();

    verify(placeCategoryRepository, times(1)).findAll();
    assertNotNull(placeCategories);
  }

  @Test
  public void verifySaveCalledOnce() {
    String expectedName = "testName";
    PlaceCategory placeCategory = new PlaceCategory();
    placeCategory.setName(expectedName);
    when(placeCategoryRepository.save(placeCategory)).thenReturn(placeCategory);
    PlaceCategory createdBusinesCategory = placeCategoryService.create(placeCategory);

    verify(placeCategoryRepository, times(1)).save(placeCategory);
    assertEquals(expectedName, createdBusinesCategory.getName());
  }

  @Test
  public void verifySaveCalledOnceAndS3ServiceDeleteCalledOnce() {
    Long expectedId = 2L;
    String expectedName = "testName";
    String expectedImageKey = "imageKey";
    String currentImageKey = "currentImageKey";
    PlaceCategory updatePlaceCategory = new PlaceCategory();
    updatePlaceCategory.setName(expectedName);
    updatePlaceCategory.setIconKey(expectedImageKey);
    updatePlaceCategory.setId(expectedId);
    PlaceCategory currentPlaceCategory = new PlaceCategory();
    currentPlaceCategory.setIconKey(currentImageKey);

    when(placeCategoryRepository.findById(expectedId)).thenReturn(Optional.of(currentPlaceCategory));
    when(placeCategoryRepository.saveAndFlush(updatePlaceCategory)).thenReturn(updatePlaceCategory);
    PlaceCategory updatedPlaceCategory = placeCategoryService.update(expectedId, updatePlaceCategory);

    verify(placeCategoryRepository, times(1)).saveAndFlush(updatePlaceCategory);
    verify(amazonS3Service, times(1)).deleteObject(currentImageKey);
    assertEquals(expectedId, updatedPlaceCategory.getId());
    assertEquals(expectedName, updatedPlaceCategory.getName());
    assertEquals(expectedImageKey, updatedPlaceCategory.getIconKey());
  }

  @Test
  public void verifyDeleteCalledOnceAndS3ServiceDeleteCalledOnce() {
    Long expectedId = 2L;
    String expectedName = "testName";
    String expectedImageKey = "imageKey";

    PlaceCategory placeCategory = new PlaceCategory();
    placeCategory.setName(expectedName);
    placeCategory.setIconKey(expectedImageKey);
    placeCategory.setId(expectedId);
    placeCategory.setPlaces(new ArrayList<>());

    List<PlaceCategory> placeCategories = new ArrayList<>();
    PlaceCategory childPlaceCategory = new PlaceCategory();
    placeCategories.add(childPlaceCategory);

    when(placeCategoryRepository.findById(expectedId)).thenReturn(Optional.of(placeCategory));
    when(placeCategoryRepository.findAll()).thenReturn(placeCategories);

    PlaceCategory deletedPlaceCategory = placeCategoryService.delete(expectedId);

    verify(amazonS3Service, times(1)).deleteObject(expectedImageKey);
    verify(placeCategoryRepository, times(1)).findById(expectedId);
    verify(placeCategoryRepository, times(1)).deleteById(placeCategory.getId());
    assertEquals(placeCategory, deletedPlaceCategory);
  }
}