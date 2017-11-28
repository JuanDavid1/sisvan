! function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.VuePaginator = t() : e.VuePaginator = t()
}(this, function() {
    return function(e) {
        function t(r) {
            if (n[r]) return n[r].exports;
            var o = n[r] = {
                exports: {},
                id: r,
                loaded: !1
            };
            return e[r].call(o.exports, o, o.exports, t), o.loaded = !0, o.exports
        }
        var n = {};
        return t.m = e, t.c = n, t.p = "", t(0)
    }([function(e, t, n) {
        "use strict";

        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        var o = n(2),
            a = r(o);
        e.exports = a["default"]
    }, , function(e, t, n) {
        e.exports = n(3), e.exports.__esModule && (e.exports = e.exports["default"]), ("function" == typeof e.exports ? e.exports.options : e.exports).template = n(5)
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = n(4);
        t["default"] = {
            props: {
                resource_url: {
                    type: String,
                    required: !0
                },
                datos :{
                    type : Object,
                    required: !1,
                },
                custom_template: "",
                options: {
                    type: Object,
                    required: !1,
                    "default": function() {
                        return {}
                    }
                }
            },
            data: function() {
                return {
                    current_page: "",
                    last_page: "",
                    next_page_url: "",
                    prev_page_url: "",
                    config: {
                        remote_data: "data",
                        remote_current_page: "current_page",
                        remote_last_page: "last_page",
                        remote_next_page_url: "next_page_url",
                        remote_prev_page_url: "prev_page_url",
                        previous_button_text: "Anterior",
                        next_button_text: "Siguiente"
                    }
                }
            },
            methods: {
                fetchData: function(e) {
                    e = e || this.resource_url;
                    var t = this;
                    this.$http.post(e, {
                        headers: this.config.headers, datos : this.datos
                    }).then((e)=> {
                        t.handleResponseData(e.data)
                    },(error)=>{
                        toastr.error('Error:: '+error.status + ' '+error.statusText+' ('+error.url+')');
                        //console.log(error);
                    });
                },
                handleResponseData: function(e) {
                    this.makePagination(e);
                    var t = r.utils.getNestedValue(e, this.config.remote_data);
                    this.$emit("update", t)
                },
                makePagination: function(e) {
                    this.current_page = r.utils.getNestedValue(e, this.config.remote_current_page), this.last_page = r.utils.getNestedValue(e, this.config.remote_last_page), this.next_page_url = this.current_page === this.last_page ? null : r.utils.getNestedValue(e, this.config.remote_next_page_url), this.prev_page_url = 1 === this.current_page ? null : r.utils.getNestedValue(e, this.config.remote_prev_page_url)
                },
                initConfig: function() {
                    this.config = r.utils.merge_objects(this.config, this.options)
                }
            },
            watch: {
                resource_url: function() {
                    this.fetchData()
                }
            },
            created: function() {
                this.initConfig(), this.fetchData()
            }
        }
    }, function(e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = function(e, t) {
                var n = {};
                for (var r in e) n[r] = e[r];
                for (var o in t) n[o] = t[o];
                return n
            },
            r = function(e, t) {
                var n = t;
                t = t.split(".");
                for (var r = e, o = 0; o < t.length; o++) r = r[t[o]];
                return "undefined" == typeof r && console.log("[VuePaginator] Response doesn't contain key " + n + "!"), r
            };
        t.utils = {
            merge_objects: n,
            getNestedValue: r
        }
    }, function(e, t) {
        e.exports = '<div class=v-paginator> <button class="btn btn-default" @click=fetchData(prev_page_url) :disabled=!prev_page_url> {{config.previous_button_text}} </button> <span>Pagina {{current_page}} de {{last_page}} &nbsp;&nbsp;&nbsp;</span> <button class="btn btn-default" @click=fetchData(next_page_url) :disabled=!next_page_url> {{config.next_button_text}} </button> </div>'
    }])
});