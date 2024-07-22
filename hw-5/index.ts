abstract class Vehicle {
  constructor(public brand: string) {}
  abstract getType(): string;
}

class Car extends Vehicle {
  constructor(brand: string, public seats: number) {
    super(brand);
  }

  getType(): string {
    return "car";
  }

  performAction(): string {
    return `Car ${this.brand} with ${this.seats} seats is starting its engine.`
  }
}

class Truck extends Vehicle {
  constructor(brand: string, public capacity: number) {
    super(brand);
  }

  getType(): string {
    return "truck";
  }

  getAction(): string {
    return `Truck ${this.brand} with capacity ${this.capacity} kg is loading cargo.`
  }
}

class Motorcycle extends Vehicle {
  constructor(brand: string, public hasSidecar: boolean) {
    super(brand);
  }

  getType(): string {
    return "motorcycle";
  }

  action(): string {
    const sidecarStatus = this.hasSidecar ? "with" : "without";
    return `Motorcycle ${this.brand} ${sidecarStatus} sidecar is revving its engine.`
  }
}

class VehicleList {
  private vehicles: Vehicle[] = [];

  addVehicle(vehicle: Vehicle) {
    this.vehicles.push(vehicle);
    this.saveToLocalStorage();
  }

  performVehicleActions() // ? {
    // ?
    throw new Error(`Unhandled vehicle type: ${vehicle}`);
  }

  private saveToLocalStorage(): void {
    const vehiclesJSON = this.vehicles.map((vehicle) => ({
      type: vehicle.getType(),
      ...vehicle,
    }));
    localStorage.setItem("vehicles", JSON.stringify(vehiclesJSON));
  }

  private loadFromLocalStorage(): void {
    const vehiclesJSON = JSON.parse(localStorage.getItem("vehicles") || "[]");
    this.vehicles = // ?
  }

  private vehicleFromJSON() // ? {
    // ?
  }
}
