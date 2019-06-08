package com.danit.finalproject.application.config;

import com.danit.finalproject.application.dto.response.business.BusinessCategoryResponse;
import com.danit.finalproject.application.dto.response.business.BusinessPhotoResponse;
import com.danit.finalproject.application.dto.response.event.EventCategoryResponse;
import com.danit.finalproject.application.dto.response.event.EventPhotoResponse;
import com.danit.finalproject.application.dto.response.place.PlaceCategoryResponse;
import com.danit.finalproject.application.dto.response.place.PlacePhotoResponse;
import com.danit.finalproject.application.entity.business.BusinessCategory;
import com.danit.finalproject.application.entity.business.BusinessPhoto;
import com.danit.finalproject.application.entity.event.EventCategory;
import com.danit.finalproject.application.entity.event.EventPhoto;
import com.danit.finalproject.application.entity.place.PlaceCategory;
import com.danit.finalproject.application.entity.place.PlacePhoto;
import com.danit.finalproject.application.service.AmazonS3Service;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

@Component
public class ModelMapperConfig {

  private ModelMapper modelMapper;
  private AmazonS3Service amazonS3Service;

  @Autowired
  public ModelMapperConfig(@Lazy ModelMapper modelMapper, @Lazy AmazonS3Service amazonS3Service) {
    this.modelMapper = modelMapper;
    this.amazonS3Service = amazonS3Service;
  }

  public void initializeModelMapper() {
    addBusinessCategoryMapping();
    addEventCategoryMapping();
    addPlaceCategoryMapping();
    addBusinessPhotoMapping();
    addPlacePhotoMapping();
    addEventPhotoMapping();
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
          String iconKey = source.getIconKey();
          if (imageKey != null) {
            destination.setImageUrl(amazonS3Service.getUrlFromFileKey(imageKey));
          }
          if (iconKey != null) {
            destination.setIconUrl(amazonS3Service.getUrlFromFileKey(iconKey));
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

  private void addPlaceCategoryMapping() {
    modelMapper.addMappings(new PropertyMap<PlaceCategory, PlaceCategoryResponse>() {
      @Override
      protected void configure() { }
    });
    modelMapper.getTypeMap(PlaceCategory.class, PlaceCategoryResponse.class)
        .setPostConverter(context -> {
          PlaceCategoryResponse destination = context.getDestination();
          PlaceCategory source = context.getSource();
          String iconKey = source.getIconKey();
          if (iconKey != null) {
            destination.setIconUrl(amazonS3Service.getUrlFromFileKey(iconKey));
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

  private void addEventPhotoMapping() {
    modelMapper.addMappings(new PropertyMap<EventPhoto, EventPhotoResponse>() {
      @Override
      protected void configure() { }
    });
    modelMapper.getTypeMap(EventPhoto.class, EventPhotoResponse.class)
        .setPostConverter(context -> {
          EventPhotoResponse destination = context.getDestination();
          EventPhoto source = context.getSource();
          String imageKey = source.getImageKey();
          if (imageKey != null) {
            destination.setImageUrl(amazonS3Service.getUrlFromFileKey(imageKey));
          }
          return destination;
        });
  }

}
