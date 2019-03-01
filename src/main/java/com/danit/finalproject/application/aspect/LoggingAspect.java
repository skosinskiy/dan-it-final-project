package com.danit.finalproject.application.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Aspect
@Component
public class LoggingAspect {
  
  private static final Logger LOG = LoggerFactory.getLogger(LoggingAspect.class);

  @Around("com.danit.finalproject.application.aspect.PointcutExpressionsHolder.forApplication()")
  public Object beforeMethodExecution(ProceedingJoinPoint proceedingJoinPoint) {
    String methodName = proceedingJoinPoint.getSignature().toShortString();
    Object[] args = proceedingJoinPoint.getArgs();
    String argsString = Arrays.stream(args)
        .map(arg -> String.format("%s: {%s}", arg.getClass(), arg.toString()))
        .reduce((arg1, arg2) -> String.format("%s; %s", arg1, arg2))
        .orElse("");
    LOG.info(String.format("%s method execution started with arguments [%s]", methodName, argsString));
    Object result = null;
    try {
      result = proceedingJoinPoint.proceed(args);
      LOG.info(String.format("%s method execution finished returning [%s: {%s}]",
              methodName, result.getClass(), result.toString()));
    } catch (Throwable throwable) {
      LOG.error(String.format("Error proceeding %s method: %s", methodName, throwable.getMessage()));
    }
    return result;
  }

}
