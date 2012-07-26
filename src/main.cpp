#include <QApplication>

#include "webview.h"

int main(int argc, char *argv[]) {
	QApplication app(argc, argv);

	(new WebView)->show();

	return app.exec();
}

