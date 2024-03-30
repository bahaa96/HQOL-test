# HQOLTest

### Currently Covered Features
* Listing ALL Profiles
* View Profile details

In addition to the packages mentioned at the task, I decided to try Flowbite for the UI.

### Data Flow Breakdown

Starting from the Profile Domain which should declare a global scope unified Type covers all the possible forms of Profile as an Entity. Network layer rely on the Profile domain alongside fully typed properties structs each network call input and output to match the BE documentation and Domain models getting everything ready to be fetched from a service upon action. Each service handles all the state management of the page leaving components to only be representational and to handle component-level data.

Regarding my coverage of the task requirements I decided to focus on one topic adding some cool stuff to it like handling race condition and adding cache invalidation on Profile delete.

![Architecture Breakdown](https://i.ibb.co/PcdPXWB/Screenshot-2024-03-30-at-11-35-32-PM.png "Architecture Breakdown")

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

