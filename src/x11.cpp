#include "x11.h"

#include <QDebug>

X11::X11(QObject *parent): QObject(parent)
{
}

void X11::sendKey(const QString &key)
{
	qDebug() << key;
}
