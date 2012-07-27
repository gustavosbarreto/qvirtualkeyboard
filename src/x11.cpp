#include "x11.h"

#include <QX11Info>
#include <QWidget>
#include <QDebug>

#include <X11/extensions/XTest.h>

X11::X11(QObject *parent): QObject(parent)
{
}

void X11::sendKey(const QString &key)
{
	int keyCode = XKeysymToKeycode(QX11Info::display(), XStringToKeysym(key.toLatin1()));
	XTestFakeKeyEvent(QX11Info::display(), keyCode, true, CurrentTime);
	XTestFakeKeyEvent(QX11Info::display(), keyCode, false, CurrentTime);
}

void X11::sendComposedKey(const QString &baseKey, const QString &altKey)
{
	int baseKeyCode = XKeysymToKeycode(QX11Info::display(), XStringToKeysym(baseKey.toLatin1()));
	int altKeyCode = XKeysymToKeycode(QX11Info::display(), XStringToKeysym(altKey.toLatin1()));

	XTestFakeKeyEvent(QX11Info::display(), altKeyCode, true, CurrentTime);
	XTestFakeKeyEvent(QX11Info::display(), baseKeyCode, true, CurrentTime);
	XTestFakeKeyEvent(QX11Info::display(), baseKeyCode, false, CurrentTime);
	XTestFakeKeyEvent(QX11Info::display(), altKeyCode, false, CurrentTime);
}

void X11::resizeWindow(int width, int height)
{
	qobject_cast<QWidget *>(parent())->setFixedSize(width, height);
}
