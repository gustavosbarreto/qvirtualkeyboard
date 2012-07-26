#include "webview.h"

WebView::WebView(): QWebView()
{
	setAttribute(Qt::WA_X11DoNotAcceptFocus);
	setFocusPolicy(Qt::NoFocus);
	load(QUrl("qrc:///html/index.html"));
}

