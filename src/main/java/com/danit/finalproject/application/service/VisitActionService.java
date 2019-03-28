package com.danit.finalproject.application.service;

import com.danit.finalproject.application.entity.VisitAction;
import com.danit.finalproject.application.repository.VisitActionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VisitActionService implements CrudService<VisitAction>{
  private VisitActionRepository visitActionRepository;

  @Autowired
  public VisitActionService(VisitActionRepository visitActionRepository) {
    this.visitActionRepository = visitActionRepository;
  }

  public VisitAction createNewVisit(VisitAction visitAction) {
    return visitActionRepository.save(visitAction);
  }

  @Override
  public VisitAction getById(Long id) {
    return null;
  }

  @Override
  public List<VisitAction> getAll() {
    return null;
  }

  @Override
  public VisitAction create(VisitAction entity) {
    return null;
  }

  @Override
  public VisitAction update(Long id, VisitAction entity) {
    return null;
  }

  @Override
  public VisitAction delete(Long id) {
    return null;
  }
}
