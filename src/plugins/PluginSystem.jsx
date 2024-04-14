export class Plugin {
  
  constructor(name) {
    this.name = name;
    this.isRunning = false;
  }
  
  switch(dom) {
    if (!this.isRunning) {
      this.on(dom);
      this.isRunning = true;
    } else {
      this.off(dom);
      this.isRunning = false;
    }
  }

  on(dom) {
    
  }
  off(dom) {
    
  }

}

