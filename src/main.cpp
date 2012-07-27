#include <QApplication>

#include "webview.h"

int main(int argc, char *argv[]) {
	QApplication app(argc, argv);

	WebView *view = new WebView(NULL);
	view->show();
	view->move(200, 400);

	return app.exec();
}

