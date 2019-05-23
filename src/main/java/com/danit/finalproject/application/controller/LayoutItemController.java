package com.danit.finalproject.application.controller;

import com.danit.finalproject.application.entity.LayoutItem;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/layout-items")
public class LayoutItemController {
  @GetMapping
  public ResponseEntity<String> getAll() throws JsonProcessingException {
    return new ResponseEntity<>(new ObjectMapper().writeValueAsString(LayoutItem.values()),
        HttpStatus.OK);
  }
}
