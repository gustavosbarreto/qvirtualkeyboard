#include "webview.h"

WebView::WebView(): QWebView()
{
	load(QUrl("qrc:///html/index.html"));
}

