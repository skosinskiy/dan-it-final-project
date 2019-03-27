package com.danit.finalproject.application.controller.business;

import com.danit.finalproject.application.dto.request.business.BusinessCategoryRequest;
import com.danit.finalproject.application.dto.response.business.BusinessCategoryResponse;
import com.danit.finalproject.application.facade.business.BusinessCategoryFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
@RequestMapping("api/business-categories")
public class BusinessCategoryController {
  private BusinessCategoryFacade businessCategoryFacade;

  @Autowired
  public BusinessCategoryController(BusinessCategoryFacade businessCategoryFacade) {
    this.businessCategoryFacade = businessCategoryFacade;
  }

  @GetMapping("{id}")
  public ResponseEntity<BusinessCategoryResponse> getBusinessCategoryById(@PathVariable("id") Long businessCategoryId) {
    return new ResponseEntity<>(businessCategoryFacade.getById(businessCategoryId), HttpStatus.OK);
  }

  @GetMapping
  public ResponseEntity<List<BusinessCategoryResponse>> getAllBusinessCategories() {
    return new ResponseEntity<>(businessCategoryFacade.getAll(), HttpStatus.OK);
  }

  @PostMapping
  public ResponseEntity<BusinessCategoryResponse> createNewBusinessCategory(
      @RequestBody BusinessCategoryRequest businessCategoryRequest) {
    return new ResponseEntity<>(businessCategoryFacade.create(businessCategoryRequest), HttpStatus.OK);
  }

  @PutMapping("{id}")
  public ResponseEntity<BusinessCategoryResponse> updateBusinessCategory(
      @PathVariable Long id,
      @RequestBody BusinessCategoryRequest businessCategoryRequest) {
    return new ResponseEntity<>(businessCategoryFacade.update(id, businessCategoryRequest), HttpStatus.OK);
  }

  @DeleteMapping("{id}")
  public ResponseEntity<BusinessCategoryResponse> deleteBusiness(@PathVariable("id") Long businessCategoryId) {
    return new ResponseEntity<>(businessCategoryFacade.delete(businessCategoryId), HttpStatus.OK);
  }
}
