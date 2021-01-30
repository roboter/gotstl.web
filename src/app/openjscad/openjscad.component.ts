import { Component, OnInit } from '@angular/core';
import * as gProcessor from '@jscad/web';

@Component({
  selector: 'app-openjscad',
  templateUrl: './openjscad.component.html',
  styleUrls: ['./openjscad.component.css'],
})
export class OpenjscadComponent implements OnInit {
  public gProcessor = null;
  constructor() {}
  windows: any = window;
  ngOnInit(): void {
    const viewerDiv = document.getElementById('viewerContext');
    viewerDiv.setAttribute('design-url', 'assets/examples/logo.jscad');
    this.gProcessor = new gProcessor(viewerDiv, {
      viewerwidth: '100%',
      viewerheight: '100%',
      drawLines: true,
      drawFaces: true,
      processor: {
        viewerdiv: viewerDiv,
      },
      init: {
        onUpdate: (e, e1) => {
          console.table(e);
          console.table(e1);
        },
      },
    });
  }
}
