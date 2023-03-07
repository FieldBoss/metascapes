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

The project demo is built using React.js and consists of three main components including Mapbox 3d Viewer, XRPL.js, and Ceramic Network.  The application user is presented with a visual interface that allows them to build and view 3d pods (composite NFTs) in a metaverse environment.  The steps are as follows:

**Default View**

**Build a Pod**

**Tokenize a Pod**

**View Tokenized Pods**

 
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
