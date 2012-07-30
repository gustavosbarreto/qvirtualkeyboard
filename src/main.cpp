#include <QApplication>
#include <QDesktopWidget>
#include <QDebug>

#include "webview.h"

int main(int argc, char *argv[]) {
	QApplication app(argc, argv);

	WebView *view = new WebView(NULL);
	view->show();

	return app.exec();
}

