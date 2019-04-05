package com.danit.finalproject.application.facade.business;

import com.danit.finalproject.application.dto.request.business.BusinessCategoryRequest;
import com.danit.finalproject.application.dto.response.business.BusinessCategoryResponse;
import com.danit.finalproject.application.entity.business.BusinessCategory;
import com.danit.finalproject.application.facade.AbstractDtoFacade;
import com.danit.finalproject.application.service.business.BusinessCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class BusinessCategoryFacade extends
    AbstractDtoFacade<BusinessCategory, BusinessCategoryRequest, BusinessCategoryResponse> {

}
