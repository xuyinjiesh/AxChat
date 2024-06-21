/**
 * @author Ruoxi Wang
 * @version 0.1
 * @date 2024-06-21
 */

import { Plugin } from "./PluginSystem";
import { MD5 } from "./md5";
import { useState, useEffect } from "react";

export class TranslationnPlugin extends Plugin {
    constructor(name) {
        super(name);
        this.initialized = false;
        this.icon = <i class="fa-brands fa-markdown"></i>;
    }
    on(dom) {
        var targets = dom.getElementsByClassName(Message);
        var query = "";
        for (var i = 0; i < targets.length; i++) {
            query = query + "\n" + targets[i].innerText;
        }
        var res = fetchTranslation(query, 'auto', 'zh');
        for (var i = 0; i < targets.length; i++) {
            targets[i].innerText = targets[i].innerText + res[i].dst;
        }
    }

    off(dom) {
        // let element_textarea = dom.current.querySelector("textarea");
        // this.element_markdown.style.display = "none";
        // element_textarea.style.display = "block";
    }

}

async function fetchTranslation(text, from, to) {
    var query = text;
    var appid = '20240424002034191';
    var key = '172o1rvfgANzrms_cDDa';
    var salt = (new Date).getTime();
    var str1 = appid + query + salt + key;
    var sign = MD5(str1);

    data = await fetch("/translate", {
        method: "POST",
        body: {
            q: query,
            appid: appid,
            salt: salt,
            from: from,
            to: to,
            sign: sign
        },
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
        .then((response) => response.json())
        .catch(function (error) { alert("Error: " + error) });

    return data.trans_result;
}