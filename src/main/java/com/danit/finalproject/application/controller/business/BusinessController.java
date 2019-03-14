package com.danit.finalproject.application.controller.business;

import com.danit.finalproject.application.entity.business.Business;
import com.danit.finalproject.application.service.business.BusinessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/businesses/")
public class BusinessController {
  private BusinessService businessService;

  @Autowired
  public BusinessController(BusinessService businessService) {
    this.businessService = businessService;
  }

  @GetMapping("{id}")
  public Business getBusinessById(@PathVariable("id") Long businessId) {
    return businessService.getBusinessById(businessId);
  }

//  @GetMapping
//  public List<Business> getAllBusinesses(@RequestParam("place") Long placeId, @RequestParam("location") String location) {
//    return businessService.;
//  }

  @PostMapping
  public Business createNewBusiness(@RequestBody Business business) {
    return businessService.createNewBusiness(business);
  }

  @PutMapping("{id}")
  public Business updateBusiness(@RequestBody Business business) {
    return businessService.updateBusiness(business);
  }

  @DeleteMapping("{id}")
  public void deleteBusiness(@PathVariable("id") Long businessId) {
    businessService.deleteBusiness(businessId);
  }
}
