package com.danit.finalproject.application.validation;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = TokenNotExpiredConstraintValidator.class)
@Target({ElementType.FIELD, ElementType.ANNOTATION_TYPE, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface TokenNotExpired {
  String message() default "Token is expired";
  Class<?>[] groups() default {};
  Class<? extends Payload>[] payload() default {};
}
