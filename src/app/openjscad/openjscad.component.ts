import { Component, OnInit } from '@angular/core';
import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl,
} from '@angular/platform-browser';
import * as gProcessor from '@jwc/jscad-web';
@Component({
  selector: 'app-openjscad',
  templateUrl: './openjscad.component.html',
  styleUrls: ['./openjscad.component.css'],
})
export class OpenjscadComponent implements OnInit {
  public gProcessor = null;
  sanitizedURL: SafeResourceUrl;
  public outputFile: any;
  constructor(private sanitizer: DomSanitizer) {}

  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  ngOnInit(): void {
    const viewerDiv = document.getElementById('viewerContext');
    const parameterstable = document.getElementById('parameterstable');
    const formatDropdown = document.getElementById('formatDropdown');
    viewerDiv.setAttribute('design-url', 'assets/examples/gear.jscad');

    this.gProcessor = new gProcessor(viewerDiv, {
      viewerwidth: '100%',
      viewerheight: '100%',
      drawLines: true,
      drawFaces: true,
      processor: {
        viewerdiv: viewerDiv,
        setStatus: (e, e1) => {
          console.table(e);
          console.table(e1);
        },
        onUpdate: (e, e1) => {
          if (e.outputFile) {
            this.outputFile = e.outputFile.data;
          }
          console.table(e);
          console.table(e1);
        },
        createParamControls: () => {
          console.log('createParamControls');
        },
        parameterstable: parameterstable,
        formatDropdown: formatDropdown,
        selectedFormatInfo: function selectedFormatInfo() {
          return this.formatInfo('stl');
        },
        ondownload(t) {
          console.table(t);
        },
      },
      init: {
        onUpdate: (e, e1) => {
          console.table(e);
          console.table(e1);
        },
        setStatus: (e, e1) => {
          console.table(e);
          console.table(e1);
        },
      },
    });
  }

  onUpdate() {
    // this.gProcessor.setJsCad(this.product.code);
    this.gProcessor.rebuildSolids();
  }

  generateOutputFile() {
    this.gProcessor.generateOutputFile({
      name: 'stl',
      displayName: 'STL (Binary)',
      description: 'STereoLithography, Binary',
      extension: 'stl',
      mimetype: 'application/sla',
      convertCSG: true,
      convertCAG: false,
    });
  }
}
