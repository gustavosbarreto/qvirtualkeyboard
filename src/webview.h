#ifndef _WEBVIEW_H
#define _WEBVIEW_H

#include <QWebView>

class WebView: public QWebView
{
	Q_OBJECT

public:
	WebView(QWidget *parent = 0);
};

class WebPage: public QWebPage
{
	Q_OBJECT

public:
	WebPage(QObject *parent, bool popup = false);

private slots:
	void closeWebView();

protected:
	QWebPage *createWindow(QWebPage::WebWindowType type);
};

#endif
