#include <QApplication>
#include <QDesktopWidget>
#include <QDBusConnection>
#include <QDebug>

#include "webview.h"
#include "tecladura_adaptor.h"

int main(int argc, char *argv[]) {
    QApplication app(argc, argv);

    WebView *view = new WebView(NULL);
    view->show();

    new TecladuraAdaptor(view);

    QDBusConnection conn = QDBusConnection::sessionBus();
    conn.registerService("ossystems.tecladura");
    conn.registerObject("/", view);

    return app.exec();
}
