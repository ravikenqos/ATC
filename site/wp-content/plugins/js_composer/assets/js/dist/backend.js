function vc_toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
}

function vc_convert_column_size(width) {
    var numbers = width ? width.split("/") : [1, 1],
        range = _.range(1, 13),
        num = !_.isUndefined(numbers[0]) && 0 <= _.indexOf(range, parseInt(numbers[0], 10)) && parseInt(numbers[0], 10),
        dev = !_.isUndefined(numbers[1]) && 0 <= _.indexOf(range, parseInt(numbers[1], 10)) && parseInt(numbers[1], 10);
    return !1 !== num && !1 !== dev ? "vc_col-sm-" + 12 * num / dev : "vc_col-sm-12"
}

function vc_convert_column_span_size(width) {
    return width = width.replace(/^vc_/, ""), "span12" === width ? "1/1" : "span11" === width ? "11/12" : "span10" === width ? "5/6" : "span9" === width ? "3/4" : "span8" === width ? "2/3" : "span7" === width ? "7/12" : "span6" === width ? "1/2" : "span5" === width ? "5/12" : "span4" === width ? "1/3" : "span3" === width ? "1/4" : "span2" === width ? "1/6" : "span1" === width && "1/12"
}

function vc_get_column_mask(cells) {
    var i, columns = cells.split("_"),
        columns_count = columns.length,
        numbers_sum = 0;
    for (i in columns)
        if (!isNaN(parseFloat(columns[i])) && isFinite(columns[i])) {
            var sp = columns[i].match(/(\d{1,2})(\d{1,2})/);
            numbers_sum = _.reduce(sp.slice(1), function (memo, num) {
                return memo + parseInt(num, 10)
            }, numbers_sum)
        }
    return columns_count + "" + numbers_sum
}

function vc_guid() {
    return VCS4() + VCS4() + "-" + VCS4()
}

function VCS4() {
    return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
}

function vc_button_param_target_callback() {
    var $ = jQuery,
        $link_target = this.$content.find("[name=target]").parents('[data-vc-ui-element="panel-shortcode-param"]:first'),
        $link_field = $(".wpb-edit-form [name=href]"),
        key_up_callback = _.debounce(function () {
            var val = $(this).val();
            0 < val.length && "http://" !== val && "https://" !== val ? $link_target.show() : $link_target.hide()
        }, 300);
    $link_field.keyup(key_up_callback).trigger("keyup")
}

function vc_cta_button_param_target_callback() {
    var $ = jQuery,
        $link_target = this.$content.find("[name=target]").parents('[data-vc-ui-element="panel-shortcode-param"]:first'),
        $link_field = $(".wpb-edit-form [name=href]"),
        key_up_callback = _.debounce(function () {
            var val = $(this).val();
            0 < val.length && "http://" !== val && "https://" !== val ? $link_target.show() : $link_target.hide()
        }, 300);
    $link_field.keyup(key_up_callback).trigger("keyup")
}

function vc_grid_exclude_dependency_callback() {
    var $ = jQuery,
        exclude_el = $(".wpb_vc_param_value[name=exclude]", this.$content),
        exclude_obj = exclude_el.data("vc-param-object");
    if (void 0 === exclude_obj) return !1;
    var post_type_object = $('select.wpb_vc_param_value[name="post_type"]', this.$content),
        val = post_type_object.val();
    exclude_obj.source_data = function (request, response) {
        return {
            query: {
                query: val,
                term: request.term
            }
        }
    }, exclude_obj.source_data_val = val, post_type_object.change(function () {
        val = $(this).val(), exclude_obj.source_data_val != val && (exclude_obj.source_data = function (request, response) {
            return {
                query: {
                    query: val,
                    term: request.term
                }
            }
        }, exclude_obj.$el.data("uiAutocomplete").destroy(), exclude_obj.$sortable_wrapper.find(".vc_data").remove(), exclude_obj.render(), exclude_obj.source_data_val = val)
    })
}

function vcGridFilterExcludeCallBack() {
    var $filterBy, $exclude, autocomplete, defaultValue, $ = jQuery;
    if ($filterBy = $(".wpb_vc_param_value[name=filter_source]", this.$content), defaultValue = $filterBy.val(), $exclude = $(".wpb_vc_param_value[name=exclude_filter]", this.$content), void 0 === (autocomplete = $exclude.data("vc-param-object"))) return !1;
    $filterBy.change(function () {
        var $this = $(this);
        defaultValue !== $this.val() && autocomplete.clearValue(), autocomplete.source_data = function () {
            return {
                vc_filter_by: $this.val()
            }
        }
    }).trigger("change")
}

function vcChartCustomColorDependency() {
    var $, $masterEl, $content;
    $ = jQuery, $masterEl = $(".wpb_vc_param_value[name=style]", this.$content), $content = this.$content, $masterEl.on("change", function () {
        var masterValue;
        masterValue = $(this).val(), $content.toggleClass("vc_chart-edit-form-custom-color", "custom" === masterValue)
    }), $masterEl.trigger("change")
}

function vc_wpnop(content) {
    if (!content) return "";
    var blocklist1, blocklist2, preserve_linebreaks = !1,
        preserve_br = !1;
    return -1 == content.indexOf("<pre") && -1 == content.indexOf("<script") || (preserve_linebreaks = !0, content = content.replace(/<(pre|script)[^>]*>[\s\S]+?<\/\1>/g, function (a) {
        return a = a.replace(/<br ?\/?>(\r\n|\n)?/g, "<wp-temp-lb>"), a.replace(/<\/?p( [^>]*)?>(\r\n|\n)?/g, "<wp-temp-lb>")
    })), -1 != content.indexOf("[caption") && (preserve_br = !0, content = content.replace(/\[caption[\s\S]+?\[\/caption\]/g, function (a) {
        return a.replace(/<br([^>]*)>/g, "<wp-temp-br$1>").replace(/[\r\n\t]+/, "")
    })), blocklist1 = "blockquote|ul|ol|li|table|thead|tbody|tfoot|tr|th|td|div|h[1-6]|p|fieldset", content = content.replace(new RegExp("\\s*</(" + blocklist1 + ")>\\s*", "g"), "</$1>\n"), content = content.replace(new RegExp("\\s*<((?:" + blocklist1 + ")(?: [^>]*)?)>", "g"), "\n<$1>"), content = content.replace(/(<p [^>]+>.*?)<\/p>/g, "$1</p#>"), content = content.replace(/<div( [^>]*)?>\s*<p>/gi, "<div$1>\n\n"), content = content.replace(/\s*<p>/gi, ""), content = content.replace(/\s*<\/p>\s*/gi, "\n\n"), content = content.replace(/\n[\s\u00a0]+\n/g, "\n\n"), content = content.replace(/\s*<br ?\/?>\s*/gi, "\n"), content = content.replace(/\s*<div/g, "\n<div"), content = content.replace(/<\/div>\s*/g, "</div>\n"), content = content.replace(/\s*\[caption([^\[]+)\[\/caption\]\s*/gi, "\n\n[caption$1[/caption]\n\n"), content = content.replace(/caption\]\n\n+\[caption/g, "caption]\n\n[caption"), blocklist2 = "blockquote|ul|ol|li|table|thead|tbody|tfoot|tr|th|td|h[1-6]|pre|fieldset", content = content.replace(new RegExp("\\s*<((?:" + blocklist2 + ")(?: [^>]*)?)\\s*>", "g"), "\n<$1>"), content = content.replace(new RegExp("\\s*</(" + blocklist2 + ")>\\s*", "g"), "</$1>\n"), content = content.replace(/<li([^>]*)>/g, "\t<li$1>"), -1 != content.indexOf("<hr") && (content = content.replace(/\s*<hr( [^>]*)?>\s*/g, "\n\n<hr$1>\n\n")), -1 != content.indexOf("<object") && (content = content.replace(/<object[\s\S]+?<\/object>/g, function (a) {
        return a.replace(/[\r\n]+/g, "")
    })), content = content.replace(/<\/p#>/g, "</p>\n"), content = content.replace(/\s*(<p [^>]+>[\s\S]*?<\/p>)/g, "\n$1"), content = content.replace(/^\s+/, ""), content = content.replace(/[\s\u00a0]+$/, ""), preserve_linebreaks && (content = content.replace(/<wp-temp-lb>/g, "\n")), preserve_br && (content = content.replace(/<wp-temp-br([^>]*)>/g, "<br$1>")), content
}

function vc_wpautop(pee) {
    var preserve_linebreaks = !1,
        preserve_br = !1,
        blocklist = "table|thead|tfoot|caption|col|colgroup|tbody|tr|td|th|div|dl|dd|dt|ul|ol|li|pre|select|option|form|map|area|blockquote|address|math|style|p|h[1-6]|hr|fieldset|noscript|legend|section|article|aside|hgroup|header|footer|nav|figure|figcaption|details|menu|summary";
    return -1 != pee.indexOf("<object") && (pee = pee.replace(/<object[\s\S]+?<\/object>/g, function (a) {
        return a.replace(/[\r\n]+/g, "")
    })), pee = pee.replace(/<[^<>]+>/g, function (a) {
        return a.replace(/[\r\n]+/g, " ")
    }), -1 == pee.indexOf("<pre") && -1 == pee.indexOf("<script") || (preserve_linebreaks = !0, pee = pee.replace(/<(pre|script)[^>]*>[\s\S]+?<\/\1>/g, function (a) {
        return a.replace(/(\r\n|\n)/g, "<wp-temp-lb>")
    })), -1 != pee.indexOf("[caption") && (preserve_br = !0, pee = pee.replace(/\[caption[\s\S]+?\[\/caption\]/g, function (a) {
        return a = a.replace(/<br([^>]*)>/g, "<wp-temp-br$1>"), a = a.replace(/<[a-zA-Z0-9]+( [^<>]+)?>/g, function (b) {
            return b.replace(/[\r\n\t]+/, " ")
        }), a.replace(/\s*\n\s*/g, "<wp-temp-br />")
    })), pee += "\n\n", pee = pee.replace(/<br \/>\s*<br \/>/gi, "\n\n"), pee = pee.replace(new RegExp("(<(?:" + blocklist + ")(?: [^>]*)?>)", "gi"), "\n$1"), pee = pee.replace(new RegExp("(</(?:" + blocklist + ")>)", "gi"), "$1\n\n"), pee = pee.replace(/<hr( [^>]*)?>/gi, "<hr$1>\n\n"), pee = pee.replace(/\r\n|\r/g, "\n"), pee = pee.replace(/\n\s*\n+/g, "\n\n"), pee = pee.replace(/([\s\S]+?)\n\n/g, "<p>$1</p>\n"), pee = pee.replace(/<p>\s*?<\/p>/gi, ""), pee = pee.replace(new RegExp("<p>\\s*(</?(?:" + blocklist + ")(?: [^>]*)?>)\\s*</p>", "gi"), "$1"), pee = pee.replace(/<p>(<li.+?)<\/p>/gi, "$1"), pee = pee.replace(/<p>\s*<blockquote([^>]*)>/gi, "<blockquote$1><p>"), pee = pee.replace(/<\/blockquote>\s*<\/p>/gi, "</p></blockquote>"), pee = pee.replace(new RegExp("<p>\\s*(</?(?:" + blocklist + ")(?: [^>]*)?>)", "gi"), "$1"), pee = pee.replace(new RegExp("(</?(?:" + blocklist + ")(?: [^>]*)?>)\\s*</p>", "gi"), "$1"), pee = pee.replace(/\s*\n/gi, "<br />\n"), pee = pee.replace(new RegExp("(</?(?:" + blocklist + ")[^>]*>)\\s*<br />", "gi"), "$1"), pee = pee.replace(/<br \/>(\s*<\/?(?:p|li|div|dl|dd|dt|th|pre|td|ul|ol)>)/gi, "$1"), pee = pee.replace(/(?:<p>|<br ?\/?>)*\s*\[caption([^\[]+)\[\/caption\]\s*(?:<\/p>|<br ?\/?>)*/gi, "[caption$1[/caption]"), pee = pee.replace(/(<(?:div|th|td|form|fieldset|dd)[^>]*>)(.*?)<\/p>/g, function (a, b, c) {
        return c.match(/<p( [^>]*)?>/) ? a : b + "<p>" + c + "</p>"
    }), preserve_linebreaks && (pee = pee.replace(/<wp-temp-lb>/g, "\n")), preserve_br && (pee = pee.replace(/<wp-temp-br([^>]*)>/g, "<br$1>")), pee
}

function vcAddShortcodeDefaultParams(model) {
    var params = model.get("params"),
        preset = model.get("preset");
    params = _.extend({}, vc.getDefaults(model.get("shortcode")), params), preset && vc_all_presets[preset] && (params = vc_all_presets[preset], void 0 !== vc.frame_window && vc_all_presets[preset].css && vc.frame_window.vc_iframe.setCustomShortcodeCss(vc_all_presets[preset].css)), model.set({
        params: params
    }, {
        silent: !0
    })
}

function vc_globalHashCode(obj) {
    return "string" != typeof obj && (obj = JSON.stringify(obj)), obj.length ? obj.split("").reduce(function (a, b) {
        return (a = (a << 5) - a + b.charCodeAt(0)) & a
    }, 0) : 0
}

function vcChartParamAfterAddCallback($elem, action) {
    if ("new" !== action && "clone" !== action || $elem.find(".vc_control.column_toggle").click(), "new" === action) {
        var i, $select, $options, random, exclude, colors;
        for (exclude = ["white", "black"], $select = $elem.find("[name=values_color]"), $options = $select.find("option"), i = 0;;) {
            if (100 < i++) break;
            if (random = Math.floor(Math.random() * $options.length), -1 === jQuery.inArray($options.eq(random).val(), exclude)) {
                $options.eq(random).prop("selected", !0), $select.change();
                break
            }
        }
        colors = ["#5472d2", "#00c1cf", "#fe6c61", "#8d6dc4", "#4cadc9", "#cec2ab", "#50485b", "#75d69c", "#f7be68", "#5aa1e3", "#6dab3c", "#f4524d", "#f79468", "#b97ebb", "#ebebeb", "#f7f7f7", "#0088cc", "#58b9da", "#6ab165", "#ff9900", "#ff675b", "#555555"], random = Math.floor(Math.random() * colors.length), $elem.find("[name=values_custom_color]").val(colors[random]).change()
    }
}


// @United
function moveSectionUp(item, callback) {
            
    var prev = item.prev();

    if( prev.length === 0 ) {
        return;
    }

    prev.css('z-index', 999).css('position','relative').animate({ top: item.outerHeight() }, 300 );
    item.css('z-index', 1000).css('position', 'relative').animate({ top: '-' + prev.outerHeight() }, 300, function () {
        
        prev.css('z-index', '').css('top', '').css('position', '');
        item.css('z-index', '').css('top', '').css('position', '');
        item.insertBefore(prev);
        
        if (callback && typeof(callback) === "function") {   
                    
            callback(); 

        }
        
    });

}

function moveSectionDown(item, callback) {

    var next = item.next();

    if( next.length === 0 ) {
        return;
    }

    next.css('z-index', 999).css('position', 'relative').animate({ top: '-' + item.outerHeight() }, 300 );
    item.css('z-index', 1000).css('position', 'relative').animate({ top: next.outerHeight() }, 300, function () {
        
        next.css('z-index', '').css('top', '').css('position', '');
        item.css('z-index', '').css('top', '').css('position', '');
        item.insertAfter(next);
        
        if (callback && typeof(callback) === "function") {   
                    
            callback(); 

        }
        
    });

}

$(document).on('click', '.vc_column-move-down', function(event) {
    
    var $section = $(this).closest(".wpb_vc_section"),
        $target = $("visual_composer_content");
    
    moveSectionDown( $section, function(){
        
        $("#visual_composer_content").sortable('option','update')(
            {
                type: "sortupdate",
                target: $target
            },
            {
                item: $section
            }
        );
        
    });
    
    event.preventDefault();

});

$(document).on('click', '.vc_column-move-up', function(event) {

    var $section = $(this).closest(".wpb_vc_section"),
        $target = $("visual_composer_content");
    
    moveSectionUp( $section, function(){
        
        $("#visual_composer_content").sortable('option','update')(
            {
                type: "sortupdate",
                target: $target
            },
            {
                item: $section
            }
        );
        
    });
    
    event.preventDefault();

}); 
// end @United

function vcEscapeHtml(text) {
    var map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    };
    return null === text || void 0 === text ? "" : text.replace(/[&<>"']/g, function (m) {
        return map[m]
    })
}

function vc_slugify(text) {
    return text.toLowerCase().replace(/[^\w ]+/g, "").replace(/ +/g, "-")
}
if (!window.vc) var vc = {};
! function () {
    vc.templateOptions = {
        default: {
            evaluate: /<%([\s\S]+?)%>/g,
            interpolate: /<%=([\s\S]+?)%>/g,
            escape: /<%-([\s\S]+?)%>/g
        },
        custom: {
            evaluate: /<#([\s\S]+?)#>/g,
            interpolate: /\{\{\{([\s\S]+?)\}\}\}/g,
            escape: /\{\{([^\}]+?)\}\}(?!\})/g
        }
    };
    var noMatch = /(.)^/,
        escapes = {
            "'": "'",
            "\\": "\\",
            "\r": "r",
            "\n": "n",
            "\u2028": "u2028",
            "\u2029": "u2029"
        },
        escapeRegExp = /\\|'|\r|\n|\u2028|\u2029/g,
        escapeChar = function (match) {
            return "\\" + escapes[match]
        };
    vc.template = function (text, settings) {
        settings = _.defaults({}, settings, vc.templateOptions.default);
        var matcher = RegExp([(settings.escape || noMatch).source, (settings.interpolate || noMatch).source, (settings.evaluate || noMatch).source].join("|") + "|$", "g"),
            index = 0,
            source = "__p+='";
        text.replace(matcher, function (match, escape, interpolate, evaluate, offset) {
            return source += text.slice(index, offset).replace(escapeRegExp, escapeChar), index = offset + match.length, escape ? source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'" : interpolate ? source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'" : evaluate && (source += "';\n" + evaluate + "\n__p+='"), match
        }), source += "';\n", settings.variable || (source = "with(obj||{}){\n" + source + "}\n"), source = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + source + "return __p;\n";
        var render;
        try {
            render = new Function(settings.variable || "obj", "_", source)
        } catch (e) {
            throw e.source = source, e
        }
        var template = function (data) {
            return render.call(this, data, _)
        };
        return template.source = "function(" + (settings.variable || "obj") + "){\n" + source + "}", template
    }
}(),
function ($) {
    "use strict";
    _.isUndefined(window.vc) && (window.vc = {}), window.Vc_postSettingsEditor = Backbone.View.extend({
        $editor: !1,
        sel: "wpb_csseditor",
        ace_enabled: !1,
        initialize: function (sel) {
            sel && 0 < sel.length && (this.sel = sel), this.ace_enabled = !0
        },
        aceEnabled: function () {
            return this.ace_enabled && window.ace && window.ace.edit
        },
        setEditor: function (value) {
            return this.aceEnabled() ? this.setEditorAce(value) : this.setEditorTextarea(value), this.$editor
        },
        focus: function () {
            if (this.aceEnabled()) {
                this.$editor.focus();
                var count = this.$editor.session.getLength();
                this.$editor.gotoLine(count, this.$editor.session.getLine(count - 1).length)
            } else this.$editor.focus()
        },
        setEditorAce: function (value) {
            this.$editor || (this.$editor = ace.edit(this.sel), this.$editor.getSession().setMode("ace/mode/css"), this.$editor.setTheme("ace/theme/chrome")), this.$editor.setValue(value), this.$editor.clearSelection(), this.$editor.focus();
            var count = this.$editor.getSession().getLength();
            return this.$editor.gotoLine(count, this.$editor.getSession().getLine(count - 1).length), this.$editor
        },
        setEditorTextarea: function (value) {
            return this.$editor || (this.$editor = $("<textarea></textarea>").css({
                width: "100%",
                height: "100%",
                minHeight: "300px"

            }), $("#" + this.sel).empty().append(this.$editor).css({
                overflowLeft: "hidden",
                width: "100%",
                height: "100%"
            })), this.$editor.val(value), this.$editor.focus(), this.$editor.parent().css({
                overflow: "auto"
            }), this.$editor
        },
        setSize: function () {
            var height = $(window).height() - 380;
            this.aceEnabled() ? $("#" + this.sel).css({
                height: height,
                minHeight: height
            }) : (this.$editor.parent().css({
                height: height,
                minHeight: height
            }), this.$editor.css({
                height: "98%",
                width: "98%"
            }))
        },
        setSizeResizable: function () {
            var height, editorPositionTop, footerPositionTop, $editor = $("#" + this.sel);
            editorPositionTop = $editor.offset().top, footerPositionTop = vc.active_panel.$el.find('[data-vc-ui-element="panel-footer"]').offset().top, height = footerPositionTop - editorPositionTop - 70, this.aceEnabled() ? $editor.css({
                height: height,
                minHeight: height
            }) : (this.$editor.parent().css({
                height: height,
                minHeight: height
            }), this.$editor.css({
                height: "98%",
                width: "98%"
            }))
        },
        getEditor: function () {
            return this.$editor
        },
        getValue: function () {
            return this.aceEnabled() ? this.$editor.getValue() : this.$editor.val()
        }
    })
}(window.jQuery),
function (_, Backbone, vc) {
    "use strict";

    function ExtendUI(object) {
        var newObject = this.extend(object);
        return newObject.prototype._vcUIEventsHooks || (newObject.prototype._vcUIEventsHooks = []), object.uiEvents && newObject.prototype._vcUIEventsHooks.push(object.uiEvents), newObject
    }
    Backbone.View.vcExtendUI = ExtendUI, vc.View = Backbone.View.extend({
        delegateEvents: function () {
            vc.View.__super__.delegateEvents.call(this), this._vcUIEventsHooks && this._vcUIEventsHooks.length && _.each(this._vcUIEventsHooks, function (events) {
                _.isObject(events) && _.each(events, function (methods, e) {
                    _.isString(methods) && _.each(methods.split(/\s+/), function (method) {
                        this.on(e, this[method], this)
                    }, this)
                }, this)
            }, this)
        }
    })
}(_, Backbone, vc),
function ($) {
    "use strict";
    _.isUndefined(window.vc) && (window.vc = {}), vc.showSpinner = function () {
        $("#vc_logo").addClass("vc_ui-wp-spinner")
    }, vc.hideSpinner = function () {
        $("#vc_logo").removeClass("vc_ui-wp-spinner")
    }, $(document).ajaxSend(function (e, xhr, req) {
        req && req.data && "string" == typeof req.data && req.data.match(/vc_inline=true/) && vc.showSpinner()
    }).ajaxStop(function () {
        vc.hideSpinner()
    }), vc.active_panel = !1, vc.closeActivePanel = function (model) {
        if (!this.active_panel) return !1;
        model && vc.active_panel.model && vc.active_panel.model.get("id") === model.get("id") ? (vc.active_panel.model = null, this.active_panel.hide()) : model || (vc.active_panel.model = null, this.active_panel.hide())
    }, vc.activePanelName = function () {
        return this.active_panel && this.active_panel.panelName ? this.active_panel.panelName : null
    }, vc.updateSettingsBadge = function () {
        var value = vc.$custom_css.val();
        value && "" !== value.trim() ? $("#vc_post-css-badge").show() : $("#vc_post-css-badge").hide()
    }, vc.ModalView = Backbone.View.extend({
        message_box_timeout: !1,
        events: {
            "hidden.bs.modal": "hide",
            "shown.bs.modal": "shown"
        },
        initialize: function () {
            _.bindAll(this, "setSize", "hide")
        },
        setSize: function () {
            var height = $(window).height() - 150;
            this.$content.css("maxHeight", height), this.trigger("setSize")
        },
        render: function () {
            return $(window).bind("resize.ModalView", this.setSize), this.setSize(), vc.closeActivePanel(), this.$el.modal("show"), this
        },
        showMessage: function (text, type) {
            this.message_box_timeout && this.$el.find(".vc_message").remove() && window.clearTimeout(this.message_box_timeout), this.message_box_timeout = !1;
            var $message_box = $('<div class="vc_message type-' + type + '"></div>');
            this.$el.find(".vc_modal-body").prepend($message_box), $message_box.text(text).fadeIn(), this.message_box_timeout = window.setTimeout(function () {
                $message_box.remove()
            }, 6e3)
        },
        hide: function () {
            $(window).unbind("resize.ModalView")
        },
        shown: function () {}
    }), vc.element_start_index = 0, vc.AddElementBlockView = vc.ModalView.extend({
        el: $("#vc_add-element-dialog"),
        prepend: !1,
        builder: "",
        events: {
            "click .vc_shortcode-link": "createElement",
            "keyup #vc_elements_name_filter": "filterElements",
            "hidden.bs.modal": "hide",
            "show.bs.modal": "buildFiltering",
            "click .wpb-content-layouts-container [data-filter]": "filterElements",
            "shown.bs.modal": "shown"
        },
        buildFiltering: function () {
            this.do_render = !1;
            var item_selector, tag, not_in;
            item_selector = '[data-vc-ui-element="add-element-button"]', tag = this.model ? this.model.get("shortcode") : "vc_column", not_in = this._getNotIn(tag), $("#vc_elements_name_filter").val(""), this.$content.addClass("vc_filter-all"), this.$content.attr("data-vc-ui-filter", "*");
            var mapped = vc.getMapped(tag),
                as_parent = !(!tag || _.isUndefined(mapped.as_parent)) && mapped.as_parent;
            if (_.isObject(as_parent)) {
                var parent_selector = [];
                _.isString(as_parent.only) && parent_selector.push(_.reduce(as_parent.only.replace(/\s/, "").split(","), function (memo, val) {
                    return memo + (_.isEmpty(memo) ? "" : ",") + '[data-element="' + val.trim() + '"]'
                }, "")), _.isString(as_parent.except) && parent_selector.push(_.reduce(as_parent.except.replace(/\s/, "").split(","), function (memo, val) {
                    return memo + ':not([data-element="' + val.trim() + '"])'
                }, "")), item_selector += parent_selector.join(",")
            } else not_in && (item_selector = not_in);
            tag && !_.isUndefined(mapped.allowed_container_element) && (mapped.allowed_container_element ? _.isString(mapped.allowed_container_element) && (item_selector += ":not([data-is-container=true]), [data-element=" + mapped.allowed_container_element + "]") : item_selector += ":not([data-is-container=true])"), this.$buttons.removeClass("vc_visible").addClass("vc_inappropriate"), $(item_selector, this.$content).removeClass("vc_inappropriate").addClass("vc_visible"), this.hideEmptyFilters()
        },
        hideEmptyFilters: function () {
            this.$el.find(".vc_filter-content-elements .active").removeClass("active"), this.$el.find(".vc_filter-content-elements > :first").addClass("active");
            var self = this;
            this.$el.find("[data-filter]").each(function () {
                $($(this).data("filter") + ".vc_visible:not(.vc_inappropriate)", self.$content).length ? $(this).parent().show() : $(this).parent().hide()
            })
        },
        render: function (model, prepend) {
            return this.builder = new vc.ShortcodesBuilder, this.prepend = !!_.isBoolean(prepend) && prepend, this.place_after_id = !!_.isString(prepend) && prepend, this.model = !!_.isObject(model) && model, this.$content = this.$el.find('[data-vc-ui-element="panel-add-element-list"]'), this.$buttons = $('[data-vc-ui-element="add-element-button"]', this.$content), this.preventDoubleExecution = !1, vc.AddElementBlockView.__super__.render.call(this)
        },
        hide: function () {
            this.do_render && (this.show_settings && this.showEditForm(), this.exit())
        },
        showEditForm: function () {
            vc.edit_element_block_view.render(this.builder.last())
        },
        exit: function () {
            this.builder.render()
        },
        createElement: function (e) {
            var $control, tag, row_params, column_params, row_inner_params, _this, i;
            if (!this.preventDoubleExecution) {
                this.preventDoubleExecution = !0, this.do_render = !0, e.preventDefault(), $control = $(e.currentTarget), tag = $control.data("tag"), row_params = {}, row_inner_params = {}, column_params = {
                    width: "1/1"
                }, !1 === this.model && "vc_row" !== tag ? (this.builder.create({
                    shortcode: "vc_row",
                    params: row_params
                }).create({
                    shortcode: "vc_column",
                    parent_id: this.builder.lastID(),
                    params: column_params
                }), this.model = this.builder.last()) : !1 !== this.model && "vc_row" === tag && (tag += "_inner");
                var params = {
                    shortcode: tag,
                    parent_id: !!this.model && this.model.get("id"),
                    params: "vc_row_inner" === tag ? row_inner_params : {}
                };
                if (this.prepend) {
                    params.order = 0;
                    var shortcodeFirst = vc.shortcodes.findWhere({
                        parent_id: this.model.get("id")
                    });
                    shortcodeFirst && (params.order = shortcodeFirst.get("order") - 1), vc.activity = "prepend"
                } else this.place_after_id && (params.place_after_id = this.place_after_id);
                for (this.builder.create(params), i = this.builder.models.length - 1; i >= 0; i--) this.builder.models[i].get("shortcode");
                "vc_row" === tag ? this.builder.create({
                    shortcode: "vc_column",
                    parent_id: this.builder.lastID(),
                    params: column_params
                }) : "vc_row_inner" === tag && (column_params = {
                    width: "1/1"
                }, this.builder.create({
                    shortcode: "vc_column_inner",
                    parent_id: this.builder.lastID(),
                    params: column_params
                }));
                var mapped = vc.getMapped(tag);
                if (_.isString(mapped.default_content) && mapped.default_content.length) {
                    var newData = this.builder.parse({}, mapped.default_content, this.builder.last().toJSON());
                    _.each(newData, function (object) {
                        object.default_content = !0, this.builder.create(object)
                    }, this)
                }
                this.show_settings = !(_.isBoolean(mapped.show_settings_on_create) && !1 === mapped.show_settings_on_create), _this = this, this.$el.one("hidden.bs.modal", function () {
                    _this.preventDoubleExecution = !1
                }).modal("hide")
            }
        },
        _getNotIn: _.memoize(function (tag) {
            return '[data-vc-ui-element="add-element-button"]:not(' + _.reduce(vc.map, function (memo, shortcode) {
                var separator = _.isEmpty(memo) ? "" : ",";
                return _.isObject(shortcode.as_child) ? (_.isString(shortcode.as_child.only) && (_.contains(shortcode.as_child.only.replace(/\s/, "").split(","), tag) || (memo += separator + "[data-element=" + shortcode.base + "]")), _.isString(shortcode.as_child.except) && _.contains(shortcode.as_child.except.replace(/\s/, "").split(","), tag) && (memo += separator + "[data-element=" + shortcode.base + "]")) : !1 === shortcode.as_child && (memo += separator + "[data-element=" + shortcode.base + "]"), memo
            }, "") + ")"
        }),
        filterElements: function (e) {
            e.stopPropagation(), e.preventDefault();
            var $control = $(e.currentTarget),
                filter = '[data-vc-ui-element="add-element-button"]',
                name_filter = $("#vc_elements_name_filter").val();
            if (this.$content.removeClass("vc_filter-all"), $control.is("[data-filter]")) {
                $(".wpb-content-layouts-container .isotope-filter .active", this.$content).removeClass("active"), $control.parent().addClass("active");
                var filter_value = $control.data("filter");
                filter += filter_value, "*" === filter_value ? this.$content.addClass("vc_filter-all") : this.$content.removeClass("vc_filter-all"), this.$content.attr("data-vc-ui-filter", filter_value.replace(".js-category-", "")), $("#vc_elements_name_filter").val("")
            } else 0 < name_filter.length ? (filter += ":containsi('" + name_filter + "'):not('.vc_element-deprecated')", $(".wpb-content-layouts-container .isotope-filter .active", this.$content).removeClass("active"), this.$content.attr("data-vc-ui-filter", "name:" + name_filter)) : name_filter.length || ($('.wpb-content-layouts-container .isotope-filter [data-filter="*"]').parent().addClass("active"), this.$content.attr("data-vc-ui-filter", "*"), this.$content.addClass("vc_filter-all"));
            $(".vc_visible", this.$content).removeClass("vc_visible"), $(filter, this.$content).addClass("vc_visible")
        },
        shown: function () {
            vc.is_mobile || $("#vc_elements_name_filter").focus()
        }
    }), vc.AddElementBlockViewBackendEditor = vc.AddElementBlockView.extend({
        render: function (model, prepend) {
            return this.prepend = !!_.isBoolean(prepend) && prepend, this.place_after_id = !!_.isString(prepend) && prepend, this.model = !!_.isObject(model) && model, this.$content = this.$el.find('[data-vc-ui-element="panel-add-element-list"]'), this.$buttons = $('[data-vc-ui-element="add-element-button"]', this.$content), vc.AddElementBlockView.__super__.render.call(this)
        },
        createElement: function (e) {
            var that, row_params, column_params, row_inner_params, column_inner_params;
            if (!this.preventDoubleExecution) {
                this.preventDoubleExecution = !0;
                var model, column, row;
                _.isObject(e) && e.preventDefault(), this.do_render = !0;
                var tag = $(e.currentTarget).data("tag");
                row_params = {}, column_params = {
                    width: "1/1"
                }, !1 === this.model ? (row = vc.shortcodes.create({
                    shortcode: "vc_row",
                    params: row_params
                }), column = vc.shortcodes.create({
                    shortcode: "vc_column",
                    params: column_params,
                    parent_id: row.id,
                    root_id: row.id
                }), model = "vc_row" !== tag ? vc.shortcodes.create({
                    shortcode: tag,
                    parent_id: column.id,
                    root_id: row.id
                }) : row) : "vc_row" === tag ? (row_inner_params = {}, column_inner_params = {
                    width: "1/1"
                }, row = vc.shortcodes.create({
                    shortcode: "vc_row_inner",
                    params: row_inner_params,
                    parent_id: this.model.id,
                    order: this.prepend ? this.getFirstPositionIndex() : vc.shortcodes.getNextOrder()
                }), model = vc.shortcodes.create({
                    shortcode: "vc_column_inner",
                    params: column_inner_params,
                    parent_id: row.id,
                    root_id: row.id
                })) : model = vc.shortcodes.create({
                    shortcode: tag,
                    parent_id: this.model.id,
                    order: this.prepend ? this.getFirstPositionIndex() : vc.shortcodes.getNextOrder(),
                    root_id: this.model.get("root_id")
                }), this.show_settings = !(_.isBoolean(vc.getMapped(tag).show_settings_on_create) && !1 === vc.getMapped(tag).show_settings_on_create), this.model = model, this.model.get("shortcode"), that = this, this.$el.one("hidden.bs.modal", function () {
                    that.preventDoubleExecution = !1
                }).modal("hide")
            }
        },
        showEditForm: function () {
            vc.edit_element_block_view.render(this.model)
        },
        exit: function () {},
        getFirstPositionIndex: function () {
            return vc.element_start_index -= 1, vc.element_start_index
        }
    }), vc.PanelView = vc.View.extend({
        mediaSizeClassPrefix: "vc_media-",
        customMediaQuery: !0,
        panelName: "panel",
        draggable: !1,
        $body: !1,
        $tabs: !1,
        $content: !1,
        events: {
            "click [data-dismiss=panel]": "hide",
            "mouseover [data-transparent=panel]": "addOpacity",
            "click [data-transparent=panel]": "toggleOpacity",
            "mouseout [data-transparent=panel]": "removeOpacity",
            "click .vc_panel-tabs-link": "changeTab"
        },
        _vcUIEventsHooks: [{
            resize: "setResize"
        }],
        options: {
            startTab: 0
        },
        clicked: !1,
        showMessageDisabled: !0,
        initialize: function () {
            this.clicked = !1, this.$el.removeClass("vc_panel-opacity"), this.$body = $("body"), this.$content = this.$el.find(".vc_panel-body"), _.bindAll(this, "setSize", "fixElContainment", "changeTab", "setTabsSize"), this.on("show", this.setSize, this), this.on("setSize", this.setResize, this), this.on("render", this.resetMinimize, this)
        },
        toggleOpacity: function () {
            this.clicked = !this.clicked
        },
        addOpacity: function () {
            !this.clicked && this.$el.addClass("vc_panel-opacity")
        },
        removeOpacity: function () {
            !this.clicked && this.$el.removeClass("vc_panel-opacity")
        },
        message_box_timeout: !1,
        init: function () {},
        render: function () {
            return this.trigger("render"), this.trigger("afterRender"), this
        },
        show: function () {
            if (!this.$el.hasClass("vc_active")) {
                vc.closeActivePanel(), this.init(), vc.active_panel = this, this.clicked = !1, this.$el.removeClass("vc_panel-opacity");
                var $tabs = this.$el.find(".vc_panel-tabs");
                $tabs.length && (this.$tabs = $tabs, this.setTabs()), this.$el.addClass("vc_active"), this.draggable ? this.initDraggable() : $(window).trigger("resize"), this.fixElContainment(), this.trigger("show")
            }
        },
        hide: function (e) {
            e && e.preventDefault(), this.model && (this.model = null), vc.active_panel = !1, this.$el.removeClass("vc_active")
        },
        content: function () {
            return this.$el.find(".panel-body")
        },
        setResize: function () {
            this.customMediaQuery && this.setMediaSizeClass()
        },
        setMediaSizeClass: function () {
            var modalWidth, classes;
            modalWidth = this.$el.width(), classes = {
                xs: !0,
                sm: !1,
                md: !1,
                lg: !1
            }, 525 <= modalWidth && (classes.sm = !0), 745 <= modalWidth && (classes.md = !0), 945 <= modalWidth && (classes.lg = !0), _.each(classes, function (value, key) {
                value ? this.$el.addClass(this.mediaSizeClassPrefix + key) : this.$el.removeClass(this.mediaSizeClassPrefix + key)
            }, this)
        },
        fixElContainment: function () {
            this.$body || (this.$body = $("body"));
            var el_w = this.$el.width(),
                container_w = this.$body.width(),
                container_h = this.$body.height(),
                containment = [20 - el_w, 0, container_w - 20, container_h - 30],
                positions = this.$el.position(),
                new_positions = {};
            positions.left < containment[0] && (new_positions.left = containment[0]), 0 > positions.top && (new_positions.top = 0), positions.left > containment[2] && (new_positions.left = containment[2]), positions.top > containment[3] && (new_positions.top = containment[3]), this.$el.css(new_positions), this.trigger("fixElContainment"), this.setSize()
        },
        initDraggable: function () {
            this.$el.draggable({
                iframeFix: !0,
                handle: ".vc_panel-heading",
                start: this.fixElContainment,
                stop: this.fixElContainment
            }), this.draggable = !0
        },
        setSize: function () {
            this.trigger("setSize")
        },
        setTabs: function () {
            this.$tabs.length && (this.$tabs.find(".vc_panel-tabs-control").removeClass("vc_active").eq(this.options.startTab).addClass("vc_active"), this.$tabs.find(".vc_panel-tab").removeClass("vc_active").eq(this.options.startTab).addClass("vc_active"), window.setTimeout(this.setTabsSize, 100))
        },
        setTabsSize: function () {
            this.$tabs && this.$tabs.parents(".vc_with-tabs.vc_panel-body").css("margin-top", this.$tabs.find(".vc_panel-tabs-menu").outerHeight())
        },
        changeTab: function (e) {
            if (e && e.preventDefault && e.preventDefault(), e.target && this.$tabs) {
                var $tab = $(e.target);
                this.$tabs.find(".vc_active").removeClass("vc_active"), $tab.parent().addClass("vc_active"), this.$el.find($tab.data("target")).addClass("vc_active"), window.setTimeout(this.setTabsSize, 100)
            }
        },
        showMessage: function (text, type) {
            if (this.showMessageDisabled) return !1;
            this.message_box_timeout && this.$el.find(".vc_panel-message").remove() && window.clearTimeout(this.message_box_timeout), this.message_box_timeout = !1;
            var $message_box = $('<div class="vc_panel-message type-' + type + '"></div>').appendTo(this.$el.find(".vc_ui-panel-content-container"));
            $message_box.text(text).fadeIn(), this.message_box_timeout = window.setTimeout(function () {
                $message_box.remove()
            }, 6e3)
        },
        isVisible: function () {
            return this.$el.is(":visible")
        },
        resetMinimize: function () {
            this.$el.removeClass("vc_panel-opacity")
        }
    }), vc.PostSettingsPanelView = vc.PanelView.extend({
        events: {
            "click [data-save=true]": "save",
            "click [data-dismiss=panel]": "hide",
            "click [data-transparent=panel]": "toggleOpacity",
            "mouseover [data-transparent=panel]": "addOpacity",
            "mouseout [data-transparent=panel]": "removeOpacity"
        },
        saved_css_data: "",
        saved_title: "",
        $title: !1,
        editor: !1,
        post_settings_editor: !1,
        initialize: function () {
            vc.$custom_css = $("#vc_post-custom-css"), this.saved_css_data = vc.$custom_css.val(), this.saved_title = vc.title, this.initEditor(), this.$body = $("body"), _.bindAll(this, "setSize", "fixElContainment"), this.on("show", this.setSize, this), this.on("setSize", this.setResize, this), this.on("render", this.resetMinimize, this)
        },
        initEditor: function () {
            this.editor = new Vc_postSettingsEditor
        },
        render: function () {
            return this.trigger("render"), this.$title = this.$el.find("#vc_page-title-field"), this.$title.val(vc.title), this.setEditor(), this.trigger("afterRender"), this
        },
        setEditor: function () {
            this.editor.setEditor(vc.$custom_css.val())
        },
        setSize: function () {
            this.editor.setSize(), this.trigger("setSize")
        },
        save: function () {
            if (this.$title) {
                var title = this.$title.val();
                title != vc.title && vc.frame.setTitle(title)
            }
            this.setAlertOnDataChange(), vc.$custom_css.val(this.editor.getValue()), vc.frame_window && vc.frame_window.vc_iframe.loadCustomCss(vc.$custom_css.val()), vc.updateSettingsBadge(), this.showMessage(window.i18nLocale.css_updated, "success"), this.trigger("save")
        },
        setAlertOnDataChange: function () {
            this.saved_css_data !== this.editor.getValue() ? vc.setDataChanged() : this.$title && this.saved_title !== this.$title.val() && vc.setDataChanged()
        }
    }), vc.PostSettingsPanelViewBackendEditor = vc.PostSettingsPanelView.extend({
        render: function () {
            return this.trigger("render"), this.setEditor(), this.trigger("afterRender"), this
        },
        setAlertOnDataChange: function () {
            vc.saved_custom_css !== this.editor.getValue() && window.tinymce && (window.switchEditors.go("content", "tmce"), window.setTimeout(function () {
                window.tinymce.get("content").isNotDirty = !1
            }, 1e3))
        },
        save: function () {
            vc.PostSettingsPanelViewBackendEditor.__super__.save.call(this), this.hide()
        }
    }), vc.TemplatesEditorPanelView = vc.PanelView.extend({
        events: {
            "click [data-dismiss=panel]": "hide",
            "click [data-transparent=panel]": "toggleOpacity",
            "mouseover [data-transparent=panel]": "addOpacity",
            "mouseout [data-transparent=panel]": "removeOpacity",
            "click .wpb_remove_template": "removeTemplate",
            "click [data-template_id]": "loadTemplate",
            "click [data-template_name]": "loadDefaultTemplate",
            "click #vc_template-save": "saveTemplate"
        },
        render: function () {
            this.trigger("render"),
                this.$name = $("#vc_template-name"), this.$list = $("#vc_template-list");
            var $tabs = $("#vc_tabs-templates");
            return $tabs.find(".vc_edit-form-tab-control").removeClass("vc_active").eq(0).addClass("vc_active"), $tabs.find('[data-vc-ui-element="panel-edit-element-tab"]').removeClass("vc_active").eq(0).addClass("vc_active"), $tabs.find(".vc_edit-form-link").click(function (e) {
                e.preventDefault();
                var $this = $(this);
                $tabs.find(".vc_active").removeClass("vc_active"), $this.parent().addClass("vc_active"), $($this.attr("href")).addClass("vc_active")
            }), this.trigger("afterRender"), this
        },
        removeTemplate: function (e) {
            e && e.preventDefault();
            var $button = $(e.currentTarget),
                template_name = $button.closest('[data-vc-ui-element="template-title"]').text();
            confirm(window.i18nLocale.confirm_deleting_template.replace("{template_name}", template_name)) && ($button.closest('[data-vc-ui-element="template"]').remove(), this.$list.html(window.i18nLocale.loading), $.ajax({
                type: "POST",
                url: window.ajaxurl,
                data: {
                    action: "wpb_delete_template",
                    template_id: $button.attr("rel"),
                    vc_inline: !0,
                    _vcnonce: window.vcAdminNonce
                },
                context: this
            }).done(function (html) {
                this.$list.html(html)
            }))
        },
        loadTemplate: function (e) {
            e && e.preventDefault();
            var $button = $(e.currentTarget);
            $.ajax({
                type: "POST",
                url: vc.frame_window.location.href,
                data: {
                    action: "vc_frontend_template",
                    template_id: $button.data("template_id"),
                    vc_inline: !0,
                    _vcnonce: window.vcAdminNonce
                },
                context: this
            }).done(function (html) {
                var template, data;
                _.each($(html), function (element) {
                    if ("vc_template-data" === element.id) try {
                        data = JSON.parse(element.innerHTML)
                    } catch (e) {
                        vcConsoleLog(e, "catching template data error")
                    }
                    "vc_template-html" === element.id && (template = element.innerHTML)
                }), template && data && vc.builder.buildFromTemplate(template, data), this.showMessage(window.i18nLocale.template_added, "success"), vc.closeActivePanel()
            })
        },
        ajaxData: function ($button) {
            return {
                action: "vc_frontend_default_template",
                template_name: $button.data("template_name"),
                vc_inline: !0,
                _vcnonce: window.vcAdminNonce
            }
        },
        loadDefaultTemplate: function (e) {
            e && e.preventDefault();
            var $button = $(e.currentTarget);
            $.ajax({
                type: "POST",
                url: vc.frame_window.location.href,
                data: this.ajaxData($button),
                context: this
            }).done(function (html) {
                var template, data;
                _.each($(html), function (element) {
                    if ("vc_template-data" === element.id) try {
                        data = JSON.parse(element.innerHTML)
                    } catch (e) {
                        vcConsoleLog(e, "catching template data error")
                    }
                    "vc_template-html" === element.id && (template = element.innerHTML)
                }), template && data && vc.builder.buildFromTemplate(template, data), this.showMessage(window.i18nLocale.template_added, "success")
            })
        },
        saveTemplate: function (e) {
            e.preventDefault();
            var data, shortcodes, name = this.$name.val();
            if (_.isString(name) && name.length) {
                if (shortcodes = this.getPostContent(), !shortcodes.trim().length) return this.showMessage(window.i18nLocale.template_is_empty, "error"), !1;
                data = {
                    action: "wpb_save_template",
                    template: shortcodes,
                    template_name: name,
                    frontend: !0,
                    vc_inline: !0,
                    _vcnonce: window.vcAdminNonce
                }, this.$name.val(""), this.showMessage(window.i18nLocale.template_save, "success"), this.reloadTemplateList(data)
            } else this.showMessage(window.i18nLocale.please_enter_templates_name, "error")
        },
        reloadTemplateList: function (data) {
            this.$list.html(window.i18nLocale.loading).load(window.ajaxurl, data)
        },
        getPostContent: function () {
            return vc.builder.getContent()
        }
    }), vc.TemplatesEditorPanelViewBackendEditor = vc.TemplatesEditorPanelView.extend({
        ajaxData: function ($button) {
            return {
                action: "vc_backend_template",
                template_id: $button.attr("data-template_id"),
                vc_inline: !0,
                _vcnonce: window.vcAdminNonce
            }
        },
        loadTemplate: function (e) {
            e.preventDefault();
            var $button = $(e.currentTarget);
            $.ajax({
                type: "POST",
                url: window.ajaxurl,
                data: this.ajaxData($button),
                context: this
            }).done(function (shortcodes) {
                _.each(vc.filters.templates, function (callback) {
                    shortcodes = callback(shortcodes)
                }), vc.storage.append(shortcodes), vc.shortcodes.fetch({
                    reset: !0
                }), vc.closeActivePanel()
            })
        },
        loadDefaultTemplate: function (e) {
            e.preventDefault();
            var $button = $(e.currentTarget);
            $.ajax({
                type: "POST",
                url: window.ajaxurl,
                data: {
                    action: "vc_backend_default_template",
                    template_name: $button.attr("data-template_name"),
                    vc_inline: !0,
                    _vcnonce: window.vcAdminNonce
                },
                context: this
            }).done(function (shortcodes) {
                _.each(vc.filters.templates, function (callback) {
                    shortcodes = callback(shortcodes)
                }), vc.storage.append(shortcodes), vc.shortcodes.fetch({
                    reset: !0
                })
            })
        },
        getPostContent: function () {
            return vc.storage.getContent()
        }
    }), vc.TemplatesPanelViewBackend = vc.PanelView.extend({
        $name: !1,
        $list: !1,
        template_load_action: "vc_backend_load_template",
        templateLoadPreviewAction: "vc_load_template_preview",
        save_template_action: "vc_save_template",
        delete_template_action: "vc_delete_template",
        appendedTemplateType: "my_templates",
        appendedTemplateCategory: "my_templates",
        appendedCategory: "my_templates",
        appendedClass: "my_templates",
        loadUrl: window.ajaxurl,
        events: $.extend(vc.PanelView.prototype.events, {
            "click .vc_template-save-btn": "saveTemplate",
            "click [data-template_id] [data-template-handler]": "loadTemplate",
            "click .vc_template-delete-icon": "removeTemplate"
        }),
        initialize: function () {
            _.bindAll(this, "checkInput", "saveTemplate"), vc.TemplatesPanelViewBackend.__super__.initialize.call(this)
        },
        render: function () {
            return this.$el.css("left", ($(window).width() - this.$el.width()) / 2), this.$name = this.$el.find('[data-js-element="vc-templates-input"]'), this.$name.off("keypress").on("keypress", this.checkInput), this.$list = this.$el.find(".vc_templates-list-my_templates"), vc.TemplatesPanelViewBackend.__super__.render.call(this)
        },
        saveTemplate: function (e) {
            e && e.preventDefault && e.preventDefault();
            var data, shortcodes, name = this.$name.val(),
                _this = this;
            return _.isString(name) && name.length ? (shortcodes = this.getPostContent(), shortcodes.trim().length ? (data = {
                action: this.save_template_action,
                template: shortcodes,
                template_name: name,
                vc_inline: !0,
                _vcnonce: window.vcAdminNonce
            }, void this.setButtonMessage(void 0, void 0, !0).reloadTemplateList(data, function () {
                _this.$name.val("").change()
            }, function () {
                _this.showMessage(window.i18nLocale.template_save_error, "error"), _this.clearButtonMessage()
            })) : (this.showMessage(window.i18nLocale.template_is_empty, "error"), !1)) : (this.showMessage(window.i18nLocale.please_enter_templates_name, "error"), !1)
        },
        checkInput: function (e) {
            if (13 === e.which) return this.saveTemplate(), !1
        },
        removeTemplate: function (e) {
            e && e.preventDefault(), e.stopPropagation();
            var $button = $(e.target),
                $template = $button.closest("[data-template_id]"),
                template_name = $template.find('[data-vc-ui-element="template-title"]').text();
            if (confirm(window.i18nLocale.confirm_deleting_template.replace("{template_name}", template_name))) {
                var template_id = $template.data("template_id"),
                    template_type = $template.data("template_type"),
                    template_action = $template.data("template_action");
                $template.remove(), $.ajax({
                    type: "POST",
                    url: window.ajaxurl,
                    data: {
                        action: template_action || this.delete_template_action,
                        template_id: template_id,
                        template_type: template_type,
                        vc_inline: !0,
                        _vcnonce: window.vcAdminNonce
                    },
                    context: this
                }).done(function () {
                    this.showMessage(window.i18nLocale.template_removed, "success"), vc.events.trigger("templates:delete", {
                        id: template_id,
                        type: template_type
                    })
                })
            }
        },
        reloadTemplateList: function (data, successCallback, errorCallback) {
            var _this = this;
            $.ajax({
                type: "POST",
                url: window.ajaxurl,
                data: data,
                context: this
            }).done(function (html) {
                _this.filter = !1, _this.$list || (_this.$list = _this.$el.find(".vc_templates-list-my_templates")), _this.$list.prepend($(html)), "function" == typeof successCallback && successCallback(html)
            }).error("function" == typeof errorCallback ? errorCallback : function () {})
        },
        getPostContent: function () {
            return vc.shortcodes.stringify("template")
        },
        loadTemplate: function (e) {
            e.preventDefault(), e.stopPropagation();
            var $template = $(e.target).closest("[data-template_id][data-template_type]");
            $.ajax({
                type: "POST",
                url: this.loadUrl,
                data: {
                    action: this.template_load_action,
                    template_unique_id: $template.data("template_id"),
                    template_type: $template.data("template_type"),
                    vc_inline: !0,
                    _vcnonce: window.vcAdminNonce
                },
                context: this
            }).done(this.renderTemplate)
        },
        renderTemplate: function (html) {
            var models;
            _.each(vc.filters.templates, function (callback) {
                html = callback(html)
            }), models = vc.storage.parseContent({}, html), _.each(models, function (model) {
                vc.shortcodes.create(model)
            }), vc.closeActivePanel()
        },
        buildTemplatePreview: function (e) {
            e && e.preventDefault && e.preventDefault();
            try {
                var url, $el = $(e.currentTarget),
                    $wrapper = $el.closest("[data-template_id]");
                if ($wrapper.hasClass("vc_active") || $wrapper.hasClass("vc_loading")) $el.vcAccordion("collapseTemplate");
                else {
                    var $localContent = $wrapper.find("[data-js-content]"),
                        localContentChilds = $localContent.children().length > 0;
                    if (this.$content = $localContent, this.$content.find("iframe").length) return $el.vcAccordion("collapseTemplate"), !0;
                    var _this = this;
                    $el.vcAccordion("collapseTemplate", function () {
                        var templateId = $wrapper.data("template_id"),
                            templateType = $wrapper.data("template_type");
                        if (templateId && !localContentChilds) {
                            var question = "?";
                            window.ajaxurl.indexOf("?") > -1 && (question = "&"), url = window.ajaxurl + question + $.param({
                                action: _this.templateLoadPreviewAction,
                                template_unique_id: templateId,
                                template_type: templateType,
                                vc_inline: !0,
                                post_id: $("#post_ID").val(),
                                _vcnonce: window.vcAdminNonce
                            }), $el.find("i").addClass("vc_ui-wp-spinner"), _this.$content.html('<iframe style="width: 100%;" data-vc-template-preview-frame="' + templateId + '"></iframe>');
                            var $frame = _this.$content.find("[data-vc-template-preview-frame]");
                            $frame.attr("src", url), $wrapper.addClass("vc_loading"), $frame.load(function () {
                                $wrapper.removeClass("vc_loading"), $el.find("i").removeClass("vc_ui-wp-spinner")
                            })
                        }
                    })
                }
            } catch (e) {
                window.console && window.console.error && window.console.error(e), this.showMessage("Failed to build preview", "error")
            }
        },
        setTemplatePreviewSize: function (height) {
            var iframe = this.$content.find("iframe");
            iframe.length > 0 && (iframe = iframe[0], void 0 === height && (iframe.height = iframe.contentWindow.document.body.offsetHeight, height = iframe.contentWindow.document.body.scrollHeight), iframe.height = height + "px")
        }
    }), vc.TemplatesPanelViewFrontend = vc.TemplatesPanelViewBackend.extend({
        template_load_action: "vc_frontend_load_template",
        loadUrl: !1,
        initialize: function () {
            this.loadUrl = vc.$frame.attr("src"), vc.TemplatesPanelViewFrontend.__super__.initialize.call(this)
        },
        render: function () {
            return vc.TemplatesPanelViewFrontend.__super__.render.call(this)
        },
        renderTemplate: function (html) {
            var template, data;
            _.each($(html), function (element) {
                if ("vc_template-data" === element.id) try {
                    data = JSON.parse(element.innerHTML)
                } catch (e) {
                    vcConsoleLog(e)
                }
                "vc_template-html" === element.id && (template = element.innerHTML)
            }), template && data && vc.builder.buildFromTemplate(template, data) ? this.showMessage(window.i18nLocale.template_added_with_id, "error") : this.showMessage(window.i18nLocale.template_added, "success"), vc.closeActivePanel()
        }
    }), vc.RowLayoutEditorPanelView = vc.PanelView.extend({
        events: {
            "click [data-dismiss=panel]": "hide",
            "click [data-transparent=panel]": "toggleOpacity",
            "mouseover [data-transparent=panel]": "addOpacity",
            "mouseout [data-transparent=panel]": "removeOpacity",
            "click .vc_layout-btn": "setLayout",
            "click #vc_row-layout-update": "updateFromInput"
        },
        _builder: !1,
        render: function (model) {
            return this.$input = $("#vc_row-layout"), model && (this.model = model), this.addCurrentLayout(), this.resetMinimize(), vc.column_trig_changes = !0, this
        },
        builder: function () {
            return this._builder || (this._builder = new vc.ShortcodesBuilder), this._builder
        },
        addCurrentLayout: function () {
            vc.shortcodes.sort();
            var string = _.map(vc.shortcodes.where({
                parent_id: this.model.get("id")
            }), function (model) {
                var width = model.getParam("width");
                return width || "1/1"
            }, "", this).join(" + ");
            this.$input.val(string)
        },
        isBuildComplete: function () {
            return this.builder().isBuildComplete()
        },
        setLayout: function (e) {
            if (e && e.preventDefault(), !this.isBuildComplete()) return !1;
            var $control = $(e.currentTarget),
                layout = $control.attr("data-cells"),
                columns = this.model.view.convertRowColumns(layout, this.builder());
            this.$input.val(columns.join(" + "))
        },
        updateFromInput: function (e) {
            if (e && e.preventDefault(), !this.isBuildComplete()) return !1;
            var layout, cells = this.$input.val();
            !1 !== (layout = this.validateCellsList(cells)) ? this.model.view.convertRowColumns(layout, this.builder()) : window.alert(window.i18nLocale.wrong_cells_layout)
        },
        validateCellsList: function (cells) {
            var b, num, denom, return_cells = [],
                split = cells.replace(/\s/g, "").split("+");
            return !(1e3 <= _.reduce(_.map(split, function (c) {
                if (c.match(/^[vc\_]{0,1}span\d{1,2}$/)) {
                    var converted_c = vc_convert_column_span_size(c);
                    return !1 === converted_c ? 1e3 : (b = converted_c.split(/\//), return_cells.push(b[0] + "" + b[1]), 12 * parseInt(b[0], 10) / parseInt(b[1], 10))
                }
                return c.match(/^[1-9]|1[0-2]\/[1-9]|1[0-2]$/) ? (b = c.split(/\//), num = parseInt(b[0], 10), 0 != 12 % (denom = parseInt(b[1], 10)) || num > denom ? 1e3 : (return_cells.push(num + "" + b[1]), 12 * num / denom)) : 1e3
            }), function (num, memo) {
                return memo += num
            }, 0)) && return_cells.join("_")
        }
    }), vc.RowLayoutEditorPanelViewBackend = vc.RowLayoutEditorPanelView.extend({
        builder: function () {
            return this.builder || (this.builder = vc.storage), this.builder
        },
        isBuildComplete: function () {
            return !0
        },
        setLayout: function (e) {
            e && e.preventDefault();
            var $control = $(e.currentTarget),
                layout = $control.attr("data-cells"),
                columns = this.model.view.convertRowColumns(layout);
            this.$input.val(columns.join(" + "))
        }
    }), $(window).on("orientationchange", function () {
        vc.active_panel && vc.active_panel.$el.css({
            top: "",
            left: "auto",
            height: "auto",
            width: "auto"
        })
    }), $(window).bind("resize.fixElContainment", function () {
        vc.active_panel && vc.active_panel.fixElContainment && vc.active_panel.fixElContainment()
    }), $("body").on("keyup change input", "[data-vc-disable-empty]", function () {
        var _this = $(this),
            $target = $(_this.data("vcDisableEmpty"));
        _this.val().length ? $target.removeProp("disabled") : $target.prop("disabled", !0)
    })
}(window.jQuery),
function ($) {
    "use strict";
    var TabsLine, Plugin, old;
    TabsLine = function (element, options) {
        var _this = this;
        this.options = options, this.$element = $(element), this.$dropdownContainer = this.$element.find(this.options.dropdownContainerSelector), this.$dropdown = this.$dropdownContainer.find(this.options.dropdownSelector), this.options.delayInit ? (_this.$element.addClass(this.options.initializingClass), setTimeout(function () {
            _this.options.autoRefresh || _this.refresh(), _this.moveTabs(), _this.$element.removeClass(_this.options.initializingClass)
        }, _this.options.delayInitTime)) : (this.options.autoRefresh || this.refresh(), this.moveTabs()), $(window).on("resize", $.proxy(this.moveTabs, this)), this.$dropdownContainer.on("click.vc.tabsLine", $.proxy(this.checkDropdownContainerActive, this))
    }, TabsLine.DEFAULTS = {
        initializingClass: "vc_initializing",
        delayInit: !1,
        delayInitTime: 1e3,
        activeClass: "vc_active",
        visibleClass: "vc_visible",
        dropdownContainerSelector: '[data-vc-ui-element="panel-tabs-line-toggle"]',
        dropdownSelector: '[data-vc-ui-element="panel-tabs-line-dropdown"]',
        tabSelector: '>li:not([data-vc-ui-element="panel-tabs-line-toggle"])',
        dropdownTabSelector: "li",
        freeSpaceOffset: 5,
        autoRefresh: !1,
        showDevInfo: !1
    }, TabsLine.prototype.refresh = function () {
        var addClick, _this = this;
        return _this.tabs = [], _this.dropdownTabs = [], _this.$element.find(_this.options.tabSelector).each(function () {
            _this.tabs.push({
                $tab: $(this),
                width: $(this).outerWidth()
            })
        }), _this.$dropdown.find(_this.options.dropdownTabSelector).each(function () {
            var $tempElement = $(this).clone().css({
                visibility: "hidden",
                position: "fixed"
            });
            $tempElement.appendTo(_this.$element), _this.dropdownTabs.push({
                $tab: $(this),
                width: $tempElement.outerWidth()
            }), $tempElement.remove(), $(this).on("click", _this.options.onTabClick)
        }), "function" == typeof this.options.onTabClick && (addClick = function (el) {
            void 0 === el.$tab.data("tabClickSet") && (el.$tab.on("click", $.proxy(_this.options.onTabClick, el.$tab)), el.$tab.data("tabClickSet", !0))
        }, _this.tabs.map(addClick), _this.dropdownTabs.map(addClick)), this
    }, TabsLine.prototype.moveLastToDropdown = function () {
        var $element;
        return this.tabs.length && ($element = this.tabs.pop(), $element.$tab.prependTo(this.$dropdown), this.dropdownTabs.unshift($element)), this.checkDropdownContainer(), this
    }, TabsLine.prototype.moveFirstToContainer = function () {
        var $element;
        return this.dropdownTabs.length && ($element = this.dropdownTabs.shift(), $element.$tab.appendTo(this.$element), this.tabs.push($element)), this.checkDropdownContainer(), this
    }, TabsLine.prototype.getTabsWidth = function () {
        var tabsWidth = 0;
        return this.tabs.forEach(function (entry) {
            tabsWidth += entry.width
        }), tabsWidth
    }, TabsLine.prototype.isDropdownContainerVisible = function () {
        return this.$dropdownContainer.hasClass(this.options.visibleClass)
    }, TabsLine.prototype.getFreeSpace = function () {
        var freeSpace = this.$element.width() - this.getTabsWidth() - this.options.freeSpaceOffset;
        return this.isDropdownContainerVisible() && (freeSpace -= this.$dropdownContainer.outerWidth(), 1 === this.dropdownTabs.length && 0 <= freeSpace - this.dropdownTabs[0].width + this.$dropdownContainer.outerWidth() && (freeSpace += this.$dropdownContainer.outerWidth())), freeSpace
    }, TabsLine.prototype.moveTabsToDropdown = function () {
        for (var tabsCount = this.tabs.length, i = tabsCount - 1; 0 <= i; i--) {
            if (!(0 > this.getFreeSpace())) return this;
            this.moveLastToDropdown()
        }
        return this
    }, TabsLine.prototype.moveDropdownToTabs = function () {
        for (var dropdownTabsCount = this.dropdownTabs.length, i = 0; i < dropdownTabsCount; i++) {
            if (!(0 <= this.getFreeSpace() - this.dropdownTabs[0].width)) return this;
            this.moveFirstToContainer()
        }
        return this
    }, TabsLine.prototype.showDropdownContainer = function () {
        return this.$dropdownContainer.addClass(this.options.visibleClass), this
    }, TabsLine.prototype.hideDropdownContainer = function () {
        return this.$dropdownContainer.removeClass(this.options.visibleClass), this
    }, TabsLine.prototype.activateDropdownContainer = function () {
        return this.$dropdownContainer.addClass(this.options.activeClass), this
    }, TabsLine.prototype.deactivateDropdownContainer = function () {
        return this.$dropdownContainer.removeClass(this.options.activeClass), this
    }, TabsLine.prototype.checkDropdownContainerActive = function () {
        return this.$dropdown.find("." + this.options.activeClass + ":first").length ? this.activateDropdownContainer() : this.deactivateDropdownContainer(), this
    }, TabsLine.prototype.checkDropdownContainer = function () {
        return this.dropdownTabs.length ? this.showDropdownContainer() : this.hideDropdownContainer(), this.checkDropdownContainerActive(), this
    }, TabsLine.prototype.moveTabs = function () {
        return this.options.autoRefresh && this.refresh(), this.checkDropdownContainer(), this.moveTabsToDropdown(), this.moveDropdownToTabs(), this.options.showDevInfo && this.showDevInfo(), this
    }, TabsLine.prototype.showDevInfo = function () {
        var $devInfoBlock = $("#vc-ui-tabs-line-dev-info");
        $devInfoBlock.length && (this.$devBlock = $devInfoBlock), void 0 === this.$devBlock && (this.$devBlock = $('<div id="vc-ui-tabs-line-dev-info" />').css({
            position: "fixed",
            right: "40px",
            top: "40px",
            padding: "7px 12px",
            border: "1px solid rgba(0, 0, 0, .2)",
            background: "rgba(0, 0, 0, .7)",
            color: "#0a0",
            "border-radius": "5px",
            "font-family": "tahoma",
            "font-size": "12px",
            "z-index": 1100
        }), this.$devBlock.appendTo("body")), void 0 === this.$devInfo && (this.$devInfo = $("<div />").css({
            "margin-bottom": "7px",
            "padding-bottom": "7px",
            "border-bottom": "1px dashed rgba(0, 200, 0, .35)"
        }), this.$devInfo.appendTo(this.$devBlock)), this.$devInfo.empty(), this.$devInfo.append($("<div />").text("Tabs count: " + this.tabs.length)), this.$devInfo.append($("<div />").text("Dropdown count: " + this.dropdownTabs.length)), this.$devInfo.append($("<div />").text("El width: " + this.$element.width())), this.$devInfo.append($("<div />").text("Tabs width: " + this.getTabsWidth())), this.$devInfo.append($("<div />").text("Tabs width with dots: " + (this.getTabsWidth() + this.$dropdownContainer.outerWidth()))), this.$devInfo.append($("<div />").text("Free space: " + this.getFreeSpace())), this.tabs.length && this.$devInfo.append($("<div />").text("Last tab width: " + this.tabs[this.tabs.length - 1].width)), this.dropdownTabs.length && this.$devInfo.append($("<div />").text("First dropdown tab width: " + this.dropdownTabs[0].width))
    }, Plugin = function (option) {
        return this.each(function () {
            var $this = $(this),
                optionsData = $this.data("vcUiTabsLine"),
                data = $this.data("vc.tabsLine"),
                options = $.extend(!0, {}, TabsLine.DEFAULTS, $this.data(), optionsData, "object" == typeof option && option),
                action = "string" == typeof option ? option : options.action;
            data || $this.data("vc.tabsLine", data = new TabsLine(this, options)), action && data[action]()
        })
    }, old = $.fn.vcTabsLine, $.fn.vcTabsLine = Plugin, $.fn.vcTabsLine.Constructor = TabsLine, $.fn.vcTabsLine.noConflict = function () {
        return $.fn.vcTabsLine = old, this
    }, $(window).on("load", function () {
        $("[data-vc-ui-tabs-line]").each(function () {
            var $vcTabsLine = $(this);
            Plugin.call($vcTabsLine, $vcTabsLine.data())
        })
    })
}(window.jQuery),
function ($) {
    "use strict";
    vc.HelperAjax = {
        ajax: !1,
        checkAjax: function () {
            this.ajax && this.ajax.abort()
        },
        resetAjax: function () {
            this.ajax = !1
        }
    }
}(window.jQuery),
function ($) {
    "use strict";
    vc.HelperPrompts = {
        uiEvents: {
            render: "removeAllPrompts"
        },
        removeAllPrompts: function () {
            this.$el.find(".vc_ui-panel-content-container").removeClass("vc_ui-content-hidden"), this.$el.find(".vc_ui-prompt").remove()
        }
    }
}(window.jQuery),
function ($) {
    "use strict";
    vc.HelperPanelViewDraggable = {
        draggable: !0,
        draggableOptions: {
            iframeFix: !0,
            handle: '[data-vc-ui-element="panel-heading"]'
        },
        uiEvents: {
            show: "initDraggable"
        },
        initDraggable: function () {
            this.$el.draggable(_.extend({}, this.draggableOptions, {
                start: this.fixElContainment,
                stop: this.fixElContainment
            }))
        }
    }
}(window.jQuery),
function ($) {
    "use strict";
    vc.HelperPanelViewResizable = {
        sizeInitialized: !1,
        uiEvents: {
            show: "setSavedSize initResize",
            tabChange: "setDefaultHeightSettings",
            afterMinimize: "setupOnMinimize",
            afterUnminimize: "initResize",
            fixElContainment: "saveUIPanelSizes"
        },
        setDefaultHeightSettings: function () {
            this.$el.css("height", "auto"), this.$el.css("maxHeight", "75vh")
        },
        initResize: function () {
            var _this = this;
            this.$el.data("uiResizable") && this.$el.resizable("destroy"), this.$el.resizable({
                minHeight: 240,
                minWidth: 380,
                resize: function () {
                    _this.trigger("resize")
                },
                handles: "n, e, s, w, ne, se, sw, nw",
                start: function (e, ui) {
                    _this.trigger("beforeResizeStart"), _this.$el.css("maxHeight", "none"), _this.$el.css("height", ui.size.height), $("iframe").css("pointerEvents", "none"), _this.trigger("afterResizeStart")
                },
                stop: function () {
                    _this.trigger("beforeResizeStop"), $("iframe").css("pointerEvents", ""), _this.saveUIPanelSizes(), _this.trigger("afterResizeStop")
                }
            }), this.content().addClass("vc_properties-list-init"), this.trigger("resize")
        },
        setSavedSize: function () {
            if (this.setDefaultHeightSettings(), vc.is_mobile) return !1;
            var sizes = {
                width: getUserSetting(this.panelName + "_vcUIPanelWidth"),
                left: getUserSetting(this.panelName + "_vcUIPanelLeft").replace("minus", "-"),
                top: getUserSetting(this.panelName + "_vcUIPanelTop").replace("minus", "-")
            };
            _.isEmpty(sizes.width) || this.$el.width(sizes.width), _.isEmpty(sizes.left) || this.$el.css("left", sizes.left), _.isEmpty(sizes.top) || this.$el.css("top", sizes.top), this.sizeInitialized = !0
        },
        saveUIPanelSizes: function () {
            if (!1 === this.sizeInitialized) return !1;
            var sizes = {
                width: this.$el.width(),
                left: parseInt(this.$el.css("left"), 10),
                top: parseInt(this.$el.css("top"), 10)
            };
            setUserSetting(this.panelName + "_vcUIPanelWidth", sizes.width), setUserSetting(this.panelName + "_vcUIPanelLeft", sizes.left.toString().replace("-", "minus") + "px"), setUserSetting(this.panelName + "_vcUIPanelTop", sizes.top.toString().replace("-", "minus") + "px")
        },
        setupOnMinimize: function () {
            this.$el.data("uiResizable") && this.$el.resizable("destroy"), this.$el.resizable({
                minWidth: 380,
                handles: "w, e",
                start: function (e) {
                    $("iframe").css("pointerEvents", "none")
                },
                stop: function () {
                    $("iframe").css("pointerEvents", "")
                }
            })
        }
    }
}(window.jQuery),
function ($) {
    "use strict";
    vc.HelperTemplatesPanelViewSearch = {
        searchSelector: "[data-vc-templates-name-filter]",
        events: {
            "keyup [data-vc-templates-name-filter]": "searchTemplate",
            "search [data-vc-templates-name-filter]": "searchTemplate"
        },
        uiEvents: {
            show: "focusToSearch"
        },
        focusToSearch: function () {
            vc.is_mobile || $(this.searchSelector, this.$el).focus()
        },
        searchTemplate: function (e) {
            var $el = $(e.currentTarget);
            $el.val().length ? this.searchByName($el.val()) : this.clearSearch()
        },
        clearSearch: function () {
            this.$el.find("[data-vc-templates-name-filter]").val(""), this.$el.find("[data-template_name]").css("display", "block"), this.$el.removeAttr("data-vc-template-search"), this.$el.find(".vc-search-result-empty").removeClass("vc-search-result-empty");
            var ev = new jQuery.Event("click");
            ev.isClearSearch = !0, this.$el.find('.vc_panel-tabs-control:first [data-vc-ui-element="panel-tab-control"]').trigger(ev)
        },
        searchByName: function (name) {
            this.$el.find(".vc_panel-tabs-control.vc_active").removeClass("vc_active"), this.$el.attr("data-vc-template-search", "true"), this.$el.find("[data-template_name]").css("display", "none"), this.$el.find('[data-template_name*="' + vc_slugify(name) + '"]').css("display", "block"), this.$el.find('[data-vc-ui-element="panel-edit-element-tab"]').each(function () {
                var $el = $(this);
                $el.removeClass("vc-search-result-empty"), $el.find("[data-template_name]:visible").length || $el.addClass("vc-search-result-empty")
            })
        }
    }
}(window.jQuery),
function ($) {
    "use strict";
    vc.HelperPanelViewHeaderFooter = {
        buttonMessageTimeout: !1,
        events: {
            'click [data-vc-ui-element="button-save"]': "save",
            'click [data-vc-ui-element="button-close"]': "hide",
            'click [data-vc-ui-element="button-minimize"]': "toggleOpacity"
        },
        uiEvents: {
            save: "setButtonMessage",
            render: "clearButtonMessage"
        },
        resetMinimize: function () {
            this.$el.removeClass("vc_panel-opacity"), this.$el.removeClass("vc_minimized")
        },
        toggleOpacity: function (e) {
            e.preventDefault();
            var _this = this,
                $target = this.$el,
                $panel = $target.find($target.data("vcPanel")),
                $panelContainer = $panel.closest($panel.data("vcPanelContainer")),
                $trigger = $(e.currentTarget);
            void 0 === $target.data("vcHasHeight") && $target.data("vcHasHeight", function ($element, property) {
                var styles = $element.attr("style"),
                    hasStyle = !1;
                return styles && styles.split(";").forEach(function (e) {
                    var style = e.split(":");
                    "height" === $.trim(style[0]) && (hasStyle = !0)
                }), hasStyle
            }($target)), $target.hasClass("vc_minimized") ? (void 0 === $target.data("vcMinimizeHeight") && $target.data("vcMinimizeHeight", $(window).height() - .2 * $(window).height()), $target.animate({
                height: $target.data("vcMinimizeHeight")
            }, {
                duration: 400,
                start: function () {
                    $trigger.prop("disabled", !0), $target.addClass("vc_animating"), _this.tabsMenu && _this.tabsMenu() && _this.tabsMenu().vcTabsLine("moveTabs")
                },
                complete: function () {
                    $target.removeClass("vc_minimized"), $target.removeClass("vc_animating"), $target.data("vcHasHeight") || $target.css({
                        height: ""
                    }), _this.trigger("afterUnminimize"), $trigger.prop("disabled", !1)
                }
            })) : ($target.data("vcMinimizeHeight", $target.height()), $target.animate({
                height: $panel.outerHeight() + $panelContainer.outerHeight() - $panelContainer.height()
            }, {
                duration: 400,
                start: function () {
                    $trigger.prop("disabled", !0), $target.addClass("vc_animating")
                },
                complete: function () {
                    $target.addClass("vc_minimized"), $target.removeClass("vc_animating"), $target.css({
                        height: ""
                    }), _this.trigger("afterMinimize"), $trigger.prop("disabled", !1)
                }
            }))
        },
        setButtonMessage: function (message, type, showInBackend) {
            var currentTextHtml, $saveBtn;
            return void 0 === showInBackend && (showInBackend = !1), this.clearButtonMessage = _.bind(this.clearButtonMessage, this), !showInBackend && !vc.frame_window || this.buttonMessageTimeout ? this : (void 0 === message && (message = window.i18nLocale.ui_saved), void 0 === type && (type = "success"), $saveBtn = this.$el.find('[data-vc-ui-element="button-save"]'), currentTextHtml = $saveBtn.html(), $saveBtn.addClass("vc_ui-button-" + type + " vc_ui-button-undisabled").removeClass("vc_ui-button-action").data("vcCurrentTextHtml", currentTextHtml).data("vcCurrentTextType", type).html(message), _.delay(this.clearButtonMessage, 5e3), this.buttonMessageTimeout = !0, this)
        },
        clearButtonMessage: function () {
            var type, currentTextHtml, $saveBtn;
            this.buttonMessageTimeout && (window.clearTimeout(this.buttonMessageTimeout), $saveBtn = this.$el.find('[data-vc-ui-element="button-save"]'), currentTextHtml = $saveBtn.data("vcCurrentTextHtml") || "Save", type = $saveBtn.data("vcCurrentTextType"), $saveBtn.html(currentTextHtml).removeClass("vc_ui-button-" + type + " vc_ui-button-undisabled").addClass("vc_ui-button-action"), this.buttonMessageTimeout = !1)
        }
    }
}(window.jQuery),
function ($) {
    "use strict";
    vc.TemplateWindowUIPanelBackendEditor = vc.TemplatesPanelViewBackend.vcExtendUI(vc.HelperPanelViewHeaderFooter).vcExtendUI(vc.HelperTemplatesPanelViewSearch).extend({
        panelName: "template_window",
        showMessageDisabled: !1,
        initialize: function () {
            vc.TemplateWindowUIPanelBackendEditor.__super__.initialize.call(this), this.trigger("show", this.initTemplatesTabs, this)
        },
        show: function () {
            this.clearSearch(), vc.TemplateWindowUIPanelBackendEditor.__super__.show.call(this)
        },
        initTemplatesTabs: function () {
            this.$el.find('[data-vc-ui-element="panel-tabs-controls"]').vcTabsLine("moveTabs")
        },
        showMessage: function (text, type) {
            var wrapperCssClasses;
            if (this.showMessageDisabled) return !1;
            wrapperCssClasses = "vc_col-xs-12 wpb_element_wrapper", this.message_box_timeout && this.$el.find("[data-vc-panel-message]").remove() && window.clearTimeout(this.message_box_timeout), this.message_box_timeout = !1;
            var $messageBox, messageBoxTemplate = vc.template('<div class="vc_message_box vc_message_box-standard vc_message_box-rounded vc_color-<%- color %>"><div class="vc_message_box-icon"><i class="fa fa fa-<%- icon %>"></i></div><p><%- text %></p></div>');
            switch (type) {
                case "error":
                    $messageBox = $('<div class="' + wrapperCssClasses + '" data-vc-panel-message>').html(messageBoxTemplate({
                        color: "danger",
                        icon: "times",
                        text: text
                    }));
                    break;
                case "warning":
                    $messageBox = $('<div class="' + wrapperCssClasses + '" data-vc-panel-message>').html(messageBoxTemplate({
                        color: "warning",
                        icon: "exclamation-triangle",
                        text: text
                    }));
                    break;
                case "success":
                    $messageBox = $('<div class="' + wrapperCssClasses + '" data-vc-panel-message>').html(messageBoxTemplate({
                        color: "success",
                        icon: "check",
                        text: text
                    }))
            }
            $messageBox.prependTo(this.$el.find('[data-vc-ui-element="panel-edit-element-tab"].vc_row.vc_active')), $messageBox.fadeIn(), this.message_box_timeout = window.setTimeout(function () {
                $messageBox.remove()
            }, 6e3)
        },
        changeTab: function (e) {
            e.preventDefault(), e && !e.isClearSearch && this.clearSearch();
            var $tab = $(e.currentTarget);
            $tab.parent().hasClass("vc_active") || (this.$el.find('[data-vc-ui-element="panel-tabs-controls"] .vc_active:not([data-vc-ui-element="panel-tabs-line-dropdown"])').removeClass("vc_active"), $tab.parent().addClass("vc_active"), this.$el.find('[data-vc-ui-element="panel-edit-element-tab"].vc_active').removeClass("vc_active"), this.$el.find($tab.data("vcUiElementTarget")).addClass("vc_active"), this.$tabsMenu && this.$tabsMenu.vcTabsLine("checkDropdownContainerActive"))
        },
        setPreviewFrameHeight: function (templateID, height) {
            parseInt(height) < 100 && (height = 100), $('data-vc-template-preview-frame="' + templateID + '"').height(height)
        }
    }), vc.TemplateWindowUIPanelBackendEditor.prototype.events = $.extend(!0, vc.TemplateWindowUIPanelBackendEditor.prototype.events, {
        'click [data-vc-ui-element="button-save"]': "save",
        'click [data-vc-ui-element="button-close"]': "hide",
        'click [data-vc-ui-element="button-minimize"]': "toggleOpacity",
        "keyup [data-vc-templates-name-filter]": "searchTemplate",
        "search [data-vc-templates-name-filter]": "searchTemplate",
        "click .vc_template-save-btn": "saveTemplate",
        "click [data-template_id] [data-template-handler]": "loadTemplate",
        'click [data-vc-container=".vc_ui-list-bar"][data-vc-preview-handler]': "buildTemplatePreview",
        'click [data-vc-ui-delete="template-title"]': "removeTemplate",
        'click [data-vc-ui-element="panel-tab-control"]': "changeTab"
    }), vc.TemplateWindowUIPanelFrontendEditor = vc.TemplatesPanelViewFrontend.vcExtendUI(vc.HelperPanelViewHeaderFooter).vcExtendUI(vc.HelperTemplatesPanelViewSearch).extend({
        panelName: "template_window",
        showMessageDisabled: !1,
        show: function () {
            this.clearSearch(), vc.TemplateWindowUIPanelFrontendEditor.__super__.show.call(this)
        },
        showMessage: function (text, type) {
            if (this.showMessageDisabled) return !1;
            this.message_box_timeout && this.$el.find("[data-vc-panel-message]").remove() && window.clearTimeout(this.message_box_timeout), this.message_box_timeout = !1;
            var $messageBox, wrapperCssClasses, messageBoxTemplate = vc.template('<div class="vc_message_box vc_message_box-standard vc_message_box-rounded vc_color-<%- color %>"><div class="vc_message_box-icon"><i class="fa fa fa-<%- icon %>"></i></div><p><%- text %></p></div>');
            switch (wrapperCssClasses = "vc_col-xs-12 wpb_element_wrapper", type) {
                case "error":
                    $messageBox = $('<div class="' + wrapperCssClasses + '" data-vc-panel-message>').html(messageBoxTemplate({
                        color: "danger",
                        icon: "times",
                        text: text
                    }));
                    break;
                case "warning":
                    $messageBox = $('<div class="' + wrapperCssClasses + '" data-vc-panel-message>').html(messageBoxTemplate({
                        color: "warning",
                        icon: "exclamation-triangle",
                        text: text
                    }));
                    break;
                case "success":
                    $messageBox = $('<div class="' + wrapperCssClasses + '" data-vc-panel-message>').html(messageBoxTemplate({
                        color: "success",
                        icon: "check",
                        text: text
                    }))
            }
            $messageBox.prependTo(this.$el.find('[data-vc-ui-element="panel-edit-element-tab"].vc_row.vc_active')), $messageBox.fadeIn(), this.message_box_timeout = window.setTimeout(function () {
                $messageBox.remove()
            }, 6e3)
        },
        changeTab: function (e) {
            e.preventDefault(), e && !e.isClearSearch && this.clearSearch();
            var $tab = $(e.currentTarget);
            $tab.parent().hasClass("vc_active") || (this.$el.find('[data-vc-ui-element="panel-tabs-controls"] .vc_active:not([data-vc-ui-element="panel-tabs-line-dropdown"])').removeClass("vc_active"), $tab.parent().addClass("vc_active"), this.$el.find('[data-vc-ui-element="panel-edit-element-tab"].vc_active').removeClass("vc_active"), this.$el.find($tab.data("vcUiElementTarget")).addClass("vc_active"), this.$tabsMenu && this.$tabsMenu.vcTabsLine("checkDropdownContainerActive"))
        }
    }), $.fn.vcAccordion.Constructor.prototype.collapseTemplate = function (showCallback) {
        var $allTriggers, $activeTriggers, $this, $triggers;
        $this = this.$element;
        var i;
        if (i = 0, $allTriggers = this.getContainer().find("[data-vc-preview-handler]").each(function () {
                var accordion, $this;
                $this = $(this), accordion = $this.data("vc.accordion"), void 0 === accordion && ($this.vcAccordion(), accordion = $this.data("vc.accordion")), accordion && accordion.setIndex && accordion.setIndex(i++)
            }), $activeTriggers = $allTriggers.filter(function () {
                var $this, accordion;
                return $this = $(this), accordion = $this.data("vc.accordion"), accordion.getTarget().hasClass(accordion.activeClass)
            }), $triggers = $activeTriggers.filter(function () {
                return $this[0] !== this
            }), $triggers.length && $.fn.vcAccordion.call($triggers, "hide"), this.isActive()) $.fn.vcAccordion.call($this, "hide");
        else {
            $.fn.vcAccordion.call($this, "show");
            var $triggerPanel = $this.closest(".vc_ui-list-bar-item"),
                $wrapper = $this.closest("[data-template_id]"),
                $panel = $wrapper.closest("[data-vc-ui-element=panel-content]").parent();
            setTimeout(function () {
                if (Math.round($wrapper.offset().top - $panel.offset().top) < 0) {
                    var posit = Math.round($wrapper.offset().top - $panel.offset().top + $panel.scrollTop() - $triggerPanel.height());
                    $panel.animate({
                        scrollTop: posit
                    }, 400)
                }
                "function" == typeof showCallback && showCallback($wrapper, $panel)
            }, 400)
        }
    }
}(window.jQuery),
function ($) {
    "use strict";
    vc.element_start_index = 0, vc.AddElementUIPanelBackendEditor = vc.PanelView.vcExtendUI(vc.HelperPanelViewHeaderFooter).extend({
        el: "#vc_ui-panel-add-element",
        searchSelector: "#vc_elements_name_filter",
        prepend: !1,
        builder: "",
        events: {
            'click [data-vc-ui-element="button-close"]': "hide",
            'click [data-vc-ui-element="panel-tab-control"]': "filterElements",
            "click .vc_shortcode-link": "createElement",
            "keyup #vc_elements_name_filter": "filterElements",
            "search #vc_elements_name_filter": "filterElements",
            "click [data-vc-manage-elements]": "openPresetWindow"
        },
        initialize: function () {
            vc.AddElementUIPanelBackendEditor.__super__.initialize.call(this), vc.events.on("shortcodes:add", this.addCustomCssStyleTag.bind(this)), vc.events.on("vc:savePreset", this.updateAddElementPopUp.bind(this)), vc.events.on("vc:deletePreset", this.removePresetFromAddElementPopUp.bind(this))
        },
        render: function (model, prepend) {
            return _.isUndefined(vc.ShortcodesBuilder) || (this.builder = new vc.ShortcodesBuilder), this.$el.is(":hidden") && vc.closeActivePanel(), vc.active_panel = this, this.prepend = !!_.isBoolean(prepend) && prepend, this.place_after_id = !!_.isString(prepend) && prepend, this.model = !!_.isObject(model) && model, this.$content = this.$el.find('[data-vc-ui-element="panel-add-element-list"]'), this.$buttons = $('[data-vc-ui-element="add-element-button"]', this.$content), this.buildFiltering(), this.$el.find('[data-vc-ui-element="panel-tab-control"]').eq(0).click(), this.show(), this.$el.find('[data-vc-ui-element="panel-tabs-controls"]').vcTabsLine("moveTabs"), vc.is_mobile || $(this.searchSelector).focus(), vc.AddElementUIPanelBackendEditor.__super__.render.call(this)
        },
        buildFiltering: function () {
            var itemSelector, tag, notIn, asParent, parentSelector;
            itemSelector = '[data-vc-ui-element="add-element-button"]', notIn = this._getNotIn(this.model ? this.model.get("shortcode") : ""), $(this.searchSelector).val(""), this.$content.addClass("vc_filter-all"), this.$content.attr("data-vc-ui-filter", "*"), tag = this.model ? this.model.get("shortcode") : "vc_column", asParent = !(!tag || _.isUndefined(vc.getMapped(tag).as_parent)) && vc.getMapped(tag).as_parent, _.isObject(asParent) ? (parentSelector = [], _.isString(asParent.only) && parentSelector.push(_.reduce(asParent.only.replace(/\s/, "").split(","), function (memo, val) {
                return memo + (_.isEmpty(memo) ? "" : ",") + '[data-element="' + val.trim() + '"]'
            }, "")), _.isString(asParent.except) && parentSelector.push(_.reduce(asParent.except.replace(/\s/, "").split(","), function (memo, val) {
                return memo + ':not([data-element="' + val.trim() + '"])'
            }, "")), itemSelector += parentSelector.join(",")) : notIn && (itemSelector = notIn), !1 === tag || _.isUndefined(vc.getMapped(tag).allowed_container_element) || (!1 === vc.getMapped(tag).allowed_container_element ? itemSelector += ":not([data-is-container=true])" : _.isString(vc.getMapped(tag).allowed_container_element) && (itemSelector += ":not([data-is-container=true]), [data-element=" + vc.getMapped(tag).allowed_container_element + "]")), this.$buttons.removeClass("vc_visible").addClass("vc_inappropriate"), $(itemSelector, this.$content).removeClass("vc_inappropriate").addClass("vc_visible"), this.hideEmptyFilters()
        },
        hideEmptyFilters: function () {
            var _this = this;
            this.$el.find('[data-vc-ui-element="panel-add-element-tab"].vc_active').removeClass("vc_active"), this.$el.find('[data-vc-ui-element="panel-add-element-tab"]:first').addClass("vc_active"), this.$el.find("[data-filter]").each(function () {
                $($(this).data("filter") + ".vc_visible:not(.vc_inappropriate)", _this.$content).length ? $(this).parent().show() : $(this).parent().hide()
            })
        },
        _getNotIn: _.memoize(function (tag) {
            return '[data-vc-ui-element="add-element-button"]:not(' + _.reduce(vc.map, function (memo, shortcode) {
                var separator;
                return separator = _.isEmpty(memo) ? "" : ",", _.isObject(shortcode.as_child) ? (_.isString(shortcode.as_child.only) && (_.contains(shortcode.as_child.only.replace(/\s/, "").split(","), tag) || (memo += separator + "[data-element=" + shortcode.base + "]")), _.isString(shortcode.as_child.except) && _.contains(shortcode.as_child.except.replace(/\s/, "").split(","), tag) && (memo += separator + "[data-element=" + shortcode.base + "]")) : !1 === shortcode.as_child && (memo += separator + "[data-element=" + shortcode.base + "]"), memo
            }, "") + ")"
        }),
        filterElements: function (e) {
            _.isObject(e) ? e.preventDefault() && e.stopPropagation() : e = window.event;
            var filterValue, $visibleElements, $control = $(e.currentTarget),
                filter = '[data-vc-ui-element="add-element-button"]',
                nameFilter = $(this.searchSelector).val();
            this.$content.removeClass("vc_filter-all"), $('[data-vc-ui-element="panel-add-element-tab"].vc_active').removeClass("vc_active"), $control.is("[data-filter]") ? ($control.parent().addClass("vc_active"), filterValue = $control.data("filter"), filter += filterValue, "*" === filterValue ? this.$content.addClass("vc_filter-all") : this.$content.removeClass("vc_filter-all"), this.$content.attr("data-vc-ui-filter", filterValue.replace(".js-category-", "")), $(this.searchSelector).val("")) : nameFilter.length ? (filter += ":containsi('" + nameFilter + "'):not('.vc_element-deprecated')", this.$content.attr("data-vc-ui-filter", "name:" + nameFilter)) : nameFilter.length || ($('[data-vc-ui-element="panel-tab-control"][data-filter="*"]').parent().addClass("vc_active"), this.$content.attr("data-vc-ui-filter", "*").addClass("vc_filter-all")), $(".vc_visible", this.$content).removeClass("vc_visible"), $(filter, this.$content).addClass("vc_visible"), nameFilter.length && 13 === (e.keyCode || e.which) && ($visibleElements = $(".vc_visible:not(.vc_inappropriate)", this.$content), 1 === $visibleElements.length && $visibleElements.find("[data-vc-clickable]").click())
        },
        createElement: function (e) {
            e && e.preventDefault && e.preventDefault();
            var model, column, row, showSettings, row_params, inner_row_params, column_params, inner_column_params, tag, $control, preset, presetType, closestPreset;
            if ($control = $(e.currentTarget), tag = $control.data("tag"), row_params = {}, column_params = {
                    width: "1/1"
                }, closestPreset = $control.closest("[data-preset]"), closestPreset && (preset = closestPreset.data("preset"), presetType = closestPreset.data("element")), !1 === this.model)
                if (vc.storage.lock(), "vc_section" === tag) {
                    var modelOptions = {
                        shortcode: tag
                    };
                    preset && "vc_section" === presetType && (modelOptions.preset = preset), model = vc.shortcodes.create(modelOptions)
                } else {
                    var rowOptions = {
                        shortcode: "vc_row",
                        params: row_params
                    };
                    preset && presetType === tag && (rowOptions.preset = preset), row = vc.shortcodes.create(rowOptions);
                    var columnOptions = {
                        shortcode: "vc_column",
                        params: column_params,
                        parent_id: row.id,
                        root_id: row.id
                    };
                    if (preset && "vc_column" === presetType && (columnOptions.preset = preset), column = vc.shortcodes.create(columnOptions), model = row, "vc_row" !== tag) {
                        var options = {
                            shortcode: tag,
                            parent_id: column.id,
                            root_id: row.id
                        };
                        preset && presetType === tag && (options.preset = preset), model = vc.shortcodes.create(options)
                    }
                }
            else if ("vc_row" === tag) "vc_section" === this.model.get("shortcode") ? (vc.storage.lock(), row = vc.shortcodes.create({
                shortcode: "vc_row",
                params: row_params,
                parent_id: this.model.id,
                order: this.prepend ? this.getFirstPositionIndex() : vc.shortcodes.getNextOrder()
            }), column = vc.shortcodes.create({
                shortcode: "vc_column",
                params: column_params,
                parent_id: row.id,
                root_id: row.id
            }), model = row) : (inner_row_params = {}, inner_column_params = {
                width: "1/1"
            }, vc.storage.lock(), row = vc.shortcodes.create({
                shortcode: "vc_row_inner",
                params: inner_row_params,
                parent_id: this.model.id,
                order: this.prepend ? this.getFirstPositionIndex() : vc.shortcodes.getNextOrder()
            }), column = vc.shortcodes.create({
                shortcode: "vc_column_inner",
                params: inner_column_params,
                parent_id: row.id,
                root_id: row.id
            }), model = row);
            else {
                var options = {
                    shortcode: tag,
                    parent_id: this.model.id,
                    order: this.prepend ? this.getFirstPositionIndex() : vc.shortcodes.getNextOrder(),
                    root_id: this.model.get("root_id")
                };
                preset && presetType === tag && (options.preset = preset), model = vc.shortcodes.create(options)
            }
            this.model = model, showSettings = !(_.isBoolean(vc.getMapped(tag).show_settings_on_create) && !1 === vc.getMapped(tag).show_settings_on_create), this.model.get("shortcode"), this.hide(), showSettings && this.showEditForm()
        },
        getFirstPositionIndex: function () {
            return vc.element_start_index -= 1, vc.element_start_index
        },
        show: function () {
            this.$el.addClass("vc_active"), this.trigger("show")
        },
        hide: function () {
            this.$el.removeClass("vc_active"), vc.active_panel = !1, this.trigger("hide")
        },
        showEditForm: function () {
            vc.edit_element_block_view.render(this.model)
        },
        addCustomCssStyleTag: function (model) {
            if (model && model.getParam) {
                var customCss;
                customCss = model.getParam("css"), customCss && vc.frame_window && vc.frame_window.vc_iframe.setCustomShortcodeCss(customCss)
            }
        },
        updateAddElementPopUp: function (id, shortcode, title, data) {
            var $presetShortcode = this.$el.find('[data-element="' + shortcode + '"]:first'),
                $newPreset = $presetShortcode.clone(!0);
            vc_all_presets[id] = data, $newPreset.find("[data-vc-shortcode-name]").text(title), $newPreset.find(".vc_element-description").text(""), $newPreset.attr("data-preset", id), $newPreset.addClass("js-category-_my_elements_"), $newPreset.insertAfter(this.$el.find('[data-element="' + shortcode + '"]:last')), this.$el.find('[data-filter="js-category-_my_elements_"]').show();
            var $samplePreset = this.$body.find('[data-vc-ui-element="panel-preset"] [data-vc-presets-list-content] .vc_ui-template:first'),
                $newPreset = $samplePreset.clone(!0);
            $newPreset.find('[data-vc-ui-element="template-title"]').attr("title", title).text(title), $newPreset.find('[data-vc-ui-delete="preset-title"]').attr("data-preset", id).attr("data-preset-parent", shortcode), $newPreset.find("[data-vc-ui-add-preset]").attr("data-preset", id).attr("id", shortcode).attr("data-tag", shortcode), $newPreset.show(), $newPreset.insertAfter(this.$body.find('[data-vc-ui-element="panel-preset"] [data-vc-presets-list-content] .vc_ui-template:last'))
        },
        removePresetFromAddElementPopUp: function (id) {
            this.$el.find('[data-preset="' + id + '"]').remove()
        },
        openPresetWindow: function (e) {
            e && e.preventDefault && e.preventDefault(), vc.preset_panel_view.render().show()
        }
    }), vc.AddElementUIPanelFrontendEditor = vc.AddElementUIPanelBackendEditor.vcExtendUI(vc.HelperPanelViewHeaderFooter).extend({
        events: {
            'click [data-vc-ui-element="button-close"]': "hide",
            'click [data-vc-ui-element="panel-tab-control"]': "filterElements",
            "click .vc_shortcode-link": "createElement",
            "keyup #vc_elements_name_filter": "filterElements"
        },
        createElement: function (e) {
            e && e.preventDefault && e.preventDefault();
            var showSettings, newData, i, column_params, row_params, inner_row_params, inner_column_params, $control, tag, preset, presetType, closestPreset;
            if ($control = $(e.currentTarget), tag = $control.data("tag"), row_params = {}, column_params = {
                    width: "1/1"
                }, closestPreset = $control.closest("[data-preset]"), closestPreset && (preset = closestPreset.data("preset"), presetType = closestPreset.data("element")), this.prepend && (vc.activity = "prepend"), 0 == this.model)
                if ("vc_section" === tag) {
                    var modelOptions = {
                        shortcode: tag
                    };
                    preset && "vc_section" === presetType && (modelOptions.preset = preset), this.builder.create(modelOptions), this.model = this.builder.last()
                } else {
                    var rowOptions = {
                        shortcode: "vc_row",
                        params: row_params
                    };
                    preset && "vc_row" === presetType && (rowOptions.preset = preset), this.builder.create(rowOptions);
                    var columnOptions = {
                        shortcode: "vc_column",
                        parent_id: this.builder.lastID(),
                        params: column_params
                    };
                    if (preset && "vc_column" === presetType && (columnOptions.preset = preset), this.builder.create(columnOptions), "vc_row" !== tag) {
                        var options = {
                            shortcode: tag,
                            parent_id: this.builder.lastID()
                        };
                        preset && presetType === tag && (options.preset = preset), this.builder.create(options)
                    }
                    this.model = this.builder.last()
                }
            else if ("vc_row" === tag) "vc_section" === this.model.get("shortcode") ? (this.builder.create({
                shortcode: "vc_row",
                params: row_params,
                parent_id: this.model.id,
                order: this.prepend ? this.getFirstPositionIndex() : vc.shortcodes.nextOrder()
            }).create({
                shortcode: "vc_column",
                params: column_params,
                parent_id: this.builder.lastID()
            }), this.model = this.builder.last()) : (inner_row_params = {}, inner_column_params = {
                width: "1/1"
            }, this.builder.create({
                shortcode: "vc_row_inner",
                params: inner_row_params,
                parent_id: this.model.id,
                order: this.prepend ? this.getFirstPositionIndex() : vc.shortcodes.nextOrder()
            }).create({
                shortcode: "vc_column_inner",
                params: inner_column_params,
                parent_id: this.builder.lastID()
            }), this.model = this.builder.last());
            else {
                var options = {
                    shortcode: tag,
                    parent_id: this.model.id,
                    order: this.prepend ? this.getFirstPositionIndex() : vc.shortcodes.nextOrder()
                };
                preset && presetType === tag && (options.preset = preset), this.builder.create(options), this.model = this.builder.last()
            }
            for (i = this.builder.models.length - 1; i >= 0; i--) this.builder.models[i].get("shortcode");
            _.isString(vc.getMapped(tag).default_content) && vc.getMapped(tag).default_content.length && (newData = this.builder.parse({}, vc.getMapped(tag).default_content, this.builder.last().toJSON()), _.each(newData, function (object) {
                object.default_content = !0, this.builder.create(object)
            }, this)), this.model = this.builder.last(), showSettings = !(_.isBoolean(vc.getMapped(tag).show_settings_on_create) && !1 === vc.getMapped(tag).show_settings_on_create), this.hide(), showSettings && this.showEditForm(), this.builder.render()
        }
    })
}(window.jQuery),
function ($) {
    "use strict";
    vc.ExtendPresets = {
        settingsMenuSelector: '[data-vc-ui-element="settings-dropdown-list"]',
        settingsButtonSelector: '[data-vc-ui-element="settings-dropdown-button"]',
        settingsDropdownSelector: '[data-vc-ui-element="settings-dropdown"]',
        settingsPresetId: null,
        uiEvents: {
            init: "addEvents",
            render: "hideDropdown",
            afterRender: "afterRenderActions"
        },
        afterRenderActions: function () {
            this.untaintSettingsPresetData(), this.showDropdown()
        },
        hideDropdown: function () {
            this.$el.find('[data-vc-ui-element="settings-dropdown"]').hide()
        },
        showDropdown: function () {
            var tag = this.model.get("shortcode");
            window.vc_settings_show && "vc_column" !== tag && this.$el.find('[data-vc-ui-element="settings-dropdown"]').show()
        },
        showDropdownMenu: function () {
            var tag = this.model.get("shortcode"),
                $this = $(this);
            $this.data("vcSettingsMenuLoaded") && tag === $this.data("vcShortcodeName") || this.reloadSettingsMenuContent()
        },
        addEvents: function () {
            var $tab = this.$el.find(".vc_edit-form-tab.vc_active"),
                tag = this.model.get("shortcode"),
                _this = this;
            $(document).off("beforeMinimize.vc.paramWindow", this.minimizeButtonSelector).on("beforeMinimize.vc.paramWindow", this.minimizeButtonSelector, function () {
                $tab.find(".vc_ui-prompt-presets .vc_ui-prompt-close").trigger("click")
            }), $(document).off("close.vc.paramWindow", this.closeButtonSelector).on("beforeClose.vc.paramWindow", this.closeButtonSelector, function () {
                $tab.find(".vc_ui-prompt-presets .vc_ui-prompt-close").trigger("click")
            }), $(document).off("show.vc.accordion", this.settingsButtonSelector).on("show.vc.accordion", this.settingsButtonSelector, function () {
                var $this = $(this);
                $this.data("vcSettingsMenuLoaded") && tag === $this.data("vcShortcodeName") || _this.reloadSettingsMenuContent()
            })
        },
        saveSettingsAjaxData: function (shortcode_name, title, is_default, data) {
            return {
                action: "vc_action_save_settings_preset",
                shortcode_name: shortcode_name,
                is_default: is_default ? 1 : 0,
                vc_inline: !0,
                title: title,
                data: data,
                _vcnonce: window.vcAdminNonce
            }
        },
        saveSettings: function (title, is_default) {
            var shortcode_name = this.model.get("shortcode"),
                data = JSON.stringify(this.getParamsForSettingsPreset());
            if (void 0 !== title && title.length) return void 0 === is_default && (is_default = !1), this.checkAjax(), this.ajax = $.ajax({
                type: "POST",
                dataType: "json",
                url: window.ajaxurl,
                data: this.saveSettingsAjaxData(shortcode_name, title, is_default, data),
                context: this
            }).done(function (response) {
                response.success && (this.setSettingsMenuContent(response.html), this.settingsPresetId = response.id, this.untaintSettingsPresetData())
            }).always(this.resetAjax), this.ajax
        },
        fetchSaveSettingsDialogAjaxData: function () {
            return {
                action: "vc_action_render_settings_preset_title_prompt",
                vc_inline: !0,
                _vcnonce: window.vcAdminNonce
            }
        },
        fetchSaveSettingsDialog: function (callback) {
            var $contentContainer = this.$el.find(".vc_ui-panel-content-container");
            if ($contentContainer.find(".vc_ui-prompt-presets").length) return void(void 0 !== callback && callback(!1));
            this.checkAjax(), this.ajax = $.ajax({
                type: "POST",
                dataType: "json",
                url: window.ajaxurl,
                data: this.fetchSaveSettingsDialogAjaxData()
            }).done(function (response) {
                response.success && ($contentContainer.prepend(response.html), void 0 !== callback && callback(!0))
            }).fail(function () {
                void 0 !== callback && callback(!1)
            }).always(this.resetAjax)
        },
        showSaveSettingsDialog: function (is_default) {
            var _this = this;
            this.isSettingsPresetDefault = !!is_default, this.fetchSaveSettingsDialog(function (created) {
                var $contentContainer = _this.$el.find(".vc_ui-panel-content-container"),
                    $prompt = $contentContainer.find(".vc_ui-prompt-presets"),
                    $title = $prompt.find(".textfield");
                $contentContainer.find(".vc_ui-prompt.vc_visible").removeClass("vc_visible");
                var $viewPresetsButton = $prompt.find("[data-vc-view-settings-preset]");
                if ("undefined" !== window.vc_vendor_settings_presets[_this.model.get("shortcode")] ? $viewPresetsButton.removeAttr("disabled") : $viewPresetsButton.attr("disabled", "disabled"), $prompt.addClass("vc_visible"), $title.focus(), $contentContainer.addClass("vc_ui-content-hidden"), created) {
                    var $btn = $prompt.find("#vc_ui-save-preset-btn"),
                        delay = 0;
                    $prompt.on("submit", function () {
                        var title = $title.val();
                        return !!title.length && (_this.saveSettings(title, _this.isSettingsPresetDefault).done(function (e) {
                            var data = this.getParamsForSettingsPreset();
                            $title.val(""), _this.setCustomButtonMessage($btn, void 0, void 0, !0), vc.events.trigger("vc:savePreset", e.id, _this.model.get("shortcode"), title, data), delay = _.delay(function () {
                                $prompt.removeClass("vc_visible"), $contentContainer.removeClass("vc_ui-content-hidden")
                            }, 5e3)
                        }).fail(function () {
                            _this.setCustomButtonMessage($btn, window.i18nLocale.ui_danger, "danger", !0)
                        }), !1)
                    }), $prompt.on("click", ".vc_ui-prompt-close", function () {
                        return _this.checkAjax(), $prompt.removeClass("vc_visible"), $contentContainer.removeClass("vc_ui-content-hidden"), _this.clearCustomButtonMessage.call(this, $btn), delay && (window.clearTimeout(delay), delay = 0), !1
                    })
                }
            })
        },
        loadSettingsAjaxData: function (id) {
            return {
                action: "vc_action_get_settings_preset",
                vc_inline: !0,
                id: id,
                _vcnonce: window.vcAdminNonce
            }
        },
        loadSettings: function (id) {
            return this.panelInit = !1, this.checkAjax(), this.ajax = $.ajax({
                type: "POST",
                dataType: "json",
                url: window.ajaxurl,
                data: this.loadSettingsAjaxData(id),
                context: this
            }).done(function (response) {
                response.success && (this.settingsPresetId = id, this.applySettingsPreset(response.data))
            }).always(this.resetAjax), this.ajax
        },
        saveAsDefaultSettingsAjaxData: function (shortcode_name, id) {
            return {
                action: "vc_action_set_as_default_settings_preset",
                shortcode_name: shortcode_name,
                id: id,
                vc_inline: !0,
                _vcnonce: window.vcAdminNonce
            }
        },
        saveAsDefaultSettings: function (id, doneCallback) {
            var shortcode_name = this.model.get("shortcode"),
                presetId = id || this.settingsPresetId;
            presetId ? (this.checkAjax(), this.ajax = $.ajax({
                type: "POST",
                dataType: "json",
                url: window.ajaxurl,
                data: this.saveAsDefaultSettingsAjaxData(shortcode_name, presetId),
                context: this
            }).done(function (response) {
                response.success && (this.setSettingsMenuContent(response.html), this.untaintSettingsPresetData(), doneCallback && doneCallback())
            }).always(this.resetAjax)) : this.showSaveSettingsDialog(!0)
        },
        restoreDefaultSettingsAjaxData: function (shortcode_name) {
            return {
                action: "vc_action_restore_default_settings_preset",
                shortcode_name: shortcode_name,
                vc_inline: !0,
                _vcnonce: window.vcAdminNonce
            }
        },
        restoreDefaultSettings: function () {
            var shortcode_name = this.model.get("shortcode");
            this.checkAjax(), this.ajax = $.ajax({
                type: "POST",
                dataType: "json",
                url: window.ajaxurl,
                data: this.restoreDefaultSettingsAjaxData(shortcode_name),
                context: this
            }).done(function (response) {
                response.success && this.setSettingsMenuContent(response.html)
            }).always(this.resetAjax)
        },
        setSettingsMenuContent: function (html) {

            var $button = this.$el.find(this.settingsButtonSelector),
                $menu = this.$el.find(this.settingsMenuSelector),
                shortcode_name = this.model.get("shortcode"),
                _this = this;
            $button.data("vcShortcodeName", shortcode_name), $menu.html(html), window.vc_presets_data && window.vc_presets_data.presetsCount > 0 ? $menu.find("[data-vc-view-settings-preset]").removeAttr("disabled") : $menu.find("[data-vc-view-settings-preset]").attr("disabled", "disabled"), $menu.find("[data-vc-view-settings-preset]").on("click", function () {
                _this.showViewSettingsList(), _this.closeSettings()
            }), $menu.find("[data-vc-save-settings-preset]").on("click", function () {
                _this.showSaveSettingsDialog(), _this.closeSettings()
            }), $menu.find("[data-vc-save-template]").on("click", function () {
                _this.showSaveTemplateDialog(), _this.closeSettings()
            }), $menu.find("[data-vc-save-default-settings-preset]").on("click", function () {
                _this.saveAsDefaultSettings(), _this.closeSettings()
            }), $menu.find("[data-vc-restore-default-settings-preset]").on("click", function () {
                _this.restoreDefaultSettings(), _this.closeSettings()
            })
        },
        reloadSettingsMenuContentAjaxData: function (shortcode_name) {
            return {
                action: "vc_action_render_settings_preset_popup",
                shortcode_name: shortcode_name,
                vc_inline: !0,
                _vcnonce: window.vcAdminNonce
            }
        },
        showViewSettingsList: function () {
            var $contentContainer = this.$el.find(".vc_ui-panel-content-container");
            if ($contentContainer.find(".vc_ui-prompt-view-presets:not(.vc_visible)").remove(), !$contentContainer.find(".vc_ui-prompt-view-presets").length) {
                $contentContainer.find(".vc_ui-prompt.vc_visible").removeClass("vc_visible");
                var _this = this,
                    $prompt = jQuery('<form class="vc_ui-prompt vc_ui-prompt-view-presets"><div class="vc_ui-prompt-controls"><button type="button" class="vc_general vc_ui-control-button vc_ui-prompt-close"><i class="vc-composer-icon vc-c-icon-close"></i></button></div><div class="vc_ui-prompt-title"><label for="prompt_title" class="wpb_element_label">Elements</label></div><div class="vc_ui-prompt-content"><div class="vc_ui-prompt-column"><div class="vc_ui-template-list vc_ui-list-bar" data-vc-action="collapseAll" style="margin-top: 20px;" data-vc-presets-list-content></div></div></div>');
                this.buildsettingsListContent($prompt), $prompt.appendTo($contentContainer), $prompt.addClass("vc_visible"), $contentContainer.addClass("vc_ui-content-hidden");
                var closePrompt = function () {
                    return $prompt.remove(), $contentContainer.removeClass("vc_ui-content-hidden"), !1
                };
                $prompt.off("click.vc1").on("click.vc1", "[data-vc-load-settings-preset]", function (e) {
                    _this.loadSettings($(e.currentTarget).data("vcLoadSettingsPreset")), closePrompt()
                }), $prompt.off("click.vc4").on("click.vc4", "[data-vc-set-default-settings-preset]", function () {
                    _this.saveAsDefaultSettings($(this).data("vcSetDefaultSettingsPreset"), function () {
                        _this.buildsettingsListContent($prompt)
                    })
                }), $prompt.off("click.vc3").on("click.vc3", ".vc_ui-prompt-close", function () {
                    closePrompt(), _this.checkAjax()
                })
            }
        },
        buildsettingsListContent: function ($prompt) {
            var itemsTemplate = vc.template('<div class="vc_ui-template"><div class="vc_ui-list-bar-item"><button class="vc_ui-list-bar-item-trigger" title="Apply Element" type="button" data-vc-load-settings-preset="<%- id %>"><%- title %></button><div class="vc_ui-list-bar-item-actions"><button class="vc_general vc_ui-control-button" title="Apply Element" type="button" data-vc-load-settings-preset="<%- id %>"><i class="vc-composer-icon vc-c-icon-add"></i></button><button class="vc_general vc_ui-control-button" title="Delete Element" type="button" data-vc-delete-settings-preset="<%- id %>"><i class="vc-composer-icon vc-c-icon-delete_empty"></i></button></div></div></div>'),
                $content = $prompt.find("[data-vc-presets-list-content]");
            $content.empty(), _.each(window.vc_presets_data.presets[0], function (item, id) {
                var title = item;
                window.vc_presets_data.defaultId > 0 && parseInt(id) === window.vc_presets_data.defaultId && (title = item + " (default)"), $content.append(itemsTemplate({
                    title: title,
                    id: id
                }))
            }), _.each(window.vc_presets_data.presets[1], function (item, id) {
                var title = item;
                window.vc_presets_data.defaultId > 0 && parseInt(id) === window.vc_presets_data.defaultId && (title = item + " (default)"), $content.append(itemsTemplate({
                    title: title,
                    id: id
                }))
            })
        },
        reloadSettingsMenuContent: function () {
            var shortcode_name = this.model.get("shortcode"),
                $button = this.$el.find(this.settingsButtonSelector),
                success = !1;
            return this.setSettingsMenuContent(""), this.checkAjax(), this.ajax = $.ajax({
                type: "POST",
                dataType: "json",
                url: window.ajaxurl,
                data: this.reloadSettingsMenuContentAjaxData(shortcode_name),
                context: this
            }).done(function (response) {
                response.success && (success = !0, this.setSettingsMenuContent(response.html), $button.data("vcSettingsMenuLoaded", !0))
            }).always(function () {
                success || this.closeSettings(), this.resetAjax()
            }), this.ajax
        },
        closeSettings: function (destroy) {
            void 0 === destroy && (destroy = !1);
            var $menu = this.$el.find(this.settingsMenuSelector),
                $button = this.$el.find(this.settingsButtonSelector);
            destroy && ($button.data("vcSettingsMenuLoaded", !1), $menu.html("")), $button.vcAccordion("hide")
        },
        isSettingsPresetDataTainted: function () {
            var params = JSON.stringify(this.getParamsForSettingsPreset());
            return params = params.replace(/vc_custom_\d+/, ""), this.$el.data("vcSettingsPresetHash") !== vc_globalHashCode(params)
        },
        untaintSettingsPresetData: function () {
            var params = JSON.stringify(this.getParamsForSettingsPreset());
            params = params.replace(/vc_custom_\d+/, ""), this.$el.data("vcSettingsPresetHash", vc_globalHashCode(params))
        },
        applySettingsPresetAjaxData: function (params) {
            var parent_id;
            return parent_id = this.model.get("parent_id"), {
                action: "vc_edit_form",
                tag: this.model.get("shortcode"),
                parent_tag: parent_id ? vc.shortcodes.get(parent_id).get("shortcode") : null,
                post_id: $("#post_ID").val(),
                params: params,
                _vcnonce: window.vcAdminNonce
            }
        },
        applySettingsPreset: function (params) {
            return this.currentModelParams = params, vc.events.trigger("presets:apply", this.model, params), this._killEditor(), this.trigger("render"), this.show(), this.checkAjax(), this.ajax = $.ajax({
                type: "POST",
                url: window.ajaxurl,
                data: this.applySettingsPresetAjaxData(params),
                context: this
            }).done(this.buildParamsContent).always(this.resetAjax), this
        },
        getParamsForSettingsPreset: function () {
            var shortcode = this.model.get("shortcode"),
                params = this.getParams();
            return "vc_column" !== shortcode && "vc_column_inner" !== shortcode || (delete params.width, delete params.offset), params
        }
    }, vc.events.on("presets.apply", function (model, params) {
        return "vc_tta_section" === model.get("shortcode") && void 0 !== params.tab_id && (params.tab_id = vc_guid() + "-cl"), params
    })
}(window.jQuery),
function ($) {
    "use strict";
    vc.ExtendTemplates = {
        fetchSaveTemplateDialogAjaxData: function () {
            return {
                action: "vc_action_render_settings_templates_prompt",
                vc_inline: !0,
                _vcnonce: window.vcAdminNonce
            }
        },
        fetchSaveTemplateDialog: function (callback) {
            var $tab = this.$el.find(".vc_ui-panel-content-container");
            return $tab.find(".vc_ui-prompt-templates").length ? void(void 0 !== callback && callback(!1)) : (this.checkAjax(), this.ajax = $.ajax({
                type: "POST",
                dataType: "json",
                url: window.ajaxurl,
                data: this.fetchSaveTemplateDialogAjaxData()
            }).done(function (response) {
                response.success && ($tab.prepend(response.html), void 0 !== callback && callback(!0))
            }).always(this.resetAjax), this.ajax)
        },
        showSaveTemplateDialog: function () {
            var _this = this;
            this.fetchSaveTemplateDialog(function (created) {
                var $tab = _this.$el.find(".vc_ui-panel-content-container"),
                    $prompt = $tab.find(".vc_ui-prompt-templates"),
                    $title = $prompt.find(".textfield");
                if ($tab.find(".vc_ui-prompt.vc_visible").removeClass("vc_visible"), $prompt.addClass("vc_visible"), $title.focus(), $tab.addClass("vc_ui-content-hidden"), created) {
                    var delay = 0,
                        $btn = $prompt.find("#vc_ui-save-templates-btn");
                    $prompt.on("submit", function () {
                        var title = $title.val();
                        _this.$el.find(_this.settingsButtonSelector);
                        if (!title.length) return !1;
                        var data = {
                            action: vc.templates_panel_view.save_template_action,
                            template: vc.shortcodes.singleStringify(_this.model.get("id"), "template"),
                            template_name: title,
                            vc_inline: !0,
                            _vcnonce: window.vcAdminNonce
                        };
                        return vc.templates_panel_view.reloadTemplateList(data, function () {
                            $title.val(""), _this.setCustomButtonMessage($btn, void 0, void 0, !0), delay = _.delay(function () {
                                $prompt.removeClass("vc_visible"), $tab.removeClass("vc_ui-content-hidden")
                            }, 5e3)
                        }, function () {
                            _this.setCustomButtonMessage($btn, window.i18nLocale.ui_danger, "danger")
                        }), !1
                    }), $prompt.on("click", ".vc_ui-prompt-close", function () {
                        return _this.checkAjax(), $prompt.removeClass("vc_visible"), $tab.removeClass("vc_ui-content-hidden"), _this.clearCustomButtonMessage.call(this, $btn), delay && (window.clearTimeout(delay), delay = 0), !1
                    })
                }
            })
        }
    }
}(window.jQuery),
function ($) {
    "use strict";
    vc.EditElementPanelView = vc.PanelView.vcExtendUI(vc.HelperAjax).vcExtendUI(vc.ExtendPresets).vcExtendUI(vc.ExtendTemplates).vcExtendUI(vc.HelperPrompts).extend({
        panelName: "edit_element",
        el: "#vc_properties-panel",
        contentSelector: ".vc_ui-panel-content.vc_properties-list",
        minimizeButtonSelector: '[data-vc-ui-element="button-minimize"]',
        closeButtonSelector: '[data-vc-ui-element="button-close"]',
        titleSelector: ".vc_panel-title",
        tabsInit: !1,
        doCheckTabs: !0,
        $tabsMenu: !1,
        dependent_elements: {},
        mapped_params: {},
        draggable: !1,
        panelInit: !1,
        $spinner: !1,
        active_tab_index: 0,
        buttonMessageTimeout: !1,
        notRequestTemplate: !1,
        requiredParamsInitialized: !1,
        currentModelParams: !1,
        customButtonMessageTimeout: !1,
        events: {
            "click [data-save=true]": "save",
            "click [data-dismiss=panel]": "hide",
            "mouseover [data-transparent=panel]": "addOpacity",
            "click [data-transparent=panel]": "toggleOpacity",
            "mouseout [data-transparent=panel]": "removeOpacity"
        },
        initialize: function () {
            _.bindAll(this, "setSize", "setTabsSize", "fixElContainment", "hookDependent", "resetAjax", "removeAllPrompts"), this.on("setSize", this.setResize, this), this.on("render", this.resetMinimize, this), this.on("render", this.setTitle, this), this.on("render", this.prepareContentBlock, this)
        },
        setCustomButtonMessage: function ($btn, message, type, showInBackend) {
            var currentTextHtml;
            return void 0 === $btn && ($btn = this.$el.find('[data-vc-ui-element="button-save"]')),
                void 0 === showInBackend && (showInBackend = !1), this.clearCustomButtonMessage = _.bind(this.clearCustomButtonMessage, this), !showInBackend && !vc.frame_window || this.customButtonMessageTimeout ? this : (void 0 === message && (message = window.i18nLocale.ui_saved), void 0 === type && (type = "success"), currentTextHtml = $btn.html(), $btn.addClass("vc_ui-button-" + type + " vc_ui-button-undisabled").removeClass("vc_ui-button-action").data("vcCurrentTextHtml", currentTextHtml).data("vcCurrentTextType", type).html(message), _.delay(this.clearCustomButtonMessage.bind(this, $btn), 5e3), this.customButtonMessageTimeout = !0, this)
        },
        clearCustomButtonMessage: function ($btn) {
            var type, currentTextHtml;
            this.customButtonMessageTimeout && (window.clearTimeout(this.customButtonMessageTimeout), currentTextHtml = $btn.data("vcCurrentTextHtml") || "Save", type = $btn.data("vcCurrentTextType"), $btn.html(currentTextHtml).removeClass("vc_ui-button-" + type + " vc_ui-button-undisabled").addClass("vc_ui-button-action"), this.customButtonMessageTimeout = !1)
        },
        render: function (model, not_request_template) {
            var params;
            return this.$el.is(":hidden") && vc.closeActivePanel(), not_request_template && (this.notRequestTemplate = !0), this.model = model, this.currentModelParams = this.model.get("params"), vc.active_panel = this, this.resetMinimize(), this.clicked = !1, this.$el.css("height", "auto"), this.$el.css("maxHeight", "75vh"), params = this.model.setting("params") || [], this.$el.attr("data-vc-shortcode", this.model.get("shortcode")), this.tabsInit = !1, this.panelInit = !1, this.active_tab_index = 0, this.requiredParamsInitialized = !1, this.mapped_params = {}, this.dependent_elements = {}, _.each(params, function (param) {
                this.mapped_params[param.param_name] = param
            }, this), this.trigger("render"), this.show(), this.checkAjax(), this.ajax = $.ajax({
                type: "POST",
                url: window.ajaxurl,
                data: this.ajaxData(),
                context: this
            }).done(this.buildParamsContent).always(this.resetAjax), this
        },
        prepareContentBlock: function () {
            this.$content = this.notRequestTemplate ? this.$el : this.$el.find(this.contentSelector).removeClass("vc_with-tabs"), this.$content.empty(), this.$spinner = $('<span class="vc_ui-wp-spinner vc_ui-wp-spinner-lg"></span>'), this.$content.prepend(this.$spinner)
        },
        buildParamsContent: function (data) {
            var $data, $tabs, $panelHeader;
            $data = $(data), $tabs = $data.find('[data-vc-ui-element="panel-tabs-controls"]'), $tabs.find(".vc_edit-form-tab-control:first-child").addClass("vc_active"), $panelHeader = this.$el.find('[data-vc-ui-element="panel-header-content"]'), $tabs.prependTo($panelHeader), this.$content.html($data), this.$content.removeAttr("data-vc-param-initialized"), this.active_tab_index = 0, this.tabsInit = !1, this.panelInit = !1, this.dependent_elements = {}, this.requiredParamsInitialized = !1, this.$content.find("[data-vc-param-initialized]").removeAttr("data-vc-param-initialized"), this.init(), this.$content.parent().scrollTop(1).scrollTop(0), this.$content.removeClass("vc_properties-list-init"), this.$el.trigger("vcPanel.shown"), this.trigger("afterRender")
        },
        resetMinimize: function () {
            this.$el.removeClass("vc_panel-opacity")
        },
        ajaxData: function () {
            var parent_tag, parent_id, params, mergedParams;
            return parent_id = this.model.get("parent_id"), parent_tag = parent_id ? this.model.collection.get(parent_id).get("shortcode") : null, params = this.model.get("params"), mergedParams = vc.getMergedParams(this.model.get("shortcode"), _.extend({}, vc.getDefaults(this.model.get("shortcode")), params)), _.isUndefined(params.content) || (mergedParams.content = params.content), {
                action: "vc_edit_form",
                tag: this.model.get("shortcode"),
                parent_tag: parent_tag,
                post_id: $("#post_ID").val(),
                params: mergedParams,
                _vcnonce: window.vcAdminNonce
            }
        },
        init: function () {
            vc.EditElementPanelView.__super__.init.call(this), this.initParams(), this.initDependency();
            $(".wpb_edit_form_elements .textarea_html").each(function () {
                window.init_textarea_html($(this))
            }), this.trigger("init"), this.panelInit = !0
        },
        initParams: function () {
            var _this = this,
                $content = this.content().find('#vc_edit-form-tabs [data-vc-ui-element="panel-edit-element-tab"]:eq(' + this.active_tab_index + ")");
            $content.length || ($content = this.content()), $content.attr("data-vc-param-initialized") || ($('[data-vc-ui-element="panel-shortcode-param"]', $content).each(function () {
                var $field, param;
                $field = $(this), $field.data("vcInitParam") || (param = $field.data("param_settings"), vc.atts.init.call(_this, param, $field), $field.data("vcInitParam", !0))
            }), $content.attr("data-vc-param-initialized", !0)), this.requiredParamsInitialized || _.isUndefined(vc.required_params_to_init) || ($('[data-vc-ui-element="panel-shortcode-param"]', this.content()).each(function () {
                var $field, param;
                $field = $(this), !$field.data("vcInitParam") && _.indexOf(vc.required_params_to_init, $field.data("param_type")) > -1 && (param = $field.data("param_settings"), vc.atts.init.call(_this, param, $field), $field.data("vcInitParam", !0))
            }), this.requiredParamsInitialized = !0)
        },
        initDependency: function () {
            var callDependencies = {};
            _.each(this.mapped_params, function (param) {
                if (_.isObject(param) && _.isObject(param.dependency)) {
                    var rules = param.dependency;
                    if (_.isString(param.dependency.element)) {
                        var $masters, $slave;
                        $masters = $("[name=" + param.dependency.element + "].wpb_vc_param_value", this.$content), $slave = $("[name= " + param.param_name + "].wpb_vc_param_value", this.$content), _.each($masters, function (master) {
                            var $master, name;
                            $master = $(master), name = $master.attr("name"), _.isArray(this.dependent_elements[$master.attr("name")]) || (this.dependent_elements[$master.attr("name")] = []), this.dependent_elements[$master.attr("name")].push($slave), !$master.data("dependentSet") && $master.attr("data-dependent-set", "true") && $master.bind("keyup change", this.hookDependent), callDependencies[name] || (callDependencies[name] = $master)
                        }, this)
                    }
                    _.isString(rules.callback) && window[rules.callback].call(this)
                }
            }, this), this.doCheckTabs = !1, _.each(callDependencies, function (obj) {
                this.hookDependent({
                    currentTarget: obj
                })
            }, this), this.doCheckTabs = !0, this.checkTabs(), callDependencies = null
        },
        hookDependent: function (e) {
            var $master, $master_container, is_empty, dependent_elements, master_value, checkTabs;
            return $master = $(e.currentTarget), $master_container = $master.closest(".vc_column"), dependent_elements = this.dependent_elements[$master.attr("name")], master_value = $master.is(":checkbox") ? _.map(this.$content.find("[name=" + $(e.currentTarget).attr("name") + "].wpb_vc_param_value:checked"), function (element) {
                return $(element).val()
            }) : $master.val(), checkTabs = this.doCheckTabs, this.doCheckTabs = !1, is_empty = $master.is(":checkbox") ? !this.$content.find("[name=" + $master.attr("name") + "].wpb_vc_param_value:checked").length : !master_value.length, $master_container.hasClass("vc_dependent-hidden") ? _.each(dependent_elements, function ($element) {
                var event = jQuery.Event("change");
                event.extra_type = "vcHookDepended", $element.closest(".vc_column").addClass("vc_dependent-hidden"), $element.trigger(event)
            }) : _.each(dependent_elements, function ($element) {
                var param_name = $element.attr("name"),
                    rules = _.isObject(this.mapped_params[param_name]) && _.isObject(this.mapped_params[param_name].dependency) ? this.mapped_params[param_name].dependency : {},
                    $param_block = $element.closest(".vc_column");
                _.isBoolean(rules.not_empty) && !0 === rules.not_empty && !is_empty ? $param_block.removeClass("vc_dependent-hidden") : _.isBoolean(rules.is_empty) && !0 === rules.is_empty && is_empty ? $param_block.removeClass("vc_dependent-hidden") : rules.value && _.intersection(_.isArray(rules.value) ? rules.value : [rules.value], _.isArray(master_value) ? master_value : [master_value]).length ? $param_block.removeClass("vc_dependent-hidden") : rules.value_not_equal_to && !_.intersection(_.isArray(rules.value_not_equal_to) ? rules.value_not_equal_to : [rules.value_not_equal_to], _.isArray(master_value) ? master_value : [master_value]).length ? $param_block.removeClass("vc_dependent-hidden") : $param_block.addClass("vc_dependent-hidden");
                var event = jQuery.Event("change");
                event.extra_type = "vcHookDepended", $element.trigger(event)
            }, this), checkTabs && (this.checkTabs(), this.doCheckTabs = !0), this
        },
        checkTabs: function () {
            var that = this;
            !1 === this.tabsInit && (this.tabsInit = !0, this.$content.hasClass("vc_with-tabs") && (this.$tabsMenu = this.$content.find(".vc_edit-form-tabs-menu"))), this.$tabsMenu && (this.$content.find('[data-vc-ui-element="panel-edit-element-tab"]').each(function (index) {
                var $tabControl = that.$tabsMenu.find('> [data-tab-index="' + index + '"]');
                $(this).find('[data-vc-ui-element="panel-shortcode-param"]:not(".vc_dependent-hidden")').length ? $tabControl.hasClass("vc_dependent-hidden") && ($tabControl.removeClass("vc_dependent-hidden").removeClass("vc_tab-color-animated").addClass("vc_tab-color-animated"), window.setTimeout(function () {
                    $tabControl.removeClass("vc_tab-color-animated")
                }, 200)) : $tabControl.addClass("vc_dependent-hidden")
            }), window.setTimeout(this.setTabsSize, 100))
        },
        setTabsSize: function () {
            this.$tabsMenu.parents(".vc_with-tabs.vc_panel-body").css("margin-top", this.$tabsMenu.outerHeight())
        },
        setActive: function () {
            this.$el.prev().addClass("active")
        },
        window: function () {
            return window
        },
        getParams: function () {
            var paramsSettings;
            return paramsSettings = this.mapped_params, this.params = _.extend({}, this.model.get("params")), _.each(paramsSettings, function (param) {
                var value;
                value = vc.atts.parseFrame.call(this, param), this.params[param.param_name] = value
            }, this), _.each(vc.edit_form_callbacks, function (callback) {
                callback.call(this)
            }, this), this.params
        },
        content: function () {
            return this.$content
        },
        save: function () {
            if (this.panelInit) {
                var shortcode = this.model.get("shortcode"),
                    params = this.getParams(),
                    mergedParams = _.extend({}, vc.getDefaults(shortcode), vc.getMergedParams(shortcode, params));
                _.isUndefined(params.content) || (mergedParams.content = params.content), this.model.save({
                    params: mergedParams
                }), this.showMessage(window.sprintf(window.i18nLocale.inline_element_saved, vc.getMapped(shortcode).name), "success"), !vc.frame_window && this.hide(), this.trigger("save")
            }
        },
        show: function () {
            this.$el.hasClass("vc_active") || (this.$el.addClass("vc_active"), this.draggable || this.initDraggable(), this.fixElContainment(), this.trigger("show"))
        },
        hide: function (e) {
            e && e.preventDefault(), this.checkAjax(), this.ajax = !1, this.model && (this.model = null), vc.active_panel = !1, this.currentModelParams = !1, this._killEditor(), this.$el.removeClass("vc_active"), this.$el.find(".vc_properties-list").removeClass("vc_with-tabs").css("margin-top", "auto"), this.$content.empty(), this.trigger("hide")
        },
        setTitle: function () {
            return this.$el.find(this.titleSelector).text(vc.getMapped(this.model.get("shortcode")).name + " " + window.i18nLocale.settings), this
        },
        _killEditor: function () {
            _.isUndefined(window.tinyMCE) || $("textarea.textarea_html", this.$el).each(function () {
                var id = $(this).attr("id");
                "4" === tinymce.majorVersion ? window.tinyMCE.execCommand("mceRemoveEditor", !0, id) : window.tinyMCE.execCommand("mceRemoveControl", !0, id)
            }), jQuery("body").off("click.wpcolorpicker")
        }
    }), vc.EditElementUIPanel = vc.EditElementPanelView.vcExtendUI(vc.HelperPanelViewHeaderFooter).vcExtendUI(vc.HelperPanelViewResizable).vcExtendUI(vc.HelperPanelViewDraggable).extend({
        el: "#vc_ui-panel-edit-element",
        events: {
            'click [data-vc-ui-element="button-save"]': "save",
            'click [data-vc-ui-element="button-close"]': "hide",
            'click [data-vc-ui-element="button-minimize"]': "toggleOpacity",
            'click [data-vc-ui-element="panel-tab-control"]': "changeTab"
        },
        titleSelector: '[data-vc-ui-element="panel-title"]',
        initialize: function () {
            vc.EditElementUIPanel.__super__.initialize.call(this), this.on("afterResizeStart", function () {
                this.$el.css("maxHeight", "none")
            })
        },
        show: function () {
            vc.EditElementUIPanel.__super__.show.call(this), $('[data-vc-ui-element="panel-tabs-controls"]', this.$el).remove(), this.$el.css("maxHeight", "75vh")
        },
        tabsMenu: function () {
            if (!1 === this.tabsInit) {
                this.tabsInit = !0;
                var $tabsMenu = this.$el.find('[data-vc-ui-element="panel-tabs-controls"]');
                $tabsMenu.length && (this.$tabsMenu = $tabsMenu)
            }
            return this.$tabsMenu
        },
        buildTabs: function () {
            this.content().find('[data-vc-ui-element="panel-tabs-controls"]').prependTo('[data-vc-ui-element="panel-header-content"]')
        },
        changeTab: function (e) {
            e.preventDefault();
            var $tab = $(e.currentTarget);
            $tab.parent().hasClass("vc_active") || (this.$el.find('[data-vc-ui-element="panel-tabs-controls"] .vc_active:not([data-vc-ui-element="panel-tabs-line-dropdown"])').removeClass("vc_active"), $tab.parent().addClass("vc_active"), this.$el.find('[data-vc-ui-element="panel-edit-element-tab"].vc_active').removeClass("vc_active"), this.active_tab_index = this.$el.find($tab.data("vcUiElementTarget")).addClass("vc_active").index(), this.initParams(), this.$tabsMenu && this.$tabsMenu.vcTabsLine("checkDropdownContainerActive"), this.$content.parent().scrollTop(1).scrollTop(0), this.trigger("tabChange"))
        },
        checkTabs: function () {
            var _this = this;
            !1 === this.tabsInit && (this.tabsInit = !0, this.$tabsMenu = this.$el.find('[data-vc-ui-element="panel-tabs-controls"]')), this.tabsMenu() && (this.content().find('[data-vc-ui-element="panel-edit-element-tab"]').each(function (index) {
                var $tabControl = _this.$tabsMenu.find('> [data-tab-index="' + index + '"]');
                $(this).find('[data-vc-ui-element="panel-shortcode-param"]:not(".vc_dependent-hidden")').length ? $tabControl.hasClass("vc_dependent-hidden") && ($tabControl.removeClass("vc_dependent-hidden"), window.setTimeout(function () {
                    $tabControl.removeClass("vc_tab-color-animated")
                }, 200)) : $tabControl.addClass("vc_dependent-hidden")
            }), this.$tabsMenu.vcTabsLine("refresh"), this.$tabsMenu.vcTabsLine("moveTabs"))
        }
    })
}(window.jQuery),
function ($) {
    "use strict";
    vc.TemplateLibraryView = vc.PanelView.vcExtendUI(vc.HelperAjax).extend({
        myTemplates: [],
        $mainPopup: !1,
        $loadingPage: !1,
        $gridContainer: !1,
        $myTemplateContainer: !1,
        $popupItems: !1,
        $previewImage: !1,
        $previewTitle: !1,
        $previewUpdate: !1,
        $previewDownload: !1,
        $previewUpdateBtn: !1,
        $previewDownloadBtn: !1,
        $templatePreview: !1,
        $templatePage: !1,
        $downloadPage: !1,
        $updatePage: !1,
        $content: !1,
        $filter: !1,
        compiledGridTemplate: !1,
        compiledTemplate: !1,
        loaded: !1,
        data: !1,
        events: {
            "click [data-dismiss=panel]": "hide",
            "click .vc_ui-panel-close-button": "closePopupButton",
            "click .vc_ui-access-library-btn": "accessLibrary",
            "click #vc_template-library-template-grid .vc_ui-panel-template-preview-button": "previewButton",
            "click .vc_ui-panel-back-button": "backToTemplates",
            "click .vc_ui-panel-template-download-button, #vc_template-library-download-btn": "downloadButton",
            "click .vc_ui-panel-template-update-button, #vc_template-library-update-btn": "updateButton",
            "keyup #vc_template_lib_name_filter": "filterTemplates",
            "search #vc_template_lib_name_filter": "filterTemplates"
        },
        initialize: function () {
            _.bindAll(this, "loadLibrary", "addTemplateStatus", "loadMyTemplates", "deleteTemplate"), this.$mainPopup = this.$el.find(".vc_ui-panel-popup"), this.$loadingPage = this.$el.find(".vc_ui-panel-loading"), this.$gridContainer = this.$el.find("#vc_template-library-template-grid"), this.$myTemplateContainer = this.$el.find("#vc_template-library-shared_templates"), this.$popupItems = this.$el.find(".vc_ui-panel-popup-item"), this.$previewImage = this.$el.find(".vc_ui-panel-preview-image"), this.$previewTitle = this.$el.find(".vc_ui-panel-template-preview .vc_ui-panel-title"), this.$previewUpdate = this.$el.find("#vc_template-library-update"), this.$previewDownload = this.$el.find("#vc_template-library-download"), this.$previewUpdateBtn = this.$previewUpdate.find("#vc_template-library-update-btn"), this.$previewDownloadBtn = this.$previewUpdate.find("#vc_template-library-download-btn"), this.$templatePreview = this.$el.find(".vc_ui-panel-template-preview"), this.$templatePage = this.$el.find(".vc_ui-panel-template-content"), this.$downloadPage = this.$el.find(".vc_ui-panel-download"), this.$updatePage = this.$el.find(".vc_ui-panel-update"), this.$filter = this.$el.find("#vc_template_lib_name_filter"), this.$content = this.$el.find(".vc_ui-templates-content");
            var gridTemplateHtml = $("#vc_template-grid-item").html();
            this.compiledGridTemplate = vc.template(gridTemplateHtml);
            var myTemplateHtml = $("#vc_template-item").html();
            this.compiledTemplate = vc.template(myTemplateHtml), vc.events.on("templates:delete", this.deleteTemplate)
        },
        getLibrary: function () {
            if (this.loaded) return void this.showLibrary();
            this.checkAjax();
            var data = this.getStorage("templates"),
                _this = this;
            data && "object" == typeof data && !_.isEmpty(data) ? (this.loaded = !0, this.loadLibrary(data), this.showLibrary()) : this.ajax = $.getJSON("//vc-cc-templates.wpbakery.com/templates.json").done(function (data) {
                _this.setStorage("templates", data), _this.loaded = !0, _this.loadLibrary(data), _this.showLibrary()
            }).always(this.resetAjax)
        },
        removeStorage: function (name) {
            try {
                localStorage.removeItem("vc4-" + name), localStorage.removeItem("vc4-" + name + "_expiresIn")
            } catch (e) {
                return !1
            }
            return !0
        },
        getStorage: function (key) {
            var now = Date.now(),
                expiresIn = localStorage.getItem("vc4-" + key + "_expiresIn");
            if (void 0 !== expiresIn && null !== expiresIn || (expiresIn = 0), expiresIn < now) return this.removeStorage(key), null;
            try {
                return JSON.parse(localStorage.getItem("vc4-" + key))
            } catch (e) {
                return null
            }
        },
        setStorage: function (key, value, expires) {
            expires = void 0 === expires || null === expires ? 86400 : Math.abs(expires);
            var now = Date.now(),
                schedule = now + 1e3 * expires;
            try {
                localStorage.setItem("vc4-" + key, JSON.stringify(value)), localStorage.setItem("vc4-" + key + "_expiresIn", schedule)
            } catch (e) {
                return !1
            }
            return !0
        },
        loadLibrary: function (data) {
            if (data) {
                var renderedOutput = "",
                    _this = this;
                this.loaded = !0, this.data = data, this.$filter.val(""), data.forEach(function (item) {
                    item = _this.addTemplateStatus(item), renderedOutput += _this.compiledGridTemplate({
                        id: item.id,
                        title: item.title,
                        thumbnailUrl: item.thumbnailUrl,
                        previewUrl: item.previewUrl,
                        status: item.status,
                        downloaded: _.find(_this.myTemplates, {
                            id: item.id
                        }),
                        version: item.version
                    })
                }), this.$gridContainer.html(renderedOutput)
            }
        },
        showLibrary: function () {
            this.$loadingPage.addClass("vc_ui-hidden"), this.$mainPopup.removeClass("vc_ui-hidden"), this.$templatePage.removeClass("vc_ui-hidden")
        },
        addTemplateStatus: function (template) {
            var statusHtml = "",
                myTemplate = _.find(this.myTemplates, {
                    id: template.id
                });
            if (myTemplate) {
                var status = window.i18nLocale.ui_template_downloaded;
                template.version > myTemplate.version && (status = window.i18nLocale.ui_template_fupdate), statusHtml = '<span class="vc_ui-panel-template-item-info"><span>' + status + "</span></span>"
            }
            return template.status = statusHtml, template
        },
        loadMyTemplates: function () {
            var renderedOutput = "",
                _this = this;
            this.myTemplates.forEach(function (item) {
                renderedOutput += _this.compiledTemplate({
                    post_id: item.post_id,
                    title: item.title
                })
            }), this.$myTemplateContainer.html(renderedOutput)
        },
        closePopupButton: function (e) {
            e && e.preventDefault && e.preventDefault(), this.$mainPopup.toggleClass("vc_ui-hidden"), this.$popupItems.addClass("vc_ui-hidden"), this.$content.removeClass("vc_ui-hidden")
        },
        accessLibrary: function () {
            this.$loadingPage.removeClass("vc_ui-hidden"), this.$content.addClass("vc_ui-hidden"), this.getLibrary()
        },
        previewButton: function (e) {
            var $template = $(e.currentTarget),
                imgUrl = $template.data("preview-url"),
                title = $template.data("title"),
                templateId = $template.data("template-id"),
                templateVersion = $template.data("template-version");
            this.$previewImage.attr("src", imgUrl), this.$previewTitle.text(title);
            var myTemplate = _.find(this.myTemplates, {
                id: templateId
            });
            this.$previewUpdate.toggleClass("vc_ui-hidden", !(myTemplate && myTemplate.version < templateVersion)), this.$previewDownload.toggleClass("vc_ui-hidden", !!myTemplate), this.$previewUpdateBtn.data("template-id", templateId), this.$previewDownloadBtn.data("template-id", templateId), this.$popupItems.addClass("vc_ui-hidden"), this.$templatePreview.removeClass("vc_ui-hidden"), this.$templatePreview.attr("data-template-id", templateId)
        },
        backToTemplates: function () {
            this.$popupItems.addClass("vc_ui-hidden"), this.$templatePage.removeClass("vc_ui-hidden")
        },
        deleteTemplate: function (data) {
            if ("shared_templates" === data.type) {
                var index = _.findIndex(this.myTemplates, {
                    post_id: data.id
                }); - 1 !== index && (this.myTemplates.splice(index, 1), this.loaded && this.loadLibrary(this.data))
            }
        },
        downloadButton: function (e) {
            e && e.preventDefault && e.preventDefault();
            var id = jQuery(e.currentTarget).closest("[data-template-id]").data("templateId");
            id && (this.showDownloadOverlay(), this.downloadTemplate(id))
        },
        updateButton: function (e) {
            e && e.preventDefault && e.preventDefault(), jQuery(e.currentTarget).closest("[data-template-id]").data("templateId") && this.showUpdateOverlay()
        },
        showDownloadOverlay: function () {
            this.$popupItems.addClass("vc_ui-hidden"), this.$downloadPage.removeClass("vc_ui-hidden")
        },
        hideDownloadOverlay: function (message) {
            message && alert(message), this.$downloadPage.addClass("vc_ui-hidden"), this.$templatePage.removeClass("vc_ui-hidden")
        },
        showUpdateOverlay: function () {
            this.$popupItems.addClass("vc_ui-hidden"), this.$updatePage.removeClass("vc_ui-hidden")
        },
        hideUpdateOverlay: function (message) {
            this.$updatePage.addClass("vc_ui-hidden"), this.$templatePage.removeClass("vc_ui-hidden")
        },
        downloadTemplate: function (id) {
            this.checkAjax();
            var fail = !0;
            this.ajax = $.ajax({
                type: "POST",
                url: window.ajaxurl,
                data: {
                    action: "vc_shared_templates_download",
                    id: id,
                    _vcnonce: window.vcAdminNonce
                },
                dataType: "json",
                context: this
            }).done(function (response) {
                if (response && response.success) {
                    var template = _.find(this.data, {
                        id: id
                    });
                    template && (fail = !1, template.post_id = response.data.post_id, this.myTemplates.unshift(template), this.loadMyTemplates(), this.loadLibrary(this.data), this.showLibrary())
                }
            }).always(function (response, status) {
                var message = "";
                ("success" !== status || fail) && (message = window.i18nLocale.ui_templates_failed_to_download), this.hideDownloadOverlay(message), this.resetAjax()
            })
        },
        filterTemplates: function () {
            var inputValue = this.$filter.val(),
                filter = ".vc_ui-panel-template-item .vc_ui-panel-template-item-name:containsi('" + inputValue + "')";
            $(".vc_ui-panel-template-item.vc_ui-visible", this.$gridContainer).removeClass("vc_ui-visible"), $(filter, this.$gridContainer).closest(".vc_ui-panel-template-item").addClass("vc_ui-visible")
        }
    }), $(function () {
        window.vcTemplatesLibraryData && (vc.templatesLibrary = new vc.TemplateLibraryView({
            el: '[data-vc-ui-element="panel-edit-element-tab"][data-tab="shared_templates"]'
        }), vc.templatesLibrary.myTemplates = window.vcTemplatesLibraryData.templates || [], vc.templatesLibrary.loadMyTemplates())
    })
}(window.jQuery),
function ($) {
    "use strict";
    vc.PostSettingsUIPanelFrontendEditor = vc.PostSettingsPanelView.vcExtendUI(vc.HelperPanelViewHeaderFooter).vcExtendUI(vc.HelperPanelViewResizable).vcExtendUI(vc.HelperPanelViewDraggable).vcExtendUI({
        panelName: "post_settings",
        uiEvents: {
            setSize: "setEditorSize",
            show: "setEditorSize"
        },
        setSize: function () {
            this.trigger("setSize")
        },
        setDefaultHeightSettings: function () {
            this.$el.css("height", "75vh")
        },
        setEditorSize: function () {
            this.editor.setSizeResizable()
        }
    }), vc.PostSettingsUIPanelBackendEditor = vc.PostSettingsPanelViewBackendEditor.vcExtendUI(vc.HelperPanelViewHeaderFooter).vcExtendUI(vc.HelperPanelViewResizable).vcExtendUI(vc.HelperPanelViewDraggable).vcExtendUI({
        uiEvents: {
            setSize: "setEditorSize",
            show: "setEditorSize",
            render: "removeChangeTitleField"
        },
        setSize: function () {
            this.trigger("setSize")
        },
        setEditorSize: function () {
            this.editor.setSizeResizable()
        },
        setDefaultHeightSettings: function () {
            this.$el.css("height", "75vh")
        },
        removeChangeTitleField: function () {
            $("#vc_settings-title-container").remove()
        }
    })
}(window.jQuery),
function ($) {
    "use strict";
    var events = {
        'click [data-vc-ui-element="button-save"]': "save",
        'click [data-vc-ui-element="button-close"]': "hide",
        'click [data-vc-ui-element="button-minimize"]': "toggleOpacity",
        'click [data-vc-ui-element="button-layout"]': "setLayout",
        'click [data-vc-ui-element="button-update-layout"]': "updateFromInput"
    };
    vc.RowLayoutUIPanelFrontendEditor = vc.RowLayoutEditorPanelView.vcExtendUI(vc.HelperPanelViewHeaderFooter).vcExtendUI(vc.HelperPanelViewDraggable).extend({
        panelName: "rowLayouts",
        events: events
    }), vc.RowLayoutUIPanelBackendEditor = vc.RowLayoutEditorPanelViewBackend.vcExtendUI(vc.HelperPanelViewHeaderFooter).vcExtendUI(vc.HelperPanelViewDraggable).extend({
        panelName: "rowLayouts",
        events: events
    })
}(window.jQuery),
function ($) {
    "use strict";
    vc.PresetSettingsUIPanelFrontendEditor = vc.PanelView.vcExtendUI(vc.HelperPanelViewHeaderFooter).vcExtendUI(vc.HelperAjax).vcExtendUI({
        panelName: "preset_settings",
        showMessageDisabled: !1,
        events: {
            'click [data-vc-ui-delete="preset-title"]': "removePreset",
            'click [data-vc-ui-element="button-close"]': "hide",
            'click [data-vc-ui-element="button-minimize"]': "toggleOpacity",
            "click [data-vc-ui-add-preset]": "createPreset"
        },
        initialize: function (options) {
            this.frontEnd = options && options.frontEnd
        },
        createPreset: function (e) {
            var $control, preset, tag, row, column, model, row_params, column_params, rowOptions, showSettings;
            if (_.isUndefined(vc.ShortcodesBuilder) || (this.builder = new vc.ShortcodesBuilder), $control = $(e.currentTarget), preset = $control.data("preset"), tag = $control.data("tag"), row_params = {}, column_params = {
                    width: "1/1"
                }, rowOptions = {
                    shortcode: "vc_row",
                    params: row_params
                }, !0 === this.frontEnd) {
                this.builder.create(rowOptions);
                var columnOptions = {
                    shortcode: "vc_column",
                    params: column_params,
                    parent_id: this.builder.lastID()
                };
                this.builder.create(columnOptions);
                var options = {
                    shortcode: tag,
                    parent_id: this.builder.lastID()
                };
                preset && (options.preset = preset), vc.closeActivePanel(), this.builder.create(options), this.model = this.builder.last(), this.builder.render()
            } else {
                row = vc.shortcodes.create(rowOptions);
                var columnOptions = {
                    shortcode: "vc_column",
                    params: column_params,
                    parent_id: row.id,
                    root_id: row.id
                };
                column = vc.shortcodes.create(columnOptions), model = row;
                var options = {
                    shortcode: tag,
                    parent_id: column.id,
                    root_id: row.id
                };
                preset && (options.preset = preset), model = vc.shortcodes.create(options), vc.closeActivePanel(), this.model = model
            }(showSettings = !(_.isBoolean(vc.getMapped(tag).show_settings_on_create) && !1 === vc.getMapped(tag).show_settings_on_create)) && this.showEditForm()
        },
        showEditForm: function () {
            vc.edit_element_block_view.render(this.model)
        },
        render: function () {
            return this.$el.css("left", ($(window).width() - this.$el.width()) / 2), this
        },
        removePreset: function (e) {
            e && e.preventDefault();
            var closestPreset = jQuery(e.currentTarget).closest('[data-vc-ui-delete="preset-title"]'),
                presetId = closestPreset.data("preset"),
                presetParent = closestPreset.data("preset-parent");
            this.deleteSettings(presetId, presetParent, e)
        },
        deleteSettings: function (id, shortcode_name) {
            var _this = this;
            return !!confirm(window.i18nLocale.delete_preset_confirmation) && (this.checkAjax(), this.ajax = $.ajax({
                type: "POST",
                dataType: "json",
                url: window.ajaxurl,
                data: this.deleteSettingsAjaxData(shortcode_name, id),
                context: this
            }).done(function (response) {
                response && response.success && (this.showMessage(window.i18nLocale.preset_removed, "success"), _this.$el.find('[data-preset="' + id + '"]').closest(".vc_ui-template").remove(), vc.events.trigger("vc:deletePreset", id))
            }).always(this.resetAjax), this.ajax)
        },
        deleteSettingsAjaxData: function (shortcode_name, id) {
            return {
                action: "vc_action_delete_settings_preset",
                shortcode_name: shortcode_name,
                vc_inline: !0,
                id: id,
                _vcnonce: window.vcAdminNonce
            }
        },
        showMessage: function (text, type) {
            var wrapperCssClasses;
            if (this.showMessageDisabled) return !1;
            wrapperCssClasses = "vc_col-xs-12 wpb_element_wrapper", this.message_box_timeout && this.$el.find("[data-vc-panel-message]").remove() && window.clearTimeout(this.message_box_timeout), this.message_box_timeout = !1;
            var $messageBox, messageBoxTemplate = vc.template('<div class="vc_message_box vc_message_box-standard vc_message_box-rounded vc_color-<%- color %>"><div class="vc_message_box-icon"><i class="fa fa fa-<%- icon %>"></i></div><p><%- text %></p></div>');
            switch (type) {
                case "error":
                    $messageBox = $('<div class="' + wrapperCssClasses + '" data-vc-panel-message>').html(messageBoxTemplate({
                        color: "danger",
                        icon: "times",
                        text: text
                    }));
                    break;
                case "warning":
                    $messageBox = $('<div class="' + wrapperCssClasses + '" data-vc-panel-message>').html(messageBoxTemplate({
                        color: "warning",
                        icon: "exclamation-triangle",
                        text: text
                    }));
                    break;
                case "success":
                    $messageBox = $('<div class="' + wrapperCssClasses + '" data-vc-panel-message>').html(messageBoxTemplate({
                        color: "success",
                        icon: "check",
                        text: text
                    }))
            }
            $messageBox.prependTo(this.$el.find(".vc_properties-list")), $messageBox.fadeIn(), this.message_box_timeout = window.setTimeout(function () {
                $messageBox.remove()
            }, 6e3)
        }
    })
}(window.jQuery), _.isUndefined(window.vc) && (window.vc = {}), void 0 === window.setCookie && (window.setCookie = function (c_name, value, exdays) {
        var exdate = new Date;
        exdate.setDate(exdate.getDate() + exdays);
        var c_value = encodeURIComponent(value) + (null === exdays ? "" : "; expires=" + exdate.toUTCString());
        document.cookie = c_name + "=" + c_value
    }), void 0 === window.getCookie && (window.getCookie = function (c_name) {
        var i, x, y, ARRcookies = document.cookie.split(";");
        for (i = 0; i < ARRcookies.length; i++)
            if (x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("=")), y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1), (x = x.replace(/^\s+|\s+$/g, "")) == c_name) return decodeURIComponent(y)
    }),
    function ($) {
        $.expr[":"].containsi = function (a, i, m) {
            return 0 <= jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase())
        }
    }(window.jQuery);
var vc_regexp_shortcode = _.memoize(function () {
    return RegExp("\\[(\\[?)([\\w|-]+\\b)(?![\\w-])([^\\]\\/]*(?:\\/(?!\\])[^\\]\\/]*)*?)(?:(\\/)\\]|\\](?:([^\\[]*(?:\\[(?!\\/\\2\\])[^\\[]*)*)(\\[\\/\\2\\]))?)(\\]?)")
});
if (vc.memoizeWrapper = function (func, resolver) {
        var cache = {};
        return function () {
            var key = resolver ? resolver.apply(this, arguments) : arguments[0];
            return _.hasOwnProperty.call(cache, key) || (cache[key] = func.apply(this, arguments)), _.isObject(cache[key]) ? jQuery.fn.extend(!0, {}, cache[key]) : cache[key]
        }
    }, vc.events.on("shortcodes:vc_row:add:param:name:parallax shortcodes:vc_row:update:param:name:parallax", function (model, value) {
        if (value) {
            var params = model.get("params");
            params && params.css && (params.css = params.css.replace(/(background(\-position)?\s*\:\s*[\S]+(\s*[^\!\s]+)?)[\s*\!important]*/g, "$1"), model.set("params", params, {
                silent: !0
            }))
        }
    }), vc.events.on("shortcodes:vc_single_image:sync shortcodes:vc_single_image:add", function (model) {
        var params = model.get("params");
        params.link && !params.onclick && (params.onclick = "custom_link", model.save({
            params: params
        }))
    }), window.vcConsoleLog = function () {
        vcConsoleLog.history = vcConsoleLog.history || [], vcConsoleLog.history.push(arguments), this.console && console.log(Array.prototype.slice.call(arguments))
    }, _.isUndefined(window.vc)) var vc = {};
window.vc.filters = {
        templates: []
    }, window.vc.addTemplateFilter = function (callback) {
        _.isFunction(callback) && this.filters.templates.push(callback)
    },
    function ($) {
        function fixedEncodeURIComponent(str) {
            return encodeURIComponent(str).replace(/[!'()*]/g, escape)
        }

        function Suggester(element, options) {
            this.el = element, this.$el = $(this.el), this.$el_wrap = "", this.$block = "", this.suggester = "", this.selected_items = [], this.options = _.isObject(options) ? options : {}, _.defaults(this.options, {
                css_class: "vc_suggester",
                limit: !1,
                source: {},
                predefined: [],
                locked: !1,
                select_callback: function (label, data) {},
                remove_callback: function (label, data) {},
                update_callback: function (label, data) {},
                check_locked_callback: function (el, data) {
                    return !1
                }
            }), this.init()
        }

        function VcSortedList(element, settings) {
            this.el = element, this.$el = $(this.el), this.$data_field = this.$el.find(".wpb_vc_param_value"), this.$toolbar = this.$el.find(".vc_sorted-list-toolbar"), this.$current_control = this.$el.find(".vc_sorted-list-container"), _.defaults(this.options, {}), this.init()
        }
        var vc_activeMce;
        window.init_textarea_html = function ($element) {
            var $wp_link, textfield_id, $form_line, $content_holder;
            $wp_link = $("#wp-link"), $wp_link.parent().hasClass("wp-dialog") && $wp_link.wpdialog("destroy"), textfield_id = $element.attr("id"), $form_line = $element.closest(".edit_form_line"), $content_holder = $form_line.find(".vc_textarea_html_content");
            try {
                _.isUndefined(tinyMCEPreInit.qtInit[textfield_id]) && (window.tinyMCEPreInit.qtInit[textfield_id] = _.extend({}, window.tinyMCEPreInit.qtInit[window.wpActiveEditor], {
                        id: textfield_id
                    })), window.tinyMCEPreInit && window.tinyMCEPreInit.mceInit[window.wpActiveEditor] && (window.tinyMCEPreInit.mceInit[textfield_id] = _.extend({}, window.tinyMCEPreInit.mceInit[window.wpActiveEditor], {
                        resize: "vertical",
                        height: 200,
                        id: textfield_id,
                        setup: function (ed) {
                            void 0 !== ed.on ? ed.on("init", function (ed) {
                                window.wpActiveEditor = textfield_id
                            }) : ed.onInit.add(function (ed) {
                                window.wpActiveEditor = textfield_id
                            })
                        }
                    }), window.tinyMCEPreInit.mceInit[textfield_id].plugins = window.tinyMCEPreInit.mceInit[textfield_id].plugins.replace(/,?wpfullscreen/, ""), window.tinyMCEPreInit.mceInit[textfield_id].wp_autoresize_on = !1),
                    vc.edit_element_block_view && vc.edit_element_block_view.currentModelParams ? $element.val(vc_wpautop(vc.edit_element_block_view.currentModelParams[$content_holder.attr("name")] || "")) : $element.val($content_holder.val()), quicktags(window.tinyMCEPreInit.qtInit[textfield_id]), QTags._buttonsInit(), window.tinymce && (window.switchEditors && window.switchEditors.go(textfield_id, "tmce"), "4" === tinymce.majorVersion && tinymce.execCommand("mceAddEditor", !0, textfield_id)), vc_activeMce = textfield_id, window.wpActiveEditor = textfield_id
            } catch (e) {
                $element.data("vcTinyMceDisabled", !0).appendTo($form_line), $("#wp-" + textfield_id + "-wrap").remove(), console && console.error && (console.error("VC: Tinymce error! Compatibility problem with other plugins."), console.error(e))
            }
        }, Color.prototype.toString = function () {
            if (1 > this._alpha) return this.toCSS("rgba", this._alpha).replace(/\s+/g, "");
            var hex = parseInt(this._color, 10).toString(16);
            if (this.error) return "";
            if (6 > hex.length)
                for (var i = 6 - hex.length - 1; 0 <= i; i--) hex = "0" + hex;
            return "#" + hex
        }, vc.loop_partial = function (template_name, key, loop, settings) {
            var data = _.isObject(loop) && !_.isUndefined(loop[key]) ? loop[key] : "";
            return vc.template($("#_vcl-" + template_name).html(), vc.templateOptions.custom)({
                name: key,
                data: data,
                settings: settings
            })
        }, vc.loop_field_not_hidden = function (key, loop) {
            return !(_.isObject(loop[key]) && _.isBoolean(loop[key].hidden) && !0 === loop[key].hidden)
        }, vc.is_locked = function (data) {
            return _.isObject(data) && _.isBoolean(data.locked) && !0 === data.locked
        }, Suggester.prototype = {
            constructor: Suggester,
            init: function () {
                _.bindAll(this, "buildSource", "itemSelected", "labelClick", "setFocus", "resize"), this.$el.wrap('<ul class="' + this.options.css_class + '"><li class="input"/></ul>'), this.$el_wrap = this.$el.parent(), this.$block = this.$el_wrap.closest("ul").append($('<li class="clear"/>')), this.$el.focus(this.resize).blur(function () {
                    $(this).parent().width(170), $(this).val("")
                }), this.$block.click(this.setFocus), this.suggester = this.$el.data("suggest"), this.$el.autocomplete({
                    source: this.buildSource,
                    select: this.itemSelected,
                    minLength: 2,
                    focus: function (event, ui) {
                        return !1
                    }
                }).data("ui-autocomplete")._renderItem = function (ul, item) {
                    return $('<li data-value="' + item.value + '">').append("<a>" + item.name + "</a>").appendTo(ul)
                }, this.$el.autocomplete("widget").addClass("vc_ui-front"), _.isArray(this.options.predefined) && _.each(this.options.predefined, function (item) {
                    this.create(item)
                }, this)
            },
            resize: function () {
                var position = this.$el_wrap.position(),
                    block_position = this.$block.position();
                this.$el_wrap.width(parseFloat(this.$block.width()) - (parseFloat(position.left) - parseFloat(block_position.left) + 4))
            },
            setFocus: function (e) {
                e.preventDefault(), $(e.target).hasClass(this.options.css_class) && this.$el.trigger("focus")
            },
            itemSelected: function (event, ui) {
                return this.$el.blur(), this.create(ui.item), this.$el.focus(), !1
            },
            create: function (item) {
                var $label, exclude_css, index = this.selected_items.push(item) - 1,
                    remove = !0 === this.options.check_locked_callback(this.$el, item) ? "" : ' <a class="remove">&times;</a>';
                _.isUndefined(this.selected_items[index].action) && (this.selected_items[index].action = "+"), exclude_css = "-" === this.selected_items[index].action ? " exclude" : " include", $label = $('<li class="vc_suggest-label' + exclude_css + '" data-index="' + index + '" data-value="' + item.value + '"><span class="label">' + item.name + "</span>" + remove + "</li>"), $label.insertBefore(this.$el_wrap), _.isEmpty(remove) || $label.click(this.labelClick), this.options.select_callback($label, this.selected_items)
            },
            labelClick: function (e) {
                e.preventDefault();
                var $label = $(e.currentTarget),
                    index = parseInt($label.data("index"), 10);
                if ($(e.target).is(".remove")) return this.selected_items.splice(index, 1), this.options.remove_callback($label, this.selected_items), $label.remove(), !1;
                this.selected_items[index].action = "+" === this.selected_items[index].action ? "-" : "+", "+" === this.selected_items[index].action ? $label.removeClass("exclude").addClass("include") : $label.removeClass("include").addClass("exclude"), this.options.update_callback($label, this.selected_items)
            },
            buildSource: function (request, response) {
                this.ajax && (this.ajax.abort(), response([]), this.ajax = !1);
                var exclude = _.filter(_.map(this.selected_items, function (item) {
                    return item ? item.value : void 0
                })).join(",");
                this.ajax = $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: window.ajaxurl,
                    data: {
                        action: "wpb_get_loop_suggestion",
                        field: this.suggester,
                        exclude: exclude,
                        query: request.term,
                        _vcnonce: window.vcAdminNonce
                    }
                }).done(function (data) {
                    response(data)
                })
            }
        }, $.fn.suggester = function (option) {
            return this.each(function () {
                var $this = $(this),
                    data = $this.data("suggester");
                data || $this.data("suggester", data = new Suggester(this, option)), "string" == typeof option && data[option]()
            })
        };
        var VcLoopEditorView = Backbone.View.extend({
                className: "loop_params_holder",
                events: {
                    "click input, select": "save",
                    "change input, select": "save",
                    "change :checkbox[data-input]": "updateCheckbox"
                },
                query_options: {},
                return_array: {},
                controller: "",
                initialize: function () {
                    _.bindAll(this, "save", "updateSuggestion", "suggestionLocked")
                },
                render: function (controller) {
                    var template = vc.template($("#vcl-loop-frame").html(), _.extend({}, vc.templateOptions.custom, {
                        variable: "loop"
                    }));
                    return this.controller = controller, this.$el.html(template(this.model)), this.controller.$el.append(this.$el), _.each($("[data-suggest]"), function (object) {
                        var $field = $(object),
                            current_value = window.decodeURIComponent($("[data-suggest-prefill=" + $field.data("suggest") + "]").val());
                        $field.suggester({
                            predefined: $.parseJSON(current_value),
                            select_callback: this.updateSuggestion,
                            update_callback: this.updateSuggestion,
                            remove_callback: this.updateSuggestion,
                            check_locked_callback: this.suggestionLocked
                        })
                    }, this), this
                },
                show: function () {
                    this.$el.slideDown()
                },
                save: function (e) {
                    this.return_array = {}, _.each(this.model, function (value, key) {
                        var value = this.getValue(key, value);
                        _.isString(value) && !_.isEmpty(value) && (this.return_array[key] = value)
                    }, this), this.controller.setInputValue(this.return_array)
                },
                getValue: function (key) {
                    return $("[name=" + key + "]", this.$el).val()
                },
                hide: function () {
                    this.$el.slideUp()
                },
                toggle: function () {
                    this.$el.is(":animated") || this.$el.slideToggle()
                },
                updateCheckbox: function (e) {
                    var $checkbox = $(e.currentTarget),
                        input_name = $checkbox.data("input"),
                        $input = $("[data-name=" + input_name + "]", this.$el),
                        value = [];
                    $("[data-input=" + input_name + "]:checked").each(function () {
                        value.push($(this).val())
                    }), $input.val(value), this.save()
                },
                updateSuggestion: function ($elem, data) {
                    var value, $suggestion_block = $elem.closest("[data-block=suggestion]");
                    value = _.reduce(data, function (memo, label) {
                        return _.isEmpty(label) ? "" : memo + (_.isEmpty(memo) ? "" : ",") + ("-" === label.action ? "-" : "") + label.value
                    }, "").trim(), $suggestion_block.find("[data-suggest-value]").val(value).trigger("change")
                },
                suggestionLocked: function ($elem, data) {
                    var value = data.value,
                        field = $elem.closest("[data-block=suggestion]").find("[data-suggest-value]").data("suggest-value");
                    return this.controller.settings && this.controller.settings[field] && _.isBoolean(this.controller.settings[field].locked) && 1 == this.controller.settings[field].locked && _.isString(this.controller.settings[field].value) && 0 <= _.indexOf(this.controller.settings[field].value.replace("-", "").split(/\,/), "" + value)
                }
            }),
            VcLoop = Backbone.View.extend({
                events: {
                    "click .vc_loop-build": "showEditor"
                },
                initialize: function () {
                    _.bindAll(this, "createEditor"), this.$input = $(".wpb_vc_param_value", this.$el), this.$button = this.$el.find(".vc_loop-build"), this.data = this.$input.val(), this.settings = $.parseJSON(window.decodeURIComponent(this.$button.data("settings")))
                },
                render: function () {
                    return this
                },
                showEditor: function (e) {
                    if (e.preventDefault(), _.isObject(this.loop_editor_view)) return this.loop_editor_view.toggle(), !1;
                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        url: window.ajaxurl,
                        data: {
                            action: "wpb_get_loop_settings",
                            value: this.data,
                            settings: this.settings,
                            post_id: vc.post_id,
                            _vcnonce: window.vcAdminNonce
                        }
                    }).done(this.createEditor)
                },
                createEditor: function (data) {
                    this.loop_editor_view = new VcLoopEditorView({
                        model: _.isEmpty(data) ? {} : data
                    }), this.loop_editor_view.render(this).show()
                },
                setInputValue: function (value) {
                    this.$input.val(_.map(value, function (value, key) {
                        return key + ":" + value
                    }).join("|"))
                }
            }),
            VcOptionsField = Backbone.View.extend({
                events: {
                    "click .vc_options-edit": "showEditor",
                    "click .vc_close-button": "showEditor",
                    "click input, select": "save",
                    "change input, select": "save",
                    "keyup input": "save"
                },
                data: {},
                fields: {},
                initialize: function () {
                    this.$button = this.$el.find(".vc_options-edit"), this.$form = this.$el.find(".vc_options-fields"), this.$input = this.$el.find(".wpb_vc_param_value"), this.settings = this.$form.data("settings"), this.parseData(), this.render()
                },
                render: function () {
                    var html = "";
                    return _.each(this.settings, function (field) {
                        _.isUndefined(this.data[field.name]) ? _.isUndefined(field.value) || (field.value = field.value.toString().split(","), this.data[field.name] = field.value) : field.value = this.data[field.name], this.fields[field.name] = field;
                        var $field = $("#vcl-options-field-" + field.type);
                        if ($field.is("script")) {
                            var template = vc.template($field.html(), vc.templateOptions.custom);
                            html += template(_.extend({}, {
                                name: "",
                                label: "",
                                value: [],
                                options: "",
                                description: ""
                            }, field))
                        }
                    }, this), this.$form.html(html + this.$form.html()), this
                },
                parseData: function () {
                    _.each(this.$input.val().split("|"), function (data) {
                        if (data.match(/\:/)) {
                            var split = data.split(":"),
                                name = split[0],
                                value = split[1];
                            this.data[name] = _.map(value.split(","), function (v) {
                                return window.decodeURIComponent(v)
                            })
                        }
                    }, this)
                },
                saveData: function () {
                    var data_string = _.map(this.data, function (value, key) {
                        return key + ":" + _.map(value, function (v) {
                            return window.encodeURIComponent(v)
                        }).join(",")
                    }).join("|");
                    this.$input.val(data_string)
                },
                showEditor: function () {
                    this.$form.slideToggle()
                },
                save: function (e) {
                    var $field = $(e.currentTarget);
                    if ($field.is(":checkbox")) {
                        var value = [];
                        this.$el.find("input[name=" + $field.attr("name") + "]").each(function () {
                            this.checked && value.push($(this).val())
                        }), this.data[$field.attr("name")] = value
                    } else this.data[$field.attr("name")] = [$field.val()];
                    this.saveData()
                }
            });
        VcSortedList.prototype = {
            constructor: VcSortedList,
            init: function () {
                _.bindAll(this, "controlEvent", "save"), this.$toolbar.on("change", "input", this.controlEvent);
                var selected_data = this.$data_field.val().split(",");
                for (var i in selected_data) {
                    var control_settings = selected_data[i].split("|"),
                        $control = !!control_settings.length && this.$toolbar.find("[data-element=" + decodeURIComponent(control_settings[0]) + "]");
                    !1 !== $control && $control.is("input") && ($control.prop("checked", !0), this.createControl({
                        value: $control.val(),
                        label: $control.parent().text(),
                        sub: $control.data("subcontrol"),
                        sub_value: _.map(control_settings.slice(1), function (item) {
                            return window.decodeURIComponent(item)
                        })
                    }))
                }
                this.$current_control.sortable({
                    stop: this.save
                }).on("change", "select", this.save)
            },
            createControl: function (data) {
                var sub_control = "",
                    selected_sub_value = _.isUndefined(data.sub_value) ? [] : data.sub_value;
                _.isArray(data.sub) && _.each(data.sub, function (sub, index) {
                    sub_control += " <select>", _.each(sub, function (item) {
                        sub_control += '<option value="' + item[0] + '"' + (_.isString(selected_sub_value[index]) && selected_sub_value[index] === item[0] ? ' selected="true"' : "") + ">" + item[1] + "</option>"
                    }), sub_control += "</select>"
                }, this), this.$current_control.append('<li class="vc_control-' + data.value + '" data-name="' + data.value + '">' + data.label + sub_control + "</li>")
            },
            controlEvent: function (e) {
                var $control = $(e.currentTarget);
                $control[0].checked ? this.createControl({
                    value: $control.val(),
                    label: $control.parent().text(),
                    sub: $control.data("subcontrol")
                }) : this.$current_control.find(".vc_control-" + $control.val()).remove(), this.save()
            },
            save: function () {
                var value = _.map(this.$current_control.find("[data-name]"), function (element) {
                    var return_string = encodeURIComponent($(element).data("name"));
                    return $(element).find("select").each(function () {
                        var $sub_control = $(this);
                        $sub_control.is("select") && "" !== $sub_control.val() && (return_string += "|" + encodeURIComponent($sub_control.val()))
                    }), return_string
                }).join(",");
                this.$data_field.val(value)
            }
        }, $.fn.VcSortedList = function (option) {
            return this.each(function () {
                var $this = $(this),
                    data = $this.data("vc_sorted_list");
                _.isObject(option);
                data || $this.data("vc_sorted_list", data = new VcSortedList(this, option)), "string" == typeof option && data[option]()
            })
        };
        var GoogleFonts = Backbone.View.extend({
                preview_el: ".vc_google_fonts_form_field-preview-container > span",
                font_family_dropdown_el: ".vc_google_fonts_form_field-font_family-container > select",
                font_style_dropdown_el: ".vc_google_fonts_form_field-font_style-container > select",
                font_style_dropdown_el_container: ".vc_google_fonts_form_field-font_style-container",
                status_el: ".vc_google_fonts_form_field-status-container > span",
                events: {
                    "change .vc_google_fonts_form_field-font_family-container > select": "fontFamilyDropdownChange",
                    "change .vc_google_fonts_form_field-font_style-container > select": "fontStyleDropdownChange"
                },
                initialize: function (attr) {
                    _.bindAll(this, "previewElementInactive", "previewElementActive", "previewElementLoading"), this.$preview_el = $(this.preview_el, this.$el), this.$font_family_dropdown_el = $(this.font_family_dropdown_el, this.$el), this.$font_style_dropdown_el = $(this.font_style_dropdown_el, this.$el), this.$font_style_dropdown_el_container = $(this.font_style_dropdown_el_container, this.$el), this.$status_el = $(this.status_el, this.$el), this.fontFamilyDropdownRender()
                },
                render: function () {
                    return this
                },
                previewElementRender: function () {
                    return this.$preview_el.css({
                        "font-family": this.font_family,
                        "font-style": this.font_style,
                        "font-weight": this.font_weight
                    }), this
                },
                previewElementInactive: function () {
                    this.$status_el.text(window.i18nLocale.gfonts_loading_google_font_failed || "Loading google font failed.").css("color", "#FF0000")
                },
                previewElementActive: function () {
                    this.$preview_el.text("Grumpy wizards make toxic brew for the evil Queen and Jack.").css("color", "inherit"), this.fontStyleDropdownRender()
                },
                previewElementLoading: function () {
                    this.$preview_el.text(window.i18nLocale.gfonts_loading_google_font || "Loading Font...")
                },
                fontFamilyDropdownRender: function () {
                    return this.fontFamilyDropdownChange(), this
                },
                fontFamilyDropdownChange: function () {
                    var $font_family_selected = this.$font_family_dropdown_el.find(":selected");
                    return this.font_family_url = $font_family_selected.val(), this.font_family = $font_family_selected.attr("data[font_family]"), this.font_types = $font_family_selected.attr("data[font_types]"), this.$font_style_dropdown_el_container.parent().hide(), this.font_family_url && 0 < this.font_family_url.length && WebFont.load({
                        google: {
                            families: [this.font_family_url]
                        },
                        inactive: this.previewElementInactive,
                        active: this.previewElementActive,
                        loading: this.previewElementLoading
                    }), this
                },
                fontStyleDropdownRender: function () {
                    var str = this.font_types,
                        str_arr = str.split(","),
                        oel = "",
                        default_f_style = this.$font_family_dropdown_el.attr("default[font_style]");
                    for (var str_inner in str_arr) {
                        var str_arr_inner = str_arr[str_inner].split(":"),
                            sel = "";
                        _.isString(default_f_style) && 0 < default_f_style.length && str_arr[str_inner] == default_f_style && (sel = "selected"), oel = oel + "<option " + sel + ' value="' + str_arr[str_inner] + '" data[font_weight]="' + str_arr_inner[1] + '" data[font_style]="' + str_arr_inner[2] + '" class="' + str_arr_inner[2] + "_" + str_arr_inner[1] + '" >' + str_arr_inner[0] + "</option>"
                    }
                    return this.$font_style_dropdown_el.html(oel), this.$font_style_dropdown_el_container.parent().show(), this.fontStyleDropdownChange(), this
                },
                fontStyleDropdownChange: function () {
                    var $font_style_selected = this.$font_style_dropdown_el.find(":selected");
                    return this.font_weight = $font_style_selected.attr("data[font_weight]"), this.font_style = $font_style_selected.attr("data[font_style]"), this.previewElementRender(), this
                }
            }),
            VC_AutoComplete = Backbone.View.extend({
                min_length: 2,
                delay: 500,
                auto_focus: !0,
                ajax_url: window.ajaxurl,
                source_data: function () {
                    return {}
                },
                replace_values_on_select: !1,
                initialize: function (params) {
                    _.bindAll(this, "sortableChange", "resize", "labelRemoveHook", "updateItems", "sortableCreate", "sortableUpdate", "source", "select", "labelRemoveClick", "createBox", "focus", "response", "change", "close", "open", "create", "search", "_renderItem", "_renderMenu", "_renderItemData", "_resizeMenu"), params = $.extend({
                        min_length: this.min_length,
                        delay: this.delay,
                        auto_focus: this.auto_focus,
                        replace_values_on_select: this.replace_values_on_select
                    }, params), this.options = params, this.param_name = this.options.param_name, this.$el = this.options.$el, this.$el_wrap = this.$el.parent(), this.$sortable_wrapper = this.$el_wrap.parent(), this.$input_param = this.options.$param_input, this.selected_items = [], this.isMultiple = !1, this.render()
                },
                resize: function () {
                    var position = this.$el_wrap.position(),
                        block_position = this.$block.position();
                    this.$el.autocomplete("widget").width(parseFloat(this.$block.width()) - (parseFloat(position.left) - parseFloat(block_position.left) + 4) + 11)
                },
                enableMultiple: function () {
                    this.isMultiple = !0, this.$el.show(), this.$el.focus()
                },
                enableSortable: function () {
                    this.sortable = this.$sortable_wrapper.sortable({
                        items: ".vc_data",
                        axis: "y",
                        change: this.sortableChange,
                        create: this.sortableCreate,
                        update: this.sortableUpdate
                    })
                },
                updateItems: function () {
                    this.selected_items.length ? this.$input_param.val(this.getSelectedItems().join(", ")) : this.$input_param.val("")
                },
                sortableChange: function (event, ui) {},
                itemsCreate: function () {
                    var sel_items = [];
                    this.$block.find(".vc_data").each(function (key, item) {
                        sel_items.push({
                            label: item.dataset.label,
                            value: item.dataset.value
                        })
                    }), this.selected_items = sel_items
                },
                sortableCreate: function (event, ui) {},
                sortableUpdate: function (event, ui) {
                    var elems = this.$sortable_wrapper.sortable("toArray", {
                            attribute: "data-index"
                        }),
                        items = [];
                    _.each(elems, function (index) {
                        items.push(this.selected_items[index])
                    }, this);
                    var index = 0;
                    $("li.vc_data", this.$sortable_wrapper).each(function () {
                        $(this).attr("data-index", index++)
                    }), this.selected_items = items, this.updateItems()
                },
                getWidget: function () {
                    return this.$el.autocomplete("widget")
                },
                render: function () {
                    if (this.$el.focus(this.resize), this.data = this.$el.autocomplete({
                            source: this.source,
                            minLength: this.options.min_length,
                            delay: this.options.delay,
                            autoFocus: this.options.auto_focus,
                            select: this.select,
                            focus: this.focus,
                            response: this.response,
                            change: this.change,
                            close: this.close,
                            open: this.open,
                            create: this.create,
                            search: this.search
                        }), this.data.data("ui-autocomplete")._renderItem = this._renderItem, this.data.data("ui-autocomplete")._renderMenu = this._renderMenu, this.data.data("ui-autocomplete")._resizeMenu = this._resizeMenu, 0 < this.$input_param.val().length) {
                        this.isMultiple ? this.$el.focus() : this.$el.hide();
                        var that = this;
                        $(".vc_autocomplete-label.vc_data", this.$sortable_wrapper).each(function () {
                            that.labelRemoveHook($(this))
                        })
                    }
                    return this.getWidget().addClass("vc_ui-front").addClass("vc_ui-auotocomplete"), this.$block = this.$el_wrap.closest("ul").append($('<li class="clear"/>')), this.itemsCreate(), this
                },
                close: function (event, ui) {
                    this.selected && this.options.no_hide && (this.getWidget().show(), 2 < ++this.selected && (this.selected = void 0))
                },
                open: function (event, ui) {
                    var widget = this.getWidget().menu(),
                        widget_position = widget.position();
                    widget.css("left", widget_position.left - 6), widget.css("top", widget_position.top + 2)
                },
                focus: function (event, ui) {
                    if (!this.options.replace_values_on_select) return event.preventDefault(), !1
                },
                create: function (event, ui) {},
                change: function (event, ui) {},
                response: function (event, ui) {},
                search: function (event, ui) {},
                select: function (event, ui) {
                    if (this.selected = 1, ui.item) {
                        if (this.options.unique_values) {
                            var $li_el = this.getWidget().data("uiMenu").active;
                            if (this.options.groups) {
                                var $prev_el = $li_el.prev(),
                                    $next_el = $li_el.next();
                                $prev_el.hasClass("vc_autocomplete-group") && !$next_el.hasClass("vc_autocomplete-item") && $prev_el.remove()
                            }
                            $li_el.remove();
                            var that = this;
                            $("li.ui-menu-item", this.getWidget()).length || (that.selected = void 0)
                        }
                        this.createBox(ui.item), this.isMultiple ? this.$el.focus() : this.$el.hide()
                    }
                    return !1
                },
                createBox: function (item) {
                    var $label, index = this.selected_items.push(item) - 1;
                    this.updateItems(), $label = $('<li class="vc_autocomplete-label vc_data" data-index="' + index + '" data-value="' + item.value + '" data-label="' + item.label + '"><span class="vc_autocomplete-label"><a>' + item.label + '</a></span><a class="vc_autocomplete-remove">&times;</a></li>'), $label.insertBefore(this.$el_wrap), this.labelRemoveHook($label)
                },
                labelRemoveHook: function ($label) {
                    this.$el.blur(), this.$el.val(""), $label.click(this.labelRemoveClick)
                },
                labelRemoveClick: function (e, ui) {
                    e.preventDefault();
                    var $label = $(e.currentTarget);
                    if ($(e.target).is(".vc_autocomplete-remove")) return this.selected_items.splice($label.index(), 1), $label.remove(), this.updateItems(), this.$el.show(), !1
                },
                getSelectedItems: function () {
                    if (this.selected_items.length) {
                        var results = [];
                        return _.each(this.selected_items, function (item) {
                            results.push(item.value)
                        }), results
                    }
                    return !1
                },
                _renderMenu: function (ul, items) {
                    var that = this,
                        group = null;
                    this.options.groups && items.sort(function (a, b) {
                        return a.group > b.group
                    }), $.each(items, function (index, item) {
                        that.options.groups && item.group != group && (group = item.group, ul.append("<li class='ui-autocomplete-group vc_autocomplete-group' aria-label='" + group + "'>" + group + "</li>")), that._renderItemData(ul, item)
                    })
                },
                _renderItem: function (ul, item) {
                    return $('<li data-value="' + item.value + '" class="vc_autocomplete-item">').append("<a>" + item.label + "</a>").appendTo(ul)
                },
                _renderItemData: function (ul, item) {
                    return this._renderItem(ul, item).data("ui-autocomplete-item", item)
                },
                _resizeMenu: function () {},
                clearValue: function () {
                    this.selected_items = [], this.updateItems(), $(".vc_autocomplete-label.vc_data", this.$sortable_wrapper).remove()
                },
                source: function (request, response) {
                    var that = this;
                    this.options.values && 0 < this.options.values.length ? response(this.options.unique_values ? $.ui.autocomplete.filter(_.difference(this.options.values, this.selected_items), request.term) : $.ui.autocomplete.filter(this.options.values, request.term)) : $.ajax({
                        type: "POST",
                        dataType: "json",
                        url: this.ajax_url,
                        data: $.extend({
                            action: "vc_get_autocomplete_suggestion",
                            shortcode: vc.active_panel.model.get("shortcode"),
                            param: this.param_name,
                            query: request.term,
                            _vcnonce: window.vcAdminNonce
                        }, this.source_data(request, response))
                    }).done(function (data) {
                        response(that.options.unique_values ? _.filter(data, function (obj) {
                            return !_.findWhere(that.selected_items, obj)
                        }) : data)
                    })
                }
            }),
            Vc_ParamInitializer = Backbone.View.extend({
                $content: {},
                initialize: function () {
                    _.bindAll(this, "content"), this.$content = this.$el, this.model = vc.active_panel.model
                },
                setContent: function ($el) {
                    this.$content = $el
                },
                content: function () {
                    return this.$content
                },
                render: function () {
                    var self;
                    return self = this, $('[data-vc-ui-element="panel-shortcode-param"]', this.content()).each(function () {
                        var _this = $(this),
                            param = _this.data("param_settings");
                        vc.atts.init.call(self, param, _this), _this.data("vcInitParam", !0)
                    }), this
                }
            }),
            VC_ParamGroup = Backbone.View.extend({
                options: {
                    max_items: 0,
                    sortable: !0,
                    deletable: !0,
                    collapsible: !0
                },
                items: 0,
                $ul: !1,
                initializer: {},
                mappedParams: {},
                adminLabelParams: [],
                groupParamName: "",
                events: {
                    "click > .edit_form_line > .vc_param_group-list > .vc_param_group-add_content": "addNew"
                },
                initialize: function (data) {
                    var $elParam, settings, self;
                    this.$ul = this.$el.find("> .edit_form_line > .vc_param_group-list"), $elParam = $("> .wpb_vc_row", this.$ul), this.initializer = new Vc_ParamInitializer({
                        el: this.$el
                    }), this.model = vc.active_panel.model, settings = this.$ul.data("settings"), this.mappedParams = {}, this.adminLabelParams = [], this.options = _.defaults({}, _.isObject(data.settings) ? data.settings : {}, settings, this.options), this.groupParamName = this.options.param.param_name, _.isObject(this.options.param) && _.isArray(this.options.param.params) && _.each(this.options.param.params, function (param) {
                        var elemName;
                        elemName = this.groupParamName + "_" + param.param_name, this.mappedParams[elemName] = param, _.isObject(param) && !0 === param.admin_label && this.adminLabelParams.push(elemName)
                    }, this), this.items = 0, self = this, $elParam.length && $elParam.each(function () {
                        $elParam.data("vc-param-group-param", new VC_ParamGroup_Param({
                            el: $(this),
                            parent: self
                        })), self.items++, self.afterAdd($(this), "init")
                    }), this.options.sortable && this.$ul.sortable({
                        handle: ".vc_control.column_move",
                        items: "> .wpb_vc_row:not(vc_param_group-add_content-wrapper)",
                        placeholder: "vc_placeholder"
                    })
                },
                addNew: function (ev) {
                    if (ev.preventDefault(), this.addAllowed()) {
                        var $newEl, fn;
                        if (void 0 !== this.options.param.callbacks && void 0 !== this.options.param.callbacks.before_add && "function" == typeof (fn = window[this.options.param.callbacks.before_add]) && !fn()) return;
                        $newEl = $(JSON.parse(this.$ul.next(".vc_param_group-template").html())), $newEl.removeClass("vc_param_group-add_content-wrapper"), $newEl.insertBefore(ev.currentTarget), $newEl.show(), this.initializer.setContent($newEl.find("> .wpb_element_wrapper")), this.initializer.render(), this.items++, $newEl.data("vc-param-group-param", new VC_ParamGroup_Param({
                            el: $newEl,
                            parent: this
                        })), this.afterAdd($newEl, "new"), vc.events.trigger("vc-param-group-add-new", ev, $newEl, this)
                    }
                },
                addAllowed: function () {
                    return 0 < this.options.max_items && this.items + 1 <= this.options.max_items || 0 >= this.options.max_items
                },
                afterAdd: function ($newEl, action) {
                    var fn;
                    this.addAllowed() || (this.$ul.find("> .wpb_vc_row > .vc_param_group-controls > .vc_row_edit_clone_delete > .vc_control.column_clone").hide(), this.$ul.find("> .vc_param_group-add_content").hide()), this.options.sortable || this.$ul.find("> .wpb_vc_row > .vc_param_group-controls > .vc_control.column_move").hide(), this.options.deletable || this.$ul.find("> .wpb_vc_row > .vc_param_group-controls > .vc_row_edit_clone_delete > .vc_control.column_delete").hide(), this.options.collapsible || this.$ul.find("> .wpb_vc_row > .vc_param_group-controls > .vc_row_edit_clone_delete > .vc_control.column_toggle").hide(), void 0 !== this.options.param.callbacks && void 0 !== this.options.param.callbacks.after_add && "function" == typeof (fn = window[this.options.param.callbacks.after_add]) && fn($newEl, action)
                },
                afterDelete: function () {
                    var fn;
                    this.addAllowed() && (this.$ul.find("> .wpb_vc_row > .vc_param_group-controls > .vc_row_edit_clone_delete > .vc_control.column_clone").show(), this.$ul.find("> .vc_param_group-add_content").show()), void 0 !== this.options.param.callbacks && void 0 !== this.options.param.callbacks.after_delete && "function" == typeof (fn = window[this.options.param.callbacks.after_delete]) && fn()
                }
            }),
            VC_ParamGroup_Param = Backbone.View.extend({
                dependentElements: !1,
                mappedParams: !1,
                groupParamName: "",
                adminLabelParams: [],
                events: {
                    "click > .vc_controls > .vc_row_edit_clone_delete > .vc_control.column_toggle": "toggle",
                    "click > .vc_controls > .vc_row_edit_clone_delete > .vc_control.column_delete": "deleteParam",
                    "click > .vc_controls > .vc_row_edit_clone_delete > .vc_control.column_clone": "clone"
                },
                initialize: function (options) {
                    this.options = options, this.$content = this.options.parent.$ul, this.model = vc.active_panel.model, this.mappedParams = this.options.parent.mappedParams, this.groupParamName = this.options.parent.groupParamName, this.adminLabelParams = this.options.parent.adminLabelParams, this.dependentElements = {}, _.bindAll(this, "hookDependent"), this.initializeDependency(), _.bindAll(this, "hookAdminLabel"), this.initializeAdminLabels()
                },
                initializeAdminLabels: function () {
                    var i, $fields, callback;
                    for (callback = this.hookAdminLabel, i = 0; i < this.adminLabelParams.length; i++) $fields = $("[name=" + this.adminLabelParams[i] + "].wpb_vc_param_value", this.$el), $fields.each(function () {
                        var $field = $(this);
                        $field.data("vc_admin_labels") || ($field.data("vc_admin_labels", !0), $field.bind("keyup change", callback), callback({
                            currentTarget: this
                        }))
                    })
                },
                hookAdminLabel: function (e) {
                    var i, $wrapperLabel, elemName, paramSettings, labelName, labelValue, labels, $field, $parent;
                    for (labelName = "", labelValue = "", labels = [], $field = $(e.currentTarget), $parent = $field.closest(".vc_param_group-wrapper"), $wrapperLabel = $field.closest(".vc_param").find(".vc_param-group-admin-labels"), i = 0; i < this.adminLabelParams.length; i++) {
                        var $paramWrapper;
                        elemName = this.adminLabelParams[i], $field = $parent.find("[name=" + elemName + "]"), $paramWrapper = $field.closest('[data-vc-ui-element="panel-shortcode-param"]'), void 0 !== this.mappedParams[elemName] && (labelName = this.mappedParams[elemName].heading), labelValue = $field.is("select") ? $field.find("option:selected").text() : $field.is("input:checkbox") ? $field[0].checked ? $field.val() : "" : $field.val(), paramSettings = {
                            type: $paramWrapper.data("param_type"),
                            param_name: $paramWrapper.data("param_name")
                        }, _.isObject(vc.atts[paramSettings.type]) && _.isFunction(vc.atts[paramSettings.type].render) && (labelValue = vc.atts[paramSettings.type].render.call(this, paramSettings, labelValue)), "" !== labelValue && labels.push("<label>" + labelName + "</label>: " + labelValue)
                    }
                    $wrapperLabel.html(labels.join(", ")).toggleClass("vc_hidden-label", !labels.length)
                },
                initializeDependency: function () {
                    var callDependencies;
                    callDependencies = {}, _.each(this.mappedParams, function (param, name) {
                        if (_.isObject(param) && _.isObject(param.dependency) && _.isString(param.dependency.element)) {
                            var $masters, $slave;
                            $masters = $("[name=" + this.groupParamName + "_" + param.dependency.element + "].wpb_vc_param_value", this.$el), $slave = $("[name=" + name + "].wpb_vc_param_value", this.$el), $slave.length && _.each($masters, function (master) {
                                var $master;
                                $master = $(master);
                                var masterName, rules;
                                masterName = $master.attr("name"), rules = param.dependency, _.isArray(this.dependentElements[masterName]) || (this.dependentElements[masterName] = []), this.dependentElements[masterName].push($slave), $master.data("dependentSet") || ($master.attr("data-dependent-set", "true"), $master.bind("keyup change", this.hookDependent)), callDependencies[masterName] || (callDependencies[masterName] = $master), _.isString(rules.callback) && window[rules.callback].call(this)
                            }, this)
                        }
                    }, this), _.each(callDependencies, function (obj) {
                        this.hookDependent({
                            currentTarget: obj
                        })
                    }, this)
                },
                hookDependent: function (e) {
                    var $master, $masterContainer, isMasterEmpty, dependentElements, masterValue;
                    return $master = $(e.currentTarget), $masterContainer = $master.closest(".vc_column"), dependentElements = this.dependentElements[$master.attr("name")], masterValue = $master.is(":checkbox") ? _.map(this.$el.find("[name=" + $master.attr("name") + "].wpb_vc_param_value:checked"), function (element) {
                        return $(element).val()
                    }) : $master.val(), isMasterEmpty = $master.is(":checkbox") ? !this.$el.find("[name=" + $master.attr("name") + "].wpb_vc_param_value:checked").length : !masterValue.length, $masterContainer.hasClass("vc_dependent-hidden") ? _.each(dependentElements, function ($element) {
                        var event = $.Event("change");
                        event.extra_type = "vcHookDependedParamGroup", $element.closest(".vc_column").addClass("vc_dependent-hidden"), $element.trigger(event)
                    }) : _.each(dependentElements, function ($element) {
                        var event, paramName, rules, $paramBlock;
                        paramName = $element.attr("name"), rules = _.isObject(this.mappedParams[paramName]) && _.isObject(this.mappedParams[paramName].dependency) ? this.mappedParams[paramName].dependency : {}, $paramBlock = $element.closest(".vc_column"), _.isBoolean(rules.not_empty) && !0 === rules.not_empty && !isMasterEmpty ? $paramBlock.removeClass("vc_dependent-hidden") : _.isBoolean(rules.is_empty) && !0 === rules.is_empty && isMasterEmpty ? $paramBlock.removeClass("vc_dependent-hidden") : rules.value && _.intersection(_.isArray(rules.value) ? rules.value : [rules.value], _.isArray(masterValue) ? masterValue : [masterValue]).length ? $paramBlock.removeClass("vc_dependent-hidden") : rules.value_not_equal_to && !_.intersection(_.isArray(rules.value_not_equal_to) ? rules.value_not_equal_to : [rules.value_not_equal_to], _.isArray(masterValue) ? masterValue : [masterValue]).length ? $paramBlock.removeClass("vc_dependent-hidden") : $paramBlock.addClass("vc_dependent-hidden"), event = $.Event("change"), event.extra_type = "vcHookDependedParamGroup", $element.trigger(event)
                    }, this), this
                },
                deleteParam: function (ev) {
                    _.isObject(ev) && ev.preventDefault && ev.preventDefault(), !0 === confirm(window.i18nLocale.press_ok_to_delete_section) && (this.options.parent.items--, this.options.parent.afterDelete(), this.$el.remove(), this.unbind(), this.remove())
                },
                content: function () {
                    return this.$content
                },
                clone: function (ev) {
                    if (ev.preventDefault(), this.options.parent.addAllowed()) {
                        var param = this.options.parent.$ul.data("settings"),
                            $content = this.$content;
                        this.$content = this.$el;
                        var value = vc.atts.param_group.parseOne.call(this, param);
                        $.ajax({
                            type: "POST",
                            url: window.ajaxurl,
                            data: {
                                action: "vc_param_group_clone",
                                param: fixedEncodeURIComponent(JSON.stringify(param)),
                                shortcode: vc.active_panel.model.get("shortcode"),
                                value: value,
                                vc_inline: !0,
                                _vcnonce: window.vcAdminNonce
                            },
                            dataType: "html",
                            context: this
                        }).done(function (html) {
                            var $newEl;
                            $newEl = $(html), $newEl.insertAfter(this.$el), this.$content = $content, this.options.parent.initializer.$content = $("> .wpb_element_wrapper", $newEl), this.options.parent.initializer.render(), $newEl.data("vc-param-group-param", new VC_ParamGroup_Param({
                                el: $newEl,
                                parent: this.options.parent
                            })), this.options.parent.items++, this.options.parent.afterAdd($newEl, "clone")
                        })
                    }
                },
                toggle: function (ev) {
                    ev.preventDefault();
                    var $parent = this.$el;
                    $parent.find("> .wpb_element_wrapper").slideToggle(), $parent.toggleClass("vc_param_group-collapsed").siblings(":not(.vc_param_group-collapsed)").addClass("vc_param_group-collapsed").find("> .wpb_element_wrapper").slideUp()
                }
            });
        window.i18nLocale;
        vc.edit_form_callbacks = [], vc.atts = {
            parse: function (param) {
                var value, params, $param, $field;
                if ($field = this.content().find(".wpb_vc_param_value[name=" + param.param_name + "]"), $param = $field.closest('[data-vc-ui-element="panel-shortcode-param"]'), _.isUndefined(vc.atts[param.type]) || _.isUndefined(vc.atts[param.type].parse) ? value = $field.length ? $field.val() : null : $param.data("vcInitParam") ? value = vc.atts[param.type].parse.call(this, param) : (params = this.model.get("params"), value = _.isUndefined(params[param.param_name]) ? $field.length ? $field.val() : null : params[param.param_name]), void 0 !== $field.data("js-function") && void 0 !== window[$field.data("js-function")]) {
                    (0, window[$field.data("js-function")])(this.$el, this, param)
                }
                return value
            },
            parseFrame: function (param) {
                return vc.atts.parse.call(this, param)
            },
            init: function (param, $field) {
                _.isUndefined(vc.atts[param.type]) || _.isUndefined(vc.atts[param.type].init) || vc.atts[param.type].init.call(this, param, $field)
            }
        }, vc.atts.textarea_html = {
            parse: function (param) {
                var _window = this.window(),
                    $field = this.content().find(".textarea_html." + param.param_name);
                try {
                    _window.tinyMCE && _.isArray(_window.tinyMCE.editors) && _.each(_window.tinyMCE.editors, function (_editor) {
                        "wpb_tinymce_content" === _editor.id && _editor.save()
                    })
                } catch (e) {
                    console && console.error && console.error(e)
                }
                return $field.val()
            },
            render: function (param, value) {
                return _.isUndefined(value) ? value : vc_wpautop(value)
            }
        }, vc.atts.textarea_safe = {
            parse: function (param) {
                var $field = this.content().find(".wpb_vc_param_value[name=" + param.param_name + "]"),
                    new_value = $field.val();
                return new_value.match(/"|(http)/) ? "#E-8_" + base64_encode(rawurlencode(new_value)) : new_value
            },
            render: function (param, value) {
                return value && value.match(/^#E\-8_/) ? $("<div/>").text(rawurldecode(base64_decode(value.replace(/^#E\-8_/, "")))).html() : value
            }
        }, vc.atts.checkbox = {
            parse: function (param) {
                var arr, newValue;
                return arr = [], newValue = "", $("input[name=" + param.param_name + "]", this.content()).each(function () {
                    var self;
                    self = $(this), this.checked && arr.push(self.attr("value"))
                }), 0 < arr.length && (newValue = arr.join(",")), newValue
            },
            defaults: function (param) {
                return ""
            }
        }, vc.atts.el_id = {
            clone: function (clonedModel, paramValue, paramSettings) {
                var shortcodeParams;
                shortcodeParams = clonedModel.get("params"), _.isUndefined(paramSettings) || _.isUndefined(paramSettings.settings) || _.isUndefined(paramSettings.settings.auto_generate) || !0 !== paramSettings.settings.auto_generate ? shortcodeParams[paramSettings.param_name] = "" : shortcodeParams[paramSettings.param_name] = Date.now() + "-" + vc_guid(), clonedModel.set({
                    params: shortcodeParams
                }, {
                    silent: !0
                })
            },
            create: function (shortcodeModel, paramValue, paramSettings) {
                if (shortcodeModel.get("cloned")) return vc.atts.el_id.clone(shortcodeModel, paramValue, paramSettings);
                if (_.isEmpty(paramValue) && !_.isUndefined(paramSettings) && !_.isUndefined(paramSettings.settings) && !_.isUndefined(paramSettings.settings.auto_generate) && 1 == paramSettings.settings.auto_generate) {
                    var shortcodeParams;
                    shortcodeParams = shortcodeModel.get("params"), shortcodeParams[paramSettings.param_name] = Date.now() + "-" + vc_guid(), shortcodeModel.set({
                        params: shortcodeParams
                    }, {
                        silent: !0
                    })
                }
            }
        }, vc.events.on("shortcodes:add:param:type:el_id", vc.atts.el_id.create), vc.atts.posttypes = {
            parse: function (param) {
                var posstypes_arr = [],
                    new_value = "";
                return $("input[name=" + param.param_name + "]", this.content()).each(function () {
                    var self = $(this);
                    this.checked && posstypes_arr.push(self.attr("value"))
                }), 0 < posstypes_arr.length && (new_value = posstypes_arr.join(",")), new_value
            }
        }, vc.atts.taxonomies = {
            parse: function (param) {
                var posstypes_arr = [],
                    new_value = "";
                return $("input[name=" + param.param_name + "]", this.content()).each(function () {
                    var self = $(this);
                    this.checked && posstypes_arr.push(self.attr("value"))
                }), 0 < posstypes_arr.length && (new_value = posstypes_arr.join(",")), new_value
            }
        }, vc.atts.exploded_textarea = {
            parse: function (param) {
                return this.content().find(".wpb_vc_param_value[name=" + param.param_name + "]").val().replace(/\n/g, ",")
            }
        }, vc.atts.exploded_textarea_safe = {
            parse: function (param) {
                var $field, new_value;
                return $field = this.content().find(".wpb_vc_param_value[name=" + param.param_name + "]"), new_value = $field.val(), new_value = new_value.replace(/\n/g, ","), new_value.match(/"|(http)/) ? "#E-8_" + base64_encode(rawurlencode(new_value)) : new_value
            },
            render: function (param, value) {
                return value && value.match(/^#E\-8_/) ? $("<div/>").text(rawurldecode(base64_decode(value.replace(/^#E\-8_/, "")))).html() : value
            }
        }, vc.atts.textarea_raw_html = {
            parse: function (param) {
                var $field = this.content().find(".wpb_vc_param_value[name=" + param.param_name + "]"),
                    new_value = $field.val();
                return base64_encode(rawurlencode(new_value))
            },
            render: function (param, value) {
                return value ? $("<div/>").text(rawurldecode(base64_decode(value.trim()))).html() : ""
            }
        }, vc.atts.dropdown = {
            render: function (param, value) {
                return value
            },
            init: function (param, $field) {
                $(".wpb_vc_param_value.dropdown", $field).change(function () {
                    var $this = $(this),
                        $options = $this.find(":selected"),
                        prev_option_class = $this.data("option"),
                        option_class = $options.length ? $options.attr("class").replace(/\s/g, "_") : "";
                    option_class = option_class.replace("#", "hash-"), void 0 !== prev_option_class && $this.removeClass(prev_option_class), void 0 !== option_class && $this.data("option", option_class) && $this.addClass(option_class)
                })
            },
            defaults: function (param) {
                var values;
                return _.isArray(param.value) || _.isString(param.value) ? _.isArray(param.value) ? (values = param.value[0], _.isArray(values) && values.length ? values[0] : values) : "" : (values = _.values(param.value)[0], values.label ? values.value : values)
            }
        }, vc.atts.attach_images = {
            parse: function (param) {
                var $field = this.content().find(".wpb_vc_param_value[name=" + param.param_name + "]"),
                    thumbnails_html = "";
                return $field.parent().find("li.added").each(function () {
                    thumbnails_html += '<li><img src="' + $(this).find("img").attr("src") + '" alt=""></li>'
                }), $("[data-model-id=" + this.model.id + "]").data("field-" + param.param_name + "-attach-images", thumbnails_html), $field.length ? $field.val() : null
            },
            render: function (param, value) {
                var $thumbnails = this.$el.find(".attachment-thumbnails[data-name=" + param.param_name + "]");
                return "external_link" === this.model.getParam("source") && (value = this.model.getParam("custom_srcs")), _.isEmpty(value) ? (this.$el.removeData("field-" + param.param_name + "-attach-images"), vc.atts.attach_images.updateImages($thumbnails, "")) : $.ajax({
                    type: "POST",
                    url: window.ajaxurl,
                    data: {
                        action: "wpb_gallery_html",
                        content: value,
                        _vcnonce: window.vcAdminNonce
                    },
                    dataType: "html",
                    context: this
                }).done(function (html) {
                    vc.atts.attach_images.updateImages($thumbnails, html)
                }), value
            },
            updateImages: function ($thumbnails, thumbnails_html) {
                $thumbnails.html(thumbnails_html), thumbnails_html.length ? $thumbnails.removeClass("image-exists").next().addClass("image-exists") : $thumbnails.addClass("image-exists").next().removeClass("image-exists")
            }
        }, vc.atts.href = {
            parse: function (param) {
                var $field = this.content().find(".wpb_vc_param_value[name=" + param.param_name + "]"),
                    val = "";
                return $field.length && "http://" !== $field.val() && (val = $field.val()), val
            }
        }, vc.atts.attach_image = {
            parse: function (param) {
                var $field = this.content().find(".wpb_vc_param_value[name=" + param.param_name + "]"),
                    image_src = "";
                return $field.parent().find("li.added").length && (image_src = $field.parent().find("li.added img").attr("src")), $("[data-model-id=" + this.model.id + "]").data("field-" + param.param_name + "-attach-image", image_src), $field.length ? $field.val() : null
            },
            render: function (param, value) {
                var $model = $("[data-model-id=" + this.model.id + "]"),
                    image_src = $model.data("field-" + param.param_name + "-attach-image"),
                    $thumbnail = this.$el.find(".attachment-thumbnail[data-name=" + param.param_name + "]"),
                    $post_id = $("#post_ID"),
                    post_id = $post_id.length ? $post_id.val() : 0;
                if ("image" === param.param_name) switch (this.model.getParam("source")) {
                    case "external_link":
                        vc.atts.attach_image.updateImage($thumbnail, this.model.getParam("custom_src"));
                        break;
                    default:
                        _.isEmpty(value) && "featured_image" !== this.model.getParam("source") ? _.isUndefined(image_src) || ($model.removeData("field-" + param.param_name + "-attach-image"), vc.atts.attach_image.updateImage($thumbnail, image_src)) : $.ajax({
                            type: "POST",
                            url: window.ajaxurl,
                            data: {
                                action: "wpb_single_image_src",
                                content: value,
                                params: this.model.get("params"),
                                post_id: post_id,
                                _vcnonce: window.vcAdminNonce
                            },
                            dataType: "html",
                            context: this
                        }).done(function (image_src) {
                            var image_exists = image_src.length || "featured_image" === this.model.getParam("source");
                            vc.atts.attach_image.updateImage($thumbnail, image_src, image_exists)
                        })
                }
                return value
            },
            updateImage: function ($thumbnail, image_src, image_exists) {
                $thumbnail.length && (void 0 === image_exists && (image_exists = !1), image_exists || !_.isEmpty(image_src) ? ($thumbnail.attr("src", image_src), _.isEmpty(image_src) ? ($thumbnail.hide(), $thumbnail.next().removeClass("image-exists").next().addClass("image-exists")) : ($thumbnail.show(), $thumbnail.next().addClass("image-exists").next().addClass("image-exists"))) : $thumbnail.attr("src", "").hide().next().removeClass("image-exists").next().removeClass("image-exists"))
            }
        }, vc.atts.google_fonts = {
            parse: function (param) {
                var string_pieces, $field = this.content().find(".wpb_vc_param_value[name=" + param.param_name + "]"),
                    $block = $field.parent(),
                    options = {};
                return options.font_family = $block.find(".vc_google_fonts_form_field-font_family-select > option:selected").val(), options.font_style = $block.find(".vc_google_fonts_form_field-font_style-select > option:selected").val(), string_pieces = _.map(options, function (value, key) {
                    if (_.isString(value) && 0 < value.length) return key + ":" + encodeURIComponent(value)
                }), $.grep(string_pieces, function (value) {
                    return _.isString(value) && 0 < value.length
                }).join("|")
            },
            init: function (param, $field) {
                var $g_fonts = $field;
                $g_fonts.length && ("undefined" != typeof WebFont ? $field.data("vc-param-object", new GoogleFonts({
                    el: $g_fonts
                })) : $g_fonts.find("> .edit_form_line").html(window.i18nLocale.gfonts_unable_to_load_google_fonts || "Unable to load Google Fonts"))
            }
        }, vc.atts.font_container = {
            parse: function (param) {
                var string_pieces, $field = this.content().find(".wpb_vc_param_value[name=" + param.param_name + "]"),
                    $block = $field.parent(),
                    options = {};
                return options.tag = $block.find(".vc_font_container_form_field-tag-select > option:selected").val(), options.font_size = $block.find(".vc_font_container_form_field-font_size-input").val(), options.text_align = $block.find(".vc_font_container_form_field-text_align-select > option:selected").val(), options.font_family = $block.find(".vc_font_container_form_field-font_family-select > option:selected").val(), options.color = $block.find(".vc_font_container_form_field-color-input").val(), options.line_height = $block.find(".vc_font_container_form_field-line_height-input").val(), options.font_style_italic = $block.find(".vc_font_container_form_field-font_style-checkbox.italic").prop("checked") ? "1" : "", options.font_style_bold = $block.find(".vc_font_container_form_field-font_style-checkbox.bold").prop("checked") ? "1" : "", string_pieces = _.map(options, function (value, key) {
                    if (_.isString(value) && 0 < value.length) return key + ":" + encodeURIComponent(value)
                }), $.grep(string_pieces, function (value) {
                    return _.isString(value) && 0 < value.length
                }).join("|")
            },
            init: function (param, $field) {
                vc.atts.colorpicker.init.call(this, param, $field)
            }
        }, vc.atts.param_group = {
            parse: function (param) {
                var data, $content, $block, $list;
                return $content = this.content(), $block = $content.find('.wpb_el_type_param_group[data-vc-ui-element="panel-shortcode-param"][data-vc-shortcode-param-name="' + param.param_name + '"]'), $list = $block.find("> .edit_form_line > .vc_param_group-list"), data = vc.atts.param_group.extractValues.call(this, param, $('>.wpb_vc_row:not(".vc_param_group-add_content-wrapper")', $list)), this.$content = $content, encodeURIComponent(JSON.stringify(data))
            },
            extractValues: function (param, $el) {
                var data, self;
                return data = [], self = this, $el.each(function () {
                    var innerData;
                    innerData = {}, self.$content = $(this), _.each(param.params, function (par) {
                        var innerParam, innerParamName, value;
                        innerParam = $.extend({}, par), innerParamName = innerParam.param_name, innerParam.param_name = param.param_name + "_" + innerParamName, value = vc.atts.parse.call(self, innerParam), (value.length || innerParam.save_always) && (innerData[innerParamName] = value)
                    }), data.push(innerData)
                }), data
            },
            parseOne: function (param) {
                var $content, data;
                return $content = this.content(), data = vc.atts.param_group.extractValues.call(this, param, $content), this.$content = $content, fixedEncodeURIComponent(JSON.stringify(data))
            },
            init: function (param, $field) {
                $field.data("vc-param-object", new VC_ParamGroup({
                    el: $field,
                    settings: {
                        param: param
                    }
                }))
            }
        }, vc.atts.colorpicker = {
            init: function (param, $field) {
                $(".vc_color-control", $field).each(function () {
                    var $alpha, $alpha_output, $pickerContainer, $control = $(this),
                        value = $control.val().replace(/\s+/g, ""),
                        alpha_val = 100;
                    value.match(/rgba\(\d+\,\d+\,\d+\,([^\)]+)\)/) && (alpha_val = 100 * parseFloat(value.match(/rgba\(\d+\,\d+\,\d+\,([^\)]+)\)/)[1])), $control.wpColorPicker({
                        clear: function (event, ui) {
                            $alpha.val(100), $alpha_output.val("100%")
                        },
                        change: _.debounce(function () {
                            $(this).trigger("change")
                        }, 500)
                    }), $pickerContainer = $control.closest(".wp-picker-container"), $('<div class="vc_alpha-container"><label>Alpha: <output class="rangevalue">' + alpha_val + '%</output></label><input type="range" min="0" max="100" value="' + alpha_val + '" name="alpha" class="vc_alpha-field"></div>').appendTo($pickerContainer.addClass("vc_color-picker").find(".iris-picker")), $alpha = $pickerContainer.find(".vc_alpha-field"), $alpha_output = $pickerContainer.find(".vc_alpha-container output"), $alpha.bind("change keyup", function () {
                        var alpha_val = parseFloat($alpha.val()),
                            iris = $control.data("a8c-iris"),
                            color_picker = $control.data("wp-wpColorPicker");
                        $alpha_output.val($alpha.val() + "%"), iris._color._alpha = alpha_val / 100, $control.val(iris._color.toString()), color_picker.toggler.css({
                            backgroundColor: $control.val()
                        })
                    }).val(alpha_val).trigger("change")
                })
            }
        }, vc.atts.autocomplete = {
            init: function (param, $field) {
                var $el_type_autocomplete = $field;
                $el_type_autocomplete.length && $el_type_autocomplete.each(function () {
                    var options, ac, $param = $(".wpb_vc_param_value", this),
                        param_name = $param.attr("name"),
                        $el = $(".vc_auto_complete_param", this);
                    options = $.extend({
                        $param_input: $param,
                        param_name: param_name,
                        $el: $el
                    }, $param.data("settings")), ac = new VC_AutoComplete(options), options.multiple && ac.enableMultiple(), options.sortable && ac.enableSortable(), $param.data("vc-param-object", ac)
                })
            }
        }, vc.atts.loop = {
            init: function (param, $field) {
                $field.data("vc-param-object", new VcLoop({
                    el: $field
                }))
            }
        }, vc.atts.vc_link = {
            init: function (param, $field) {
                $(".vc_link-build", $field).click(function (e) {
                    var $block, $input, $url_label, $title_label, value_object, $link_submit, $vc_link_submit, $vc_link_nofollow, dialog;
                    e.preventDefault(), $block = $(this).closest(".vc_link"), $input = $block.find(".wpb_vc_param_value"), $url_label = $block.find(".url-label"), $title_label = $block.find(".title-label"), value_object = $input.data("json"), $link_submit = $("#wp-link-submit"), $vc_link_submit = $('<input type="submit" name="vc_link-submit" id="vc_link-submit" class="button-primary" value="Set Link">'), $link_submit.hide(), $("#vc_link-submit").remove(), $vc_link_submit.insertBefore($link_submit), $vc_link_nofollow = $('<div class="link-target vc-link-nofollow"><label><span></span> <input type="checkbox" id="vc-link-nofollow"> Add nofollow option to link</label></div>'), $("#link-options .vc-link-nofollow").remove(), $vc_link_nofollow.insertAfter($("#link-options .link-target")), setTimeout(function () {
                        var currentHeight = $("#most-recent-results").css("top");
                        $("#most-recent-results").css("top", parseInt(currentHeight) + $vc_link_nofollow.height())
                    }, 200), dialog = !window.wpLink && $.fn.wpdialog && $("#wp-link").length ? {
                        $link: !1,
                        open: function () {
                            this.$link = $("#wp-link").wpdialog({
                                title: wpLinkL10n.title,
                                width: 480,
                                height: "auto",
                                modal: !0,
                                dialogClass: "wp-dialog",
                                zIndex: 3e5
                            }), this.$link.addClass("vc-link-wrapper")
                        },
                        close: function () {
                            this.$link && (this.$link.wpdialog("close"), this.$link.removeClass("vc-link-wrapper"))
                        }
                    } : window.wpLink;
                    var onOpen = function (e, wrap) {
                            jQuery(wrap).addClass("vc-link-wrapper")
                        },
                        onClose = function (e, wrap) {
                            jQuery(wrap).removeClass("vc-link-wrapper"), jQuery(document).off("wplink-open", onOpen), jQuery(document).off("wplink-close", onClose)
                        };
                    jQuery(document).off("wplink-open", onOpen).on("wplink-open", onOpen), jQuery(document).off("wplink-close", onClose).on("wplink-close", onClose), dialog.open("content"), _.isString(value_object.url) && ($("#wp-link-url").length ? $("#wp-link-url").val(value_object.url) : $("#url-field").val(value_object.url)), _.isString(value_object.title) && ($("#wp-link-text").length ? $("#wp-link-text").val(value_object.title) : $("#link-title-field").val(value_object.title)), $("#wp-link-target").length ? $("#wp-link-target").prop("checked", !_.isEmpty(value_object.target)) : $("#link-target-checkbox").prop("checked", !_.isEmpty(value_object.target)), $("#vc-link-nofollow").length && $("#vc-link-nofollow").prop("checked", !_.isEmpty(value_object.rel)), $vc_link_submit.unbind("click.vcLink").bind("click.vcLink", function (e) {
                        e.preventDefault(), e.stopImmediatePropagation();
                        var string, options = {};
                        options.url = $("#wp-link-url").length ? $("#wp-link-url").val() : $("#url-field").val(), options.title = $("#wp-link-text").length ? $("#wp-link-text").val() : $("#link-title-field").val();
                        var $checkbox = $($("#wp-link-target").length ? "#wp-link-target" : "#link-target-checkbox");
                        return options.target = $checkbox[0].checked ? " _blank" : "", options.rel = $("#vc-link-nofollow")[0].checked ? "nofollow" : "", string = _.map(options, function (value, key) {
                            if (_.isString(value) && 0 < value.length) return key + ":" + encodeURIComponent(value)
                        }).join("|"), $input.val(string), $input.data("json", options), $url_label.html(options.url + options.target), $title_label.html(options.title), dialog.close(), $link_submit.show(), $vc_link_submit.unbind("click.vcLink"), $vc_link_submit.remove(), $("#wp-link-cancel").unbind("click.vcLink"), window.wpLink.textarea = "", $checkbox.attr("checked", !1), $("#most-recent-results").css("top", ""), $("#vc-link-nofollow").attr("checked", !1), !1
                    }), $("#wp-link-cancel").unbind("click.vcLink").bind("click.vcLink", function (e) {
                        e.preventDefault(), dialog.close(), $vc_link_submit.unbind("click.vcLink"), $vc_link_submit.remove(), $("#wp-link-cancel").unbind("click.vcLink"), window.wpLink.textarea = ""
                    })
                })
            }
        }, vc.atts.sorted_list = {
            init: function (param, $field) {
                $(".vc_sorted-list", $field).VcSortedList()
            }
        }, vc.atts.options = {
            init: function (param, $field) {
                $field.data("vc-param-object", new VcOptionsField({
                    el: $field
                }))
            }
        }, vc.atts.iconpicker = {
            change: function (param, $field) {
                var $select = $field.find(".vc-iconpicker");
                $select.val(this.value), $select.data("vc-no-check", !0), $select.find('[value="' + this.value + '"]').attr("selected", "selected"), $select.data("vcFontIconPicker").loadIcons()
            },
            parse: function (param) {
                return this.content().find(".wpb_vc_param_value[name=" + param.param_name + "]").parent().find(".vc-iconpicker").val()
            },
            init: function (param, $field) {
                var $el = $field.find(".wpb_vc_param_value"),
                    settings = $.extend({
                        iconsPerPage: 100,
                        iconDownClass: "fip-fa fa fa-arrow-down",
                        iconUpClass: "fip-fa fa fa-arrow-up",
                        iconLeftClass: "fip-fa fa fa-arrow-left",
                        iconRightClass: "fip-fa fa fa-arrow-right",
                        iconSearchClass: "fip-fa fa fa-search",
                        iconCancelClass: "fip-fa fa fa-remove",
                        iconBlockClass: "fip-fa"
                    }, $el.data("settings"));
                $field.find(".vc-iconpicker").vcFontIconPicker(settings).on("change", function (e) {
                    var $select = $(this);
                    $select.data("vc-no-check") || $el.data("vc-no-check", !0).val(this.value).trigger("change"), $select.data("vc-no-check", !1)
                }), $el.on("change", function (e) {
                    $el.data("vc-no-check") || vc.atts.iconpicker.change.call(this, param, $field), $el.data("vc-no-check", !1)
                })
            }
        }, vc.atts.animation_style = {
            init: function (param, $field) {
                function animation_style_test(el, x) {
                    $(el).removeClass().addClass(x + " animated").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                        $(this).removeClass().addClass("vc_param-animation-style-preview")
                    })
                }
                var content = $field,
                    $field_input = $(".wpb_vc_param_value[name=" + param.param_name + "]", content);
                $('option[value="' + $field_input.val() + '"]', content).attr("selected", !0), $(".vc_param-animation-style-trigger", content).click(function (e) {
                    e.preventDefault();
                    var animation = $(".vc_param-animation-style", content).val();
                    "none" !== animation && animation_style_test(this.parentNode, "vc_param-animation-style-preview " + animation)
                }), $(".vc_param-animation-style", content).change(function () {
                    var animation = $(this).val();
                    if ($field_input.val(animation), "none" !== animation) {
                        animation_style_test($(".vc_param-animation-style-preview", content), "vc_param-animation-style-preview " + animation)
                    }
                })
            }
        }, vc.atts.vc_grid_id = {
            parse: function () {
                return "vc_gid:" + Date.now() + "-" + this.model.get("id") + "-" + Math.floor(11 * Math.random())
            }
        }, vc.atts.addShortcodeIdParam = function (model) {
            var params, settings, _changed = !1;
            params = model.get("params"), settings = vc.map[model.get("shortcode")], _.isArray(settings.params) && _.each(settings.params, function (p) {
                p && !_.isUndefined(p.type) && ("tab_id" === p.type && _.isEmpty(params[p.param_name]) ? (_changed = !0, params[p.param_name] = vc_guid() + "-" + Math.floor(11 * Math.random())) : "vc_grid_id" === p.type && (_changed = !0, params[p.param_name] = vc.atts.vc_grid_id.parse.call({
                    model: model
                })))
            }), _changed && model.save("params", params, {
                silent: !0
            })
        }, vc.getMapped = vc.memoizeWrapper(function (tag) {
            return vc.map[tag] || {}
        })
    }(window.jQuery),
    function ($) {
        vc.debug = !1, vc.map = _.isUndefined(window.vc_mapper) ? {} : window.vc_mapper, vc.roles = _.isUndefined(window.vc_roles) ? {} : window.vc_roles, vc.Storage = function () {
            this.data = {}
        }, vc.Storage.prototype = {
            url: window.ajaxurl,
            checksum: !1,
            locked: !1,
            create: function (model) {
                return model.id || (model.id = model.attributes.id = vc_guid()), this.data[model.id] = model.toJSON(), this.setModelRoot(model.id), this.save(), model
            },
            lock: function () {
                this.locked = !0
            },
            unlock: function () {
                this.locked = !1
            },
            setModelRoot: function (id) {
                var data = this.data[id];
                _.isString(data.parent_id) && _.isObject(this.data[data.parent_id]) && (data.root_id = this.data[data.parent_id].root_id), _.isObject(this.data[data.root_id]) && (this.data[data.root_id].html = !1)
            },
            update: function (model) {
                return this.data[model.id] = model.toJSON(), this.setModelRoot(model.id), this.save(), model
            },
            destroy: function (model) {
                return _.isUndefined(this.data[model.id]) || _.isUndefined(this.data[model.id].root_id) || !_.isObject(this.data[this.data[model.id].root_id]) || (this.data[this.data[model.id].root_id].html = !1), _.isUndefined(this.data[model.id]) || delete this.data[model.id], this.save(), model
            },
            find: function (model_id) {
                return this.data[model_id]
            },
            findAll: function () {
                return this.fetch(), _.values(this.data)
            },
            findAllRootSorted: function () {
                var models = _.filter(_.values(this.data), function (model) {
                    return !1 === model.parent_id
                });
                return _.sortBy(models, function (model) {
                    return model.order
                })
            },
            escapeParam: function (value) {
                return _.isUndefined(value) || _.isNull(value) || !value.toString ? "" : value.toString().replace(/"/g, "``").replace(/\[/g, "`{`").replace(/\]/g, "`}`")
            },
            unescapeParam: function (value) {
                return value.replace(/\`{\`/g, "[").replace(/\`}\`/g, "]").replace(/(\`{2})/g, '"')
            },
            storageCreateShortcodeString: function (model) {
                var mapped, data, tag, params, content, paramsForString, mergedParams, isContainer;
                return tag = model.get("shortcode"), params = _.extend({}, model.get("params")), paramsForString = {}, mergedParams = vc.getMergedParams(tag, params), _.each(mergedParams, function (value, key) {
                    paramsForString[key] = this.escapeParam(value)
                }, this), mapped = vc.getMapped(tag), isContainer = _.isObject(mapped) && (_.isBoolean(mapped.is_container) && !0 === mapped.is_container || !_.isEmpty(mapped.as_parent)), content = this._storageGetShortcodeContent(model), data = {
                    tag: tag,
                    attrs: paramsForString,
                    content: content,
                    type: _.isUndefined(vc.getParamSettings(tag, "content")) && !isContainer ? "single" : ""
                }, model.trigger("stringify", model, data), wp.shortcode.string(data)
            },
            save: function () {
                if (this.locked) return this.locked = !1, !1;
                var content = _.reduce(this.findAllRootSorted(), function (memo, modelArray) {
                    var model = vc.shortcodes.get(modelArray);
                    return memo + this.storageCreateShortcodeString(model)
                }, "", this);
                return this.setContent(content), this.checksum = vc_globalHashCode(content), this
            },
            _storageGetShortcodeContent: function (parent) {
                var models, params;
                return models = _.sortBy(_.filter(this.data, function (model) {
                    return model.parent_id === parent.get("id")
                }), function (model) {
                    return model.order
                }), models.length ? _.reduce(models, function (memo, modelArray) {
                    var model = vc.shortcodes.get(modelArray);
                    return memo + this.storageCreateShortcodeString(model)
                }, "", this) : (params = _.extend({}, parent.get("params")), _.isUndefined(params.content) ? "" : params.content)
            },
            getContent: function () {
                return _.isObject(window.tinymce) && tinymce.editors.content && tinymce.editors.content.save(), window.vc_wpnop($("#content").val() || "")
            },
            setContent: function (content) {
                var contentTinyMce = window.tinyMCE && window.tinyMCE.get && window.tinyMCE.get("content");
                content = vc_wpautop(content), $("#content").val(content), contentTinyMce && contentTinyMce.setContent(content) && contentTinyMce.fire("change")
            },
            parseContent: function (data, content, parent) {
                var tags = _.keys(vc.map).join("|"),
                    reg = window.wp.shortcode.regexp(tags),
                    matches = content.trim().match(reg);
                return _.isNull(matches) ? data : (_.each(matches, function (raw) {
                    var shortcode, map_settings, sub_matches = raw.match(this.regexp(tags)),
                        sub_content = sub_matches[5],
                        sub_regexp = new RegExp("^[\\s]*\\[\\[?(" + _.keys(vc.map).join("|") + ")(?![\\w-])"),
                        id = window.vc_guid(),
                        atts_raw = window.wp.shortcode.attrs(sub_matches[3]),
                        atts = {};
                    _.each(atts_raw.named, function (value, key) {
                        atts[key] = this.unescapeParam(value)
                    }, this), shortcode = {
                        id: id,
                        shortcode: sub_matches[2],
                        order: this.order,
                        params: _.extend({}, atts),
                        parent_id: !!_.isObject(parent) && parent.id,
                        root_id: _.isObject(parent) ? parent.root_id : id
                    }, map_settings = vc.map[shortcode.shortcode], this.order += 1, data[id] = shortcode, id == shortcode.root_id && (data[id].html = raw), _.isString(sub_content) && sub_content.match(sub_regexp) && (_.isBoolean(map_settings.is_container) && !0 === map_settings.is_container || !_.isEmpty(map_settings.as_parent) && !1 !== map_settings.as_parent) ? data = this.parseContent(data, sub_content, data[id]) : _.isString(sub_content) && sub_content.length && "vc_row" === sub_matches[2] ? data = this.parseContent(data, '[vc_column width="1/1"][vc_column_text]' + sub_content + "[/vc_column_text][/vc_column]", data[id]) : _.isString(sub_content) && sub_content.length && "vc_column" === sub_matches[2] ? data = this.parseContent(data, "[vc_column_text]" + sub_content + "[/vc_column_text]", data[id]) : _.isString(sub_content) && (data[id].params.content = sub_content)
                }, this), data)
            },
            isContentChanged: function () {
                return !1 === this.checksum || this.checksum !== vc_globalHashCode(this.getContent())
            },
            wrapData: function (content) {
                var tags = _.keys(vc.map).join("|"),
                    reg = this.regexp_split("vc_row"),
                    starts_with_shortcode = new RegExp("^\\[(\\[?)(" + tags + ")", "g"),
                    _this = this,
                    storage = {},
                    i = 0;
                content = wp.shortcode.replace("vc_section", content, function (data) {
                    var toSave = {
                        attrs: data.attrs.named,
                        content: _this.wrapData(data.content)
                    };
                    i++;
                    var hash = "vc_pseudo_section_" + i + "_" + VCS4() + VCS4();
                    return storage[hash] = {
                        tag: hash,
                        data: toSave
                    }, '[vc_row][vc_pseudo_section id="' + hash + '"][/vc_pseudo_section][/vc_row]'
                });
                var matches = _.filter(content.trim().split(reg), function (value) {
                    if (!_.isEmpty(value)) return value
                });
                return content = _.reduce(matches, function (mem, value) {
                    -1 !== value.trim().indexOf("vc_pseudo_section_") || value.trim().match(starts_with_shortcode) || (value = "[vc_row][vc_column][vc_column_text]" + value + "[/vc_column_text][/vc_column][/vc_row]");
                    var matches_local = value.match(vc_regexp_shortcode());
                    return !_.isArray(matches_local) || _.isUndefined(matches_local[2]) || -1 !== matches_local[2].indexOf("vc_pseudo_section_") || _.isUndefined(vc.map[matches_local[2]]) || !_.isUndefined(vc.map[matches_local[2]].is_container) && vc.map[matches_local[2]].is_container || !_.isEmpty(vc.map[matches_local[2]].as_parent) || (value = "[vc_row][vc_column]" + value + "[/vc_column][/vc_row]"), mem + value
                }, ""), Object.keys(storage).length > 0 && (content = content.replace(/\[vc_row\]\[vc_pseudo_section/g, "[vc_pseudo_section"), content = content.replace(/\[\/vc_pseudo_section\]\[\/vc_row\]/g, "[/vc_pseudo_section]"), content = wp.shortcode.replace("vc_pseudo_section", content, function (data) {
                    var item = storage[data.attrs.named.id];
                    return wp.shortcode.string({
                        tag: "vc_section",
                        attrs: item.data.attrs,
                        content: item.data.content
                    })
                })), content
            },
            fetch: function () {
                if (!this.isContentChanged()) return this;
                this.order = 0;
                var content = this.getContent();
                this.checksum = vc_globalHashCode(content), content = this.wrapData(content), this.data = this.parseContent({}, content)
            },
            append: function (content) {
                this.data = {}, this.order = 0;
                try {
                    var current_content = this.getContent();
                    this.setContent(current_content + "" + content)
                } catch (e) {
                    window.console && window.console.error && window.console.error(e)
                }
            },
            regexp_split: _.memoize(function (tags) {
                return new RegExp("(\\[(\\[?)[" + tags + "]+(?![\\w-])[^\\]\\/]*[\\/(?!\\])[^\\]\\/]*]?(?:\\/]\\]|\\](?:[^\\[]*(?:\\[(?!\\/" + tags + "\\])[^\\[]*)*\\[\\/" + tags + "\\])?)\\]?)", "g")
            }),
            regexp: _.memoize(function (tags) {
                return new RegExp("\\[(\\[?)(" + tags + ")(?![\\w-])([^\\]\\/]*(?:\\/(?!\\])[^\\]\\/]*)*?)(?:(\\/)\\]|\\](?:([^\\[]*(?:\\[(?!\\/\\2\\])[^\\[]*)*)(\\[\\/\\2\\]))?)(\\]?)")
            })
        }, vc.storage = new vc.Storage
    }(window.jQuery),
    function ($) {
        var store = vc.storage;
        vc.shortcode = Backbone.Model.extend({
            settings: !1,
            defaults: function () {
                var id = window.vc_guid();
                return {
                    id: id,
                    shortcode: "vc_text_block",
                    order: vc.shortcodes.getNextOrder(),
                    params: {},
                    parent_id: !1,
                    root_id: id,
                    cloned: !1,
                    html: !1,
                    view: !1
                }
            },
            initialize: function () {
                this.bind("remove", this.removeChildren, this), this.bind("remove", this.removeEvents, this)
            },
            removeEvents: function (model) {
                vc.events.triggerShortcodeEvents("destroy", model)
            },
            sync: function (method, model, options) {
                if (options && options.silent) return options.success(model);
                var response;
                switch (method) {
                    case "read":
                        response = model.id ? store.find(model) : store.findAll();
                        break;
                    case "create":
                        response = store.create(model);
                        break;
                    case "update":
                        response = store.update(model);
                        break;
                    case "delete":
                        response = store.destroy(model)
                }
                response ? options.success(response) : options.error("Record not found")
            },
            getParam: function (key) {
                return _.isObject(this.get("params")) && !_.isUndefined(this.get("params")[key]) ? this.get("params")[key] : ""
            },
            removeChildren: function (parent) {
                var models = vc.shortcodes.where({
                    parent_id: parent.id
                });
                _.each(models, function (model) {
                    vc.storage.lock(), model.destroy(), this.removeChildren(model)
                }, this), models.length && vc.storage.save()
            },
            setting: function (name) {
                return !1 === this.settings && (this.settings = vc.getMapped(this.get("shortcode")) || {}), this.settings[name]
            }
        }), vc.shortcodes_collection = Backbone.Collection.extend({
            model: vc.shortcode,
            last_index: 0,
            getNextOrder: function () {
                return this.last_index++
            },
            comparator: function (model) {
                return model.get("order")
            },
            initialize: function () {},
            createFromString: function (shortcodes_string, parent_model) {
                var data;
                data = vc.storage.parseContent({}, shortcodes_string, !!_.isObject(parent_model) && parent_model.toJSON()), _.each(_.values(data), function (model) {
                    vc.shortcodes.create(model)
                }, this)
            },
            sync: function (method, model, options) {
                var response;
                switch (method) {
                    case "read":
                        response = model.id ? store.find(model) : store.findAll();
                        break;
                    case "create":
                        response = store.create(model);
                        break;
                    case "update":
                        response = store.update(model);
                        break;
                    case "delete":
                        response = store.destroy(model)
                }
                response ? options.success(response) : options.error("Record not found")
            },
            stringify: function (state) {
                var models = _.sortBy(vc.shortcodes.where({
                    parent_id: !1
                }), function (model) {
                    return model.get("order")
                });
                return this.modelsToString(models, state)
            },
            singleStringify: function (id, state) {
                return this.modelsToString([vc.shortcodes.get(id)], state)
            },
            createShortcodeString: function (model, state) {
                var mapped, data, tag, params, content, paramsForString, mergedParams, isContainer;
                return tag = model.get("shortcode"), params = _.extend({}, model.get("params")), paramsForString = {}, mergedParams = vc.getMergedParams(tag, params), _.each(mergedParams, function (value, key) {
                    paramsForString[key] = vc.storage.escapeParam(value)
                }, this), mapped = vc.getMapped(tag), isContainer = _.isObject(mapped) && (_.isBoolean(mapped.is_container) && !0 === mapped.is_container || !_.isEmpty(mapped.as_parent)), content = this._getShortcodeContent(model, state), data = {
                    tag: tag,
                    attrs: paramsForString,
                    content: content,
                    type: _.isUndefined(vc.getParamSettings(tag, "content")) && !isContainer ? "single" : ""
                }, _.isUndefined(state) ? model.trigger("stringify", model, data) : model.trigger("stringify:" + state, model, data), data.remove ? "" : wp.shortcode.string(data)
            },
            modelsToString: function (models, state) {
                return _.reduce(models, function (memo, model) {
                    return memo + this.createShortcodeString(model, state)
                }, "", this)
            },
            _getShortcodeContent: function (parent, state) {
                var models, params;
                return models = _.sortBy(vc.shortcodes.where({
                    parent_id: parent.get("id")
                }), function (model) {
                    return model.get("order")
                }), models.length ? _.reduce(models, function (memo, model) {
                    return memo + this.createShortcodeString(model, state)
                }, "", this) : (params = _.extend({}, parent.get("params")), _.isUndefined(params.content) ? "" : params.content)
            }
        }), vc.shortcodes = new vc.shortcodes_collection, vc.getDefaults = vc.memoizeWrapper(function (tag) {
            var defaults, params;
            return defaults = {}, params = _.isObject(vc.map[tag]) && _.isArray(vc.map[tag].params) ? vc.map[tag].params : [], _.each(params, function (param) {
                _.isObject(param) && (_.isUndefined(param.std) ? vc.atts[param.type] && vc.atts[param.type].defaults ? defaults[param.param_name] = vc.atts[param.type].defaults(param) : _.isUndefined(param.value) || (_.isObject(param.value) ? defaults[param.param_name] = _.values(param.value)[0] : _.isArray(param.value) ? defaults[param.param_name] = param.value[0] : defaults[param.param_name] = param.value) : defaults[param.param_name] = param.std)
            }), defaults
        }), vc.getDefaultsAndDependencyMap = vc.memoizeWrapper(function (tag) {
            var defaults, dependencyMap, params;
            return dependencyMap = {}, defaults = {}, params = _.isObject(vc.map[tag]) && _.isArray(vc.map[tag].params) ? vc.map[tag].params : [], _.each(params, function (param) {
                _.isObject(param) && "content" !== param.param_name && (_.isUndefined(param.std) ? _.isUndefined(param.value) || (vc.atts[param.type] && vc.atts[param.type].defaults ? defaults[param.param_name] = vc.atts[param.type].defaults(param) : _.isObject(param.value) ? defaults[param.param_name] = _.values(param.value)[0] : _.isArray(param.value) ? defaults[param.param_name] = param.value[0] : defaults[param.param_name] = param.value) : defaults[param.param_name] = param.std, _.isUndefined(param.dependency) || _.isUndefined(param.dependency.element) || (dependencyMap[param.param_name] = param.dependency))
            }), {
                defaults: defaults,
                dependencyMap: dependencyMap
            }
        }), vc.getMergedParams = function (tag, values) {
            var paramsMap, outputParams, paramsDependencies;
            return paramsMap = vc.getDefaultsAndDependencyMap(tag), outputParams = {}, values = _.extend({}, paramsMap.defaults, values), paramsDependencies = _.extend({}, paramsMap.dependencyMap), _.each(values, function (value, key) {
                if ("content" !== key) {
                    var paramSettings;
                    if (!_.isUndefined(paramsDependencies[key])) {
                        if (!_.isUndefined(paramsDependencies[paramsDependencies[key].element]) && _.isBoolean(paramsDependencies[paramsDependencies[key].element].failed) && !0 === paramsDependencies[paramsDependencies[key].element].failed) return void(paramsDependencies[key].failed = !0);
                        var rules, isDependedEmpty, dependedElement, dependedValue;
                        dependedElement = paramsDependencies[key].element, dependedValue = values[dependedElement], isDependedEmpty = _.isEmpty(dependedValue);
                        var dependedValueSplit = !1;
                        if ("string" == typeof dependedValue && (dependedValueSplit = values[dependedElement].split(",").map(function (i) {
                                return i.trim()
                            }).filter(function (i) {
                                return i
                            })), rules = _.omit(paramsDependencies[key], "element"), _.isBoolean(rules.not_empty) && !0 === rules.not_empty && isDependedEmpty || _.isBoolean(rules.is_empty) && !0 === rules.is_empty && !isDependedEmpty || rules.value && !_.intersection(_.isArray(rules.value) ? rules.value : [rules.value], _.isArray(dependedValue) ? dependedValue : [dependedValue]).length && dependedValueSplit && rules.value && !_.intersection(_.isArray(rules.value) ? rules.value : [rules.value], _.isArray(dependedValueSplit) ? dependedValueSplit : [dependedValueSplit]).length || rules.value_not_equal_to && _.intersection(_.isArray(rules.value_not_equal_to) ? rules.value_not_equal_to : [rules.value_not_equal_to], _.isArray(dependedValue) ? dependedValue : [dependedValue]).length && dependedValueSplit && rules.value_not_equal_to && _.intersection(_.isArray(rules.value_not_equal_to) ? rules.value_not_equal_to : [rules.value_not_equal_to], _.isArray(dependedValueSplit) ? dependedValueSplit : [dependedValueSplit]).length) return void(paramsDependencies[key].failed = !0)
                    }
                    paramSettings = vc.getParamSettings(tag, key), _.isUndefined(paramSettings) ? outputParams[key] = value : (!_.isUndefined(paramsMap.defaults[key]) && paramsMap.defaults[key] !== value || _.isUndefined(paramsMap.defaults[key]) && "" !== value || !_.isUndefined(paramSettings.save_always) && !0 === paramSettings.save_always) && (outputParams[key] = value)
                }
            }), outputParams
        }, vc.getParamSettings = vc.memoizeWrapper(function (tag, paramName) {
            var params;
            return params = _.isObject(vc.map[tag]) && _.isArray(vc.map[tag].params) ? vc.map[tag].params : [], _.find(params, function (settings) {
                return _.isObject(settings) && settings.param_name === paramName
            }, this)
        }, function () {
            return arguments[0] + "," + arguments[1]
        }), vc.getParamSettingsByType = vc.memoizeWrapper(function (tag, paramType) {
            var params;
            return params = _.isObject(vc.map[tag]) && _.isArray(vc.map[tag].params) ? vc.map[tag].params : [], _.find(params, function (settings) {
                return _.isObject(settings) && settings.type === paramType
            }, this)
        }, function () {
            return arguments[0] + "," + arguments[1]
        }), vc.shortcodeHasIdParam = vc.memoizeWrapper(function (tag) {
            return vc.getParamSettingsByType(tag, "el_id")
        })
    }(window.jQuery),
    function ($) {
        vc.clone_index = 1, vc.shortcode_view = Backbone.View.extend({
            tagName: "div",
            $content: "",
            use_default_content: !1,
            params: {},
            events: {
                "click .column_delete,.vc_control-btn-delete": "deleteShortcode",
                "click .column_add,.vc_control-btn-prepend": "addElement",
                "click .column_edit,.vc_control-btn-edit, .column_edit_trigger": "editElement",
                "click .column_clone,.vc_control-btn-clone": "clone",
                mousemove: "checkControlsPosition"
            },
            removeView: function () {
                vc.closeActivePanel(this.model), this.remove()
            },
            checkControlsPosition: function () {
                if (this.$controls_buttons) {
                    var window_top, element_position_top, new_position, element_height = this.$el.height();
                    element_height > $(window).height() && (window_top = $(window).scrollTop(), element_position_top = this.$el.offset().top, new_position = window_top - element_position_top + $(window).height() / 2, 40 < new_position && new_position < element_height ? this.$controls_buttons.css("top", new_position) : new_position > element_height ? this.$controls_buttons.css("top", element_height - 40) : this.$controls_buttons.css("top", 40))
                }
            },
            initialize: function () {
                this.model.bind("destroy", this.removeView, this), this.model.bind("change:params", this.changeShortcodeParams, this), this.model.bind("change_parent_id", this.changeShortcodeParent, this), this.createParams()
            },
            hasUserAccess: function () {
                var shortcodeTag;
                return shortcodeTag = this.model.get("shortcode"), -1 < _.indexOf(["vc_row", "vc_column", "vc_row_inner", "vc_column_inner"], shortcodeTag) || !!_.every(vc.roles.current_user, function (role) {
                    return !(!_.isUndefined(vc.roles[role]) && !_.isUndefined(vc.roles[role].shortcodes) && _.isUndefined(vc.roles[role].shortcodes[shortcodeTag]))
                })
            },
            canCurrentUser: function (action) {
                var tag;
                return tag = this.model.get("shortcode"), void 0 === action || "all" === action ? vc_user_access().shortcodeAll(tag) : vc_user_access().shortcodeEdit(tag)
            },
            createParams: function () {
                var tag, settings;
                tag = this.model.get("shortcode"), settings = _.isObject(vc.map[tag]) && _.isArray(vc.map[tag].params) ? vc.map[tag].params : [], this.model.get("params"), this.params = {}, _.each(settings, function (param) {
                    this.params[param.param_name] = param
                }, this)
            },
            setContent: function () {
                this.$content = this.$el.find("> .wpb_element_wrapper > .vc_container_for_children, > .vc_element-wrapper > .vc_container_for_children")
            },
            setEmpty: function () {},
            unsetEmpty: function () {},
            checkIsEmpty: function () {
                this.model.get("parent_id") && vc.app.views[this.model.get("parent_id")].checkIsEmpty()
            },
            html2element: function (html) {
                var $template, attributes = {},
                    template = vc.template(html);
                $template = $(template(this.model.toJSON()).trim()), _.each($template.get(0).attributes, function (attr) {
                    attributes[attr.name] = attr.value
                }), this.$el.attr(attributes).html($template.html()), this.setContent(), this.renderContent()
            },
            render: function () {
                var $shortcode_template_el = $("#vc_shortcode-template-" + this.model.get("shortcode"));
                return $shortcode_template_el.is("script") && this.html2element($shortcode_template_el.html()), this.model.view = this, this.$controls_buttons = this.$el.find(".vc_controls > :first"), this
            },
            renderContent: function () {
                return this.$el.attr("data-model-id", this.model.get("id")), this.$el.data("model", this.model), this
            },
            changedContent: function (view) {},
            _loadDefaults: function () {
                var tag, hasChilds;
                tag = this.model.get("shortcode"), !(hasChilds = !!vc.shortcodes.where({
                    parent_id: this.model.get("id")
                }).length) && !0 === this.use_default_content && _.isObject(vc.map[tag]) && _.isString(vc.map[tag].default_content) && vc.map[tag].default_content.length && (this.use_default_content = !1, vc.shortcodes.createFromString(vc.map[tag].default_content, this.model))
            },
            _callJsCallback: function () {
                var tag = this.model.get("shortcode");
                if (_.isObject(vc.map[tag]) && _.isObject(vc.map[tag].js_callback) && !_.isUndefined(vc.map[tag].js_callback.init)) {
                    var fn = vc.map[tag].js_callback.init;
                    window[fn](this.$el)
                }
            },
            ready: function (e) {
                return this._loadDefaults(), this._callJsCallback(), this.model.get("parent_id") && _.isObject(vc.app.views[this.model.get("parent_id")]) && vc.app.views[this.model.get("parent_id")].changedContent(this), _.defer(_.bind(function () {
                    vc.events.trigger("shortcodeView:ready", this), vc.events.trigger("shortcodeView:ready:" + this.model.get("shortcode"), this)
                }, this)), this
            },
            addShortcode: function (view, method) {
                var before_shortcode;
                before_shortcode = _.last(vc.shortcodes.filter(function (shortcode) {
                    return shortcode.get("parent_id") === this.get("parent_id") && parseFloat(shortcode.get("order")) < parseFloat(this.get("order"))
                }, view.model)), before_shortcode ? view.render().$el.insertAfter("[data-model-id=" + before_shortcode.id + "]") : "append" === method ? this.$content.append(view.render().el) : this.$content.prepend(view.render().el)
            },
            changeShortcodeParams: function (model) {
                var tag, params, settings, view;
                tag = model.get("shortcode"), params = model.get("params"), settings = vc.map[tag], _.defer(function () {
                    vc.events.trigger("backend.shortcodeViewChangeParams:" + tag)
                }), (_.isArray(settings.params) || _.isObject(settings.params)) && _.each(settings.params, function (param_settings) {
                    var name, value, $wrapper, label_value, $admin_label;
                    if (name = param_settings.param_name, value = params[name], $wrapper = this.$el.find("> .wpb_element_wrapper, > .vc_element-wrapper"), label_value = value, $admin_label = $wrapper.children(".admin_label_" + name), _.isObject(vc.atts[param_settings.type]) && _.isFunction(vc.atts[param_settings.type].render) && (value = vc.atts[param_settings.type].render.call(this, param_settings, value)), $wrapper.children("." + param_settings.param_name).is("input,textarea,select")) $wrapper.children("[name=" + param_settings.param_name + "]").val(value);
                    else if ($wrapper.children("." + param_settings.param_name).is("iframe")) $wrapper.children("[name=" + param_settings.param_name + "]").attr("src", value);
                    else if ($wrapper.children("." + param_settings.param_name).is("img")) {
                        var $img;
                        $img = $wrapper.children("[name=" + param_settings.param_name + "]"), value && value.match(/^\d+$/) ? $.ajax({
                            type: "POST",
                            url: window.ajaxurl,
                            data: {
                                action: "wpb_single_image_src",
                                content: value,
                                size: "thumbnail",
                                _vcnonce: window.vcAdminNonce
                            },
                            dataType: "html",
                            context: this
                        }).done(function (url) {
                            $img.attr("src", url)
                        }) : value && $img.attr("src", value)
                    } else $wrapper.children("[name=" + param_settings.param_name + "]").html(value || "");
                    if ($admin_label.length) {
                        var inverted_value;
                        "" === value || _.isUndefined(value) ? $admin_label.hide().addClass("hidden-label") : (_.isObject(param_settings.value) && !_.isArray(param_settings.value) && "checkbox" === param_settings.type ? (inverted_value = _.invert(param_settings.value), label_value = _.map(value.split(/[\s]*\,[\s]*/), function (val) {
                            return _.isString(inverted_value[val]) ? inverted_value[val] : val
                        }).join(", ")) : _.isObject(param_settings.value) && !_.isArray(param_settings.value) && (inverted_value = _.invert(param_settings.value), label_value = _.isString(inverted_value[value]) ? inverted_value[value] : value), $admin_label.html("<label>" + $admin_label.find("label").text() + "</label>: " + label_value), $admin_label.show().removeClass("hidden-label"))
                    }
                }, this), view = vc.app.views[model.get("parent_id")], !1 !== model.get("parent_id") && _.isObject(view) && view.checkIsEmpty()
            },
            changeShortcodeParent: function (model) {
                if (!1 === this.model.get("parent_id")) return model;
                var $parent_view = $("[data-model-id=" + this.model.get("parent_id") + "]"),
                    view = vc.app.views[this.model.get("parent_id")];
                this.$el.appendTo($parent_view.find("> .wpb_element_wrapper > .wpb_column_container, > .vc_element-wrapper > .wpb_column_container")), view.checkIsEmpty()
            },
            deleteShortcode: function (e) {
                _.isObject(e) && e.preventDefault(), !0 === confirm(window.i18nLocale.press_ok_to_delete_section) && this.model.destroy()
            },
            addElement: function (e) {
                _.isObject(e) && e.preventDefault(), vc.add_element_block_view.render(this.model, !_.isObject(e) || !$(e.currentTarget).closest(".bottom-controls").hasClass("bottom-controls"))
            },
            editElement: function (e) {
                _.isObject(e) && e.preventDefault(), (!vc.active_panel || !vc.active_panel.model || !this.model || vc.active_panel.model && this.model && vc.active_panel.model.get("id") != this.model.get("id")) && (vc.closeActivePanel(), vc.edit_element_block_view.render(this.model))
            },
            clone: function (e) {
                return _.isObject(e) && e.preventDefault(), vc.clone_index /= 10, this.cloneModel(this.model, this.model.get("parent_id"))
            },
            cloneModel: function (model, parent_id, save_order) {
                var new_order, model_clone, params, tag;
                return new_order = _.isBoolean(save_order) && !0 === save_order ? model.get("order") : parseFloat(model.get("order")) + vc.clone_index, params = _.extend({}, model.get("params")), tag = model.get("shortcode"), model_clone = vc.shortcodes.create({
                    shortcode: tag,
                    id: window.vc_guid(),
                    parent_id: parent_id,
                    order: new_order,
                    cloned: !0,
                    cloned_from: model.toJSON(),
                    params: params
                }), _.each(vc.shortcodes.where({
                    parent_id: model.id
                }), function (shortcode) {
                    this.cloneModel(shortcode, model_clone.get("id"), !0)
                }, this), model_clone
            },
            remove: function () {
                this.$content && this.$content.data("uiSortable") && this.$content.sortable("destroy"), this.$content && this.$content.data("uiDroppable") && this.$content.droppable("destroy"), delete vc.app.views[this.model.id], window.vc.shortcode_view.__super__.remove.call(this)
            }
        }), vc.shortcodes.on("sync", function (collection) {
            _.isObject(collection) && !_.isEmpty(collection.models) && _.each(collection.models, function (model) {
                vc.events.triggerShortcodeEvents("sync", model)
            })
        }), vc.shortcodes.on("add", function (model) {
            _.isObject(model) && vc.events.triggerShortcodeEvents("add", model)
        })
    }(window.jQuery),
    function ($) {
        vc.saved_custom_css = !1, vc.visualComposerView = Backbone.View.extend({
            el: $("#wpb_visual_composer"),
            views: {},
            disableFixedNav: !1,
            events: {
                "click #wpb-add-new-row": "createRow",
                "click #vc_post-settings-button": "editSettings",
                'click #vc_add-new-element, [data-vc-element="add-element-action"]': "addElement",
                "click #vc_fullscreen-button": "enterFullscreen",
                "click #vc_windowed-button": "leaveFullscreen",
                'click [data-vc-element="add-text-block-action"]': "addTextBlock",
                "click .wpb_switch-to-composer": "switchComposer",
                "click #vc_templates-editor-button": "openTemplatesWindow",
                "click #vc_templates-more-layouts": "openTemplatesWindow",
                "click .vc_template[data-template_id] > .wpb_wrapper": "loadDefaultTemplate",
                "click #wpb-save-post": "save",
                "click .vc_control-preview": "preview"
            },
            initializeAccessPolicy: function () {
                this.accessPolicy = {
                    be_editor: vc_user_access().editor("backend_editor"),
                    fe_editor: vc_frontend_enabled && vc_user_access().editor("frontend_editor"),
                    classic_editor: !vc_user_access().check("backend_editor", "disabled_ce_editor", void 0, !0)
                }
            },
            accessPolicyActions: function () {
                var front = "",
                    back = "";
                if (this.accessPolicy.fe_editor && (front = '<a class="wpb_switch-to-front-composer" href="' + $("#wpb-edit-inline").attr("href") + '">' + window.i18nLocale.main_button_title_frontend_editor + "</a>"), this.accessPolicy.classic_editor) this.accessPolicy.be_editor && (back = '<a class="wpb_switch-to-composer" href="#">' + window.i18nLocale.main_button_title_backend_editor + "</a>");
                else if ($("#postdivrich").addClass("vc-disable-editor"), this.accessPolicy.be_editor) {
                    var _this = this;
                    _.defer(function () {
                        _this.show(), _this.status = "shown"
                    })
                }(front || back) && (this.$buttonsContainer = $('<div class="composer-switch"><span class="logo-icon"></span>' + back + front + "</div>").insertAfter("div#titlediv"), this.accessPolicy.classic_editor && (this.$switchButton = this.$buttonsContainer.find(".wpb_switch-to-composer"), this.$switchButton.click(this.switchComposer)))
            },
            initialize: function () {
                var _this = this;
                _.bindAll(this, "switchComposer", "dropButton", "processScroll", "updateRowsSorting", "updateElementsSorting"), this.accessPolicy = vc.accessPolicy, this.buildRelevance(), vc.events.on("shortcodes:add", vcAddShortcodeDefaultParams, this), vc.events.on("shortcodes:add", vc.atts.addShortcodeIdParam, this), vc.events.on("shortcodes:sync", vc.atts.addShortcodeIdParam, this), vc.events.on("shortcodes:add", this.addShortcode, this), vc.events.on("shortcodes:destroy", this.checkEmpty, this), vc.shortcodes.on("change:params", this.changeParamsEvents, this), vc.shortcodes.on("reset", this.addAll, this), $(document).on("wp-collapse-menu", function (e, params) {
                    "open" === params.state && _this.leaveFullscreen()
                }), this.render()
            },
            changeParamsEvents: function (model) {
                vc.events.triggerShortcodeEvents("update", model)
            },
            render: function () {
                return this.$buttonsContainer = $(".composer-switch"), this.$switchButton = this.$buttonsContainer.find(".wpb_switch-to-composer"), this.$vcStatus = $("#wpb_vc_js_status"), this.$metablock_content = $(".metabox-composer-content"), this.$content = $("#visual_composer_content"), this.$post = $("#postdivrich"), this.$loading_block = $("#vc_logo"), vc.add_element_block_view = new vc.AddElementUIPanelBackendEditor({
                    el: "#vc_ui-panel-add-element"
                }), vc.edit_element_block_view = new vc.EditElementUIPanel({
                    el: "#vc_ui-panel-edit-element"
                }), vc.templates_panel_view = new vc.TemplateWindowUIPanelBackendEditor({
                    el: "#vc_ui-panel-templates"
                }), vc.post_settings_view = new vc.PostSettingsUIPanelBackendEditor({
                    el: "#vc_ui-panel-post-settings"
                }), vc.preset_panel_view = new vc.PresetSettingsUIPanelFrontendEditor({
                    el: "#vc_ui-panel-preset"
                }), this.setSortable(), vc.is_mobile = 0 < $("body.mobile").length, vc.saved_custom_css = $("#wpb_custom_post_css_field").val(), vc.updateSettingsBadge(), _.defer(function () {
                    vc.events.trigger("app.render")
                }), this
            },
            addAll: function () {
                this.views = {}, this.$content.removeClass("loading").empty(), this.addChild(!1), this.checkEmpty(), this.$loading_block.removeClass("vc_ui-wp-spinner"), this.$metablock_content.removeClass("vc_loading-shortcodes"), _.defer(function () {
                    vc.events.trigger("app.addAll")
                })
            },
            addChild: function (parent_id) {
                _.each(vc.shortcodes.where({
                    parent_id: parent_id
                }), function (shortcode) {
                    this.appendShortcode(shortcode), this.addChild(shortcode.get("id"))
                }, this), this.setSortable()
            },
            getView: function (model) {
                var view;
                return view = _.isObject(vc.map[model.get("shortcode")]) && _.isString(vc.map[model.get("shortcode")].js_view) && vc.map[model.get("shortcode")].js_view.length && !_.isUndefined(window[window.vc.map[model.get("shortcode")].js_view]) ? new(window[window.vc.map[model.get("shortcode")].js_view])({
                    model: model
                }) : new vc.shortcode_view({
                    model: model
                }), model.set({
                    view: view
                }), view
            },
            setDraggable: function () {
                $("#wpb-add-new-element, #wpb-add-new-row").draggable({
                    helper: function () {
                        return $('<div id="drag_placeholder"></div>').appendTo("body")
                    },
                    zIndex: 99999,
                    cursor: "move",
                    revert: "invalid",
                    start: function (event, ui) {
                        $("#drag_placeholder").addClass("column_placeholder").html(window.i18nLocale.drag_drop_me_in_column)
                    }
                })
            },
            setDropable: function () {
                this.$content.droppable({
                    greedy: !0,
                    accept: ".dropable_el,.dropable_row",
                    hoverClass: "wpb_ui-state-active",
                    drop: this.dropButton
                })
            },
            dropButton: function (event, ui) {
                ui.draggable.is("#wpb-add-new-element") ? this.addElement() : ui.draggable.is("#wpb-add-new-row") && this.createRow()
            },
            appendShortcode: function (model) {
                var view, parentModelView, params;
                if (view = this.getView(model), params = _.extend(vc.getDefaults(model.get("shortcode")), model.get("params")), model.set("params", params, {
                        silent: !0
                    }), parentModelView = !1 !== model.get("parent_id") && this.views[model.get("parent_id")], this.views[model.id] = view, model.get("parent_id")) {
                    var parentView;
                    parentView = this.views[model.get("parent_id")], parentView.unsetEmpty()
                }
                parentModelView ? parentModelView.addShortcode(view, "append") : this.$content.append(view.render().el), view.ready(), view.changeShortcodeParams(model), view.checkIsEmpty(), this.setNotEmpty()
            },
            addShortcode: function (model) {
                var view, parentModelView, params;
                if (params = _.extend(vc.getDefaults(model.get("shortcode")), model.get("params")), model.set("params", params, {
                        silent: !0
                    }), view = this.getView(model), parentModelView = !1 !== model.get("parent_id") && this.views[model.get("parent_id")], view.use_default_content = !0 !== model.get("cloned"), this.views[model.id] = view, parentModelView) {
                    parentModelView.addShortcode(view), parentModelView.checkIsEmpty();
                    var _this;
                    _this = this, _.defer(function () {
                        view.changeShortcodeParams && view.changeShortcodeParams(model), view.ready(), view.checkIsEmpty(), _this.setSortable(), _this.setNotEmpty()
                    })
                } else this.addRow(view), _.defer(function () {
                    view.changeShortcodeParams && view.changeShortcodeParams(model), view.ready(), view.checkIsEmpty()
                })
            },
            addRow: function (view) {
                var before_shortcode;
                before_shortcode = _.last(vc.shortcodes.filter(function (shortcode) {
                    return !1 === shortcode.get("parent_id") && parseFloat(shortcode.get("order")) < parseFloat(this.get("order"))
                }, view.model)), before_shortcode ? view.render().$el.insertAfter("[data-model-id=" + before_shortcode.id + "]") : this.$content.append(view.render().el)
            },
            addTextBlock: function (e) {
                var row, column, params, row_params, column_params;
                return e.preventDefault(), row_params = {}, row = vc.shortcodes.create({
                    shortcode: "vc_row",
                    params: row_params
                }), column_params = {
                    width: "1/1"
                }, column = vc.shortcodes.create({
                    shortcode: "vc_column",
                    params: column_params,
                    parent_id: row.id,
                    root_id: row.id
                }), params = vc.getDefaults("vc_column_text"), vc.shortcodes.create({
                    shortcode: "vc_column_text",
                    parent_id: column.id,
                    root_id: row.id,
                    params: params
                })
            },
            createRow: function () {
                var row, row_params, column_params;
                return row_params = {}, row = vc.shortcodes.create({
                    shortcode: "vc_row",
                    params: row_params
                }), column_params = {
                    width: "1/1"
                }, vc.shortcodes.create({
                    shortcode: "vc_column",
                    params: column_params,
                    parent_id: row.id,
                    root_id: row.id
                }), row
            },
            addElement: function (e) {
                _.isObject(e) && e.preventDefault(), vc.add_element_block_view.render(!1)
            },
            openTemplatesWindow: function (e) {
                e && e.preventDefault(), $(e.currentTarget).is("#vc_templates-more-layouts") && vc.templates_panel_view.once("show", function () {
                    $('[data-vc-ui-element-target="[data-tab=default_templates]"]').click()
                }), vc.templates_panel_view.render().show()
            },
            loadDefaultTemplate: function (e) {
                e && e.preventDefault(), vc.templates_panel_view.loadTemplate(e)
            },
            editSettings: function (e) {
                e && e.preventDefault(), vc.post_settings_view.render().show()
            },
            enterFullscreen: function () {
                var $body = $("body");
                $body.hasClass("folded") ? ($body.data("vcKeepMenuFolded", !0), $body.addClass("vc_fullscreen")) : $body.addClass("vc_fullscreen folded")
            },
            leaveFullscreen: function () {
                var $body = $("body");
                $body.hasClass("vc_fullscreen") && ($body.data("vcKeepMenuFolded") ? ($body.removeClass("vc_fullscreen"), $body.removeData("vcKeepMenuFolded")) : $body.removeClass("vc_fullscreen folded"))
            },
            sortingStarted: function (event, ui) {
                $("#visual_composer_content").addClass("vc_sorting-started")
            },
            sortingStopped: function (event, ui) {
                var tag = ui.item.data("element_type"),
                    parent_tag = ui.placeholder.closest("[data-element_type]").data("element_type") || "";
                vc.check_relevance(parent_tag, tag) && parent_tag != tag || (ui.placeholder.addClass("vc_hidden-placeholder"), $(event.target).sortable("cancel")), $("#visual_composer_content").removeClass("vc_sorting-started")
            },
            updateElementsSorting: function (event, ui) {
                _.defer(function (app) {
                    var $current_container = ui.item.parent().closest("[data-model-id]"),
                        parent = $current_container.data("model"),
                        model = ui.item.data("model"),
                        models = app.views[parent.id].$content.find("> [data-model-id]"),
                        i = 0;
                    if (!_.isNull(ui.sender)) {
                        var old_parent_id = model.get("parent_id");
                        vc.storage.lock(), model.save({
                            parent_id: parent.id
                        }), old_parent_id && app.views[old_parent_id].checkIsEmpty(), app.views[parent.id].checkIsEmpty()
                    }
                    models.each(function () {
                        var shortcode = $(this).data("model");
                        vc.storage.lock(), shortcode.save({
                            order: i++
                        })
                    }), model.save()
                }, this)
            },
            updateRowsSorting: function (e, ui) {
                
                console.log( e );
                console.log( ui );
                console.log( ui.item.parent() );
                
                _.defer(function (app) {
                    var parentNode = ui.item.parent(),
                        $currentContainer = parentNode.closest("[data-model-id]"),
                        newParentId = !!$currentContainer.length && $currentContainer.data("model").get("id"),
                        model = ui.item.data("model"),
                        tag = ui.item.data("element_type"),
                        parent_tag = ui.item.parent().closest("[data-element_type]").data("element_type") || "";
                    if (!vc.check_relevance(parent_tag, tag) || parent_tag == tag) return void $(e.target).sortable("cancel");                    
                    
                    var oldParentId = model.get("parent_id");
                    parentNode.find(app.rowSortableSelector).each(function () {
                        
                        console.log( $(this).data("model") );
                        
                        var index = $(this).index();
                        vc.storage.lock(), $(this).data("model").save({
                            order: index
                        })
                    }), model.save({
                        parent_id: newParentId
                    }), oldParentId && app.views[oldParentId].checkIsEmpty(), newParentId && app.views[newParentId].checkIsEmpty()
                }, this)
                
            },
            renderPlaceholder: function (event, element) {
                var tag = $(element).data("element_type"),
                    is_container = _.isObject(vc.map[tag]) && (_.isBoolean(vc.map[tag].is_container) && !0 === vc.map[tag].is_container || !_.isEmpty(vc.map[tag].as_parent));
                return $('<div class="vc_helper vc_helper-' + tag + '"><i class="vc_general vc_element-icon' + (vc.map[tag].icon ? " " + vc.map[tag].icon : "") + '"' + (is_container ? ' data-is-container="true"' : "") + "></i> " + vc.map[tag].name + "</div>").prependTo("body")
            },
            rowSortableSelector: "> .wpb_vc_row, > .vc_main-sortable-element",
            setSortable: function () {
                
                if(vc_user_access().partAccess("dragndrop")) return $(".wpb_main_sortable").sortable({
                    forcePlaceholderSize: !0,
                    placeholder: "widgets-placeholder",
                    cursor: "move",
                    connectWith: ".vc_section_container",
                    items: this.rowSortableSelector,
                    handle: ".vc_column-move",
                    cancel: ".vc-non-draggable-row",
                    distance: .5,
                    start: this.sortingStarted,
                    stop: this.sortingStopped,
                    update: this.updateRowsSorting,
                    tolerance: "intersect",
                    over: function (event, ui) {
                        var tag = ui.item.data("element_type"),
                            parent_tag = ui.placeholder.closest("[data-element_type]").data("element_type") || "";
                        if (!vc.check_relevance(parent_tag, tag) || parent_tag == tag) return ui.placeholder.addClass("vc_hidden-placeholder"), !1;
                        ui.placeholder.css({
                            maxWidth: ui.placeholder.parent().width()
                        })
                    },
                    out: function (event, ui) {
                        ui.placeholder.removeClass("vc_hidden-placeholder"), ui.placeholder.css({
                            maxWidth: ui.placeholder.parent().width()
                        })
                    }
                }), 
                
                    
                $(".wpb_column_container").sortable({
                    forcePlaceholderSize: !0,
                    forceHelperSize: !1,
                    connectWith: ".wpb_column_container",
                    placeholder: "vc_placeholder",
                    items: "> div.wpb_sortable:not(.wpb_ut_hover_box_front):not(.wpb_ut_hover_box_back),> div.vc-non-draggable",
                    helper: this.renderPlaceholder,
                    distance: 3,
                    cancel: ".vc-non-draggable",
                    scroll: !0,
                    scrollSensitivity: 70,
                    cursor: "move",
                    cursorAt: {
                        top: 20,
                        left: 16
                    },
                    tolerance: "intersect",
                    start: function () {
                        $("#visual_composer_content").addClass("vc_sorting-started"), $(".vc_not_inner_content").addClass("dragging_in")
                    },
                    stop: function (event, ui) {
                        $("#visual_composer_content").removeClass("vc_sorting-started"), $(".dragging_in").removeClass("dragging_in");
                        var tag = ui.item.data("element_type"),
                            parent_tag = ui.item.parent().closest("[data-element_type]").data("element_type") || "",
                            allowed_container_element = !!_.isUndefined(vc.map[parent_tag].allowed_container_element) || vc.map[parent_tag].allowed_container_element;
                        vc.check_relevance(parent_tag, tag) && parent_tag != tag || $(this).sortable("cancel"), _.isObject(vc.map[tag]) && (_.isBoolean(vc.map[tag].is_container) && !0 === vc.map[tag].is_container || !_.isEmpty(vc.map[tag].as_parent)) && !0 !== allowed_container_element && allowed_container_element !== ui.item.data("element_type").replace(/_inner$/, "") && $(this).sortable("cancel"), $(".vc_sorting-empty-container").removeClass("vc_sorting-empty-container")
                    },
                    update: this.updateElementsSorting,
                    over: function (event, ui) {
                        var tag = ui.item.data("element_type"),
                            parent_tag = ui.placeholder.closest("[data-element_type]").data("element_type"),
                            allowed_container_element = !!_.isUndefined(vc.map[parent_tag].allowed_container_element) || vc.map[parent_tag].allowed_container_element;
                        vc.check_relevance(parent_tag, tag) && parent_tag != tag || ui.placeholder.addClass("vc_hidden-placeholder"), _.isObject(vc.map[tag]) && (_.isBoolean(vc.map[tag].is_container) && !0 === vc.map[tag].is_container || !_.isEmpty(vc.map[tag].as_parent)) && !0 !== allowed_container_element && allowed_container_element !== ui.item.data("element_type").replace(/_inner$/, "") && ui.placeholder.addClass("vc_hidden-placeholder"), _.isNull(ui.sender) || !ui.sender.length || ui.sender.find("> [data-element_type]:not(.ui-sortable-helper):visible").length || ui.sender.addClass("vc_sorting-empty-container"), ui.placeholder.css({
                            maxWidth: ui.placeholder.parent().width()
                        })
                    },
                    out: function (event, ui) {
                        ui.placeholder.removeClass("vc_hidden-placeholder"), ui.placeholder.css({
                            maxWidth: ui.placeholder.parent().width()
                        })
                    }
                }).disableSelection(), this
            },
            setNotEmpty: function () {
                $("#vc_no-content-helper").addClass("vc_not-empty")
            },
            setIsEmpty: function () {
                vc.views = {}, $("#vc_no-content-helper").removeClass("vc_not-empty")
            },
            checkEmpty: function (model) {
                if (_.isObject(model) && !1 !== model.get("parent_id") && model.get("parent_id") != model.id) {
                    var parent_view = this.views[model.get("parent_id")];
                    if (!parent_view) return;
                    parent_view.checkIsEmpty()
                }
                0 === vc.shortcodes.length ? this.setIsEmpty() : this.setNotEmpty()
            },
            switchComposer: function (e) {
                _.isObject(e) && e.preventDefault(), "shown" === this.status ? (this.accessPolicy.can("classic_editor") && (!_.isUndefined(this.$switchButton) && this.$switchButton.text(window.i18nLocale.main_button_title_backend_editor), !_.isUndefined(this.$buttonsContainer) && this.$buttonsContainer.removeClass("vc_backend-status")), this.close(), this.status = "closed") : (this.accessPolicy.can("classic_editor") && (!_.isUndefined(this.$switchButton) && this.$switchButton.text(window.i18nLocale.main_button_title_revert), !_.isUndefined(this.$buttonsContainer) && this.$buttonsContainer.addClass("vc_backend-status")), this.show(), this.status = "shown")
            },
            show: function () {
                this.$el.show(), this.$post.addClass("vc-disable-editor"), this.$vcStatus.val("true"), this.navOnScroll(), vc.storage.isContentChanged() && (vc.app.setLoading(), vc.app.views = {}, _.defer(function () {
                    vc.shortcodes.fetch({
                        reset: !0
                    }), vc.events.trigger("backendEditor.show")
                }))
            },
            setLoading: function () {
                this.setNotEmpty(), this.$loading_block.addClass("vc_ui-wp-spinner"), this.$metablock_content.addClass("vc_loading-shortcodes")
            },
            close: function () {
                this.$vcStatus.val("false"), this.$el.hide(), _.isObject(window.editorExpand) && (_.delay(function () {
                    window.scrollBy(0, -1)
                }, 17), _.delay(function () {
                    window.scrollBy(0, 1)
                }, 17)), this.$post.removeClass("vc-disable-editor"), _.defer(function () {
                    vc.events.trigger("backendEditor.close")
                })
            },
            checkVcStatus: function () {
                !vc.accessPolicy.can("be_editor") || vc.accessPolicy.can("classic_editor") && "true" !== this.$vcStatus.val() || this.switchComposer()
            },
            setNavTop: function () {
                this.navTop = this.$nav.length && this.$nav.offset().top - 28
            },
            save: function () {
                $("#wpb-save-post").text(window.i18nLocale.loading), $("#publish").click()
            },
            preview: function () {
                $("#post-preview").click()
            },
            navOnScroll: function () {
                this.$nav = $("#vc_navbar"), this.setNavTop(), this.processScroll(), $(window).unbind("scroll.composer").on("scroll.composer", this.processScroll)
            },
            processScroll: function (e) {
                if (!0 === this.disableFixedNav) return void this.$nav.removeClass("vc_subnav-fixed");
                (!this.navTop || 0 > this.navTop) && this.setNavTop(),
                    this.scrollTop = $(window).scrollTop() + 80, 0 < this.navTop && this.scrollTop >= this.navTop && !this.isFixed ? (this.isFixed = 1, this.$nav.addClass("vc_subnav-fixed")) : this.scrollTop <= this.navTop && this.isFixed && (this.isFixed = 0, this.$nav.removeClass("vc_subnav-fixed"))
            },
            buildRelevance: function () {
                vc.shortcode_relevance = {}, _.map(vc.map, function (object) {
                    _.isObject(object.as_parent) && _.isString(object.as_parent.only) && (vc.shortcode_relevance["parent_only_" + object.base] = object.as_parent.only.replace(/\s/, "").split(",")), _.isObject(object.as_parent) && _.isString(object.as_parent.except) && (vc.shortcode_relevance["parent_except_" + object.base] = object.as_parent.except.replace(/\s/, "").split(",")), _.isObject(object.as_child) && _.isString(object.as_child.only) && (vc.shortcode_relevance["child_only_" + object.base] = object.as_child.only.replace(/\s/, "").split(",")), _.isObject(object.as_child) && _.isString(object.as_child.except) && (vc.shortcode_relevance["child_except_" + object.base] = object.as_child.except.replace(/\s/, "").split(","))
                }), vc.check_relevance = function (tag, related_tag) {
                    return !(_.isArray(vc.shortcode_relevance["parent_only_" + tag]) && !_.contains(vc.shortcode_relevance["parent_only_" + tag], related_tag)) && ((!_.isArray(vc.shortcode_relevance["parent_except_" + tag]) || !_.contains(vc.shortcode_relevance["parent_except_" + tag], related_tag)) && (!(_.isArray(vc.shortcode_relevance["child_only_" + related_tag]) && !_.contains(vc.shortcode_relevance["child_only_" + related_tag], tag)) && (!_.isArray(vc.shortcode_relevance["child_except_" + related_tag]) || !_.contains(vc.shortcode_relevance["child_except" + related_tag], tag))))
                }
            }
        }), $(function () {
            var $wpbVisualComposer;
            $wpbVisualComposer = $("#wpb_visual_composer"), $wpbVisualComposer.is("div") && (vc.app = new vc.visualComposerView({
                el: $wpbVisualComposer
            }), vc.accessPolicy.can("be_editor") ? vc.app.checkVcStatus() : vc.app.$el.remove(), vc.events.on("vc:backend_editor:show", function () {
                vc.app.show(), vc.app.status = "shown"
            }), vc.events.on("vc:backend_editor:switch", function () {
                vc.app.switchComposer()
            }))
        })
    }(window.jQuery),
    function ($) {
        var Shortcodes = vc.shortcodes;
        window.VcRowView = vc.shortcode_view.extend({
            change_columns_layout: !1,
            events: {
                'click > .vc_controls [data-vc-control="delete"]': "deleteShortcode",
                "click > .vc_controls .set_columns": "setColumns",
                'click > .vc_controls [data-vc-control="add"]': "addElement",
                'click > .vc_controls [data-vc-control="edit"]': "editElement",
                'click > .vc_controls [data-vc-control="clone"]': "clone",
                'click > .vc_controls [data-vc-control="move"]': "moveElement",
                'click > .vc_controls [data-vc-control="toggle"]': "toggleElement",
                "click > .wpb_element_wrapper .vc_controls": "openClosedRow"
            },
            convertRowColumns: function (layout) {
                var layout_split = layout.toString().split(/_/),
                    columns = Shortcodes.where({
                        parent_id: this.model.id
                    }),
                    new_columns = [],
                    new_layout = [],
                    new_width = "";
                return _.each(layout_split, function (value, i) {
                    var new_column_params, new_column, column_data = _.map(value.toString().split(""), function (v, i) {
                        return parseInt(v, 10)
                    });
                    new_width = 3 < column_data.length ? column_data[0] + "" + column_data[1] + "/" + column_data[2] + column_data[3] : 2 < column_data.length ? column_data[0] + "/" + column_data[1] + column_data[2] : column_data[0] + "/" + column_data[1], new_layout.push(new_width), new_column_params = _.extend(_.isUndefined(columns[i]) ? {} : columns[i].get("params"), {
                        width: new_width
                    }), vc.storage.lock(), new_column = Shortcodes.create({
                        shortcode: this.getChildTag(),
                        params: new_column_params,
                        parent_id: this.model.id
                    }), _.isObject(columns[i]) && _.each(Shortcodes.where({
                        parent_id: columns[i].id
                    }), function (shortcode) {
                        vc.storage.lock(), shortcode.save({
                            parent_id: new_column.id
                        }), vc.storage.lock(), shortcode.trigger("change_parent_id")
                    }), new_columns.push(new_column)
                }, this), layout_split.length < columns.length && _.each(columns.slice(layout_split.length), function (column) {
                    _.each(Shortcodes.where({
                        parent_id: column.id
                    }), function (shortcode) {
                        vc.storage.lock(), shortcode.save({
                            parent_id: _.last(new_columns).id
                        }), vc.storage.lock(), shortcode.trigger("change_parent_id")
                    })
                }), _.each(columns, function (shortcode) {
                    vc.storage.lock(), shortcode.destroy()
                }, this), this.model.save(), this.setActiveLayoutButton("" + layout), new_layout
            },
            changeShortcodeParams: function (model) {
                window.VcRowView.__super__.changeShortcodeParams.call(this, model), this.buildDesignHelpers(), this.setRowClasses()
            },
            setRowClasses: function () {
                var disable = this.model.getParam("disable_element"),
                    disableClass = "vc_hidden-xs vc_hidden-sm  vc_hidden-md vc_hidden-lg";
                this.disable_element_class && this.$el.removeClass(this.disable_element_class), _.isEmpty(disable) || (this.$el.addClass(disableClass), this.disable_element_class = disableClass)
            },
            designHelpersSelector: "> .vc_controls .column_toggle",
            buildDesignHelpers: function () {
                
                var css, distortion, distortion_effect, $elementToPrepend, image, color, rowId, matches;
                
                css = this.model.getParam("css"), 
                $elementToPrepend = this.$el.find(this.designHelpersSelector), 
                this.$el.find("> .vc_controls .vc_row_color").remove(), 
                this.$el.find("> .vc_controls .vc_row_image").remove(), 
                matches = css.match(/background\-image:\s*url\(([^\)]+)\)/), 
                matches && !_.isUndefined(matches[1]) && (image = matches[1]), 
                matches = css.match(/background\-color:\s*([^\s\;]+)\b/), 
                matches && !_.isUndefined(matches[1]) && (color = matches[1]), 
                matches = css.match(/background:\s*([^\s]+)\b\s*url\(([^\)]+)\)/), 
                matches && !_.isUndefined(matches[1]) && (color = matches[1], image = matches[2]),
                
                // additional RGBA Queries @United Themes   
                matches = css.match(/(#([\da-f]{3}){1,2}|(rgb|hsl)a\((\d{1,3}%?,\s?){3}(1|0?\.\d+)\)|(rgb|hsl)\(\d{1,3}%?(,\s?\d{1,3}%?){2}\))/), 
                matches && !_.isUndefined(matches[1]) && (color = matches[1]),
                    
                // additional URL Query @United Themes   
                matches = css.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/), 
                matches && !_.isUndefined(matches[0]) && (image = matches[0]),    
               
				// additional Background Distortion label	
				distortion = this.model.getParam("distortion"),					
				distortion === 'on' && ( distortion_effect = '#a55eea' ),
					
                rowId = this.model.getParam("el_id"),
                this.$el.find("> .vc_controls .vc_row-hash-id").remove(), _.isEmpty(rowId) || $('<span class="vc_row-hash-id"></span>').text("#" + rowId).insertAfter($elementToPrepend),
                
                // @United    
                rowName = this.model.getParam("el_name"),
                this.$el.find("> .vc_controls .vc_row-name-id").remove(), _.isEmpty(rowName) || $('<span class="vc_row-name-id"></span>').text(rowName).insertAfter($elementToPrepend),
                image && $('<span class="vc_row_image" style="background-image: url(' + image + ');" title="' + window.i18nLocale.row_background_image + '"></span>').insertAfter($elementToPrepend), 
				color && $('<span class="vc_row_color" style="background-color: ' + color + '" title="' + window.i18nLocale.row_background_color + '"></span>').insertAfter($elementToPrepend),
				distortion_effect && $('<span class="vc_row_distortion" title="' + unite_js_translation.distortion_effect + '"><i class="fa fa-diamond"></i></span>').insertAfter($elementToPrepend)
                
            },
            addElement: function (e) {
                e && e.preventDefault(), Shortcodes.create({
                    shortcode: this.getChildTag(),
                    params: {},
                    parent_id: this.model.id
                }), this.setActiveLayoutButton(), this.$el.removeClass("vc_collapsed-row")
            },
            getChildTag: function () {
                return "vc_row_inner" === this.model.get("shortcode") ? "vc_column_inner" : "vc_column"
            },
            sortingSelector: "> [data-element_type=vc_column], > [data-element_type=vc_column_inner]",
            sortingSelectorCancel: ".vc-non-draggable-column",
            setSorting: function () {
                if (vc_user_access().partAccess("dragndrop")) {
                    var _this = this;
                    1 < this.$content.find(this.sortingSelector).length ? this.$content.removeClass("wpb-not-sortable").sortable({
                        forcePlaceholderSize: !0,
                        placeholder: "widgets-placeholder-column",
                        tolerance: "pointer",
                        cursor: "move",
                        items: this.sortingSelector,
                        cancel: this.sortingSelectorCancel,
                        distance: .5,
                        start: function (event, ui) {
                            $("#visual_composer_content").addClass("vc_sorting-started"), ui.placeholder.width(ui.item.width())
                        },
                        stop: function (event, ui) {
                            $("#visual_composer_content").removeClass("vc_sorting-started")
                        },
                        update: function () {
                            var $columns = $(_this.sortingSelector, _this.$content);
                            $columns.each(function () {
                                var model = $(this).data("model"),
                                    index = $(this).index();
                                model.set("order", index), $columns.length - 1 > index && vc.storage.lock(), model.save()
                            })
                        },
                        over: function (event, ui) {
                            ui.placeholder.css({
                                maxWidth: ui.placeholder.parent().width()
                            }), ui.placeholder.removeClass("vc_hidden-placeholder")
                        },
                        beforeStop: function (event, ui) {}
                    }) : (this.$content.hasClass("ui-sortable") && this.$content.sortable("destroy"), this.$content.addClass("wpb-not-sortable"))
                }
            },
            validateCellsList: function (cells) {
                var b, return_cells = [],
                    split = cells.replace(/\s/g, "").split("+");
                return 12 === _.reduce(_.map(split, function (c) {
                    if (c.match(/^(vc_)?span\d?$/)) {
                        var converted_c = vc_convert_column_span_size(c);
                        return !1 === converted_c ? 1e3 : (b = converted_c.split(/\//), return_cells.push(b[0] + "" + b[1]), 12 * parseInt(b[0], 10) / parseInt(b[1], 10))
                    }
                    return c.match(/^[1-9]|1[0-2]\/[1-9]|1[0-2]$/) ? (b = c.split(/\//), return_cells.push(b[0] + "" + b[1]), 12 * parseInt(b[0], 10) / parseInt(b[1], 10)) : 1e4
                }), function (num, memo) {
                    return memo += num
                }, 0) && return_cells.join("_")
            },
            setActiveLayoutButton: function (column_layout) {
                column_layout || (column_layout = _.map(vc.shortcodes.where({
                    parent_id: this.model.get("id")
                }), function (model) {
                    var width = model.getParam("width");
                    return width ? width.replace(/\//, "") : "11"
                }).join("_")), this.$el.find("> .vc_controls .vc_active").removeClass("vc_active");
                var $button = this.$el.find('> .vc_ [data-cells-mask="' + vc_get_column_mask(column_layout) + '"] [data-cells="' + column_layout + '"], > .vc_controls [data-cells-mask="' + vc_get_column_mask(column_layout) + '"][data-cells="' + column_layout + '"]');
                $button.length ? $button.addClass("vc_active") : this.$el.find("> .vc_controls [data-cells-mask=custom]").addClass("vc_active")
            },
            layoutEditor: function () {
                return _.isUndefined(vc.row_layout_editor) && (vc.row_layout_editor = new vc.RowLayoutUIPanelBackendEditor({
                    el: $("#vc_ui-panel-row-layout")
                })), vc.row_layout_editor
            },
            setColumns: function (e) {
                _.isObject(e) && e.preventDefault();
                var $button = $(e.currentTarget);
                if ("custom" === $button.data("cells")) this.layoutEditor().render(this.model).show();
                else {
                    if (vc.is_mobile) {
                        var $parent = $button.parent();
                        $parent.hasClass("vc_visible") || ($parent.addClass("vc_visible"), $(document).off("click.vcRowColumnsControl").on("click.vcRowColumnsControl", function (e) {
                            $parent.removeClass("vc_visible")
                        }))
                    }
                    $button.is(".vc_active") || (this.change_columns_layout = !0, _.defer(function (view, cells) {
                        view.convertRowColumns(cells)
                    }, this, $button.data("cells")))
                }
                this.$el.removeClass("vc_collapsed-row")
            },
            sizeRows: function () {
                var max_height = 45;
                $("> .wpb_vc_column, > .wpb_vc_column_inner", this.$content).each(function () {
                    var content_height = $(this).find("> .wpb_element_wrapper > .wpb_column_container").css({
                        minHeight: 0
                    }).height();
                    content_height > max_height && (max_height = content_height)
                }).each(function () {
                    $(this).find("> .wpb_element_wrapper > .wpb_column_container").css({
                        minHeight: max_height
                    })
                })
            },
            ready: function (e) {
                return window.VcRowView.__super__.ready.call(this, e), this
            },
            checkIsEmpty: function () {
                window.VcRowView.__super__.checkIsEmpty.call(this), this.setSorting()
            },
            changedContent: function (view) {
                if (this.change_columns_layout) return this;
                this.setActiveLayoutButton()
            },
            moveElement: function (e) {
                e.preventDefault()
            },
            toggleElement: function (e) {
                e && e.preventDefault(), this.$el.toggleClass("vc_collapsed-row")
            },
            openClosedRow: function (e) {
                this.$el.removeClass("vc_collapsed-row")
            },
            remove: function () {
                this.$content && this.$content.data("uiSortable") && this.$content.sortable("destroy"), this.$content && this.$content.data("uiDroppable") && this.$content.droppable("destroy"), delete vc.app.views[this.model.id], window.VcRowView.__super__.remove.call(this)
            }
        }), window.VcColumnView = vc.shortcode_view.extend({
            events: {
                'click > .vc_controls [data-vc-control="delete"]': "deleteShortcode",
                'click > .vc_controls [data-vc-control="add"]': "addElement",
                'click > .vc_controls [data-vc-control="edit"]': "editElement",
                'click > .vc_controls [data-vc-control="clone"]': "clone",
                "click > .wpb_element_wrapper > .vc_empty-container": "addToEmpty"
            },
            current_column_width: !1,
            initialize: function (options) {
                window.VcColumnView.__super__.initialize.call(this, options), _.bindAll(this, "setDropable", "dropButton")
            },
            ready: function (e) {
                return window.VcColumnView.__super__.ready.call(this, e), this
            },
            render: function () {
                return window.VcColumnView.__super__.render.call(this), this.current_column_width = this.model.get("params").width || "1/1", this.$el.attr("data-width", this.current_column_width), this.setEmpty(), this
            },
            changeShortcodeParams: function (model) {
                window.VcColumnView.__super__.changeShortcodeParams.call(this, model), this.setColumnClasses(), this.buildDesignHelpers()
            },
            designHelpersSelector: "> .vc_controls .column_add",
            buildDesignHelpers: function () {
                
                var matches, image, distortion, distortion_effect, color, css = this.model.getParam("css"),
                    $column_toggle = this.$el.find(this.designHelpersSelector).get(0);
                
                this.$el.find("> .vc_controls .vc_column_color").remove(), 
                this.$el.find("> .vc_controls .vc_column_image").remove(),
					
                matches = css.match(/background\-image:\s*url\(([^\)]+)\)/), 
                matches && !_.isUndefined(matches[1]) && (image = matches[1]), 
                matches = css.match(/background\-color:\s*([^\s\;]+)\b/), 
                matches && !_.isUndefined(matches[1]) && (color = matches[1]), 
                matches = css.match(/background:\s*([^\s]+)\b\s*url\(([^\)]+)\)/), 
                matches && !_.isUndefined(matches[1]) && (color = matches[1], image = matches[2]),
                
                // additional RGBA Queries @United Themes   
                matches = css.match(/(#([\da-f]{3}){1,2}|(rgb|hsl)a\((\d{1,3}%?,\s?){3}(1|0?\.\d+)\)|(rgb|hsl)\(\d{1,3}%?(,\s?\d{1,3}%?){2}\))/), 
                matches && !_.isUndefined(matches[1]) && (color = matches[1]),
                    
                // additional URL Query @United Themes   
                matches = css.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/), 
                matches && !_.isUndefined(matches[0]) && (image = matches[0]), 
                
				// additional Background Distortion label	
				distortion = this.model.getParam("distortion"),					
				distortion === 'on' && ( distortion_effect = '#a55eea' ),	
					
                image && $('<span class="vc_column_image" style="background-image: url(' + image + ');" title="' + i18nLocale.column_background_image + '"></span>').insertBefore($column_toggle), 
				color && $('<span class="vc_column_color" style="background-color: ' + color + '" title="' + i18nLocale.column_background_color + '"></span>').insertBefore($column_toggle),
				distortion_effect && $('<span class="vc_row_distortion vc_row_distortion_column" title="' + unite_js_translation.distortion_effect + '"><i class="fa fa-diamond"></i></span>').insertAfter($column_toggle)	
                
            },
            setColumnClasses: function () {
                var current_css_class_width, offset = this.model.getParam("offset") || "",
                    width = this.model.getParam("width") || "1/1",
                    css_class_width = this.convertSize(width);
                this.current_offset_class && this.$el.removeClass(this.current_offset_class), this.current_column_width !== width && (current_css_class_width = this.convertSize(this.current_column_width), this.$el.attr("data-width", width).removeClass(current_css_class_width).addClass(css_class_width), this.current_column_width = width), offset.match(/vc_col\-sm\-\d+/) && this.$el.removeClass(css_class_width), _.isEmpty(offset) || this.$el.addClass(offset), this.current_offset_class = offset
            },
            addToEmpty: function (e) {
                e.preventDefault(), $(e.target).hasClass("vc_empty-container") && this.addElement(e)
            },
            setDropable: function () {
                return this.$content.droppable({
                    greedy: !0,
                    accept: "vc_column_inner" === this.model.get("shortcode") ? ".dropable_el" : ".dropable_el,.dropable_row",
                    hoverClass: "wpb_ui-state-active",
                    drop: this.dropButton
                }), this
            },
            dropButton: function (event, ui) {
                ui.draggable.is("#wpb-add-new-element") ? vc.add_element_block_view({
                    model: {
                        position_to_add: "end"
                    }
                }).show(this) : ui.draggable.is("#wpb-add-new-row") && this.createRow()
            },
            setEmpty: function () {
                this.$el.addClass("vc_empty-column"), "edit" !== vc_user_access().getState("shortcodes") && this.$content.addClass("vc_empty-container")
            },
            unsetEmpty: function () {
                this.$el.removeClass("vc_empty-column"), this.$content.removeClass("vc_empty-container")
            },
            checkIsEmpty: function () {
                Shortcodes.where({
                    parent_id: this.model.id
                }).length ? this.unsetEmpty() : this.setEmpty(), window.VcColumnView.__super__.checkIsEmpty.call(this)
            },
            createRow: function () {
                var row_params, column_params, row;
                return row_params = {}, column_params = {
                    width: "1/1"
                }, row = Shortcodes.create({
                    shortcode: "vc_row_inner",
                    params: row_params,
                    parent_id: this.model.id
                }), Shortcodes.create({
                    shortcode: "vc_column_inner",
                    params: column_params,
                    parent_id: row.id
                }), row
            },
            convertSize: function (width) {
                var numbers = width ? width.split("/") : [1, 1],
                    range = _.range(1, 13),
                    num = !_.isUndefined(numbers[0]) && 0 <= _.indexOf(range, parseInt(numbers[0], 10)) && parseInt(numbers[0], 10),
                    dev = !_.isUndefined(numbers[1]) && 0 <= _.indexOf(range, parseInt(numbers[1], 10)) && parseInt(numbers[1], 10);
                return !1 !== num && !1 !== dev ? "vc_col-sm-" + 12 * num / dev : "vc_col-sm-12"
            },
            deleteShortcode: function (e) {
                var parent, parent_id = this.model.get("parent_id");
                if (_.isObject(e) && e.preventDefault(), !0 !== confirm(window.i18nLocale.press_ok_to_delete_section)) return !1;
                this.model.destroy(), parent_id && !vc.shortcodes.where({
                    parent_id: parent_id
                }).length ? (parent = vc.shortcodes.get(parent_id), _.contains(["vc_column", "vc_column_inner"], parent.get("shortcode")) || parent.destroy()) : parent_id && (parent = vc.shortcodes.get(parent_id)) && parent.view && parent.view.setActiveLayoutButton && parent.view.setActiveLayoutButton()
            },
            remove: function () {
                this.$content && this.$content.data("uiSortable") && this.$content.sortable("destroy"), this.$content && this.$content.data("uiDroppable") && this.$content.droppable("destroy"), delete vc.app.views[this.model.id], window.VcColumnView.__super__.remove.call(this)
            }
        }), window.VcSectionView = VcColumnView.extend({
            designHelpersSelector: "> .vc_controls-row .vc_column-edit",
            setColumnClasses: function () {
                var disable = this.model.getParam("disable_element"),
                    disableClass = "vc_hidden-xs vc_hidden-sm  vc_hidden-md vc_hidden-lg";
                this.disable_element_class && this.$el.removeClass(this.disable_element_class), _.isEmpty(disable) || (this.$el.addClass(disableClass), this.disable_element_class = disableClass)
            },
            buildDesignHelpers: function () {
                
                var css, distortion, distortion_effect, $elementToPrepend, image, color, elId, matches;
                
                css = this.model.getParam("css"), 
                $elementToPrepend = this.$el.find(this.designHelpersSelector), 
                this.$el.find("> .vc_controls-row .vc_row_color").remove(), 
                this.$el.find("> .vc_controls-row .vc_row_image").remove(), 
                matches = css.match(/background\-image:\s*url\(([^\)]+)\)/), 
                matches && !_.isUndefined(matches[1]) && (image = matches[1]), 
                matches = css.match(/background\-color:\s*([^\s\;]+)\b/), 
                matches && !_.isUndefined(matches[1]) && (color = matches[1]), 
                matches = css.match(/background:\s*([^\s]+)\b\s*url\(([^\)]+)\)/), 
                matches && !_.isUndefined(matches[1]) && (color = matches[1], image = matches[2]),
                
                // additional RGBA Queries @United Themes   
                matches = css.match(/(#([\da-f]{3}){1,2}|(rgb|hsl)a\((\d{1,3}%?,\s?){3}(1|0?\.\d+)\)|(rgb|hsl)\(\d{1,3}%?(,\s?\d{1,3}%?){2}\))/), 
                matches && !_.isUndefined(matches[1]) && (color = matches[1]),
                    
                // additional URL Query @United Themes   
                matches = css.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/), 
                matches && !_.isUndefined(matches[0]) && (image = matches[0]),    
                
				// additional Background Distortion label	
				distortion = this.model.getParam("distortion"),					
				distortion === 'on' && ( distortion_effect = '#a55eea' ),		
					
					
                elId = this.model.getParam("el_id"), 
                this.$el.find("> .vc_controls-row .vc_row-hash-id").remove(), _.isEmpty(elId) || $('<span class="vc_row-hash-id"></span>').text("#" + elId).insertAfter($elementToPrepend), 
                // @United    
                rowName = this.model.getParam("el_name"),
                this.$el.find("> .vc_controls .vc_row-name-id").remove(), _.isEmpty(rowName) || $('<span class="vc_row-name-id"></span>').text(rowName).insertAfter($elementToPrepend),
                image && $('<span class="vc_row_image" style="background-image: url(' + image + ');" title="' + window.i18nLocale.row_background_image + '"></span>').insertAfter($elementToPrepend), 
				color && $('<span class="vc_row_color" style="background-color: ' + color + '" title="' + window.i18nLocale.row_background_color + '"></span>').insertAfter($elementToPrepend),
				distortion_effect && $('<span class="vc_row_distortion" title="' + unite_js_translation.distortion_effect + '"><i class="fa fa-diamond"></i></span>').insertAfter($elementToPrepend)	
                
            },
            checkIsEmpty: function () {
                window.VcSectionView.__super__.checkIsEmpty.call(this), this.setSorting()
            },
            setSorting: function () {
                if (vc_user_access().partAccess("dragndrop")) {
                    var _this = this;
                    this.$content.sortable({
                        forcePlaceholderSize: !0,
                        placeholder: "widgets-placeholder",
                        connectWith: ".wpb_main_sortable,.wpb_vc_section .vc_section_container",
                        cursor: "move",
                        items: "> .wpb_vc_row",
                        handle: ".vc_column-move",
                        cancel: ".vc-non-draggable-row",
                        distance: .5,
                        scroll: !0,
                        scrollSensitivity: 70,
                        tolerance: "intersect",
                        update: function (event, ui) {
                            var $elements = $("> div.wpb_sortable,> div.vc-non-draggable", _this.$content);
                            $elements.each(function () {
                                var model = $(this).data("model"),
                                    index = $(this).index();
                                if (model.set("order", index), $elements.length - 1 > index && vc.storage.lock(), !_.isNull(ui.sender)) {
                                    var $current_container = ui.item.parent().closest("[data-model-id]"),
                                        parent = $current_container.data("model"),
                                        old_parent_id = model.get("parent_id");
                                    vc.storage.lock(), model.save({
                                        parent_id: parent.id
                                    }), old_parent_id && vc.app.views[old_parent_id].checkIsEmpty(), vc.app.views[parent.id].checkIsEmpty()
                                }
                                model.save()
                            })
                        },
                        stop: function (event, ui) {
                            $("#visual_composer_content").removeClass("vc_sorting-started"), $(".dragging_in").removeClass("dragging_in");
                            var tag = ui.item.data("element_type"),
                                parent_tag = ui.item.parent().closest("[data-element_type]").data("element_type");
                            vc.check_relevance(parent_tag, tag) && parent_tag != tag || $(this).sortable("cancel"), $(".vc_sorting-empty-container").removeClass("vc_sorting-empty-container")
                        },
                        over: function (event, ui) {
                            var tag = ui.item.data("element_type"),
                                parent_tag = ui.placeholder.closest("[data-element_type]").data("element_type") || "",
                                allowed_container_element = !!_.isUndefined(vc.map[parent_tag].allowed_container_element) || vc.map[parent_tag].allowed_container_element;
                            return vc.check_relevance(parent_tag, tag) && parent_tag != tag ? _.isObject(vc.map[tag]) && (_.isBoolean(vc.map[tag].is_container) && !0 === vc.map[tag].is_container || !_.isEmpty(vc.map[tag].as_parent)) && !0 !== allowed_container_element && allowed_container_element !== ui.item.data("element_type").replace(/_inner$/, "") ? (ui.placeholder.addClass("vc_hidden-placeholder"), !1) : (_.isNull(ui.sender) || !ui.sender.length || ui.sender.find("> [data-element_type]:not(.ui-sortable-helper):visible").length || ui.sender.addClass("vc_sorting-empty-container"), void ui.placeholder.css({
                                maxWidth: ui.placeholder.parent().width()
                            })) : (ui.placeholder.addClass("vc_hidden-placeholder"), !1)
                        },
                        out: function (event, ui) {
                            ui.placeholder.removeClass("vc_hidden-placeholder"), ui.placeholder.css({
                                maxWidth: ui.placeholder.parent().width()
                            }), _.isNull(ui.sender) || !ui.sender.length || ui.sender.find("> [data-element_type]:not(.ui-sortable-helper):visible").length || ui.sender.addClass("vc_sorting-empty-container")
                        }
                    })
                }
            }
        }), window.VcAccordionView = vc.shortcode_view.extend({
            adding_new_tab: !1,
            events: {
                "click .add_tab": "addTab",
                "click > .vc_controls .column_delete, > .vc_controls .vc_control-btn-delete": "deleteShortcode",
                "click > .vc_controls .column_edit, > .vc_controls .vc_control-btn-edit": "editElement",
                "click > .vc_controls .column_clone,> .vc_controls .vc_control-btn-clone": "clone"
            },
            render: function () {
                return window.VcAccordionView.__super__.render.call(this), vc_user_access().shortcodeAll("vc_accordion_tab") ? (vc_user_access().partAccess("dragndrop") && this.$content.sortable({
                    axis: "y",
                    handle: "h3",
                    stop: function (event, ui) {
                        ui.item.prev().triggerHandler("focusout"), $(this).find("> .wpb_sortable").each(function () {
                            $(this).data("model").save({
                                order: $(this).index()
                            })
                        })
                    }
                }), this) : (this.$el.find(".tab_controls").hide(), this)
            },
            changeShortcodeParams: function (model) {
                var params, collapsible;
                window.VcAccordionView.__super__.changeShortcodeParams.call(this, model), params = model.get("params"), collapsible = !(!_.isString(params.collapsible) || "yes" !== params.collapsible), this.$content.hasClass("ui-accordion") && this.$content.accordion("option", "collapsible", collapsible)
            },
            changedContent: function (view) {
                this.$content.hasClass("ui-accordion") && this.$content.accordion("destroy");
                var collapsible = !(!_.isString(this.model.get("params").collapsible) || "yes" !== this.model.get("params").collapsible);
                this.$content.accordion({
                    header: "h3",
                    navigation: !1,
                    autoHeight: !0,
                    heightStyle: "content",
                    collapsible: collapsible,
                    active: !1 === this.adding_new_tab && !0 !== view.model.get("cloned") ? 0 : view.$el.index()
                }), this.adding_new_tab = !1
            },
            addTab: function (e) {
                if (e.preventDefault(), !vc_user_access().shortcodeAll("vc_accordion_tab")) return !1;
                this.adding_new_tab = !0, vc.shortcodes.create({
                    shortcode: "vc_accordion_tab",
                    params: {
                        title: window.i18nLocale.section
                    },
                    parent_id: this.model.id
                })
            },
            _loadDefaults: function () {
                window.VcAccordionView.__super__._loadDefaults.call(this)
            }
        }), window.VcAccordionTabView = window.VcColumnView.extend({
            events: {
                "click > [data-element_type] > .vc_controls .vc_control-btn-delete": "deleteShortcode",
                "click > [data-element_type] >  .vc_controls .vc_control-btn-prepend": "addElement",
                "click > [data-element_type] >  .vc_controls .vc_control-btn-edit": "editElement",
                "click > [data-element_type] > .vc_controls .vc_control-btn-clone": "clone",
                "click > [data-element_type] > .wpb_element_wrapper > .vc_empty-container": "addToEmpty"
            },
            setContent: function () {
                this.$content = this.$el.find("> [data-element_type] > .wpb_element_wrapper > .vc_container_for_children")
            },
            changeShortcodeParams: function (model) {
                var params;
                window.VcAccordionTabView.__super__.changeShortcodeParams.call(this, model), params = model.get("params"), _.isObject(params) && _.isString(params.title) && this.$el.find("> h3 .tab-label").text(params.title)
            },
            setEmpty: function () {
                $("> [data-element_type]", this.$el).addClass("vc_empty-column"), "edit" !== vc_user_access().getState("shortcodes") && this.$content.addClass("vc_empty-container")
            },
            unsetEmpty: function () {
                $("> [data-element_type]", this.$el).removeClass("vc_empty-column"), this.$content.removeClass("vc_empty-container")
            }
        }), window.VcMessageView = vc.shortcode_view.extend({
            changeShortcodeParams: function (model) {
                var params, $wrapper;
                window.VcMessageView.__super__.changeShortcodeParams.call(this, model), params = model.get("params"), $wrapper = this.$el.find("> .wpb_element_wrapper").removeClass(_.values(this.params.color.value).join(" ")), _.isObject(params) && _.isString(params.color) && $wrapper.addClass(params.color)
            }
        }), window.VcMessageView_Backend = vc.shortcode_view.extend({
            changeShortcodeParams: function (model) {
                var params, $wrapper, classes, iconClass, color;
                switch (window.VcMessageView_Backend.__super__.changeShortcodeParams.call(this, model), params = model.get("params"), $wrapper = this.$el.find("> .wpb_element_wrapper"), classes = ["vc_message_box"], _.isUndefined(params.message_box_style) && (params.message_box_style = "classic"), _.isUndefined(params.message_box_color) && (params.message_box_color = "alert-info"), params.style ? "3d" === params.style ? (params.message_box_style = "3d", params.style = "rounded") : "outlined" === params.style ? (params.message_box_style = "outline", params.style = "rounded") : "square_outlined" === params.style && (params.message_box_style = "outline", params.style = "square") : params.style = "rounded", classes.push("vc_message_box-" + params.style), params.message_box_style && classes.push("vc_message_box-" + params.message_box_style), $wrapper.attr("class", "wpb_element_wrapper"), $wrapper.find(".vc_message_box-icon").remove(), iconClass = _.isUndefined(params["icon_" + params.icon_type]) ? "fa fa-info-circle" : params["icon_" + params.icon_type], color = params.color, params.color) {
                    case "info":
                        iconClass = "fa fa-info-circle";
                        break;
                    case "alert-info":
                        iconClass = "vc_pixel_icon vc_pixel_icon-info";
                        break;
                    case "success":
                        iconClass = "fa fa-check";
                        break;
                    case "alert-success":
                        iconClass = "vc_pixel_icon vc_pixel_icon-tick";
                        break;
                    case "warning":
                        iconClass = "fa fa-exclamation-triangle";
                        break;
                    case "alert-warning":
                        iconClass = "vc_pixel_icon vc_pixel_icon-alert";
                        break;
                    case "danger":
                        iconClass = "fa fa-times";
                        break;
                    case "alert-danger":
                        iconClass = "vc_pixel_icon vc_pixel_icon-explanation";
                        break;
                    case "alert-custom":
                    default:
                        color = params.message_box_color
                }
                classes.push("vc_color-" + color), $wrapper.addClass(classes.join(" ")), $wrapper.prepend($('<div class="vc_message_box-icon"><i class="' + iconClass + '"></i></div>'))
            }
        }), window.VcTextSeparatorView = vc.shortcode_view.extend({
            changeShortcodeParams: function (model) {
                var params, icon;
                window.VcTextSeparatorView.__super__.changeShortcodeParams.call(this, model), params = model.get("params");
                var $find = this.$el.find("> .wpb_element_wrapper");
                _.isObject(params) && _.isString(params.title_align) && $find.removeClass(_.values(this.params.title_align.value).join(" ")).addClass(params.title_align), _.isObject(params) && _.isString(params.add_icon) && "true" === params.add_icon && (icon = $('<i class="' + params["i_icon_" + params.i_type] + '" ></i>'), icon.prependTo($find.find("[name=title]")), icon.after(" "))
            }
        }), window.VcCallToActionView = vc.shortcode_view.extend({
            changeShortcodeParams: function (model) {
                var params;
                window.VcCallToActionView.__super__.changeShortcodeParams.call(this, model), params = model.get("params"), _.isObject(params) && _.isString(params.position) && this.$el.find("> .wpb_element_wrapper").removeClass(_.values(this.params.position.value).join(" ")).addClass(params.position)
            }
        }), window.VcCallToActionView3 = vc.shortcode_view.extend({
            changeShortcodeParams: function (model) {
                var params, value, $adminLabel;
                window.VcCallToActionView3.__super__.changeShortcodeParams.call(this, model), params = _.extend({
                    add_icon: "",
                    i_type: ""
                }, model.get("params")), $adminLabel = this.$el.find(".vc_admin_label.admin_label_i_type"), _.isEmpty(params.add_icon) ? $adminLabel.addClass("hidden-label").hide() : _.isEmpty(params.i_type) || _.isEmpty(params["i_icon_" + params.i_type]) || (value = vc_toTitleCase(params.i_type) + ' - <i class="' + params["i_icon_" + params.i_type] + '"></i>', $adminLabel.html("<label>" + $adminLabel.find("label").text() + "</label>: " + value), $adminLabel.show().removeClass("hidden-label"))
            }
        }), window.VcToggleView = vc.shortcode_view.extend({
            events: function () {
                return _.extend({
                    "click .vc_toggle_title": "toggle",
                    "click .toggle_title": "toggle"
                }, window.VcToggleView.__super__.events)
            },
            toggle: function (e) {
                e && e.preventDefault(), $(e.currentTarget).toggleClass("vc_toggle_title_active"), $(".vc_toggle_content", this.$el).slideToggle(500)
            },
            changeShortcodeParams: function (model) {
                var params;
                window.VcToggleView.__super__.changeShortcodeParams.call(this, model), params = model.get("params"), _.isObject(params) && _.isString(params.open) && "true" === params.open && $(".vc_toggle_title", this.$el).addClass("vc_toggle_title_active").next().show()
            }
        }), window.VcButtonView = vc.shortcode_view.extend({
            events: function () {
                return _.extend({
                    "click button": "buttonClick"
                }, window.VcToggleView.__super__.events)
            },
            buttonClick: function (e) {
                e.preventDefault()
            },
            changeShortcodeParams: function (model) {
                var params;
                if (window.VcButtonView.__super__.changeShortcodeParams.call(this, model), params = model.get("params"), _.isObject(params)) {
                    var el_class;
                    el_class = params.color + " " + params.size + " " + params.icon, this.$el.find(".wpb_element_wrapper").removeClass(el_class), this.$el.find("button.title").attr({
                        class: "title textfield wpb_button " + el_class
                    }), "none" !== params.icon && 0 === this.$el.find("button i.icon").length ? this.$el.find("button.title").append('<i class="icon"></i>') : this.$el.find("button.title i.icon").remove()
                }
            }
        }), window.VcButton2View = vc.shortcode_view.extend({
            events: function () {
                return _.extend({
                    "click button": "buttonClick"
                }, window.VcToggleView.__super__.events)
            },
            buttonClick: function (e) {
                e.preventDefault()
            },
            changeShortcodeParams: function (model) {
                var params;
                if (window.VcButton2View.__super__.changeShortcodeParams.call(this, model), params = model.get("params"), _.isObject(params)) {
                    var el_class;
                    el_class = (params.color ? "vc_btn_" + params.color : "") + " " + (params.color ? "vc_btn-" + params.color : "") + " " + (params.size ? "vc_btn-" + params.size : "") + " " + (params.size ? "vc_btn_" + params.size : "") + " " + (params.style ? "vc_btn_" + params.style : ""), this.$el.find(".wpb_element_wrapper").removeClass(el_class), this.$el.find("button.title").attr({
                        class: "title textfield vc_btn  " + el_class
                    })
                }
            }
        }), window.VcButton3View = vc.shortcode_view.extend({
            buttonTemplate: !1,
            buttonTemplateCompiled: !1,
            $wrapper: !1,
            events: function () {
                return _.extend({
                    "click .vc_btn3": "buttonClick"
                }, window.VcToggleView.__super__.events)
            },
            buttonClick: function (e) {
                e.preventDefault()
            },
            changeShortcodeParams: function (model) {
                var params;
                if (window.VcButton3View.__super__.changeShortcodeParams.call(this, model), params = _.extend({}, model.get("params")), this.buttonTemplate || (this.buttonTemplate = this.$el.find(".vc_btn3-container").html(), this.buttonTemplateCompiled = vc.template(this.buttonTemplate, vc.templateOptions.custom)), this.$wrapper || (this.$wrapper = this.$el.find(".wpb_element_wrapper")), _.isObject(params)) {
                    params.title && _.isEmpty(params.title.trim()) && (params.title = '<span class="vc_btn3-placeholder">&nbsp;</span>'), "custom" === params.style ? (params.color = void 0, _.isEmpty(params.custom_background) && _.isEmpty(params.custom_text) && (params.color = "grey")) : "outline-custom" === params.style && (params.color = void 0, _.isEmpty(params.outline_custom_color) && _.isEmpty(params.outline_custom_hover_background) && _.isEmpty(params.outline_custom_hover_text) && (params.style = "outline", params.color = "grey"));
                    var $element = $(this.buttonTemplateCompiled({
                        params: params
                    }));
                    "custom" === params.style ? ("undefined" !== params.custom_background && $element.css("background-color", params.custom_background), "undefined" !== params.custom_text && $element.css("color", params.custom_text)) : "outline-custom" === params.style && $element.css({
                        "background-color": "transparent",
                        "border-color": params.outline_custom_color,
                        color: params.outline_custom_color
                    }).hover(function () {
                        $(this).css({
                            "background-color": params.outline_custom_hover_background,
                            "border-color": params.outline_custom_hover_background,
                            color: params.outline_custom_hover_text
                        })
                    }, function () {
                        $(this).css({
                            "background-color": "transparent",
                            "border-color": params.outline_custom_color,
                            color: params.outline_custom_color
                        })
                    }), this.$wrapper.find(".vc_btn3-container").html($element)
                }
            }
        }), window.VcTabsView = vc.shortcode_view.extend({
            new_tab_adding: !1,
            events: {
                "click .add_tab": "addTab",
                "click > .vc_controls .vc_control-btn-delete": "deleteShortcode",
                "click > .vc_controls .vc_control-btn-edit": "editElement",
                "click > .vc_controls .vc_control-btn-clone": "clone"
            },
            initialize: function (params) {
                window.VcTabsView.__super__.initialize.call(this, params), _.bindAll(this, "stopSorting")
            },
            render: function () {
                return window.VcTabsView.__super__.render.call(this), this.$tabs = this.$el.find(".wpb_tabs_holder"), this.createAddTabButton(), this
            },
            ready: function (e) {
                window.VcTabsView.__super__.ready.call(this, e)
            },
            createAddTabButton: function () {
                var new_tab_button_id = Date.now() + "-" + Math.floor(11 * Math.random());
                this.$tabs.append('<div id="new-tab-' + new_tab_button_id + '" class="new_element_button"></div>'), this.$add_button = $('<li class="add_tab_block"><a href="#new-tab-' + new_tab_button_id + '" class="add_tab" title="' + window.i18nLocale.add_tab + '"></a></li>').appendTo(this.$tabs.find(".tabs_controls")), vc_user_access().shortcodeAll("vc_tab") || this.$add_button.hide()
            },
            addTab: function (e) {
                if (e.preventDefault(), !vc_user_access().shortcodeAll("vc_tab")) return !1;
                this.new_tab_adding = !0;
                var tab_title = window.i18nLocale.tab,
                    tabs_count = this.$tabs.find("[data-element_type=vc_tab]").length,
                    tab_id = Date.now() + "-" + tabs_count + "-" + Math.floor(11 * Math.random());
                return vc.shortcodes.create({
                    shortcode: "vc_tab",
                    params: {
                        title: tab_title,
                        tab_id: tab_id
                    },
                    parent_id: this.model.id
                }), !1
            },
            stopSorting: function (event, ui) {
                var shortcode;
                this.$tabs.find("ul.tabs_controls li:not(.add_tab_block)").each(function (index) {
                    $(this).find("a").attr("href").replace("#", "");
                    shortcode = vc.shortcodes.get($("[id=" + $(this).attr("aria-controls") + "]").data("model-id")), vc.storage.lock(), shortcode.save({
                        order: $(this).index()
                    })
                }), shortcode && shortcode.save()
            },
            changedContent: function (view) {
                var params = view.model.get("params");
                if (this.$tabs.hasClass("ui-tabs") || (this.$tabs.tabs({
                        select: function (event, ui) {
                            return !$(ui.tab).hasClass("add_tab")
                        }
                    }), this.$tabs.find(".ui-tabs-nav").prependTo(this.$tabs), vc_user_access().shortcodeAll("vc_tab") && this.$tabs.find(".ui-tabs-nav").sortable({
                        axis: "vc_tour" === this.$tabs.closest("[data-element_type]").data("element_type") ? "y" : "x",
                        update: this.stopSorting,
                        items: "> li:not(.add_tab_block)"
                    })), !0 === view.model.get("cloned")) {
                    var $tab_controls = (view.model.get("cloned_from"), $(".tabs_controls > .add_tab_block", this.$content)),
                        $new_tab = $("<li><a href='#tab-" + params.tab_id + "'>" + params.title + "</a></li>").insertBefore($tab_controls);
                    this.$tabs.tabs("refresh"), this.$tabs.tabs("option", "active", $new_tab.index())
                } else $("<li><a href='#tab-" + params.tab_id + "'>" + params.title + "</a></li>").insertBefore(this.$add_button), this.$tabs.tabs("refresh"), this.$tabs.tabs("option", "active", this.new_tab_adding ? $(".ui-tabs-nav li", this.$content).length - 2 : 0);
                this.new_tab_adding = !1
            },
            cloneModel: function (model, parent_id, save_order) {
                var new_order, model_clone, params, tag;
                return new_order = _.isBoolean(save_order) && !0 === save_order ? model.get("order") : parseFloat(model.get("order")) + vc.clone_index, params = _.extend({}, model.get("params")), tag = model.get("shortcode"), "vc_tab" === tag && _.extend(params, {
                    tab_id: Date.now() + "-" + this.$tabs.find("[data-element-type=vc_tab]").length + "-" + Math.floor(11 * Math.random())
                }), model_clone = Shortcodes.create({
                    shortcode: tag,
                    id: vc_guid(),
                    parent_id: parent_id,
                    order: new_order,
                    cloned: "vc_tab" !== tag,
                    cloned_from: model.toJSON(),
                    params: params
                }), _.each(Shortcodes.where({
                    parent_id: model.id
                }), function (shortcode) {
                    this.cloneModel(shortcode, model_clone.get("id"), !0)
                }, this), model_clone
            }
        }), window.VcTabView = window.VcColumnView.extend({
            events: {
                "click > .vc_controls .vc_control-btn-delete": "deleteShortcode",
                "click > .vc_controls .vc_control-btn-prepend": "addElement",
                "click > .vc_controls .vc_control-btn-edit": "editElement",
                "click > .vc_controls .vc_control-btn-clone": "clone",
                "click > .wpb_element_wrapper > .vc_empty-container": "addToEmpty"
            },
            render: function () {
                var params = this.model.get("params");
                return window.VcTabView.__super__.render.call(this), params.tab_id || (params.tab_id = Date.now() + "-" + Math.floor(11 * Math.random()), this.model.save("params", params)), this.id = "tab-" + params.tab_id, this.$el.attr("id", this.id), this
            },
            ready: function (e) {
                window.VcTabView.__super__.ready.call(this, e), this.$tabs = this.$el.closest(".wpb_tabs_holder");
                this.model.get("params");
                return this
            },
            changeShortcodeParams: function (model) {
                var params;
                window.VcTabView.__super__.changeShortcodeParams.call(this, model), params = model.get("params"), _.isObject(params) && _.isString(params.title) && _.isString(params.tab_id) && $('.ui-tabs-nav [href="#tab-' + params.tab_id + '"]').text(params.title)
            },
            deleteShortcode: function (e) {
                _.isObject(e) && e.preventDefault();
                var answer = confirm(window.i18nLocale.press_ok_to_delete_section),
                    parent_id = this.model.get("parent_id");
                if (!0 !== answer) return !1;
                if (this.model.destroy(), !vc.shortcodes.where({
                        parent_id: parent_id
                    }).length) {
                    return vc.shortcodes.get(parent_id).destroy(), !1
                }
                var params = this.model.get("params"),
                    current_tab_index = $('[href="#tab-' + params.tab_id + '"]', this.$tabs).parent().index();
                $('[href="#tab-' + params.tab_id + '"]').parent().remove();
                var tab_length = this.$tabs.find(".ui-tabs-nav li:not(.add_tab_block)").length;
                0 < tab_length && this.$tabs.tabs("refresh"), current_tab_index < tab_length ? this.$tabs.tabs("option", "active", current_tab_index) : 0 < tab_length && this.$tabs.tabs("option", "active", tab_length - 1)
            },
            cloneModel: function (model, parent_id, save_order) {
                var new_order, model_clone, params, tag;
                return new_order = _.isBoolean(save_order) && !0 === save_order ? model.get("order") : parseFloat(model.get("order")) + vc.clone_index, params = _.extend({}, model.get("params")), tag = model.get("shortcode"), "vc_tab" === tag && _.extend(params, {
                    tab_id: Date.now() + "-" + this.$tabs.find("[data-element_type=vc_tab]").length + "-" + Math.floor(11 * Math.random())
                }), model_clone = Shortcodes.create({
                    shortcode: tag,
                    parent_id: parent_id,
                    order: new_order,
                    cloned: !0,
                    cloned_from: model.toJSON(),
                    params: params
                }), _.each(Shortcodes.where({
                    parent_id: model.id
                }), function (shortcode) {
                    this.cloneModel(shortcode, model_clone.get("id"), !0)
                }, this), model_clone
            }
        }), window.VcIconElementView_Backend = vc.shortcode_view.extend({
            changeShortcodeParams: function (model) {
                var tag, params, settings, view;
                tag = model.get("shortcode"), params = model.get("params"), settings = vc.map[tag], _.isArray(settings.params) && _.each(settings.params, function (param_settings) {
                    if (!_.isUndefined(param_settings.admin_label) && param_settings.admin_label) {
                        var name, value, $wrapper, $admin_label;
                        name = param_settings.param_name, value = params[name], $wrapper = this.$el.find("> .wpb_element_wrapper"), $admin_label = $wrapper.children(".admin_label_" + name), $admin_label.length && ("" === value || _.isUndefined(value) ? $admin_label.hide().addClass("hidden-label") : ("type" === name && (_.isUndefined(params["icon_" + value]) || (value = vc_toTitleCase(value) + " - <i class='" + params["icon_" + value] + "'></i>")), $admin_label.html("<label>" + $admin_label.find("label").text() + "</label>: " + value), $admin_label.show().removeClass("hidden-label")))
                    }
                }, this), view = vc.app.views[this.model.get("parent_id")], !1 !== model.get("parent_id") && _.isObject(view) && view.checkIsEmpty()
            }
        }), window.VcBackendTtaViewInterface = vc.shortcode_view.extend({
            sortableSelector: !1,
            $sortable: !1,
            $navigation: !1,
            defaultSectionTitle: window.i18nLocale.tab,
            sortableUpdateModelIdSelector: "data-vc-target-model-id",
            activeClass: "vc_active",
            sortingPlaceholder: "vc_placeholder",
            events: {
                "click > .vc_controls .vc_control-btn-delete": "deleteShortcode",
                "click > .vc_controls .vc_control-btn-edit": "editElement",
                "click > .vc_controls .vc_control-btn-clone": "clone",
                "click > .vc_controls .vc_control-btn-prepend": "clickPrependSection",
                "click .vc_tta-section-append": "clickAppendSection"
            },
            initialize: function (params) {
                window.VcBackendTtaViewInterface.__super__.initialize.call(this, params), _.bindAll(this, "updateSorting")
            },
            render: function () {
                return window.VcBackendTtaViewInterface.__super__.render.call(this), this.$el.addClass("vc_tta-container vc_tta-o-non-responsive"), this
            },
            setContent: function () {
                this.$content = this.$el.find("> .wpb_element_wrapper .vc_tta-panels")
            },
            clickAppendSection: function (e) {
                e.preventDefault(), this.addSection()
            },
            clickPrependSection: function (e) {
                e.preventDefault(), this.addSection(!0)
            },
            addSection: function (prepend) {
                var newTabTitle, params;
                return newTabTitle = this.defaultSectionTitle, params = {
                    shortcode: "vc_tta_section",
                    params: {
                        title: newTabTitle
                    },
                    parent_id: this.model.get("id"),
                    order: _.isBoolean(prepend) && prepend ? vc.add_element_block_view.getFirstPositionIndex() : vc.shortcodes.getNextOrder(),
                    prepend: prepend
                }, vc.shortcodes.create(params)
            },
            findSection: function (modelId) {
                return this.$content.children('[data-model-id="' + modelId + '"]')
            },
            getIndex: function ($element) {
                return $element.index()
            },
            buildSortable: function ($element) {
                return !("edit" === vc_user_access().getState("shortcodes") || !vc_user_access().shortcodeAll("vc_tta_section")) && $element.sortable({
                    forcePlaceholderSize: !0,
                    placeholder: this.sortingPlaceholder,
                    helper: this.renderSortingPlaceholder,
                    scroll: !0,
                    cursor: "move",
                    cursorAt: {
                        top: 20,
                        left: 16
                    },
                    start: function (event, ui) {},
                    over: function (event, ui) {},
                    stop: function (event, ui) {
                        ui.item.attr("style", "")
                    },
                    update: this.updateSorting,
                    items: this.sortableSelector
                })
            },
            updateSorting: function (event, ui) {
                var self;
                if (!vc_user_access().shortcodeAll("vc_tta_section")) return !1;
                self = this, this.$sortable.find(this.sortableSelector).each(function () {
                    var shortcode, modelId, $this;
                    $this = $(this), modelId = $this.attr(self.sortableUpdateModelIdSelector), shortcode = vc.shortcodes.get(modelId), vc.storage.lock(), shortcode.save({
                        order: self.getIndex($this)
                    })
                }), vc.storage.unlock(), vc.storage.save()
            },
            makeFirstSectionActive: function () {
                this.$content.children(":first-child").addClass(this.activeClass)
            },
            checkForActiveSection: function () {
                var $currentActive;
                $currentActive = this.$content.children("." + this.activeClass), $currentActive.length || this.makeFirstSectionActive()
            },
            changeActiveSection: function (modelId) {
                this.$content.children(".vc_tta-panel." + this.activeClass).removeClass(this.activeClass), this.findSection(modelId).addClass(this.activeClass)
            },
            changedContent: function (view) {
                var changedContent;
                return changedContent = window.VcBackendTtaViewInterface.__super__.changedContent.call(this, view), this.checkForActiveSection(), this.buildSortable(this.$sortable), changedContent
            },
            notifySectionChanged: function (model) {
                var view, title;
                view = model.get("view"), _.isObject(view) && (title = model.getParam("title"), _.isString(title) && title.length || (title = this.defaultSectionTitle), view.$el.find(".vc_tta-panel-title a .vc_tta-title-text").text(title))
            },
            notifySectionRendered: function (model) {},
            getNextTab: function ($viewTab) {
                var lastIndex, viewTabIndex, $navigationSections;
                return $navigationSections = this.$navigation.children(), lastIndex = $navigationSections.length - 2, viewTabIndex = $viewTab.index(), viewTabIndex !== lastIndex ? $navigationSections.eq(viewTabIndex + 1) : $navigationSections.eq(viewTabIndex - 1)
            },
            renderSortingPlaceholder: function (event, element) {
                return vc.app.renderPlaceholder(event, element)
            }
        }), window.VcBackendTtaTabsView = window.VcBackendTtaViewInterface.extend({
            sortableSelector: "> [data-vc-tab]",
            sortableSelectorCancel: ".vc-non-draggable-container",
            sortablePlaceholderClass: "vc_placeholder-tta-tab",
            navigationSectionTemplate: null,
            navigationSectionTemplateParsed: null,
            $navigationSectionAdd: null,
            sortingPlaceholder: "vc_placeholder-tab vc_tta-tab",
            render: function () {
                return window.VcBackendTtaTabsView.__super__.render.call(this), this.$navigation = this.$el.find("> .wpb_element_wrapper .vc_tta-tabs-list"), this.$sortable = this.$navigation, this.$navigationSectionAdd = this.$navigation.children(".vc_tta-tab:first-child"), this.setNavigationSectionTemplate(this.$navigationSectionAdd.prop("outerHTML")), vc_user_access().shortcodeAll("vc_tta_section") ? this.$navigationSectionAdd.addClass("vc_tta-section-append").removeAttr("data-vc-target-model-id").removeAttr("data-vc-tab").find("[data-vc-target]").html('<i class="vc_tta-controls-icon vc_tta-controls-icon-plus"></i>').removeAttr("data-vc-tabs").removeAttr("data-vc-target").removeAttr("data-vc-target-model-id").removeAttr("data-vc-toggle") : this.$navigationSectionAdd.hide(), this
            },
            setNavigationSectionTemplate: function (html) {
                this.navigationSectionTemplate = html, this.navigationSectionTemplateParsed = vc.template(this.navigationSectionTemplate, vc.templateOptions.custom)
            },
            getNavigationSectionTemplate: function () {
                return this.navigationSectionTemplate
            },
            getParsedNavigationSectionTemplate: function (data) {
                return this.navigationSectionTemplateParsed(data)
            },
            changeNavigationSectionTitle: function (modelId, title) {
                this.findNavigationTab(modelId).find("[data-vc-target]").text(title)
            },
            changeActiveSection: function (modelId) {
                window.VcBackendTtaTabsView.__super__.changeActiveSection.call(this, modelId), this.$navigation.children("." + this.activeClass).removeClass(this.activeClass), this.findNavigationTab(modelId).addClass(this.activeClass)
            },
            notifySectionRendered: function (model) {
                var $element, title, $insertAfter, clonedFrom;
                window.VcBackendTtaTabsView.__super__.notifySectionRendered.call(this, model), title = model.getParam("title"), $element = $(this.getParsedNavigationSectionTemplate({
                    model_id: model.get("id"),
                    section_title: _.isString(title) && 0 < title.length ? title : this.defaultSectionTitle
                })), model.get("cloned") ? (clonedFrom = model.get("cloned_from"), _.isObject(clonedFrom) && ($insertAfter = this.$navigation.children('[data-vc-target-model-id="' + clonedFrom.id + '"]'), $insertAfter.length ? $element.insertAfter($insertAfter) : $element.insertBefore(this.$navigation.children(".vc_tta-section-append")))) : model.get("prepend") ? $element.insertBefore(this.$navigation.children(":first-child")) : $element.insertBefore(this.$navigation.children(":last-child"))
            },
            notifySectionChanged: function (model) {
                var title;
                window.VcBackendTtaTabsView.__super__.notifySectionChanged.call(this, model), title = model.getParam("title"), _.isString(title) && title.length || (title = this.defaultSectionTitle), this.changeNavigationSectionTitle(model.get("id"), title), model.view.$el.find("> .wpb_element_wrapper > .vc_tta-panel-body > .vc_controls .vc_element-name").removeClass("vc_element-move"), model.view.$el.find("> .wpb_element_wrapper > .vc_tta-panel-body > .vc_controls .vc_element-name .vc-c-icon-dragndrop").hide()
            },
            makeFirstSectionActive: function () {
                var $tab;
                $tab = this.$navigation.children(":first-child:not(.vc_tta-section-append)").addClass(this.activeClass), $tab.length && this.findSection($tab.data("vc-target-model-id")).addClass(this.activeClass)
            },
            findNavigationTab: function (modelId) {
                return this.$navigation.children('[data-vc-target-model-id="' + modelId + '"]')
            },
            removeSection: function (model) {
                var $viewTab, $nextTab, tabIsActive;
                $viewTab = this.findNavigationTab(model.get("id")), tabIsActive = $viewTab.hasClass(this.activeClass), tabIsActive && ($nextTab = this.getNextTab($viewTab), $nextTab.addClass(this.activeClass), this.changeActiveSection($nextTab.data("vc-target-model-id"))), $viewTab.remove()
            },
            renderSortingPlaceholder: function (event, currentItem) {
                var helper, currentItemWidth, currentItemHeight;
                return helper = currentItem, currentItemWidth = currentItem.width() + 1, currentItemHeight = currentItem.height(), helper.width(currentItemWidth), helper.height(currentItemHeight), helper
            }
        }), window.VcBackendTtaAccordionView = VcBackendTtaViewInterface.extend({
            sortableSelector: "> .vc_tta-panel:not(.vc_tta-section-append)",
            sortableSelectorCancel: ".vc-non-draggable",
            sortableUpdateModelIdSelector: "data-model-id",
            defaultSectionTitle: window.i18nLocale.section,
            render: function () {
                return window.VcBackendTtaTabsView.__super__.render.call(this), this.$navigation = this.$content, this.$sortable = this.$content, vc_user_access().shortcodeAll("vc_tta_section") || this.$content.find(".vc_tta-section-append").hide(), this
            },
            removeSection: function (model) {
                var $viewTab, $nextTab, tabIsActive;
                $viewTab = this.findSection(model.get("id")), (tabIsActive = $viewTab.hasClass(this.activeClass)) && ($nextTab = this.getNextTab($viewTab), $nextTab.addClass(this.activeClass))
            },
            addShortcode: function (view) {
                var beforeShortcode;
                beforeShortcode = _.last(vc.shortcodes.filter(function (shortcode) {
                    return shortcode.get("parent_id") === this.get("parent_id") && parseFloat(shortcode.get("order")) < parseFloat(this.get("order"))
                }, view.model)), beforeShortcode ? view.render().$el.insertAfter("[data-model-id=" + beforeShortcode.id + "]") : this.$content.prepend(view.render().el)
            }
        }), window.VcBackendTtaTourView = window.VcBackendTtaTabsView.extend({
            defaultSectionTitle: window.i18nLocale.section
        }), window.VcBackendTtaPageableView = window.VcBackendTtaTabsView.extend({
            defaultSectionTitle: window.i18nLocale.section
        }), window.VcBackendTtaSectionView = window.VcColumnView.extend({
            parentObj: null,
            events: {
                "click > .wpb_element_wrapper > .vc_tta-panel-body > .vc_controls .vc_control-btn-delete": "deleteShortcode",
                "click > .wpb_element_wrapper > .vc_tta-panel-body > .vc_controls .vc_control-btn-prepend": "addElement",
                "click > .wpb_element_wrapper > .vc_tta-panel-body > .vc_controls .vc_control-btn-edit": "editElement",
                "click > .wpb_element_wrapper > .vc_tta-panel-body > .vc_controls .vc_control-btn-clone": "clone",
                "click > .wpb_element_wrapper > .vc_tta-panel-body > .vc_empty-container": "addToEmpty"
            },
            setContent: function () {
                this.$content = this.$el.find("> .wpb_element_wrapper > .vc_tta-panel-body > .vc_container_for_children")
            },
            render: function () {
                var parentObj;
                return window.VcBackendTtaSectionView.__super__.render.call(this), parentObj = vc.shortcodes.get(this.model.get("parent_id")), _.isObject(parentObj) && !_.isUndefined(parentObj.view) && (this.parentObj = parentObj), this.$el.addClass("vc_tta-panel"), this.$el.attr("style", ""), this.$el.attr("data-vc-toggle", "tab"), this.replaceTemplateVars(), this
            },
            replaceTemplateVars: function () {
                var title, $panelHeading;
                title = this.model.getParam("title"), _.isEmpty(title) && (title = this.parentObj && this.parentObj.defaultSectionTitle && this.parentObj.defaultSectionTitle.length ? this.parentObj.defaultSectionTitle : window.i18nLocale.section), $panelHeading = this.$el.find(".vc_tta-panel-heading");
                var template = vc.template($panelHeading.html(), vc.templateOptions.custom);
                $panelHeading.html(template({
                    model_id: this.model.get("id"),
                    section_title: title
                }))
            },
            getIndex: function () {
                return this.$el.index()
            },
            ready: function () {
                this.updateParentNavigation(), window.VcBackendTtaSectionView.__super__.ready.call(this)
            },
            updateParentNavigation: function () {
                _.isObject(this.parentObj) && this.parentObj.view && this.parentObj.view.notifySectionRendered && this.parentObj.view.notifySectionRendered(this.model)
            },
            deleteShortcode: function (e) {
                return _.isObject(e) && e.preventDefault(), !0 === confirm(window.i18nLocale.press_ok_to_delete_section) && (1 === vc.shortcodes.where({
                    parent_id: this.model.get("parent_id")
                }).length ? (this.model.destroy(), this.parentObj && this.parentObj.destroy()) : (this.parentObj && this.parentObj.view && this.parentObj.view.removeSection && this.parentObj.view.removeSection(this.model), this.model.destroy()), !0)
            },
            changeShortcodeParams: function (model) {
                window.VcBackendTtaSectionView.__super__.changeShortcodeParams.call(this, model), _.isObject(this.parentObj) && this.parentObj.view && this.parentObj.view.notifySectionChanged && this.parentObj.view.notifySectionChanged(model)
            }
        }), vc.addTemplateFilter(function (string) {
            var random_id = VCS4() + "-" + VCS4();
            return string.replace(/tab\_id\=\"([^\"]+)\"/g, 'tab_id="$1' + random_id + '"')
        })
    }(window.jQuery),
    function ($, _) {
        "use strict";

        function processImages(attachments, callback) {
            var ids = attachments.models ? attachments.pluck("id") : attachments;
            $.ajax({
                dataType: "json",
                type: "POST",
                url: window.ajaxurl,
                data: {
                    action: "vc_media_editor_add_image",
                    filters: window.vc_selectedFilters,
                    ids: ids,
                    vc_inline: !0,
                    _vcnonce: window.vcAdminNonce
                }
            }).done(function (response) {
                var models, attachment, promises, i;
                if ("function" == typeof callback) {
                    for (models = [], promises = [], i = 0; i < response.data.ids.length; i++) attachment = attachments[response.data.ids[i]], attachment || (attachment = media.model.Attachment.get(response.data.ids[i]), promises.push(attachment.fetch())), models.push(attachment);
                    $.when.apply($, promises).done(function () {
                        callback(models)
                    })
                }
            }).fail(function (response) {
                $(".media-modal-close").click(), attachCb = [], window.vc && window.vc.active_panel && window.i18nLocale && window.i18nLocale.error_while_saving_image_filtered && vc.active_panel.showMessage(window.i18nLocale.error_while_saving_image_filtered, "error"), window.console && window.console.error && window.console.error(response)
            }).always(function () {
                $(".media-modal").removeClass("processing-media")
            })
        }

        function previewFilter(attachmentId) {
            var $previewContainer, $preview, $filter;
            if ($filter = $(".media-frame:visible [data-vc-preview-image-filter=" + attachmentId + "]"), $filter.length) {
                if ($previewContainer = $(".media-frame:visible .attachment-info .thumbnail-image").eq(-1), $preview = $previewContainer.find("img"), $previewContainer.addClass("loading"), $preview.data("original-src") || $preview.data("original-src", $preview.attr("src")), !$filter.val().length) return $preview.attr("src", $preview.data("original-src")), void $previewContainer.removeClass("loading");
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: window.ajaxurl,
                    data: {
                        action: "vc_media_editor_preview_image",
                        filter: $filter.val(),
                        attachment_id: attachmentId,
                        preferred_size: window.getUserSetting("imgsize", "medium"),
                        _vcnonce: window.vcAdminNonce
                    }
                }).done(function (response) {
                    response.success && response.data.src.length && $preview.attr("src", response.data.src)
                }).fail(function (jqXHR, textStatus, errorThrown) {
                    window.console && window.console.error && window.console.error("Filter preview failed:", textStatus, errorThrown)
                }).always(function () {
                    $previewContainer.removeClass("loading")
                })
            }
        }
        var attachmentCompatRender, attachCb = [],
            media = wp.media,
            origFeaturedImageSet = media.featuredImage.set,
            origEditorSendAttachment = media.editor.send.attachment,
            l10n = i18nLocale,
            workflows = {};
        attachmentCompatRender = _.extend(media.view.AttachmentCompat.prototype.render), media.view.AttachmentCompat.prototype.render = function () {
            var attachmentId, that = this;
            return attachmentId = this.model.get("id"), attachmentCompatRender.call(this), _.defer(function () {
                var $container, html, $filter, label, $input;
                $container = that.controller.$el.find(".attachment-info"), $input = that.controller.$el.find("[data-vc-preview-image-filter]"), $container.length && $input.length && (label = $input.parent().find(".vc-filter-label").text(), html = '<label class="setting vc-image-filter-setting">', html += '<span class="name">' + label + "</span>", html += $input[0].outerHTML, html += "</label>", $container.before(html), $input.parents("tr").remove()), void 0 !== window.vc_selectedFilters && void 0 !== window.vc_selectedFilters[attachmentId] && ($filter = $(".media-frame:visible [data-vc-preview-image-filter=" + attachmentId + "]"), $filter.length && $filter.val(window.vc_selectedFilters[attachmentId]).change()), previewFilter(attachmentId)
            }), this
        }, media.editor.send.attachment = function (props, attachment) {
            function finishImageProcessing(newAttachment) {
                var attachment = newAttachment.slice(0).pop().attributes;
                origEditorSendAttachment(props, attachment).done(function (html) {
                    origEditorSendAttachmentCallback(html, attachment.id)
                })
            }

            function origEditorSendAttachmentCallback(html, id) {
                attachCb && attachCb[0] !== id ? setTimeout(function () {
                    origEditorSendAttachmentCallback(html, id)
                }, 50) : (attachCb.shift(), media.editor.insert(html))
            }
            attachCb.push(attachment.id), processImages([attachment.id], finishImageProcessing)
        }, media.featuredImage.set = function (id) {
            var ids = [id]; - 1 !== id ? $.ajax({
                type: "POST",
                url: window.ajaxurl,
                data: {
                    action: "vc_media_editor_add_image",
                    filters: window.vc_selectedFilters,
                    ids: ids,
                    _vcnonce: window.vcAdminNonce
                }
            }).done(function (response) {
                var newId;
                !0 === response.success && response.data.ids.length ? (newId = response.data.ids.pop(), origFeaturedImageSet(newId)) : origFeaturedImageSet(id)
            }).fail(function () {
                origFeaturedImageSet(id)
            }) : origFeaturedImageSet(id)
        }, media.controller.VcSingleImage = media.controller.FeaturedImage.extend({
            defaults: _.defaults({
                id: "vc_single-image",
                filterable: "uploaded",
                multiple: !1,
                toolbar: "vc_single-image",
                title: l10n.set_image,
                priority: 60,
                syncSelection: !1
            }, media.controller.Library.prototype.defaults),
            updateSelection: function () {
                var attachments, selection = this.get("selection"),
                    ids = media.vc_editor.getData();
                this.get("library");
                void 0 !== ids && "" !== ids && -1 !== ids && (attachments = _.map(ids.toString().split(/,/), function (id) {
                    var attachment = media.model.Attachment.get(id);
                    return attachment.fetch(), attachment
                })), selection.reset(attachments)
            }
        }), media.controller.VcGallery = media.controller.VcSingleImage.extend({
            defaults: _.defaults({
                id: "vc_gallery",
                title: l10n.add_images,
                toolbar: "main-insert",
                filterable: "uploaded",
                library: media.query({
                    type: "image"
                }),
                multiple: "add",
                editable: !0,
                priority: 60,
                syncSelection: !1
            }, media.controller.Library.prototype.defaults)
        }), media.VcSingleImage = {
            getData: function () {
                return this.$hidden_ids.val()
            },
            set: function (selection) {
                var template = vc.template($("#vc_settings-image-block").html(), vc.templateOptions.custom);
                return this.$img_ul.html(template(selection)), this.$clear_button.show(), this.$hidden_ids.val(selection.id).trigger("change"), !1
            },
            frame: function (element) {
                return window.vc_selectedFilters = {}, this.element = element, this.$button = $(this.element), this.$block = this.$button.closest(".edit_form_line"), this.$hidden_ids = this.$block.find(".gallery_widget_attached_images_ids"), this.$img_ul = this.$block.find(".gallery_widget_attached_images_list"), this.$clear_button = this.$img_ul.next(), this._frame ? this._frame : (this._frame = media({
                    state: "vc_single-image",
                    states: [new media.controller.VcSingleImage]
                }), this._frame.on("toolbar:create:vc_single-image", function (toolbar) {
                    this.createSelectToolbar(toolbar, {
                        text: l10n.set_image,
                        close: !1
                    })
                }, this._frame), this._frame.state("vc_single-image").on("select", this.select), this._frame)
            },
            select: function () {
                var selection = this.get("selection");
                vc.events.trigger("click:media_editor:add_image", selection, "single")
            }
        }, media.view.MediaFrame.VcGallery = media.view.MediaFrame.Post.extend({
            createStates: function () {
                this.states.add([new media.controller.VcGallery])
            },
            bindHandlers: function () {
                media.view.MediaFrame.Select.prototype.bindHandlers.apply(this, arguments), this.on("toolbar:create:main-insert", this.createToolbar, this);
                var handlers = {
                    content: {
                        embed: "embedContent",
                        "edit-selection": "editSelectionContent"
                    },
                    toolbar: {
                        "main-insert": "mainInsertToolbar"
                    }
                };
                _.each(handlers, function (regionHandlers, region) {
                    _.each(regionHandlers, function (callback, handler) {
                        this.on(region + ":render:" + handler, this[callback], this)
                    }, this)
                }, this)
            },
            mainInsertToolbar: function (view) {
                var controller = this;
                this.selectionStatusToolbar(view), view.set("insert", {
                    style: "primary",
                    priority: 80,
                    text: l10n.add_images,
                    requires: {
                        selection: !0
                    },
                    click: function () {
                        var state = controller.state(),
                            selection = state.get("selection");
                        vc.events.trigger("click:media_editor:add_image", selection, "gallery"), state.trigger("insert", selection).reset()
                    }
                })
            }
        }), media.vc_editor = _.clone(media.editor), _.extend(media.vc_editor, {
            $vc_editor_element: null,
            getData: function () {
                return media.vc_editor.$vc_editor_element.closest(".edit_form_line").find(".gallery_widget_attached_images_ids").val()
            },
            insert: function (images) {
                var $button = media.vc_editor.$vc_editor_element,
                    $block = $button.closest(".edit_form_line"),
                    $hidden_ids = $block.find(".gallery_widget_attached_images_ids"),
                    $img_ul = $block.find(".gallery_widget_attached_images_list"),
                    $thumbnails_string = "",
                    template = vc.template($("#vc_settings-image-block").html(), vc.templateOptions.custom);
                _.each(images, function (image) {
                    $thumbnails_string += template(image)
                }), $hidden_ids.val(_.map(images, function (image) {
                    return image.id
                }).join(",")).trigger("change"), $img_ul.html($thumbnails_string)
            },
            open: function (id) {
                var workflow;
                return id = this.id(id), workflow = this.get(id), workflow || (workflow = this.add(id)), window.vc_selectedFilters = {}, workflow.open()
            },
            add: function (id, options) {
                var workflow = this.get(id);
                return workflow || (workflows[id] ? workflows[id] : workflow = workflows[id] = new media.view.MediaFrame.VcGallery(_.defaults(options || {}, {
                    state: "vc_gallery",
                    title: l10n.add_images,
                    library: {
                        type: "image"
                    },
                    multiple: !0
                })))
            },
            init: function () {
                $("body").unbind("click.vcGalleryWidget").on("click.vcGalleryWidget", ".gallery_widget_add_images", function (event) {
                    event.preventDefault();
                    var $this = $(this);
                    if (media.vc_editor.$vc_editor_element = $(this), "true" === $this.attr("use-single")) return void media.VcSingleImage.frame(this).open("vc_editor");
                    $this.blur(), media.vc_editor.open("visual-composer")
                })
            }
        }), _.bindAll(media.vc_editor, "open"), $(document).ready(function () {
            media.vc_editor.init()
        }), vc.events.on("click:media_editor:add_image", function (selection, type) {
            function finishImageProcessing(newAttachments) {
                var attachments, objects;
                switch (attachments = _.map(newAttachments, function (newAttachment) {
                    return newAttachment.attributes
                }), selection.reset(attachments), objects = _.map(selection.models, function (model) {
                    return model.attributes
                }), void 0 === type && (type = ""), type) {
                    case "gallery":
                        media.vc_editor.insert(objects);
                        break;
                    case "single":
                        media.VcSingleImage.set(objects[0])
                }
                $(".media-modal").removeClass("processing-media"), $(".media-modal-close").click()
            }
            $(".media-modal").addClass("processing-media"), processImages(_.extend({}, selection), finishImageProcessing)
        }), $("body").on("change", "[data-vc-preview-image-filter]", function () {
            var id;
            id = $(this).data("vcPreviewImageFilter"), void 0 === window.vc_selectedFilters && (window.vc_selectedFilters = {}), window.vc_selectedFilters[id] = $(this).val(), previewFilter(id)
        })
    }(window.jQuery, window._);
var vcPointerMessage;
! function ($) {
    "use strict";
    vcPointerMessage = function (target, pointerOptions, texts) {
        this.target = target, this.$pointer = null, this.texts = texts, this.pointerOptions = pointerOptions, this.init()
    }, vcPointerMessage.prototype = {
        init: function () {
            _.bindAll(this, "openedEvent", "reposition")
        },
        show: function () {
            this.$pointer = $(this.target), this.$pointer.data("vcPointerMessage", this), this.pointerOptions.opened = this.openedEvent, this.$pointer.addClass("vc-with-vc-pointer").pointer(this.pointerOptions).pointer("open"), $(window).on("resize.vcPointer", this.reposition)
        },
        domButtonsWrapper: function () {
            return $('<div class="vc_wp-pointer-controls" />')
        },
        domCloseBtn: function () {
            return $('<a class="vc_pointer-close close">' + this.texts.finish + "</a>")
        },
        domNextBtn: function () {
            return $('<button class="button button-primary button-large vc_wp-pointers-next">' + this.texts.next + '<i class="vc_pointer-icon"></i></button>')
        },
        domPrevBtn: function () {
            return $('<button class="button button-primary button-large vc_wp-pointers-prev"><i class="vc_pointer-icon"></i>' + this.texts.prev + "</button> ")
        },
        openedEvent: function (a, b) {
            var offset = b.pointer.offset();
            offset && offset.top && $("body").scrollTop(80 < offset.top ? offset.top - 80 : 0)
        },
        reposition: function () {
            this.$pointer.pointer("reposition")
        },
        close: function () {
            this.$pointer && this.$pointer.removeClass("vc-with-vc-pointer").pointer("close"), $(window).off("resize.vcPointer")
        }
    }
}(window.jQuery);
var vcPointersController;
! function ($) {
    "use strict";
    vcPointersController = function (Pointer, texts) {
        this.pointers = Pointer && Pointer.messages || [], this._texts = texts, this.pointerId = Pointer && Pointer.pointer_id ? Pointer.pointer_id : "", this.pointerData = {}, this._index = 0, this.messagesDismissed = !1, this.init()
    }, vcPointersController.prototype = {
        init: function () {
            _.bindAll(this, "show", "clickEventClose", "clickEventNext", "clickEventPrev", "buttonsEvent"), this.build()
        },
        getPointer: function (index) {
            return this.pointerData = this.pointers[index] && this.pointers[index].target ? this.pointers[index] : null, this.pointerData && this.pointerData.options ? new vcPointerMessage(this.pointerData.target, this.buildOptions(this.pointerData.options), this._texts) : null
        },
        buildOptions: function (data) {
            return data.buttonsEvent && _.isFunction(window[data.buttonsEvent]) ? data.buttons = _.bind(window[data.buttonsEvent], this) : data.buttons = this.buttonsEvent, data.vcPointerController = this, data
        },
        build: function () {
            if (this.pointer = this.getPointer(this._index), vc.events.once("backendEditor.close", this.close, this), !this.pointer) return !1;
            this.setShowEventHandler()
        },
        show: function () {
            this.pointer.show(), this.setCloseEventHandler(), vc.events.trigger("vcPointer:show")
        },
        setShowEventHandler: function () {
            var showEvent;
            this.pointerData.showCallback && window[this.pointerData.showCallback] ? window[this.pointerData.showCallback].call(this) : this.pointerData.showEvent ? this.pointerData.showEvent.match(/\s/) ? (showEvent = this.pointerData.closeEvent.split(/\s+(.+)?/), 1 < showEvent.length && $(showEvent[1]).one(showEvent[0], this.show)) : vc.events.once(this.pointerData.showEvent, this.show) : this.show()
        },
        setCloseEventHandler: function () {
            var closeEvent;
            this.pointerData.closeCallback && window[this.pointerData.closeCallback] ? window[this.pointerData.closeCallback].call(this) : this.pointerData.closeEvent ? this.pointerData.closeEvent.match(/\s/) ? (closeEvent = this.pointerData.closeEvent.split(/\s+(.+)?/), $(closeEvent[1] || this.$pointer).one(closeEvent[1] && closeEvent[0] ? closeEvent[0] : "click", this.clickEventNext)) : vc.events.once(this.pointerData.closeEvent, this.nextOnEvent, this) : this.pointer.$pointer && 0 < this.pointer.$pointer.length && $(this.pointer.$pointer).one("click", this.clickEventNext)
        },
        nextOnEvent: function () {
            this.close(), this.next()
        },
        next: function () {
            this._index++, this.build()
        },
        prev: function () {
            this._index--, this.build()
        },
        close: function () {
            this.pointer && (this.pointer.close(), this.pointerData = null, this.pointer = null, vc.events.trigger("vcPointer:close", this))
        },
        buttonsEvent: function () {
            var $closeBtn, $nextBtn, $prevBtn, $buttons;
            return $closeBtn = this.pointer.domCloseBtn(), $nextBtn = this.pointer.domNextBtn(), $prevBtn = this.pointer.domPrevBtn(), $closeBtn.bind("click.vcPointer", this.clickEventClose), $buttons = this.pointer.domButtonsWrapper().append($closeBtn), 0 < this._index && ($prevBtn.bind("click.vcPointer", this.clickEventPrev), $buttons.addClass("vc_wp-pointer-controls-prev").append($prevBtn)), this._index + 1 < this.pointers.length && ($nextBtn.bind("click.vcPointer", this.clickEventNext), $buttons.addClass("vc_wp-pointer-controls-next").append($nextBtn)), $buttons
        },
        clickEventClose: function () {
            this.close(), this.dismissMessages()
        },
        clickEventNext: function () {
            this.close(), this.next()
        },
        clickEventPrev: function () {
            this.close(), this.prev()
        },
        dismissMessages: function () {
            if (this.messagesDismissed) return !1;
            $.post(window.ajaxurl, {
                pointer: this.pointerId,
                action: "dismiss-wp-pointer"
            }), this.messagesDismissed = !0
        }
    }
}(window.jQuery),
function ($) {
    "use strict";
    vc.events.on("app.render", function () {
        window.vcPointer && window.vcPointer.pointers && window.vcPointer.pointers.length && _.each(vcPointer.pointers, function (pointer) {
            new vcPointersController(pointer, vcPointer.texts)
        }, this)
    }), vc.events.on("vcPointer:show", function () {
        vc.app.disableFixedNav = !0
    }), vc.events.on("vcPointer:close", function () {
        vc.app.disableFixedNav = !1
    }), window.vcPointersEditorsTourEvents = function () {
        var $closeBtn;
        return $closeBtn = this.pointer.domCloseBtn(), $closeBtn.bind("click.vcPointer", this.clickEventClose), this.dismissMessages(), $closeBtn
    }, window.vcPointersShowOnContentElementControls = function () {
        this.pointer && $(this.pointer.target).length ? ($(this.pointer.target).parent().addClass("vc-with-vc-pointer-controls"), this.show(), $("#wpb_visual_composer").one("click", function () {
            $(".vc-with-vc-pointer-controls").removeClass("vc-with-vc-pointer-controls")
        })) : vc.events.once("shortcodes:add", vcPointersShowOnContentElementControls, this)
    }, window.vcPointersSetInIFrame = function () {
        this.pointerData && vc.frame_window.jQuery(this.pointerData.target).length ? (this.pointer = new vc.frame_window.vcPointerMessage(this.pointerData.target, this.buildOptions(this.pointerData.options), this._texts), this.show(), this.pointer.$pointer.closest(".vc_controls").addClass("vc-with-vc-pointer-controls")) : vc.events.once("shortcodeView:ready", vcPointersSetInIFrame, this)
    }, window.vcPointersCloseInIFrame = function () {
        var controller, _$;
        controller = this, _$ = vc.frame_window.jQuery, _$("body").one("click", function () {
            _$(".vc-with-vc-pointer-controls").removeClass("vc-with-vc-pointer-controls"), controller.nextOnEvent()
        })
    }
}(window.jQuery);