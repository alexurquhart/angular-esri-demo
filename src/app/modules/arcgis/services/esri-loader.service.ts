import { Injectable } from '@angular/core';

@Injectable()
export class EsriLoaderService {

  private apiUrl = 'https://js.arcgis.com/4.5/';
  private cssUrl = 'https://js.arcgis.com/4.5/esri/css/main.css';

  // Bootstrap the API
  public bootstrap(jsUrl: string, cssUrl: string) {
    // Check and see if already bootstrapped
    if (this.cssBootstrapped() || this.jsBootstrapped()) {
      throw new Error('Esri Loader Service Error: Bootstrapping process already started');
    }

    // Now all subsequent calls to require() will use the specified URL's
    this.apiUrl = jsUrl;
    this.cssUrl = cssUrl;

    // Load
    this.loadCss();
    this.loadJs();
  }

  public require(...modules: string[]): Promise<any> {
    return new Promise((resolve, reject) => {
      Promise.all([this.loadJs(), this.loadCss()]).then((results: any[]) => {
        const require = results[0];
        require(modules, (...loadedModules: any[]) => {
          resolve(loadedModules);
        });
      });
    });
  }

  private loadCss(): Promise<void> {
    return new Promise<void>((resolve) => {
      // Check to see if the CSS is already added/loaded
      const cssNode = document.querySelector(`link[href='${this.cssUrl}']`);
      if (cssNode) {
        cssNode.addEventListener('load', () => resolve());
        return;
      }

      // Add the node if it's not already in the DOM
      const newCss = document.createElement('link');
      newCss.rel = 'stylesheet';
      newCss.href = this.cssUrl;
      newCss.dataset.esriLoaderService = 'true';
      newCss.addEventListener('load', () => resolve());
      document.head.appendChild(newCss);
    });
  }

  private cssBootstrapped(): boolean {
    return document.querySelector('link[data-esr-loader-service="true"]') !== null;
  }

  private jsBootstrapped(): boolean {
    return document.querySelector('link[data-esr-loader-service="true"]') !== null;
  }

  private loadJs(): Promise<Function> {
    return new Promise((resolve) => {

      if (window['require'] !== undefined) {
        resolve(window['require']);
        return;
      }

      const onLoad = () => {
        resolve(window['require']);
      };

      const script = document.querySelector(`script[src='${this.apiUrl}']`);
      if (script) {
        script.addEventListener('load', onLoad);
        return;
      }

      const newScript = document.createElement('script');
      newScript.type = 'text/javascript';
      newScript.dataset.esriLoaderService = 'true';
      newScript.src = this.apiUrl;
      newScript.addEventListener('load', onLoad);

      document.body.appendChild(newScript);
    });
  }
}
