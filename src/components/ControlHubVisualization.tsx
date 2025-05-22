'use client';

import React, { useEffect, useRef, useState } from 'react';
import NetworkCapabilitiesView from './NetworkCapabilitiesView'; // Import the network capabilities component
import RDAManagerView from './RDAManagerView'; // Import the RDA Manager component
import RFQManagementView from './RFQManagementView'; // Import the RFQ Management component
import ShippingToolView from './ShippingToolView'; // Import the Shipping Tool component
// No need to import anime.js as it will be available globally from the CDN

// Define the main color palette based on screenshots
const MOCK_COLORS = {
  darkBackground: '#1A1D21', // Dark sidebar
  lightBackground: '#FFFFFF', // Main content background
  primaryAccent: '#007BFF',   // Blue for buttons, links, highlights
  secondaryAccent: '#6C757D', // For icons or less prominent interactive elements
  textPrimary: '#343A40',    // Main text color, slightly softer than pure black
  textSecondary: '#4A4A4A', // Darkened from #6C757D for better text contrast
  border: '#DEE2E6',         // Borders and dividers
  cardBackground: '#F8F9FA', // Background for cards or distinct sections
  iconColor: '#ADB5BD',       // Default color for sidebar icons
  resourceLinkBackground: '#E9ECEF' // Background for resource/recent links
};

// Define the anime type for TypeScript
declare global {
  interface Window {
    anime: any;
  }
}

// Define tool structure
interface Tool {
  id: string;
  name: string;
  iconPlaceholder: string;
  description?: string;
}
interface Scan {
  id: number;
  trackingNumber: string;
  orderNumber: string;
  message?: string;
  scannedAt: string;
}

const tools: Tool[] = [
  { id: 'home', name: 'Home', iconPlaceholder: '⌂' }, // House symbol
  { id: 'shipping', name: 'Shipping Tool', iconPlaceholder: '⇥', description: 'Managed all shipping logistics...' }, // Right arrow
  { id: 'network', name: 'Network Capabilities', iconPlaceholder: '◉', description: 'A dynamic directory of global manufacturing partner capabilities...' }, // Network dot
  { id: 'rfq', name: 'RFQ Management', iconPlaceholder: '◎', description: 'Comprehensive system for managing Request for Quote processes and tracking quote statuses across the platform.' }, // Circle dot for RFQ
  { id: 'scanning', name: 'Warehouse Scanning', iconPlaceholder: '≣', description: 'Streamlined essential warehouse operations...' }, // Scanning lines
  { id: 'rdamanager', name: 'RDA Manager', iconPlaceholder: '⚐', description: 'Centralized monitor for Request for Quote (RFQ) distribution auctions, allowing managers to track and assign orders across the manufacturing network.' }, // Flag symbol
  { id: 'settings', name: 'Settings', iconPlaceholder: '⚙', description: 'Centralized user preferences...' }, // Gear
];

export default function ControlHubVisualization() {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [activeTool, setActiveTool] = useState<Tool>(tools[0]);
  const [searchQuery, setSearchQuery] = useState<string>('QT-A2X');
  const [searchPerformed, setSearchPerformed] = useState<boolean>(false);
  const [chatMessage, setChatMessage] = useState<string>('');
  const [isChatVisible, setIsChatVisible] = useState<boolean>(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(false);

  const [scans, setScans] = useState<Scan[]>([]);
  const [currentSessionLocation, setCurrentSessionLocation] = useState<string>('Chicago');
  const [currentTab, setCurrentTab] = useState<'current' | 'all' | 'messages'>('current');

  const locations = ['Chicago', 'New York', 'Berlin', 'Tokyo'];

  const generateRandomScan = (): Scan => {
    const trackingNumber = 'TN-' + Math.random().toString(36).substring(2, 7).toUpperCase();
    const orderNumber = 'ORD-' + Math.random().toString(36).substring(2, 6).toUpperCase();
    const messages = ['', 'Left package at front door', 'Customer requested delay', 'Signed by receiver'];
    const message = messages[Math.floor(Math.random() * messages.length)];
    const scannedAt = new Date().toLocaleString('default', {
      month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
    return { id: Date.now(), trackingNumber, orderNumber, message, scannedAt };
  };
  const addScan = () => setScans(prev => [...prev, generateRandomScan()]);
  const startNewSession = () => setScans([]);

  // Initial message on mount & Effect for contextual chat messages
  useEffect(() => {
    const initialMessage = "Welcome to Control Hub! This platform was developed at Hubs.com to unify scattered internal tools, significantly streamlining workflows. This interactive mock-up demonstrates key features and the value they delivered. Explore around!";
    
    if (activeTool.id === 'home') {
      if (!searchPerformed) {
        setChatMessage(initialMessage + " The 'Quest' search bar above is your universal key. Try the pre-filled search for 'QT-A2X' to see order details!");
      } else {
        setChatMessage("You're viewing the consolidated details for a mock order. Data fields are populated with representative fictional entries and placeholders to showcase the interface structure.");
      }
    } else if (activeTool.description) {
      setChatMessage(activeTool.description);
    } else {
      setChatMessage(`Exploring the ${activeTool.name}. Details for this section are being polished!`)
    }
    setIsChatVisible(true); // Show bubble whenever context changes

  }, [activeTool, searchPerformed]); // Dependencies that trigger message update

  // This separate useEffect is just to set the very first message ONCE, 
  // and avoids overwriting it immediately if activeTool/searchPerformed effect runs first.
  // However, the above combined approach might be cleaner.
  // For now, let's stick to one combined useEffect for simplicity.
  /*
  useEffect(() => {
    setChatMessage(
      "Welcome to Control Hub! This platform was developed at Hubs.com to unify scattered internal tools, significantly streamlining workflows. This interactive mock-up demonstrates key features and the value they delivered. Explore around!"
    );
    setIsChatVisible(true);
  }, []); // Empty dependency array means it runs once on mount
  */

  // useEffect(() => { // Original combined effect, slightly refactored above
    // Reset search when navigating away from home to a different tool
    if (activeTool.id !== 'home' && searchPerformed) { // only reset if search was performed
      setSearchPerformed(false);
    }
  // }, [activeTool, searchPerformed]); // This was the old dependency array for the combined effect

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      setSearchPerformed(true);
    }
  };

  const handleExitSearch = () => {
    setSearchPerformed(false);
    setSearchQuery('QT-A2X'); // Reset to default alphanumeric abstract ID
  };

  // Styles for sections and links based on the "Welcome" screenshot
  const sectionTitleStyle: React.CSSProperties = {
    fontSize: '1.4em',
    color: MOCK_COLORS.textPrimary,
    marginBottom: '20px',
    fontWeight: 600,
  };

  const linkPillStyle: React.CSSProperties = {
    display: 'inline-block',
    backgroundColor: MOCK_COLORS.resourceLinkBackground,
    color: MOCK_COLORS.primaryAccent,
    padding: '10px 18px',
    borderRadius: '25px',
    marginRight: '12px',
    marginBottom: '12px',
    fontSize: '0.9em',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease, transform 0.1s ease',
    border: 'none',
  };

  const resourceLinkStyle: React.CSSProperties = {
    ...linkPillStyle,
    color: MOCK_COLORS.textPrimary,
  };

  const sidebarIconStyleBase: React.CSSProperties = {
    width: '100%', // Buttons take full width of sidebar area
    minHeight: '50px', // Ensure consistent height
    marginBottom: '10px', // Spacing between buttons
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    // justifyContent will be dynamic
    color: MOCK_COLORS.iconColor, // Default icon/text color for inactive
    fontWeight: 500, // Medium weight for text
    fontSize: '1.1em', // Icon size (text size will be slightly smaller)
    cursor: 'pointer',
    border: 'none',
    padding: '0 15px', // Horizontal padding for icon and text
    backgroundColor: 'transparent', // Default background
    transition: 'background-color 0.2s ease, color 0.2s ease',
  };

  const iconSpanStyle: React.CSSProperties = {
    marginRight: '15px',
    fontSize: '1.4em', // Slightly larger for better visibility
    display: 'inline-block',
    width: '30px', // Fixed width for icon container for alignment
    textAlign: 'center',
    color: 'inherit', // Will inherit from parent button style
  };

  const textSpanStyle: React.CSSProperties = {
    fontSize: '0.9em',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  };

  // Styles for Order Detail View
  const orderDetailContainerStyle: React.CSSProperties = {
    display: 'flex',
    gap: '20px',
    flexGrow: 1,
    overflowY: 'auto',
  };

  const orderMainContentStyle: React.CSSProperties = {
    flex: 3,
    display: 'flex',
    flexDirection: 'column',
  };

  const orderSidebarStyle: React.CSSProperties = {
    flex: 1,
    backgroundColor: MOCK_COLORS.cardBackground,
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  };
  
  const detailRowStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
    fontSize: '0.9em',
  };

  const detailLabelStyle: React.CSSProperties = {
    color: MOCK_COLORS.textSecondary,
    fontWeight: 500,
  };

  const detailValueStyle: React.CSSProperties = {
    color: MOCK_COLORS.textPrimary,
    fontWeight: 500,
    textAlign: 'right',
  };

  const externalLinkStyle: React.CSSProperties = {
    color: MOCK_COLORS.primaryAccent,
    textDecoration: 'none',
    fontSize: '0.9em',
    marginRight: '15px',
    cursor: 'pointer',
  };

  // Styles for Popover - Will be repurposed/renamed for Chat Bubble
  const chatBubbleStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '20px',
    right: '20px',
    backgroundColor: MOCK_COLORS.cardBackground, // Light background for the bubble
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.15)',
    maxWidth: '350px',
    zIndex: 1000,
    border: `1px solid ${MOCK_COLORS.border}`,
    fontSize: '0.95em',
    lineHeight: 1.6,
  };

  const chatBubbleCloseButtonStyle: React.CSSProperties = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'transparent',
    border: 'none',
    fontSize: '1.2em',
    cursor: 'pointer',
  color: MOCK_COLORS.textSecondary,
};
  const tabStyle: React.CSSProperties = {
    background: 'transparent',
    border: 'none',
    padding: '10px 15px',
    cursor: 'pointer',
    fontSize: '1em',
    color: MOCK_COLORS.textSecondary,
  };
  const activeTabStyle: React.CSSProperties = {
    ...tabStyle,
    color: MOCK_COLORS.textPrimary,
    fontWeight: 600,
    borderBottom: `2px solid ${MOCK_COLORS.primaryAccent}`,
  };
  const selectStyle: React.CSSProperties = {
    padding: '8px 12px',
    fontSize: '1em',
    border: `1px solid ${MOCK_COLORS.border}`,
    borderRadius: '4px',
    backgroundColor: MOCK_COLORS.lightBackground,
    color: MOCK_COLORS.textPrimary,
    cursor: 'pointer',
  };
  const primaryButtonStyle: React.CSSProperties = {
    padding: '10px 20px',
    fontSize: '1em',
    backgroundColor: MOCK_COLORS.primaryAccent,
    color: MOCK_COLORS.lightBackground,
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  // Function to handle clicking on a recently searched item
  const handleRecentItemClick = (itemText: string) => {
    setSearchQuery(itemText);
    handleSearch();
  };

  return (
    <div style={{ 
      display: 'flex', 
      minHeight: '600px',
      position: 'relative',
      border: `1px solid ${MOCK_COLORS.border}`,
      borderRadius: '8px',
      overflow: 'hidden'
    }}>
      {/* Mock Sidebar */}
      <div 
        style={{
          width: isSidebarExpanded ? '230px' : '60px',
          backgroundColor: MOCK_COLORS.darkBackground,
          padding: '20px 0', // Vertical padding, horizontal removed to use button padding
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transition: 'width 0.3s ease-in-out',
        }}
        onMouseEnter={() => setIsSidebarExpanded(true)}
        onMouseLeave={() => setIsSidebarExpanded(false)}
      >
        {tools.map((tool, index) => {
          const isActive = activeTool.id === tool.id;
          const isLogo = index === 0;

          return (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool)}
              style={{
                ...sidebarIconStyleBase,
                justifyContent: isSidebarExpanded ? 'flex-start' : 'center',
                paddingLeft: isSidebarExpanded ? (isLogo ? '15px' : '15px') : '0',
                paddingRight: isSidebarExpanded ? '15px' : '0',
                backgroundColor: isActive 
                  ? MOCK_COLORS.primaryAccent
                  : 'transparent',
                // All inactive icons will be white (lightBackground)
                color: isActive 
                  ? MOCK_COLORS.lightBackground 
                  : MOCK_COLORS.lightBackground,
              }}
              title={tool.name}
            >
              <span style={iconSpanStyle}>{tool.iconPlaceholder}</span>
              {isSidebarExpanded && (
                <span style={textSpanStyle}>
                  {tool.name} 
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, backgroundColor: MOCK_COLORS.lightBackground, padding: '50px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        {activeTool.id === 'home' && !searchPerformed && (
          <>
            <h1 style={{ fontSize: '2.4em', color: MOCK_COLORS.textPrimary, marginBottom: '50px', fontWeight: 600 }}>
              Welcome, Arnoldas Kemeklis
            </h1>

            {/* Mock Search Bar - "Quest" */}
            <div style={{ marginBottom: '70px', display: 'flex', alignItems: 'center', width: '85%', maxWidth: '900px' }}>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search for quote #, order #, tracking #, etc..."
                style={{
                  flexGrow: 1,
                  padding: '20px 22px',
                  fontSize: '1.1em',
                  borderRadius: '10px 0 0 10px',
                  border: `1px solid ${MOCK_COLORS.border}`,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                  outline: 'none',
                  backgroundColor: MOCK_COLORS.lightBackground,
                  color: MOCK_COLORS.textPrimary,
                }}
              />
              <button 
                onClick={handleSearch}
                style={{
                padding: '20px 25px',
                fontSize: '1.1em',
                backgroundColor: MOCK_COLORS.primaryAccent,
                color: MOCK_COLORS.lightBackground,
                border: 'none',
                borderRadius: '0 10px 10px 0',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
              </button>
            </div>

            {/* Recently Searched Section */}
            <div style={{ marginBottom: '50px' }}>
              <h2 style={sectionTitleStyle}>Recently searched</h2>
              <div>
                {['ID-B7C', 'ID-D3E', 'ID-F8G', 'ID-H1J'].map(item => (
                  <button 
                    key={item} 
                    style={linkPillStyle}
                    onClick={() => handleRecentItemClick(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Resources Section */}
            <div>
              <h2 style={sectionTitleStyle}>Resources</h2>
              <div>
                {['Company Handbook', 'HR Policies', 'Customer Support Guide', 'Product Documentation', 'Sales Resources', 'Legal Documents'].map(item => (
                  <span key={item} style={resourceLinkStyle}>{item}</span>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTool.id === 'home' && searchPerformed && (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Header for Order Detail View */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h1 style={{ fontSize: '2em', color: MOCK_COLORS.primaryAccent, fontWeight: 700, display: 'flex', alignItems: 'center' }}>
                {searchQuery}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" style={{ marginLeft: '10px', cursor: 'pointer' }}>
                  <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                  <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                </svg>
              </h1>
              <button 
                onClick={handleExitSearch}
                style={{ 
                  backgroundColor: MOCK_COLORS.primaryAccent, 
                  color: MOCK_COLORS.lightBackground, 
                  border: 'none', 
                  padding: '10px 20px', 
                  borderRadius: '5px', 
                  cursor: 'pointer',
                  fontWeight: 500,
                }}>
                  Exit X
              </button>
            </div>

            {/* Main content for Order Detail */}
            <div style={orderDetailContainerStyle}>
              <div style={orderMainContentStyle}>
                <div style={{ marginBottom: '25px' }}>
                  <span style={externalLinkStyle}>Customer Info ↗</span>
                  <span style={externalLinkStyle}>Order Platform ↗</span>
                  <span style={externalLinkStyle}>Support Tickets ↗</span>
                  <span style={externalLinkStyle}>Order Disputes ↗</span>
                  <span style={externalLinkStyle}>Billing Details ↗</span>
                </div>
                <h2 style={{ fontSize: '1.5em', color: MOCK_COLORS.textPrimary, marginBottom: '20px', fontWeight: 600 }}>Order details</h2>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 40px' }}>
                  <div><span style={detailLabelStyle}>Supplier</span><div style={detailValueStyle}>Astra Machining</div></div>
                  <div><span style={detailLabelStyle}>Status</span><div style={detailValueStyle}>Completed</div></div>
                  <div><span style={detailLabelStyle}>Supplier lead time</span><div style={detailValueStyle}>15 Days</div></div>
                  <div><span style={detailLabelStyle}>Technology</span><div style={detailValueStyle}>CNC Milling</div></div>
                  <div><span style={detailLabelStyle}>In review reasons</span><div style={detailValueStyle}>N/A</div></div>
                  <div><span style={detailLabelStyle}>Strategic</span><div style={detailValueStyle}>No</div></div>
                  <div><span style={detailLabelStyle}>Order value</span><div style={detailValueStyle}>€ XXX.XX</div></div>
                  <div><span style={detailLabelStyle}>Batch schedule</span><div style={detailValueStyle}>Not scheduled</div></div>
                  <div><span style={detailLabelStyle}>Last delivery</span><div style={detailValueStyle}>Oct 05, 2023</div></div>
                  <div><span style={detailLabelStyle}>Completed</span><div style={detailValueStyle}>Oct 12, 2023</div></div>
                  <div><span style={detailLabelStyle}>Customer purchase order</span><div style={detailValueStyle}>PO-XYZ789</div></div>
                  <div><span style={detailLabelStyle}>HubSpot deal ID</span><div style={detailValueStyle}>DL-M4P</div></div>
                </div>
              </div>

              <div style={orderSidebarStyle}>
                <h3 style={{ fontSize: '1.2em', color: MOCK_COLORS.textPrimary, marginBottom: '15px', fontWeight: 600 }}>Customer details</h3>
                <div style={{ marginBottom: '15px' }}>
                  <div style={{ fontWeight: 'bold', color: MOCK_COLORS.textPrimary }}>Elara Voss</div>
                  <div style={{ fontSize: '0.9em', color: MOCK_COLORS.textSecondary }}>elara.v@example.com</div>
                </div>
                
                <div style={detailRowStyle}><span style={detailLabelStyle}>Contact created by admin</span><span style={detailValueStyle}>Yes</span></div>
                <hr style={{border: 'none', borderTop: `1px solid ${MOCK_COLORS.border}`, margin: '15px 0'}} />
                <div style={detailRowStyle}><span style={detailLabelStyle}>Deal owner</span><div style={detailValueStyle}>Roric Stone</div></div>
                <div style={detailRowStyle}><span style={detailLabelStyle}>Project manager</span><div style={detailValueStyle}>Lyra Fell</div></div>
                <div style={detailRowStyle}><span style={detailLabelStyle}>Mechanical eng.</span><div style={detailValueStyle}>Kael Nemor</div></div>
                <div style={detailRowStyle}><span style={detailLabelStyle}>Sales support</span><div style={detailValueStyle}>Seris Vane</div></div>
                <div style={detailRowStyle}><span style={detailLabelStyle}>Partner support</span><div style={detailValueStyle}>Orin Thal</div></div>
                <div style={detailRowStyle}><span style={detailLabelStyle}>Logistic support</span><div style={detailValueStyle}>Mira Corvus</div></div>
                {/* Add more fields as needed */}
              </div>
            </div>
          </div>
        )}

        {activeTool.id === 'scanning' && (
          <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex' }}>
                <button onClick={() => setCurrentTab('current')} style={currentTab === 'current' ? activeTabStyle : tabStyle}>
                  Current session
                </button>
                <button onClick={() => setCurrentTab('all')} style={currentTab === 'all' ? activeTabStyle : tabStyle}>
                  All scans
                </button>
                <button onClick={() => setCurrentTab('messages')} style={currentTab === 'messages' ? activeTabStyle : tabStyle}>
                  Messages
                </button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <select value={currentSessionLocation} onChange={e => setCurrentSessionLocation(e.target.value)} style={selectStyle}>
                  {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                </select>
                <button onClick={startNewSession} style={primaryButtonStyle}>Start new session</button>
              </div>
            </div>
            {currentTab === 'current' && (
              <div style={{ flexGrow: 1, overflowY: 'auto', cursor: 'pointer' }} onClick={addScan}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${MOCK_COLORS.border}`, color: MOCK_COLORS.textSecondary, textAlign: 'left' }}>
                      <th style={{ padding: '12px' }}>Order number</th>
                      <th style={{ padding: '12px' }}>Message</th>
                      <th style={{ padding: '12px' }}>Scanned</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scans.length === 0 ? (
                      <tr>
                        <td colSpan={3} style={{ padding: '20px', textAlign: 'center', color: MOCK_COLORS.textSecondary }}>
                          No scans in this session
                        </td>
                      </tr>
                    ) : (
                      scans.map(scan => (
                        <tr key={scan.id}>
                          <td style={{ padding: '12px', color: MOCK_COLORS.textPrimary }}>{scan.orderNumber}</td>
                          <td style={{ padding: '12px', color: MOCK_COLORS.textPrimary }}>{scan.message || '-'}</td>
                          <td style={{ padding: '12px', color: MOCK_COLORS.textPrimary }}>{scan.scannedAt}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
            {currentTab === 'all' && (
              <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', color: MOCK_COLORS.textSecondary }}>
                All scans view mockup.
              </div>
            )}
            {currentTab === 'messages' && (
              <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', color: MOCK_COLORS.textSecondary }}>
                Messages view mockup.
              </div>
            )}
          </div>
        )}

        {/* Render NetworkCapabilitiesView when activeTool.id is 'network' */}
        {activeTool.id === 'network' && (
          <NetworkCapabilitiesView />
        )}

        {/* Render RDAManagerView when activeTool.id is 'rdamanager' */}
        {activeTool.id === 'rdamanager' && (
          <RDAManagerView />
        )}

        {/* Render RFQManagementView when activeTool.id is 'rfq' */}
        {activeTool.id === 'rfq' && (
          <RFQManagementView />
        )}

        {/* Render ShippingToolView when activeTool.id is 'shipping' */}
        {activeTool.id === 'shipping' && (
          <ShippingToolView />
        )}

        {/* Placeholder for other tools - ensure this doesn't conflict */}
        {activeTool.id !== 'home' && activeTool.id !== 'scanning' && activeTool.id !== 'network' && activeTool.id !== 'rdamanager' && activeTool.id !== 'rfq' && activeTool.id !== 'shipping' && (
          <div>
            <h1 style={{ fontSize: '2.2em', color: MOCK_COLORS.textPrimary, marginBottom: '20px', fontWeight: 600 }}>
              {activeTool.name}
            </h1>
            <p style={{color: MOCK_COLORS.textSecondary, lineHeight: 1.7, fontSize: '1.1em'}}>
              Mock UI for {activeTool.name} will be shown here.
            </p>
          </div>
        )}
      </div>

      {/* Chat Bubble / Guide */}
      {isChatVisible && (
        <div style={chatBubbleStyle}>
          <button style={chatBubbleCloseButtonStyle} onClick={() => setIsChatVisible(false)}>
            &times;
          </button>
          <p style={{ margin: 0, color: MOCK_COLORS.textPrimary }}>{chatMessage}</p>
        </div>
      )}
    </div>
  );
} 