package com.danit.finalproject.application.service.place;

import com.danit.finalproject.application.entity.place.PlaceMessage;
import com.danit.finalproject.application.repository.place.PlaceMessageRepository;
import com.danit.finalproject.application.service.CrudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
public class PlaceMessageService implements CrudService<PlaceMessage> {
  private PlaceMessageRepository placeMessageRepository;

  @Autowired
  public PlaceMessageService(PlaceMessageRepository placeMessageRepository) {
    this.placeMessageRepository = placeMessageRepository;
  }

  @Override
  public PlaceMessage getById(Long id) {
    return placeMessageRepository.findById(id).orElse(null);
  }

  @Override
  public List<PlaceMessage> getAll() {
    return placeMessageRepository.findAll() ;
  }

  @Override
  public PlaceMessage create(PlaceMessage entity) {
    entity.setId(null);
    return placeMessageRepository.save(entity);
  }

  @Override
  public PlaceMessage update(Long id, PlaceMessage entity) {
    return null;
  }

  @Override
  public PlaceMessage delete(Long id) {
    return null;
  }

  public List<PlaceMessage> getAllByParam(Long placeId) {
    return placeId == null
        ? getAll()
        : placeMessageRepository.findAllByPlaceId(placeId);
  }
}
