import { Plugin } from "./PluginSystem";
import { useState, useEffect } from "react";

export class MarkdownPlugin extends Plugin {
  constructor(name) {
    super(name);
    this.initialized = false;
    this.icon = <i class="fa-brands fa-markdown"></i>;
  }
  on(dom) {
    // add editor
    // if (this.initialized == false) {
    //   let element_inputwrapper = dom.current.querySelector(".InputWrapper");
    //   this.element_markdown = document.createElement("div");
    //   this.element_markdown.setAttribute("id", "vditor");
    //   element_inputwrapper.append(this.element_markdown);
    //   this.vd = new Vditor("vditor");
    //   this.initialized = true;
    // }
    
    // let element_textarea = dom.current.querySelector("textarea");
    // this.element_markdown.style = element_textarea.style;
    // element_textarea.style.display = "none";
  }

  off(dom) {
    // let element_textarea = dom.current.querySelector("textarea");
    // this.element_markdown.style.display = "none";
    // element_textarea.style.display = "block";
  }

}