# Fridge-Temperature Data Processor

This is a program that can be run from the command line that outputs the average, median and mode temperature for fridges in a supermarket given some raw data input.

## Assumptions and Design Decisions

- This program needs to handle huge amount of data. As a result, ```fs.readFile``` will not be able to meet this requirement. There needs to be a way to lazy load the input file. Stream comes to mind and I have used ```highland.js``` to achieve this. It provides quite a nice API to treat streams like array, much nicer compared to nodejs native ```fs``` and ```stream``` modules.
- Limited use of external dependencies. I would have used ```lodash/fp``` for most functions under ```lib/utils```
- This program runs daily. Data output is not dependant on data from previous days.
- Numerical accuracy: this program might produce rounding errors eg. 1.01 instead of 1.02.
- I try to write code in a functional pattern, functions are pure and data is immutable. Side effects like I/O operations should be separated (live in index.js) from most business logic.


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need node js (with npm) installed on your machine to run this application. This is programmed in v8.9.4. Previous versions have not yet been tested yet.

### Installing

```
npm install
```

### Running the application

You can run the application by running ```npm start path_to_your_json_file```. To quickly start this application, you can run the following command with an example data.json included in this project.

```
npm start data.json
```

Or another (big) file in this project like

```
npm start big.json
```

You will then get an ```output.json``` file with the results that you can open and inspect.

## Running the tests

```
npm test
```

## Further improvements with more time

- Validations like handling empty file, corrupted data etc.
- Error handling
- Handle numerical calculations using npm module like big decimal