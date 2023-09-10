
import { Injectable, VERSION } from "@angular/core";
import { DatePipe, formatDate } from '@angular/common';
import { getLocaleCode } from "./getLocaleCode";

 const locale = getLocaleCode();
 let date = new Date();
 let time = '';
 let pipe = new DatePipe('en-US');


export function getSystemDate(format: string = "dd/MM/YYYY hh:mm"){
  format = format ? format : "dd/MM/YYYY hh:mm";
  const cDate = formatDate(date, format, 'en-US');
  return cDate;
}

export function getSystemDateTime(format: string = "dd/MM/YYYY hh:mm"){
  format = format ? format : "dd/MM/YYYY hh:mm:ss";
  const cDate = formatDate(date, format, 'en-US');
  return cDate;
}

export function getSystemTime(){
  const cDate = formatDate(date.getTime(), "hh:mm:ss", locale[0].localeCode );
  return cDate;
}

export function formatDateWithPipe(mydate: string){
  const cDate = pipe.transform(mydate, "dd/MM/yyyy", locale[0].localeCode );
  return cDate;
}

export function getSystemPipeDateTime(){
  const cDate = pipe.transform(date, "dd/MM/yyyy hh:mm:ss", locale[0].localeCode );
  return cDate;
}

export function getSystemPipeTime(){
  const cDate = pipe.transform(date, "hh:mm:ss", locale[0].localeCode );
  return cDate;
}
