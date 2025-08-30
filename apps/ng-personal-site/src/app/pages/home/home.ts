import { Component } from '@angular/core';
import { Blog } from '../../components/blog/blog';

@Component({
  selector: 'app-home',
  imports: [Blog],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
