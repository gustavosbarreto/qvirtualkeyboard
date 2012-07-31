#include "x11.h"

#include <QX11Info>
#include <QWidget>
#include <QDebug>

#include <X11/extensions/XTest.h>
#include <X11/keysym.h>

X11::X11(QObject *parent): QObject(parent)
{
}

void X11::sendKey(const QString &key, bool shift)
{
	int keyCode = XKeysymToKeycode(QX11Info::display(), XStringToKeysym(key.toLatin1()));
    if (shift) XTestFakeKeyEvent(QX11Info::display(), XKeysymToKeycode(QX11Info::display(), XK_Shift_L), true, CurrentTime);
	XTestFakeKeyEvent(QX11Info::display(), keyCode, true, CurrentTime);
	XTestFakeKeyEvent(QX11Info::display(), keyCode, false, CurrentTime);
	if (shift) XTestFakeKeyEvent(QX11Info::display(), XKeysymToKeycode(QX11Info::display(), XK_Shift_L), false, CurrentTime);
}

void X11::sendComposedKey(const QString &baseKey, const QString &altKey, bool shift)
{
	int baseKeyCode = XKeysymToKeycode(QX11Info::display(), XStringToKeysym(baseKey.toLatin1()));
	int altKeyCode = XKeysymToKeycode(QX11Info::display(), XStringToKeysym(altKey.toLatin1()));

    if (shift) XTestFakeKeyEvent(QX11Info::display(), XKeysymToKeycode(QX11Info::display(), XK_Shift_L), true, CurrentTime);
	XTestFakeKeyEvent(QX11Info::display(), altKeyCode, true, CurrentTime);
	XTestFakeKeyEvent(QX11Info::display(), altKeyCode, false, CurrentTime);
    if (shift) XTestFakeKeyEvent(QX11Info::display(), XKeysymToKeycode(QX11Info::display(), XK_Shift_L), false, CurrentTime);
	XTestFakeKeyEvent(QX11Info::display(), baseKeyCode, true, CurrentTime);
	XTestFakeKeyEvent(QX11Info::display(), baseKeyCode, false, CurrentTime);
}

void X11::resizeWindow(int width, int height)
{
	qobject_cast<QWidget *>(parent())->setFixedSize(width, height);
}
