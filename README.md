# wcm-eventhandler-module

This module gives you the opportunity to map WCM internal events to the Digipolis eventhandler.

## Prerequisites
 - A running implementation of the Pelorus CMS (WCM) is needed either locally or on a server.
 (see https://github.com/hvperdrive/pelorus-cms)
 - Node needs to be installed on the system.
 (see https://nodejs.org)
 - Gulp needs to be installed globally on the system (npm i gulp -g).

## How to install
1. Clone or download the zip of this repository.
2. Run "npm install" in the main folder directory.
3. Run "gulp build" in the main folder directory.
4. Upload the zip created by previous steps (located in the "dist" folder).

## Usage

### API
There is no public API available.

### Implementation

#### Setting up
1. Add all the required settings  
    1.1. Go to modules  
    1.2. Edit the dig-events module  
    1.3. Under __Variables__ open __Config__  
    1.4. Enter data for all available fields  
    1.5. Save the module  
2. The menu option __Events__ should have been added if everything went correctly
3. Map an internal event to an Event handler Topic  
    3.1. Click on __New Event__.  
    3.2. Add an  __administration name__ (will only be used to name the setup)  
    3.3. Select the wcm event group in __Source__  
    3.4. Click on __Add Event__ to map an event of the source to a topic  
    3.5 Save the event.

## Module development

Please read the following on how to work with WCM modules before changing anything to this repo.

[Modules manual](https://github.com/hvperdrive/pelorus-cms/blob/develop/readmes/modules.md)
