import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
    <div class="content-container">
      <div class="content-title-group not-found">
        <h2 class="title">GotSTL</h2>
        <p>
          This project was created to help represent a OpenJSCAD.
        </p>
        <br />
        <h2 class="title">Resources</h2>
        <ul>
          <li>
          <a href="http://openjscad.azurewebsites.net/">OpenJSCAD</a>
          </li>
        </ul>
      </div>
    </div>
  `,
})
export class AboutComponent {}
