import { Component } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  title(title: any) {
    throw new Error('Method not implemented.');
  }
  score = 0;
  clicks = 0;
  energy = 0;
  tubes = 0;
  transistor = 0;
  flywheel = 0;
  flywheelUpgrade = 1;
  money = 0.00;
  copperCoils = 0;
  tubeVal: number[] = [];
  vacuum: string[] = [];
  trans: string[] = [];
  coils: string[] = [];
  showTubeInfo = false;
  showTransInfo = true;
  showFlywheelInfo = false;
  ownFlywheel = false;
  lockFlywheel = false;
  startFlywheel = false;
  showMachines = false;

  crank_images = [
    '../src/assets/crank.png',
    '../src/assets/crank2.png',
    '../src/assets/crank3.png',
    '../src/assets/crank4.png'
  ];
  currentIndex = 0;

  get currentImage() {
    return this.crank_images[this.currentIndex];
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.crank_images.length;
  }

  flywheel_images = [
    '../src/assets/flywheel1.png',
    '../src/assets/flywheel.gif',
  ];
  currentFlyIndex = 0;

  loopEnabled: boolean = false;

  toggleLoop() {
    this.loopEnabled = !this.loopEnabled;
    this.startFlywheel = true;
    if (this.loopEnabled) {
      this.startLoop(); 
    } else {
      this.stopLoop();
    }
  }
  
  startLoop() {
      this.currentFlyIndex = 1;
   setInterval(() => {
    this.chargeFlywheel();
    }, 1000);
  }
  stopLoop() {
    this.startFlywheel = false;
    this.currentFlyIndex = 0;
    setInterval(() => {
      

    }, 0);
  }
  
  get currentFlyImage() {
    return this.flywheel_images[this.currentFlyIndex];
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

    const money = localStorage.getItem('money');
    if (money !== null) {
    this.money = parseFloat(money);
    }

    const tubes = localStorage.getItem('tubes');
    if (tubes !== null) {
      this.tubes = parseInt(tubes, 10);
      if (this.tubes > 0) {
        this.showTubeInfo = true;
      }
      for (let i = 0; i < this.tubes; i++) {
        this.vacuum.push('../src/assets/vacuum_tube.png');
      }
    }

    const transistor = localStorage.getItem('transistor');
    if (transistor !== null) {
      this.transistor = parseInt(transistor, 10);
      if (this.transistor > 0) {
        this.showTransInfo = true;
      }
      for (let i = 0; i < this.transistor; i++) {
        this.trans.push('../src/assets/transistor.png');
      }
    }

    
    const coils = localStorage.getItem('copperCoils');
if (coils !== null) {
  this.copperCoils = parseInt(coils, 10);
  if (this.copperCoils > 0) {
    this.showMachines = true;
  }
  for (let i = 0; i < this.copperCoils; i++) {
    this.coils.push('../src/assets/coils.png');
  }
}


    const ownFlywheel = localStorage.getItem('ownFlywheel');
    if (ownFlywheel !== null) {
      this.ownFlywheel = JSON.parse(ownFlywheel);
    }

    const flywheel = localStorage.getItem('flywheel');
    if (flywheel !== null) {
      this.flywheel = JSON.parse(flywheel);
    }
    const flywheelUpgrade = localStorage.getItem('flywheelUpgrade');
    if (flywheelUpgrade !== null) {
    this.flywheelUpgrade = parseFloat(flywheelUpgrade);
    }


    setInterval(() => {

      for (let i = 0; i < this.tubes; i++) {

        this.energy++;
      }

      for (let i = 0; i < this.transistor; i++) {

        this.energy += 10;
      }
      //this.energy += this.tubes;
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
    this.money = 0;
    localStorage.removeItem('money');
    this.tubes = 0;
    localStorage.removeItem('tubes');
    this.vacuum = [];
    this.transistor = 0;
    localStorage.removeItem('transistor');
    this.trans = [];
    this.copperCoils = 0;
    localStorage.removeItem('copperCoils');
    this.coils = [];
    this.flywheelUpgrade = 1;
    localStorage.removeItem('flywheelUpgrade');
    this.showTubeInfo = false;
    this.showMachines = false;
    this.showTransInfo = false;
    this.showFlywheelInfo = false;
    this.ownFlywheel = false;
  }

  incrementScore() {
    this.score++;
    if (this.tubes > 0) {
      this.vacuumTubes;
    }
    if (this.score >= 10) {
      this.showTubeInfo = true;
    }
    if (this.transistor > 0) {
      this.transistors;
    }
    if (this.score >= 50){
      this.showTransInfo = true;
    }
    if (this.score >= 100){
      this.showFlywheelInfo = true;
    }

    if (this.score >= 200 && this.flywheel >= 250){
      this.showMachines = true;
    }
    localStorage.setItem('score', this.score.toString());
  }

  vacuumTubes() {
    this.tubes += this.energy;
    this.vacuum.push('../src/assets/vacuum_tube.png');
    localStorage.setItem('tubes', this.tubes.toString());
  }

  transistors() {
    this.transistor += this.energy;
    this.trans.push('../src/assets/transistor.png');
    localStorage.setItem('transistor', this.transistor.toString());
  }

  copperWireCoils() {
    this.copperCoils += this.energy;
    this.flywheel -= 5*this.copperCoils;
    this.coils.push('../src/assets/coils.png');
    localStorage.setItem('copperCoils', this.copperCoils.toString());
  }

  energyCount() {
    if(this.copperCoils > 0){
    this.energy+= this.copperCoils * 2;
    } else {
      this.energy++;
    }
    localStorage.setItem('energy', this.energy.toString());
  }
  moneyCount() {
    localStorage.setItem('money', this.money.toString());
  }

  addTube() {
    if (this.energy >= 20 && this.money >= 5.00 && this.energy >= 40) {
      this.tubes++;
      this.vacuum.push('../src/assets/vacuum_tube.png');
      this.energy -= 20;
      this.money -= 5.00;
      localStorage.setItem('tubes', this.tubes.toString());
      localStorage.setItem('energy', this.energy.toString());
    }
  }
  removeTube(index: number) {
        this.vacuum.splice(index, 1);
  }

  addTrans() {
    if (this.tubes > 9 && this.money >= 15.00 && this.energy >= 100) {
      this.transistor++;
      this.trans.push('../src/assets/transistor.png');
      this.energy -= 100;
      this.tubes -= 10;
      this.money -= 15.00;
      for (let i = 0; i < 10; i++) {
        this.removeTube(this.tubes);
      }

    }
          localStorage.setItem('tubes', this.tubes.toString());
      localStorage.setItem('transistor', this.transistor.toString());
      localStorage.setItem('energy', this.energy.toString());
  }

  addCoils() {
    if (this.money >= 50.00 && this.energy >= 250) {
      this.copperCoils++;
      this.coils.push('../src/assets/coils.png');
      this.energy -= 100;
      this.money -= 50.00;

      localStorage.setItem('copperCoils', this.copperCoils.toString());

    }
  }

  sellEnergy(){
     this.money += this.energy * 0.05;
     this.energy = 0;
     localStorage.setItem('money', this.money.toString());
  }

  buyFlywheel(){
    this.money -= 5;
    this.ownFlywheel = true;
    localStorage.setItem('ownFlywheel', 'true');
  }

  upgradeFlywheel(){
    if (this.flywheelUpgrade < 1){
      this.flywheelUpgrade = 1;
    }
    if((this.energy > 100 * this.flywheelUpgrade) && (this.energy >= 100 * this.flywheelUpgrade)){
    this.energy -= 100 * this.flywheelUpgrade;
    this.money -= 100 * this.flywheelUpgrade;
    this.flywheelUpgrade++;
    localStorage.setItem('flywheelUpgrade', this.flywheelUpgrade.toString());
    }
  }
  chargeFlywheel(){
    if(this.energy > 5 * this.flywheelUpgrade &&  this.loopEnabled == true){
    this.score++;
    this.energy -= 5 * this.flywheelUpgrade;
    this.flywheel += 5 * this.flywheelUpgrade;
    localStorage.setItem('flywheel', this.flywheel.toString());
  }
  }
}