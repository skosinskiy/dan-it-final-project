package com.danit.finalproject.application.controller.business;

import com.danit.finalproject.application.dto.request.business.BusinessCategoryRequest;
import com.danit.finalproject.application.dto.response.business.BusinessCategoryResponse;
import com.danit.finalproject.application.facade.business.BusinessCategoryFacade;
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
@RequestMapping("api/business-categories")
public class BusinessCategoryController {
  private BusinessCategoryFacade businessCategoryFacade;

  @Autowired
  public BusinessCategoryController(BusinessCategoryFacade businessCategoryFacade) {
    this.businessCategoryFacade = businessCategoryFacade;
  }

  @GetMapping("{id}")
  public BusinessCategoryResponse getBusinessCategoryById(@PathVariable("id") Long businessCategoryId) {
    return businessCategoryFacade.getById(businessCategoryId);
  }

  @GetMapping
  public List<BusinessCategoryResponse> getAllBusinessCategories() {
    return businessCategoryFacade.getAll();
  }

  @PostMapping
  public BusinessCategoryResponse createNewBusinessCategory(
      @RequestBody BusinessCategoryRequest businessCategoryRequest) {
    return businessCategoryFacade.create(businessCategoryRequest);
  }

  @PutMapping("{id}")
  public BusinessCategoryResponse updateBusinessCategory(
      @PathVariable Long id,
      @RequestBody BusinessCategoryRequest businessCategoryRequest) {
    return businessCategoryFacade.update(id, businessCategoryRequest);
  }

  @DeleteMapping("{id}")
  public BusinessCategoryResponse deleteBusiness(@PathVariable("id") Long businessCategoryId) {
    return businessCategoryFacade.delete(businessCategoryId);
  }
}
