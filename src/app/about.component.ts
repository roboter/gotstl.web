import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],

  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  // Example data for the component
  examples = [
    {
      id: 'example001',
      title: 'Sphere With Three Cutouts',
      description: 'Start with a sphere, subtract three rotated cylinders, and inspect how CSG removes material.',
      tag: 'example001.jscad',
      image: 'assets/examples/example001.png'
    },
    {
      id: 'example002',
      title: 'Union, Difference, Intersection',
      description: 'A compact demonstration of nested boolean operations using cubes and a tapered cylinder.',
      tag: 'example002.jscad',
      image: 'assets/examples/example002.png'
    },
    {
      id: 'example003',
      title: 'Cross-Shaped Solid',
      description: 'Combine centered boxes into a balanced solid, then carve channels from each axis.',
      tag: 'example003.jscad',
      image: 'assets/examples/example003.png'
    },
    {
      id: 'example004',
      title: 'Cube Minus Sphere',
      description: 'The simplest subtractive form: a centered cube with a rounded volume removed from it.',
      tag: 'example004.jscad',
      image: 'assets/examples/example004.png'
    },
    {
      id: 'example005',
      title: 'Looped Cylinder Pattern',
      description: 'Use a loop to place repeated cylinders around a circular body, then combine them into a larger assembly.',
      tag: 'example005.jscad',
      image: 'assets/examples/example005.png'
    }
  ];

  resources = [
    {
      name: 'Official JSCAD Website',
      url: 'https://openjscad.xyz/',
      description: 'The main hub for OpenJSCAD versions, docs, and news.'
    },
    {
      name: 'OpenJSCAD Wikibooks Guide',
      url: 'https://en.wikibooks.org/wiki/OpenJSCAD_User_Guide#OpenJSCAD_Programming_Guide',
      description: 'A user and programming guide covering workflows, primitives, transforms, and projects.'
    },
    {
      name: 'OpenJSCAD Wiki & Source Code',
      url: 'https://github.com/jscad/OpenJSCAD.org/wiki',
      description: 'Access the community wiki, release timelines, and core repository.'
    },
    {
      name: 'OpenJSCAD User Forum',
      url: 'https://www.openjscad.xyz/forum.html',
      description: 'Ask questions, share designs, and connect with other parametric modelers.'
    }
  ];

  constructor(private router: Router) { }

  openInEditor(exampleId: string, fileName: string, name: string): void {
    const example = this.examples.find(e => e.id === exampleId);
    this.router.navigate(['/product/0'], {
      queryParams: {
        file: `assets/examples/${fileName}`,
        name: name,
        description: example ? example.description : ''
      }
    });
  }
}