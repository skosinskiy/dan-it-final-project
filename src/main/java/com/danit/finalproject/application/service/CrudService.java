package com.danit.finalproject.application.service;

import com.danit.finalproject.application.entity.BaseEntity;
import java.util.List;

public interface CrudService<E extends BaseEntity> {

  E getById(Long id);

  List<E> getAll();

  E create(E entity);

  E update(Long id, E entity);

  E delete(Long id);

}
