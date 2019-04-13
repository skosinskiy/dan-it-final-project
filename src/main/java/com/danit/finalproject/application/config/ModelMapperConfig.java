package com.danit.finalproject.application.config;

import com.danit.finalproject.application.dto.response.business.BusinessCategoryResponse;
import com.danit.finalproject.application.dto.response.event.EventCategoryResponse;
import com.danit.finalproject.application.entity.business.BusinessCategory;
import com.danit.finalproject.application.entity.event.Event;
import com.danit.finalproject.application.entity.event.EventCategory;
import com.danit.finalproject.application.service.AmazonS3Service;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.modelmapper.TypeMap;
import org.modelmapper.spi.DestinationSetter;
import org.modelmapper.spi.SourceGetter;
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
    modelMapper.addMappings(new PropertyMap<BusinessCategory, BusinessCategoryResponse>() {
      @Override
      protected void configure() { }
    });
    modelMapper.addMappings(new PropertyMap<EventCategory, EventCategoryResponse>() {
      @Override
      protected void configure() { }
    });
    addBusinessCategoryMapping();
    addEventCategoryMapping();
  }

  private void addBusinessCategoryMapping() {
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

}
