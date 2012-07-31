#ifndef _X11_H
#define _X11_H

#include <QObject>

class X11: public QObject
{
	Q_OBJECT

public:
	X11(QObject *parent);

public slots:
	void sendKey(const QString &key, bool shift = false);
	void sendComposedKey(const QString &baseKey, const QString &altKey, bool shift = false);
	void resizeWindow(int width, int height);
    bool isCapsLocked();
};

#endif

