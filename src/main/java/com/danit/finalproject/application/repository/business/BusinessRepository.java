package com.danit.finalproject.application.repository.business;

import com.danit.finalproject.application.entity.business.Business;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BusinessRepository extends JpaRepository<Business, Long> {

}
