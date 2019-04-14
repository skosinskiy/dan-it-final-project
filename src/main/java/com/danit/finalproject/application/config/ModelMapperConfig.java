package com.danit.finalproject.application.config;

import com.danit.finalproject.application.dto.response.business.BusinessCategoryResponse;
import com.danit.finalproject.application.dto.response.business.BusinessPhotoResponse;
import com.danit.finalproject.application.dto.response.event.EventCategoryResponse;
import com.danit.finalproject.application.dto.response.place.PlacePhotoResponse;
import com.danit.finalproject.application.entity.business.BusinessCategory;
import com.danit.finalproject.application.entity.business.BusinessPhoto;
import com.danit.finalproject.application.entity.event.EventCategory;
import com.danit.finalproject.application.entity.place.PlacePhoto;
import com.danit.finalproject.application.service.AmazonS3Service;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ModelMapperConfig {

  private ModelMapper modelMapper;
  private AmazonS3Service amazonS3Service;

  @Autowired
  public ModelMapperConfig(ModelMapper modelMapper, AmazonS3Service amazonS3Service) {
    this.modelMapper = modelMapper;
    this.amazonS3Service = amazonS3Service;
  }

  public void initializeModelMapper() {
    addBusinessCategoryMapping();
    addEventCategoryMapping();
    addBusinessPhotoMapping();
    addPlacePhotoMapping();
  }

  private void addBusinessCategoryMapping() {
    modelMapper.addMappings(new PropertyMap<BusinessCategory, BusinessCategoryResponse>() {
      @Override
      protected void configure() { }
    });
    modelMapper.getTypeMap(BusinessCategory.class, BusinessCategoryResponse.class)
        .setPostConverter(context -> {
          BusinessCategoryResponse destination = context.getDestination();
          BusinessCategory source = context.getSource();
          String imageKey = source.getImageKey();
          if (imageKey != null) {
            destination.setImageUrl(amazonS3Service.getUrlFromFileKey(imageKey));
          }
          return destination;
        });
  }

  private void addEventCategoryMapping() {
    modelMapper.addMappings(new PropertyMap<EventCategory, EventCategoryResponse>() {
      @Override
      protected void configure() { }
    });
    modelMapper.getTypeMap(EventCategory.class, EventCategoryResponse.class)
        .setPostConverter(context -> {
          EventCategoryResponse destination = context.getDestination();
          EventCategory source = context.getSource();
          String imageKey = source.getImageKey();
          if (imageKey != null) {
            destination.setImageUrl(amazonS3Service.getUrlFromFileKey(imageKey));
          }
          return destination;
        });
  }

  private void addBusinessPhotoMapping() {
    modelMapper.addMappings(new PropertyMap<BusinessPhoto, BusinessPhotoResponse>() {
      @Override
      protected void configure() { }
    });
    modelMapper.getTypeMap(BusinessPhoto.class, BusinessPhotoResponse.class)
        .setPostConverter(context -> {
          BusinessPhotoResponse destination = context.getDestination();
          BusinessPhoto source = context.getSource();
          String imageKey = source.getImageKey();
          if (imageKey != null) {
            destination.setImageUrl(amazonS3Service.getUrlFromFileKey(imageKey));
          }
          return destination;
        });
  }

  private void addPlacePhotoMapping() {
    modelMapper.addMappings(new PropertyMap<PlacePhoto, PlacePhotoResponse>() {
      @Override
      protected void configure() { }
    });
    modelMapper.getTypeMap(PlacePhoto.class, PlacePhotoResponse.class)
        .setPostConverter(context -> {
          PlacePhotoResponse destination = context.getDestination();
          PlacePhoto source = context.getSource();
          String imageKey = source.getImageKey();
          if (imageKey != null) {
            destination.setImageUrl(amazonS3Service.getUrlFromFileKey(imageKey));
          }
          return destination;
        });
  }

}
