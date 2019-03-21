package com.danit.finalproject.application.service;

import com.danit.finalproject.application.dto.request.UpdateUserPasswordRequestDto;
import com.danit.finalproject.application.error.PasswordsDontMatchException;
import com.danit.finalproject.application.error.TokenExpiredException;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.BindingResult;
import org.springframework.validation.SmartValidator;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
@Transactional
public class ValidationServiceTest {

  @Rule
  public ExpectedException exceptionRule = ExpectedException.none();

  @Autowired
  private ValidationService validationService;

  @Autowired
  SmartValidator validator;

  @Test
  public void successfulValidation() {
    UpdateUserPasswordRequestDto userDto = UpdateUserPasswordRequestDto.builder()
        .token("12b0e9eb-ad60-44ec-81d1-a759313856ce")
        .password("12345678")
        .passwordConfirmation("12345678")
        .build();
    BindingResult bindingResult = new BeanPropertyBindingResult(userDto, "userDto");
    validator.validate(userDto, bindingResult);
    validationService.checkForValidationErrors(bindingResult);
  }

  @Test
  public void objectErrorTest() {
    exceptionRule.expect(PasswordsDontMatchException.class);
    exceptionRule.expectMessage("Passwords do not match");
    UpdateUserPasswordRequestDto userDto = UpdateUserPasswordRequestDto.builder()
        .token("12b0e9eb-ad60-44ec-81d1-a759313856ce")
        .password("12345678")
        .passwordConfirmation("12345679")
        .build();
    BindingResult bindingResult = new BeanPropertyBindingResult(userDto, "userDto");
    validator.validate(userDto, bindingResult);
    validationService.checkForValidationErrors(bindingResult);
  }

  @Test
  public void fieldErrorTest() {
    exceptionRule.expect(TokenExpiredException.class);
    exceptionRule.expectMessage("Token is expired");
    UpdateUserPasswordRequestDto userDto = UpdateUserPasswordRequestDto.builder()
        .token("ddcc2361-ce4f-47bc-bf5e-fc39ca73d0e0")
        .password("12345678")
        .passwordConfirmation("12345678")
        .build();
    BindingResult bindingResult = new BeanPropertyBindingResult(userDto, "userDto");
    validator.validate(userDto, bindingResult);
    validationService.checkForValidationErrors(bindingResult);
  }
}