package com.danit.finalproject.application.service.event;

import com.danit.finalproject.application.entity.event.EventCategory;
import com.danit.finalproject.application.repository.event.EventCategoryRepository;
import com.danit.finalproject.application.service.CrudService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EventCategoryService implements CrudService<EventCategory> {
  private EventCategoryRepository eventCategoryRepository;

  @Autowired
  public EventCategoryService(EventCategoryRepository eventCategoryRepository) {
    this.eventCategoryRepository = eventCategoryRepository;
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
    eventCategory.setId(id);
    return eventCategoryRepository.saveAndFlush(eventCategory);
  }

  @Override
  public EventCategory delete(Long id) {
    EventCategory eventCategory = eventCategoryRepository.findById(id).orElse(null);
    eventCategoryRepository.deleteById(id);
    return eventCategory;
  }
}
