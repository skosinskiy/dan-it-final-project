package com.danit.finalproject.application.service.business;

import com.danit.finalproject.application.entity.business.BusinessCategory;
import com.danit.finalproject.application.repository.business.BusinessCategoryRepository;
import com.danit.finalproject.application.service.AmazonS3Service;
import com.danit.finalproject.application.service.CrudService;

import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

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
    businessCategory.setId(id);
    return businessCategoryRepository.saveAndFlush(businessCategory);
  }

  @Transactional
  public BusinessCategory update(Long id, BusinessCategory businessCategory, MultipartFile imageFile) throws IOException {
    String currentImageKey = businessCategory.getImageKey();
    amazonS3Service.deleteObject(currentImageKey);
    if (imageFile == null) {
      businessCategory.setImageUrl(null);
      businessCategory.setImageKey(null);
      return update(id, businessCategory);
    }
    String imageKey = amazonS3Service.generateS3FileKey();
    String imageUrl = amazonS3Service.getUrlFromFileKey(imageKey);
    businessCategory.setImageKey(imageKey);
    businessCategory.setImageUrl(imageUrl);
    BusinessCategory updatedBusinessCategory = update(id, businessCategory);
    amazonS3Service.putImage(imageFile, imageKey);
    return updatedBusinessCategory;
  }

  @Override
  public BusinessCategory delete(Long id) {
    BusinessCategory businessCategory = getById(id);
    businessCategory
            .getBusinesses()
            .forEach(business -> business.getCategories().remove(businessCategory));
    getAll().forEach(category -> {
      if (category.getParentCategory() == businessCategory) {
        category.setParentCategory(null);
      }
    });
    businessCategoryRepository.delete(businessCategory);
    return businessCategory;
  }

  @Transactional
  public BusinessCategory createAndPutS3Image(
      MultipartFile imageFile,
      BusinessCategory businessCategory) throws IOException {
    String imageKey = amazonS3Service.generateS3FileKey();
    String imageUrl = amazonS3Service.getUrlFromFileKey(imageKey);
    businessCategory.setImageKey(imageKey);
    businessCategory.setImageUrl(imageUrl);
    BusinessCategory createdBusinessCategory = create(businessCategory);
    amazonS3Service.putImage(imageFile, imageKey);
    return createdBusinessCategory;
  }
}
