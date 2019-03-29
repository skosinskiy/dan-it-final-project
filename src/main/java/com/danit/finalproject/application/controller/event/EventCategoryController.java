package com.danit.finalproject.application.controller.event;

import com.danit.finalproject.application.dto.request.event.EventCategoryRequest;
import com.danit.finalproject.application.dto.response.event.EventCategoryResponse;
import com.danit.finalproject.application.facade.event.EventCategoryFacade;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/event-categories")
public class EventCategoryController {
  private EventCategoryFacade eventCategoryFacade;

  @Autowired
  public EventCategoryController(EventCategoryFacade eventCategoryFacade) {
    this.eventCategoryFacade = eventCategoryFacade;
  }

  @GetMapping("{id}")
  public ResponseEntity<EventCategoryResponse> getEventCategoryById(@PathVariable("id") Long eventCategoryId) {
    return new ResponseEntity<>(eventCategoryFacade.getById(eventCategoryId), HttpStatus.OK);
  }

  @GetMapping
  public ResponseEntity<List<EventCategoryResponse>> getAllEventCategories() {
    return new ResponseEntity<>(eventCategoryFacade.getAll(), HttpStatus.OK);
  }

  @PostMapping
  @PreAuthorize("hasAuthority('MANAGE_EVENT_CATEGORIES')")
  public ResponseEntity<EventCategoryResponse> createNewEventCategory(
      @RequestBody EventCategoryRequest eventCategoryRequest) {
    return new ResponseEntity<>(eventCategoryFacade.create(eventCategoryRequest), HttpStatus.OK);
  }

  @PutMapping("{id}")
  @PreAuthorize("hasAuthority('MANAGE_EVENT_CATEGORIES')")
  public ResponseEntity<EventCategoryResponse> updateEventCategory(
      @PathVariable Long id,
      @RequestBody EventCategoryRequest eventCategoryRequest) {
    return new ResponseEntity<>(eventCategoryFacade.update(id, eventCategoryRequest), HttpStatus.OK);
  }

  @DeleteMapping("{id}")
  @PreAuthorize("hasAuthority('MANAGE_EVENT_CATEGORIES')")
  public ResponseEntity<EventCategoryResponse> deleteEvent(@PathVariable("id") Long eventCategoryId) {
    return new ResponseEntity<>(eventCategoryFacade.delete(eventCategoryId), HttpStatus.OK);
  }
}
