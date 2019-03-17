package com.danit.finalproject.application.validation;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = PasswordsMatchConstraintValidator.class)
@Target({ElementType.ANNOTATION_TYPE, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface PasswordsMatch {
  String message() default "Passwords don\'t match";
  Class<?>[] groups() default {};
  Class<? extends Payload>[] payload() default {};
}
