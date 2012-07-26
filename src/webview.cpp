#include "webview.h"
#include "x11.h"

#include <QWebFrame>

WebView::WebView(): QWebView()
{
	setAttribute(Qt::WA_X11DoNotAcceptFocus);
	setFocusPolicy(Qt::NoFocus);
	load(QUrl("qrc:///html/index.html"));
	page()->mainFrame()->addToJavaScriptWindowObject("x11", new X11(this));
}

