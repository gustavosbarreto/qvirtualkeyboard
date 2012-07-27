#include "webview.h"
#include "x11.h"

#include <QWebFrame>
#include <QHBoxLayout>
#include <QDebug>
#include <QSizePolicy>

WebView::WebView(QWidget *parent, bool popup): QWebView(parent)
{
	//setWindowFlags(Qt::X11BypassWindowManagerHint);
	setAttribute(Qt::WA_X11DoNotAcceptFocus);
	setFocusPolicy(Qt::NoFocus);

	if (!popup) {
		setPage(new WebPage(this));

		settings()->setAttribute(QWebSettings::JavascriptEnabled, true);
		settings()->setAttribute(QWebSettings::JavascriptCanOpenWindows, true);

		load(QUrl("qrc:///html/index.html"));
		page()->mainFrame()->addToJavaScriptWindowObject("x11", new X11(this));
	}
}

WebPage::WebPage(QObject *parent, bool popup): QWebPage(parent)
{
	if (popup)
	{
		WebView *webView = new WebView(NULL, true);
		webView->setAttribute(Qt::WA_DeleteOnClose);
		webView->setPage(this);

		connect(webView->page(), SIGNAL(windowCloseRequested()), SLOT(closeWebView()));

		webView->show();
	}
}

void WebPage::adjustSize(int height, int width)
{
	view()->setFixedSize(height, width);
}

void WebPage::closeWebView() {
	qobject_cast<QWebView *>(view())->close();
}


QWebPage *WebPage::createWindow(QWebPage::WebWindowType type)
{
	WebPage *page = new WebPage(NULL, true);
	page->mainFrame()->addToJavaScriptWindowObject("webView", page);
	return page;
}
