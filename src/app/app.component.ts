import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  score = 0;
  clicks = 0;
  energy = 0;
  tubes = 0;
  vacuum: string[] = [];
  showTubeInfo = false;

  crank_images = [
    '/assets/crank.png',
    '/assets/crank2.png',
    '/assets/crank3.png',
    '/assets/crank4.png'
  ];
  currentIndex = 0;

  get currentImage() {
    return this.crank_images[this.currentIndex];
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.crank_images.length;
  }
  ngOnInit() {
    const score = localStorage.getItem('score');
    if (score !== null) {
      this.score = parseInt(score, 10);
    }

    const energy = localStorage.getItem('energy');
    if (energy !== null) {
      this.energy = parseInt(energy, 10);
    }

    const tubes = localStorage.getItem('tubes');
    if (tubes !== null) {
      this.tubes = parseInt(tubes, 10);
    }

    setInterval(() => {
      this.energy += this.tubes;
      localStorage.setItem('energy', this.energy.toString());
    }, 1000);
  }
  incrementClicks() {
    this.clicks++;
    this.energyCount();
    if (this.clicks === 4) {
      this.incrementScore();

      this.clicks = 0;
    }
  }

  reset() {
    this.score = 0;
    localStorage.removeItem('score');
    this.energy = 0;
    localStorage.removeItem('energy');
    this.tubes = 0;
    localStorage.removeItem('tubes');
  }

  incrementScore() {
    this.score++;
    if (this.tubes > 0){
      this.vacuumTubes;
    }
    if (this.score >= 10) {
      this.showTubeInfo = true;
    }
    localStorage.setItem('score', this.score.toString());
}

  vacuumTubes(){
    //this.tubes += this.energy;

    localStorage.setItem('tubes', this.tubes.toString());
  }

  energyCount() {
  this.energy++;
  if (this.energy >= 40) {
    
  }
  localStorage.setItem('energy', this.energy.toString());
}

addTube() {
  if (this.energy >= 40) {
    this.tubes++;
    this.vacuum.push('/assets/vacuum_tube.png');
    this.energy -= 40;
    localStorage.setItem('tubes', this.tubes.toString());
    localStorage.setItem('energy', this.energy.toString());
  }
}

}