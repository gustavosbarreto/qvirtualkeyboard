#ifndef _WEBVIEW_H
#define _WEBVIEW_H

#include <QWebView>

class WebView: public QWebView
{
    Q_OBJECT

public:
    WebView(QWidget *parent, bool popup = false);

public slots:
    void setPosition();
    void toggle();

    QString keyboardLayout();
    QStringList keyboardLayoutFiles();
};

class WebPage: public QWebPage
{
    Q_OBJECT

public:
    WebPage(QObject *parent, bool popup = false);

public slots:
    void adjustSize(int width, int height);

private slots:
    void closeWebView();

protected:
    QWebPage *createWindow(QWebPage::WebWindowType type);
};

#endif
