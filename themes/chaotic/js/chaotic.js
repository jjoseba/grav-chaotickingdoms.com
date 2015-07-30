/*! Cookies.js - 0.4.0; Copyright (c) 2014, Scott Hamper; http://www.opensource.org/licenses/MIT */
(function(e) {
    "use strict";
    var b = function(a, d, c) {
        return 1 === arguments.length ? b.get(a) : b.set(a, d, c)
    };
    b._document = document;
    b._navigator = navigator;
    b.defaults = {
        path: "/"
    };
    b.get = function(a) {
        b._cachedDocumentCookie !== b._document.cookie && b._renewCache();
        return b._cache[a]
    };
    b.set = function(a, d, c) {
        c = b._getExtendedOptions(c);
        c.expires = b._getExpiresDate(d === e ? -1 : c.expires);
        b._document.cookie = b._generateCookieString(a, d, c);
        return b
    };
    b.expire = function(a, d) {
        return b.set(a, e, d)
    };
    b._getExtendedOptions = function(a) {
        return {
            path: a && a.path || b.defaults.path,
            domain: a && a.domain || b.defaults.domain,
            expires: a && a.expires || b.defaults.expires,
            secure: a && a.secure !== e ? a.secure : b.defaults.secure
        }
    };
    b._isValidDate = function(a) {
        return "[object Date]" === Object.prototype.toString.call(a) && !isNaN(a.getTime())
    };
    b._getExpiresDate = function(a, d) {
        d = d || new Date;
        switch (typeof a) {
            case "number":
                a = new Date(d.getTime() + 1E3 * a);
                break;
            case "string":
                a = new Date(a)
        }
        if (a && !b._isValidDate(a)) throw Error("`expires` parameter cannot be converted to a valid Date instance");
        return a
    };
    b._generateCookieString = function(a, b, c) {
        a = a.replace(/[^#$&+\^`|]/g, encodeURIComponent);
        a = a.replace(/\(/g, "%28").replace(/\)/g, "%29");
        b = (b + "").replace(/[^!#$&-+\--:<-\[\]-~]/g, encodeURIComponent);
        c = c || {};
        a = a + "=" + b + (c.path ? ";path=" + c.path : "");
        a += c.domain ? ";domain=" + c.domain : "";
        a += c.expires ? ";expires=" + c.expires.toUTCString() : "";
        return a += c.secure ? ";secure" : ""
    };
    b._getCookieObjectFromString = function(a) {
        var d = {};
        a = a ? a.split("; ") : [];
        for (var c = 0; c < a.length; c++) {
            var f = b._getKeyValuePairFromCookieString(a[c]);
            d[f.key] === e && (d[f.key] = f.value)
        }
        return d
    };
    b._getKeyValuePairFromCookieString = function(a) {
        var b = a.indexOf("="),
            b = 0 > b ? a.length : b;
        return {
            key: decodeURIComponent(a.substr(0, b)),
            value: decodeURIComponent(a.substr(b + 1))
        }
    };
    b._renewCache = function() {
        b._cache = b._getCookieObjectFromString(b._document.cookie);
        b._cachedDocumentCookie = b._document.cookie
    };
    b._areEnabled = function() {
        var a = "1" === b.set("cookies.js", 1).get("cookies.js");
        b.expire("cookies.js");
        return a
    };
    b.enabled = b._areEnabled();
    "function" === typeof define && define.amd ? define(function() {
        return b
    }) : "undefined" !== typeof exports ? ("undefined" !== typeof module && module.exports && (exports = module.exports = b), exports.Cookies = b) : window.Cookies = b
})();

//Cookie script
var initialScroll = $(this).scrollTop();
if (Cookies.get('chaotic_cooky')) {
    loadAnalytics();
} else {
    $('#cookiesdirective').slideDown();
    $(this).on('scroll', cookieScroll);
    $(document).one('click', setCookie);
    $('#consentCookyBtn').one('click', setCookie);
}

function cookieScroll() {
    var scroll = $(this).scrollTop();
    if (Math.abs(initialScroll - scroll) >= 400 && !(Cookies.get('chaotic_cooky'))) { 
        setCookie(); 
        $(this).off('scroll', cookieScroll);
    }
}

function setCookie() {
    Cookies.set('chaotic_cooky', 'true');
    loadAnalytics();
    $('#cookiesdirective').slideUp();
    $(document).off('scroll', cookieScroll);
}

function loadAnalytics() {

 (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-55959185-1', 'auto');
  ga('send', 'pageview');

}

var formUrl = 'http://getsimpleform.com/messages/ajax?form_api_token=a690a97203e1625d5e37010e96103e21';
$('[data-toggle="tooltip"]').tooltip();
$(function() {
    $('a.page-scroll').bind('click', function(e) {
        var $anchor = $(this);
        $('html, body').stop().animate({ scrollTop: $($anchor.attr('href')).offset().top }, 700);
        e.preventDefault();
    });

    var $navigation = $('#navigation');
    $(document).click(function (event) {
        var clickover = $(event.target);
        var _opened = $navigation.find(".navbar-collapse").hasClass("in");
        if (_opened === true && !clickover.hasClass("navbar-toggle")) {
            $navigation.find("button.navbar-toggle").click();
        }
    });

  $('form.contact_form').on('submit', function(e){
  e.preventDefault();
    var submitBtn = $(this).find('.submit-button');
    var formData = $(this).serialize();    
    submitBtn.addClass('sending');
    $.ajax({
      dataType: 'jsonp',
      url: formUrl,
      data: formData
    }).done(function() {
      setTimeout(function(){
          submitBtn.removeClass('sending').addClass('success');
        }, 600);
    });
  });

});