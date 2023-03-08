import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const UserGuide = (props) => {
  return (
    <Modal
      {...props} 
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          MetaScapes User Guide
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <p>Table of Contents</p>
<ol>
<li><a href="#what-is-metascapes">What Is MetaScapes</a></li>
<li><a href="#what-is-a-composite-nft">What Is a Composite NFT</a></li>
<li><a href="#getting-started">Getting Started</a></li>
<li><a href="#how-metascapes-works">How MetaScapes Works</a></li>
<li><a href="#navigating-the-ui">Navigating the UI</a></li>
<li><a href="#next-steps">Next Steps</a></li>
<li><a href="#built-with">Built With</a></li>
<li><a href="#contact">Contact</a></li>
</ol>
<h4 id="what-is-metascapes">What Is MetaScapes</h4>
<p><em><strong>MetaScapes</strong></em> is a prototype concept that explores the idea of bringing composite geo-located NFTs minted on the XRP Ledger into a typical metaverse environment.  Through a browser based viewer these NFTs can be interactively created and visually positioned above the surface at specific locations within a metaverse scene.  Serving as an alternative to owning virtual plots of land in a metaverse, a user can create a 3d pod of any size and altitude consisting of multiple tokenized nodes (NFTs) which collectively define the shape and behavior of the pod.  Each node (token) in the 3d pod has a unique x,y,z location attribute and is a member of the composite NFT that describes the pod as a whole.</p>
<h4 id="what-is-a-composite-nft">What Is a Composite NFT</h4>
<p><em><strong>MetaScapes</strong></em> uses geo-located composite NFTs to visually represent three dimensional shapes (pods) in the metaverse. Being geo-located simply means that each NFT has location geometry associated with it.  A composite NFT can be thought of as a parent token having mulitple related child tokens.  The metadata that describes each child token is stored in the parent token.  With this model, the parent token can represent the group of tokens as a whole (3d pod) and have control over any updates or transactions occurring on the XRP Ledger.  To assure interoperability between metaverse environments, accepted metadata standards are adhered to.  Composite NFTs are analogous to an NFT ecosystem or community.</p>
<h4 id="getting-started">Getting Started</h4>
<p>The <em><strong>MetaScapes</strong></em> application has been deployed on AWS as a web service available to all. No installation or configuration is required. This web service application serves as a demo and is designed to be a &#39;sandbox&#39; that can be used to demonstrate the functionality of MetaScapes.</p>
<ul>
<li>Supported Browsers:<ul>
<li>Chrome</li>
<li>Brave</li>
<li>FireFox</li>
<li>Edge</li>
<li>Not formatted for mobile phones</li>
</ul>
</li>
</ul>
<h4 id="how-metascapes-works">How MetaScapes Works</h4>
<p>The project demo is built using React.js and consists of three main components including Mapbox 3d Viewer, XRPL.js, and Ceramic Network.  The application user is presented with a visual interface that allows them to build and view 3d pods (composite NFTs on XRPL testnet) in a metaverse environment.  The steps are as follows:</p>
<p><strong>Default View</strong></p>
<ol>
<li><p>On loading, the user will see a blank metaverse.  Click on ‘Preview’ to display the default pod.  A pod is generated in Avatar Park/Ride having 250 nodes.  Use the mouse controls to move and rotate the display to see its shape.</p>
</li>
<li><p>Click ‘Zone_of_Influence’ in the upper left corner.  This displays an area defined by the pod parameters (location, nodes, height, size).  All nodes in any pod will always be contained within this area.  Click again to remove the graphic.</p>
</li>
<li><p>Zoom in a little and ‘left mouse click’ on a node in the pod.  Notice it turns yellow and a popup displays the location details of the node.</p>
</li>
</ol>

<p><strong>Build a Pod</strong></p>
<ol>
<li><p>Using the pod builder tools, try previewing several combinations of metaverse location and number of nodes.  Note: for this demo, three locations are predefined.  A tool for user defined addresses can easily be added.  Also, the maximum number of nodes has been set to 500.</p>
</li>
<li><p>By default, the height of any pod above the surface is set to 100 ft. and the diameter is set to 200 ft.  These parameters could be dynamic.  A pod could actually be just a few feet across.</p>
</li>
<li><p>The pods being created are generated randomly using an algorithm that uses the location, height, and size parameters.  Pods could also be generated from external sources such as point cloud files or digital twins.</p>
</li>
</ol>
<p><strong>Tokenize a Pod</strong></p>
<ol>
<li><p>Once a pod is built and previewed, it can then be tokenized into a composite NFT on the XRP Ledger.  Click the ‘Tokenize to XRPL’ button to start the process.  Note: currently there is a 150 node limit in any pod being created.  Once a name and description are entered, the tokenization process will start.</p>
</li>
<li><p>Note the progress indicator which displays the number of tokenized nodes in the pod.</p>
</li>
<li><p>Upon completion, the newly minted composite NFT pod can be viewed by selecting its name in the ‘Tokenized Pods on XRPL’ dropdown list. The pod will be green.</p>
</li>
<li><p>Each node (child token) in the pod is now an NFT on the XRP Ledger.  Zoom in a little and ‘left mouse click’ on a token in the pod.  Notice it turns yellow and a popup displays the metadata of the child token and references the pod name (master token).  There is a link to the child tokenID in XRPL Explorer.</p>
</li>
<li><p>The composite NFT (or master token) can be viewed in XRPL Explorer by clicking the button to the right of ‘Tokenized Pods on XRPL’ dropdown list.  This passes the master tokenID to XRPL Explorer.  In Explorer, notice the URI of the NFT.  This is the link to the metadata for the master and all child tokens stored in a Ceramic decentralized database.</p>
</li>
</ol>
<p><strong>View Tokenized Pods</strong></p>
<ol>
<li><p>To view any previously tokenized pods, select a pod name from the ‘Tokenized Pods on XRPL’ dropdown list.</p>
</li>
</ol>
<h4 id="navigating-the-ui">Navigating the UI</h4>
<img src="mouse-wheel.jpg" alt="mouse"/>
<h4 id="next-steps">Next Steps</h4>
<p>This  project is really just a starting point for exploring the possibilities of composite NFTs in the metaverse.  Additional tools can be built that extend MetaScapes providing capabilities yet to be developed.  Here are some ideas:</p>
<ul>
<li><p>The  location of individual child tokens can be moved or ownership can be transferred</p>
</li>
<li><p>The location of an entire pod can be moved or ownership transferred</p>
</li>
<li><p>Child tokens can be added or deleted from the master pod</p>
</li>
<li><p>Child tokens can be animated in real time</p>
</li>
<li><p>Digital twin data sources can become 3d pods</p>
</li>
<li><p>Using hooks, composite NFTs can receive external data via oracles and emit a response</p>
</li>
<li><p>Composite NFT pods can be created at a micro scale which when combined with AI could provide new ways to use the metaverse</p>
</li>
</ul>
<h4 id="built-with">Built With</h4>
<ul>
<li><p><a href="https://reactjs.org/">React</a> – JavaScript library for building user interfaces</p>
</li>
<li><p><a href="https://mapbox.com/">Mapbox GL JS</a> – JavaScript library for building 3d web maps</p>
</li>
<li><p><a href="https://xrpl.org/">xrpl.js</a> - Javascript library for integrating dapps with the XRP Ledger,</p>
</li>
<li><p>XRP Ledger(<a href="https://testnet.xrpl.org/">https://testnet.xrpl.org</a> - testnet)</p>
</li>
<li><p>[Ceramic Network](<a href="https://ceramic.network/">https://ceramic.network/</a> :ceramic-clay testnet) - a decentralized data network for Web3 applications</p>
</li>
<li><p><a href="https://nodejs.org/en/">Node.js</a> - a cross-platform JavaScript runtime environment</p>
</li>
</ul>
<h4 id="contact">Contact</h4>
<p>Scott Randolph - <a href="mailto:blocklagoon@gmail.com">blocklagoon@gmail.com</a></p>
<p>LinkedIn - <a href="https://www.linkedin.com/in/scott-randolph-2a4948236/">https://www.linkedin.com/in/scott-randolph-2a4948236/</a></p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default UserGuide;