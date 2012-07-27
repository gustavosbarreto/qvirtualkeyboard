#ifndef _X11_H
#define _X11_H

#include <QObject>

class X11: public QObject
{
	Q_OBJECT

public:
	X11(QObject *parent);

public slots:
	void sendKey(const QString &key);
	void resizeWindow(int width, int height);
};

#endif

