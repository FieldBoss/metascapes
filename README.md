![image info](./img/metascapes.jpg)
Table of Contents
1.  [What Is MetaScapes](#what-is-metascapes)
2.  [What Is A Composite NFT](#what-is-a-composite-nft)
3.  [Getting Started](#getting-started)
4.  [How MetaScapes Works](#how-metascapes-works)
5.  [Navigating the UI](#navigating-the-ui)
6.  [Built With](#built-with)
7.  [Roadmap](#roadmap)
8.  [Contact](#contact)

What Is MetaScapes
-----------------
_**MetaScapes**_ is a mapping application that merges blockchain technology with popular open source GIS mapping tools through the use of geo-located XRPL NFTs. With FieldBoss, GIS applications are extended to include the real-time tokenization of 2d/3d unique geometries collected by field crews. By combining the analytical power of GIS (assets represented spatially) with the transparency, immutability, and security of blockchain technology we can show the spatial and temporal distribution of information which is securely stored on blockchain and distributed file systems.

What Is A Composite NFT
-------------------------

GeoJSON is an open standard format (based on JSON format) designed for representing geographical features (geometries), along with their non-spatial attributes. The features include points, lines, polygons, and multi-part collections. A geo-located NFT contains spatial geometries stored in the XRP Ledger as GeoJSON. The data describing the NFT is stored as related metadata in a distributed file system. As a result, an NFT's location can be derived and plotted onto a map and non-spatial attributes assigned to the location.

Geo-located XRPL NFTs adhere to the GeoJSON spatial data standard recognized by most GIS mapping applications which provides interoperability between FieldBoss and GIS.

Getting Started
---------------

The _**MetaScapes**_ application has been deployed on AWS as a web service available to all. No installation or configuration is required. This web service application serves as a demo and is designed to be a 'sandbox' that can be used to demonstrate the functionality of MetaScapes.

*   Supported Browsers:
    *   Chrome
    *   Brave
    *   FireFox
    *   Edge
    *   Not formatted for mobile phones


How MetaScapes Works
--------------------

The application UI is divided into 3 interacting components including the navigation bar, data form, and interactive map. Following is a description of how to use the tools within each component:

1.  **Navigation Bar -** Across the top is the navigation bar which has several useful tools:

*   Download GeoJSON - User can download all data from XRP Ledger and Ceramic for the current account into GeoJSON format which can be easily imported into desktop GIS applications
*   User Guide - Background and instructions for the FieldBoss application
*   Location - User can paste lat/long coordinates into the box to zoom map to that location or click the location button to zoom the map to the user's current location.
*   Login - Currently disabled

3.  **Data Form -** On the right side of the display, the data form allows the user to interact with the attribute data specific to the features shown on the map.

*   Form - The data form element displays the specific inspection details of a selected feature from the map. The form is read-only unless the user is adding a new feature or inspecting an existing one.
*   Camera - The camera element uses the current device's built-in camera to allow the user to take a photo while performing an inspection and write the image to the decentralized database. This functionalilty is currently disabled. The images that you may see when using the application are for demonstration only.
 
Navigating the UI
-----------------
![image info](./img/mouse-wheel.jpg)

To interactively display the 3d metaverse viewer refer to the above diagram.
    
    ([back to top](#top))
    

Built With
----------

*   [React](https://reactjs.org/) – a JavaScript library for building user interfaces
*   [Leaflet](https://leafletjs.com/) – a popular open source JavaScript library for building web mapping applications
*   [React Leaflet](https://react-leaflet.js.org/) - React components for Leaflet maps
*   [xrpl.js](https://xrpl.org/) - Javascript library for integrating an app with the XRP Ledger,
*   XRP Ledger([https://testnet.xrpl.org](https://testnet.xrpl.org/) - Testnet Data)
*   [Ceramic](https://ceramic.network/) - a decentralized data network for Web3 applications
*   [Node.js](https://nodejs.org/en/) - a cross-platform JavaScript runtime environment

Roadmap
-------

*   Add integration with IoT data sources
*   Build mobile FieldBoss application using xrpl4j Java library
*   Develop standardized schemas and user interfaces for ease of deployment
*   Add integration with 3d scanned 'point clouds' and other big data
    
    ([back to top](#top))
    

Contact
-------

Scott Randolph - [blocklagoon@gmail.com](mailto:blocklagoon@gmail.com)

LinkedIn - [https://www.linkedin.com/in/scott-randolph-2a4948236/](https://www.linkedin.com/in/scott-randolph-2a4948236/)

([back to top](#top))
