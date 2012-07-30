#include <QApplication>
#include <QDesktopWidget>
#include <QDebug>

#include "webview.h"

int main(int argc, char *argv[]) {
	QApplication app(argc, argv);

	WebView *view = new WebView(NULL);

	QDesktopWidget *desktop = QApplication::desktop();
	QRect rect = desktop->screenGeometry();

	view->show();
	view->setFixedSize((rect.width() / 100) * 50, (rect.height() / 100) * 35); 
	view->move((rect.width() - view->width()) / 2, rect.height() - view->height());

	return app.exec();
}

