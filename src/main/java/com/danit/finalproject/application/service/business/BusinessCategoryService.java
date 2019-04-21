package com.danit.finalproject.application.service.business;

import com.danit.finalproject.application.entity.business.BusinessCategory;
import com.danit.finalproject.application.repository.business.BusinessCategoryRepository;
import com.danit.finalproject.application.service.AmazonS3Service;
import com.danit.finalproject.application.service.CrudService;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BusinessCategoryService implements CrudService<BusinessCategory> {

  private BusinessCategoryRepository businessCategoryRepository;
  private AmazonS3Service amazonS3Service;

  @Autowired
  public BusinessCategoryService(
      BusinessCategoryRepository businessCategoryRepository,
      AmazonS3Service amazonS3Service) {
    this.businessCategoryRepository = businessCategoryRepository;
    this.amazonS3Service = amazonS3Service;
  }

  @Override
  public BusinessCategory getById(Long id) {
    return businessCategoryRepository.findById(id).orElse(null);
  }

  @Override
  public List<BusinessCategory> getAll() {
    return businessCategoryRepository.findAll();
  }

  @Override
  public BusinessCategory create(BusinessCategory businessCategory) {
    return businessCategoryRepository.save(businessCategory);
  }

  @Override
  public BusinessCategory update(Long id, BusinessCategory businessCategory) {
    deleteCategoryImage(businessCategory, id);
    deleteCategoryIcon(businessCategory, id);
    businessCategory.setId(id);
    return businessCategoryRepository.saveAndFlush(businessCategory);
  }

  @Override
  public BusinessCategory delete(Long id) {
    BusinessCategory businessCategory = getById(id);
    deleteCategoryImage(businessCategory);
    deleteCategoryIcon(businessCategory);
    businessCategory
            .getBusinesses()
            .forEach(business -> business.getCategories().remove(businessCategory));
    businessCategory.getBusinesses()
        .forEach(business -> business.getCategories().remove(businessCategory));
    businessCategory.getPlaceCategories()
        .forEach(placeCategory -> {
          placeCategory.setBusinessCategories(
              placeCategory.getBusinessCategories()
                  .stream()
                  .filter(
                      nestedBusinessCategory -> !nestedBusinessCategory.equals(businessCategory))
                  .collect(Collectors.toList()));
        });
    getAll().forEach(category -> {
      if (businessCategory.equals(category.getParentCategory())) {
        category.setParentCategory(null);
      }
    });
    businessCategoryRepository.delete(businessCategory);
    return businessCategory;
  }

  private void deleteCategoryImage(BusinessCategory businessCategory) {
    String imageKey = businessCategory.getImageKey();
    if (imageKey != null) {
      amazonS3Service.deleteObject(imageKey);
    }
  }

  private void deleteCategoryImage(BusinessCategory updatedBusinessCategory, Long id) {
    BusinessCategory currentBusinessCategory = getById(id);
    String currentImageKey = currentBusinessCategory.getImageKey();
    String updatedImageKey = updatedBusinessCategory.getImageKey();
    if (currentImageKey != null && !currentImageKey.equals(updatedImageKey)) {
      amazonS3Service.deleteObject(currentImageKey);
    }
  }

  private void deleteCategoryIcon(BusinessCategory businessCategory) {
    String iconKey = businessCategory.getIconKey();
    if (iconKey != null) {
      amazonS3Service.deleteObject(iconKey);
    }
  }

  private void deleteCategoryIcon(BusinessCategory updatedBusinessCategory, Long id) {
    BusinessCategory currentBusinessCategory = getById(id);
    String currentIconKey = currentBusinessCategory.getIconKey();
    String updatedIconKey = updatedBusinessCategory.getIconKey();
    if (currentIconKey != null && !currentIconKey.equals(updatedIconKey)) {
      amazonS3Service.deleteObject(currentIconKey);
    }
  }

  public List<BusinessCategory> findByParentCategoryIsNull() {
    return businessCategoryRepository.findByParentCategoryIsNull();
  }
}
