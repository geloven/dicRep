#! /usr/bin/python
#coding:utf-8
import sys
import os
import time

class clientInfo:

    def __init__(self, proc_id, ip_address, city, region, country, latitude,longitude,time_zone):
        self.__m_proc_id = proc_id
        self.__m_ip_address = ip_address
        self.__m_city = city
        self.__m_region = region
        self.__m_country = country
        self.__m_latitude = latitude
        self.__m_longitude = longitude
        self.__m_timezone = time_zone

    def get_proc_id(self):
        return self.__m_proc_id

    def set_proc_id(self, proc_id):
        self.__m_proc_id = proc_id

    def get_ipaddress(self):
        return self.__m_ip_address

    def set_ipaddress(self, ip_address):
        self.__m_ip_address = ip_address

    def get_city(self):
        return self.__m_city

    def set_city(self, city):
        self.__m_city = city

    def get_region(self):
        return self.__m_region

    def set_region(self, region):
        self.__m_region = region

    def get_country(self):
        return self.__m_country

    def set_country(self, country):
        self.__m_country = country

    def get_latitude(self):
        return self.__m_latitude

    def set_latitude(self, latitude):
        self.__m_latitude = latitude

    def get_timezone(self):
        return self.__m_timezone

    def set_timezone(self, time_zone):
        self.__m_timezone = time_zone

    def get_longitude(self):
        return self.__m_longitude

    def set_longitude(self, longitude):
        self.__m_longitude = longitude