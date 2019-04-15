package com.danit.finalproject.application.service.event;

import com.danit.finalproject.application.entity.event.EventCategory;
import com.danit.finalproject.application.repository.event.EventCategoryRepository;
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
public class EventCategoryServiceTest {

  @Autowired
  private EventCategoryService eventCategoryService;

  @MockBean
  private EventCategoryRepository eventCategoryRepository;

  @MockBean
  private AmazonS3Service amazonS3Service;

  @Test
  public void verifyFindByIdCalledOnce() {
    Long expectedId = 1L;
    when(eventCategoryRepository.findById(expectedId)).thenReturn(Optional.of(new EventCategory()));

    EventCategory eventCategory = eventCategoryService.getById(expectedId);

    verify(eventCategoryRepository, times(1)).findById(expectedId);
    assertNotNull(eventCategory);
  }

  @Test
  public void verifyFindAllCalledOnce() {
    when(eventCategoryRepository.findAll()).thenReturn(new ArrayList<>());

    List<EventCategory> eventCategories = eventCategoryService.getAll();

    verify(eventCategoryRepository, times(1)).findAll();
    assertNotNull(eventCategories);
  }

  @Test
  public void verifySaveCalledOnce() {
    String expectedName = "testName";
    EventCategory eventCategory = new EventCategory();
    eventCategory.setName(expectedName);
    when(eventCategoryRepository.save(eventCategory)).thenReturn(eventCategory);
    EventCategory createdBusinesCategory = eventCategoryService.create(eventCategory);

    verify(eventCategoryRepository, times(1)).save(eventCategory);
    assertEquals(expectedName, createdBusinesCategory.getName());
  }

  @Test
  public void verifySaveCalledOnceAndS3ServiceDeleteCalledOnce() {
    Long expectedId = 2L;
    String expectedName = "testName";
    String expectedImageKey = "imageKey";
    String currentImageKey = "currentImageKey";
    EventCategory updateEventCategory = new EventCategory();
    updateEventCategory.setName(expectedName);
    updateEventCategory.setImageKey(expectedImageKey);
    updateEventCategory.setId(expectedId);
    EventCategory currentEventCategory = new EventCategory();
    currentEventCategory.setImageKey(currentImageKey);

    when(eventCategoryRepository.findById(expectedId)).thenReturn(Optional.of(currentEventCategory));
    when(eventCategoryRepository.saveAndFlush(updateEventCategory)).thenReturn(updateEventCategory);
    EventCategory updatedEventCategory = eventCategoryService.update(expectedId, updateEventCategory);

    verify(eventCategoryRepository, times(1)).saveAndFlush(updateEventCategory);
    verify(amazonS3Service, times(1)).deleteObject(currentImageKey);
    assertEquals(expectedId, updatedEventCategory.getId());
    assertEquals(expectedName, updatedEventCategory.getName());
    assertEquals(expectedImageKey, updatedEventCategory.getImageKey());
  }

  @Test
  public void verifyDeleteCalledOnceAndS3ServiceDeleteCalledOnce() {
    Long expectedId = 2L;
    String expectedName = "testName";
    String expectedImageKey = "imageKey";

    EventCategory eventCategory = new EventCategory();
    eventCategory.setName(expectedName);
    eventCategory.setImageKey(expectedImageKey);
    eventCategory.setId(expectedId);
    eventCategory.setEvents(new ArrayList<>());

    List<EventCategory> eventCategories = new ArrayList<>();
    EventCategory childEventCategory = new EventCategory();
    childEventCategory.setParentCategory(eventCategory);
    eventCategories.add(childEventCategory);

    when(eventCategoryRepository.findById(expectedId)).thenReturn(Optional.of(eventCategory));
    when(eventCategoryRepository.findAll()).thenReturn(eventCategories);

    EventCategory deletedEventCategory = eventCategoryService.delete(expectedId);

    verify(amazonS3Service, times(1)).deleteObject(expectedImageKey);
    verify(eventCategoryRepository, times(1)).findAll();
    verify(eventCategoryRepository, times(1)).deleteById(eventCategory.getId());
    assertEquals(eventCategory, deletedEventCategory);
  }
}