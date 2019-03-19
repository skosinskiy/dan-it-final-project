package com.danit.finalproject.application.repository.business;

import com.danit.finalproject.application.entity.business.BusinessCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BusinessCategoryRepository extends JpaRepository<BusinessCategory, Long> {
}
