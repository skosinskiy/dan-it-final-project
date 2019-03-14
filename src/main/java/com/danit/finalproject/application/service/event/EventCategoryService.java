package com.danit.finalproject.application.service.event;

import com.danit.finalproject.application.entity.event.EventCategory;
import com.danit.finalproject.application.repository.event.EventCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventCategoryService {
  private EventCategoryRepository eventCategoryRepository;

  @Autowired
  public EventCategoryService(EventCategoryRepository eventCategoryRepository) {
    this.eventCategoryRepository = eventCategoryRepository;
  }

  public EventCategory getEventCategoryById(Long id) {
    return eventCategoryRepository.getOne(id);
  }

  public List<EventCategory> findAll() {
    return eventCategoryRepository.findAll();
  }

  public EventCategory createNewEventCategory(EventCategory eventCategory) {
    return eventCategoryRepository.save(eventCategory);
  }

  public EventCategory updateEventCategory(EventCategory eventCategory) {
    return eventCategoryRepository.saveAndFlush(eventCategory);
  }

  public void deleteEventCategory(Long id) {
    eventCategoryRepository.deleteById(id);
  }
}
