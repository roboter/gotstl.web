import { Component, OnInit } from '@angular/core';
import * as gProcessor from '@jwc/jscad-web';
// import * as Processor from '@jscad/processor-bare';

//gProcessor: any;

//declare const gProcessor: any;

@Component({
  selector: 'app-openjscad',
  templateUrl: './openjscad.component.html',
  styleUrls: ['./openjscad.component.css'],
})
export class OpenjscadComponent implements OnInit {
  public gProcessor = null;
  constructor() {}
  ngOnInit(): void {
    const viewerDiv = document.getElementById('viewerContext');
    const parameterstable = document.getElementById('parameterstable');
    viewerDiv.setAttribute('design-url', 'assets/examples/echo.jscad');

    //  if (parameterstable === null) {
    const element = document.createElement('button');
    element.innerHTML = 'Update';
    element.id = 'updateButton';

    element.onclick = function (e) {
      //this.gProcessor.rebuildSolid();
    };
    parameterstable.appendChild(element);

    // gProcessor.Processor.prototype.setStatus = function (e, e1) {
    //   console.table(e);
    //   console.table(e1);
    // };

    // gProcessor.setStatus = function (e, e1) {
    //   console.table(e);
    //   console.table(e1);
    // };

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
          console.table(e);
          console.table(e1);
        },
        createParamControls: () => {
          console.log('createParamControls');
        },
        parameterstable: parameterstable,
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
}
