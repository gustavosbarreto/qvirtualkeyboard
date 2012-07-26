QT += webkit
CONFIG += link_pkgconfig

PKGCONFIG += xtst

SOURCES = main.cpp x11.cpp webview.cpp
HEADERS = x11.h webview.h

RESOURCES = ../resources.qrc

TARGET = tecladura
