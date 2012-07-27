#include <QApplication>

#include "webview.h"

int main(int argc, char *argv[]) {
	QApplication app(argc, argv);

	WebView *view = new WebView(NULL);
	view->show();
	view->move(500, 500);

	return app.exec();
}

