package com.laggercodes.lakesidehotel.exception;

public class UserAlreadyExistsException extends RuntimeException {
    public UserAlreadyExistsException(String s) {
        super(s);
    }
}
