/**
 * common.js 京东收银台通用交互js 全局base融合
 * @author: zuoshilong@jd.com
 * @date: 2014-9-10 14:50:42
 */

/**
 * from http://misc.360buyimg.com/lib/js/2012/base-v1.js
 */
// login & regist
function login() {
    location.href = "https://passport.jd.com/new/login.aspx?ReturnUrl=" + escape(location.href).replace(/\//g,"%2F");
    return false;
}
function regist() {
    location.href = "https://reg.jd.com/reg/person?ReturnUrl=" + escape(location.href);
    return false;
}

// cookie
function createCookie(name, value, days, Tdom) {
    var Tdom = (Tdom) ? Tdom : "/";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString()
    } else {
        var expires = ""
    }
    document.cookie = name + "=" + value + expires + "; path=" + Tdom
}
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1, c.length)
        }
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length, c.length)
        }
    }
    return null
}

// 检查登陆
function checkLogin(){
    // 判断协议
    var protocol = window.location.protocol === 'https:' ? 'https:' : 'http:';
    var helloUrl = protocol + '//passport.jd.com/call/getHelloJson?m=ls';
    jQuery.ajax({url: helloUrl, dataType: 'jsonp', scriptCharset: 'gb2312', success: function (a) {
        if (a && a.info) {
            $('#loginbar').html(a.info);
        }
        if (a && a.sso) {
            $.each(a.sso, function () {
                jQuery.getJSON(this)
            })
        }
    }});
}
checkLogin();

/**
 * from http://misc.360buyimg.com/lib/js/2012/lib-v1.js
 */
// Jtab
(function($) {
    $.fn.Jtab = function(option, callback) {
        if(!this.length)return;
        if (typeof option == "function") {
            callback = option;
            option = {};
        }
        var settings = $.extend({
            type: "static",
            auto: false,
            event: "mouseover",
            currClass: "curr",
            source: "data-tag",
            hookKey:"data-widget",
            hookItemVal: "tab-item",
            hookContentVal: "tab-content",
            stay: 5000,
            delay: 100,
            threshold:null,
            mainTimer: null,
            subTimer: null,
            index: 0,
            compatible:false
        }, option || {});
        var items = $(this).find("*["+settings.hookKey+"="+settings.hookItemVal+"]"),
            contens = $(this).find("*["+settings.hookKey+"="+settings.hookContentVal+"]"),
            isUrl = settings.source.toLowerCase().match(/http:\/\/|\d|\.aspx|\.ascx|\.asp|\.php|\.html\.htm|.shtml|.js/g);

        if (items.length != contens.length) {
            return false;
        }

        var init = function(index, tag) {
            settings.subTimer = setTimeout(function() {
                items.eq(settings.index).removeClass(settings.currClass);
                if(settings.compatible){
                    contens.eq(settings.index).hide();
                }
                if (tag) {
                    settings.index++;
                    //settings.threshold=settings.threshold?settings.threshold:items.length;
                    if (settings.index == items.length) {
                        settings.index = 0;
                    }
                } else {
                    settings.index = index;
                }
                settings.type = (items.eq(settings.index).attr(settings.source) != null) ? "dynamic" : "static";
                rander();
            }, settings.delay);
        };
        var autoRun = function() {
            settings.mainTimer = setInterval(function() {
                init(settings.index, true);
            }, settings.stay);
        };
        var rander = function() {
            items.eq(settings.index).addClass(settings.currClass);
            if(settings.compatible){
                contens.eq(settings.index).show();
            }
            switch (settings.type) {
                default:
                case "static":
                    var source = "";
                    break;
                case "dynamic":
                    var source = (!isUrl) ? items.eq(settings.index).attr(settings.source) : settings.source;
                    items.eq(settings.index).removeAttr(settings.source);
                    break;
            }
            if (callback) {
                callback(source, contens.eq(settings.index), settings.index);
            }
        };
        items.each(function(i) {

            $(this).bind(settings.event, function() {
                clearTimeout(settings.subTimer);
                clearInterval(settings.mainTimer);

                init(i, false);
            }).bind("mouseleave", function() {
                if (settings.auto) {
                    autoRun();
                } else {
                    return;
                }
            });
        });
        if (settings.type == "dynamic") {
            init(settings.index, false);
        }
        if (settings.auto) {
            autoRun();
        }

    };
})(jQuery);

// --- misc base lib end ---

// 动画曲线
jQuery.extend( jQuery.easing, {
    def: 'easeOutQuad',
    
    easeInQuint: function (x, t, b, c, d) {
        return c*(t/=d)*t*t*t*t + b;
    },
    easeOutQuint: function (x, t, b, c, d) {
        return c*((t=t/d-1)*t*t*t*t + 1) + b;
    },
    easeInOutQuint: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
        return c/2*((t-=2)*t*t*t*t + 2) + b;
    },
    easeOutElastic: function (x, t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
    },
    easeInOutElastic: function (x, t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
    },
    easeInCirc: function (x, t, b, c, d) {
        return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
    },
    easeOutCirc: function (x, t, b, c, d) {
        return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
    },
    easeInOutCirc: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
        return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
    }
});

/**
 * [paymentUI 收银台支付 UI 交互]
 */
var paymentUI = {};

// 收银台交互 需自动初始化加载 部分
paymentUI.init = function(){
    this.setPayboxHover();
    this.setPayCheckHover();
    this.setNoticeClose();
    this.setBankMore();
    this.setTips();
    this.setPop();
    this.setPayItmeHover();
    this.setPlaceholder();
    // pop 设置分期pop初始化
    this.setFenqiPop();
    this.setBaozhangPop();
    this.setMagnifying();
    this.preloadImg();
    this.qrCoderImg();

};
/**
 * [setPayboxHover 组合支付项目 hover]
 */
paymentUI.setPayboxHover = function(){
    var $paybox = $('.j_paybox');
    $paybox.live('mouseenter', function(){
        if(!$(this).hasClass('paybox-disable')){
            $(this).addClass('paybox-hover');
        }
    }).live('mouseleave', function(){
        if(!$(this).hasClass('paybox-disable')){
            $(this).removeClass('paybox-hover');
        }
    });
};
/**
 * [setPayItmeHover 银行卡信息 hover]
 */
paymentUI.setPayItmeHover = function(){
    var $payItem = $('.pl-item');
    $payItem.live('mouseenter', function(){
        $(this).addClass('hover');
    }).live('mouseleave', function(){
        $(this).removeClass('hover');
    });
};
/**
 * [setPayCheckHover 支付方式选择 hover]
 */
paymentUI.setPayCheckHover = function(){
    $('.p-k-check').live('mouseenter', function(){
        if(!$(this).hasClass('ui-check-disable')){
            $(this).find('.j_paymentCheck').addClass('ui-checkbox-L-hover');
        }
    }).live('mouseleave', function(){
        if(!$(this).hasClass('ui-check-disable')){
            $(this).find('.j_paymentCheck').removeClass('ui-checkbox-L-hover');
        }
    });
};
/**
 * [setNoticeClose 设置通知关闭]
 */
paymentUI.setNoticeClose = function(){
    $('.j_cnClose').bind('click', function(){
        $(this).parents('.cashier-notice').hide();
    });
};
/**
 * [setUiModal 设置UI 弹框]
 */
paymentUI.showModal = function(target, callback, closeCallback){

    var callback = typeof callback !== 'undefined' ? callback : function(){};
    var closeCallback = typeof closeCallback !== 'undefined' ? closeCallback : function(){};
    var windowScrollTop = $(window).scrollTop();
    var $modalMask = $('<div class="ui-modal-mask"></div>');
    var $modal = $(target);
    var $bodyLayer = $('.shortcut, .p-header, .main, .p-footer');

    $('body').append($modalMask);
    // 增加高斯模糊遮罩
    $bodyLayer.addClass('ui-modal-mask-blur');

    var topFix = $(window).height()/2 - $modal.height()/2;
    topFix = topFix <= 0 ? 0 : topFix;

    $modal.css({
        'top': windowScrollTop + topFix
    }).show();
    // 执行回调
    callback();

    // 绑定关闭事件
    $modal.find('.um-h-close').unbind();
    $modal.find('.um-h-close').bind('click', function(){
        $modal.hide();
        $modalMask.remove();
        // 移除高斯模糊
        $bodyLayer.removeClass('ui-modal-mask-blur');
        closeCallback();
    });
    $modal.find('.j_modalClose').unbind();
    $modal.find('.j_modalClose').bind('click', function(){
        $modal.hide();
        $modalMask.remove();
        // 移除高斯模糊
        $bodyLayer.removeClass('ui-modal-mask-blur');
        closeCallback();
    });
};
/**
 * [hideModal 隐藏UI 弹框]
 */
paymentUI.hideModal = function(target){

    var $modal = $(target);
    var $modalMask = $('.ui-modal-mask');
    var $bodyLayer = $('.shortcut, .p-header, .main, .p-footer');

    $modal.hide();
    $modalMask.remove();
    // 移除高斯模糊
    $bodyLayer.removeClass('ui-modal-mask-blur');

};
/**
 * [setBankMore 设置更多银行显示]
 */
paymentUI.setBankMore = function(){
    $('.j_showBankMore').bind('click', function(){
        $(this).siblings('.hide').show();
        $(this).hide();
        var $unionpay = $(this).parents('.payment-list').find('.bw-more-unionpay');
        if($unionpay.length !== 0){
            $unionpay.show();
        }
    });
};
/**
 * [setAuthCountdown 设置验证码倒计时]
 */
paymentUI.setAuthCountdown = function(target, sec, callback){
    var _this = this;
    var $ele = $(target);
    sec = typeof sec !== 'undefined' ? sec : 60;
    callback = typeof callback !== 'undefined' ? callback : function(){};

    // 倒计时时间
    this.setAuthCountdown.time = sec;
    // 清理计时器
    if(typeof this.setAuthCountdown.timer !== 'undefined'){
        clearInterval(this.setAuthCountdown.timer)
    }
    // 倒计时
    this.setAuthCountdown.timer = setInterval(function(){
        var currSec = _this.setAuthCountdown.time;
        // 渲染时间
        $ele.html(currSec);
        if(currSec <= 0){
            // 倒计时完毕回调
            callback();
            clearInterval(_this.setAuthCountdown.timer);
        }
        _this.setAuthCountdown.time --;
    }, 1000);
};
/**
 * [setOrderCountdown 设置订单倒计时]
 */
/**
 * [setOrderCountdown 设置订单倒计时]
 * @param {[Object]}   target   [目标jquery对象]
 * @param {[Number]}   sec      [秒数]
 * @param {Function} callback [回调]
 */
paymentUI.setOrderCountdown = function(target, sec, callback){

    var _this = this;
    var $ele = $(target);
    sec = typeof sec !== 'undefined' ? sec : 60;
    callback = typeof callback !== 'undefined' ? callback : function(){};

    // 自动补全位数
    var prefixInteger = function(num, length) {
      return (num / Math.pow(10, length)).toFixed(length).substr(2);
    };

    // 格式化日期
    var formatSeconds = function(seconds) {

        var days = Math.floor(seconds / 86400);
        var hours = Math.floor((seconds % 86400) / 3600);
        var minutes = Math.floor(((seconds % 86400) % 3600) / 60);
        var seconds = ((seconds % 86400) % 3600) % 60;

        return {
            d: days,
            h: prefixInteger(hours, 2),
            m: prefixInteger(minutes, 2),
            s: prefixInteger(seconds, 2)
        };
    };

    // 倒计时时间
    this.setOrderCountdown.time = sec;
    // 倒计时
    this.setOrderCountdown.timer = setInterval(function(){
        var currSec = _this.setOrderCountdown.time;
        var timeData = formatSeconds(currSec);
        var timeText = timeData.h + ':' + timeData.m + ':' + timeData.s;
        // 渲染时间
        $ele.html(timeText);
        if(currSec <= 0){
            // 倒计时完毕回调
            callback();
            clearInterval(_this.setOrderCountdown.timer)
        }
        _this.setOrderCountdown.time --;
    }, 1000);

};
/**
 * [setTips ui-tips 提示框]
 */
paymentUI.setTips = function(){
    var $trigger = $('.j_uiTips');
    var tipsHtml = ''
                +'<div class="ui-tips">'
                    +'<i class="ui-tips-fill"></i>'
                    +'<span class="ui-tips-wrap">'
                        +'<i class="ui-tips-arrow"></i>'
                        +'<span class="ui-tips-text">${text}</span>'
                    +'</span>'
                +'</div>';

    $trigger.live('mouseenter', function(){
        var targetWidth = $(this).width();
        var leftFix = targetWidth / 2;

        var topFix = $(this).height() + 6;
        var top = $(this).offset().top;
        var left = $(this).offset().left;

        var tipsText = $(this).attr('data-tips');
        $('.ui-tips').remove();

        var $tipsBox = $(tipsHtml.replace('${text}', tipsText));
        // 模态中弹框 zindex 增加
        var zIndex = $(this).parents('.ui-modal').length > 0 ? 10090 : 90;

        $tipsBox.css({
            'left': left + leftFix - 26,
            'top': top + topFix,
            'z-index': zIndex
        });

        $tipsBox.find('.ui-tips-fill').css({
            'position': 'absolute',
            'display': 'block',
            'width': targetWidth,
            'height': topFix,
            'left': left - (left + leftFix - 26),
            'top': -topFix
        });

        var timer = 0;

        $tipsBox.bind('mouseleave', function(event){
            var _this = this;
            // 延时300ms 隐藏
            timer = setTimeout(function(){
                $(_this).remove();
            }, 300);
        });

        $tipsBox.bind('mouseenter', function(event){
            // 再次进入 取消隐藏
            clearTimeout(timer);
        });

        $('body').append($tipsBox);

    });

    
};

/**
 * [setPop Pop js触发弹框]
 */
paymentUI.setPop = function(){

    var triggerClass = '.j_uiPop';
    var $trigger = $(triggerClass);
    var close = '.j_uiPopClose';
    // hover toggle
    $trigger.bind('mouseenter', function(){
        $(this).addClass('hover');
    }).bind('mouseleave', function(){
        $(this).removeClass('hover');
    });

    // close
    $trigger.find(close).bind('click', function(){
        $(this).parents(triggerClass).removeClass('hover');
    });
    
    
};

/**
 * [setPaidPop Pop 已付金额]
 *
 * @example
 * 
    paymentUI.setPaidPop(function(ele){
        var $content = ele.find('.ui-pop-content');
        // 拼合内容
        var content = '白条：50元<br />'
        content += '小金库：50000元<br />';
        content += '余额：500元<br />';
        content += '钢镚：500元<br />';
        content += '京豆：50元<br />';
        content += '在线支付：5000元<br />';

        // 移除loading样式 并 设置内容
        $content.removeClass('loading');
        $content.html(content);
    });
 */
paymentUI.setPaidPop = function(callback){

    var callback = callback ? callback : function(){};
    var triggerClass = '.j_uiPaidPop';
    var $trigger = $(triggerClass);

    var _this = this;

    $trigger.live('mouseenter', function(){
        // 获取pop弹框
        var $pop = _this.renderPop({
            targetElement: $trigger,
            leftFix: 0,
            width: 150,
            wrapClass: 'ui-pop-paid',
            htmlTitle: $trigger.html(),
            htmlContent: '&nbsp;',
            hasClose: true
        });
        // 增加 loading
        $pop.find('.ui-pop-content').addClass('loading');
        // 显示 pop
        $('body').append($pop);
        // 执行 pop 显示后 callback
        callback($pop);
    });
    
    
};


/**
 * [setBaozhangPop Pop 保障弹出]
 */
paymentUI.setBaozhangPop = function(){

    var triggerClass = '.j_uiBaozhangPop';
    var $trigger = $(triggerClass);

    var _this = this;

    $trigger.live('mouseenter', function(){

        // 获取pop弹框
        var $pop = _this.renderPop({
            targetElement: $(this),
            leftFix: -200,
            width: 500,
            wrapClass: 'ui-pop-baozhang',
            htmlTitle: '该订单中含第三方卖家提供并需在线支付的商品，京东将保障您已支付的资金安全。',
            htmlContent: '<i class="baozhang-img"></i>',
            hasClose: false
        });

        $('body').append($pop);
        
    });
    
    
};

/**
 * [setFenqiPop 分期节省提示]
 */
paymentUI.setFenqiPop = function(){

    var triggerClass = '.j_uiFenqiPop';
    var $trigger = $(triggerClass);

    var _this = this;

    var parseObj = function (strData){
        return (new Function('return' + strData))();
    };

    var tplContent = '<table>'
                        +'<colgroup>'
                            +'<col width="140">'
                            +'<col width="">'
                            +'<col width="">'
                        +'</colgroup>'
                        +'<thead>'
                            +'<tr>'
                                +'<th>支付方式</th>'
                                +'<th>分期费用</th>'
                                +'<th>每期费率</th>'
                            +'</tr>'
                        +'</thead>'
                        +'<tbody>'
                            +'<tr class="tr-baitiao">'
                                +'<td>京东白条</td>'
                                +'<td>{btCost}元</td>'
                                +'<td>{btRate}</td>'
                            +'</tr>'
                            +'<tr>'
                                +'<td>信用卡<span class="font-gray">（平均水平）</span></td>'
                                +'<td>{crCost}元</td>'
                                +'<td>{crRate}</td>'
                            +'</tr>'
                        +'</tbody>'
                    +'</table>';

    // hover toggle
    $trigger.live('mouseenter', function(){

        if(typeof $(this).attr('data-save') !== 'undefined'){
            var thisDate = parseObj($(this).attr('data-save'));

            var tpl = tplContent.replace('{btCost}', thisDate.btCost);
            tpl =  tpl.replace('{btRate}', thisDate.btRate);
            tpl =  tpl.replace('{crCost}', thisDate.crCost);
            tpl =  tpl.replace('{crRate}', thisDate.crRate);
            
            // 获取pop弹框
            var $pop = _this.renderPop({
                targetElement: $(this),
                leftFix: -80,
                htmlTitle: '已为您节省分期费用<span class="font-red">'+ thisDate.save +'</span>元',
                htmlContent: tpl
            });

            $('body').append($pop);
        }
        
    });
    
};

/**
 * [renderPop 渲染pop提示层]
 */
paymentUI.renderPop = function(options){

    var thisOptions = {
        // 触发元素
        targetElement: options.targetElement ? options.targetElement : $('body'),
        // 左偏移修正
        leftFix: options.leftFix ? options.leftFix : 0,
        // 右偏移修正
        topFix: options.topFix ? options.topFix : 0,
        // 是否包含关闭按钮
        hasClose: typeof options.hasClose !== 'undefined' ? options.hasClose : true,
        // 弹框标题
        htmlTitle: options.htmlTitle ?  options.htmlTitle : '弹框',
        // 弹框内容
        htmlContent: options.htmlContent ?  options.htmlContent : '内容',
        // wrapClass 弹框class
        wrapClass: options.wrapClass ?  options.wrapClass : '',
        // 宽度
        width: options.width ?  options.width : 315

    };

    $targetElement = thisOptions.targetElement;

    var tpl = '<a class="ui-pop-close j_uiPopClose" href="javascript:;"></a>'
        +'<div class="ui-pop-title">'
        + thisOptions.htmlTitle
        +'</div>'
        +'<div class="ui-pop-content">'
            + thisOptions.htmlContent
        +'</div>';

    var $pop = $('<div class="ui-pop '+ thisOptions.wrapClass +'"></div>');
    $pop.html(tpl);

    // var targetWidth = $(this).width();
    // var leftFix = targetWidth / 2;
    // 
    var topFix = $targetElement.height();
    var top = $targetElement.offset().top;
    var left = $targetElement.offset().left;

    $pop.css({
        'left': left + thisOptions.leftFix,
        'top': top + topFix + thisOptions.topFix,
        'width': thisOptions.width
    });

    // close
    if(thisOptions.hasClose){
        $pop.find('.j_uiPopClose').bind('click', function(){
            $pop.remove();
        });
    }else{
        $pop.find('.j_uiPopClose').remove();
    };
    
    // 触发区域class
    var targetElementClass = $targetElement.attr('class');

    // 检测触发区域
    var checkArea = function(event){
        if(!($(event.target).hasClass(targetElementClass) || $(event.target).hasClass('ui-pop') || $(event.target).parents('.ui-pop').length !== 0)){
            $pop.remove();
            $('body').unbind('mouseover', checkArea);
        }
    };
    // 检测鼠标范围 自动移出 pop层
    $('body').bind('mouseover', function(event){
        checkArea(event);
    });

    // pop唯一显示 
    $('.ui-pop').remove();

    return $pop;
    
};

/**
 * [setPlaceholder 设置 input placeholder 兼容性]
 */
paymentUI.setPlaceholder = function(){
    // 检测是否支持 placeholder
    var supportPlaceholder = 'placeholder' in document.createElement('input');
    // 不支持 则启用兼容方法
    if(!supportPlaceholder){
        // input
        var $input = $('.ui-input, .bi-i-text');

        // 出现placeholder 时 class
        var placeholderClass = 'placeholder';

        // 初始化input placeholder
        $input.each(function(index){
            // 只绑定 placeholder
            if(typeof $(this).attr('placeholder') !== 'undefined'){

                var placeholderText = $.trim($(this).attr('placeholder'));
                var thisValue = $.trim($(this).val());

                var isPassword = $(this).attr('type') === 'password' ? true : false;
                // password 类型 复制input 解决兼容性问题 
                var fixPassword = function(ele){
                    var $_this = $(ele);
                    var $siblingsFixInput = $(ele).siblings('.placeholder-ie-fix');
                    if($siblingsFixInput.length !== 0){
                        $siblingsFixInput.remove();
                    }
                    $_this.hide();
                    var $newInput = $('<input type="text" />');
                    $newInput.attr({
                        'class': 'placeholder-ie-fix ' + $_this.attr('class')
                    });
                    
                    $(ele).after($newInput);

                    $newInput.addClass(placeholderClass).val(placeholderText);

                    $newInput.bind('focus', function(){
                        $newInput.remove();
                        $_this.show();
                        $_this.focus();
                    });
                    
                };

                // 为空 或者 value值和placeholder 相同时 重置
                if($.trim($(this).val()).length === 0 || thisValue === placeholderText){

                    if(isPassword){
                        fixPassword(this);
                    }else{
                        $(this).addClass(placeholderClass).val(placeholderText);
                    }
                }

                // 绑定input 聚焦失去焦点事件
                $(this).bind('focus', function(){
                    if($(this).hasClass(placeholderClass)){
                        $(this).removeClass(placeholderClass).val('');
                    }
                }).bind('blur', function(){
                    // 失去焦点为空
                    if($.trim($(this).val()).length === 0){

                        var placeholderText = $(this).attr(placeholderClass);

                        if(isPassword){
                            fixPassword(this);
                        }else{
                            $(this).addClass(placeholderClass).val(placeholderText);
                        }
                    
                    }
                });

            }
        });
        
    }
};

/**
 * [setMagnifying 银行卡号码放大]
 */
paymentUI.setMagnifying = function(){

    var triggerClass = '.j_uiMagnifying';
    var $trigger = $(triggerClass);

    /**
     * [randerMagnifying 渲染银行卡放大]
     * @param  {[Obejct]} input [当前input 对象]
     */
    var randerMagnifying = function(input){
        $input = input;
        var $wrap = $input.parents(triggerClass).length !== 0 ? $input.parents(triggerClass) : $input;

        var width = $wrap.outerWidth();
        var topFix = $wrap.outerHeight(true);
        var top = $wrap.offset().top;
        var left = $wrap.offset().left;

        var $magnifying = $('<div class="ui-magnifying"></div>');
        var tpl = '<span class="ui-magnifying-wrap">'
                    +'<span class="ui-magnifying-text"></span>'
                +'</span>';

        $magnifying.css({
            'width': width,
            'left': left,
            'top': top + topFix - 1
        }).html(tpl);

        var thisValue = $input.val().toUpperCase();
        $magnifying.find('.ui-magnifying-text').html(thisValue);

        $magnifying.appendTo('body');

        // fix 浮层不能遮罩select in IE6
        if($.browser.msie && ($.browser.version === '6.0')){
            var $iframe = $('<iframe class="ui-magnifying-iframe" frameBorder="0"></iframe>');
            $iframe.css({
                'width': width,
                'height': 32,
                'left': left,
                'top': top + topFix - 1
            });
            $iframe.appendTo('body');
        }

    };

    $trigger.each(function(){

        var $input =  $(this).find('.bi-i-text').length !== 0 ?  $(this).find('.bi-i-text') : $(this);

        // 获得焦点 显示
        $input.bind('focus', function(){

            // input 有值时显示
            if($.trim($(this).val()).length !== 0){
                randerMagnifying($(this));
            }
            
        });

        $input.bind('keyup', function(){

            // 放大银行唯一 无则添加 
            if($('.ui-magnifying').length === 0){

                randerMagnifying($(this));

            }else{
                var $wrap = $(this).parents(triggerClass).length !== 0 ? $(this).parents(triggerClass) : $(this);
                // 重置位置 防止窗口缩放异常
                var left = $wrap.offset().left;
                $('.ui-magnifying').css({
                    'left': left
                });

                // 赋值
                var thisValue = $(this).val().toUpperCase();
                $('.ui-magnifying').find('.ui-magnifying-text').html(thisValue);

            }
            
        });
        
        // 失去焦点 移出
        $input.bind('blur', function(){
            $('.ui-magnifying, .ui-magnifying-iframe').remove();
        });

    });
    
};

/**
 * [preloadImg 预加载图片]
 */
paymentUI.preloadImg = function(){
    var protocol = window.location.protocol === 'https:' ? 'https:' : 'http:';
    var imgList = [
                    'css/i/pay-credit-bg-code.gif',
                    'css/i/pay-credit-bg-month.gif',
                    'css/i/pay-credit-bg-verify.gif',
                    'css/i/pay-credit-bg-year.gif',
                    'css/i/ui-button-XL-loading.gif',
                  ];
                  
    for (var i = 0; i < imgList.length; i++) {
        var img = new Image();
        img.setAttribute('src', protocol + '//sp.jd.com/payment/1.0.0/' + imgList[i]);
    };
};

/**
 * [qrCoderImg 二维码 手机提示切换]
 */
paymentUI.qrCoderImg = function(){
    $('.o-qrcode').bind('mouseenter', function(){
        $(this).addClass('o-qrcode-hover');
    }).bind('mouseleave', function(){
        $(this).removeClass('o-qrcode-hover');
    });
};

/**
 * [slide 焦点图]
 */
paymentUI.slide = function(options){

    var thisOptions = {
        // 触发元素
        targetElement: options.targetElement ? options.targetElement : $('.slide'),
        // 宽度
        width: options.width ?  options.width : 353,
        height: options.height ?  options.height : 459,
        slideLength: options.slideLength ?  options.slideLength : 3
    };

    var $ele = thisOptions.targetElement;
    var $slideItem = $ele.find('.slide-items');
    var $slideControls = $ele.find('.slide-controls');

    $ele.css({
        'position':'relative',
        'overflow': 'hidden',
        'zoom': '1'
    });
    $slideItem.width(thisOptions.width * thisOptions.slideLength);
    $slideItem.find('li').css('float', 'left');

    // 绑定切换器
    for(var i = 0; i < thisOptions.slideLength; i++){
        $slideControls.append('<span><b></b></span>');
    }
    $slideControls.find('span:first').addClass('curr');
    $slideControls.find('span').bind('mouseenter', function(){
        var index = $(this).index();
        $(this).addClass('curr').siblings().removeClass('curr');
        $slideItem.stop(true).animate({
            'margin-left': -thisOptions.width * index
        }, 400, 'easeInOutQuint');
    });
};

/**
 * [autoComplete 自动完成]
 */
paymentUI.autoComplete = function(options){

    var thisOptions = {
        // 触发元素
        targetClass: options.targetClass ? options.targetClass : false,
        // 宽度
        data: options.data ?  options.data : {},
        callback: options.callback ? options.callback : function(){}
    };

    if(thisOptions.targetClass){

        var targetClassSplit = thisOptions.targetClass.slice(1);
        $('.ui-autocomplete-'+ targetClassSplit).remove();

        var targetWrap = $(thisOptions.targetClass);
        var targetClassSplit = thisOptions.targetClass.slice(1);

        var listHtml = $('<div class="ui-autocomplete ui-autocomplete-'+ targetClassSplit +' hide"><ul class="ui-autocomplete-list"></ul></div>');

        var itemListHtml = '';

        for(var i in thisOptions.data){
            itemListHtml += '<li data-value="'+ thisOptions.data[i].value +'" data-identity="'+ thisOptions.data[i].identity +'">'+ thisOptions.data[i].name +'</li>'
        }

        listHtml.find('.ui-autocomplete-list').html(itemListHtml);

        targetWrap.bind({
            focus: function(){
                var targetWidth = targetWrap.outerWidth(true);
                var targetHeight = targetWrap.outerHeight();

                var targetLeft = targetWrap.offset().left;
                var targetTop = targetWrap.offset().top;
                listHtml.css({
                    width: targetWidth - 2,
                    left: targetLeft,
                    top: targetTop + targetHeight - 1
                });

                listHtml.fadeIn(100);
            },
            blur: function(){
                setTimeout(function(){
                    listHtml.fadeOut(100);
                }, 100);
            }
        });

        listHtml.find('.ui-autocomplete-list').find('li').bind('click', function(){
            var thisData = {
                value: $(this).attr('data-value'),
                identity: $(this).attr('data-identity')
            }
            thisOptions.callback(targetWrap, thisData);
            listHtml.fadeOut(100);
        });

        $('body').append(listHtml);

    }


};


/**
 * [userGuide 用户初次登陆引导]
 */
function userGuide(){

    var isNewUser_usedBank = readCookie('cashierUsedBank') === '1' ? false : true;
    var isNewUser_allBank = readCookie('cashierAllBank') === '1' ? false : true;

    var tipsHtml = ''
                +'<div class="ui-tips ui-tips-red">'
                    +'<span class="ui-tips-wrap">'
                        +'<i class="ui-tips-arrow"></i>'
                        +'<span class="ui-tips-text">${text}</span>'
                    +'</span>'
                +'</div>';

    // 第一次访问展开已用银行卡
    if(isNewUser_usedBank){

        // 显示 常用银行卡提示
        var showUsedPayCardTips = function(){

            if($(this).find('.ub-arrow:visible').length !== 0){
                var $target = $(this).find('.ub-arrow');
                var top = $target.offset().top;
                var left = $target.offset().left;

                var $tipsBox = $(tipsHtml.replace('${text}', '点击查看您常用银行卡'));
                $tipsBox.css({
                    'left': left - 108,
                    'top': top + 30
                }).attr('id', 'J_usedPayCardTips');
                $tipsBox.find('.ui-tips-arrow').css({
                    'left': 'auto',
                    'right': 10
                })
                $('body').append($tipsBox);
            }
            
        };
        // 隐藏 常用银行卡提示
        var hideUsedPayCardTips = function(){
            $('#J_usedPayCardTips').remove();
        };

        // 绑定银行卡第一次支付提示
        $('#payCardBoxDiv').bind('mouseover', showUsedPayCardTips)
                           .bind('mouseout', hideUsedPayCardTips);

        // 使用所有银行卡 第一次点击
        $('.j_usedBankSelect').bind('click',function(){
            $('#J_usedPayCardTips').remove();
            $('#payCardBoxDiv').unbind('mouseover', showUsedPayCardTips)
                               .unbind('mouseout', hideUsedPayCardTips);
            // 种是否新用户的cookie
            createCookie('cashierUsedBank', '1', 3650);
        });

    }
   
    // 没使用过 使用新银行卡 默认提示
    if(isNewUser_allBank){

        // 显示 银行卡支付提示 
        var showAllBankTips = function(){

            if($(this).find('.j_usedBankSelect:visible').length !== 0){

                var $target = $(this).find('.bank-new');
                var top = $target.offset().top;
                var left = $target.offset().left;

                var $tipsBox = $(tipsHtml.replace('${text}', '点击查看所有银行'));
                $tipsBox.css({
                    'left': left,
                    'top': top + 32
                }).attr('id', 'J_payCardTips');
                $('body').append($tipsBox);
            }
        };
        // 隐藏 银行卡支付提示
        var hideAllBankTips = function(){
            $('#J_payCardTips').remove();
        };

        // 绑定银行卡第一次支付提示
        $('#payCardBoxDiv').bind('mouseover', showAllBankTips)
                           .bind('mouseout', hideAllBankTips);

        // 使用新银行卡 第一次点击
        $('.bank-new').bind('click',function(){
            $('#J_payCardTips').remove();
            $('#payCardBoxDiv').unbind('mouseover', showAllBankTips)
                               .unbind('mouseout', hideAllBankTips);
            // 种是否新用户的cookie
            createCookie('cashierAllBank', '1', 3650);
            
        });
        
    }

};

/**
 * [paymentRecommend 支付成功页广告位]
 */
paymentRecommend = {};

/**
 * [getData 获取数据]
 */
paymentRecommend.getData = function(param, callback){
    if(typeof param === 'undefined'){
        param = '';
    }
    // 发起请求
    $.ajax({
        url: 'http://x.jr.jd.com/flow/bid',
        data: 'unifiedParams=' + param,
        dataType: 'jsonp',
        jsonpCallback: 'call' + parseInt((Math.random()*100000), 10),
        success: function(data) {
            
            if (data.success === 1 && data.data.length > 0) {
                callback(data);
            }

        }
    });
};
/**
 * [sendLog 图片ping 发送log日志]
 * @param  {[String]}   src      [description]
 * @param  {[Boolean]}   random   [description]
 * @param  {Function} callback [description]
 */
paymentRecommend.sendLog = function(src, random, callback) {

    var img = new Image();
    src = random ? (src + '&random=' + Math.random()+''+(new Date)) : src;

    img.setAttribute('src', src);

    img.onload = function() {
        if ( typeof callback !== 'undefined' ) {
            callback(src);
        }
    };
};
/**
 * [initRecSuccess 初始化 成功页推荐]
 */
paymentRecommend.initRecSuccess = function(){

    var $targetElement = $('#J_resultRecommend');
    if($targetElement.length !== 0){
        var tpl = '<div class="result-recommend">'
                    +'<div class="title">'
                        +'<h2 class="name">爆款推荐</h2>'
                    +'</div>'
                    +'<div class="clearfix">'
                        +'<div class="o-slide">'
                            +'<div class="slide">'
                                +'<ul class="slide-items"></ul>'
                                // +'<div class="slide-controls">'
                                // +'</div>'
                            +'</div>'
                        +'</div>'
                        +'<ul class="o-goods"></ul>'
                    +'</div>'
                +'</div>';
    
        $targetElement.html(tpl);
        // 设置广告位左侧
        this.setRecSuccessLeft();
        // 设置广告位右侧
        this.setRecSuccessRight();
    }
}
/**
 * [setRecSuccessLeft 设置]
 */
paymentRecommend.setRecSuccessLeft = function(){
    var _this = this;
    // 广告位参数
    var param = "{'ad_id':44,'dataType':1,'batchCount':10,'area_id':2}";
    // 获取数据
    this.getData(param, function(data){
        var itemData = data.data;
        var itemTpl = '';
        for(var i in itemData){
            // 修改为仅显示第一帧
            if(i == 0){
                itemTpl += '<li><a clstag="jr|keycount|cashier_jd|cashier_jd_left0'+ (parseInt(i, 10) + 1) +'" href="'+ itemData[i].toUrl +'" target="_blank"><img width="353" height="459" src="'+ itemData[i].imgUrl +'"></a></li>';
                // 发送日志
                _this.sendLog(itemData[i].logPath);
            }
        }
        $('.slide-items').html(itemTpl);

        paymentUI.slide({
            targetElement: $('.slide'),
            width: 353,
            height: 459,
            slideLength: 3
        });
    });
};
/**
 * [setRecSuccessRight 设置]
 */
paymentRecommend.setRecSuccessRight = function(){
    var _this = this;
    // 广告位参数
    var param = "{'ad_id':375107,'dataType':1,'batchCount':10,'area_id':2}";
    // 获取数据
    this.getData(param, function(data){
        var itemData = data.data;
        var itemTpl = '';
        for(var i in itemData){
            itemTpl += '<li><a clstag="jr|keycount|cashier_jd|cashier_jd_right0'+ (parseInt(i, 10) + 1) +'" href="'+ itemData[i].toUrl +'" target="_blank"><img width="298" height="228" src="'+ itemData[i].imgUrl +'"></a></li>';
            // 发送日志
            _this.sendLog(itemData[i].logPath);
        }
        $('.o-goods').html(itemTpl);
    });
};

// dom ready 后初始化
$(function(){
    paymentUI.init();
    // 2015-01-14 关闭新用户引导
    // userGuide();
    // 加载成功页 广告推荐位
    paymentRecommend.initRecSuccess();
});
