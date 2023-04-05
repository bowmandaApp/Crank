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
  transformer = 0;
  transformerUpgrade = 1;
  pamphlets = 0;
  paper = 0;
  ink = 0;
  printerUpgrade = 1;
  money = 0.00;
  printerProfit = 0.00;
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
  showPrinterInfo = false;
  ownPrinter = false;
  startPrinting = false;
  ownTransformer = false;
  startTransforming = false;
  showTransformer = false;


  crank_images = [
    'assets/crank.png',
    'assets/crank2.png',
    'assets/crank3.png',
    'assets/crank4.png'
  ];
  currentIndex = 0;

  get currentImage() {
    return this.crank_images[this.currentIndex];
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.crank_images.length;
  }

  flywheel_images = [
    'assets/flywheel1.png',
    'assets/flywheel.gif',
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
        this.vacuum.push('assets/vacuum_tube.png');
      }
    }

    const transistor = localStorage.getItem('transistor');
    if (transistor !== null) {
      this.transistor = parseInt(transistor, 10);
      if (this.transistor > 0) {
        this.showTransInfo = true;
      }
      for (let i = 0; i < this.transistor; i++) {
        this.trans.push('assets/transistor.png');
      }
    }


    const coils = localStorage.getItem('copperCoils');
    if (coils !== null) {
      this.copperCoils = parseInt(coils, 10);
      if (this.copperCoils > 0) {
        this.showMachines = true;
      }
      for (let i = 0; i < this.copperCoils; i++) {
        this.coils.push('assets/coils.png');
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

    const ownPrinter = localStorage.getItem('ownPrinter');
    if (ownPrinter !== null) {
      this.ownPrinter = JSON.parse(ownPrinter);
    }

    const pamphlets = localStorage.getItem('pamphlets');
    if (pamphlets !== null) {
      this.pamphlets = JSON.parse(pamphlets);
    }
    const printerUpgrade = localStorage.getItem('printerUpgrade');
    if (printerUpgrade !== null) {
      this.printerUpgrade = parseFloat(printerUpgrade);
    }

    const paper = localStorage.getItem('paper');
    if (paper !== null) {
      this.paper = JSON.parse(paper);
    }

    const ink = localStorage.getItem('ink');
    if (ink !== null) {
      this.ink = JSON.parse(ink);
    }

    const ownTransformer = localStorage.getItem('ownTransformer');
    if (ownTransformer !== null) {
      this.ownTransformer = JSON.parse(ownTransformer);
    }

    const transformerUpgrade = localStorage.getItem('transformerUpgrade');
    if (transformerUpgrade !== null) {
      this.transformerUpgrade = parseFloat(transformerUpgrade);
    }

    const transformer = localStorage.getItem('transformer');
    if (transformer !== null) {
      this.ink = JSON.parse(transformer);
    }

    const printerProfit = localStorage.getItem('printerProfit');
    if (printerProfit !== null) {
      this.printerProfit = JSON.parse(printerProfit);
    }

    setInterval(() => {

      for (let i = 0; i < this.tubes; i++) {
        this.energy++;
      }

      for (let i = 0; i < this.transistor; i++) {
        this.energy += 12;
      }

      if (this.ownPrinter == true && this.pamphlets > 0) {
        this.sellPamphlets();
      }
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
    this.paper = 0;
    localStorage.removeItem('paper');
    this.ink = 0;
    localStorage.removeItem('ink');
    this.pamphlets = 0;
    localStorage.removeItem('pamphlets');
    this.vacuum = [];
    this.transistor = 0;
    localStorage.removeItem('transistor');
    this.trans = [];
    this.copperCoils = 0;
    localStorage.removeItem('copperCoils');
    this.coils = [];
    this.flywheel = 0;
    this.flywheelUpgrade = 1;
    localStorage.removeItem('flywheelUpgrade');
    this.showTubeInfo = false;
    this.showMachines = false;
    this.showTransInfo = false;
    this.showFlywheelInfo = false;
    this.showTransformer = false;
    this.ownFlywheel = false;
    this.showPrinterInfo = false;
    this.printerEnabled = false;
    this.ownPrinter = false;
    this.printerUpgrade = 1;
    localStorage.removeItem('printerUpgrade');
    localStorage.removeItem('printerProfit');
    this.ownTransformer = false;
    this.transformerEnabled= false;
    this.transformerUpgrade = 1;
    localStorage.removeItem('transformerUpgrade');
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
    if (this.score >= 50) {
      this.showTransInfo = true;
    }
    if (this.score >= 100) {
      this.showFlywheelInfo = true;
    }
    if (this.flywheel >= 500) {
      this.showTransformer = true;
    }
    if (this.score >= 200 && this.flywheel >= 250) {
      this.showMachines = true;
    }

    if (this.score >= 700 && this.flywheel >= 1000) {
      this.showPrinterInfo = true;
    }
    localStorage.setItem('score', this.score.toString());
  }

  vacuumTubes() {
    this.tubes += this.energy;
    this.vacuum.push('assets/vacuum_tube.png');
    localStorage.setItem('tubes', this.tubes.toString());
  }

  transistors() {
    this.transistor += this.energy;
    this.trans.push('assets/transistor.png');
    localStorage.setItem('transistor', this.transistor.toString());
  }

  copperWireCoils() {
    this.copperCoils += this.energy;
    this.flywheel -= 5 * this.copperCoils;
    this.coils.push('assets/coils.png');
    localStorage.setItem('copperCoils', this.copperCoils.toString());
  }

  energyCount() {
    if (this.copperCoils > 0) {
      this.energy += this.copperCoils * 2;
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
      this.vacuum.push('assets/vacuum_tube.png');
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
      this.trans.push('assets/transistor.png');
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
      this.coils.push('assets/coils.png');
      this.energy -= 250;
      this.money -= 50.00;

      localStorage.setItem('copperCoils', this.copperCoils.toString());

    }
  }

  sellEnergy() {
    this.money += this.energy * 0.05;
    this.energy = 0;
    localStorage.setItem('money', this.money.toString());
  }

  buyFlywheel() {
    this.money -= 5;
    this.ownFlywheel = true;
    localStorage.setItem('ownFlywheel', 'true');
  }

  upgradeFlywheel() {
    if (this.flywheelUpgrade < 1) {
      this.flywheelUpgrade = 1;
    }
    if ((this.energy > 100 * this.flywheelUpgrade) && (this.money >= 10 * this.flywheelUpgrade)) {
      this.energy -= 100 * this.flywheelUpgrade;
      this.money -= 10 * this.flywheelUpgrade;
      this.flywheelUpgrade++;
      localStorage.setItem('flywheelUpgrade', this.flywheelUpgrade.toString());
    }
  }
  chargeFlywheel() {
    if (this.energy > 5 * this.flywheelUpgrade && this.loopEnabled == true) {
      this.score++;
      this.energy -= 5 * this.flywheelUpgrade;
      this.flywheel += 5 * this.flywheelUpgrade;
      localStorage.setItem('flywheel', this.flywheel.toString());
    }
  }

  buyPrinter() {
    if(this.money > 500){
    this.money -= 500;
    this.ownPrinter = true;
    localStorage.setItem('ownPrinter', 'true');
    }
  }

  upgradePrinter() {
    if (this.printerUpgrade < 1) {
      this.printerUpgrade = 1;
    }
    if ((this.money > 500 * this.printerUpgrade) && (this.energy >= 1000 * this.printerUpgrade)) {
      this.energy -= 1000 * this.printerUpgrade;
      this.money -= 500 * this.printerUpgrade;
      this.printerUpgrade++;
      localStorage.setItem('PrinterUpgrade', this.printerUpgrade.toString());
    }
  }
  runPrinter() {
    if (this.flywheel > 100 * this.printerUpgrade && this.printerEnabled == true && this.paper > 9 && this.ink > 1) {
      this.score++;
      this.paper -= 10 * this.printerUpgrade;
      this.ink -= 2 * this.printerUpgrade;
      this.pamphlets += 10 * this.printerUpgrade;
      localStorage.setItem('pamphlets', this.pamphlets.toString());
      localStorage.setItem('ink', this.ink.toString());
      localStorage.setItem('paper', this.paper.toString());
    }
  }


  printerEnabled: boolean = false;

  togglePrinter() {
    this.printerEnabled = !this.printerEnabled;
    this.startPrinting = true;
    if (this.printerEnabled) {
      this.startPrinter();
    } else {
      this.stopPrinter();
    }
  }


  startPrinter() {
    setInterval(() => {
      this.runPrinter();
      this.flywheel -= 500;
    }, 5000);

  }
  stopPrinter() {
    this.startPrinting = false;
    setInterval(() => {
    }, 0);

  }

  buyPaper() {
    if (this.money > 19.99) {
      this.paper += 100;
      this.money -= 19.99;
      localStorage.setItem('paper', this.paper.toString());
    }
  }
  buyInk() {
    if (this.money > 29.99) {
      this.money -= 29.99;
      this.ink += 20;
      localStorage.setItem('ink', this.ink.toString());
    }
  }

  sellPamphlets() {
    this.pamphlets -= 1;
    this.money += 0.50;
    this.printerProfit += 0.50; 
    localStorage.setItem('printerProfit', this.printerProfit.toString());
    localStorage.setItem('pamphlets', this.pamphlets.toString());
  }

  transformerEnabled: boolean = false;

  toggleTransformer() {
    this.transformerEnabled = !this.transformerEnabled;
    this.startTransforming = true;
    if (this.transformerEnabled) {
      this.startTransformer();
    } else {
      this.stopTransformer();
    }
  }

  startTransformer() {
    setInterval(() => {
      this.runTransformer();
    }, 1000);

  }
  stopTransformer() {
    this.startTransforming= false;
    setInterval(() => {
    }, 0);

  }

  buyTransformer() {
    if (this.money > 30){
    this.money -= 30;
    this.ownTransformer = true;
    localStorage.setItem('ownTransformer', 'true');
    }
  }

  upgradeTransformer() {
    if (this.transformerUpgrade < 1) {
      this.transformerUpgrade = 1;
    }
    if ((this.money > 25 * this.transformerUpgrade) && (this.energy >= 100 * this.transformerUpgrade)) {
      this.energy -= 100 * this.transformerUpgrade;
      this.money -= 25 * this.transformerUpgrade;
      this.transformerUpgrade++;
      localStorage.setItem('PrinterUpgrade', this.transformerUpgrade.toString());
    }
  }
  runTransformer() {
    if (this.flywheel > 2 * this.transformerUpgrade && this.transformerEnabled == true) {
      this.score++;
      this.flywheel -= 2 * this.transformerUpgrade;
      this.transformer += 2 * this.transformerUpgrade;
      this.money += 2 * this.transformerUpgrade;
      localStorage.setItem('flywheel', this.flywheel.toString());
      localStorage.setItem('transformer', this.transformer.toString());
      localStorage.setItem('money', this.money.toString());
    }
  }
}

