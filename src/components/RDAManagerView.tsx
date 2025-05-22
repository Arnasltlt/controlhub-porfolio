import React, { useState } from 'react';

// Define interfaces for the RDA Manager data structure
interface Order {
  id: string;
  leadTime: number;
  hubspotId: string;
  auctionTime: string;
  notes: string;
  number: string;
  companyName: string;
  country: string;
  technology: string;
  manager: string;
}

const RDAManagerView = () => {
  // States for the component
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('Global Orders');
  const [refreshTime, setRefreshTime] = useState('00:00:00');
  const [sourcingOwner, setSourceOwner] = useState('');

  // Mock data for the global orders tab
  const mockGlobalOrders: Order[] = [
    {
      id: '1',
      leadTime: 24,
      notes: 'Open Notes...',
      auctionTime: '3JJB1DL8D-V1-A1',
      number: '1802821',
      companyName: 'MAXIMA LIGHTING SOLUTIONS B.V.',
      country: 'Italy',
      technology: 'CNC Machining',
      manager: 'Yeshwanth',
      hubspotId: ''
    },
    {
      id: '2',
      leadTime: 20,
      notes: 'Open Notes...',
      auctionTime: '3J048HFN5-V2-A1',
      number: '1801546',
      companyName: 'Norbar Torque Tools',
      country: 'Australia',
      technology: 'CNC Machining',
      manager: 'Yeshwanth',
      hubspotId: ''
    },
    {
      id: '3',
      leadTime: 5,
      notes: 'Open Notes...',
      auctionTime: '3HGZGNZCC-V17-A1',
      number: '1802877',
      companyName: 'Alesi Surgical',
      country: 'United Kingdom',
      technology: '3 D Printing',
      manager: 'Rohini',
      hubspotId: ''
    },
    {
      id: '4',
      leadTime: 14,
      notes: 'Open Notes...',
      auctionTime: '3JHM86QTK-V3-A1',
      number: '1802746',
      companyName: 'Casty S.A.',
      country: 'Spain',
      technology: 'CNC Machining',
      manager: 'Rohini',
      hubspotId: ''
    },
    {
      id: '5',
      leadTime: 14,
      notes: 'Open Notes...',
      auctionTime: '3JGTXDNPQ-V1-A1',
      number: '1801855',
      companyName: 'Kern/ Rockenfield, Inc.',
      country: 'United States',
      technology: 'CNC Machining',
      manager: 'Nicholas',
      hubspotId: ''
    },
    {
      id: '6',
      leadTime: 20,
      notes: 'Open Notes...',
      auctionTime: '3J2X9WNB8-V1-A1',
      number: '1801901',
      companyName: 'Espadon-production',
      country: 'Switzerland',
      technology: 'CNC Machining',
      manager: 'Rohini',
      hubspotId: ''
    },
    {
      id: '7',
      leadTime: 23,
      notes: 'Open Notes...',
      auctionTime: '3GXDPV255-V5-A1',
      number: '1801187',
      companyName: 'CN Equipements',
      country: 'France',
      technology: 'CNC Machining',
      manager: 'Yeshwanth',
      hubspotId: ''
    },
    {
      id: '8',
      leadTime: 23,
      notes: 'Open Notes...',
      auctionTime: '3GXG6VDHP-V2-A1',
      number: '1801249',
      companyName: 'Tecnotion B.V.',
      country: 'Netherlands',
      technology: 'CNC Machining',
      manager: 'Yeshwanth',
      hubspotId: ''
    }
  ];

  // Tab data
  const tabs = [
    { id: 'global', label: 'Global Orders', count: 56 },
    { id: 'past', label: 'Orders Past Sourcing Window', count: 0 },
    { id: 'local', label: 'Local Orders', count: 8 },
    { id: 'protolabs', label: 'Protolabs Orders', count: 37 },
    { id: 'resourced', label: 'Resourced Orders', count: 3 },
    { id: 'noAuction', label: 'No Auction Created', count: 4 }
  ];
  
  // Basic styles
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column' as const,
      width: '100%',
      height: '100%',
      fontFamily: 'Arial, sans-serif',
    },
    header: {
      display: 'flex',
      flexDirection: 'column' as const,
      padding: '20px',
      borderBottom: '1px solid #eee',
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold' as const,
      marginBottom: '15px',
      textAlign: 'center' as const,
    },
    welcome: {
      fontSize: '18px',
      color: '#555',
      marginBottom: '20px',
      textAlign: 'center' as const,
    },
    controlsRow: {
      display: 'flex',
      justifyContent: 'space-between' as const,
      alignItems: 'center',
      marginBottom: '20px',
      gap: '10px',
    },
    dropdown: {
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      minWidth: '200px',
    },
    refreshButton: {
      backgroundColor: '#4a7eff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '10px 20px',
      fontWeight: 'bold' as const,
      cursor: 'pointer',
    },
    refreshTimeDisplay: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'flex-start',
      color: '#666',
    },
    tabsContainer: {
      display: 'flex',
      borderBottom: '1px solid #eee',
      overflowX: 'auto' as const,
    },
    tab: {
      padding: '15px 20px',
      cursor: 'pointer',
      whiteSpace: 'nowrap' as const,
      borderBottom: '3px solid transparent',
      transition: 'all 0.2s',
    },
    activeTab: {
      borderBottom: '3px solid #4a7eff',
      fontWeight: 'bold' as const,
      color: '#333',
    },
    searchContainer: {
      padding: '20px',
      borderBottom: '1px solid #eee',
    },
    searchInput: {
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      width: '100%',
    },
    tableHeader: {
      fontSize: '24px',
      margin: '20px',
      fontWeight: 'bold' as const,
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse' as const,
    },
    tableHeaderCell: {
      backgroundColor: '#000',
      color: 'white',
      padding: '12px 15px',
      textAlign: 'left' as const,
    },
    tableRow: {
      borderBottom: '1px solid #eee',
    },
    tableCell: {
      padding: '12px 15px',
      textAlign: 'left' as const,
    },
    notesButton: {
      backgroundColor: '#000',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '5px 10px',
      cursor: 'pointer',
    },
    icon: {
      display: 'inline-block',
      margin: '0 5px',
      cursor: 'pointer',
    }
  };
  
  // Handle tab click
  const handleTabClick = (tabName: string) => {
    setSelectedTab(tabName);
  };

  // Simulate refresh
  const handleRefresh = () => {
    const now = new Date();
    const timeString = 
      now.getHours().toString().padStart(2, '0') + ':' +
      now.getMinutes().toString().padStart(2, '0') + ':' +
      now.getSeconds().toString().padStart(2, '0');
    setRefreshTime(timeString);
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>RDA Monitor</h1>
        <div style={styles.welcome}>Welcome, Arnoldas!</div>
        
        {/* Controls row */}
        <div style={styles.controlsRow}>
          <div>
            <select 
              style={styles.dropdown}
              value={sourcingOwner}
              onChange={(e) => setSourceOwner(e.target.value)}
            >
              <option value="">Sourcing owner</option>
              <option value="Yeshwanth">Yeshwanth</option>
              <option value="Rohini">Rohini</option>
              <option value="Nicholas">Nicholas</option>
            </select>
          </div>
          
          <button 
            style={styles.refreshButton}
            onClick={handleRefresh}
          >
            Refresh Orders
          </button>
          
          <div style={styles.refreshTimeDisplay}>
            <span>Time since last refresh:</span>
            <span>{refreshTime}</span>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div style={styles.tabsContainer}>
        {tabs.map(tab => (
          <div 
            key={tab.id}
            style={{
              ...styles.tab,
              ...(selectedTab === tab.label ? styles.activeTab : {})
            }}
            onClick={() => handleTabClick(tab.label)}
          >
            {tab.label} ({tab.count})
          </div>
        ))}
      </div>
      
      {/* Search */}
      <div style={styles.searchContainer}>
        <div>Search By Order Number:</div>
        <input 
          type="text" 
          style={styles.searchInput}
          placeholder="Enter value"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {/* Table */}
      <h2 style={styles.tableHeader}>Global Orders</h2>
      <div style={{ overflowX: 'auto', flex: 1 }}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeaderCell}>Lead time</th>
              <th style={styles.tableHeaderCell}>Notes</th>
              <th style={styles.tableHeaderCell}>Hubspot</th>
              <th style={styles.tableHeaderCell}>Auction time</th>
              <th style={styles.tableHeaderCell}>Number & Ver.</th>
              <th style={styles.tableHeaderCell}>Company name</th>
              <th style={styles.tableHeaderCell}>Customer country</th>
              <th style={styles.tableHeaderCell}>Technology</th>
              <th style={styles.tableHeaderCell}>Manager</th>
            </tr>
          </thead>
          <tbody>
            {mockGlobalOrders.map(order => (
              <tr key={order.id} style={styles.tableRow}>
                <td style={styles.tableCell}>{order.leadTime}</td>
                <td style={styles.tableCell}>
                  <button style={styles.notesButton}>{order.notes}</button>
                </td>
                <td style={styles.tableCell}>
                  <span style={styles.icon}>🔗</span>
                </td>
                <td style={styles.tableCell}>
                  <span style={styles.icon}>⬚</span>
                </td>
                <td style={styles.tableCell}>{order.number}</td>
                <td style={styles.tableCell}>{order.companyName}</td>
                <td style={styles.tableCell}>{order.country}</td>
                <td style={styles.tableCell}>{order.technology}</td>
                <td style={styles.tableCell}>{order.manager}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RDAManagerView;