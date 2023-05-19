import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'cmp-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: []
})
export class ImageViewerComponent implements OnInit {

  display: boolean = false;
  width = '500px';
  title = '';
  pathImg = 'assets/images/no-img.jpg';

  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {

  }

  /**
   * Titulo del dialogo
   */
  setTitle(title: string): void {
    this.title = title;
  }

  /**
   * Open modal
   */
  show() {
    this.display = true;
    this.cdRef.detectChanges();
  }

  setImagen(url: string) {
    if (url) {
      this.pathImg = url;
    }
  }

  /**
   * Close modal
   */
  hide() {
    this.pathImg = null;
    this.pathImg = 'assets/images/no-img.jpg';
  }


}
