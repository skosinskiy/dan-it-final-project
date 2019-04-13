package com.danit.finalproject.application.service.event;

import com.danit.finalproject.application.entity.business.BusinessCategory;
import com.danit.finalproject.application.entity.event.EventCategory;
import com.danit.finalproject.application.repository.event.EventCategoryRepository;
import com.danit.finalproject.application.service.AmazonS3Service;
import com.danit.finalproject.application.service.CrudService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EventCategoryService implements CrudService<EventCategory> {
  private EventCategoryRepository eventCategoryRepository;
  private AmazonS3Service amazonS3Service;

  @Autowired
  public EventCategoryService(
      EventCategoryRepository eventCategoryRepository,
      AmazonS3Service amazonS3Service) {
    this.eventCategoryRepository = eventCategoryRepository;
    this.amazonS3Service = amazonS3Service;
  }

  @Override
  public EventCategory getById(Long id) {
    return eventCategoryRepository.findById(id).orElse(null);
  }

  @Override
  public List<EventCategory> getAll() {
    return eventCategoryRepository.findAll();
  }

  @Override
  public EventCategory create(EventCategory eventCategory) {
    return eventCategoryRepository.save(eventCategory);
  }

  @Override
  public EventCategory update(Long id, EventCategory eventCategory) {
    deleteCategoryImage(eventCategory, id);
    eventCategory.setId(id);
    return eventCategoryRepository.saveAndFlush(eventCategory);
  }

  @Override
  public EventCategory delete(Long id) {
    EventCategory eventCategory = getById(id);
    deleteCategoryImage(eventCategory);
    eventCategory
            .getEvents()
            .forEach(event -> event.getCategories().remove(eventCategory));
    getAll().forEach(category -> {
      if (category.getParentCategory() == eventCategory) {
        category.setParentCategory(null);
      }
    });
    eventCategoryRepository.deleteById(id);
    return eventCategory;
  }

  private void deleteCategoryImage(EventCategory eventCategory) {
    String imageKey = eventCategory.getImageKey();
    if (imageKey != null) {
      amazonS3Service.deleteObject(imageKey);
    }
  }

  private void deleteCategoryImage(EventCategory updatedEventCategory, Long id) {
    EventCategory currentEventCategory = getById(id);
    String currentImageKey = currentEventCategory.getImageKey();
    String updatedImageKey = updatedEventCategory.getImageKey();
    if (currentImageKey != null && !currentImageKey.equals(updatedImageKey)) {
      amazonS3Service.deleteObject(currentImageKey);
    }
  }
}
