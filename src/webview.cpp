#include "webview.h"
#include "x11.h"

#include <QWebFrame>

WebView::WebView(QWidget *parent): QWebView(parent)
{
	setAttribute(Qt::WA_X11DoNotAcceptFocus);
	setFocusPolicy(Qt::NoFocus);

	setPage(new WebPage(this));

	settings()->setAttribute(QWebSettings::JavascriptEnabled, true);
	settings()->setAttribute(QWebSettings::JavascriptCanOpenWindows, true);

	load(QUrl("qrc:///html/index.html"));
	page()->mainFrame()->addToJavaScriptWindowObject("x11", new X11(this));
}

WebPage::WebPage(QObject *parent, bool popup): QWebPage(parent)
{
	if (popup)
	{
		WebView *webView = new WebView;
		webView->setAttribute(Qt::WA_DeleteOnClose);
		webView->setPage(this);
		webView->show();
		connect(webView->page(), SIGNAL(windowCloseRequested()), SLOT(closeWebView()));
	}
}

void WebPage::closeWebView() {
	qobject_cast<QWebView *>(view())->close();
}

QWebPage *WebPage::createWindow(QWebPage::WebWindowType type)
{
	QWebPage::createWindow(type);
	return new WebPage(this, true);
}
