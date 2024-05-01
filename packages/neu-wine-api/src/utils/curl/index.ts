import { os, events } from '@neutralinojs/lib';

export class NeutralinoCurl {
  private debug: boolean;
  private progress: number;
  private httpHeaders: Array<string>;
  private appResourcesEXT: string;
  private auth: { usr: string; pwd: string };

  constructor(opt: { debug?: boolean } = {}) {
    //
    // Constructor

    this.debug = opt.debug || false;

    this.progress = 0; // Current progress
    this.httpHeaders = []; // List of HTTP headers

    this.appResourcesEXT = NL_PATH + '/extensions'; // App BIN resources
    if (NL_OS === 'Windows') {
      this.appResourcesEXT = NL_CWD + '/extensions';
    }

    // Auth credentials
    //
    this.auth = {
      usr: '',
      pwd: '',
    };
  }

  setCredentials(usr: string, pwd: string) {
    //
    // Set credentials for e.g. FTP

    this.auth.usr = usr;
    this.auth.pwd = pwd;
  }
  addHttpHeader(key: string, value: string) {
    //
    // Add a custom http-header

    let h = key + ': ' + value;
    this.httpHeaders.push(h);
  }
  clearHttpHeader() {
    //
    // Clears http-header list.

    this.httpHeaders = [];
  }

  async get(url: string) {
    let httpHeader = '';
    if (this.httpHeaders.length > 0) {
      this.httpHeaders.map((h) => {
        httpHeader += `-H "${h}" `;
      });
      console.log(httpHeader);
    }
    return await this.run(`-k ${httpHeader} ` + url);
  }

  async post(url: string, data: string) {
    let httpHeader = '';
    if (this.httpHeaders.length > 0) {
      this.httpHeaders.map((h) => {
        httpHeader += `-H "${h}" `;
      });
      console.log(httpHeader);
    }
    let d = JSON.stringify(data);
    return await this.run(`-k ${httpHeader} --request POST ${url} -d ${d}`);
  }

  async download(src: string, dst = '') {
    //
    // Download via http, ftp or ftps

    let auth = this.auth.usr + ':' + this.auth.pwd;

    let ftpSSL = '';
    if (src.includes('ftps://')) {
      ftpSSL = '--ftp-ssl';
    }

    let httpHeader = '';
    if (this.httpHeaders.length > 0) {
      this.httpHeaders.map((h) => {
        httpHeader += `-H "${h}" `;
      });
      console.log(httpHeader);
    }

    if (src.includes('http://') || src.includes('https://')) {
      if (dst === '') {
        await this.run(`--progress-bar ${httpHeader} -L -k -O ${src}`);
      } else {
        // Download as
        await this.run(`--progress-bar ${httpHeader} -L -k -o ${dst} ${src}`);
      }
    }

    if (src.includes('ftp://') || src.includes('ftps://')) {
      if (dst === '') {
        await this.run(`--progress-bar -k ${ftpSSL} -u ${auth} -O ${src}`);
      } else {
        // Download as
        await this.run(
          `--progress-bar -k ${ftpSSL} -u ${auth} -o ${dst} ${src}`,
        );
      }
    }
  }
  async upload(src: string, dst: Array<string>) {
    //
    // Upload via http, ftp or ftps

    let auth = this.auth.usr + ':' + this.auth.pwd;

    let ftpSSL = '';
    if (src.includes('ftps://')) {
      ftpSSL = '--ftp-ssl';
    }

    let httpHeader = '';
    if (this.httpHeaders.length > 0) {
      this.httpHeaders.map((h) => {
        httpHeader += `-H "${h}" `;
      });
      console.log(httpHeader);
    }

    if (dst.includes('http://') || dst.includes('https://')) {
      await this.run(`--progress-bar -k ${httpHeader} -F file=@${src} ${dst}`);
    }
    if (dst.includes('ftp://') || dst.includes('ftps://')) {
      await this.run(`--progress-bar -k ${ftpSSL} -u ${auth} -T ${src} ${dst}`);
    }
  }
  async run(args: string) {
    //
    // Run curl with any argument

    let eStart = new Event('curlStart');
    const architectures: { [key: string]: string } = {
      x64: 'macos-x64',
      arm: 'macos-arm64',
    };
    document.dispatchEvent(eStart);

    let cmd = await os.spawnProcess(
      this.appResourcesEXT + `/${architectures[NL_ARCH]}/bin/curl ${args}`,
    );

    return new Promise((resolve, reject) => {
      events.on('spawnedProcess', (e) => {
        if (cmd.id == e.detail.id) {
          switch (e.detail.action) {
            case 'stdOut':
              let eData = new CustomEvent('curlData', {
                detail: e.detail.data,
              });
              document.dispatchEvent(eData);
              break;
            case 'stdErr':
              const m = e.detail.data.match(/\d+\.\d+/);
              if (m !== null && parseFloat(m[0]) >= this.progress) {
                this.progress = parseFloat(m[0]);
                if (this.debug) {
                  console.log('Curl progress in percent: ' + m[0]);
                }
                let eProgress = new CustomEvent('curlProgress', {
                  detail: Math.round(parseFloat(m[0])),
                });
                document.dispatchEvent(eProgress);
              }
              break;
            case 'exit':
              if (this.debug) {
                console.log(`Curl terminated with exit code: ${e.detail.data}`);
              }
              if (e.detail.data == 0) {
                let eProgress = new CustomEvent('curlProgress', {
                  detail: 100.0,
                });
                document.dispatchEvent(eProgress);
              }
              let eEnd = new CustomEvent('curlEnd', {
                detail: parseInt(e.detail.data),
              });
              document.dispatchEvent(eEnd);

              e.detail.data == 0 && resolve(undefined);
              e.detail.data != 0 && reject(undefined);

              break;
          }
        }
      });
    });
  }
  async resetProgress() {
    //
    // Reset progress-counter and emit curlProgress event.

    this.progress = 0.0;
    let eProgress = new CustomEvent('curlProgress', { detail: 0.0 });
    document.dispatchEvent(eProgress);
  }
}
