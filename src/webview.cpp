#include "webview.h"
#include "x11.h"

#include <QWebFrame>
#include <QHBoxLayout>
#include <QDebug>
#include <QSizePolicy>
#include <QApplication>
#include <QDesktopWidget>
#include <QDir>
#include <QSettings>

WebView::WebView(QWidget *parent, bool popup): QWebView(parent)
{
    setWindowFlags(Qt::X11BypassWindowManagerHint);

    setAttribute(Qt::WA_X11DoNotAcceptFocus);
    setAttribute(Qt::WA_TranslucentBackground, true);

    if (!popup) {
        setPage(new WebPage(this));

        settings()->setAttribute(QWebSettings::JavascriptEnabled, true);
        settings()->setAttribute(QWebSettings::JavascriptCanOpenWindows, true);

        load(QUrl("qrc:///html/index.html"));
        page()->mainFrame()->addToJavaScriptWindowObject("webView", this);
        page()->mainFrame()->addToJavaScriptWindowObject("x11", new X11(this));
    }

    QPalette newPalette = palette();
    newPalette.setBrush(QPalette::Base, Qt::transparent);
    page()->setPalette(newPalette);

    setAttribute(Qt::WA_OpaquePaintEvent, false);
}

void WebView::setPosition()
{
    QRect rect =  QApplication::desktop()->availableGeometry();
    move((rect.width() - width()) / 2, rect.height() - height());
}

void WebView::toggle()
{
    if (isVisible())
        hide();
    else
        show();
}

QString WebView::keyboardLayout()
{
    QSettings userSettings(QSettings::UserScope, "tecladura", "tecladura");
    QSettings systemSettings(QSettings::UserScope, "tecladura", "tecladura");

    return (userSettings.childKeys().contains("layout") ? userSettings.value("layout").toString() : systemSettings.value("layout").toString());
}

QStringList WebView::keyboardLayoutFiles()
{
    QStringList files = QDir(QApplication::applicationDirPath() + "/../share/tecladura/layouts/").entryList(QStringList() << "*.js");
    foreach (const QString &fileName, files)
        files.append("file://" + QApplication::applicationDirPath() + "/../share/tecladura/layouts/" + fileName);

    return files.mid(files.size()/2, files.size()/2);
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

void WebPage::adjustSize(int width, int height)
{
    QRect rect = QRect(QCursor::pos(), QSize(width, height));
    rect.translate(QPoint(0, -height));

    view()->move(QPoint(rect.x(), rect.y()));
    view()->setFixedSize(width, height);
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
