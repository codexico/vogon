<?php
class Util{
  static function is_email ($email) {
    $regexp = "/^[^0-9][A-z0-9_]+([.][A-z0-9_]+)*[@][A-z0-9_]+([.][A-z0-9_]+)*[.][A-z]{2,4}$/";
    if (!preg_match($regexp, $email))
        return false;
    
    return true;
  }

}
