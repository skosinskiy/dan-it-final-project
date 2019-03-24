package com.danit.finalproject.application.controller.business;

import com.danit.finalproject.application.dto.request.business.BusinessCategoryRequestDto;
import com.danit.finalproject.application.dto.response.business.BusinessCategoryResponseDto;
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
  public BusinessCategoryResponseDto getBusinessCategoryById(@PathVariable("id") Long businessCategoryId) {
    return businessCategoryFacade.getById(businessCategoryId);
  }

  @GetMapping
  public List<BusinessCategoryResponseDto> getAllBusinessCategories() {
    return businessCategoryFacade.getAll();
  }

  @PostMapping
  public BusinessCategoryResponseDto createNewBusinessCategory(
      @RequestBody BusinessCategoryRequestDto businessCategoryRequestDto) {
    return businessCategoryFacade.create(businessCategoryRequestDto);
  }

  @PutMapping("{id}")
  public BusinessCategoryResponseDto updateBusinessCategory(
      @PathVariable Long id,
      @RequestBody BusinessCategoryRequestDto businessCategoryRequestDto) {
    return businessCategoryFacade.update(id, businessCategoryRequestDto);
  }

  @DeleteMapping("{id}")
  public BusinessCategoryResponseDto deleteBusiness(@PathVariable("id") Long businessCategoryId) {
    return businessCategoryFacade.delete(businessCategoryId);
  }
}
