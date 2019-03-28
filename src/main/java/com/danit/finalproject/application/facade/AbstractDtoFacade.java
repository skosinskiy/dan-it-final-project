package com.danit.finalproject.application.facade;

import com.danit.finalproject.application.entity.BaseEntity;
import com.danit.finalproject.application.service.CrudService;
import java.lang.reflect.ParameterizedType;
import java.util.List;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Component
@Transactional
@SuppressWarnings("unchecked")
public abstract class AbstractDtoFacade<E extends BaseEntity, I, O> {

  @Autowired
  protected ModelMapper modelMapper;
  @Autowired
  @SuppressWarnings("ALL")
  protected CrudService<E> crudService;

  public O getById(Long id) {
    return mapEntityToResponseDto(crudService.getById(id));
  }

  public List<O> getAll() {
    List<E> entities = crudService.getAll();
    return mapEntityListToResponseDtoList(entities);
  }

  public O create(I requestDto) {
    E entity = mapRequestDtoToEntity(requestDto);
    E createdEntity = crudService.create(entity);
    return mapEntityToResponseDto(createdEntity);
  }

  public O update(Long id, I requestDto) {
    E entity = mapRequestDtoToEntity(requestDto);
    E updatedEntity = crudService.update(id, entity);
    return mapEntityToResponseDto(updatedEntity);
  }

  public O delete(Long id) {
    E entity = crudService.delete(id);
    return mapEntityToResponseDto(entity);
  }

  protected O mapEntityToResponseDto(E entity) {
    if (entity != null) {
      return modelMapper.map(entity, (Class<O>) ((ParameterizedType) getClass()
          .getGenericSuperclass()).getActualTypeArguments()[2]);
    }
    return null;
  }

  protected E mapRequestDtoToEntity(I dto) {
    if (dto != null) {
      return modelMapper.map(dto, (Class<E>) ((ParameterizedType) getClass()
          .getGenericSuperclass()).getActualTypeArguments()[0]);
    }
    return null;
  }

  protected List<O> mapEntityListToResponseDtoList(List<E> entityList) {
    if (entityList != null) {
      return modelMapper.map(entityList, new TypeToken<List<O>>(){}.getType());
    }
    return new ArrayList<>();
  }

  protected Page<O> mapEntityListToResponseDtoList(Page<E> entityList) {
    if (entityList != null) {
      return modelMapper.map(entityList, new TypeToken<Page<O>>(){}.getType());
    }
    return null;
  }
}