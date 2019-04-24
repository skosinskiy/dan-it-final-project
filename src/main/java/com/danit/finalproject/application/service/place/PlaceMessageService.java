package com.danit.finalproject.application.service.place;

import com.danit.finalproject.application.entity.place.PlaceMessage;
import com.danit.finalproject.application.repository.place.PlaceMessageRepository;
import com.danit.finalproject.application.service.CrudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlaceMessageService implements CrudService<PlaceMessage> {
  private PlaceMessageRepository placeMessageRepository;

  @Autowired
  public PlaceMessageService(PlaceMessageRepository placeMessageRepository) {
    this.placeMessageRepository = placeMessageRepository;
  }

  public PlaceMessage getByPlaceId(Long placeId) {
    return placeMessageRepository.findByPlaceId(placeId);
  }

  @Override
  public PlaceMessage getById(Long id) {
    return null;
  }

  @Override
  public List<PlaceMessage> getAll() {
    return null;
  }

  @Override
  public PlaceMessage create(PlaceMessage entity) {
    return null;
  }

  @Override
  public PlaceMessage update(Long id, PlaceMessage entity) {
    return null;
  }

  @Override
  public PlaceMessage delete(Long id) {
    return null;
  }
}
