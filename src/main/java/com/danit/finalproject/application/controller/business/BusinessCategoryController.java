package com.danit.finalproject.application.controller.business;

import com.danit.finalproject.application.entity.business.BusinessCategory;
import com.danit.finalproject.application.service.business.BusinessCategoryService;
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
@RequestMapping("api/business-categories/")
public class BusinessCategoryController {
  private BusinessCategoryService businessCategoryService;

  @Autowired
  public BusinessCategoryController(BusinessCategoryService businessCategoryService) {
    this.businessCategoryService = businessCategoryService;
  }

  @GetMapping("{id}")
  public BusinessCategory getBusinessCategoryById(@PathVariable("id") Long businessCategoryId) {
    return businessCategoryService.getBusinessCategoryById(businessCategoryId);
  }

  @GetMapping
  public List<BusinessCategory> getAllBusinessCategories() {
    return businessCategoryService.findAll();
  }

  @PostMapping
  public BusinessCategory createNewBusinessCategory(@RequestBody BusinessCategory businessCategory) {
    return businessCategoryService.createNewBusinesCategory(businessCategory);
  }

  @PutMapping("{id}")
  public BusinessCategory updateBusinessCategory(@RequestBody BusinessCategory businessCategory) {
    return businessCategoryService.updateBusinessCategory(businessCategory);
  }

  @DeleteMapping("{id}")
  public void deleteBusiness(@PathVariable("id") Long businessCategoryId) {
    businessCategoryService.deleteBusinessCategory(businessCategoryId);
  }
}
