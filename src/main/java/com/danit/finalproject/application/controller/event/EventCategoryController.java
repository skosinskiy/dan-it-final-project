package com.danit.finalproject.application.controller.event;

import com.danit.finalproject.application.entity.event.EventCategory;
import com.danit.finalproject.application.service.event.EventCategoryService;
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
public class EventCategoryController {
  private EventCategoryService eventCategoryService;

  @Autowired
  public EventCategoryController(EventCategoryService eventCategoryService) {
    this.eventCategoryService = eventCategoryService;
  }

  @GetMapping("{id}")
  public EventCategory getEevenCategoryById(@PathVariable("id") Long eventCategoryId) {
    return eventCategoryService.getEventCategoryById(eventCategoryId);
  }

  @GetMapping
  public List<EventCategory> getAllEventCategories() {
    return eventCategoryService.findAll();
  }

  @PostMapping
  public EventCategory createNewEventCategory(@RequestBody EventCategory eventCategory) {
    return eventCategoryService.createNewEventCategory(eventCategory);
  }

  @PutMapping("{id}")
  public EventCategory updateEventCategory(@RequestBody EventCategory eventCategory) {
    return eventCategoryService.updateEventCategory(eventCategory);
  }

  @DeleteMapping("{id}")
  public void deleteEvent(@PathVariable("id") Long eventCategoryId) {
    eventCategoryService.deleteEventCategory(eventCategoryId);
  }
}
