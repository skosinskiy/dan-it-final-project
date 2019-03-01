package com.danit.finalproject.application.aspect;

import org.aspectj.lang.annotation.Pointcut;

public class PointcutExpressionsHolder {

  @Pointcut("execution(* com.danit.finalproject.application..*(..))")
  public void forApplication() {}

}
