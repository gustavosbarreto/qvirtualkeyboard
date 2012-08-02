QT += webkit dbus
CONFIG += link_pkgconfig

PKGCONFIG += xtst

DBUS_ADAPTORS = ossystems.tecladura.xml

SOURCES = main.cpp x11.cpp webview.cpp
HEADERS = x11.h webview.h

RESOURCES = ../resources.qrc

TARGET = tecladura
